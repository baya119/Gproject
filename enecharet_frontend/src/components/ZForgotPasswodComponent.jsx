import React, { useState } from "react";
import { Label, TextInput, Button, Spinner } from "flowbite-react";
import { useFormik } from "formik";
import { BsFillCheckCircleFill, BsFillXOctagonFill } from "react-icons/bs";
import PasswordStrengthBar from "react-password-strength-bar";
import axios from "axios";
import { BASE_URL } from "../util/Constants";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
});

const ForgotPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState({});
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      axios
        .post(BASE_URL + "/api/forgot/password", values)
        .then((response) => {
          setResult(response);
          setIsLoading(false);
          setShowDialog(true);
          toast.success('Success! Check your email for verification code.', {
            autoClose: 5000,
            onClose: () => {
              navigate("/verifyForgotPassword");
            }
          });
        })
        .catch((err) => {
          setIsLoading(false);
          setResult(err.response);
          setShowDialog(true);
          toast.error('Error: ' + err.response.data.message, { autoClose: 3000 });
        });
    },
  });

  const onClose = () => {
    setShowDialog(false);
    if (result.status < 400) {
      console.log(parseInt(result.status));
      console.log("inside forgotpassword");
      navigate("/verifyForgotPassword");
    }
  };

  return (
    <div>
      {/* Form */}
      <div className="flex flex-row flex-wrap my-6 justify-center">
        <div className="text-gray-800 text-left whitespace-break-normal justify-center ">
          <p className="text-3xl">Hi Enter Your Email To Change Password...</p>
        </div>
      </div>
      <div className="flex flex-row justify-center">
        <div className="sm:w-3/5 lg:w-2/5 md:w-3/5">
          <form className="flex flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Email" />
              </div>
              <TextInput
                id="email"
                type="email"
                placeholder="Please input your email here "
                value={formik.values.email}
                onChange={formik.handleChange}
                required={true}
              />
            </div>
            {isLoading ? (
              <div className="flex flex-row justify-center">
                <Spinner></Spinner>
              </div>
            ) : (
              <Button onClick={formik.handleSubmit} disabled={!formik.isValid}>
                Submit
              </Button>
            )}
            <div className="flex flex-row justify-center">
              <p className="text-gray-800">
                Already SignedUp?{" "}
                <a href="/signIn" className="font-medium text-blue-600 hover:underline">
                  Sign In
                </a>{" "}
                or{" "}
                <a href="/forgotPassword" className="font-medium text-blue-600 hover:underline">
                  Forgot Password
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={true} />
    </div>
  );
};

export default ForgotPasswordForm;
