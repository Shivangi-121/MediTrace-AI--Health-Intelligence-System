import React, { useState } from "react";
import { Box, Button, Chip, CircularProgress, Paper, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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

    try {
      const res = await axios.post("http://localhost:5000/api/upload-report", formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        },
      });
      setUploadProgress(100);
      setUploadSuccess(true);
      setTimeout(() => {
        onDataExtracted(res.data);
        setLoading(false);
        setFile(null);
        setUploadSuccess(false);
      }, 1500);
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.response?.data?.message || err.message || "Upload failed";
      alert(`Upload failed: ${errorMessage}`);
      setLoading(false);
      setUploadProgress(0);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: { xs: 2, sm: 5 }, p: { xs: 2, sm: 2.5 } }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Typography
          variant={isMobile ? "h5" : "h4"}
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

      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.5 }}>
        <Paper
          {...getRootProps()}
          sx={{
            border: `2px dashed ${isDragOver ? "#4caf50" : "#2196f3"}`,
            borderRadius: 4,
            p: { xs: 3, sm: 6 },
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
              transform: "scale(1.01)",
            },
          }}
        >
          <input {...getInputProps()} />
          <motion.div animate={{ y: isDragOver ? -5 : 0 }} transition={{ type: "spring", stiffness: 300 }}>
            <Box sx={{ fontSize: { xs: 48, sm: 60 }, color: isDragOver ? "#4caf50" : "#2196f3", mb: 2 }}>
              <FaCloudUploadAlt />
            </Box>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold", fontSize: { xs: "1.05rem", sm: "1.25rem" } }}>
              {file ? "File Selected" : "Drag and Drop Your Report"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {file ? "Tap upload to start AI processing." : "Or tap to browse files from your device"}
            </Typography>
          </motion.div>

          {file && (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
              <Chip
                icon={<FaFileMedical />}
                label={file.name}
                sx={{
                  mt: 2,
                  maxWidth: "100%",
                  background: "linear-gradient(135deg, #2196f3, #64b5f6)",
                  color: "white",
                  "& .MuiChip-icon": { color: "white" },
                  "& .MuiChip-label": {
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  },
                }}
              />
            </motion.div>
          )}
        </Paper>
      </motion.div>

      {loading && uploadProgress > 0 && (
        <Typography variant="body2" sx={{ mt: 2, textAlign: "center", color: "text.secondary" }}>
          Uploading: {uploadProgress}%
        </Typography>
      )}

      {uploadSuccess && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Paper sx={{ p: 3, mt: 3, borderRadius: 3, backgroundColor: "#e8f5e8", border: "1px solid #4caf50" }}>
            <Typography variant="h6" sx={{ color: "#2e7d32", textAlign: "center", fontSize: { xs: "1rem", sm: "1.25rem" } }}>
              Report uploaded successfully. Processing AI insights...
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
          fullWidth={isMobile}
          sx={{
            px: 4,
            py: 1.5,
            fontSize: "1.05rem",
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
