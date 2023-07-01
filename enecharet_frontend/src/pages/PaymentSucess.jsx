import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../util/Constants";

export default function PaymentSucess() {
  const navigate = useNavigate();

  useEffect(() => {
    function verifyPayment() {
        const token = localStorage.getItem("token");
        const payment_id = localStorage.getItem("payment_id");
        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: BASE_URL + `/api/verify/${payment_id}`,
            headers: {
              'x-auth-token': token
            }
        };

        axios.request(config)
        .then(response => {
            console.log(response);
            setTimeout(100);
            navigate("/profile")
        }).catch(err => {
            console.log(err);
        })
    }

    verifyPayment();
  }, []);

  return <div>Loading...</div>;
}
