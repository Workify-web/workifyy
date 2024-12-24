import { useMutation } from "@tanstack/react-query";
import { SignUpApi } from "../../Services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useSignup() {
  const navigate = useNavigate();

  const { mutate: Signup, isPending: isSigningIn } = useMutation({
    mutationFn: (data: {
      firstname: string;
      lastname: string;
      terms: boolean;
      email: string;
      password: string;
    }) => SignUpApi(data),
    onSuccess: (response) => {
      console.log("API Response:", response); // Log the whole response object

      // Check if the response indicates success
      if (response?.status === "success") {
        navigate("/auth/otp");
        toast.success("Registration successful!...");
      } else {
        // If the user object doesn't exist, show an error toast
        toast.error("User information is missing in the response.");
      }
    },
    onError: (error) => {
      toast.error(error.message || "Signup failed");
    },
  });

  return { Signup, isSigningIn };
}
