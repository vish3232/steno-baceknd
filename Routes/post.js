const express = require('express')
const router = express.Router()
const post =require('../Model/post')
const multer = require('multer')
const { json } = require('body-parser')
var request = require("request")
let toJson = require("node-html2json");
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'imageUploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
let upload = multer({ storage: storage }).single('image')
router.post('/createPost',upload,(req,res)=>{
    console.log(req.body.paragraph)
    const file = req.file
    if(req.body.title!==null||req.body.paragraph!==null){
    post.create({title:req.body.title,subtitle:req.body.subtitle,paragraph:req.body.paragraph,slug:req.body.slug,destination: file.destination, filename: file.filename, download: file.path }).then(data => {
        return res.status(200).json({
            message: 'insert successfully...',
            postData:data
        })
    })
}else{
    if(req.body.title===null||req.body.paragraph===null){
    return res.status(400).json({
        message: 'please enter title and paragraph...',
        postData:data
    })
}else if(req.body.title===null){
    return res.status(400).json({
        message: 'please enter title...',
        postData:data
    })
}else if(req.body.paragraph===null){
    return res.status(400).json({
        message: 'please enter paragraph...',
        postData:data
    })
}

}
})

router.get('/getAllPostData',(req,res)=>{
    post.find({}).then((data)=>{
        return res.status(200).json({
            message: 'success...',
            postData:data
        })
    })
})

router.post('/getPostAsPerId/:posts/:slug',(req,res)=>{
    console.log(req.params.slug)
    post.find({_id:req.params.posts,slug:req.params.slug}).then((data)=>{
        
        return res.status(200).json({
            message: 'success...',
            postData:data
        
        })
    })
})

router.delete('/deletePostAsPerId',(req,res)=>{
    //console.log(req.body)
    post.deleteOne({_id:req.body.id}).then((data)=>{
        console.log(data)
        if (data.deletedCount === 1) {
            return res.status(200).json({
                message: 'success...',
               
            })
        }
    })
})



router.get('/fechURL',(req,res)=>{
    var url = "http://google.com"

request({
    url: url,
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
        let mapping = {
            title: "head>title",
          };
        let responseData =toJson(body,mapping)
        console.log( responseData)
        return res.status(200).json({
            success:1,
            "meta": {
                // ... any fields you want
                 responseData
            }
        })
    }
})

})

module.exports = router