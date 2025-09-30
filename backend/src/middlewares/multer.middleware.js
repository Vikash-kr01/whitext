import multer from "multer";
// import crypto and use that for filenaming


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/temp')
  },
  filename: function (req, file, cb) {
    // use crypto here for filenaming
    cb(null, file.originalname) // don't use filename
  }
})

const upload = multer({ storage: storage })