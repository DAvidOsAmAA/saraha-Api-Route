import multer, { diskStorage } from "multer"
import { nanoid } from "nanoid";



export function uploadFileCloud() {

  const storage = diskStorage({});

  const multerUpload = multer({ storage })
  return multerUpload
}