var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/test")

var Schema = mongoose.Schema;

var kittenSchema = new Schema({
  name: String
});

var Kitten = mongoose.model("Kitten", kittenSchema);

module.exports.Kitten = Kitten;