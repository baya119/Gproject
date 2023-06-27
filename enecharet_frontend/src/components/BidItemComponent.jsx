import React from 'react';
import { Card } from 'flowbite-react';

export const BidItemComponent = (props) => {
    return (
        <div className="my-4">
            <Card className="rounded-2xl hover:shadow-xl">
                <div className="flex flex-row">
                    <div className="flex flex-col px-5">
                        <a
                            href={"bid-detail/" + props.bid.id}
                            className="text-2xl font-bold tracking-tight text-gray-900  pb-3"
                        >
                            {props.bid.title}
                        </a>

                        <div className="flex flex-row text-gray-700 my-5">
                            <p className="text-lg text-gray-700">
                                {props.bid.description}
                            </p>
                        </div>
                        <div className="flex items-baseline">
                            <span className="font-medium text-gray-700 mr-1">CPO Amount: </span>
                            <span className="text-gray-500">{parseInt(props.bid.cpo_amount).toLocaleString("en-US")}</span>
                        </div>
                        
                        <div className="flex items-baseline">
                            <span className="font-medium text-gray-700 mr-1">Fee: </span>
                            <span className="text-gray-500">{parseInt(props.bid.fee).toLocaleString("en-US")}</span>
                        </div>
                        <div className="flex flex-row text-gray-700 pt-3">
                            <p className="text-lg text-gray-700">
                                {props.bid.created_at}
                            </p>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}