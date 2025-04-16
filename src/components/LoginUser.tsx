import React,{useState,FormEvent,ChangeEvent} from "react";
import { useNavigate } from "react-router-dom";

interface ILoginUser {
    email: string;
    password: string;
}

type LoginProps = {
    onLogin: (token: string) => void;
  };

const LoginUser: React.FC<LoginProps> = (props) => {

    const [login,setLogin] = useState<ILoginUser>({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLogin(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch("https://localhost:7098/api/Auth/Login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(login)
            });
            if (response.ok) {
               
                const token = await response.text();
                // setLogin({ email: "", password: "" });
                //localStorage.setItem("token", token);               
                alert("Login successful!");
                props.onLogin(token);
                //navigate("/Staff"); // Redirect to home page after successful login
            } else {
                alert("Error logging in.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Email" onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} />
            <button type="submit">Login</button>
        </form>
    )

}

export default LoginUser;