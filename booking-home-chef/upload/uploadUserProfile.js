
const multer  = require('multer')
const mkdir = require('mkdirp')


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    mkdir('./public/upload')
    cb(null, './public/upload')
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null,  '-' + Date.now()+file.originalname)
  }
})

const upload = multer({ storage: storage })
module.exports = upload