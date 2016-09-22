var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/test")

var Schema = mongoose.Schema;

/*TODO*/
var ComicSchema = new Schema({
  url: {type: String, unique: true},
  comic_title: {type: String, unique: true}
});

/*TODO*/
var ComicProfileSchema = new Schema({
	comic_title: {type: String, unique: true},
	tags: [String]
});

/*TODO*/
var ComicChapter = new Schema({
	comic_title: {type: String, unique: true},
	chapter_title: String,
	chapter: Number,
	chapter_url: String
});

var TagSchema = new Schema({
	tag: {type: String, unique: true},
	comics: [Schema.Types.ObjectId]
});

var Comic = mongoose.model("Comic", ComicSchema);
var ComicProfile = mongoose.model("ComicProfile", ComicSchema);
var ComicChapters = mongoose.model("ComicChapters", ComicChaptersSchema);
var Tag = mongoose.model("Tag", TagSchema)
module.exports.ComicSite = ComicSite;