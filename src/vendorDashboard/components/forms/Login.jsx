import React, { useState } from 'react'
import { API_URL } from '../../data/ApiPath'
import { ThreeCircles } from 'react-loader-spinner';


const Login = ({ showWelcomeHandler }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); 
  const [showPassword, setShowPassword] = useState(false)

  const handleShowPassword=()=>{
    setShowPassword(!showPassword);
}

  const loginhandler = async (e) => {
    e.preventDefault();
    setLoading(true);
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
        alert("Login success");
        setEmail("");
        setPassword("");
        localStorage.setItem('loginToken', data.token)
        showWelcomeHandler()
      }

      const vendorId = data.vendorId
      console.log("checking for vendorId:", vendorId)
      const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`)
      window.location.reload()
      const vendorData = await vendorResponse.json();
      if (vendorResponse.ok) {
        const vendorFirmId = vendorData.vendorFirmId;
        const vendorFirmName = vendorData.vendor.firm[0].firmName;

        localStorage.setItem('firmId', vendorFirmId)
        localStorage.setItem('firmName', vendorFirmName)       

      }


    } catch (error) {
      console.error(error);
      alert("Login Fail");            
        }finally{
            setLoading(false);
        }
    
  }

  return (
    <div className="loginsec">
      {loading &&
                  <div className="loadersec">
                      <ThreeCircles visible={loading}
                      height={100}
                      width={100}
                      color='#4fa94d' ariaLabel='three-circles-loading'
                      wrapperClass='' wrapperStyle={{}}/>
                      <p>Login in process...Please wait</p>
                  </div> 
                  
                  }

      {!loading && <form className='authform' onSubmit={loginhandler} autoComplete='off'>
        <h3>Vendor Login</h3>
        <label>Email</label>
        <input type='text' name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='enter your email' /><br />
        <label>Password</label>
        <input type={showPassword? 'text':'password'} name='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='enter your password' /><br />
        <span className= 'showPassword' onClick={handleShowPassword}>{showPassword ? 'Hide': 'Show'}</span>
        
        <div className="btnsubmit">
          <button type='submit'>Submit</button>
        </div>
      </form>}
    </div>

  )
}

export default Login
