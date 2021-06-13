const mongoose = require('mongoose');
var slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const draftSchema = new mongoose.Schema({
      //  _id: mongoose.Schema.ObjectId(),  
    title:{type:String,
        required:true}, 
    subtitle:{type:String,
          required:true}, 
      
    paragraph: { 
      type: Object,
      required: true,
     },
     slug: { type: String },
     destination:{
       type:String
     },
     filename:{
      type:String
    },
    download:{
      type:String
    }
  

});

module.exports = mongoose.model('Post', draftSchema);
