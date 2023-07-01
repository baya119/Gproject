import React, { useState } from 'react';;
import { Label, TextInput, Button, Spinner, Modal } from 'flowbite-react';
import { BsFillCheckCircleFill, BsFillXOctagonFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { BASE_URL } from '../util/Constants';
import { useFormik } from 'formik';
import * as yup from "yup";
import NotFoundErrorPage from './NotFoundErrorPage';
import { VisiblityButton } from '../components/VisibilityButton';

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
});

const ForgotPassword = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState({});
    const [showDialog, setShowDialog] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    //if they are already logged in there is no need to change password
    if (token) {
        return <NotFoundErrorPage />
    }

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setIsLoading(true);
            axios.put(BASE_URL + "/api/forgot/password", {
                email: values.email,
                newPassword: values.password
            })
                .then(response => {
                    console.log(response);
                    setResult(response);
                    setIsLoading(false);
                    setShowDialog(true);
                })
                .catch(err => {
                    setIsLoading(false);
                    setResult(err.response);
                    setShowDialog(true);
                })
        }
    });

    const onClose = (e) => {
        setShowDialog(false);
        if (result.status < 400) {
            localStorage.clear(); //clear the previous data before redirecting to signIn
            navigate("/signIn")
        }
    }

    return (
        <div className='my-10'>
            <div className="flex flex-row flex-wrap my-6 justify-center">
                <div className="text-gray-800 text-left whitespace-break-normal justify-center ">
                    <p className="text-2xl">Change your password</p>
                </div>
            </div>

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

            <div className="flex flex-row justify-center px-5 lg:px-56 md:px-30 sm:px-14 ">
                <form className="flex flex-col gap-4 sm:w-3/5 lg:w-2/5 md:w-3/5">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email" value="Email" />
                        </div>
                        <TextInput
                            id="email"
                            type="email"
                            placeholder="Please input your email here "
                            required={true}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password" value="New Password" />
                        </div>

                        <div className="flex flex-row items-center my-2">
                            <TextInput
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Please input your new password here"
                                required={true}
                                className="grow"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                            />
                            <div className="pl-1">
                                <VisiblityButton
                                    isVisible={showPassword}
                                    onChecked={(e) => {
                                        e.preventDefault();
                                        setShowPassword(!showPassword);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    {isLoading ? (
                        <div className="flex flex-row justify-center">
                            <Spinner></Spinner>
                        </div>
                    ) : (
                        <Button onClick={formik.handleSubmit} disabled={!formik.isValid}>Continue</Button>
                    )}
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword