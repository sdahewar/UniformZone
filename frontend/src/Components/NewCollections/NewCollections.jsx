import React from "react";
import "./NewCollections.css";
import new_collection from "../Assets/new_collections";
// import Item from "../Item/Item";
import Colleges from "../colleges/colleges";

const NewCollections = () => {
  return (
    <div className="new-collections">
      <h1>SHOP BY SCHOOL</h1>
      <hr />
      <div className="collections">
        {new_collection.map((item, i) => {
          return (
            <Colleges
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NewCollections;
