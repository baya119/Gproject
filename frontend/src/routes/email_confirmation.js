import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import api from '../api';

const EmailConfirmation = () => {
  const { token } = useParams();
  const [confirmationStatus, setConfirmationStatus] = useState(null);

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const response = await api.post("account-confirm-email/", {
            key: token
        });
        setConfirmationStatus('success');
        window.location.href = '/login';
        
      } catch (error) {
        setConfirmationStatus('error');
      }
    };

    confirmEmail();
  }, [token]);

  return (
    <div>
      {confirmationStatus === 'success' ? (
        <h2>Email confirmed successfully!</h2>
      ) : confirmationStatus === 'error' ? (
        <h2>Oops! Something went wrong.</h2>
      ) : (
        <h2>Confirming email...</h2>
      )}
      {/* Add additional UI or redirection logic here */}
    </div>
  );
};

export default EmailConfirmation;