const cloudinary = require('cloudinary').v2;

// Configure Cloudinary (use your credentials)
cloudinary.config({
  cloud_name: 'dppzvw3kd',
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const handleUpload = async (req, res) => {
  try {
    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const postId = req.body.postId;
    const uploadedResults = [];


    // Because upload_stream is callback based, wrap it like this:
    const uploadFromBuffer = (buffer, publicId) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: 'image',
             public_id: publicId,
              overwrite: true 
            },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        stream.end(buffer);
      });
    };

    for (const file of files) {
      const uploadResult = await uploadFromBuffer(file.buffer, `${postId}_${file.originalname}`);
      uploadedResults.push(uploadResult.secure_url);
    }

    res.status(200).json({
     uploadedResults
    });

    console.log("images Sent")

    return uploadedResults;

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Upload failed', details: error.message });
  }
};

module.exports = handleUpload;