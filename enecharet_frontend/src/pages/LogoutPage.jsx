import React from 'react';
import { Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {
    let navigate = useNavigate();
    const handleLogout = (e) => {
        localStorage.clear();
        navigate("/")
    };
    const handleNo = (e) => {
        navigate("/")
    };
    
    return (
        <div>
            <div className="flex flex-row flex-wrap my-4 justify-center">
                <div className="text-gray-800 text-left whitespace-break-normal justify-center ">
                    <p className="text-3xl">Are you sure you want to LogOut?</p>
                </div>
            </div>
            <div className="flex flex-row gap-4 justify-center">
                <Button onClick={handleLogout}>
                    Yes
                </Button>
                <Button outline onClick={handleNo}>
                    No
                </Button>
            </div>
        </div>
    )
}

export default LogoutPage