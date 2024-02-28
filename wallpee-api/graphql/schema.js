const { mergeTypeDefs } = require('@graphql-tools/merge');

const { userDefs } = require('./users/schema');
const { categoryDefs } = require('./categories/schema');
const { wallpaperDefs } = require('./wallpapers/schema');

const types = [userDefs, categoryDefs, wallpaperDefs];

module.exports = mergeTypeDefs(types);