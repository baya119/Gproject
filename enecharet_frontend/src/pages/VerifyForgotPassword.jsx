import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NotFoundErrorPage from './NotFoundErrorPage';
import { Modal, Label, TextInput, Button, Spinner } from 'flowbite-react';
import { BsFillCheckCircleFill, BsFillXOctagonFill } from 'react-icons/bs';
import axios from 'axios';
import { BASE_URL } from '../util/Constants';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be at least 8 characters')
    .max(16, 'Password should not exceed 16 characters')
    .required('Password is required'),
  code: yup.string().required('Verification code is required'),
});

const VerifyForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState({});
  const [showDialog, setShowDialog] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      code: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      axios
        .post(BASE_URL + '/api/account/reset-password', {
          email: values.email,
          newPassword: values.password,
          code: values.code,
        })
        .then((response) => {
          setIsLoading(false);
          setResult(response);
          setShowDialog(true);
          localStorage.setItem('user', JSON.stringify(response.data));
        })
        .catch((err) => {
          setIsLoading(false);
          setResult(err.response);
          setShowDialog(true);
        });
    },
  });

  const onClose = () => {
    setShowDialog(false);
    if (result.status < 400) {
      navigate('/');
    }
  };

  return (
    <div className="my-10">
      <div className="flex-wrap my-6 justify-center">
        <div className="text-gray-800 text-center whitespace-break-normal justify-center ">
          <p className="text-2xl">Verify your Account</p>
        </div>

        <div className="text-gray-500 whitespace-break-normal  text-center justify-center ">
          <p className="text-lg">
            Please go to your email and enter your verification code here! The code expires in 30 mins!
          </p>
        </div>
      </div>

      <Modal
  show={showDialog}
  size="sm"
  popup={true}
  onClose={onClose}
  className="fixed top-0 right-0 mt-4 mr-4"
  style={{
    top: 0,
    right: 0,
  }}
  autoClose={2000}
>
  <Modal.Header />
  <Modal.Body>
    <div className="text-center">
      {result.status < 400 ? (
        <div>
          <BsFillCheckCircleFill className="mx-auto mb-4 h-14 w-14 text-gray-600" />
          <h3 className="mb-5 text-lg font-normal text-gray-600">Success!</h3>
          <p className="text-2xl">Your password has been reset.</p>
        </div>
      ) : (
        <div>
          <BsFillXOctagonFill className="mx-auto mb-4 h-14 w-14 text-gray-600" />
          <h3 className="mb-5 text-lg font-normal text-gray-600">Error!</h3>
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


      <div className="flex flex-row justify-center px-5 lg:px-56 md:px-30 sm:px-14 ">
        <form className="flex flex-col gap-4 sm:w-3/5 lg:w-2/5 md:w-3/5" onSubmit={formik.handleSubmit}>
          <div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Email" />
              </div>
              <TextInput
                id="email"
                type="email"
                placeholder="Please input your email here"
                required={true}
                {...formik.getFieldProps('email')}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500">{formik.errors.email}</div>
              )}
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="New Password" />
              </div>

              <div className="flex flex-row items-center my-2">
                <TextInput
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Please input password here"
                  required={true}
                  className="grow"
                  {...formik.getFieldProps('password')}
                />
                <div className="pl-1">
                  <button
                    className="border-0 bg-transparent cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500">{formik.errors.password}</div>
              )}
            </div>

            <div className="mb-2 block">
              <Label htmlFor="code" value="Code" />
            </div>
            <TextInput
              id="code"
              type="text"
              placeholder="Please input your code here"
              required={true}
              {...formik.getFieldProps('code')}
            />
            {formik.touched.code && formik.errors.code && (
              <div className="text-red-500">{formik.errors.code}</div>
            )}
          </div>

          {isLoading ? (
            <div className="flex flex-row justify-center">
              <Spinner />
            </div>
          ) : (
            <Button type="submit">Continue</Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default VerifyForgotPassword;
