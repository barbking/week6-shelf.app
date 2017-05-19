var express = require( 'express' );
var router = express.Router();
var passport = require( 'passport' );
var bodyParser = require( 'body-parser' );
var Shelf = require('../models/shelf.model.js');



router.post('/', function (req,res){
  console.log('in post to shelf:', req.body);
  if(req.isAuthenticated()) {
    // send back user object from database
    console.log('confirmed logged in');
    var newShelfItem;
    newShelfItem = new Shelf(req.body);

    // new Shelf(newShelfItem);
    console.log('new shelf item:', newShelfItem);

    newShelfItem.save( function ( err, response ){
      if (err) {
        console.log('DB error:',err);
        res.sendStatus( 500 );
      } else {
        console.log('DB success:',response);
        res.sendStatus( 201 );
      }
    });
  } else {
    // failure best handled on the server. do redirect here.
    console.log('not logged in :(');
    // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
    res.send(false);
  }
});

router.get('/', function(req,res){
  console.log('in get shelf request');
  Shelf.find().then(function(data){
    console.log('data-->', data);
    res.send(data);
  });
});


router.delete('/:id/:name', function (req,res){
  console.log("in delete shelf request", req.params.id, 'name:', req.params.name, 'user:', req.user.username);
  if(req.isAuthenticated() && req.user.username===req.params.name) {
    Shelf.remove({_id:req.params.id}).then(function(){
      res.sendStatus(200);
    });
  } else {
    res.send("not authorized to delete");
  }
});

module.exports = router;
