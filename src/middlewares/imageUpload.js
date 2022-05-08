const multer = require('multer');
const path = require('path');

const directory = path.resolve(__dirname, '..', '..', 'uploads');

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => callback(
    null,
    directory,
  ),
  filename: (req, _file, callback) => {
    const { id } = req.params;
    return callback(null, `${id}.jpeg`);
  },
});

const uploadImage = multer({ storage });

module.exports = uploadImage;
