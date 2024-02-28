const Wallpapers = require("../../models/wallpaper");
const Categories = require("../../models/category");
const Users = require("../../models/user");
const Core = require("../../lib/core");
var mongoose = require('mongoose');
var _ = require('underscore');


const wallpaperResolvers = {
	// query
	async getWallpapers(args, context) {
		const user = Core.validateTokenUser(context.user)
		const query = { '$and': [] }

		if(user?.user?._id && args.isFavourites) {
			const userObj = await Users.findOne({ _id: user.user._id }, { favourites: 1 })
			if(userObj && userObj.favourites && userObj.favourites.length > 0) {
				query['$and'].push({ '_id':  { $in: userObj.favourites }})
			} else return {
				wallpapers: [],
				total: 0
			}
		}

		if(args.categoryId) {
			const categoryId = new mongoose.Types.ObjectId(args.categoryId)
			query['$and'].push({ 'categoryId': categoryId })
		}

        if (args.keyword) {
			const regex = new RegExp(".*" + args.keyword.replace(/(\W)/g, "\\$1") + ".*", "i")
			const categoryIds = _.pluck(await Categories.find({ name: regex }, { _id: 1 }), '_id')
			query['$and'].push({ '$or': [{ 'name': regex }, { 'categoryId': { $in: categoryIds }}] })
		}

		if(args.type && args.type === 'featured') {
			query['$and'].push({ 'isFeatured': true })
		}

		if (!query['$and'].length) delete query['$and']
		var totalWallpaper = 0, wallpapers = []

		if(args.type && args.type === 'trending') {
			// total wallpaper
			const res = await Wallpapers.aggregate([
				{ $addFields: { 
					len: { $size: "$downloads" }
				  }
				},
				{ $match: { ...query, len: { $gt: 0 }} },
				{ $count: "totalWallpapers" }
			])
			totalWallpaper = res && res[0] && res[0].totalWallpapers ? res[0].totalWallpapers : 0

			// wallpapers
			const trendingQuery = [
				{ $addFields: { 
					len: { $size: "$downloads" }
				  }
				},
				{ $match: { ...query, len: { $gt: 0 }} },
				{ $sort: { len: -1 } }
			]
			if(!_.isUndefined(args.skip)) trendingQuery.push({ $skip : args.skip })
			if(!_.isUndefined(args.limit)) trendingQuery.push({ $limit : args.limit })
			
			wallpapers = await Wallpapers.aggregate(trendingQuery)
		} else {
			totalWallpaper = await Wallpapers.find(query).count()
			wallpapers = await Wallpapers.find(query).populate('categoryId').sort({ createdAt: -1 }).skip(args?.skip).limit(args?.limit)
		}

        return { wallpapers: wallpapers, total: totalWallpaper }
	},
	async getWallpaperDetails(args, context) {
		if(args.wallpaperId) {
			const wallpaper = await Wallpapers.findOne({ _id: args.wallpaperId }).populate('categoryId')
			if(wallpaper && wallpaper._id) {
				return wallpaper
			} else {
				throw new Error('Invalid wallpaper')
			}
		} else {
			throw new Error('Invalid details')
		}
	},

	// mutation
	async addWallpaper(args, context) {
		const { user } = Core.validateTokenUser(context.user)
		if (user) {
			if(user.role && user.role === 'admin') {
				if (args && args.name) {
					var addWallpaper = new Wallpapers({ ...args })
					return await addWallpaper.save()
				} else {
					throw new Error('Invalid details')
				}
			} else {
				throw new Error(`You don't have permission to add wallpaper`)
			}
		} else {
			throw new Error('User not found')
  		}
	},
	async editWallpaper(args, context) {
		const { user } = Core.validateTokenUser(context.user)
		if (user) {
			if(user.role && user.role === 'admin') {
				if (args && args.wallpaperId) {
                    const updateData = { name: args.name }
                    if (!_.isUndefined(args.image)) updateData.image = args.image
					if (!_.isUndefined(args.isFeatured)) updateData.isFeatured = args.isFeatured
					if (!_.isUndefined(args.categoryId)) updateData.categoryId = args.categoryId

					const updated = await Wallpapers.updateOne({ _id: args.wallpaperId }, { $set: updateData })
					if(updated && updated.modifiedCount > 0) {
						return await Wallpapers.findOne({ _id: args.wallpaperId }).populate('categoryId')
					} else {
						throw new Error('Not updated, invalid values')
					}
				} else {
					throw new Error('Invalid details')
				}
			} else {
				throw new Error(`You don't have permission to edit wallpaper`)
			}
		} else {
			throw new Error('User not found')
  		}
	},
	async deleteWallpaper(args, context) {
		const { user } = Core.validateTokenUser(context.user)
		if (user) {
			if(user.role && user.role === 'admin') {
				if (args && args.wallpaperId) {
                    const wallpaper = await Wallpapers.findOne({ _id: args.wallpaperId })
                    if(wallpaper) {
						await Users.updateMany({ 'favourites': args.wallpaperId }, { $pull: { favourites: args.wallpaperId } })
                      	const result = await Wallpapers.deleteOne({_id: args.wallpaperId })
						return result && result.deletedCount > 0 ? true : false
                    } else {
                        throw new Error('Invalid wallpaper')
                    }
				} else {
					throw new Error('Invalid details')
				}
			} else {
				throw new Error(`You don't have permission to delete category`)
			}
		} else {
			throw new Error('User not found')
  		}
	},
	async wallpaperDownload(args, context) {
		const { user } = Core.validateTokenUser(context.user)
		if (user) {
			if (args && args.wallpaperId) {
				const wallpaper = await Wallpapers.findOne({ _id: args.wallpaperId }, { downloads: 1 })
				if(wallpaper && wallpaper?.downloads && !wallpaper?.downloads?.find(item => item.equals(user._id))) {
					const updated = await Wallpapers.updateOne({ _id: args.wallpaperId }, { $push: { downloads: user._id }})
					return updated && updated.modifiedCount > 0 ? true : false 
				}
				return true
			} else {
				throw new Error('Invalid details')
			}
		} else {
			throw new Error('User not found')
  		}
	},
	async wallpaperLikeDislike(args, context) {
		const { user } = Core.validateTokenUser(context.user)
		if (user) {
			if (args && args.wallpaperId) {
				const wallpaper = await Wallpapers.findOne({ _id: args.wallpaperId }, { likes: 1 })
				if(wallpaper && wallpaper._id) {
					const updateQuery = {}
					const isLiked = wallpaper?.likes?.find(item => item.equals(user._id))
					isLiked ? updateQuery['$pull'] = { likes: user._id } : updateQuery['$push'] = { likes: user._id }
					const updated = await Wallpapers.updateOne({ _id: args.wallpaperId }, updateQuery)
					return updated && updated.modifiedCount > 0 ? true : false 
				} else {
					throw new Error('Wallpaper not found')
				}
			} else {
				throw new Error('Invalid details')
			}
		} else {
			throw new Error('User not found')
  		}
	},
	async addWallpaperToFavourites(args, context) {
		const { user } = Core.validateTokenUser(context.user)
		if (user) {
			if (args && args.wallpaperId) {
				const userObj = await Users.findOne({ _id: user._id }, { favourites: 1 })
				const updateQuery = {}
				const isFavourite = userObj?.favourites?.find(item => item.equals(args.wallpaperId))
				isFavourite ? updateQuery['$pull'] = { favourites: args.wallpaperId } : updateQuery['$push'] = { favourites: args.wallpaperId }
				const updated = await Users.updateOne({ _id: userObj._id }, updateQuery)
				return updated && updated.modifiedCount > 0 ? true : false 
				
			} else {
				throw new Error('Invalid details')
			}
		} else {
			throw new Error('User not found')
  		}
	}
}

module.exports = { wallpaperResolvers }
