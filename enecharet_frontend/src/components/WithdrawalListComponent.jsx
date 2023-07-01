import React from 'react'
import { Card } from 'flowbite-react'

export default function WithdrawalListComponent(props) {
    return (
        <div className="my-4">
            <Card className="rounded-2xl hover:shadow-xl">
                <div className="flex flex-row">
                    <div className="flex flex-col px-5">
                        <div className="flex items-baseline">
                            <span className="font-medium text-gray-700 mr-1">Amount: </span>
                            <span className="text-gray-500">{parseInt(props.request.amount).toLocaleString("en-US")}</span>
                        </div>
                        <div className="flex items-baseline">
                            <span className="font-medium text-gray-700 mr-1">Status: </span>
                            <span className="text-gray-500">{props.request.status}</span>
                        </div>
                        <div className="flex flex-row text-gray-700 pt-3">
                            <p className="text-lg text-gray-700">
                                Date: {props.request.created_at.substring(0, 10)}
                            </p>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}
