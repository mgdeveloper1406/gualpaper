const jwt = require("jsonwebtoken");
const Users = require("../../models/user");
const Wallpapers = require("../../models/wallpaper");
const Core = require("../../lib/core");
var superSecret = process.env.SECRET;

var _ = require('underscore');
const wallpaper = require("../../models/wallpaper");

const userResolvers = {
	// query
    async authUser(args) {
		if (args && args.email && args.password) {
			const email = args.email.toLowerCase()
			const user = await Users.findOne({ 'email': { $regex: new RegExp('' + email, 'i') } })
			if (!user) throw new Error('Email is incorrect')

			var validPassword = Core.comparePassword(args.password, user.password);
			if (!validPassword) throw new Error('Password is incorrect')

			// Creating JWT token with user data and expires in 24 Hours
			var token = jwt.sign({ user: _.pick(user, ['_id', 'email', 'role']) }, superSecret, { expiresIn: '2400h' })
			await Users.updateOne({ _id: user._id }, { $set: { 'profile.appToken': token } })

			return { _id: user._id, name: user.profile.name, email: args.email, token: token, role: user.role }
		} else {
			throw new Error('Invalid details')
		}
    },
	async getUsers(args, context) {
		const { user } = Core.validateTokenUser(context.user)
		if (user) {
			if(user.role && user.role === 'admin') {
				var totalUser = await Users.find({}).count()
				var users = await Users.find({}).sort({ createdAt: 1 }).skip(args?.skip).limit(args?.limit)

				const getUserFn = (user) => {
					return new Promise(function(resolve){
						async function userFn () {
							const wallpapers = await Wallpapers.find({ $or: [{ likes: user._id}, { downloads: user._id }]}, { _id: 1, likes: 1, downloads: 1 })
							var userLikes = 0, userDownloads = 0
							if (wallpapers && wallpapers.length > 0) {
								wallpapers.forEach(wallpaper => {
									if(wallpaper.likes.includes(user._id)) userLikes += 1
									if(wallpaper.downloads.includes(user._id)) userDownloads += 1
								})
								user.likes = userLikes
								user.downloads = userDownloads
								return resolve(user)
							} else return resolve({})
						}
						userFn()
					})
				}

				var promises = [];

				_.each(users, async user => {
					promises.push(getUserFn(user));
				})
		
				return Promise.all(promises)
				.then(async function(result) {
					return { users: result, total: totalUser }
				})
			} else {
				throw new Error(`You don't have permission to get users list`)
			}
		} else {
			throw new Error('User not found')
  		}
	},
	async getUserDetails(args, context) {
		const { user } = Core.validateTokenUser(context.user)
		if (user) {
			const userObj = await Users.findOne({ _id: user._id })
		  	return _.extend({}, _.pick(userObj, ['_id', 'favourites', 'role', 'createdAt']))
		} else {
		  throw new Error('User not found')
		}
	},

	//mutation
	async addUser() {
		const role =  'customer'

		var addUser = new Users({ role });
		const savedUser = await addUser.save();

		// creating JWT token with user data and expires in 24 Hours
		var token = jwt.sign({ user: _.pick(savedUser, ['_id', 'role']) }, superSecret, { expiresIn: '2400h' })
		await Users.updateOne({ _id: savedUser._id }, { $set: { 'profile.appToken': token } })

		return _.extend({token}, _.pick(savedUser, ['_id', 'createdAt']))
	}
}

module.exports = { userResolvers }