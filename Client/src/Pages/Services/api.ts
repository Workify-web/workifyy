const BASE_URL = import.meta.env.VITE_API_URL_DEV;
import Cookie from "js-cookie";
import axios from "axios";

export async function SignUpApi({
  firstname,
  lastname,
  email,
  password,
  terms,
}: {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  terms: boolean;
}) {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/users/signup`,
      { firstname, lastname, email, password, terms },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const data = response.data;

    if (data.status !== "success") {
      throw new Error(data.message || "Signup failed. Please try again.");
    }

    // Store token and email in cookies
    Cookie.set("token", data.token);
    Cookie.set("userEmail", data.data.user.email, {
      secure: true,
      sameSite: "Strict",
    }); // Store email in cookie

    console.log("Signup successful:", data);
    return data;
  } catch (error: any) {
    console.error("Signup Error:", error.response?.data || error.message);
    throw error;
  }
}

export async function loginApi({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/users/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const data = response.data;

    if (data.status === "fail") {
      throw new Error(data.message);
    }

    Cookie.set("token", data.token);
    Cookie.set("userId", data.data.user._id);

    return data;
  } catch (error: any) {
    console.error("Login Error:", error.response?.data || error.message);
    throw error;
  }
}

export async function verifyOtpApi({
  email,
  otp,
}: {
  email: string;
  otp: string;
}): Promise<{ token?: string; message?: string }> {
  try {
    console.log("Email:", email);
    console.log("OTP:", otp);

    const response = await axios.post(
      `${BASE_URL}/api/v1/users/verifyOtp`,
      { email, otp },
      { headers: { "Content-Type": "application/json" }, timeout: 10000 },
    );

    const { data } = response;
    return data;
  } catch (error: any) {
    console.error("Verify OTP Error:", error.response?.data || error.message);
    throw error;
  }
}

