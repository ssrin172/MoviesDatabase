// withRouter.js
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const withRouter = (WrappedComponent) => {
  return (props) => {
    const navigate = useNavigate();
    const params = useParams();

    return <WrappedComponent {...props} navigate={navigate} params={params} />;
  };
};

export default withRouter;
