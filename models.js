var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/test")

var Schema = mongoose.Schema;

/*TODO*/
var ComicSchema = new Schema({
  url: {type: String, unique: true},
  comic_title: {type: String, unique: true},
  archive_url: String,
  profile_url: String,
  current_chapter: Number,
  current_chapter_url: String,
  image: String
});

/*TODO*/
var ProfileSchema = new Schema({
	comics_id: {type: Schema.Types.ObjectId, index: true},
	comic_title: String,
	genre: [String],
	language: String,
	author: String,
	description: String,
	first_page: String
});

/*TODO*/
var ChapterSchema = new Schema({
	comics_id: {type: Schema.Types.ObjectId, index: true},
	comic_title: String,
	chapter_title: String,
	chapter: Number,
	chapter_url: {type: String, unique: true},
	date_added: String
});

var GenreSchema = new Schema({
	genre: {type: String, index: true},
	comics: [Schema.Types.ObjectId]
});

var kittenSchema = new Schema({
  name: String
});


var Comic = mongoose.model("Comic", ComicSchema);
var Profile = mongoose.model("Profile", ProfileSchema);
var Chapter = mongoose.model("Chapter", ChapterSchema);
var Genre = mongoose.model("Genre", GenreSchema)
var Kitten = mongoose.model("Kitten", kittenSchema);

module.exports.Comic = Comic;
module.exports.Profile = Profile;
module.exports.Chapter = Chapter;
module.exports.Genre = Genre;
module.exports.Kitten = kittenSchema;
