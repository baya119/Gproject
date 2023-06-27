import React, { useState } from 'react';
import { Button, Modal, Label, TextInput, Select, Spinner } from 'flowbite-react';
import { BsFillCheckCircleFill, BsFillXOctagonFill } from "react-icons/bs";
import axios from 'axios';
import { BASE_URL } from "../util/Constants";

const SettingsPage = () => {
    const initialValues = {
        orgName: "",
        tinNumber: "", //change this to a number if needed
        type: "PRIVATE", //initially Private
        location: "",
    };
    const [formValues, setFormValues] = useState(initialValues);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState({});
    const [showDialog, setShowDialog] = useState(false);
    const [displayVerify, setDisplayVerify] = useState(false);

    const handleInputChange = (e) => {
        const { value } = e.target;

        setFormValues({
            ...formValues,
            [e.target.id]: value,
        });

        console.log(formValues);
    };

    const onClose = (e) => {
        setFormValues(initialValues);
        setDisplayVerify(false);
    };

    const handleSubmitClick = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const submitData = {
            name: formValues.orgName,
            tin_number: formValues.tinNumber, //change this to a number if needed
            type: formValues.type, //initially Private
            location: formValues.location,
        };

        console.log(submitData);

        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));

        const { id } = user;

        console.log(id);
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: BASE_URL + `/api/create/org`,
            headers: {
                'x-auth-token': token
            },
            data: submitData
        };

        axios.request(config)
            .then((response) => {
                console.log(response);
                setResult(response.status);
                setIsLoading(false);
                setShowDialog(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    };

    return (
        <div>
            <Modal show={showDialog} size="md" popup={true} onClose={onClose}>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        {result.success ? (
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
                                    {typeof result.message == "undefined"
                                        ? " Unknwon error! "
                                        : result.message}
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
            <Modal show={displayVerify} onClose={() => setDisplayVerify(false)}>
                <Modal.Header>Add an Org</Modal.Header>
                <Modal.Body>
                    <div className="pt-1">
                        <div className="flex flex-row overflow-y-auto no-scrollbar justify-center px-5 md:px-30 sm:px-14 ">
                            <div className="md:w-3/5 lg:w-4/5">
                                <form className="flex flex-col gap-4">
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="orgName" value="Organization Name" />
                                        </div>
                                        <TextInput
                                            id="orgName"
                                            type="text"
                                            placeholder="Please input your Organization name here"
                                            required={true}
                                            value={formValues.orgName}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="tinNumber" value="TIN Number" />
                                        </div>
                                        <TextInput
                                            id="tinNumber"
                                            type="text"
                                            placeholder="Please input your TIN number here"
                                            required={true}
                                            value={formValues.tinNumber}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label
                                                    htmlFor="type"
                                                    value="Select your organization type"
                                                />
                                            </div>
                                            <Select
                                                id="type"
                                                required={true}
                                                // value={formValues.}
                                                onChange={(e) =>
                                                    setFormValues({ ...formValues, type: e.target.value })
                                                }
                                            >
                                                <option value="GOVENMENTAL">GOVERNMENTAL</option>
                                                <option value="PRIVATE">PRIVATE</option>
                                            </Select>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="location" value="Organization Location" />
                                        </div>
                                        <TextInput
                                            id="location"
                                            type="text"
                                            placeholder="Please input your location here "
                                            required={true}
                                            value={formValues.location}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {isLoading ? (
                        <Spinner />
                    ) : (
                        <>
                            <Button pill size="xs" onClick={handleSubmitClick}>
                                Apply
                            </Button>
                            <Button color="gray" pill size="xs" onClick={onClose}>
                                Discard Changes
                            </Button>
                        </>
                    )}
                </Modal.Footer>
            </Modal>
            <div className="flex flex-row flex-wrap my-4 justify-center">
                <div className="text-gray-800 text-left whitespace-break-normal justify-center ">
                    <p className="text-3xl">Settings</p>
                </div>
            </div>
            <div className="text-gray-500 text-left whitespace-break-normal my-10 justify-center ">
                <p className="text-xl text-center">Your account is not verified. please Verify to create a bid</p>
            </div>
            <div className="flex flex-row gap-4 justify-center">
                {/* <Button onClick={handleChangePassword}>
                    Change Password
                </Button> */}
                <Button onClick={() => setDisplayVerify(true)}>
                    Verify Account
                </Button>
            </div>
        </div>
    )
}

export default SettingsPage