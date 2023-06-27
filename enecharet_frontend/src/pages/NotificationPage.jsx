import React, { useState, useEffect } from "react";
import { NotificationItemComponent } from "../components/NotificationItemComponent";
import axios from "axios";
import { BASE_URL } from '../util/Constants';

export default function NotificationPage() {
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

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
          setData(response.data);
          console.log(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(error);
        });
    };

    fetchData();
  }, []);

  return (
    <div className="m-auto sm:my-4">
      {data.length > 0 && (
        <div className="flex flex-col">
          {data.map((notification) => {
            return <NotificationItemComponent message={notification.message} created_at={notification.created_at} />;
          })}
        </div>
      )}
    </div>
  );
}
