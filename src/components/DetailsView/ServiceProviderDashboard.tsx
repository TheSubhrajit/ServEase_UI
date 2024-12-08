import React from 'react';

// interface ChildComponentProps {
//     sendDataToParent: (data: string) => void;
//   }
  
const ServiceProviderDashboard = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Welcome to the Service Provider page!</h1>
      <p>You are successfully logged in.</p>
      <p>We are glad to have you on board. Feel free to explore your dashboard and manage your services!</p>
    </div>
  );
};

export default ServiceProviderDashboard;
