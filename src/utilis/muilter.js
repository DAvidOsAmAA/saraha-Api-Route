import multer, { diskStorage } from "multer"
import { nanoid } from "nanoid";

export const fileValidation = {
  images: ["image/png", "image/jpg"],
  file: ["application/pdf"]
}

export function uploadFile({ folder, filter }) {

  const storage = diskStorage({
    destination: `uploads/${folder}`, filename: (req, file, cb) => {
      console.log(file);
      cb(null, nanoid() + "__" + file.originalname)
    }
  });
  const fileFilter = (req, file, cb) => {
    if (!filter.includes(file.mimetype)) {
      return cb(new Error("file must be png", false))
    }
    return cb(null, true)
  }

  const multerUpload = multer({ storage, fileFilter })
  return multerUpload
}