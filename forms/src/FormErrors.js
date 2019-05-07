import React from "react";

export const FormErrors = ({ formsError }) => (
  <div>
    {Object.keys(formsError).map((fieldname, i) => {
      if (formsError[fieldname].length > 0) {
        return <div key={i}> {formsError[fieldname]}</div>;
      } else {
        return "";
      }
    })}
  </div>
);
