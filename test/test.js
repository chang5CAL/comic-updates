var assert = require('assert');
var Models = require('../modelsTest');
var mongoose = require('mongoose');



describe('Models', function() {
  describe('Genre', function() {

  	var id = null;

  	before(function() {
  		id = mongoose.Types.ObjectId();
  	});

  	after(function(done) {
  		id = null;
  		Models.Genre.remove({}, function(err, res) {
  			done(err);
  		})
  	})

    it('Saving a Genre', function(done) {
			var genre = new Models.Genre({
				genre: "Test",
				comic_id: id 
			});
      assert.equal("Test", genre.genre);
      assert.equal(id, genre.comic_id);
      genre.save(function(err, res) {
	      assert.equal("Test", res.genre);
	      assert.equal(id, res.comic_id);
	      done(err);
      })
    });

    it('Finding a Genre', function(done) {
			Models.Genre.find({comic_id: id}).exec(function(err, res) {
				assert.equal(1, res.length);
				var genre = res[0];
				assert.equal("Test", genre.genre);
	      done(err);
			});
    });
  });
});
