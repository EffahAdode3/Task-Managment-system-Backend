import multer from 'multer';
import path from 'path'
// import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const uploadFolder = "uploadfolder"
// Ensure the upload directory exists
const uploadDir = path.join(__dirname, '../'+ uploadFolder);
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
// }

const stortage = multer.diskStorage({
    destination:(req,file,cb)=>{
        req.body['uploadDir'] = uploadFolder
        cb(null, uploadDir )
    },
    filename:(req, file, cb) =>{
        var filename =  Date.now() + path.extname(file.originalname)
        req.body['filename'] = filename
       cb(null,filename)
    }
  })
  const upload = multer({ 
    storage:stortage,
    limits:{fileSize:'1000000'},
    fileFilter:(req, file, cb, ) => {
        const fileType =   /pdf|doc|xls|ppt|jpeg|jpg|png|csv|gif/                                   
    //     /jpeg|jpg|png|gif/
        const mimeType = fileType.test(file.mimetype)
        const extname = fileType.test(path.extname(file.originalname))
        if (mimeType && extname){
            return cb(null, true)
        }
        cb("Give proper files fromate to upload")
        console.log("Give proper files");
    }
  }).single('documents')
  export default  upload;