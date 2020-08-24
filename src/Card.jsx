import React,{Fragment} from "react";

const Card = ({ index, author, img = undefined, title, description }) => {

    return (
        <Fragment>
            <img className="card-header" src={img} alt={title} width="100%" height="175px" />
            <span className="card-summary">
                {description}
            </span>
            {author &&  <span className="card-meta">
                By {author}
            </span>}
        </Fragment>
    );
};

export default Card;



 