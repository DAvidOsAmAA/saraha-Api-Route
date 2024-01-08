import multer, { diskStorage } from "multer"
import {nanoid} from "nanoid";

export function uploadFile() {

  const storage = diskStorage({
    destination: "uploads", filename: (req, file, cb) => {
      console.log(file);
      cb(null, nanoid() + "__" + file.originalname)
    }
  });

  const multerUpload = multer({ storage })
  return multerUpload
}