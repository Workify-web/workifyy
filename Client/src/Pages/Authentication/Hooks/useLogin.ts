import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../../Services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();

  const { mutate: login, isPending: isLoggingIn } = useMutation({
    mutationFn: (data: { email: string; password: string }) => loginApi(data),
    onSuccess: (response) => {
      console.log("API Response:", response); 
      const user = response.data.user;

      if (user) {
        const { role } = user;

        // Role-based navigation
        if (role === "professional") {
          navigate("/Dashboard/ProfessionalDashboard");
        } else if (role === "client") {
          navigate("/Dashboard/ClientDashboard");
        } else {
          navigate("/");
        }
      } else {
        // If the user object doesn't exist, show an error toast
        toast.error("User does not Exist.");
      }
    },
    onError: (error) => {
      toast.error(error.message || "Login failed");
    },
  });

  return { login, isLoggingIn };
}
