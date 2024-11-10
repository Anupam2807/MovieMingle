import React from "react";

import UseFetch from "../../../hooks/UseFetch";
import Carousel from '../../../Components/Carousel/Carousel'

const Similar = ({ mediaType, id }) => {
    const { data, loading, error } = UseFetch(`/${mediaType}/${id}/similar`);

    const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";

    return (
        <Carousel
            title={title}
            data={data?.results}
            loading={loading}
            endpoint={mediaType}
        />
    );
};

export default Similar;




