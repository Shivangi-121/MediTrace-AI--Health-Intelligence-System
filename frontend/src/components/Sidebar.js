import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import DashboardIcon from "@mui/icons-material/Dashboard";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import TimelineIcon from "@mui/icons-material/Timeline";
import InsightsIcon from "@mui/icons-material/Insights";
import EmergencyIcon from "@mui/icons-material/LocalHospital";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, color: "#4caf50" },
  { text: "Upload Report", icon: <UploadFileIcon />, color: "#2196f3" },
  { text: "Medical Timeline", icon: <TimelineIcon />, color: "#ff9800" },
  { text: "Health Insights", icon: <InsightsIcon />, color: "#9c27b0" },
  { text: "Emergency Profile", icon: <EmergencyIcon />, color: "#f44336" },
];

const Sidebar = ({ onSelect, currentPage = "Dashboard", onClose, compact = false }) => {
  const [selectedItem, setSelectedItem] = useState(currentPage);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    setSelectedItem(currentPage);
  }, [currentPage]);

  const handleSelect = (item) => {
    setSelectedItem(item);
    onSelect(item);
    if (onClose) {
      onClose();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <Box
      sx={{
        width: compact ? "100%" : 280,
        minHeight: "100%",
        background: "linear-gradient(180deg, #1e1e2f 0%, #2a2a3e 100%)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        pt: compact ? 2.5 : 3,
        pb: compact ? 2 : 3,
        boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ padding: "0 16px", marginBottom: compact ? 12 : 16 }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar
            sx={{
              width: 50,
              height: 50,
              bgcolor: "primary.main",
              mr: 2,
            }}
          >
            <PersonIcon />
          </Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", lineHeight: 1.2 }}>
              {user?.name || "User"}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "rgba(255,255,255,0.7)",
                fontSize: "0.8rem",
                wordBreak: "break-word",
              }}
            >
              {user?.email || ""}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ bgcolor: "rgba(255,255,255,0.2)" }} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            mb: compact ? 3 : 4,
            fontWeight: "bold",
            background: "linear-gradient(45deg, #667eea, #764ba2)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          MediTrace AI
        </Typography>
      </motion.div>

      <List sx={{ px: 2, flex: 1 }}>
        {menuItems.map((item, index) => (
          <motion.div
            key={item.text}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
          >
            <ListItemButton
              onClick={() => handleSelect(item.text)}
              sx={{
                mb: 1,
                borderRadius: 3,
                position: "relative",
                overflow: "hidden",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                  transform: "translateX(5px)",
                  transition: "all 0.3s ease",
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  top: 0,
                  height: "100%",
                  width: selectedItem === item.text ? "4px" : "0px",
                  backgroundColor: item.color,
                  transition: "width 0.3s ease",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: selectedItem === item.text ? item.color : "#fff",
                  transition: "color 0.3s ease",
                  minWidth: 40,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  "& .MuiListItemText-primary": {
                    fontWeight: selectedItem === item.text ? "bold" : "normal",
                    color: selectedItem === item.text ? item.color : "#fff",
                    transition: "all 0.3s ease",
                  },
                }}
              />
            </ListItemButton>
          </motion.div>
        ))}
      </List>

      <Box sx={{ px: 2, mt: "auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Button
            fullWidth
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{
              color: "#fff",
              borderColor: "rgba(255,255,255,0.3)",
              borderRadius: 3,
              py: 1,
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.1)",
                borderColor: "rgba(255,255,255,0.5)",
              },
            }}
            variant="outlined"
          >
            Logout
          </Button>
        </motion.div>
      </Box>
    </Box>
  );
};

export default Sidebar;
