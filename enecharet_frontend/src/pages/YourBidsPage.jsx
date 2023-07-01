import React, { useEffect, useState } from 'react'
import NotFoundErrorPage from './NotFoundErrorPage';
import axios from 'axios';
import { BASE_URL } from '../util/Constants';
import { Spinner } from 'flowbite-react';
import { BidItemComponent } from '../components/BidItemComponent';

const YourBidsPage = () => {
    const token = localStorage.getItem('token');
    const [bidsList, setBidsList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        let headers = {
            'x-auth-token': token
        }

        const fetchData = async () => {
            axios.get(BASE_URL + `/api/mybids`, { headers })
                .then(response => {
                    setIsLoading(false);
                    console.log(response.data);
                    setBidsList(response.data);
                })
                .catch(err => {
                    setIsLoading(false);
                    alert(err.response.data.message);
                })
        }

        fetchData();
    }, []);

    if (!token) {
        return <NotFoundErrorPage />
    }

    return (
        <div>
            <div className="flex flex-row my-6 justify-center">
                <div className="sm:w-2/5 lg:w-3/5 md:w-2/5">
                    <p className="text-2xl text-center text-gray-700">Your Bids</p>
                </div>
            </div>

            <div className="my-5">
                {isLoading && (
                    <div className="flex flex-row justify-center">
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
                                <BidItemComponent bid={bidItem} key={bidItem.id.toString()} />
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

export default YourBidsPage