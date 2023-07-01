import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import NotFoundErrorPage from './NotFoundErrorPage';
import { Modal, Label, TextInput, Button, Spinner } from 'flowbite-react';
import { BsFillCheckCircleFill, BsFillXOctagonFill } from "react-icons/bs";
import axios from 'axios';
import { BASE_URL } from '../util/Constants';

const VerifyAccuntPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [result, setResult] = useState({});
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [verificationCode, setVerificationCode] = useState("");

    let header = {
        'x-auth-token': token
    }

    const handleInputChange = (e) => {
        setVerificationCode(e.target.value);
    }

    const onClose = (e) => {
        setShowDialog(false);
        if (result.status < 400) {
            navigate("/signIn");
        }
    }

    const handleSubmit = (e) => {
        setIsLoading(true);
        axios.put(BASE_URL + '/api/account/verify', { code: verificationCode }, { headers: header })
            .then(response => {
                setIsLoading(false);
                setResult(response);
                setShowDialog(true);
                localStorage.setItem('user', JSON.stringify(response.data));
            })
            .catch(err => {
                setIsLoading(false);
                setResult(err.response);
                setShowDialog(true);
            });
    }

    if (!token) {
        return <NotFoundErrorPage />
    }

    return (
        <div className='my-10'>
            <div className="flex-wrap my-6 justify-center">
                <div className="text-gray-800 text-center whitespace-break-normal justify-center ">
                    <p className="text-2xl">Verify your Account</p>
                </div>

                <div className="text-gray-500 whitespace-break-normal  text-center justify-center ">
                    <p className="text-lg">Please go to your email and enter your verification code here! the code expires in 30 mins!</p>
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
                            <Label htmlFor="code" value="Code" />
                        </div>
                        <TextInput
                            id="code"
                            type="text"
                            placeholder="Please input your code here "
                            required={true}
                            value={verificationCode}
                            onChange={handleInputChange}
                        />
                    </div>

                    {isLoading ? (
                        <div className="flex flex-row justify-center">
                            <Spinner />
                        </div>
                    ) : (
                        <Button onClick={handleSubmit}>Continue</Button>
                    )}
                </form>
            </div>
        </div>
    )
}

export default VerifyAccuntPage