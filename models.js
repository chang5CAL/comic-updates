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
var ComicProfileSchema = new Schema({
	comics_id: {type: Schema.Types.ObjectId, index: true}
	comic_title: String,
	genre: [String],
	language: String,
	author: String,
	description: String,
	first_page: String
});

/*TODO*/
var ComicChapterSchema = new Schema({
	comics_id: {type: Schema.Types.ObjectId, index: true}
	comic_title: String,
	chapter_title: String,
	chapter: Number,
	chapter_url: String
});

var TagSchema = new Schema({
	tag: {type: String, unique: true},
	comics: [Schema.Types.ObjectId]
});

var kittenSchema = new Schema({
  name: String
});


var Comic = mongoose.model("Comic", ComicSchema);
var ComicProfile = mongoose.model("ComicProfile", ComicSchema);
var ComicChapter = mongoose.model("ComicChapter", ComicChapterSchema);
var Tag = mongoose.model("Tag", TagSchema)
var Kitten = mongoose.model("Kitten", kittenSchema);

module.exports.Comic = Comic;
module.exports.ComicProfile = ComicProfile;
module.exports.ComicChapter = ComicChapter;
module.exports.Tag = TagSchema;
module.exports.Kitten = kittenSchema;
