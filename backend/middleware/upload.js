const multer = require('multer');
const cloudinary = require('cloudinary').v2;

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cấu hình Multer (lưu file vào bộ nhớ RAM)
const storage = multer.memoryStorage();
const upload = multer({storage});

// Middleware upload nhiều ảnh lên Cloudinary
const uploadMultipleToCloudinary = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({success: false, message: 'No files uploaded'});
    }

    // Upload từng file lên Cloudinary
    const uploadPromises = req.files.map(async file => {
      const fileBuffer = file.buffer.toString('base64');
      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${fileBuffer}`,
        {
          folder: 'uploads',
        },
      );
      return result.secure_url; // Trả về URL ảnh
    });

    req.imageUrls = await Promise.all(uploadPromises); // Lưu danh sách URL vào request
    next(); // Chuyển sang middleware/controller tiếp theo
  } catch (error) {
    return res
      .status(500)
      .json({success: false, message: 'Upload failed', error});
  }
};

module.exports = {upload, uploadMultipleToCloudinary};
