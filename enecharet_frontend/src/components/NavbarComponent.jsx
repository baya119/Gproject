import React from "react";
import { Navbar, Avatar, Dropdown } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const NavbarComponent = () => {
    const navigate = useNavigate();
    const data = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    console.log(data);

    const isAuthenticated = data !== null && token !== null;

    const handleProfileClick = () => {
        navigate("/profile");
    };
    const handleLogoutClick = () => {
        localStorage.clear();
        navigate("/");
    };


    return (
        <div className="bg-white shadow-md px-16 fixed top-0 w-full z-50">
            <Navbar fluid>
                <Navbar.Brand>
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white text-gray-700">
                        Encharet
                    </span>
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Navbar.Link href="/" className="align-middle justify-self-center">
                        Home
                    </Navbar.Link>
                    <Navbar.Link href="/bids" className="align-middle">
                        Bids
                    </Navbar.Link>
                    {isAuthenticated && (
                        role == "user" ? (
                            <div className="flex flex-wrap gap-2">
                                <Avatar
                                    alt="avatar of user"
                                    img="/images/image_placeholder.jpg"
                                    size="xs"
                                    rounded
                                    className="cursor-pointer"
                                >
                                    <Dropdown inline>
                                        <Dropdown.Item onClick={handleProfileClick}>
                                            Profile
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={handleLogoutClick}>
                                            Logout
                                        </Dropdown.Item>
                                    </Dropdown>
                                </Avatar>
                            </div>
                        ) : (
                            <>
                                <Navbar.Link href="/admin">
                                    Admin Dashboard
                                </Navbar.Link>
                                <Navbar.Link onClick={handleLogoutClick} className="cursor-pointer">
                                    LogOut
                                </Navbar.Link>
                            </>
                        )
                    )}
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default NavbarComponent;