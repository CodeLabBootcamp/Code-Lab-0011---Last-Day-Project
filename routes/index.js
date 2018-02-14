var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://codelab:1122334455@ds235328.mlab.com:35328/final').then(function () {
    console.log("Database Connected!")
}).catch(function (error) {
    console.log(error.message)
});

var Cartoon = mongoose.model('Cartoon', {
    name: String,
    isAiring: Boolean,
    description: String,
    episodesCount: Number,
    image: String,
    song: String
});

/* GET home page. */
router.get('/cartoons', function (req, res, next) {

    res.render('index');
});


router.get('/api/cartoons', function (req, res) {

    Cartoon.find(function (error, cartoons) {
        res.json(cartoons);
    })

});
router.post('/api/cartoons', function (req, res) {
    var object = req.param('cartoon')
    var newCartoon = new Cartoon(object);
    newCartoon.save().then(function () {
        res.json({
            isSuccess: true,
            message: "Cartoon Saved!"
        });
    }).catch(function (error) {
        res.json({
            isSuccess: false,
            message: error.message
        });
    })
});
router.delete('/api/cartoons',function (req,res) {
    var id = req.param('id');
   Cartoon.findByIdAndRemove(id).then(function () {
       res.json({
           isSuccess: true,
           message: "Cartoon Deleted!"
       });
   }).catch(function (error) {
       res.json({
           isSuccess: false,
           message: error.message
       });
   })
});

router.put('/api/cartoons',function (req,res) {
   var editing = req.param('cartoon');
    Cartoon.findByIdAndUpdate(editing._id,editing).then(function () {
        res.json({
            isSuccess: true,
            message: "Cartoon Updated!"
        });
    }).catch(function (error) {
        res.json({
            isSuccess: false,
            message: error.message
        });
    });


});
module.exports = router;
