import React, {useEffect, useRef, useState} from 'react';
import {
    Button,
    TextInput,
    Table,
    Tabs,
    Spinner,
    Tooltip,
    Modal,
    Label
} from 'flowbite-react';
import {BsFillCheckCircleFill, BsFillXOctagonFill} from "react-icons/bs";
import {EmptyComponent} from '../components/EmptyComponent';
import NotFoundErrorPage from './NotFoundErrorPage';
import {VisiblityButton} from "../components/VisibilityButton";
import PasswordStrengthBar from "react-password-strength-bar";
import axios from "axios";
import {BASE_URL} from "../util/Constants";
import {useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import * as yup from "yup";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(6, 'Password should be of minimum 8 characters length')
        .max(16, 'Password should be of maximum 16 characters length')
        .required('Password is required'),
    fname: yup
        .string('Enter your first name')
        .required('First name is required'),
    lname: yup
        .string('Enter your last name')
        .required('Last name is required'),
    phonenumber: yup
        .string('Enter your phone number')
        .required('phonenumber required'),
    cpassword: yup
        .string('Confirm your password')
        .required('Confirm password is required')
});

const AdminPage = () => {
    const [isLoading,
        setIsLoading] = useState(false);
    const [isPasswordVisible,
        setIsPasswordVisible] = useState(false);
    let navigate = useNavigate();
    const [isUserListLoading,
        setisUserListLoading] = useState(false);
    const [isBidsListLoading,
        setIsBidsListLoading] = useState(false);
    const [isWithDrawalLoading,
        setIsWithDrawalLoading] = useState(false);
    const [isActionPerforming,
        setIsActionPerforming] = useState(false);
    const [selectedId,
        setSelectedId] = useState(-1);
    const [usersList,
        setUsersList] = useState([]);
    const [bidsList,
        setBidsList] = useState([]);
        const [orgList,
            setOrgList] = useState([]);
    const [withDrawalList,
        setWithDrawalList] = useState([]);
    const [showDialog,
        setShowDialog] = useState(false);
    const [result,
        setResult] = useState({});
    const [activeTab,
        setActiveTab] = useState(0);
    const [showSuspendDialog,
        setShowSuspendDialog] = useState(false);
    const [fees,
        setFees] = useState(0);
    const tabsRef = useRef(null);
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const [searchTerm,
        setSearchTerm] = useState("");

    if (!token || role != "admin") {
        return <NotFoundErrorPage/>
    }

    let header = {
        'x-auth-token': token
    }

    useEffect(() => {
        if (activeTab === 0) {
            setisUserListLoading(true);
            axios
                .get(BASE_URL + "/api/users", {headers: header})
                .then(response => {
                    setisUserListLoading(false);
                    setUsersList(response.data);
                    toast.success(response.data.message, {autoClose: 2000});
                })
                .catch(err => {
                    //alert(JSON.parse(err.response.data.message)); better UX? hmm...
                    setResult(err.response);
                    //setShowDialog(true);
                    setisUserListLoading(false);
                    toast.error(err.response.data.message, {autoClose: 2000});
                })
        } else if (activeTab === 1) {
            setIsBidsListLoading(true);
            axios
                .get(BASE_URL + "/api/bids")
                .then(response => {
                    setBidsList(response.data);
                    setIsBidsListLoading(false);

                    let total = 0;

                    for (let i = 0; i < response.data.length; i++) {
                        total = total + response.data[i].total_fee;
                    }

                    setFees(total * 0.15);
                    toast.success(response.data.message, {autoClose: 2000});
                })
                .catch(err => {
                    //alert(JSON.parse(err.response.data.message));
                    setResult(err.response);
                    //setShowDialog(true);
                    setIsBidsListLoading(false);
                    toast.error(err.response.data.message, {autoClose: 2000});
                });
                setIsBidsListLoading(true);
                axios
                  .get(BASE_URL + "/api/bidsOrg")
                  .then(response => {
                    setOrgList(response.data);
                    
                    setIsBidsListLoading(false);
                  })
                  .catch(err => {
                    setIsBidsListLoading(false);
                    toast.error(err.response.data.message, { autoClose: 2000 });
                    reject(err); // Reject the Promise if there's an error
                  });
            
        } else {
            setIsWithDrawalLoading(true);
            axios
                .get(BASE_URL + "/api/requests", {headers: header})
                .then(response => {
                    setIsWithDrawalLoading(false);
                    setWithDrawalList(response.data);
                    toast.success(response.data.message, {autoClose: 2000});
                })
                .catch(err => {
                    setIsWithDrawalLoading(false);
                    //alert(err.response.data.message);
                    setResult(err.response);
                    //setShowDialog(true);
                    toast.error(response.data.message, {autoClose: 2000});
                })
        }
    }, [activeTab]);
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            fname: "",
            lname: "",
            phonenumber: "",
            cpassword: ""
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if (values.password !== values.cpassword) {
                alert("Confirm your password properly!!")
            } else {
                setIsLoading(true);
                
                axios
                    .post(BASE_URL + "/api/addAdmin", values)
                    .then(response => {
                        
                        setIsLoading(false);
                        setResult(response);
                        //setShowDialog(true);
                        toast.success('The admin user has been created.', {autoClose: 3000});

                    })
                    .catch(err => {
                        
                        setIsLoading(false);
                        setResult(err.response);
                        //setShowDialog(true);
                        toast.error(err.response.data.message, {autoClose: 3000});
                    })
            }
        }
    });

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

    const handleSuspendClick = (id, status) => {
        setIsActionPerforming(true);
        axios.put(BASE_URL + `/api/suspend?id=${id}&status=${status}`, {}, {headers: header}).then(response => {
            //alert("Successfully suspended user!");
            setSelectedId(id);
            setIsActionPerforming(false);
            //setShowDialog(true);
            setResult(response);

            window
                .location
                .reload(false);
            toast.success(response.data.message, {autoClose: 2000});
        }).catch(err => {
            setIsActionPerforming(false);
            //setShowDialog(true);
            setResult(err.response);
            toast.success(err.response.data.message, {autoClose: 2000});
        });
    }

    const handleRemoveClick = (id) => {
        axios
            .delete(BASE_URL + `/api/bid/remove?id=${id}`, {headers: header})
            .then(response => {
                //setShowDialog(true);
                setResult(response);
                window
                    .location
                    .reload(false);
                toast.success(response.data.message, {autoClose: 2000});
            })
            .catch(err => {
                //setShowDialog(true);
                setResult(err.response);
                toast.error(err.response.data.message, {autoClose: 2000});
            });
    }
    const handlePasswordVisiblity = (e) => {
        e.preventDefault();
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handleApprovePaymentRequest = (id) => {
        axios.put(BASE_URL + `/api/approve/request/${id}`, {}, {headers: header}).then(response => {
            //setShowDialog(true);
            setResult(response);
            window
                .location
                .reload(false);
            toast.success(response.data.message, {autoClose: 2000});
        }).catch(err => {
            //setShowDialog(true);
            setResult(err.response);
            toast.error(err.response.data.message, {autoClose: 2000});
        })
    }

    const hanldeClose = (e) => {
        setResult({});
        setShowDialog(false);
        window
            .location
            .reload(false);
    }

    // Filter the bidsList based on the searchTerm
    const filteredBidsList = bidsList.filter((bidsItem) => {
        const lowerCaseTitle = bidsItem
            .title
            .toLowerCase();
        const lowerCaseDescription = bidsItem
            .description
            .toLowerCase();
        const lowerCaseUserId = typeof bidsItem.user_id === 'string'
            ? bidsItem
                .user_id
                .toLowerCase()
            : '';
        const lowerCaseEmail = typeof bidsItem.email === 'string'
            ? bidsItem
                .email
                .toLowerCase()
            : '';

        return (lowerCaseTitle.includes(searchTerm.toLowerCase()) || lowerCaseDescription.includes(searchTerm.toLowerCase()) || lowerCaseUserId.includes(searchTerm.toLowerCase()) || lowerCaseEmail.includes(searchTerm.toLowerCase()));
    });
const getOrganizationName = (id) => {
    const org = orgList.find(org => org.user_id === id);
    return org ? org.name.toString() : '';
//     
//   orgList.forEach(org => {
//     
//     
//     if(org.user_id == id)
//     {
//         
//         
//         return org.name.toString();
//     }
//   });
};
    return (
        <div>
            <Modal show={showDialog} size="md" popup={true} onClose={hanldeClose}>
                <Modal.Header/>
                <Modal.Body>
                    <div className="text-center">
                        {result.status < 400
                            ? (
                                <div>
                                    <BsFillCheckCircleFill className="mx-auto mb-4 h-14 w-14 text-gray-600 "/>
                                    <h3 className="mb-5 text-lg font-normal text-gray-600 ">
                                        Success!
                                    </h3>
                                </div>
                            )
                            : (
                                <div>
                                    <BsFillXOctagonFill className="mx-auto mb-4 h-14 w-14 text-gray-600 "/>
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
                <div
                    className="text-gray-700 text-left whitespace-break-normal justify-center ">
                    <p className="text-2xl">Hi Admin, Welcome...</p>
                </div>
            </div>

            <div className="flex-1 flex-col md:px-10 lg:px-20">
                <Tabs.Group
                    style="underline"
                    ref={tabsRef}
                    onActiveTabChange={(tab) => setActiveTab(tab)}>
                    <Tabs.Item title="Users">
                        {isUserListLoading && (
                            <div className="flex flex-row my-8 justify-center">
                                <Spinner/>
                            </div>
                        )}

                        {!isUserListLoading && usersList.length == 0
                            ? (<EmptyComponent type="Users"/>)
                            : (
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
                                                <Table.Row
                                                    key={userItem
                                                    .id
                                                    .toString()}>
                                                    <Table.Cell>{userItem.id}</Table.Cell>
                                                    <Table.Cell>{userItem.fname + " " + userItem.lname}</Table.Cell>
                                                    <Table.Cell>{userItem.email}</Table.Cell>
                                                    <Table.Cell>{userItem.phonenumber}</Table.Cell>
                                                    <Table.Cell>
                                                        <Tooltip
                                                            content={balanceComponent(userItem.active_balance.toFixed(2), userItem.total_fee.toFixed(2), userItem.cpo_holded.toFixed(2))}
                                                            placement="bottom">
                                                            View Balances
                                                        </Tooltip>
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        {userItem.status === "PENDING"
                                                            ? (
                                                                <p className="text-gray-600">Pending</p>
                                                            )
                                                            : (
                                                                <p
                                                                    className={userItem.status === "SUSPENDED"
                                                                    ? "text-red-600"
                                                                    : ""}>
                                                                    {userItem.status}
                                                                </p>
                                                            )}
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        {!isActionPerforming || selectedId !== userItem.id
                                                            ? (
                                                                <Button
                                                                    color={userItem.status === "SUSPENDED"
                                                                    ? "success"
                                                                    : "failure"}
                                                                    pill
                                                                    size="xs"
                                                                    onClick={() => handleSuspendClick(userItem.id, userItem.status)}
                                                                    disabled={userItem.status === "PENDING"}>
                                                                    {userItem.status === "SUSPENDED"
                                                                        ? "Activate User"
                                                                        : "Suspend User"}
                                                                </Button>
                                                            )
                                                            : (<Spinner/>)}
                                                    </Table.Cell>

                                                </Table.Row>
                                            );
                                        })}
                                    </Table.Body>

                                </Table>
                            )}
                    </Tabs.Item>
                    <Tabs.Item title="Bids">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search by title, description, name, or email..."
                            className="border border-gray-300 rounded-md py-2 px-4 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"/> {isBidsListLoading && (
                            <div className="flex flex-row my-8 justify-center">
                                <Spinner/>
                            </div>
                        )}

                        {!isBidsListLoading && bidsList.length == 0
                            ? (<EmptyComponent type="Bids"/>)
                            : (
                                <Table>
                                    <Table.Head>
                                        <Table.HeadCell>Id</Table.HeadCell>
                                        <Table.HeadCell>Organization</Table.HeadCell>
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
                                        {filteredBidsList.map((bidsItem) => {
                                            //const org = getOrganizationName(bidsItem.user_id);
                                            
                                            return (
                                                <Table.Row
                                                    key={bidsItem
                                                    .id
                                                    .toString()}>
                                                    <Table.Cell>{bidsItem.id}</Table.Cell>
                                                    <Table.Cell>{getOrganizationName(bidsItem.user_id)}</Table.Cell>
                                                    <Table.Cell>{bidsItem.cpo_amount}</Table.Cell>
                                                    <Table.Cell>{bidsItem.title}</Table.Cell>
                                                    <Table.Cell>{bidsItem.description}</Table.Cell>
                                                    <Table.Cell>{bidsItem.fee}</Table.Cell>
                                                    <Table.Cell>{bidsItem.tag}</Table.Cell>
                                                    <Table.Cell>{bidsItem.total_fee.toFixed(2)}</Table.Cell>
                                                    <Table.Cell>{bidsItem.status}</Table.Cell>
                                                    <Table.Cell>
                                                        {!isActionPerforming
                                                            ? (
                                                                <Button
                                                                    color="failure"
                                                                    pill
                                                                    size="xs"
                                                                    onClick={() => handleRemoveClick(bidsItem.id)}>Remove</Button>
                                                            )
                                                            : (<Spinner/>)}
                                                    </Table.Cell>
                                                </Table.Row>
                                            )
                                        })}
                                    </Table.Body>
                                </Table>
                            )}
                        <br/>
                        <p>Total system revenue: {fees.toFixed(2)}
                            birr</p><br/>
                    </Tabs.Item>
                    <Tabs.Item title="Withdrawal Requests">
                        {isWithDrawalLoading && (
                            <div className="flex flex-row my-8 justify-center">
                                <Spinner/>
                            </div>
                        )}

                        {!isWithDrawalLoading && withDrawalList.length == 0
                            ? (<EmptyComponent type="Withdrawal Requests"/>)
                            : (
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
                                                <Table.Row
                                                    id={withDrawalItem
                                                    .id
                                                    .toString()}>
                                                    <Table.Cell>{withDrawalItem.id}</Table.Cell>
                                                    <Table.Cell>{withDrawalItem.fname + " " + withDrawalItem.lname}</Table.Cell>
                                                    <Table.Cell>{withDrawalItem.phonenumber}</Table.Cell>
                                                    <Table.Cell>{withDrawalItem.bank_account}</Table.Cell>
                                                    <Table.Cell>{withDrawalItem.bank}</Table.Cell>
                                                    <Table.Cell>{withDrawalItem.amount}</Table.Cell>
                                                    <Table.Cell>{withDrawalItem.status}</Table.Cell>
                                                    <Table.Cell>
                                                        {!isActionPerforming
                                                            ? (
                                                                <Button
                                                                    pill
                                                                    size="xs"
                                                                    onClick={() => handleApprovePaymentRequest(withDrawalItem.id)}>Approve</Button>
                                                            )
                                                            : (<Spinner/>)}
                                                    </Table.Cell>
                                                </Table.Row>
                                            )
                                        })}

                                    </Table.Body>
                                </Table>
                            )}
                    </Tabs.Item>
                    <Tabs.Item title="Create Admin User">
                        <div className="flex flex-row justify-center">
                            <div className="sm:w-3/5 lg:w-2/5 md:w-3/5">
                                <form className="flex flex-col gap-4">
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="fname" value="First Name"/>
                                        </div>
                                        <TextInput
                                            id="fname"
                                            type="text"
                                            placeholder="Please input your first name here "
                                            value={formik.values.fname}
                                            onChange={formik.handleChange}
                                            required={true}/>
                                    </div>

                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="lname" value="Last Name"/>
                                        </div>
                                        <TextInput
                                            id="lname"
                                            type="text"
                                            placeholder="Please input your Last Name here "
                                            value={formik.values.lname}
                                            onChange={formik.handleChange}
                                            required={true}/>
                                    </div>

                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="phonenumber" value="phonenumber"/>
                                        </div>
                                        <TextInput
                                            id="phonenumber"
                                            type="text"
                                            placeholder="Please input your phonenumber here "
                                            value={formik.values.phonenumber}
                                            onChange={formik.handleChange}
                                            required={true}/>
                                    </div>

                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="email" value="Email"/>
                                        </div>
                                        <TextInput
                                            id="email"
                                            type="email"
                                            placeholder="Please input your email here "
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            required={true}/>
                                    </div>

                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="password" value="Password"/>
                                        </div>
                                        <div className="flex flex-row">
                                            <TextInput
                                                id="password"
                                                type={isPasswordVisible
                                                ? "text"
                                                : "password"}
                                                placeholder="Please input password here"
                                                className="grow"
                                                required={true}
                                                value={formik.values.password}
                                                onChange={formik.handleChange}/>
                                            <div className="pl-1">
                                                <VisiblityButton
                                                    isVisible={isPasswordVisible}
                                                    onChecked={handlePasswordVisiblity}/>
                                            </div>
                                        </div>
                                        <PasswordStrengthBar password={formik.values.password}/>
                                    </div>

                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="cpassword" value="Password"/>
                                        </div>
                                        <div className="flex flex-row">
                                            <TextInput
                                                id="cpassword"
                                                type={isPasswordVisible
                                                ? "text"
                                                : "password"}
                                                placeholder="Confirm password here"
                                                className="grow"
                                                required={true}
                                                value={formik.values.cpassword}
                                                onChange={formik.handleChange}/>
                                        </div>
                                        <PasswordStrengthBar password={formik.values.password}/>
                                    </div>

                                    {isLoading
                                        ? (
                                            <div className="flex flex-row justify-center">
                                                <Spinner></Spinner>
                                            </div>
                                        )
                                        : (
                                            <Button onClick={formik.handleSubmit} disabled={!formik.isValid}>
                                                Submit
                                            </Button>
                                        )}
                                </form>
                            </div>
                        </div>
                    </Tabs.Item>

                </Tabs.Group>
            </div>
            {/* Toast Container */}
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={true}/>

        </div >
    );
}

export default AdminPage