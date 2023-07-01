import React, { useState } from "react";
import {
    Label,
    TextInput,
    Button,
    Spinner,
    Modal
} from "flowbite-react";
import { VisiblityButton } from "../components/VisibilityButton";
import { BsFillCheckCircleFill, BsFillXOctagonFill } from "react-icons/bs";
import PasswordStrengthBar from "react-password-strength-bar";
import axios from "axios";
import { BASE_URL } from "../util/Constants";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";


const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(6, 'Password should be of minimum 8 characters length')
        .max(16, 'Password should be of maximum 16 characters length')
        .required('Password is required'),
    fname: yup
        .string('Enter your first name')
        .required('First name is required'),
    lname: yup
        .string('Enter your last name')
        .required('Last name is required'),
    phonenumber: yup
        .string('Enter your phone number')
        .required('phonenumber required'),
    cpassword: yup
        .string('Confirm your password')
        .required('Confirm password is required')
});

const SignUpPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [result, setResult] = useState({});
    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            fname: "",
            lname: "",
            phonenumber: "",
            cpassword: ""
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if (values.password !== values.cpassword) {
                alert("Confirm your password properly!!")
            } else {
                setIsLoading(true);
                console.log(values)
                axios.post(BASE_URL + "/api/signup", values)
                    .then(response => {
                        console.log(response.status);
                        setIsLoading(false);
                        localStorage.clear();
                        localStorage.setItem("user", JSON.stringify(response.data.user));
                        localStorage.setItem("token", response.data.token);
                        localStorage.setItem("role", "user");
                        setResult(response);
                        setShowDialog(true);
                    }).
                    catch(err => {
                        console.log(err);
                        setIsLoading(false);
                        setResult(err.response);
                        setShowDialog(true);
                    })
            }
        }
    });

    const onClose = () => {
        setShowDialog(false);
        if (result.status < 400) {
            console.log(parseInt(result.status));
            navigate("/verifyAccount");
        }
    };

    const handlePasswordVisiblity = (e) => {
        e.preventDefault();
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <div>
            <Modal show={showDialog} size="md" popup={true} onClose={onClose}>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        {result.status < 400 ? (
                            <div>
                                <BsFillCheckCircleFill className="mx-auto mb-4 h-14 w-14 text-gray-600 " />
                                <h3 className="mb-5 text-lg font-normal text-gray-600 ">
                                    Success!
                                </h3>
                            </div>
                        ) : (
                            <div>
                                <BsFillXOctagonFill className="mx-auto mb-4 h-14 w-14 text-gray-600 " />
                                <h3 className="mb-5 text-lg font-normal text-gray-600 ">
                                    Error!
                                </h3>
                            </div>
                        )}
                        <div className="flex justify-center gap-4">
                            <Button color="gray" pill size="xs" onClick={onClose}>
                                Close
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <div className="flex flex-row flex-wrap my-6 justify-center">
                <div className="text-gray-800 text-left whitespace-break-normal justify-center ">
                    <p className="text-3xl">Hi Please fill in...</p>
                </div>
            </div>
            <div className="flex flex-row justify-center">
                <div className="sm:w-3/5 lg:w-2/5 md:w-3/5">
                    <form className="flex flex-col gap-4">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="fname" value="First Name" />
                            </div>
                            <TextInput
                                id="fname"
                                type="text"
                                placeholder="Please input your first name here "
                                value={formik.values.fname}
                                onChange={formik.handleChange}
                                required={true}
                            />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="lname" value="Last Name" />
                            </div>
                            <TextInput
                                id="lname"
                                type="text"
                                placeholder="Please input your Last Name here "
                                value={formik.values.lname}
                                onChange={formik.handleChange}
                                required={true}
                            />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="phonenumber" value="phonenumber" />
                            </div>
                            <TextInput
                                id="phonenumber"
                                type="text"
                                placeholder="Please input your phonenumber here "
                                value={formik.values.phonenumber}
                                onChange={formik.handleChange}
                                required={true}
                            />
                        </div>

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

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="password" value="Password" />
                            </div>
                            <div className="flex flex-row">
                                <TextInput
                                    id="password"
                                    type={isPasswordVisible ? "text" : "password"}
                                    placeholder="Please input password here"
                                    className="grow"
                                    required={true}
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                />
                                <div className="pl-1">
                                    <VisiblityButton
                                        isVisible={isPasswordVisible}
                                        onChecked={handlePasswordVisiblity}
                                    />
                                </div>
                            </div>
                            <PasswordStrengthBar password={formik.values.password} />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="cpassword" value="Password" />
                            </div>
                            <div className="flex flex-row">
                                <TextInput
                                    id="cpassword"
                                    type={isPasswordVisible ? "text" : "password"}
                                    placeholder="Confirm password here"
                                    className="grow"
                                    required={true}
                                    value={formik.values.cpassword}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <PasswordStrengthBar password={formik.values.password} />
                        </div>

                        {isLoading ? (
                            <div className="flex flex-row justify-center">
                                <Spinner></Spinner>
                            </div>
                        ) : (
                            <Button
                                onClick={formik.handleSubmit}
                                disabled={!formik.isValid}
                            >
                                Submit
                            </Button>
                        )}
                        <div className="flex flex-row justify-center">
                            <p className="text-gray-800">
                                Already SignedUp?{" "}
                                <a
                                    href="/signIn"
                                    className="font-medium text-blue-600 hover:underline"
                                >
                                    Sign In
                                </a>
                                {" "} or {" "}
                                <a
                                    href="/forgotPassword"
                                    className="font-medium text-blue-600 hover:underline"
                                >
                                    Forgot Password
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
