import React from "react";
import { Paper, Typography, List, ListItem, ListItemText } from "@mui/material";

const ReportExtraction = ({ extractedData }) => {
  if (!extractedData) return null;

  return (
    <Paper sx={{ padding: 4, marginTop: 3 }}>
      <Typography variant="h5" gutterBottom>Report Analysis</Typography>
      <List>
        <ListItem><ListItemText primary={`Disease: ${extractedData.disease}`} /></ListItem>
        <ListItem><ListItemText primary={`Medicine: ${extractedData.medicine}`} /></ListItem>
        <ListItem><ListItemText primary={`Doctor: ${extractedData.doctor}`} /></ListItem>
        <ListItem><ListItemText primary={`Date: ${extractedData.date}`} /></ListItem>
      </List>
    </Paper>
  );
};

export default ReportExtraction;