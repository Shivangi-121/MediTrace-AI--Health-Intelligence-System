exports.uploadReport = (req, res) => {

  if (!req.file) {
    return res.status(400).json({
      message: "No file uploaded"
    });
  }

  res.json({
    message: "Medical report uploaded successfully",
    file: req.file.filename
  });

};