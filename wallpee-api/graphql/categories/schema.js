const categoryDefs = `
    scalar Date

	type categoryData {
		_id: String
		name: String
		createdAt: Date
	}

	type categoryWithCount {
		categories: [categoryData]
		total: Int
	}

	type Query {
		getCategories(limit: Int, skip: Int, keyword: String): categoryWithCount
	}

	type Mutation {
		addCategory(name: String): categoryData
		editCategory(categoryId: ID, name: String): categoryData
		deleteCategory(categoryId: ID): Boolean
	}
`

module.exports = { categoryDefs }