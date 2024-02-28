var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WallpaperSchema = new Schema({
    name: String,
    image: String, 
    likes: [{ type: Schema.ObjectId, ref: 'Users' }], 
    downloads: [{ type: Schema.ObjectId, ref: 'Users' }], 
    categoryId: { type: Schema.ObjectId, ref: 'Categories' },
    isFeatured: { type: Boolean, default: false }
}, {
  timestamps: true
});

module.exports = mongoose.model('Wallpapers', WallpaperSchema);