// src/pages/Login.js
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Tabs,
  Tab,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import { motion } from "framer-motion";
import { FaHeartbeat } from "react-icons/fa";
import { Person, Email, Lock, Phone, Cake } from "@mui/icons-material";

const Login = ({ onLogin }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    emergencyContact: "",
    bloodGroup: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setError("");
  };

  const handleLogin = () => {
    if (!loginData.email || !loginData.password) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // In a real app, this would validate against a backend
      localStorage.setItem('user', JSON.stringify({ email: loginData.email, name: "John Doe" }));
      onLogin();
    }, 1500);
  };

  const handleSignup = () => {
    const required = ['name', 'email', 'password', 'confirmPassword', 'phone'];
    const missing = required.filter(field => !signupData[field]);

    if (missing.length > 0) {
      setError("Please fill in all required fields");
      return;
    }

    if (signupData.password !== signupData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (signupData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // In a real app, this would create account in backend
      localStorage.setItem('user', JSON.stringify({
        name: signupData.name,
        email: signupData.email,
        phone: signupData.phone,
        dateOfBirth: signupData.dateOfBirth,
        gender: signupData.gender,
        emergencyContact: signupData.emergencyContact,
        bloodGroup: signupData.bloodGroup
      }));
      onLogin();
    }, 2000);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        p: 2,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      >
        <Paper
          elevation={10}
          sx={{
            maxWidth: 500,
            width: "100%",
            p: 4,
            borderRadius: 4,
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{ textAlign: "center", marginBottom: 24 }}
          >
            <FaHeartbeat size={50} color="#667eea" />
            <Typography variant="h4" sx={{ mt: 2, fontWeight: "bold", color: "#333" }}>
              MediTrace AI
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Secure Patient Health Account
            </Typography>
          </motion.div>

          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            sx={{
              mb: 3,
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: "bold",
                minHeight: 48
              }
            }}
          >
            <Tab label="Login" />
            <Tab label="Sign Up" />
          </Tabs>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {activeTab === 0 && (
            // Login Form
            <Box>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  sx={{ mb: 2 }}
                  variant="outlined"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  sx={{ mb: 3 }}
                  variant="outlined"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleLogin}
                  disabled={isLoading}
                  sx={{
                    py: 1.5,
                    fontSize: "1.1rem",
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    "&:hover": {
                      background: "linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)",
                    },
                    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
                  }}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </motion.div>
            </Box>
          )}

          {activeTab === 1 && (
            // Signup Form
            <Box sx={{ maxHeight: 400, overflowY: "auto" }}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <TextField
                  fullWidth
                  label="Full Name"
                  value={signupData.name}
                  onChange={(e) => setSignupData({...signupData, name: e.target.value})}
                  sx={{ mb: 2 }}
                  variant="outlined"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={signupData.email}
                  onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                  sx={{ mb: 2 }}
                  variant="outlined"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={signupData.phone}
                  onChange={(e) => setSignupData({...signupData, phone: e.target.value})}
                  sx={{ mb: 2 }}
                  variant="outlined"
                  required
                />
              </motion.div>

              <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  style={{ flex: 1 }}
                >
                  <TextField
                    fullWidth
                    label="Date of Birth"
                    type="date"
                    value={signupData.dateOfBirth}
                    onChange={(e) => setSignupData({...signupData, dateOfBirth: e.target.value})}
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                  style={{ flex: 1 }}
                >
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Gender</InputLabel>
                    <Select
                      value={signupData.gender}
                      onChange={(e) => setSignupData({...signupData, gender: e.target.value})}
                      label="Gender"
                    >
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </motion.div>
              </Box>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0, duration: 0.5 }}
              >
                <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                  <InputLabel>Blood Group</InputLabel>
                  <Select
                    value={signupData.bloodGroup}
                    onChange={(e) => setSignupData({...signupData, bloodGroup: e.target.value})}
                    label="Blood Group"
                  >
                    <MenuItem value="A+">A+</MenuItem>
                    <MenuItem value="A-">A-</MenuItem>
                    <MenuItem value="B+">B+</MenuItem>
                    <MenuItem value="B-">B-</MenuItem>
                    <MenuItem value="AB+">AB+</MenuItem>
                    <MenuItem value="AB-">AB-</MenuItem>
                    <MenuItem value="O+">O+</MenuItem>
                    <MenuItem value="O-">O-</MenuItem>
                  </Select>
                </FormControl>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1, duration: 0.5 }}
              >
                <TextField
                  fullWidth
                  label="Emergency Contact"
                  value={signupData.emergencyContact}
                  onChange={(e) => setSignupData({...signupData, emergencyContact: e.target.value})}
                  sx={{ mb: 2 }}
                  variant="outlined"
                  placeholder="Name and phone number"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  value={signupData.password}
                  onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                  sx={{ mb: 2 }}
                  variant="outlined"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3, duration: 0.5 }}
              >
                <TextField
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  value={signupData.confirmPassword}
                  onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
                  sx={{ mb: 3 }}
                  variant="outlined"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.5 }}
              >
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleSignup}
                  disabled={isLoading}
                  sx={{
                    py: 1.5,
                    fontSize: "1.1rem",
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    "&:hover": {
                      background: "linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)",
                    },
                    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
                  }}
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </motion.div>
            </Box>
          )}
        </Paper>
      </motion.div>
    </Box>
  );
};

export default Login;