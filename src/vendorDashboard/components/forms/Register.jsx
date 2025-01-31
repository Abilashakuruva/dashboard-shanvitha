import React, {useState} from 'react'
import {API_URL} from '../../data/ApiPath'
import { ThreeCircles } from 'react-loader-spinner';

const Register = ({showLoginHandler}) => {
    const[username,setUsername]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[error,setError]=useState("");
    const[loading,setLoading]=useState(false); //set loading is false initially
    const[showPassword,setShowPassword]=useState(false)

    const handleShowPassword=()=>{
        setShowPassword(!showPassword);
    }



    const handleSubmit=async(e)=>{
        e.preventDefault();
        setLoading(true);  //set loading is true when request starts
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
            }else{
                setError(data.error);
                alert("Registration Failed, Contact Admin")
            }
        } catch (error) {
            console.log("Registration Failed",error);
            alert("Registration Failed");

            
        }finally{
            setLoading(false);
        }
    }


    return (
        <div className="registersec">
            {loading &&
            <div className="loadersec">
                <ThreeCircles visible={loading}
                height={100}
                width={100}
                color='#4fa94d' ariaLabel='three-circles-loading'
                wrapperClass='' wrapperStyle={{}}/>
                <p>Hi, Your Registration under process</p>
            </div> 
            
            }
            
                {!loading &&<form className='authform' onSubmit={handleSubmit} autoComplete='off'>
                    <h3>Vendor Register</h3>
                        <label>UserName</label>
                        <input type='text' name='username'value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='enter your name' /><br/>
                        <label>Email</label>
                        <input type='text' name='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='enter your email' /><br/>
                        <label>Password</label>
                        <input type= {showPassword? 'text':'password'} name='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='enter your password' /><br/>
                        <span className= 'showPassword' onClick={handleShowPassword}>{showPassword ? 'Hide': 'Show'}</span>

                        <div className="btnsubmit">
                            <button type='submit'>Submit</button>
                        </div>
                </form>}
        </div>
    )
}

export default Register
