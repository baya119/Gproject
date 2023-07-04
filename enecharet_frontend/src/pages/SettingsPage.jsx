import React, { useState } from 'react';
import { Button, Modal, Label, TextInput, Select, Spinner } from 'flowbite-react';
import { BsFillCheckCircleFill, BsFillXOctagonFill } from "react-icons/bs";
import NotFoundErrorPage from './NotFoundErrorPage';
import { BASE_URL } from '../util/Constants';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SettingsPage = () => {
    const token = localStorage.getItem('token');
    const userData = JSON.parse(localStorage.getItem('user'));
    const initialValues = {
        name: "",
        tin_number: "",
        type: "PRIVATE",
        location: ""
    };

    const initialChangePasswordValues = {
        oldPassword: "",
        newPassword: ""
    }

    const [formValues, setFormValues] = useState(initialValues);
    const [changePasswordFormValues, setChangePasswordFormValues] = useState(initialChangePasswordValues);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState({});
    const [showDialog, setShowDialog] = useState(false);
    const [displayVerify, setDisplayVerify] = useState(false);
    const navigate = useNavigate();
    const [showChangePasswordDialog, setShowChangePasswordDialog] = useState(false);

  
    const onClose = (e) => {
        if (result.data == "Done!!") {
            localStorage.clear();
            navigate("/signIn");
        }
        setShowDialog(false);
    };

    const handleCloseChangePasswordDialog = (e) => {
        setShowChangePasswordDialog(false);
    }

    const handleInputChange = (e) => {
        const { value } = e.target;

        setFormValues({
            ...formValues,
            [e.target.id]: value
        });
    };

    const handleChangePasswordInputsChange = (e) => {
        const { value } = e.target;

        setChangePasswordFormValues({
            ...changePasswordFormValues,
            [e.target.id]: value
        })
    }

    const handleCreateOrg = (e) => {
        e.preventDefault();
        console.log(formValues);
        setIsLoading(true);


        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: BASE_URL + '/api/create/org',
            headers: {
                'x-auth-token': token,
                'Content-Type': 'application/json'
            },
            data: formValues
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setResult(response);
                setIsLoading(false);
                setShowDialog(true);
                // showDialog(false);
                //  navigate("/profile/"); // changed this to reload rather than redirect for better user experience
                window.location.reload(false);
            })
            .catch((error) => {
                console.log(error.response);
                setResult(error.response);
                setIsLoading(false);
                setShowDialog(true);
            });

    };

    const handleChangePasswordSubmit = (e) => {
        e.preventDefault();
        console.log(changePasswordFormValues);
        setIsLoading(true);


        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: BASE_URL + '/api/change/password',
            headers: {
                'x-auth-token': token,
                'Content-Type': 'application/json'
            },
            data: changePasswordFormValues
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setResult(response);
                setIsLoading(false);
                setShowDialog(true);
                setShowChangePasswordDialog(false);
            })
            .catch((error) => {
                console.log(error.response);
                setShowDialog(true);
                setResult(error.response);
                setShowChangePasswordDialog(false);
                setIsLoading(false);
            });
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
            <Modal show={displayVerify} onClose={() => setDisplayVerify(false)}>
                <Modal.Header>Create an organization</Modal.Header>
                <Modal.Body>
                    <div className="pt-1">
                        <div className="flex flex-row overflow-y-auto no-scrollbar justify-center px-5 md:px-30 sm:px-14 ">
                            <div className="md:w-3/5 lg:w-4/5">
                                <form className="flex flex-col gap-4">
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="name" value="Organization Name" />
                                        </div>
                                        <TextInput
                                            id="name"
                                            type="text"
                                            placeholder="Please input your Organization name here"
                                            onBlur={handleInputChange}
                                            defaultValue={formValues.name}
                                            required={true}
                                        />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="tin_number" value="TIN Number" />
                                        </div>
                                        <TextInput
                                            id="tin_number"
                                            type="number"
                                            placeholder="Please input your TIN number here"
                                            onBlur={handleInputChange}
                                            defaultValue={formValues.tin_number}
                                            required={true}
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
                                                defaultValue={formValues.type}
                                                onBlur={(e) =>
                                                    setFormValues({ ...formValues, type: e.target.value })
                                                }
                                            >
                                                <option value="GOVERNMENTAL">GOVERNMENTAL</option>
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
                                            onBlur={handleInputChange}
                                            defaultValue={formValues.location}
                                            required={true}
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
                            <Button onClick={handleCreateOrg}>
                                Create
                            </Button>
                            <Button color="gray" onClick={() => setDisplayVerify(false)}>
                                Close
                            </Button>
                        </>
                    )}
                </Modal.Footer>
            </Modal>
            <Modal show={showChangePasswordDialog} onClose={handleCloseChangePasswordDialog}>
                <Modal.Header>Change your password</Modal.Header>
                <Modal.Body>
                    <div className="flex flex-row overflow-y-auto no-scrollbar justify-center px-5 md:px-30 sm:px-14 ">
                        <div className="md:w-3/5 lg:w-4/5">
                            <form className="flex flex-col gap-4">
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="oldPassword" value="Old password" />
                                    </div>
                                    <TextInput
                                        id="oldPassword"
                                        type="password"
                                        placeholder="Please input your Old password here"
                                        onBlur={handleChangePasswordInputsChange}
                                        defaultValue={changePasswordFormValues.oldPassword}
                                        required={true}
                                    />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="newPassword" value="New Password" />
                                    </div>
                                    <TextInput
                                        id="newPassword"
                                        type="password"
                                        placeholder="Please input your new password here"
                                        onBlur={handleChangePasswordInputsChange}
                                        defaultValue={changePasswordFormValues.newPassword}
                                        required={true}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {isLoading ? (
                        <Spinner />
                    ) : (
                        <>
                            <Button onClick={handleChangePasswordSubmit}>
                                Save
                            </Button>
                            <Button color="gray" onClick={() => setShowChangePasswordDialog(false)}>
                                Close
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

            <>
                <div className="text-gray-500 text-left whitespace-break-normal my-10 justify-center ">
                    {userData.Organizations.length == 0 ? (
                        <p className="text-xl text-center">Your account is not verified. please Verify to create a bid</p>
                    ) : (
                        <p className="text-xl text-center">Your account is verified!</p>
                    )}
                </div>
                <div className="flex flex-row gap-4 justify-center">
                    {userData.Organizations.length == 0 && (
                        <Button onClick={() => setDisplayVerify(true)}>
                            Verify Account
                        </Button>
                    )}
                    < Button onClick={() => setShowChangePasswordDialog(true)}>
                        Change Password
                    </Button>
                </div>
            </>
        </div >
    )
}

export default SettingsPage