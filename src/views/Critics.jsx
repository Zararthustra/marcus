import React from "react";
import Critic from "../components/Critic";

const Critics = ({ critics }) => {
    if (!critics) return null;

    return critics.map((critic, index) => {
        return (
        <Critic
            key={index}
            movieId={critic.movie_id}
            movieName={critic.movie_name}
            content={critic.content}
            userId={critic.user_id}
            userName={critic.user_name}
        />
        );
    });
};

export default Critics;
