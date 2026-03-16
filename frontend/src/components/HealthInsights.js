import React from "react";
import { Paper, Typography, List, ListItem } from "@mui/material";

const HealthInsights = ({ insights }) => {
  if (!insights || insights.length === 0) return null;

  return (
    <Paper sx={{ padding: 4, marginTop: 3 }}>
      <Typography variant="h5" gutterBottom>Health Insights</Typography>
      <List>
        {insights.map((item, idx) => (
          <ListItem key={idx}>⚠ {item}</ListItem>
        ))}
      </List>
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        <strong>Suggested Action:</strong> Consult a doctor
      </Typography>
    </Paper>
  );
};

export default HealthInsights;