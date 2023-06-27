import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { BASE_URL } from '../util/Constants';
import axios from "axios"

export const PaymentSuccess = () => {

    const navigate = useNavigate();
    
    useEffect(() => {
        const verifyPayment = () => {
            const payment_id =  localStorage.getItem("payment_id");
            const token = localStorage.getItem('token');

              let config = {
                method: 'put',
                maxBodyLength: Infinity,
                url: BASE_URL + `/api/verify/${payment_id}`,
                headers: {
                  'x-auth-token': token
                }
              };
        
              axios.request(config)
                .then((response) => {
                  console.log(response);
                  navigate("/profile/deposit")
                })
                .catch((error) => {
                  console.log(error);
                });
          }
        
          verifyPayment();
    }, [])
    
    return (
        <div>Loading...</div>
    )
}