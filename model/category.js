var mongoose = require('mongoose');

var catschema = new mongoose.Schema({
   cat_name:{
    type:String
   },
   cat_image:{
      type:String
   }
});

module.exports = mongoose.model("cat",catschema);
