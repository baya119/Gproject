import React, { useState, useEffect } from "react";

const ClosedPage = () => {
  const [bids, setBids] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(BASE_URL + `/api/bids?cpo_min=${cpo}&title=${query}&min=&${fee}`)
        .then((response) => {
          console.log(response.data);
          setBids(response.data);
        })
        .catch((err) => {
          alert(err);
        });
    };

    fetchData();
  }, [cpo, fee, query]);

  return (
    <div>
      <div className="lg:px-32 md:px-24 sm:px-16 my-10">
        {isLoading && <Spinner />}
        {isLoading == false && bids.length == 0 ? (
          <div className="flex flex-row my-10 justify-center">
            <p className="text-gray-700 text-lg font-bold">No bids found.</p>
          </div>
        ) : (
          <div className="lg:px-35 md:px-20">
            {bids.map((bidItem) => {
              return (
                <BidItemComponent bid={bidItem} key={bidItem.id.toString()} />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClosedPage;
