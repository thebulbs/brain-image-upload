var express = require('express')
var cors = require('cors')
var multer  = require('multer')
var multerS3 = require('multer-s3')
var AWS = require('aws-sdk')
var s3 = new AWS.S3({signatureVersion: 'v4'})

var app = express()
app.use(cors())

var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'brain-mapper',
        acl: 'public-read',
        key: function (req, file, cb) {
            cb(null, 'bulb/' + file.originalname);
        }
    })
})

app.post('/', upload.single('file'), function(req, res) {
    res.send('Successfully uploaded')
})

app.listen(3000, function () {
  console.log('Uploader listening on port 3000!')
});