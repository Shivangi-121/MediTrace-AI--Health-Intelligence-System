// src/components/ReportUpload.js
import React, { useState } from "react";
import { Box, Button, Typography, CircularProgress, Paper, LinearProgress, Chip } from "@mui/material";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt, FaFileMedical, FaCheck } from "react-icons/fa";
import axios from "axios";

const ReportUpload = ({ onDataExtracted }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
      setUploadProgress(0);
      setUploadSuccess(false);
    },
    onDragOver: () => setIsDragOver(true),
    onDragLeave: () => setIsDragOver(false),
    multiple: false,
  });

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("report", file);

    console.log("Uploading file:", file.name, "Size:", file.size);

    try {
      const res = await axios.post("http://localhost:5000/api/upload-report", formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
          console.log("Upload progress:", percentCompleted);
        },
      });
      console.log("Upload successful:", res.data);
      setUploadProgress(100);
      setUploadSuccess(true);
      setTimeout(() => {
        console.log("Calling onDataExtracted with:", res.data);
        onDataExtracted(res.data);
      }, 1500); // Give more time to show success message
    } catch (err) {
      console.error("Upload failed:", err);
      alert(`Upload failed: ${err.response?.data || err.message}`);
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 5, p: 2 }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            mb: 4,
            fontWeight: "bold",
            background: "linear-gradient(45deg, #667eea, #764ba2)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Upload Medical Report
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Paper
          {...getRootProps()}
          sx={{
            border: `2px dashed ${isDragOver ? '#4caf50' : '#2196f3'}`,
            borderRadius: 4,
            p: 6,
            cursor: "pointer",
            background: isDragOver
              ? "linear-gradient(135deg, #e8f5e8, #f3e5f5)"
              : "linear-gradient(135deg, #f0f8ff, #f5f5f5)",
            transition: "all 0.3s ease",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            "&:hover": {
              borderColor: "#4caf50",
              background: "linear-gradient(135deg, #e8f5e8, #f3e5f5)",
              transform: "scale(1.02)",
            },
          }}
        >
          <input {...getInputProps()} />
          <motion.div
            animate={{ y: isDragOver ? -5 : 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Box sx={{ fontSize: 60, color: isDragOver ? "#4caf50" : "#2196f3", mb: 2 }}>
              <FaCloudUploadAlt />
            </Box>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
              {file ? "File Selected!" : "Drag & Drop Your Report"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {file ? "" : "Or click to browse files"}
            </Typography>
          </motion.div>

          {file && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Chip
                icon={<FaFileMedical />}
                label={file.name}
                sx={{
                  mt: 2,
                  background: "linear-gradient(135deg, #2196f3, #64b5f6)",
                  color: "white",
                  "& .MuiChip-icon": { color: "white" },
                }}
              />
            </motion.div>
          )}
        </Paper>
      </motion.div>

      {uploadSuccess && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Paper sx={{ p: 3, mt: 3, borderRadius: 3, backgroundColor: "#e8f5e8", border: "1px solid #4caf50" }}>
            <Typography variant="h6" sx={{ color: "#2e7d32", textAlign: "center" }}>
              ✅ Report uploaded successfully! Processing AI insights...
            </Typography>
          </Paper>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        style={{ textAlign: "center", marginTop: 24 }}
      >
        <Button
          variant="contained"
          onClick={handleUpload}
          disabled={!file || loading}
          sx={{
            px: 4,
            py: 1.5,
            fontSize: "1.1rem",
            borderRadius: 3,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            "&:hover": {
              background: "linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)",
            },
            "&:disabled": {
              background: "#ccc",
            },
            boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
          }}
        >
          {loading ? (
            <>
              <CircularProgress size={20} sx={{ mr: 1, color: "white" }} />
              Uploading...
            </>
          ) : (
            <>
              <FaCheck style={{ marginRight: 8 }} />
              Upload Report
            </>
          )}
        </Button>
      </motion.div>
    </Box>
  );
};

export default ReportUpload;