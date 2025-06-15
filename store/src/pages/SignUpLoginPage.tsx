import { useContext, useState } from "react";
import {
  SignUpLoginContextObject,
  UserObjectType,
} from "../SignUpLoginContextObject";

const SignupLoginPage = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState<UserObjectType>({
    name: "",
    email: "",
    password: "",
  });
  const signUpLoginContext = useContext(SignUpLoginContextObject);

  function changeHandler(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <div className="h-screen w-screen flex">
      <div className="h-full w-[550px] flex justify-center items-center">
        <div className="w-[450px] flex flex-col gap-6 px-2">
          <h1 className="text-3xl font-semibold text-gray-800">{state}</h1>
          {state === "Sign Up" ? (
            <div className="flex flex-col gap-2">
              <h1 className="font-semibold text-gray-800">Name</h1>
              <input
                name="name"
                value={formData.name}
                onChange={changeHandler}
                className="border border-gray-400 rounded-md w-full h-10 px-3 focus:outline-none focus:ring-2 focus:ring-[#4f39f6]"
                type="text"
              />
            </div>
          ) : (
            <></>
          )}
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold text-gray-800">Email address</h1>
            <input
              name="email"
              value={formData.email}
              onChange={changeHandler}
              className="border border-gray-400 rounded-md w-full h-10 px-3 focus:outline-none focus:ring-2 focus:ring-[#4f39f6]"
              type="text"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold text-gray-800">Password</h1>
            <input
              name="password"
              value={formData.password}
              onChange={changeHandler}
              className="border border-gray-400 rounded-md w-full h-10 px-3 focus:outline-none focus:ring-2 focus:ring-[#4f39f6]"
              type="text"
            />
          </div>
          {state === "Sign Up" ? (
            <button
              onClick={() => signUpLoginContext.signUp(formData)}
              className="bg-[#4f39f6] rounded-md font-semibold text-white py-2 hover:cursor-pointer"
            >
              Sign Up
            </button>
          ) : (
            <button
              onClick={() => signUpLoginContext.logIn(formData)}
              className="bg-[#4f39f6] rounded-md font-semibold text-white py-2 hover:cursor-pointer"
            >
              Login
            </button>
          )}
          {state === "Login" ? (
            <h1 onClick={() => setState("Sign Up")} className="text-gray-700">
              To create an account{" "}
              <span className="text-[#4f39f6] font-semibold hover:cursor-pointer">
                click here
              </span>
            </h1>
          ) : (
            <h1 onClick={() => setState("Login")} className="text-gray-700">
              Already have an account?{" "}
              <span className="text-[#4f39f6] font-semibold hover:cursor-pointer">
                Login here
              </span>
            </h1>
          )}
        </div>
      </div>
      <div className="bg-red-300 flex-1 ">
        <img
          className="h-full w-full object-cover"
          src="/images/signup.jpg"
          alt=""
        />
      </div>
    </div>
  );
};

export default SignupLoginPage;
