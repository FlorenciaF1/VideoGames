import React from "react";

export default function Card({image, name, genre}) {
    return (
        <div>
            <h3>{name}</h3>
            <h5>{genre}</h5>
            <img src={image} alt="img not found" width="300px" height="200px" />

        </div>
    );
}
