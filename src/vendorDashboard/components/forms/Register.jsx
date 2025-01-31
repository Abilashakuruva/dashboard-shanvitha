import React, {useState} from 'react'
import {API_URL} from '../../data/ApiPath'

const Register = ({showLoginHandler}) => {
    const[username,setUsername]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[error,setError]=useState("");
    const[loading,setLoading]=useState(true)


    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const response=await fetch(`${API_URL}/vendor/register`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({username,email,password})

            });

            const data= await response.json();
            if (response.ok){
                console.log(data);
                setUsername("");
                setEmail("");
                setPassword("");
                alert("Vendor registered successfully");
                showLoginHandler()
            }
        } catch (error) {
            console.log("register fail",error);
            alert("register failed");

            
        }
    }


    return (
        <div className="registersec">
            
                <form className='authform' onSubmit={handleSubmit}>
                    <h3>Vendor Register</h3>
                        <label>UserName</label><br/>
                        <input type='text' name='username'value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='enter your name' /><br/>
                        <label>Email</label><br/>
                        <input type='text' name='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='enter your email' /><br/>
                        <label>Password</label><br/>
                        <input type='text' name='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='enter your password' /><br/>
                        <div className="btnsubmit">
                            <button type='submit'>Submit</button>
                        </div>
                </form>
        </div>
    )
}

export default Register
