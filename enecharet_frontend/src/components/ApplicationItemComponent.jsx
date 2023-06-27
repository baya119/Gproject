import React from 'react';
import { Card, Button } from 'flowbite-react';

export const ApplicationItemComponent = (props) => {
    return (
        <div className="my-4 h-max">
            <Card className="rounded-2xl hover:shadow-xl">
                <div className="flex flex-row">
                    <div className="flex flex-col px-5">
                        <div className="flex items-baseline">
                            <span className="font-medium text-gray-700 mr-1">User ID: </span>
                            <span className="text-gray-500">{parseInt(props.application.user_id).toLocaleString("en-US")}</span>
                        </div>
                        <div className="flex items-baseline">
                            <span className="font-medium text-gray-700 mr-1">Bid ID: </span>
                            <span className="text-gray-500">{parseInt(props.application.bid_id).toLocaleString("en-US")}</span>
                        </div>
                        <div className="flex items-baseline">
                            <a
                                href={props.application.file_url}
                                className="font-medium text-gray-700 mr-1"
                            >
                                File Url to Application
                            </a>
                        </div>
                        <div className="flex flex-row text-gray-700 pt-3">
                            <p className="text-lg text-gray-700">
                                {props.application.created_at}
                            </p>
                        </div>
                        <div className="flex flex-row my-5">
                            <Button onClick={() => props.onAcceptClick(props.application.id)}>Accept application</Button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
