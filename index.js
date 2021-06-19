const express = require('express')
const app = express()
const cors=require('cors')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
mongoose
  .connect(
    'mongodb://localhost:27017/Steno',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))
mongoose.Promise = global.Promise;
app.use(cors())
app.use(bodyparser.json())

const port=process.env.PORT || 8080
app.use(express.static('imageUploads'))
app.use('/post',require('./Routes/post'))
app.use('/draft',require('./Routes/Draft'))
app.use('/image', require('./Routes/imageUpload'))
app.listen(port, () => {
    console.log('Running on port 8080')
})