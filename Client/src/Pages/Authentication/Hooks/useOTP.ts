import { useMutation } from "@tanstack/react-query";
import { verifyOtpApi } from "../../Services/api";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

// Define the response type for OTP verification
interface OTPResponse {
  token?: string;
  message?: string;
}

export function useOTP() {
  const { mutateAsync: VerifyOtp, isPending: Verifying } = useMutation<
    OTPResponse, // Response type
    Error, // Error type
    { otp: string; email: string } // Request payload type
  >({
    mutationFn: (data) => verifyOtpApi(data),
    onSuccess: (response) => {
      console.log("API Response:", response);

      if (response.token) {
        // Store token in a secure cookie
        Cookies.set("authToken", response.token, {
          expires: 7, // Token expiration in days
          secure: true, // Ensures the cookie is sent over HTTPS only
          sameSite: "Strict", // Protects against CSRF
        });
        toast.success("OTP verified successfully!");
      } else {
        toast.error(response.message || "Unexpected response from the server.");
      }
    },
    onError: (error) => {
      console.error("Verify OTP Error:", error.message);
      toast.error(error.message || "Failed to verify OTP.");
    },
  });

  return { VerifyOtp, Verifying };
}
