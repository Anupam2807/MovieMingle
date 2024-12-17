import React from "react";

import "./style.scss";
import FooterWrapper from "../../Components/FooterWrapper/footerWrapper";

const PageNotFound = () => {
    return (
        <div className="pageNotFound">
            <FooterWrapper>
                <span className="bigText">404</span>
                <span className="smallText">Page not found!</span>
            </FooterWrapper>
        </div>
    );
};

export default PageNotFound;
