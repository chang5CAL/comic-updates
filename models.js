var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/test")

var Schema = mongoose.Schema;

var ComicSiteSchema = new Schema({
  url: {type: String, unique: true},
  title: {type: String, unique: true}
});

var ComicSite = mongoose.model("ComicSite", ComicSiteSchema);

module.exports.ComicSite = ComicSite;