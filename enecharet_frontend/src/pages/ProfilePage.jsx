import React, { useState, useEffect } from 'react';
import { Spinner, Sidebar } from 'flowbite-react';
import { BsPersonCircle, BsPiggyBank, BsXCircle, BsArrowLeftCircle, BsFillQuestionCircleFill } from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';
import { BiLogOut, BiAddToQueue } from 'react-icons/bi';
import { IoIosNotifications } from "react-icons/io";
import UserProfilePage from './UserProfilePage';
import ClosedPage from './ClosedPage';
import UpComingPage from './UpComingPage';
import WithDrawalPage from './WithDrawalPage';
import SettingsPage from './SettingsPage';
import DepositPage from './DepositPage';
import FrequentlyAskedQuestionsPage from './FrequentlyAskedQuestionsPage';
import LogoutPage from './LogoutPage';
import CreateBidPage from './CreateBidPage';
import NotificationPage from './NotificationPage';

const ProfilePage = () => {
  const [route, setRoute] = useState("/");
  const userData = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    // Code to fetch the current route from the server or browser history
    // and update the route state variable
    setRoute(window.location.pathname);
    console.log(window.location.pathname);
  }, []);


  const ContentComponent = () => {
    switch (route) {
      case "/profile/faq":
        return <FrequentlyAskedQuestionsPage />;
      case "/profile/closed":
        return <ClosedPage />;
      case "/profile/upcoming":
        return <UpComingPage />;
      case "/profile/deposit":
        return <DepositPage />;
      case "/profile/withdrawal":
        return <WithDrawalPage />;
      case "/profile/setting":
        return <SettingsPage />;
      case "/profile/notifications":
        return <NotificationPage/> ;
      case "/profile/logout":
        return <LogoutPage />;
      case "/profile/createbid":
        return <CreateBidPage />
      default:
        return <UserProfilePage />;
    }
  }

  return (
    <div>
      <div className="h-screen flex">
        <div className="px-15 md:px-5 hidden md:block">
          <Sidebar aria-label="Default sidebar example" className="bg-white">
            <Sidebar.Items>
              <Sidebar.ItemGroup>
                <div className="flex flex-row justify-center">
                  <img
                    className="h-24 w-24 rounded-full shadow-lg"
                    src={"/images/image_placeholder.jpg"}
                    alt="Image"
                  />
                </div>
                <h2 className="my-2 text-2xl font-medium text-gray-500 text-center">
                  {userData.fname + " " + userData.lname}
                </h2>
                <Sidebar.Item
                  href="/profile/"
                  icon={BsPersonCircle}
                >
                  <p>
                    Profile
                  </p>
                </Sidebar.Item>
                <Sidebar.Item
                  href="/profile/deposit"
                  icon={BsPiggyBank}
                >
                  <p>
                    Deposit
                  </p>
                </Sidebar.Item>
                <Sidebar.Item
                  href="/profile/createbid"
                  icon={BiAddToQueue}
                >
                  <p>
                    Create Bid
                  </p>
                </Sidebar.Item>
                <Sidebar.Item
                  href="/profile/setting"
                  icon={FiSettings}
                >
                  <p>
                    Verify Account
                  </p>
                </Sidebar.Item>
                <Sidebar.Item
                  href="/profile/notifications"
                  icon={IoIosNotifications}
                >
                   <p>
                    Notifications
                  </p>
                </Sidebar.Item>
                <Sidebar.Item
                  href="/profile/faq"
                  icon={BsFillQuestionCircleFill}
                >
                  <p>
                    FAQ
                  </p>
                </Sidebar.Item>
                <Sidebar.Item
                  href="/profile/logout"
                  icon={BiLogOut}
                >
                  <p>
                    Logout
                  </p>
                </Sidebar.Item>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </Sidebar>
        </div>
        <div className="flex-1 flex overflow-y-auto no-scrollbar px-5 lg:w-3/5">
          <div className="flex-1 px-0 md:px-5">
            <ContentComponent />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage