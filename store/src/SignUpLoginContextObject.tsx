import { createContext } from "react";

export interface UserObjectType {
  name: string;
  email: string;
  password: string;
}

interface Children {
  children: React.ReactNode;
}

interface SignUpLoginContextObjectType {
  signUp: (formData: UserObjectType) => void;
  logIn: (FormData: UserObjectType) => void;
}

export const SignUpLoginContextObject =
  createContext<SignUpLoginContextObjectType>({
    signUp: () => {},
    logIn: () => {},
  });

function SignUpLoginProvider({ children }: Children) {
  async function signUp(formData: UserObjectType) {
    try {
      const response = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("auth-token", data.token);
        window.location.replace("/");
      } else {
        alert(data.errors);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("Unknown error occured");
      }
    }
  }

  async function logIn(formData: UserObjectType) {
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("auth-token", data.token);
        window.location.replace("/");
      } else {
        alert(data.errors);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("Unknown error occured");
      }
    }
  }

  const contextObj = {
    signUp: signUp,
    logIn: logIn,
  };
  return (
    <SignUpLoginContextObject.Provider value={contextObj}>
      {children}
    </SignUpLoginContextObject.Provider>
  );
}

export default SignUpLoginProvider;
