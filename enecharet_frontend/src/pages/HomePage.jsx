import React from "react";
import { Button } from "flowbite-react";
import Lottie from "lottie-react";
import lottie_one from "../assets/lottie_bidding.json";
import lottie_two from "../assets/business_table.json";
import lottie_three from "../assets/business.json";

const style = {
    height: 400,
    width: 350,
};

const style_two = {
    height: 400,
    width: 400,
};

const HomePage = () => {
    return (
        <div className="justify-center md:px-5 lg:px-10">
            <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-2 place-items-center">
                <div className="text-gray-800 text-left whitespace-break-normal ">
                    <p className="text-4xl sm:text-3xl py-5">
                        Revolutionize Your Bidding Experience with Our Innovative Platform
                    </p>

                    <p className="text-lg">Bid Smarter, Faster, and More Effectively with Our User-Friendly Website</p>
                    <div className="flex flex-row my-6">
                        <div>
                            <Button size="md" pill href="/signUp">
                                Get started
                            </Button>
                        </div>
                    </div>
                </div>
                <div>
                    <Lottie
                        animationData={lottie_one}
                        style={style}
                        loop={true}
                    />
                </div>
            </div>

            <div>
                <div className="container mx-auto py-20 lg:px-8 sm:px-5 text-gray-800">
                    <p className="text-4xl sm:text-3xl text-center text-gray-800 py-5">
                        Why Us?
                    </p>
                    <div className="grid lg:grid-cols-3 gap-2">
                        <div className="p-3 bg-white shadow-md hover:shadow-lg rounded-2xl px-5 py-6">
                            <span className="font-bold text-xl">Streamlined</span>

                            <p className="mt-2 text-justify">
                                Our bidding website is the perfect solution for anyone looking to bid on auctions
                                and win the items they want. With a streamlined bidding process and a wide range of
                                auction listings to choose from, our platform makes it easy for users to find the items
                                they're looking for and place competitive bids. Our user-friendly interface is designed
                                to make the bidding process as smooth and efficient as possible, providing users with a
                                hassle-free experience from start to finish.
                            </p>
                        </div>

                        <div className="p-3 bg-white shadow-md hover:shadow-lg rounded-2xl px-5 py-6">
                            <span className="font-bold text-xl">Care</span>

                            <p className="mt-2 text-justify">
                                Our team is dedicated to ensuring that users have a seamless experience on our platform, and
                                we are always available to answer questions and provide assistance whenever it's needed. We
                                believe that our customers are our most valuable asset, and we go above and beyond to ensure
                                that they are satisfied with our service. From our comprehensive auction listings to our outstanding
                                customer support, we are the clear choice for anyone looking to bid on auctions online.
                            </p>
                        </div>

                        <div className="p-3 bg-white shadow-md hover:shadow-lg rounded-2xl px-5 py-6">
                            <span className="font-bold text-xl">Improving</span>

                            <p className="mt-2 text-justify">
                                We are constantly working to improve our platform and provide our users with the best possible
                                experience. Our vision is to become the go-to destination for anyone looking to bid on auctions
                                online, and we are committed to achieving this goal by providing exceptional service and continuously
                                improving our platform. When it comes to bidding websites, there's no one better than us.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-10">
                <div className="grid md:grid-cols-2 sm:grid-cols-1 py-5 gap-2 place-items-center">
                    <div className="text-gray-800 text-left whitespace-break-normal ">
                        <p className="text-2xl">Our Mission</p>
                        <p>
                            At Enecharet, our mission is to provide a user-friendly platform that makes bidding on auctions easy, efficient,
                            and fun. We strive to offer a comprehensive range of auction listings that appeal to a wide range of buyers,
                            from individuals looking for unique items to businesses seeking to liquidate excess inventory. We are committed
                            to providing exceptional customer service and support, ensuring that our users have a seamless experience from
                            start to finish. Ultimately, our mission is to revolutionize the online bidding experience by offering a platform
                            that is both innovative and accessible to all.
                        </p>
                    </div>
                    <div>
                        <Lottie
                            animationData={lottie_three}
                            loop={true}
                            style={style_two}
                        />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 sm:grid-cols-1 py-5 place-items-center">
                    <div>
                        <Lottie
                            animationData={lottie_two}
                            loop={true}
                            style={style_two}
                        />
                    </div>
                    <div className="text-gray-800 text-left whitespace-break-normal ">
                        <p className="text-2xl">Our Vision</p>
                        <p>
                            Our vision for our online bidding website is to become the leading destination for anyone
                            looking to bid on auctions online. We aim to offer a platform that is comprehensive, user-friendly,
                            and constantly evolving to meet the changing needs of our users. We believe that by providing a
                            seamless bidding experience and exceptional customer service, we can set the standard for online auctions
                            and become the go-to destination for buyers and sellers alike. Our vision is to create a community of
                            passionate bidders who come together to find unique items, support small businesses, and enjoy the thrill
                            of the auction process.
                        </p>
                    </div>
                </div>
            </div>

            <p className="text-4xl sm:text-3xl text-center text-gray-800 py-5">
                Developers
            </p>
            <div className="grid grid-cols-3 justify-center gap-3 place-items-center py-10 place-content-center">
                <div className="content-center shadow-lg hover:shadow-2xl py-10 px-20 rounded-lg border-2">
                    <img className="rounded-full border border-gray-100 self-center" width="150px" height="150px" src="./images/image_placeholder.jpg" alt="user image" />
                    <p className="text-xl text-center text-gray-800 font-bold py-4">
                        Group Member
                    </p>
                </div>

                <div className="content-center shadow-lg hover:shadow-2xl py-10 px-20 rounded-md border-2">
                    <img className="rounded-full border border-gray-100 self-center" width="150px" height="150px" src="./images/image_placeholder.jpg" alt="user image" />
                    <p className="text-xl text-center text-gray-800 font-bold py-4">
                        Group Member
                    </p>
                </div>

                <div className="content-center shadow-lg hover:shadow-2xl py-10 px-20 rounded-md border-2">
                    <img className="rounded-full border border-gray-100 self-center" width="150px" height="150px" src="./images/image_placeholder.jpg" alt="user image" />
                    <p className="text-xl text-center text-gray-800 font-bold py-4">
                        Group Member
                    </p>
                </div>

                <div className="content-center shadow-lg hover:shadow-2xl py-10 px-20 rounded-md border-2">
                    <img className="rounded-full border border-gray-100 self-center" width="150px" height="150px" src="./images/female-placeholder.jpeg" alt="user image" />
                    <p className="text-xl text-center text-gray-800 font-bold py-4">
                        Group Member
                    </p>
                </div>

                <div className="content-center shadow-lg hover:shadow-2xl py-10 px-20 rounded-md border-2">
                    <img className="rounded-full border border-gray-100 self-center" width="150px" height="150px" src="./images/image_placeholder.jpg" alt="user image" />
                    <p className="text-xl text-center text-gray-800 font-bold py-4">
                        Group Member
                    </p>
                </div>

            </div>
        </div>
    );
};

export default HomePage;
