import React, { Component } from "react";
import DataStreamer, { ServerRespond } from "./DataStreamer";
import Graph from "./Graph";
import "./App.css";

/**
 * State declaration for <App />
 */
interface IState {
  data: ServerRespond[];
  showGraph: boolean; // Added showGraph to manage when to display the graph
}

/**
 * The parent element of the react app.
 * It renders title, button and Graph react element.
 */
class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      data: [],
      showGraph: false, // Initialize graph as hidden
    };
  }

  /**
   * Render Graph react component with state.data parsed as property data
   */
  renderGraph() {
    if (this.state.showGraph) {
      // Show the graph only if showGraph is true
      return <Graph data={this.state.data} />;
    }
    return null;
  }

  /**
   * Get new data from server and update the state with the new data continuously
   */
  getDataFromServer() {
    this.setState({ showGraph: true }); // Show the graph once data starts streaming

    // Fetch data every 100ms continuously
    const interval = setInterval(() => {
      DataStreamer.getData((serverResponds: ServerRespond[]) => {
        this.setState({
          data: [...this.state.data, ...serverResponds],
        });
      });
    }, 100);

    // Optionally, you can add a mechanism to stop the interval if needed
    // For example: clearInterval(interval);
  }

  /**
   * Render the App react component
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">Bank & Merge Co Task 2</header>
        <div className="App-content">
          <button
            className="btn btn-primary Stream-button"
            onClick={() => {
              this.getDataFromServer();
            }}
          >
            Start Streaming Data
          </button>
          <div className="Graph">{this.renderGraph()}</div>
        </div>
      </div>
    );
  }
}

export default App;
