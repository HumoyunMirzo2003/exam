import React from 'react';
import Header from '../Components/Header';

const NotFound = () => {
  return (
    <section className="container">
        <Header />
        <h1 className="x-large text-primary">
          <i className="fas fa-exclamation-triangle" /> Page Not Found
        </h1>
        <p className="large">Sorry, this page does not exist</p>
    </section>
  );
};

export default NotFound;