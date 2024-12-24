import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./styles/index.css";
import { Toaster } from "react-hot-toast";
<<<<<<< HEAD
// import Loader from "./Pages/UI/Loader";
 import Home from "./Pages/Home/Home";
import SignupOptions from "./Pages/Authentication/SignupOptions/Signup";
import Signin  from "./Pages/Authentication/Signin/signin_user";
import SignupasProfessional from "./Pages/Authentication/Professional/Professionalsignup";
import OTP from "./Pages/Authentication/OTP/otp";
=======
import Loader from "./Pages/UI/Loader";

// Lazy loading the components
const Home = lazy(() => import("./Pages/Home/Home"));
const Signup = lazy(() => import("./Pages/Authentication/SignupOptions/Signup"));
const Signin = lazy(() => import("./Pages/Authentication/Signin/signin_user"));
const SignupasProfessional = lazy(
  () => import("./Pages/Authentication/professional/Professionalsignup"),
);
// const OTP = lazy(() => import("./Pages/Authentication/OTP/otp"));
>>>>>>> 91183a0 (landing page touches)
const ClientSignup = lazy(
  () => import("./Pages/Authentication/client/Clientsignup"),
);
const ClientDashboard = lazy(
  () => import("./Pages/ClientDashoard/ClientDashboard"),
);
const Onboarding = lazy(
  () => import("./Pages/Authentication/ProfessionalOnboarding/onboarding"),
);

const JobPostingFLow = lazy(
  () => import("./Pages/ClientDashoard/JobPostingFlow/JobPostingFlow"),
);
const ProfessionalDashboard = lazy(
  () => import("./Pages/ProfessionalDashboard/ProfessionalDashboard"),
);
const ClientWallet = lazy(() => import("./Pages/ClientDashoard/Wallet"));
const ClientProfile = lazy(() => import("./Pages/ClientDashoard/Profile"));
const JobManagement = lazy(
  () => import("./Pages/ClientDashoard/Jobmanagement"),
);
const ProfessionalWallet = lazy(
  () => import("./Pages/ProfessionalDashboard/Wallet/Wallet"),
);
const ProfessionalProfile = lazy(
  () => import("./Pages/ProfessionalDashboard/Profile/Profile"),
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const App = () => {
  return (
    

    <QueryClientProvider client={queryClient}>
      <Router>
        {/* Suspense wraps all the lazy-loaded routes */}
        {/* <Suspense fallback={<Loader />}> */}
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/auth">
              <Route path="signin" element={<Signin />} />
              <Route path="signupoptions" element={<SignupOptions />} />
              <Route
                path="professional-signup"
                element={<SignupasProfessional />}
              />
              <Route path="ClientSignup" element={<ClientSignup />} />
              <Route path="otp" element={<OTP />} />
            </Route>

            <Route path="/Onboarding" element={<Onboarding />} />

            <Route path="/Dashboard">
              <Route path="clientDashboard">
                <Route path="" element={<ClientDashboard />} />
                <Route path="profile" element={<ClientProfile />} />
                <Route path="wallet" element={<ClientWallet />} />
                <Route path="jobmanagement" element={<JobManagement />} />
                <Route path="Jobpost" element={<JobPostingFLow />} />
              </Route>

              <Route path="ProfessionalDashboard">
                <Route path="" element={<ProfessionalDashboard />} />
                <Route path="profile" element={<ProfessionalProfile />} />
                <Route path="wallet" element={<ProfessionalWallet />} />
              </Route>
            </Route>

            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        {/* </Suspense> */}
      </Router>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: { duration: 2000 },
          error: { duration: 4000 },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#fff",
            color: "[#32cd32]",
          },
        }}
      />
    </QueryClientProvider>
     
  );
};

export default App;
