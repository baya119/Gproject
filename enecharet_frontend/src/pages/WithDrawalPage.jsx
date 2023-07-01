import React, { useEffect, useState } from "react";
import {
  Label,
  TextInput,
  Button,
  Spinner,
  Modal,
  Select,
} from "flowbite-react";
import { BsFillCheckCircleFill, BsFillXOctagonFill } from "react-icons/bs";
import axios from "axios";
import { BASE_URL } from "../util/Constants";
import { DepositsItemComponent } from "../components/DepositsItemComponent";
import WithdrawalListComponent from "../components/WithdrawalListComponent";

const WithDrawalPage = () => {
  const token = localStorage.getItem("token");
  const [amount, setAmount] = useState(0);
  const [bankAccount, setBankAccount] = useState("");
  const [bank, setBank] = useState("CBE");
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [result, setResult] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    setIsLoading(false);
    const fetchData = async () => {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: BASE_URL + "/api/my_requests",
        headers: {
          "x-auth-token": token,
        },
      };

      axios
        .request(config)
        .then((response) => {
          setData(response.data);
          console.log(response);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(error);
        });
    };

    fetchData();
  }, []);

  const handleAmountInputChange = (e) => {
    setAmount(e.target.value);
  };

  const handleBankAccountChange = (e) => {
    setBankAccount(e.target.value);
  };

  const handleWithDrawClick = (e) => {
    console.log(amount);

    let header = {
      "x-auth-token": token,
    };

    setIsLoading(true);
    axios
      .post(
        BASE_URL + "/api/withdraw",
        { bank_account: bankAccount, amount: amount, bank: bank },
        { headers: header }
      )
      .then((response) => {
        setIsLoading(false);
        setResult(response);
        setShowDialog(true);
      })
      .catch((err) => {
        setIsLoading(false);
        setResult(err.response);
        setShowDialog(true);
      });
  };

  const onClose = (e) => {
    setShowDialog(false);
  };

  return (
    <div className="m-auto sm:my-4">
      <Modal show={showDialog} size="md" popup={true} onClose={onClose}>
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
                  Error!
                </h3>
              </div>
            )}
            <div className="flex justify-center gap-4">
              <Button color="gray" pill size="xs" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <div className="flex flex-row flex-wrap my-4 justify-center">
        <div className="text-gray-800 text-left whitespace-break-normal justify-center ">
          <p className="text-3xl">WithDrawals</p>
        </div>
      </div>
      <div className="flex flex-row justify-center lg:px-52 md:px-52 sm:px-0">
        <div className="w-4/5 my-5">
          <div className="my-3">
            <Label value="Amount" />
          </div>
          <TextInput
            type="number"
            placeholder="Enter an amount to withdraw"
            required={true}
            value={amount}
            onChange={handleAmountInputChange}
          />
        </div>
      </div>

      <div className="flex flex-row justify-center lg:px-52 md:px-52 sm:px-0">
        <div className="w-4/5 my-5">
          <div className="my-3">
            <Label value="Bank Account" />
          </div>
          <TextInput
            type="number"
            placeholder="Enter an your bank account"
            required={true}
            value={bankAccount}
            onChange={handleBankAccountChange}
          />
        </div>
      </div>
      <div className="flex flex-row justify-center lg:px-52 md:px-52 sm:px-0">
        <div className="w-4/5 my-5">
          <div className="mb-2 block">
            <Label htmlFor="bank" value="Select a bank" />
          </div>
          <Select
            id="bank"
            required={true}
            value={bank}
            onChange={(e) => setBank(e.target.value)}
          >
            <option value="Abay">Abay</option>
            <option value="Zemen">Zemen</option>
            <option value="Wegagen">Wegagen</option>
            <option value="Hibret">Hibret</option>
            <option value="Dashen">Dashen</option>
            <option value="COOP">COOP</option>
            <option value="Abyssinia">Abyssinia</option>
            <option value="Awash">Awash</option>
          </Select>
        </div>
      </div>

      <div className="flex flex-row justify-center">
        {isLoading ? (
          <Spinner />
        ) : (
          <Button onClick={handleWithDrawClick}>WithDraw</Button>
        )}
      </div>

      {data.length > 0 && (
        <div className="flex flex-col">
          {data.map((request) => {
            return (
              <WithdrawalListComponent
                key={request.id}
                request={request}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WithDrawalPage;
