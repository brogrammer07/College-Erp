import React from "react";
import * as classes from "../../../utils/styles";
const Data = ({ label, value }) => {
  return (
    <div className={classes.adminForm3}>
      <h1 className={classes.adminLabel}>{label} :</h1>
      <h2 className="font-normal text-lg bg-gray-100 shadow-xl px-2 py-1 rounded-lg">
        {value}
      </h2>
    </div>
  );
};

export default Data;
