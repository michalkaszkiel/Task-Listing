import React from "react";
import Cookies from "js-cookie";
import { useCookie } from "../context/CookieContext.jsx";

export const CookiesAlert = () => {
    const { acceptCookie, declineCookie } = useCookie();
    const handleAccept = () => {
        acceptCookie();
        hideCookiesAlert();
    };

    const handleDecline = () => {
        declineCookie();
        hideCookiesAlert();
    };

    const hideCookiesAlert = () => {
        // Hide the cookies alert
        const cookiesAlert = document.querySelector(".cookies-alert");
        if (cookiesAlert) {
            cookiesAlert.style.display = "none";
        }
    };

    return (
        <div className="cookies-alert">
            <strong>
                This website uses cookies to ensure you get the best experience
                on our website.
            </strong>
            <div className="cookies-btn">
                <button className="btn" onClick={handleAccept}>
                    Accept
                </button>
                <button className="btn" onClick={handleDecline}>
                    Decline
                </button>
            </div>
        </div>
    );
};

export default CookiesAlert;
