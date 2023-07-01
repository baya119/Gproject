import React, { useEffect, useState } from 'react';
import { TextInput, Button, Spinner } from 'flowbite-react';
import { DepositsItemComponent } from '../components/DepositsItemComponent';
import { BASE_URL } from '../util/Constants';
import axios from 'axios';

const DepositPage = () => {
  const userData = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setIsLoading(false);
    const fetchData = async () => {

      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: BASE_URL + '/api/payments',
        headers: {
          'x-auth-token': token
        }
      };

      axios.request(config)
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

/*   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(BASE_URL + '/payments');
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
 */

  const handleAmountInput = (e) => {
    setAmount(e.target.value);
  };
  const handleDepositClick = (e) => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    console.log(amount);
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: BASE_URL + `/api/deposit?amount=${amount}`,
      headers: {
        'x-auth-token': token
      }
    };
    setIsLoading(true);
    axios.request(config)
      .then(response => {
        setIsLoading(false);
        console.log(response.data)
        localStorage.setItem("payment_id", response.data.id);
        window.location.replace(response.data.url);
      }).catch(err => {
        setIsLoading(false);
        alert(err.response.data.message)
      });
  };

  return (
    <div className="m-auto sm:my-4">
      <div className="flex flex-row flex-wrap my-4 justify-center">
        <div className="text-gray-800 text-left whitespace-break-normal justify-center ">
          <p className="text-3xl">Deposit</p>
        </div>
      </div>
      <div className="flex flex-row justify-center lg:px-52 md:px-52 sm:px-0">
        <div className="w-4/5 my-5">
          <TextInput
            type="text"
            placeholder="Enter an amount to diposit"
            required={true}
            onChange={handleAmountInput}
          />
        </div>
      </div>

      <div className="flex flex-row justify-center">
        {isLoading ? (
          <Spinner />
        ) : (
          <Button onClick={handleDepositClick}>
            Deposit
          </Button>
        )}
      </div>

      {data.length > 0 && (
        <div className="flex flex-col">
          {data.map((paymentItem) => {
            return (<DepositsItemComponent key={paymentItem.id} payment={paymentItem} />);
          })}
        </div>
      )}
    </div>
  )
}

export default DepositPage
