import React, { useEffect, useState } from "react";
import {
    Label,
    TextInput,
    Button,
    Spinner,
    Modal,
    Card
} from "flowbite-react";
import axios from "axios";
import { BASE_URL } from "../util/Constants";
import { BidItemComponent } from "../components/BidItemComponent";

const UserProfilePage = () => {
    const token = localStorage.getItem('token');

    const handleInputChange = (e) => { };
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState({});

    if (!token) {
        return (<div>UnAuthorized!</div>);
    }

    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: BASE_URL + '/api/profile',
            headers: {
                'x-auth-token': token
            }
        };

        axios.request(config)
            .then(response => {
                console.log(response.data)
                setIsLoading(false);
                setUser(response.data[0]);
            }).catch(err => {
                setIsLoading(false);
                alert(err.response.data.message)
            });
    }, []);

    const bids = !user.Bids ? [] : user.Bids.map((bid, i) => {
        let url = "/bid?id=" + bid.id;
        return (
            <a href={url} key={i}>
                <Card title={bid.title} description={bid.description} fee={bid.fee} cpo={bid.fee} date={bid.created_at} />
            </a>
        )
    });

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
                                        <Label htmlFor="lname" value="Last Name" />
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
                                        <Label htmlFor="balance" value="Balance" />
                                    </div>
                                    <TextInput
                                        id="balance"
                                        type="text"
                                        disabled={true}
                                        placeholder="Please input your PhoneNumber here "
                                        value={user.balance}
                                        onChange={handleInputChange}
                                        required={true}
                                    />
                                </div>

                                {/* <div>
                                    <div className="mb-2 block my-4">
                                        <Label htmlFor="companyName" value="CompanyName" />
                                    </div>
                                    <TextInput
                                        id="companyName"
                                        type="text"
                                        disabled={true}
                                        placeholder="Please input your CompanyName here "
                                        value={user.email}
                                        onChange={handleInputChange}
                                        required={true}
                                    />
                                </div> */}

                                <p className="text-2xl text-center text-gray-700 my-10">Your Organization</p>

                                {user.Organizations.length > 0 && (
                                    <div>
                                        <div>
                                            <div className="mb-2 block my-4">
                                                <Label htmlFor="organizationName" value="Organization Name" />
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

                                <p className="text-2xl text-center text-gray-700 my-10">Bids</p>

                                {user.Bids.length > 0 && (
                                    <div>
                                        {user.Bids.map((bidItem) => {
                                            return (
                                                <BidItemComponent bid={bidItem} />
                                            )
                                        })}
                                    </div>
                                )}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UserProfilePage