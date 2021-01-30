import React from 'react';
import ToastsStore from '../flux/stores/ToastsStore';

class Toast extends React.PureComponent {
constructor(props) {
    super(props);

    this.state = {
      class: '',
      height: 0,
      opacity: 0
    };
  }

  componentDidMount() {
      this.create = setTimeout(()=>{
        this.setState({height: 500}, ()=>{
          this.create = setTimeout(()=>{
            this.setState({opacity: 1})
            this.componentWillReceiveProps(this.props)
          }, 150)
        })
      }, this.props.count > 1 ? 100 : 0)
  }

  componentWillUnmount() {
    clearTimeout(this.create);
    clearTimeout(this.delete);
    clearTimeout(this.autodel);
  }

  componentWillReceiveProps(props){
    clearTimeout(this.autodel);

    if (props.count > 4 && props.position === 0) {
      // Удаление излишков
      this.autoclose();
    } else if (props.pause === false && props.position === 0) {
      // Автоудаление последнего элемента
      this.autodel = setTimeout(()=>{
        this.autoclose();
      }, props.count > 1 ? 2000 : 5000)
    }

  }

  autoclose() {
      this.setState({class: ' fadeOutUp'}, ()=>{
        this.autodel = setTimeout(()=>{
          this.props.onClose();
        }, 300)
      })
  }

  close() {
    clearTimeout(this.autodel);

      this.setState({opacity: 0}, ()=>{
        this.delete = setTimeout(()=>{
          this.setState({height: 0}, ()=>{
            this.delete = setTimeout(()=>{
              this.componentWillReceiveProps(this.props);

              // Наверно!
              this.delete = setTimeout(()=>{
                this.props.onClose();
              },200)

            },100)
          })
        },100)
      })
  }

  render() {
    return (
      <div className={"toast-container" + this.state.class} style={{maxHeight: this.state.height + 'px'}}>
        <div className={"toast toast-" + this.props.type} style={{opacity: this.state.opacity}} onClick={this.close.bind(this)}>
            <span>{this.props.message}</span>
        </div>
      </div>
    );
  }
}

export default class Toasts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pause: false,
      items: []
    };

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    ToastsStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    ToastsStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({pause: false, items: ToastsStore.getToasts()});
  }

  // Клик по кнопке закрытия
  delete(item) {
    var newItems = this.state.items;
    
    if (newItems.indexOf(item) > -1) {
      newItems.splice(newItems.indexOf(item), 1);
      this.setState({items: newItems});
    }
  }

  pauseOn() {
    this.setState({pause: true});
  }

  pauseOff() {
    this.setState({pause: false});
  }

  render() {
    if (this.state.items.length > 0) {
      return (
        <div className="toasts no-select col-lg-3 col-md-4 col-sm-6 col-xs-12" onMouseEnter={this.pauseOn.bind(this)} onMouseLeave={this.pauseOff.bind(this)}>
          { this.state.items.map((item, i)=>{
              return (
                <Toast key={item.id} position={i} count={this.state.items.length} pause={this.state.pause} onClose={this.delete.bind(this, item)} type={item.type} message={item.message} />
              );
            })
          }
        </div>
      );
    } else {
      return null;
    }
  }
}
