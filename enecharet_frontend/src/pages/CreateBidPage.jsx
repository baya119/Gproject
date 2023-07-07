import React, { useState } from 'react';
import { TextInput, Label, Button, Modal, Spinner, Select } from 'flowbite-react';
import { BsFillCheckCircleFill, BsFillXOctagonFill } from "react-icons/bs";
import Lottie from "lottie-react";
import errorLottieAnimation from "../assets/error_lottie.json";
import { BASE_URL } from "../util/Constants";
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const style = {
    height: 300,
    width: 300,
};

const CreateBidPage = () => {
    const initialValues = {
        cpo_amount: 0,
        description: '',
        fee: 0,
        title: '',
        files: null,
        deadline: '',
        tag: 'Construction'
    };
    const [formValues, setFormValues] = useState(initialValues);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState({});
    const [showDialog, setShowDialog] = useState(false);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

    const token = localStorage.getItem('token');
    const userData = JSON.parse(localStorage.getItem('user'));
    console.log(userData.Organizations.length);

    const handleInputChange = (e) => {
        const { value } = e.target;

        setFormValues({
            ...formValues,
            [e.target.id]: value,
        });
        console.log(formValues);
    };

    const handleFileChange = (e) => {
        setFormValues({
            ...formValues,
            files: e.target.files[0]
        })
        console.log(formValues.files);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const data = new FormData();
        data.append('cpo_amount', formValues.cpo_amount);
        data.append('description', formValues.description);
        data.append('fee', formValues.fee);
        data.append('title', formValues.title);
        data.append('files', formValues.files);
        data.append('deadline', formValues.deadline);
        data.append('tag', formValues.tag);

        let headers = {
            'Content-Type': 'multipart/form-data',
            'x-auth-token': token,
        }

        axios.post(BASE_URL + '/api/create/bid', data, { headers })
            .then(response => {
                console.log(response.data);
                setIsLoading(false);
                setResult(response);
                setFormValues(initialValues);
                //setShowDialog(true);
                toast.success(response.data.message, {autoClose: 3000});

            })
            .catch(error => {
                setIsLoading(false);
                console.log(error);
                setResult(error.response);
                //setShowDialog(true);
                toast.error(error.response.data.message, {autoClose: 3000});

            });
    };


    const onClose = (e) => {
        if (result.status < 400) { 
            setResult({});
            setFormValues(initialValues);
        }
        setShowDialog(false);
    };

    let tmrw = new Date();
    tmrw.setDate(tmrw.getDate() + 1);

    if (userData.Organizations.length == 0) {
        return (
            <div className="flex h-screen">
                <div className="m-auto">
                    <div className="flex flex-row justify-center">
                        <Lottie animationData={errorLottieAnimation} style={style} loop={true} />
                    </div>

                    <p className="text-xl text-gray-700 text-center">
                        Oops! seems like your didn't have any Organizations in your account {" "}
                        <a
                            href="/profile/setting"
                            className="font-medium text-blue-600 hover:underline"
                        >
                            Verify Account
                        </a> to create a bid
                    </p>
                    <div className="flex flex-row my-3 justify-center">
                        <div className="py-0">
                            <Button size="xs" pill href="/">
                                Return Home
                            </Button>
                        </div>
                    </div>
                </div>
            </div >
        );
    }

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
            <div className="flex flex-row flex-wrap my-2 justify-center">
                <div className="text-gray-800 text-left whitespace-break-normal justify-center ">
                    <p className="text-2xl">Create a bid</p>
                </div>
            </div>
            <div className="flex flex-row justify-center">
                <div className="sm:w-3/5 lg:w-2/5 md:w-3/5">
                    <form className="flex flex-col gap-4">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="title" value="Bid title" />
                            </div>
                            <TextInput
                                id="title"
                                type="text"
                                placeholder="Please input title here "
                                value={formValues.title}
                                onChange={handleInputChange}
                                required={true}
                            />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="description" value="Description" />
                            </div>
                            <TextInput
                                id="description"
                                type="text"
                                placeholder="Please input your description here "
                                value={formValues.description}
                                onChange={handleInputChange}
                                required={true}
                            />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="cpo_amount" value="CPO Amount" />
                            </div>
                            <TextInput
                                id="cpo_amount"
                                type="number"
                                placeholder="Please input CPO Amount here "
                                value={formValues.cpo_amount}
                                onChange={handleInputChange}
                                required={true}
                            />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="fee" value="Fee" />
                            </div>
                            <TextInput
                                id="fee"
                                type="number"
                                placeholder="Please input fee Amount here "
                                value={formValues.fee}
                                onChange={handleInputChange}
                                required={true}
                            />
                        </div>

                        <div>
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="tag"
                                        value="Select tag"
                                    />
                                </div>
                                <Select
                                    id="tag"
                                    required={true}
                                    defaultValue={formValues.tag}
                                    onBlur={(e) =>
                                        setFormValues({ ...formValues, tag: e.target.value })
                                    }
                                >
                                    <option value="Construction">Construction</option>
                                    <option value="Automotive">Automotive</option>
                                    <option value="Accounting">Accounting</option>
                                    <option value="ITandNetWorking">IT and NetWorking</option>
                                    <option value="Consultancy">Consultancy</option>
                                </Select>
                            </div>
                        </div>

                        <div className="my-4">
                            <div className="mb-2 block">
                                <Label htmlFor="deadline" value="Deadline" />
                            </div>
                            <div className="relative">
                                <input
                                    id="deadline"
                                    type="date"
                                    min={tmrw.toISOString().split('T')[0]}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="Select date"
                                    value={formValues.deadline}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="mb-2 block my-2">
                                <Label htmlFor="cpo_amount" value="Document" />
                            </div>
                            <div className="rounded-lg bg-gray-50">
                                <div>
                                    {formValues.files == null ? (
                                        <div className="flex items-center justify-center w-full">
                                            <label className="flex flex-col w-full h-10 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                                                <div>
                                                    <input
                                                        type="file"
                                                        className="opacity-0"
                                                        required="true"
                                                        onChange={handleFileChange}
                                                    />
                                                </div>
                                            </label>
                                        </div>
                                    ) : (
                                        <div className="flex flex-row justify-center text-gray-600">
                                            <p>{formValues.files.name}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="flex flex-row justify-center">
                                <Spinner></Spinner>
                            </div>
                        ) : (
                            <Button
                                onClick={handleSubmit}
                                disabled={isSubmitDisabled}
                            >
                                Submit
                            </Button>
                        )}
                    </form>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={true}/>

        </div>
    )
}

export default CreateBidPage