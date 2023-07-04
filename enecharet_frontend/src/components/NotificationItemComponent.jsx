import React from "react";
import {Card} from "flowbite-react";

export const NotificationItemComponent = (props) => {
    const parseDateToString = (dateString) => {
        const date = new Date(dateString);
        const optionsDate = {
            month: 'short',
            day: 'numeric'
        };
        const formattedDate = date.toLocaleDateString('en-US', optionsDate);
        const optionsTime = {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        };
        const formattedTime = date.toLocaleTimeString('en-US', optionsTime);

        return formattedDate + " at " + formattedTime;
    }
    return (
        <div className="my-4">
            <Card className="rounded-2xl hover:shadow-xl">
                <div className="flex flex-row">
                    <div className="flex flex-col px-5">
                        {props.role == "user"
                            ? (
                                <a
                                    href={"bid-detail/" + props.bid.id}
                                    className="text-2xl font-bold tracking-tight text-gray-900  pb-3">
                                    {props.bid.title}
                                </a>
                            )
                            : (
                                <p className="text-2xl font-bold tracking-tight text-gray-900  pb-3">
                                    {props.bid.title}
                                </p>
                            )}

                        <div className="flex flex-row text-gray-700 my-5">
                            <p className="text-lg text-gray-700">
                                {props.bid.description}
                            </p>
                        </div>
                        <div className="flex items-baseline">
                            <span className="font-medium text-gray-700 mr-1">CPO Amount:
                            </span>
                            <span className="text-gray-500">{parseInt(props.bid.cpo_amount).toLocaleString("en-US")}</span>
                        </div>

                        <div className="flex items-baseline">
                            <span className="font-medium text-gray-700 mr-1">Status:
                            </span>
                            <span className="text-gray-500">{props.bid.status}</span>
                        </div>

                        <div className="flex items-baseline">
                            <span className="font-medium text-gray-700 mr-1">Tag:
                            </span>
                            <span className="text-gray-500">{props.bid.tag}</span>
                        </div>

                        <div className="flex items-baseline">
                            <span className="font-medium text-gray-700 mr-1">Fee:
                            </span>
                            <span className="text-gray-500">{parseInt(props.bid.fee).toLocaleString("en-US")}</span>
                        </div>
                        <div className="flex flex-row text-gray-700 pt-3">
                            <p className="text-lg text-gray-700">
                                {parseDateToString(props.bid.created_at)}
                            </p>
                        </div>
                        <div className="flex flex-row justify-center text-green-500 pt-3">
                            <p className="text-lg  text-center">
                                Your offer has been accepted for this particular bid!
                                <br/>
                                Please wait until contacted by the organization.
                            </p>
                        </div>

                    </div>
                </div>
            </Card>
        </div>
    );
};
