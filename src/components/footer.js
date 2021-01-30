import React from "react";

export default class Footer extends React.PureComponent {
  render() {
    return (
      <footer>
        <div className="footContainer">
          <div className="footSections">
            <section className="footSection">
              <h5 className="footer-heading">Main</h5>
              <ul className="footerList">
                <li className="footerList_item"><a href="#">Home</a></li>
                <li className="footerList_item"><a href="#">Contact</a></li>
                <li className="footerList_item"><a href="#">About</a></li>
              </ul>
            </section>
            <section className="footSection">
            <h5 className="footer-heading">Lorem</h5>
              <ul className="footerList">
                <li><a className="footerList_item" href="#">Sed</a></li>
                <li><a className="footerList_item" href="#">Architecto</a></li>
                <li><a className="footerList_item" href="#">Aliquam</a></li>
              </ul>
            </section>
            <section className="footSection">
            <h5 className="footer-heading">Social</h5>
              <ul className="footerList">
                <li><a className="footerList_item" href="#">VK</a></li>
                <li><a className="footerList_item" href="#">Instagram</a></li>
                <li><a className="footerList_item" href="#">Github</a></li>
              </ul>
            </section>
          </div>
        </div>
      </footer>
    );
  }
}