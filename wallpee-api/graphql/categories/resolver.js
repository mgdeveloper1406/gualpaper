const Categories = require("../../models/category");
const Wallpapers = require("../../models/wallpaper");
const Core = require("../../lib/core");
var _ = require('underscore');

const categoryResolvers = {
	// query
	async getCategories(args) {
		const query = { '$and': [] }
		
        if (args.keyword) {
			const regex = new RegExp(".*" + args.keyword.replace(/(\W)/g, "\\$1") + ".*", "i")
			query['$and'].push({ 'name': regex })
		}

		if (!query['$and'].length) delete query['$and']
		var totalCategory = await Categories.find(query).count()
        var categories = await Categories.find(query).sort({ createdAt: -1 }).skip(args?.skip).limit(args?.limit)

        return { categories: categories, total: totalCategory }
	},

	// mutation
	async addCategory(args, context) {
		const { user } = Core.validateTokenUser(context.user)
		if (user) {
			if(user.role && user.role === 'admin') {
				if (args && args.name) {
					var addCategory = new Categories({ ...args })
					return await addCategory.save()
				} else {
					throw new Error('Invalid details')
				}
			} else {
				throw new Error(`You don't have permission to add category`)
			}
		} else {
			throw new Error('User not found')
  		}
	},
    async editCategory(args, context) {
		const { user } = Core.validateTokenUser(context.user)
		if (user) {
			if(user.role && user.role === 'admin') {
				if (args && args.categoryId) {
                    const updated = await Categories.updateOne({ _id: args.categoryId }, { $set:  { name: args.name } })
					if(updated && updated.modifiedCount > 0) {
						return await Categories.findOne({ _id: args.categoryId }) 
					} else {
						throw new Error('Not updated, invalid values')
					}
				} else {
					throw new Error('Invalid details')
				}
			} else {
				throw new Error(`You don't have permission to edit category`)
			}
		} else {
			throw new Error('User not found')
  		}
	},
	async deleteCategory(args, context) {
		const { user } = Core.validateTokenUser(context.user)
		if (user) {
			if(user.role && user.role === 'admin') {
				if (args && args.categoryId) {
                    const category = await Categories.findOne({ _id: args.categoryId })
                    if(category) {
                        var wallpaperCount = await Wallpapers.find({ categoryId: args.categoryId }, { _id: 1 }).count()
                        if (wallpaperCount > 0) throw new Error('This category has wallpapers, It can not be delete')
                        else {
                            await Categories.deleteOne({_id: args.categoryId })
                            return true
                        }
                    } else {
                        throw new Error('Invalid category')
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
}


module.exports = { categoryResolvers }
