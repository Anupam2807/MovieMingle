import React from "react";
import { useSelector } from "react-redux";

import "./style.scss";
import avatar from "../../../assets/avatar.png";

import Img from "../../../Components/LazyLoadImage/Img";
import FooterWrapper from "../../../Components/FooterWrapper/footerWrapper";
const Cast = ({ data, loading }) => {
    const { url } = useSelector((state) => state.home);

    const skeleton = () => {
        return (
            <div className="skItem">
                <div className="circle skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };
    return (
        <div className="castSection">
            <FooterWrapper>
                <div className="sectionHeading">Top Cast</div>
                {!loading ? (
                    <div className="listItems">
                        {
                        data?.map((item)=>{
                            let imgUrl = item.profile_path ?url.profile + item.profile_path:avatar;
                            return(
                                
                                <div key={item.id} className="listItem">
                                    <div className="profileImg">
                                        <Img src={imgUrl} />
                                    </div>
                                    <div className="name">{item.name}</div>
                                    <div className="character">{item.character}</div>

                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="castSkeleton">
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}        
                    </div>
                )}
            </FooterWrapper>
        </div>
    );
};

export default Cast;
