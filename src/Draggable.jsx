//@flow
import * as React from 'react';

type Props = {
  children?: any,
  initialPos?: any,
};

type State = {
  pos: number,
  dragging: boolean,
  rel: any,
}

class Draggable extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      pos: this.props.initialPos,
      dragging: false,
      rel: null,
    }
    this.itemRef = React.createRef();

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.state.dragging && !prevState.dragging) {
      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.onMouseUp);
    } else if (!this.state.dragging && prevState.dragging) {
      document.removeEventListener('mousemove', this.onMouseMove);
      document.removeEventListener('mouseup', this.onMouseUp);
    }
  }

  onMouseDown(ev) {
    if (ev.button !== 0) {
      return 0;
    }

    const pos = this.itemRef.current;
    console.log("pos: ", pos);
    this.setState({
      dragging: true,
      rel: {
        x: ev.pageX - pos.offsetLeft,
        y: ev.pageY - pos.offsetHeight
      }
    })
    ev.stopPropagation();
    ev.preventDefault();
  }

  onMouseUp(ev) {
    this.setState({dragging: false});
    ev.stopPropagation();
    ev.preventDefault();
  }

  onMouseMove(ev) {
    if (!this.state.dragging) {
      return null;
    }
    this.setState({
      pos: {
        x: ev.pageX - this.state.rel.x,
        y: ev.pageY - this.state.rel.y
      }
    });
    ev.stopPropagation();
    ev.preventDefault();
  }

  render() {
    const childrenWithProps = React.Children.map(this.props.children, child => {
      console.log("React.isValidElement(child): ", React.isValidElement(child));
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          onMouseDown: this.onMouseDown,
          style: {
            left: `${this.state.pos.x}px`,
            top: `${this.state.pos.y}px`,
            position: 'absolute',
          }
        })
      }
    })

    return (
      <div
        className="draggable"
        onMouseUp={this.onMouseUp}
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        ref={this.itemRef}
      >
        {childrenWithProps}
      </div>
    )
  }
}

export default Draggable;