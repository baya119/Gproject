import React, { useState, useEffect, useRef } from "react";
import { TextInput, Button, Spinner, Label, Tabs, Dropdown, Select } from "flowbite-react";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import { useDebounce } from "use-debounce";
import { BidItemComponent } from "../components/BidItemComponent";
import { BASE_URL } from "../util/Constants";

const BidsPage = () => {
    const token = localStorage.getItem('token');
    const [isLoading, setIsLoading] = useState(false);
    const [query, setQuery] = useState("");
    const [fee, setFee] = useState(0);
    const [date, setDate] = useState("latest");
    const [value] = useDebounce(query, 700);
    const [feeDebounce] = useDebounce(fee, 700);
    const [bidTag, setBidTag] = useState("Construction");
    const [bidsList, setBidsList] = useState([]);
    const [bidType, setBidType] = useState("closed");
    const role = localStorage.getItem("role");

    const handleSearchInput = (e) => {
        setQuery(e.target.value);
    };

    const handleFeeChange = (e) => {
        setFee(e.target.value);
    };

    useEffect(() => {
        setIsLoading(true);
        const header = {
            'x-auth-token': token
        }
        const fetchTypedData = async () => {
            axios.get(BASE_URL + `/api/bids/${bidType}`, { headers: header })
                .then(response => {
                    setIsLoading(false);
                    console.log(response.data);
                    setBidsList(response.data);
                })
                .catch(err => {
                    setIsLoading(false);
                    alert(err);
                });
        }

        const fetchData = async () => {
            let requestString = "/api/bids?";

            if (fee !== null && fee !== "" && fee !== undefined && fee !== 0) {
                requestString += `min=0&max=${fee}&`;
            }

            if (date !== null && date !== "" && date !== undefined) {
                requestString += `date=${date}&`;
            }

            if (query !== null && query !== "" && query !== undefined) {
                requestString += `title=${query}&`;
            }

            if (bidTag !== null && bidTag !== "" && query !== undefined) {
                requestString += `tag=${bidTag}`;
            }

            axios.get(BASE_URL + requestString)
                .then(response => {
                    setIsLoading(false);
                    setBidsList(response.data);
                })
                .catch(err => {
                    setIsLoading(false);
                    alert(err);
                })
        }

        if (token) {
            fetchTypedData();
        } else {
            fetchData();
        }
    }, [bidType, date, value, feeDebounce, bidTag]);

    if (!token) {
        return (
            <div className="m-auto sm:my-4">
                <div className="flex flex-row flex-wrap my-6 justify-center">
                    <div className="text-gray-800 text-left whitespace-break-normal justify-center ">
                        <p className="text-3xl">Browse Bids</p>
                    </div>
                </div>
                <div className="flex flex-row justify-center lg:px-72 md:px-52 sm:px-0">
                    <div className="w-3/5">
                        <TextInput
                            type="text"
                            placeholder="Search Bids"
                            required={true}
                            onChange={handleSearchInput}
                        />
                    </div>
                    <div className="w-1/5 px-0 md:px-2">
                        <Button>
                            <p className="hidden sm:flex">Search</p>
                            <div className="px-2 py-2 sm:py-0">
                                <BsSearch />
                            </div>
                        </Button>
                    </div>
                </div>

                <div className="flex flex-row gap-2 justify-center items-center my-3">
                    <div>
                        <Label
                            htmlFor="feeRange"
                            className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
                        >Fee: {fee}</Label>
                        <input
                            type="range"
                            name="Fee"
                            className="transparent h-1.5 w-full cursor-pointer appearance-none rounded-lg border-transparent bg-neutral-200"
                            onChange={handleFeeChange}
                            value={fee}
                            min={0}
                            max={1000}
                            id="feeRange" />
                    </div>

                    <div className="mx-10">
                        <Select
                            id="date"
                            required={true}
                            value={date}
                            onChange={(e) =>
                                setDate(e.target.value)
                            }
                        >
                            <option value="latest">Latest</option>
                            <option value="oldest">Oldest</option>
                        </Select>
                    </div>

                    <div className="mx-10">
                        <Select
                            id="tag"
                            required={true}
                            value={bidTag}
                            onChange={(e) =>
                                setBidTag(e.target.value)
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

                <div>
                    {isLoading && (
                        <div className="flex flex-row justify-center my-10">
                            <Spinner />
                        </div>
                    )}

                    {isLoading == false && bidsList.length == 0 ? (
                        <div className="flex flex-row my-10 justify-center">
                            <p className="text-gray-700 text-lg font-bold">No bids found.</p>
                        </div>
                    ) : (
                        <div className="lg:px-35 md:px-20">
                            {bidsList.map((bidItem) => {
                                return (
                                    <BidItemComponent bid={bidItem} key={bidItem.id.toString()} role={role} />
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="m-auto sm:my-4">
            <div className="flex flex-row flex-wrap my-6 justify-center">
                <div className="text-gray-800 text-left whitespace-break-normal justify-center ">
                    <p className="text-3xl">Browse Bids</p>
                </div>
            </div>
            <div className="flex flex-row justify-center lg:px-72 md:px-52 sm:px-0">
                <div className="w-3/5">
                    <TextInput
                        type="text"
                        placeholder="Search Bids"
                        required={true}
                        onChange={(e) => 
                            setQuery(e.target.value)
                        }
                    />
                </div>
                <div className="w-1/5 px-0 md:px-2">
                    <Button>
                        <p className="hidden sm:flex">Search</p>
                        <div className="px-2 py-2 sm:py-0">
                            <BsSearch />
                        </div>
                    </Button>
                </div>
            </div>

            <div className="lg:px-40 md:px-20 sm:px-10 my-7">
                <div className="flex flex-row justify-center">
                    <Button.Group>
                        <Button color="gray" onClick={() => setBidType("closed")}>
                            Closed
                        </Button>
                        <Button color="gray" onClick={() => setBidType("upcoming")}>
                            Upcoming
                        </Button>
                        <Button color="gray" onClick={() => setBidType("ongoing")}>
                            OnGoing
                        </Button>
                    </Button.Group>
                </div>

                <div>
                    {isLoading && (
                        <div className="flex flex-row justify-center my-10">
                            <Spinner />
                        </div>
                    )}

                    {isLoading == false && bidsList.length == 0 ? (
                        <div className="flex flex-row my-10 justify-center">
                            <p className="text-gray-700 text-lg font-bold">No bids found.</p>
                        </div>
                    ) : (
                        <div className="lg:px-35 md:px-20">
                            {bidsList.map((bidItem) => {
                                return (
                                    <BidItemComponent bid={bidItem} key={bidItem.id.toString()} role={role} />
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BidsPage;
