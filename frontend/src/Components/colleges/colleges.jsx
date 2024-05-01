import React from "react";
// import "./../Item/Item.css";
import "./colleges.css";
import { Link } from "react-router-dom";

const Colleges = (props) => {
  return (
    <div className="colleges">
      <Link to={`/${props.id}`}>
        <img onClick={window.scrollTo(0, 0)} src={props.image} alt="" />
      </Link>
      <p>{props.name}</p>
    </div>
  );
};

export default Colleges;
