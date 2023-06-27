import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NotFoundErrorPage from "./NotFoundErrorPage";
import { Button, Spinner, Modal, Label } from "flowbite-react";
import { ApplicationItemComponent } from "../components/ApplicationItemComponent";
import { BsFillCheckCircleFill, BsFillXOctagonFill } from "react-icons/bs";
import axios from "axios";
import { BASE_URL } from "../util/Constants";

const BidDetailPage = () => {
  let { bidId } = useParams(1);

  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState({
    files: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [bidData, setBidData] = useState({});
  const userData = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const [displayModal, setdisplayModal] = useState(false);
  const [result, setResult] = useState(null);
  const [isApplying, setIsApplying] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [files, setFiles] = useState({});
  const [winner, setWinner] = useState("");

  const getWinner = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: BASE_URL + `/api/winner?bid_id=${bidId}`,
      headers: {
        "x-auth-token": token,
      },
    };

    axios
      .request(config)
      .then((response) => {
        setWinner(response.data.message);
        console.log(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  const handleFileInputChange = (e) => {
    setUploadedFile({
      ...uploadedFile,
      files: e.target.files[0]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsApplying(true);

    const data = new FormData();
    console.log(uploadedFile.files);
    data.append("files", uploadedFile.files);

    let headers = {
      "Content-Type": "multipart/form-data",
      "x-auth-token": token,
    };

    axios
      .post(BASE_URL + `/api/apply?bid_id=${parseInt(bidId)}`, data, {
        headers,
      })
      .then((response) => {
        console.log(response.data);
        setIsApplying(false);
        setResult(response.status);
        setUploadedFile({
          files: null,
        });
        // alert("Success");
        setdisplayModal(false);
        setShowDialog(true);
      })
      .catch((err) => {
        setIsApplying(false);
        console.log(err);
        setResult(err.response.status);
        setUploadedFile({
          files: null,
        });
        alert(
          err.response.data.message
        );
        setdisplayModal(false);
        // showDialog(true);
        navigate("/bids");
      });
  };

  if (bidId == null || !token) {
    return <NotFoundErrorPage />;
  }

  const handleOnClose = () => {
    setdisplayModal(false);
  };

  const onClose = () => {
    setResult({});
    setShowDialog(false);
  };

  useEffect(() => {
    const headers = {
      "x-auth-token": token,
    };
    setIsLoading(true);

    const fetchData = async () => {
      await axios
        .get(BASE_URL + `/api/bid/${bidId}`, { headers })
        .then((response) => {
          setIsLoading(false);
          setBidData(response.data[0]);
          setFiles(response.data[0].BidFiles[0]);
        })
        .catch((err) => {
          setIsLoading(false);
          alert(err.response.data.message);
          navigate("/bids");
        });
    };

    fetchData();
    console.log(bidData.Applications);
  }, []);

  const handleAcceptClick = (id) => {
    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: BASE_URL + `/api/accept/application?id=${id}&bid_id=${bidId}`,
      headers: {
        "x-auth-token": token,
      },
    };
    setIsLoading(true);

    axios
      .request(config)
      .then((response) => {
        setIsLoading(false);
        console.log(JSON.stringify(response.data));
        alert("Success!");
        navigate(`/bid/${bidId}`);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        alert("Error");
      });
  };

  return (
    <div>
      <Modal show={showDialog} size="md" popup={true} onClose={onClose}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            {result < 400 ? (
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
                  {result > 400 ? "Error" : "Success!"}
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
      <Modal
        show={displayModal}
        size="md"
        position="top-center"
        onClose={handleOnClose}
      >
        <Modal.Header>Apply to bid</Modal.Header>
        <Modal.Body>
          <div>
            <div className="mb-2 block my-2">
              <Label htmlFor="document" value="Document" />
            </div>
            <div className="rounded-lg bg-gray-50">
              <div>
                {uploadedFile.files == null ? (
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col w-full h-10 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                      <div>
                        <input
                          type="file"
                          name="files"
                          className="opacity-0"
                          onChange={handleFileInputChange}
                        />
                      </div>
                    </label>
                  </div>
                ) : (
                  <div className="flex flex-row justify-center text-gray-600">
                    <p>{uploadedFile.files.name}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {isApplying ? (
            <div>
              <Spinner />
            </div>
          ) : (
            <div className="flex flex-row gap-3">
              <Button size="sm" onClick={handleSubmit}>
                Submit
              </Button>
              <Button size="sm" color="gray" onClick={handleOnClose}>
                Cancel
              </Button>
            </div>
          )}
        </Modal.Footer>
      </Modal>

      {isLoading ? (
        <div className="mx-auto my-5 items-center">
          <Spinner />
        </div>
      ) : (
        <div className="lg:m-24 md:m-20 sm:m-14">
          <div>
            <p className="text-2xl font-bold tracking-tight text-gray-700  pb-3">
              {bidData.title === null ? "" : bidData.title}
            </p>

            <div className="flex flex-row text-gray-700 my-5">
              <p className="text-lg text-gray-700">
                {bidData.description == null ? "" : bidData.description}
              </p>
            </div>
            <div className="flex items-baseline">
              <span className="font-medium text-gray-700 mr-1">
                CPO Amount:{" "}
              </span>
              <span className="text-gray-500">
                {parseInt(bidData.cpo_amount).toLocaleString("en-US")}
              </span>
            </div>
            <div className="flex items-baseline">
              <span className="font-medium text-gray-700 mr-1">Fee: </span>
              <span className="text-gray-500">
                {parseInt(bidData.fee).toLocaleString("en-US")}
              </span>
            </div>
            <div className="flex items-baseline">
              <span className="font-medium text-gray-700 mr-1">Status: </span>
              <span className="text-gray-500">
                {bidData.status == null ? "" : bidData.status}
              </span>
            </div>
            <div className="flex flex-row text-gray-700 pt-3">
              <p className="text-lg text-gray-700">
                {bidData.created_at == null ? "" : bidData.created_at}
              </p>
            </div>
            <div className="flex flex-row text-gray-700 pt-3">
              <a
                className="text-lg text-gray-700"
                href={"http://localhost:3000/api" + files.file_url}
              >
                Document
              </a>
            </div>
            {bidData.status === "PENDING" ? (
              bidData.user_id == userData.id ? (
                <div className="my-3">
                  <p className="text-lg text-gray-700 font-bold">
                    Applications
                  </p>
                </div>
              ) : null
            ) : (
              <div className="my-3">
                <p className="text-lg text-gray-700 font-bold">
                  Bid has been closed
                </p>
                
                {winner ? (
                  <span className="font-medium text-gray-700 mr-1">
                    {winner}
                  </span>
                ) : (
                  <Button onClick={getWinner}>Read more</Button>
                )}
              </div>
            )}

            {/*
                Do the logic here. there is already one condition existing => checking if the user_id is the same as the logged in user
            */}

            {bidData.status === "PENDING" ? (
              bidData.user_id == userData.id ? (
                new Date(bidData.deadline).getTime() < new Date().getTime() ? (
                  <div className="flex flex-col overflow-auto">
                    {bidData.Applications.map((applicationItem) => {
                      return (
                        <ApplicationItemComponent
                          key={applicationItem.id}
                          application={applicationItem}
                          onAcceptClick={handleAcceptClick}
                        />
                      );
                    })}
                  </div>
                ) : null
              ) : (
                <div className="flex flex-row my-5">
                  <Button onClick={() => setdisplayModal(true)}>
                    Apply to Bid
                  </Button>
                </div>
              )
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default BidDetailPage;
