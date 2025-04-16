import React,{useState,useEffect,ChangeEvent,FormEvent} from 'react';

interface Staff {
    staffID?: number;
    clinicID: number;
    clinicName?: string;
    staffName: string;
    email: string;
    contactNumber: string;
    dateOfJoining: string;
}
interface Clinic {
    clinicID?: number|number;
    clinicName: string;
}
    

const Staff:React.FC = () => {

    const [clinics, setClinics] = useState<Clinic[]>([]);
    const [staff, setStaff] = useState<Staff>({
        clinicID: 0,
        clinicName: "",
        staffName: "",
        email: "",
        contactNumber: "",
        dateOfJoining: "",
        staffID: 0
    });
const [data, setData] = useState<Staff[]>([]);


const getClinics = async (): Promise<Clinic[]> => {
    const token = localStorage.getItem("token");
    const response = await fetch("https://localhost:7098/api/Clinic", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });
    return response.json();
}

    // useEffect(() => {
    //     getClinics().then(clinicList => setClinics(clinicList));
    // }
    // , []);



    const getStaff= async (): Promise<Staff[]> => {
        const token = localStorage.getItem("token");
        const response = await fetch("https://localhost:7098/api/Staff", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        return response.json();

    }

    useEffect(() => {
        getStaff().then(staffList => setData(staffList));
        getClinics().then(clinicList => setClinics(clinicList));
    }, []);

console.log(data)
     // UI
  const allstaff = data?.map((row) => (
    <tr key={row.staffID}>
        <td>{row.clinicID}</td>
        <td>{row.clinicName}</td>
      <td>{row.staffName}</td>
      <td>{row.email}</td>
       <td>{row.contactNumber}</td>
      <td>{row.dateOfJoining}</td>
      <td>
        <button onClick={() => handleDelete(row.staffID)}>Delete</button>
      </td>
      <td>
        <button onClick={() => handleEdit(row)}>Edit</button>
      </td>
    </tr>
  ));    


const handleSubmit = async (e:FormEvent) => {

    e.preventDefault();
    try{
        const token = localStorage.getItem("token");

        const response = await fetch("https://localhost:7098/api/Staff", {
            method: "POST",
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json"                
                    },
            body: JSON.stringify(staff)
        })
        if(response.ok){
            alert("Staff added successfully");
            setStaff({
                clinicID: 0,
                clinicName: "",
                staffName: "",
                email: "",
                contactNumber: "",
                dateOfJoining: "",
                staffID: 0
            });
            const updatedStaff = await getStaff();
            setData(updatedStaff);
        }else{
            alert("Staff not added");
        }

    }catch(error){
        alert("Error adding staff");
        console.error(error);
    }
  }




  const handleEdit = (staff: Staff) => {
    // setStaff(staff);
    setStaff({
        staffID: staff.staffID,
        staffName: staff.staffName,
        clinicID: staff.clinicID, 
        email: staff.email,
        contactNumber: staff.contactNumber,
        dateOfJoining: staff.dateOfJoining
      });
  }
  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://localhost:7098/api/Staff/${staff.staffID}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(staff)
      });

      if (response.ok) {
        alert("Staff updated successfully");
        setStaff({
          clinicID: 0,
          clinicName: "",
          staffName: "",
          email: "",
          contactNumber: "",
          dateOfJoining: "",
          staffID: 0
        });
        const updatedStaff = await getStaff();
        setData(updatedStaff);
      } else {
        alert("Staff not updated");
      }
    } catch (error) {
      alert("Server Error");
      console.error(error);
    }
  };
  

  const handleDelete = async (staffID: number| undefined) => {
    if(staffID === undefined) return;

    try{
        const token = localStorage.getItem("token");

        const response = await fetch(`https://localhost:7098/api/Staff/${staffID}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
    
        if(response.ok){
            alert("Staff deleted successfully");
            const updatedStaff = await getStaff();
            setData(updatedStaff);
        } else {
            alert("Failed to delete staff");
        }
    
    } catch(error){
        alert("Server Error");
        console.error(error);
    }
    };



  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setStaff(prev => ({
      ...prev,
      [name]: value
    }));
  };



    return(
        <>
        <div className="form-container">
        <h3>Add Staff</h3>
        <form onSubmit={staff.staffID === 0 ? handleSubmit : handleUpdate}>
    <select className="dropdown" name="clinicID" value={staff.clinicID} onChange={handleChange} required>
        <option value="">Select Clinic</option>
        {clinics.map(clinic => (
            <option key={clinic.clinicID} value={clinic.clinicID}>{clinic.clinicName}</option>
        ))}
    </select>

    <input type="text" name="staffName" value={staff.staffName} onChange={handleChange} placeholder="Staff Name" required />
    <input type="email" name="email" value={staff.email} onChange={handleChange} placeholder="Email" required />
    <input type="text" name="contactNumber" value={staff.contactNumber} onChange={handleChange} placeholder="Contact Number" required />
    <input type="date" name="dateOfJoining" value={staff.dateOfJoining} onChange={handleChange} required />

    <button type="submit">{staff.staffID === 0 ? "Add Staff" : "Update Staff"}</button>
</form>
        
        </div>
               
                <div className="table-container">
                <h3>Staff Details</h3>
         <table>
           <thead>
               <tr>         
               <th>Clinic Id</th>  
               <th>Clinic Name</th>  
                    
                   <th>Staff Name</th>
                   <th>Email</th>        
                   <th>Contact Number</th>  
                   <th>Joining Date</th>        
                   <th>Delete</th>
                   <th>Edit</th>
              
               </tr>
           </thead>
         <tbody>
        {
         allstaff?allstaff:<p>No Data Found</p>
        }
             </tbody>
             </table>
        </div>           
        
                </>
    )


}

export default Staff;