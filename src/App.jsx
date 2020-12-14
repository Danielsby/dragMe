//@flow
import * as React from 'react';
import './app.scss';
import Draggable from "./Draggable";
import Box from "./Box/Box";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialPos: {
        x: 0,
        y: 0
      }
    }
  }

  render() {
    return (
      <div className="drag-comp">
        <main className="drag-compo__component">
          <Draggable initialPos={this.state.initialPos}>
            <button>Drag me around with the mouse</button>
          </Draggable>
        </main>
      </div>
    );
  }
}

export default App;
