import React from "react";
import Masterpiece from "../components/Masterpiece";

const Masterpieces = ({ masterpieces }) => {
    if (!masterpieces) return null;
    return masterpieces.map((masterpiece, index) => {
        return (
        <Masterpiece
            key={index}
            movieName={masterpiece.movieName}
            movieId={masterpiece.movieId}
            releasedDate={masterpiece.releasedDate}
            director={masterpiece.director}
            description={masterpiece.description}
            userName={masterpiece.userName}
            userId={masterpiece.userId}
            poster={masterpiece.poster}
        />
        );
    });
};

export default Masterpieces;
