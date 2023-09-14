import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { userService } from "../services";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    // redirect to home if already logged in
    if (userService.userValue) {
      router.push("/dashboard");
    }
  }, []);

  // form validation rules
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, setError, formState } = useForm(formOptions);
  const [invalidCred, setInvalidCred] = useState(false);
  const { errors } = formState;

  function onSubmit({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    return userService
      .login(username, password)
      .then(() => {
        // get return url from query parameters or default to '/'
        router.push("/dashboard");
      })
      .catch((error) => {
        setInvalidCred(true);
      });
  }

  return (
    <div className="flex min-h-screen justify-center items-center flex-col">
        <h1 className="text-[#333175] font-bold  text-[24px] lg:text-[30px]  text-center px-4 mb-8">State Vidya Samiksha Kendra</h1>
      <div className="bg-white lg:w-[40vw] lg:p-12 shadow-xl rounded-lg">
        <div className="card-body">
          {invalidCred && (
            <div className="alert alert-danger bg-rose-300 mt-3 mb-0">
              Invalid credentials
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label className="text-[#3A3846] font-medium text-[17px]">
                Username
              </label>
              <input
                id="userName"
                type="text"
                {...register("username")}
                className={`form-control appearance-none border rounded w-full py-2 px-3 mt-1 bg-white text-[#3A3846] ${
                  errors.username ? "is-invalid" : ""
                }`}
                placeholder="Enter your username"
              />
              <div className="invalid-feedback text-red-500 text-[14px]">
                {errors.username?.message}
              </div>
            </div>
            <div className="form-group mt-7">
              <label className="text-[#3A3846] font-medium text-[17px]">
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register("password")}
                className={`form-control appearance-none border rounded w-full py-2 px-3 mt-1 bg-white text-[#3A3846] ${
                  errors.password ? "is-invalid" : ""
                }`}
                placeholder="Enter your password"
              />
              <div className="invalid-feedback text-red-500 text-[14px]">
                {errors.password?.message}
              </div>
            </div>
            <div className="flex justify-center">
              <button
                id="loginBtn"
                disabled={formState.isSubmitting}
                className="btn mt-8 px-8 bg-[#202342] text-white text-[17px] font-medium capitalize"
              >
                {formState.isSubmitting && (
                  <span className="spinner-border spinner-border-sm mr-1 "></span>
                )}
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
