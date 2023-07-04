import React, { useState, useEffect } from "react";
import { NotificationItemComponent } from "../components/NotificationItemComponent";
import axios from "axios";
import { BASE_URL } from '../util/Constants';

export default function NotificationPage() {
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(false);
  const [bids, setData] = useState([]);

  useEffect(() => {
    setIsLoading(false);
    const fetchData = async () => {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: BASE_URL + "/api/notifications",
        headers: {
          "x-auth-token": token,
        },
      };

      axios
        .request(config)
        .then((response) => {
          setIsLoading(false);

          setData(response.data.flat());
          console.log("in front end",response.data);

        })
        .catch((error) => {
          setIsLoading(false);
        });
    };

    fetchData();
  }, []);

  return (
    <div className="m-auto sm:my-4">
      {bids.length > 0 && (
        <div className="flex flex-col">
          {bids.map((bid) => {
            console.log("check bid 0", bid.id);
            return <NotificationItemComponent bid={bid} key={bid.id.toString()} />;
          })}
        </div>
      )}
    </div>
  );
}
