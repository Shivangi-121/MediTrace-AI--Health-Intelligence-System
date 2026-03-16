exports.getEmergencyProfile = (req, res) => {

  const patientId = req.params.patientId;

  const emergencyProfile = {
    patientId: patientId,
    name: "Rahul Sharma",
    bloodGroup: "O+",
    allergies: ["Penicillin"],
    chronicDiseases: ["Diabetes"],
    emergencyContact: {
      name: "Anita Sharma",
      relation: "Mother",
      phone: "9876543210"
    }
  };

  res.json({
    message: "Emergency profile fetched successfully",
    data: emergencyProfile
  });

};