import React from 'react';
import { Navigate } from "react-router-dom";

const GuardedRoute = (props: any) => {
    let { children, isLoggedIn } = props;
    return isLoggedIn ? children : <Navigate to="/login" />;
}

export default GuardedRoute;
