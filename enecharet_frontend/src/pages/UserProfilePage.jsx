import React, { useEffect, useState } from "react";
import { Label, TextInput, Button, Spinner, Modal, Card, Tabs } from "flowbite-react";
import axios from "axios";
import { BASE_URL } from "../util/Constants";
import { BidItemComponent } from "../components/BidItemComponent";
import NotFoundErrorPage from "./NotFoundErrorPage";

const UserProfilePage = () => {
    const token = localStorage.getItem("token");

    const handleInputChange = (e) => { };
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState({});

    if (!token) {
        return <NotFoundErrorPage />;
    }

    useEffect(() => {
        let config = {
            method: "get",
            maxBodyLength: Infinity,
            url: BASE_URL + "/api/profile",
            headers: {
                "x-auth-token": token,
            },
        };

        axios
            .request(config)
            .then((response) => {
                console.log(response.data);
                setIsLoading(false);
                setUser(response.data[0]);
                localStorage.setItem('user', JSON.stringify(response.data[0]));
            })
            .catch((err) => {
                setIsLoading(false);
                alert(err.response.data.message);
            });
    }, []);

    return (
        <div>
            <div className="flex flex-row my-6 justify-center">
                <div className="sm:w-2/5 lg:w-3/5 md:w-2/5">
                    <p className="text-2xl text-center text-gray-700">My Account</p>
                    <form className="flex flex-col gap-4">
                        {isLoading || user == null ? (
                            <div className="flex flex-row justify-center my-10">
                                <Spinner></Spinner>
                            </div>
                        ) : (
                            <div>
                                <div>
                                    <div className="mb-2 block my-4">
                                        <Label htmlFor="firstName" value="First Name" />
                                    </div>
                                    <TextInput
                                        id="firstName"
                                        type="text"
                                        disabled={true}
                                        placeholder="Please input your first name here "
                                        value={user.fname}
                                        onChange={handleInputChange}
                                        required={true}
                                    />
                                </div>

                                <div>
                                    <div className="mb-2 block my-4">
                                        <Label htmlFor="lastName" value="LastName" />
                                    </div>
                                    <TextInput
                                        id="lastName"
                                        type="text"
                                        disabled={true}
                                        placeholder="Please input your Last Name here "
                                        value={user.lname}
                                        onChange={handleInputChange}
                                        required={true}
                                    />
                                </div>

                                <div>
                                    <div className="mb-2 block my-4">
                                        <Label htmlFor="phoneNumber" value="PhoneNumber" />
                                    </div>
                                    <TextInput
                                        id="lastName"
                                        type="text"
                                        disabled={true}
                                        placeholder="Please input your PhoneNumber here "
                                        value={user.phonenumber}
                                        onChange={handleInputChange}
                                        required={true}
                                    />
                                </div>

                                <div>
                                    <div className="mb-2 block my-4">
                                        <Label htmlFor="email" value="Email" />
                                    </div>
                                    <TextInput
                                        id="email"
                                        type="text"
                                        disabled={true}
                                        placeholder="Please input your email here "
                                        value={user.email}
                                        onChange={handleInputChange}
                                        required={true}
                                    />
                                </div>

                                <div>
                                    <div className="mb-2 block my-4">
                                        <Label htmlFor="status" value="Account status" />
                                    </div>
                                    <TextInput
                                        id="status"
                                        type="text"
                                        disabled={true}
                                        placeholder="Please input your Status here "
                                        value={user.status}
                                        onChange={handleInputChange}
                                        required={true}
                                    />
                                </div>

                                {user.Organizations.length > 0 && (
                                    <p className="text-2xl text-center text-gray-700 my-10">
                                        Your Organization
                                    </p>
                                )}

                                {user.Organizations.length > 0 && (
                                    <div>
                                        <div>
                                            <div className="mb-2 block my-4">
                                                <Label
                                                    htmlFor="organizationName"
                                                    value="Organization Name"
                                                />
                                            </div>
                                            <TextInput
                                                id="organizationName"
                                                type="text"
                                                disabled={true}
                                                placeholder="Please input your Organization Name here "
                                                value={user.Organizations[0].name}
                                                onChange={handleInputChange}
                                                required={true}
                                            />
                                        </div>

                                        <div>
                                            <div className="mb-2 block my-4">
                                                <Label htmlFor="orgType" value="Type" />
                                            </div>
                                            <TextInput
                                                id="orgType"
                                                type="text"
                                                disabled={true}
                                                placeholder="Please input your Organization Type here "
                                                value={user.Organizations[0].type}
                                                onChange={handleInputChange}
                                                required={true}
                                            />
                                        </div>

                                        <div>
                                            <div className="mb-2 block my-4">
                                                <Label htmlFor="tinNumber" value="TIN Number" />
                                            </div>
                                            <TextInput
                                                id="tinNumber"
                                                type="text"
                                                disabled={true}
                                                placeholder="Please input your Adress here "
                                                value={user.Organizations[0].tin_number}
                                                onChange={handleInputChange}
                                                required={true}
                                            />
                                        </div>

                                        <div>
                                            <div className="mb-2 block my-4">
                                                <Label htmlFor="location" value="Location" />
                                            </div>
                                            <TextInput
                                                id="location"
                                                type="text"
                                                disabled={true}
                                                placeholder="Please input your Adress here "
                                                value={user.Organizations[0].location}
                                                onChange={handleInputChange}
                                                required={true}
                                            />
                                        </div>
                                    </div>
                                )}

                                <p className="text-2xl text-center text-gray-700 my-10">
                                    Your Holdings
                                </p>


                                <div className="flex flex-row gap-2 my-10">
                                    <Card className="hover:shadow-lg rounded-lg w-1/3">
                                        <div className="flex justify-center items-baseline mb-2">
                                            <span className="mr-2 text-3xl font-bold text-gray-600">{user.cpo_holded ? user.cpo_holded : 0}</span>
                                        </div>
                                        <p className="font-light text-gray-500 text-center sm:text-lg">
                                            CPO holded
                                        </p>
                                    </Card>
                                    <Card className="hover:shadow-lg w-1/3">
                                        <div className="flex justify-center items-baseline mb-2">
                                            <span className="mr-2 text-3xl font-bold text-gray-600">{user.total_fee ? user.total_fee.toFixed(2) : 0}</span>
                                        </div>
                                        <p className="font-light text-gray-500 text-center sm:text-lg">
                                            Total Fee
                                        </p>
                                    </Card>
                                    <Card className="hover:shadow-lg w-1/3">
                                        <div className="flex justify-center items-baseline mb-2">
                                            <span className="mr-2 text-3xl font-bold text-gray-600">{user.active_balance ? user.active_balance.toFixed(2) : 0 }</span>
                                        </div>
                                        <p className="font-light text-gray-500 text-center sm:text-lg">
                                            Active Balance
                                        </p>
                                    </Card>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;
