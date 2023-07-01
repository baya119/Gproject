import React from 'react';
import notFoundAnimation from "../assets/empty_ghost.json";
import Lottie from "lottie-react";
import { Button } from 'flowbite-react';
const style = {
    height: 350,
    width: 350,
};


export const EmptyComponent = (props) => {
    return (
        <div className="m-auto flex flex-col justify-center w-full">
            <div className="flex flex-row justify-center">
                <Lottie animationData={notFoundAnimation} style={style} loop={true} />
            </div>
            <p className="text-xl text-gray-800 text-center">
                Oops! seems like you don't have any {props.type} yet!
            </p>
            <div className="flex flex-row my-6 justify-center">
                <div className="py-0">
                    <Button size="xs" pill href="/">
                        Return Home
                    </Button>
                </div>
            </div>
        </div>
    )
}

