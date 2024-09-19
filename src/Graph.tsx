import React, { Component } from 'react';
import { Table } from '@finos/perspective';
import { ServerRespond } from './DataStreamer';
import './Graph.css';

/**
 * Props declaration for <Graph />
 */
interface IProps {
  data: ServerRespond[],
}

/**
 * Perspective library adds load to HTMLElement prototype.
 * This interface acts as a wrapper for Typescript compiler.
 */
interface PerspectiveViewerElement extends HTMLElement {
  load: (table: Table) => void,
}

/**
 * React component that renders Perspective based on data
 * parsed from its parent through data property.
 */
class Graph extends Component<IProps, {}> {
  table: Table | undefined;

  render() {
    return React.createElement('perspective-viewer');
  }

  componentDidMount() {
    const elem = document.getElementsByTagName('perspective-viewer')[0] as PerspectiveViewerElement;

    const schema = {
      stock: 'string',
      top_ask_price: 'float',
      top_bid_price: 'float',
      timestamp: 'date',
    };

    if (window.perspective && window.perspective.worker()) {
      this.table = window.perspective.worker().table(schema);
    }

    if (this.table) {
      elem.load(this.table);

      // Add perspective viewer configurations
      elem.setAttribute('view', 'y_line');  // Set graph type as line graph
      elem.setAttribute('column-pivots', '["stock"]');  // Differentiate stocks
      elem.setAttribute('row-pivots', '["timestamp"]');  // X-axis as timestamp
      elem.setAttribute('columns', '["top_ask_price"]');  // Y-axis as top_ask_price
      elem.setAttribute('aggregates', JSON.stringify({
        top_ask_price: 'avg',
        top_bid_price: 'avg',
      }));  // Aggregate duplicate data by averaging
    }
  }

  componentDidUpdate() {
    if (this.table) {
      this.table.update(this.props.data.map((el: any) => {
        return {
          stock: el.stock,
          top_ask_price: el.top_ask && el.top_ask.price || 0,
          top_bid_price: el.top_bid && el.top_bid.price || 0,
          timestamp: el.timestamp,
        };
      }));
    }
  }
}

export default Graph;
