import React from "react";

const Form = props => (
  <form className="form-we-css" onSubmit={props.weatherMethod}>
    <input className="inp-city" type="text" name="city" placeholder="Enter your city" />
    <button className="btn-next pulse">Continue</button>
  </form>
);

export default Form;
