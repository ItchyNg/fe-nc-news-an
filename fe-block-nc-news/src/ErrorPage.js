import React from "react";

const ErrorPage = ({ err }) => {
  console.log(err);
  if (err) {
    return (
      <h1>
        {err.response.status} {err.response.statusText}
      </h1>
    );
  }

  return <h1>404 NOT FOUND</h1>;
};

export default ErrorPage;
