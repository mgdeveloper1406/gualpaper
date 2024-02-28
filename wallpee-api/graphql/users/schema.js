const userDefs = `
	
    type userAuthData {
		_id: ID
		name: String
		email: String
		role: String
		token: String
	}

	type userData {
		_id: ID
		token: String
		createdAt: Date
	}

	type user {
		_id: ID
		createdAt: Date
		favourites: [String]
		likes: Int
		downloads: Int
	}

	type userWithCount {
		users: [user]
		total: Int
	}

	type userInfo {
		_id: ID
		role: String
		favourites: [String]
		createdAt: Date
	}

	type Query {
		authUser(email: String, password: String): userAuthData
		getUsers(limit: Int, skip: Int): userWithCount
		getUserDetails: userInfo
	}

	type Mutation {
		addUser: userData
	}
`

module.exports = { userDefs }