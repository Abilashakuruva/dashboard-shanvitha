import React, { useState } from 'react'
import { API_URL } from '../../data/ApiPath'

const Login = ({ showWelcomeHandler }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  const loginhandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/vendor/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })

      });

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        alert("Login success");
        setEmail("");
        setPassword("");
        localStorage.setItem('loginToken', data.token)
        showWelcomeHandler()
      }
      const vendorId = data.vendorId
      console.log("checking for vendorId:", vendorId)
      const vendorResponse=await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`)
      const vendorData=await vendorResponse.json();
      if(vendorResponse.ok){
        const vendorFirmId=vendorData.vendorFirmId;
        console.log("checking for firmId",vendorFirmId);
        localStorage.setItem('firmId',vendorFirmId)
      }

    } catch (error) {
      console.error(error);

    }
  }





  return (
    <div className="loginsec">

      <form className='authform' onSubmit={loginhandler}>
        <h3>Vendor Login</h3>
        <label>Email</label><br />
        <input type='text' name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='enter your email' /><br />
        <label>Password</label><br />
        <input type='text' name='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='enter your password' /><br />
        <div className="btnsubmit">
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>

  )
}

export default Login
