var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/test")

var Schema = mongoose.Schema;

var ComicSchema = new Schema({
  url: {type: String, unique: true},
  comic_title: {type: String, unique: true},
  archive_url: String,
  profile_url: String,
  current_chapter: Number,
  image: String,
  last_checked: Date
});

var ProfileSchema = new Schema({
	comic_id: {type: Schema.Types.ObjectId, index: true},
	comic_title: String,
	genre: [String],
	language: String,
	author: String,
	description: String,
	first_page: String
});

var PageSchema = new Schema({
	comic_id: {type: Schema.Types.ObjectId, index: true},
	comic_title: String,
	page_title: String,
	page: Number,
	page_url: {type: String, unique: true},
	date_added: String
});

var GenreSchema = new Schema({
	genre: {type: String, index: true},
	comic_id: {type: Schema.Types.ObjectId, unique: true}
});

var kittenSchema = new Schema({
  name: String
});

var Comic = mongoose.model("Comic", ComicSchema);
var Profile = mongoose.model("Profile", ProfileSchema);
var Page = mongoose.model("Page", PageSchema);
var Genre = mongoose.model("Genre", GenreSchema)
var Kitten = mongoose.model("Kitten", kittenSchema);

module.exports.Comic = Comic;
module.exports.Profile = Profile;
module.exports.Page = Page;
module.exports.Genre = Genre;
module.exports.Kitten = Kitten;
