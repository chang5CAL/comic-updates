var assert = require('assert');
var Models = require('../modelsTest');
var mongoose = require('mongoose');



describe('Models', function() {
  describe('Genre', function() {


  	after(function(done) {
  		Models.Genre.remove({}, function(err, res) {
  			done(err);
  		})
  	})

    it('should be defined the same', function() {
    	var id = mongoose.Types.ObjectId();
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


  });

  describe('#indexOf1()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});
