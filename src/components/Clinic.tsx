import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';

// Clinic interface
interface Clinic {
  clinicID?: number;
  clinicName: string;
  email: string;
  address: string;
  contactNumber: string;
  website: string;
}

const Clinic:React.FC = ()=> {

  const [clinics, setClinics] = useState<Clinic>({
    clinicName: "",
    email: "",
    address: "",
    contactNumber: "",
    website: ""
  });

  const [data, setData] = useState<Clinic[]>([]);

  // Fetch clinics
  const getClinic = async (): Promise<Clinic[]> => {
    const token = localStorage.getItem("token");
    const response = await fetch("https://localhost:7098/api/Clinic", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
    return response.json();
  };

  useEffect(() => {
    getClinic().then(clinicList => setData(clinicList));
  }, []);

  // Handle form field change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClinics(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Create clinic
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://localhost:7098/api/Clinic", {
        method: "POST",
        headers: {
         "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(clinics)
      });

      if (response.ok) {
        alert("Clinic inserted successfully");
        setClinics({
          clinicName: "",
          email: "",
          address: "",
          contactNumber: "",
          website: ""
        });
        const updatedClinics = await getClinic();
        setData(updatedClinics);
      } else {
        alert("Clinic not saved");
      }
    } catch (error) {
      alert("Server Error");
      console.error(error);
    }
  };

  // Delete clinic
  const handleDelete = async (id: number | undefined) => {
    if (id === undefined) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://localhost:7098/api/Clinic/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (response.ok) {
        alert("Clinic deleted successfully");
        setData(data.filter(c => c.clinicID !== id));
      } else {
        alert("Clinic not deleted");
      }
    } catch (error) {
      alert("Error deleting clinic");
      console.error(error);
    }
  };

  // Edit clinic
  const handleEdit = (clinic: Clinic) => {
    setClinics(clinic);
  };

  // Update clinic
  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://localhost:7098/api/Clinic/${clinics.clinicID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clinics)
      });

      if (response.ok) {
        alert("Clinic updated successfully");
        setClinics({
          clinicName: "",
          email: "",
          address: "",
          contactNumber: "",
          website: ""
        });
        const updatedClinics = await getClinic();
        setData(updatedClinics);
      } else {
        alert("Clinic not updated");
      }
    } catch (error) {
      alert("Error updating clinic");
      console.error(error);
    }
  };

  // UI
  const allClinics = data?.map((row) => (
    <tr key={row.clinicID}>
      <td>{row.clinicName}</td>
      <td>{row.email}</td>
      <td>{row.address}</td>
      <td>{row.contactNumber}</td>
      <td>{row.website}</td>
      <td>
        <button onClick={() => handleDelete(row.clinicID)}>Delete</button>
      </td>
      <td>
        <button onClick={() => handleEdit(row)}>Edit</button>
      </td>
    </tr>
  ));

  return (
    <>
      <div className="form-container">
        <h3>{clinics.clinicID ? "Edit Clinic" : "Add Clinic"}</h3>
        <form onSubmit={clinics.clinicID ? handleUpdate : handleSubmit}>
          <input
            type="text"
            name="clinicName"
            value={clinics.clinicName}
            onChange={handleChange}
            placeholder="Clinic Name"
            required
          />
          <input
            type="email"
            name="email"
            value={clinics.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            type="text"
            name="address"
            value={clinics.address}
            onChange={handleChange}
            placeholder="Address"
            required
          />
          <input
            type="tel"
            name="contactNumber"
            value={clinics.contactNumber}
            onChange={handleChange}
            placeholder="Contact Number"
            pattern="[0-9]{10}"
            maxLength={10}
            required
          />
          <input
            type="text"
            name="website"
            value={clinics.website}
            onChange={handleChange}
            placeholder="Website"
          />
          <button type="submit">
            {clinics.clinicID ? "Update Clinic" : "Add Clinic"}
          </button>
        </form>
      </div>

      <div className="table-container">
        <h3>Clinic Details</h3>
        <table>
          <thead>
            <tr>
              <th>Clinic Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Contact Number</th>
              <th>Website</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>{allClinics}</tbody>
        </table>
      </div>
    </>
  );
}

export default Clinic;