import { Box, Stack, Alert } from "@mui/material";
import React, { useState } from "react";
import { auth } from "./firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";





const Login = () => {
  const [number, setNumber] = useState('')
  const [otp, setOtp] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [form, setForm] = useState(false)
  const [verified, setverified] = useState(false)

  const ChangeHandler = (e) => {
    setNumber(e.target.value)
  }




  const getOtp = () => {
    if(!number){
      alert("please enter valid phone number")
    }
    else{
      window.recaptchaVerifier = new RecaptchaVerifier('recaptcha', {}, auth);
      let verifier = window.recaptchaVerifier
      signInWithPhoneNumber(auth, number, verifier).then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        console.log(confirmationResult)
        setConfirmation(confirmationResult)
        setForm(true)
      }).catch((error) => {
        console.log(error)
      });
    }
   
  }


  const verifyOtp = () => {
    const code = otp
    confirmation.confirm(code).then((result) => {
      if (result) {
        const user = result.user;
        console.log(user)
        setverified(true)
        setNumber('')
        setOtp('')
      }
    }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      console.log(error)
    });
  }



  return (
    <Box sx={{ width: '300px', mx: 'auto',border:'solid 1px black',mt:'100px',p:'20px', borderRadius: '8px',boxShadow: '3px 3px 8px rgba(0, 0, 0, 0.45)'  }}>

      <h2>Auth Login</h2>
      <input
        value={number}
        placeholder="Enter phone number"
        onChange={ChangeHandler} style={{ padding: '10px' }} />
      <button onClick={getOtp} style={{padding:'10px',borderRadius: '8px',backgroundColor:'blue'}}>send OTP</button>

      <div id='recaptcha' style={{display:verified? 'none':'block',marginTop:'10px'}}>

      </div>

      <Stack style={{ display: form ? "block" : "none" }}>
        <input
          type="text"
          value={otp}
          placeholder="Enter Otp"
          onChange={(e) => { setOtp(e.target.value) }} 
          style={{padding:'10px'}}/>
        <button onClick={verifyOtp} style={{padding:'10px'}}>verify</button>
        <Alert severity="success" style={{ display: verified ? "block" : "none" }} >successfully logined</Alert>
      </Stack>

    </Box>
  )
};

export default Login;
