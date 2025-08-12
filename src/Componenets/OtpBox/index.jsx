import React, { useState } from "react";

// Functional component to render OTP input boxes
const OtpBox = ({ length, onChange }) => {
  // Initialize OTP state as an array of empty strings
  const [otp, setOtp] = useState(new Array(length).fill(""));

  // Handle input change for each OTP box
  const handleChange = (element, index) => {
    const value = element.value;

    // Allow only numeric input
    if (isNaN(value)) return;

    // Update the OTP array with the new value
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Trigger the onChange callback with the full OTP string
    onChange(newOtp.join(""));

    // Automatically focus the next input box if available
    if (value && index < length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  // Render the OTP input boxes
  return (
    <div className="flex gap-2 justify-center">
      {otp.map((digit, index) => (
        <input
          key={index}
          id={`otp-input-${index}`}
          type="text"
          maxLength="1"
          value={digit}
          onChange={(e) => handleChange(e.target, index)}
          className="w-10 h-10 text-center border border-gray-300 rounded"
        />
      ))}
    </div>
  );
};

export default OtpBox;