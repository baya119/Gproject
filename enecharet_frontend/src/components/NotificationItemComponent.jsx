import React from "react";
import { Card } from "flowbite-react";

export const NotificationItemComponent = (props) => {
  return (
    <div className="my-4">
      <Card className="rounded-2xl hover:shadow-xl">
        <div className="flex flex-row">
          <div className="flex flex-col px-5">
            <h3>Acceptance notification</h3>
            <br />

            <div className="flex items-baseline">
              <p>{props.message}</p>
            </div>
            <div className="flex flex-row text-gray-700 pt-3">
              <p className="text-lg text-gray-700">
                Date: {props.created_at.substring(0, 10)}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
