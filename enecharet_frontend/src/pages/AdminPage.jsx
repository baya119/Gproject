import React, { useEffect, useRef, useState } from 'react';
import { Button, Table, Tabs, Spinner, Tooltip, Modal } from 'flowbite-react';
import { BsFillCheckCircleFill, BsFillXOctagonFill } from "react-icons/bs";
import { EmptyComponent } from '../components/EmptyComponent';
import NotFoundErrorPage from './NotFoundErrorPage';
import axios from 'axios';
import { BASE_URL } from '../util/Constants';

const AdminPage = () => {
    const [isUserListLoading, setisUserListLoading] = useState(false);
    const [isBidsListLoading, setIsBidsListLoading] = useState(false);
    const [isWithDrawalLoading, setIsWithDrawalLoading] = useState(false);
    const [isActionPerforming, setIsActionPerforming] = useState(false);
    const [selectedId, setSelectedId] = useState(-1);
    const [usersList, setUsersList] = useState([]);
    const [bidsList, setBidsList] = useState([]);
    const [withDrawalList, setWithDrawalList] = useState([]);
    const [showDialog, setShowDialog] = useState(false);
    const [result, setResult] = useState({});
    const [activeTab, setActiveTab] = useState(0);
    const [showSuspendDialog, setShowSuspendDialog] = useState(false);
    const [fees, setFees] = useState(0);
    const tabsRef = useRef(null);
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || role != "admin") {
        return <NotFoundErrorPage />
    }

    let header = {
        'x-auth-token': token
    }

    useEffect(() => {
        if (activeTab === 0) {
            setisUserListLoading(true);
            axios.get(BASE_URL + "/api/users", { headers: header })
                .then(response => {
                    setisUserListLoading(false);
                    setUsersList(response.data);
                })
                .catch(err => {
                    //alert(JSON.parse(err.response.data.message)); better UX? hmm...
                    setResult(err.response);
                    setShowDialog(true);
                    setisUserListLoading(false);
                })
        } else if (activeTab === 1) {
            setIsBidsListLoading(true);
            axios.get(BASE_URL + "/api/bids")
                .then(response => {
                    setBidsList(response.data);
                    setIsBidsListLoading(false);

                    let total = 0;

                    for(let i = 0; i < response.data.length; i++){
                        total = total + response.data[i].total_fee;
                    }

                    setFees(total * 0.15);
                })
                .catch(err => {
                    //alert(JSON.parse(err.response.data.message));
                    setResult(err.response);
                    setShowDialog(true);
                    setIsBidsListLoading(false);
                })
        } else {
            setIsWithDrawalLoading(true);
            axios.get(BASE_URL + "/api/requests", { headers: header })
                .then(response => {
                    setIsWithDrawalLoading(false);
                    setWithDrawalList(response.data);
                })
                .catch(err => {
                    setIsWithDrawalLoading(false);
                    //alert(err.response.data.message);
                    setResult(err.response);
                    setShowDialog(true);
                })
        }
    }, [activeTab]);

    const balanceComponent = (activeBalance, totalFee, cpoHolded) => {
        return (
            <div className="flex flex-col gap-1">
                <p>Balances</p>
                <p>Active Balance: {activeBalance}</p>
                <p>Total Fee: {totalFee}</p>
                <p>CPO Holded: {cpoHolded}</p>
            </div>
        );
    };

    const handleSuspendClick = (id) => {
        setIsActionPerforming(true);
        axios.put(BASE_URL + `/api/suspend?id=${id}`, {}, { headers: header })
            .then(response => {
                //alert("Successfully suspended user!");
                setSelectedId(id);
                setIsActionPerforming(false);
                setShowDialog(true);
                setResult(response);
                window.location.reload(false);
            })
            .catch(err => {
                setIsActionPerforming(false);
                setShowDialog(true);
                setResult(err.response);
            });
    }

    const handleRemoveClick = (id) => {
        axios.delete(BASE_URL + `/api/bid/remove?id=${id}`, { headers: header })
            .then(response => {
                setShowDialog(true);
                setResult(response);
                //window.location.reload(false);
            })
            .catch(err => {
                setShowDialog(true);
                setResult(err.response);
            });
    }

    const handleApprovePaymentRequest = (id) => {
        axios.put(BASE_URL + `/api/approve/request/${id}`, {}, { headers: header })
            .then(response => {
                setShowDialog(true);
                setResult(response);
                window.location.reload(false);
            })
            .catch(err => {
                setShowDialog(true);
                setResult(err.response);
            })
    }

    const hanldeClose = (e) => {
        setResult({});
        setShowDialog(false);
        window.location.reload(false);
    }


    return (
        <div>
            <Modal show={showDialog} size="md" popup={true} onClose={hanldeClose}>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        {result.status < 400 ? (
                            <div>
                                <BsFillCheckCircleFill className="mx-auto mb-4 h-14 w-14 text-gray-600 " />
                                <h3 className="mb-5 text-lg font-normal text-gray-600 ">
                                    Success!
                                </h3>
                            </div>
                        ) : (
                            <div>
                                <BsFillXOctagonFill className="mx-auto mb-4 h-14 w-14 text-gray-600 " />
                                <h3 className="mb-5 text-lg font-normal text-gray-600 ">
                                    Error!{/*result.data.message == null ? "Error" : result.data.message*/}
                                </h3>
                            </div>
                        )}
                        <div className="flex justify-center gap-4">
                            <Button color="gray" pill size="xs" onClick={hanldeClose}>
                                Close
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            {/* <Modal show={showSuspendDialog} size="md" popup={true} onClose={hanldeClose}>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <div>
                            <BsFillXOctagonFill className="mx-auto mb-4 h-14 w-14 text-gray-600 " />
                            <h3 className="mb-5 text-lg font-normal text-gray-600 ">
                                Are you sure you want to suspend this user?
                            </h3>
                        </div>
                        <div className="flex justify-center gap-4">
                            <Button pill size="xs" >
                                Yes
                            </Button>
                            <Button color="gray" pill size="xs" onClick={hanldeClose}>
                                Close
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal> */}

            <div className="flex flex-row gap-3 flex-wrap my-5 justify-center">
                <div className="text-gray-700 text-left whitespace-break-normal justify-center ">
                    <p className="text-2xl">Hi Admin, Welcome...</p>
                </div>
            </div>

            <div className="flex-1 flex-col md:px-10 lg:px-20">
                <Tabs.Group style="underline" ref={tabsRef}
                    onActiveTabChange={(tab) => setActiveTab(tab)}>
                    <Tabs.Item active={true} title="Users">
                        {isUserListLoading && (
                            <div className="flex flex-row my-8 justify-center">
                                <Spinner />
                            </div>
                        )}

                        {!isUserListLoading && usersList.length == 0 ? (
                            <EmptyComponent type="Users" />
                        ) : (
                            <Table>
                                <Table.Head>
                                    <Table.HeadCell>Id</Table.HeadCell>
                                    <Table.HeadCell>Name</Table.HeadCell>
                                    <Table.HeadCell>Email</Table.HeadCell>
                                    <Table.HeadCell>P. Number</Table.HeadCell>
                                    <Table.HeadCell>Balances</Table.HeadCell>
                                    <Table.HeadCell>Status</Table.HeadCell>
                                    <Table.HeadCell>Action</Table.HeadCell>
                                </Table.Head>
                                <Table.Body>
                                    {usersList.map((userItem) => {
                                        return (
                                            <Table.Row key={userItem.id.toString()}>
                                                <Table.Cell>{userItem.id}</Table.Cell>
                                                <Table.Cell>{userItem.fname + " " + userItem.lname}</Table.Cell>
                                                <Table.Cell>{userItem.email}</Table.Cell>
                                                <Table.Cell>{userItem.phonenumber}</Table.Cell>
                                                <Table.Cell>
                                                    <Tooltip
                                                        content={balanceComponent(userItem.active_balance, userItem.total_fee, userItem.cpo_holded)}
                                                        placement="bottom"
                                                    >
                                                        View Balances
                                                    </Tooltip>
                                                </Table.Cell>
                                                <Table.Cell>{userItem.status == "SUSPENDED" ? <p className='text-red-600'>SUSPENDED!</p> : userItem.status}</Table.Cell>
                                                <Table.Cell>
                                                    {!isActionPerforming || selectedId != userItem.id ? (
                                                        <Button color="failure" pill size="xs" onClick={() => handleSuspendClick(userItem.id)}>Suspend</Button>
                                                    ) : (
                                                        <Spinner />
                                                    )}
                                                </Table.Cell>
                                            </Table.Row>
                                        )
                                    })}
                                </Table.Body>
                            </Table>
                        )}
                    </Tabs.Item>
                    <Tabs.Item active={true} title="Bids">
                        {isBidsListLoading && (
                            <div className="flex flex-row my-8 justify-center">
                                <Spinner />
                            </div>
                        )}

                        {!isBidsListLoading && bidsList.length == 0 ? (
                            <EmptyComponent type="Bids" />
                        ) : (
                            <Table>
                                <Table.Head>
                                    <Table.HeadCell>Id</Table.HeadCell>
                                    <Table.HeadCell>User Id</Table.HeadCell>
                                    <Table.HeadCell>CPO</Table.HeadCell>
                                    <Table.HeadCell>Title</Table.HeadCell>
                                    <Table.HeadCell>Description</Table.HeadCell>
                                    <Table.HeadCell>Fee</Table.HeadCell>
                                    <Table.HeadCell>Tag</Table.HeadCell>
                                    <Table.HeadCell>TotalFee</Table.HeadCell>
                                    <Table.HeadCell>Status</Table.HeadCell>
                                    <Table.HeadCell>Action</Table.HeadCell>
                                </Table.Head>
                                <Table.Body>
                                    {bidsList.map((bidsItem) => {
                                        return (
                                            <Table.Row key={bidsItem.id.toString()}>
                                                <Table.Cell>{bidsItem.id}</Table.Cell>
                                                <Table.Cell>{bidsItem.user_id}</Table.Cell>
                                                <Table.Cell>{bidsItem.cpo_amount}</Table.Cell>
                                                <Table.Cell>{bidsItem.title}</Table.Cell>
                                                <Table.Cell>{bidsItem.description}</Table.Cell>
                                                <Table.Cell>{bidsItem.fee}</Table.Cell>
                                                <Table.Cell>{bidsItem.tag}</Table.Cell>
                                                <Table.Cell>{bidsItem.total_fee}</Table.Cell>
                                                <Table.Cell>{bidsItem.status}</Table.Cell>
                                                <Table.Cell>
                                                    {!isActionPerforming ? (
                                                        <Button color="failure" pill size="xs" onClick={() => handleRemoveClick(bidsItem.id)}>Remove</Button>
                                                    ) : (
                                                        <Spinner />
                                                    )}
                                                </Table.Cell>
                                            </Table.Row>
                                        )
                                    })}
                                </Table.Body>
                            </Table>
                        )}
                        <br/>
                        <p>Total system revenue: {fees} birr</p><br/>
                    </Tabs.Item>
                    <Tabs.Item active={true} title="Withdrawal Requests">
                        {isWithDrawalLoading && (
                            <div className="flex flex-row my-8 justify-center">
                                <Spinner />
                            </div>
                        )}

                        {!isWithDrawalLoading && withDrawalList.length == 0 ? (
                            <EmptyComponent type="Withdrawal Requests" />
                        ) : (
                            <Table>
                                <Table.Head>
                                    <Table.HeadCell>Id</Table.HeadCell>
                                    <Table.HeadCell>Name</Table.HeadCell>
                                    <Table.HeadCell>Phone Number</Table.HeadCell>
                                    <Table.HeadCell>Bank Account</Table.HeadCell>
                                    <Table.HeadCell>Bank</Table.HeadCell>
                                    <Table.HeadCell>Amount</Table.HeadCell>
                                    <Table.HeadCell>Status</Table.HeadCell>
                                    <Table.HeadCell>Action</Table.HeadCell>
                                </Table.Head>
                                <Table.Body>
                                    {withDrawalList.map((withDrawalItem) => {
                                        return (
                                            <Table.Row id={withDrawalItem.id.toString()}>
                                                <Table.Cell>{withDrawalItem.id}</Table.Cell>
                                                <Table.Cell>{withDrawalItem.fname + " " + withDrawalItem.lname}</Table.Cell>
                                                <Table.Cell>{withDrawalItem.phonenumber}</Table.Cell>
                                                <Table.Cell>{withDrawalItem.bank_account}</Table.Cell>
                                                <Table.Cell>{withDrawalItem.bank}</Table.Cell>
                                                <Table.Cell>{withDrawalItem.amount}</Table.Cell>
                                                <Table.Cell>{withDrawalItem.status}</Table.Cell>
                                                <Table.Cell>
                                                    {!isActionPerforming ? (
                                                        <Button pill size="xs" onClick={() => handleApprovePaymentRequest(withDrawalItem.id)}>Approve</Button>
                                                    ) : (
                                                        <Spinner />
                                                    )}
                                                </Table.Cell>
                                            </Table.Row>
                                        )
                                    })}

                                </Table.Body>
                            </Table>
                        )}
                    </Tabs.Item>
                </Tabs.Group>
            </div>
        </div >
    );
}

export default AdminPage