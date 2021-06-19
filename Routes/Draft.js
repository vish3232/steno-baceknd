const express = require('express')
const router = express.Router()
const draft =require('../Model/Draft')
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
router.post('/createDraft',upload,(req,res)=>{
    console.log(req.body.paragraph)
    const file = req.file
    if(req.body.title!==null||req.body.paragraph!==null){
    draft.create({title:req.body.title,subtitle:req.body.subtitle,paragraph:req.body.paragraph,slug:req.body.slug,destination: file.destination, filename: file.filename, download: file.path }).then(data => {
        return res.status(200).json({
            message: 'insert successfully...',
            draftData:data
        })
    })
}else{
    if(req.body.title===null||req.body.paragraph===null){
    return res.status(400).json({
        message: 'please enter title and paragraph...',
        draftData:data
    })
}else if(req.body.title===null){
    return res.status(400).json({
        message: 'please enter title...',
        draftData:data
    })
}else if(req.body.paragraph===null){
    return res.status(400).json({
        message: 'please enter paragraph...',
        draftData:data
    })
}

}
})

router.get('/getAllDraftData',(req,res)=>{
    draft.find({}).then((data)=>{
        return res.status(200).json({
            message: 'success...',
            draftData:data
        })
    })
})

router.post('/getDraftAsPerId/:posts/:slug',(req,res)=>{
    console.log(req.params.slug)
    draft.find({_id:req.params.posts,slug:req.params.slug}).then((data)=>{
        
        return res.status(200).json({
            message: 'success...',
            draftData:data
        
        })
    })
})

module.exports = router
