import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Notfound = () => {
    const navigate = useNavigate();
    
    const handleGoHome = () =>{
        navigate("/");
    };
    return(
        <div>
            <h1>404 -Not found</h1>
            <p> The page you are looking for does not exist.</p>
        </div>
    );
};
export default Notfound;