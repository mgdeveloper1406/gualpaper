const wallpaperDefs = `
	type wallpaperData {
		_id: String
		name: String
		image: String
		likes: [ID]
		downloads: [ID]
		isFeatured: Boolean
		categoryId: category
		createdAt: Date
	}
	
	type category {
		_id: ID
		name: String
	}

	type wallpaperWithCount {
		wallpapers: [wallpaperData]
		total: Int
	}

	type Query {
		getWallpapers(limit: Int, skip: Int, keyword: String, categoryId: String, isFavourites: Boolean, type: String): wallpaperWithCount
		getWallpaperDetails(wallpaperId: ID): wallpaperData
	}

	type Mutation {
		addWallpaper(name: String, image: String, categoryId: ID, isFeatured: Boolean): wallpaperData
		editWallpaper(wallpaperId: ID, name: String, image: String, categoryId: ID, isFeatured: Boolean): wallpaperData
		deleteWallpaper(wallpaperId: ID): Boolean
		wallpaperDownload(wallpaperId: ID): Boolean
		wallpaperLikeDislike(wallpaperId: ID): Boolean
		addWallpaperToFavourites(wallpaperId: ID): Boolean
	}
`

module.exports = { wallpaperDefs }