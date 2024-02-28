const mongoose = require("mongoose")
var bcrypt = require('bcrypt-nodejs')

require('mongoose-double')(mongoose);

const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    email: String,
    password: String,
    profile: {
      name: String,
      appToken: String
    },
    favourites: [{ type: Schema.ObjectId, ref: 'Wallpapers' }],
    role: String
  },
  { timestamps: true }
)

userSchema.pre('save', function (next) {
	var user = this

	// hash the password only if the password has been
	// changed or user is new

	if (!user.isModified('password')) return next()

	// generate the hash
	bcrypt.hash(user.password, null, null, function (err, hash) {
		if (err) return next(err)

		// change the password to the hashed version
		user.password = hash
		next()
	})
})


module.exports = mongoose.model("User", userSchema)
