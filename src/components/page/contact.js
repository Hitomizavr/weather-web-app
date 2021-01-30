import React from "react";

export default class Contact extends React.PureComponent {
  render() {
    return (
      <>
        <div className="formus">
            <h1>Text contact</h1>
            <form className="contact-us">
              <p>Your name</p>
            <input className="contact-name" type="text" name="name" placeholder="Enter your name" />
            <p>Your message</p>
            <textarea className="contact-message" type="text" name="message" placeholder="Enter your message" />
            <p>Categories</p>
            <input className="contact-choose" type="text" name="categories" placeholder="Choose your categories" />
            </form>
            <button className="next-conts">Enter</button>

        </div>
      </>
    );
  }
}