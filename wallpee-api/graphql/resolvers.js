const merge = require('lodash.merge');

const { userResolvers } = require('./users/resolver');
const { categoryResolvers } = require('./categories/resolver');
const { wallpaperResolvers } = require('./wallpapers/resolver');

module.exports = merge(
    userResolvers,
    categoryResolvers,
    wallpaperResolvers
);
