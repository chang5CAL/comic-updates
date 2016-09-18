var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/test")

var Schema = mongoose.Schema;

var ComicSiteSchema = new Schema({
  url: String,
  title: String
});

var ComicSite = mongoose.model("ComicSite", ComicSiteSchema);

module.exports.ComicSite = ComicSite;