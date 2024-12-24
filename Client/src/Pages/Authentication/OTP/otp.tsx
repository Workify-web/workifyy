import React, { useState, useRef, useEffect } from "react";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useOTP } from "../Hooks/useOTP";
import toast from "react-hot-toast";

const OtpForm: React.FC = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string[]>(["", "", "", "", ""]);
  const inputRefs = Array.from({ length: 5 }, () => useRef<HTMLInputElement>(null));

  const userEmail = Cookie.get("userEmail") || "";
  const { VerifyOtp, Verifying } = useOTP();

useEffect(() => {
  document.title = "OTP Verification";
  if (!userEmail) {
    toast.error("Email is missing. Please sign up again.");
    setTimeout(() => {
      navigate("/auth/professional-signup"); // Redirect after showing the toast
    }, 2000);
  }
}, [userEmail, navigate]);


  // Handle OTP input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return; // Only allow numeric input

    setOtp((prevOtp) => {
      const newOtp = [...prevOtp];
      newOtp[index] = value;
      return newOtp;
    });

    // Automatically focus on the next input if filled
    if (value && index < otp.length - 1) {
      inputRefs[index + 1].current?.focus();
    }
  };

  // Handle backspace navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
  try {
    const otpString = otp.join(""); // Join OTP array into a single string
    if (otpString.length !== 5) {
      toast.error("Please enter the complete OTP.");
      return;
    }

    const response = await VerifyOtp({ email: userEmail, otp: otpString });

    // No need to handle success or error toasts here
    if (response?.token) {
      Cookie.set("authToken", response.token, { secure: true, sameSite: "Strict" });
      navigate("/Onboarding");
    }
  } catch (error: any) {
    // No need to handle error toasts here either
    console.error(error.message);
  }
};


  return (
    <div className="flex flex-col items-center mt-12">
      <h1 className="text-2xl font-semibold">OTP Verification</h1>
      <p className="mt-4">
        Enter the OTP sent to <span className="text-green-500">{userEmail}</span>
      </p>

      <div className="mt-6 flex space-x-2">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={inputRefs[index]}
            className="h-14 w-12 text-center text-2xl border border-green-500 rounded-lg outline-none"
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            aria-label={`OTP digit ${index + 1}`}
            disabled={Verifying}
          />
        ))}
      </div>

      <button
        className={`mt-6 px-6 py-2 rounded bg-green-500 text-white font-bold ${
          Verifying ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleVerifyOtp}
        disabled={Verifying || otp.includes("")}
      >
        {Verifying ? "Verifying..." : "Verify"}
      </button>
    </div>
  );
};

export default OtpForm;
