import React,{useState,ChangeEvent,FormEvent} from "react";

interface IUser {
    clinicID: number;   
    fullName: string;
    email: string;
    password: string;
}

const RegisterUser: React.FC = () => {

const [user, setUser] = useState<IUser>({
    clinicID: 0,
    fullName: "",
    email: "",
    password: ""
})



const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prev => ({
        ...prev,
        [name]: value
    }));
}

const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
        //const token = localStorage.getItem("token");
        const response = await fetch("https://localhost:7098/api/Auth/Register", {
            method: "POST",
            headers: {
              //  "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });
        if (response.ok) {
            console.error("Error:");
            alert("User registered successfully!");
        } else {
            alert("Error registering user.");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}



    return(

        <form onSubmit={handleSubmit}>
        <input type="number" name="clinicId" placeholder="Clinic Id"  onChange={handleChange} />
        <input type="text"  name="fullName" placeholder="Full Name"  onChange={handleChange} />
        <input type="email"  name="email" placeholder="Email"  onChange={handleChange} />
        <input type="password"  name="password" placeholder="Password"   onChange={handleChange} />
        <button type="submit">Register</button>
      </form>
    )

}

export default RegisterUser;