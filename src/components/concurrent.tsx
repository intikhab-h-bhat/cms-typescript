import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Define TypeScript interfaces for the data
interface Clinic {
  clinicID: number;
  clinicName: string;
}

interface Staff {
  staffId: number;
  staffName: string;
}

interface Patient {
  patientID: number;
    patientName: string;
}

const DataDropdowns: React.FC = () => {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios.get('https://localhost:7088/api/Concurrent/load-all-data') 
      .then(response => {
        const data = response.data;
        setClinics(data.clinics);
        setStaff(data.staff);
        setPatients(data.patients);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading data:', error);
        setLoading(false);
      });
  }, []);

  console.log(clinics, staff, patients); // Debugging line to check data

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <label>Clinic:</label>
      <select className="dropdown">
      <option key={0} value={0}>Select Clinic</option>
        {clinics.map(clinic => (
          <option key={clinic.clinicID} value={clinic.clinicID}>{clinic.clinicName}</option>
        ))}
      </select>

      <label>Staff:</label>
      <select className="dropdown">
      <option key={0} value={0}>Select Staff</option>
        {staff.map(member => (
          <option key={member.staffId} value={member.staffId}>{member.staffName}</option>
        ))}
      </select>

      <label>Patient:</label>
      <select className="dropdown">
      <option key={0} value={0}>Select Patient</option>
        {patients.map(patient => (
          <option key={patient.patientID} value={patient.patientID}>{patient.patientName}</option>
        ))}
      </select>
    </div>
  );
};

export default DataDropdowns;
