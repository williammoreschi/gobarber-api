import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const tpmFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  tpmFolder,
  uploadsFolder: path.resolve(tpmFolder, 'uploads'),
  storage: multer.diskStorage({
    destination: tpmFolder,
    filename(resquest, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('HEX');
      const filename = `${fileHash}-${file.originalname}`;

      return callback(null, filename);
    },
  }),
};
