import multer from 'multer';
import path from 'path'

const stortage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, './uploadedDoc')
    },
    filename:(req, file, cb) =>{
       cb(null, Date.now() + path.extname(file.originalname))
    }
  })
  const upload = multer({ 
    storage:stortage,
    limits:{fileSize:'1000000'},
    fileFilter:(req, file, cb, ) => {
        const fileType =   /pdf|doc|xls|ppt|jpeg|jpg|png|gif/                                   
    //     /jpeg|jpg|png|gif/
        const mimeType = fileType.test(file.mimetype)
        const extname = fileType.test(path.extname(file.originalname))
        if (mimeType && extname){
            return cb(null, true)
        }
        cb("Give proper files fromate to upload")
        console.log("Give proper files");
    }
  }).array('documents',  20)


  export default upload;