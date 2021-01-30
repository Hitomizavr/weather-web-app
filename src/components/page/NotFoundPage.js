import React from 'react';
import { Go, Link } from '../Router';

export default class NotFoundPage extends React.Component {
  render() {
    return (
      <div className="pages404">
        <Go url="/404" />

        <h1>Whooops!</h1>
        <p>404 - Page not found</p>
        <p>To <Link to="/">main page</Link>.</p>
      </div>
    );
  }
}