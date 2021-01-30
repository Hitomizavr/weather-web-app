import React from 'react';

export class Route extends React.PureComponent { }

export class Router extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      path: window.location.pathname
    };

    this.handlePop = this.handlePop.bind(this);
  }

  componentDidMount() {
    window.addEventListener('popstate', this.handlePop);
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.handlePop);
  }

  handlePop() {
    this.setState({path: window.location.pathname});

    // Сбрасываем скролл страницы и скроллируем к самому верху
    // window.scrollTo иногда не страбатывает в Edge и FF
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    window.scrollTo(0, 0);
  }

  matchUrl(pattern, url) {
    /* Делим паттерн и ссылку на сегменты */
    const patternArray = pattern.split('/');
    const urlArray = url.split('/');

    /* Cравниваем количество сегментов */
    if (patternArray.length === urlArray.length) {
      const vars = {}; // Объект, возвращяемый в случае наличия в url переменных

      /* Перебираем все сегменты паттерна */
      for (let i = 0; i < patternArray.length; i++) {
        /* Если сегмент - переменная с регуляркой */
        if (patternArray[i].substring(0, 1) === ':') {
          const start = patternArray[i].indexOf('(');
          const end = patternArray[i].lastIndexOf(')');

          /* Выцепляем регулярку */
          const reg = patternArray[i].substring(start+1, end);

          /* Проверяем соответствие */
          if (RegExp(reg).test(urlArray[i]) === false) {
            return false;
          } else {
            /* Пишем переменную и значение в возвращаемый объект */
            const name = patternArray[i].substring(1, start);
            
            if (name.length > 0) {
              vars[name] = urlArray[i];
            }
          }
        } else {
          /* Если сегмент - не переменная с регуляркой, то просто сравниваем */
          if (patternArray[i] !== urlArray[i]) {
            return false;
          }
        }
      }

      /* Если в ссылке были переменные, то возвращаем объект с ними, если нет, то просто true */
      if (Object.keys(vars).length === 0) {
          return true;
      } else {
          return vars;
      }
    } else {
      return false;
    }
  }

  findRoute() {
    const {
      children,
      notfound
    } = this.props;

    for (let i = 0; i < children.length; i++) {
      if (children[i].type === Route) {
        const match = this.matchUrl(children[i].props.path, this.state.path);

        if (match) {
          if (typeof match === 'object') {
            return React.cloneElement(React.createElement(children[i].props.component), { router: match });
          } else {
            return React.createElement(children[i].props.component);
          }
        }
      }
    }

    if (typeof notfound !== 'undefined') {
      return React.createElement(notfound);
    } else {
      return null;
    }
  }

  render() {
    return this.findRoute();
  }
}


export class Link extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      active: false
    };

    if (this.props.active) {
      this.handlePop = this.handlePop.bind(this);
    }
  }

  componentDidMount() {
    if (this.props.active) {
      window.addEventListener('popstate', this.handlePop);
      this.handlePop();
    }
  }

  componentWillUnmount() {
    if (this.props.active) {
      window.removeEventListener('popstate', this.handlePop);
    }
  }

  handlePop() {
    if (window.location.pathname === this.props.to) {
      this.setState({active: true});
    } else {
      this.setState({active: false});
    }
  }

  handleClick(event) {
    if (event.button !== 1 ) { // Если не средняя кнопка (0 - левая, 1 - средняя)
      event.preventDefault();

      if (window.location.pathname !== this.props.to) {
        window.history.pushState({}, null, this.props.to);
              
        const evt = document.createEvent("Event");
        evt.initEvent('popstate', false, false);
        window.dispatchEvent(evt);
      }
    }
  }

  setClass() {
    const classes = [];

    if (this.props.className) {
      classes.push(this.props.className);
    }

    if (this.state.active) {
      classes.push('active');
    }

    return classes.join(' ') || null;
  }

  render() {
    const {
      to,
      children
    } = this.props;

    return (
      <a href={to} onClick={this.handleClick.bind(this)} className={this.setClass()}>{children}</a>
    )
  }
}

// Меняем url без перехода
export class Go extends React.PureComponent {
  constructor(props) {
    super(props);

    var url = props.url || '/';
    this.setUrl(url);
  }

  componentWillReceiveProps(nextProps) {
      var url = nextProps.url || '/';
      this.setUrl(url);
  }

  setUrl(url) {
    if (url !== window.location.pathname) {
      // replaceState - не учитывая переходы кнопкой назад
      window.history.replaceState({}, null, url);

      if (this.props.onComplete) {
        this.props.onComplete();
      }
    }
  }

  render() {
    return null;
  }
}
