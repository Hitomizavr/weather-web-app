import React from "react";
import { Router, Route } from './components/Router';
// Компоненты на странице
import Header from "./components/header";
import Footer from "./components/footer";
// Страницы
import WeatherPage from "./components/page/WeatherPage"
import NotFoundPage from './components/page/NotFoundPage';
import About from "./components/page/about";
import Contact from "./components/page/contact";
import Toasts from './components/Toasts';



class App extends React.Component {
  render() {
    return (
      <React.Fragment>
      <Header />
      <div className="content container">
      <Router notfound={NotFoundPage}>
        <Route path="/" component={WeatherPage} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
      </Router>
      </div>
      <Footer />
      <Toasts />
      </React.Fragment>
    );
  }
}

export default App;
