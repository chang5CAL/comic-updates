var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/test")

var Schema = mongoose.Schema;

/*TODO*/
var ComicSchema = new Schema({
  url: {type: String, unique: true},
  comic_title: {type: String, unique: true},
  archive_url: String,
  profile_url: String
});

/*TODO*/
var ComicProfileSchema = new Schema({
	comic_title: {type: String, unique: true},
	tags: [String]
});

/*TODO*/
var ComicChapterSchema = new Schema({
	comic_title: {type: String, unique: true},
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