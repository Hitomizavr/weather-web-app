import React from "react";

export default class About extends React.PureComponent {
  render() {
    return (
      <>
        <div className="about-container">
            <h1 className="about-container__title">О нас</h1>
            <h2 className="about-container__subtitle">Погодный сервис Weather Company</h2>
            <p className="about-container__text">Учебный, тестовый проект-сайт, предоставляющий погодные данные любого города.</p>
            <span>Сервис был разработан Hitomizavr 22 января 2020 г.</span>
        </div>
      </>
    );
  }
}