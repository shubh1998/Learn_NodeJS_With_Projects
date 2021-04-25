const multer = require("multer");

const uploadFile = multer({
    //If u want to save tha binary data of file in db then don't use dest directly access it in your controller
    // dest: "./src/uploaded_documents",

    limits: {
        //File size mentioned as 1MB
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
      //File should be pdf
      // if(!file.originalname.endsWith(".pdf")){
      //     return cb(new Error("Please upload a pdf file !"));
      // }

      //File should be either doc or docx
      //if(!file.originalname.match(/\.(doc|docx)$/)){
      //  return cb(new Error("Please upload doc or docx file !"));
      //}

      //File should be png, jpg or jpeg
      if(!file.originalname.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/)){
          return cb(new Error("Please upload jpg, jpeg or png image !"));
      }

      cb(undefined, true);
    }
})

module.exports = uploadFile;