import React, { useState } from 'react';

const OTPVerificationForm = () => {
  const [otp, setOTP] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/verifyotp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      if (response.ok) {
        // Success, handle next steps (e.g., show password reset form)
      } else {
        // Handle error case
      }
    } catch (error) {
      // Handle error case
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        OTP:
        <input type="text" value={otp} onChange={(e) => setOTP(e.target.value)} />
      </label>
      <button type="submit">Verify OTP</button>
    </form>
  );
};

export default OTPVerificationForm;
