import React, { useState, useEffect } from "react";
import { TextInput, Button, Spinner, Label } from "flowbite-react";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import { useDebounce } from "use-debounce";
import { BidItemComponent } from "../components/BidItemComponent";
import { BASE_URL } from "../util/Constants";

const BidsPage = () => {
    const pageSize = 5;
    const [bids, setBids] = useState([]);
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [query, setQuery] = useState("");
    const [cpo, setCpo] = useState(0);
    const [fee, setFee] = useState(0);
    const [value] = useDebounce(query, 1000);

    const incrementAndLoadMore = () => {
        setPage(page + pageSize);
    };

    const handleSearchInput = (e) => {
        setQuery(e.target.value);
    };

    const handleCpoChange = (e) => {
        setCpo(e.target.value);
    };

    const handleFeeChange = (e) => {
        setFee(e.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            axios.get(BASE_URL + `/api/bids?cpo_min=${cpo}&title=${query}&min=&${fee}`)
                .then(response => {
                    console.log(response.data)
                    setBids(response.data)
                }).catch(err => {
                    alert(err)
                })
        }

        fetchData();
    }, [cpo, fee, query]);

    let bidItem = {
        id: 1,
        title: "Some bidding with the title",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem commodi soluta sed facere earum, error similique culpa est dolore, vitae quasi ea corrupti consequuntur dolorum ratione veniam eligendi iure. Itaque?",
        cpo_amount: 1400,
        fee: 13300,
        date: new Date()
    }

    return (
        <div className="m-auto sm:my-4">
            <div className="flex flex-row flex-wrap my-6 justify-center">
                <div className="text-gray-800 text-left whitespace-break-normal justify-center ">
                    <p className="text-3xl">Browse Bids</p>
                </div>
            </div>
            <div className="flex flex-row justify-center lg:px-72 md:px-52 sm:px-0">
                <div className="w-4/5">
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

            <div className="flex flex-row gap-2 justify-center my-3 mt-20">
                <div>
                    <Label
                        htmlFor="customRange1"
                        className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
                    >Fee</Label>
                    <input
                        type="range"
                        name="Fee"
                        className="transparent h-1.5 w-full cursor-pointer appearance-none rounded-lg border-transparent bg-neutral-200"
                        id="customRange1" />
                </div>

                {/* <div>
                    <Label
                        htmlFor="customRange1"
                        className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
                    >CPO Amount</Label>
                    <input
                        type="range"
                        className="transparent h-1.5 w-full cursor-pointer appearance-none rounded-lg border-transparent bg-neutral-200"
                        id="customRange1" />
                </div> */}
            </div>

            <div className="lg:px-32 md:px-24 sm:px-16 my-10">
                {isLoading && (
                    <Spinner />
                )}
                {isLoading == false && bids.length == 0 ? (
                    <div className="flex flex-row my-10 justify-center">
                        <p className="text-gray-700 text-lg font-bold">No bids found.</p>
                    </div>
                ) : (
                    <div className="lg:px-35 md:px-20">
                        {bids.map((bidItem) => {
                            return (
                                <BidItemComponent bid={bidItem} key={bidItem.id.toString()} />
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BidsPage;
