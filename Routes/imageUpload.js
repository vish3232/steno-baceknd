const express = require('express')
const router = express.Router()
const multer = require('multer')
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'imageUploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
let upload = multer({ storage: storage }).single('image')
router.post('/imageUpload',upload,(req,res)=>{
    console.log(req.file)
    return res.status(200).json({
        success:1,
        file:{
            url:"http://localhost:8080/"+req.file.filename
        }
    })
})




module.exports = router