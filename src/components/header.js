import React from "react";
import { Link } from "./Router";

export default class Header extends React.PureComponent {
  render() {
    return (
      <header className="header-menu">
        <Link className="logo" to="/">Company</Link>
        <div className="header-right">
        <Link active={true} to="/">Home</Link>
        <Link active={true} to="/contact">Contact</Link>
        <Link active={true} to="/about">About</Link>
        </div>
      </header>
    );
  }
}