import React from 'react';
import ChartStore from '../../stores/ChartStore';
import Chart from '../chart/Chart';


/**
 * Main component of application, contains list of charts.
 */
export default class extends React.Component {
  /**
   * @param {Object} props Properties passed from parent component.
   */
  constructor(props) {
    super(props);
    ChartStore.addChangeListener(this._updateList.bind(this));
    this.state = {items: ChartStore.getAll()};
  }

  /**
   * Generates React template.
   */
  render() {
    var items = this.state.items;
    return (
      <div className="pc-dashboard">
        {items.map(function(item) {
          return (<Chart key={item.id} item={item}
                         ondelete={this._delete.bind(this, item)}
                         onupdate={this._update.bind(this, item.id)}
              />);
        }.bind(this))}
        <div onClick={this._add.bind(this)} className="pc-dashboard-add">Add a new chart.</div>
      </div>
    );
  }

  /**
   * Triggers state update on any charts update.
   * @private
   */
  _updateList() {
    this.setState({items: ChartStore.getAll()});
  }

  /**
   * Adds new chart.
   * @private
   */
  _add() {
    ChartStore.add();
  }

  /**
   * Removes chart from a list.
   * @param {Object} item Chart object to delete.
   * @private
   */
  _delete(item) {
    ChartStore.delete(item);
  }

  /**
   * Updates chart's title or description.
   * @param {number} id Id of the chart to be updated.
   * @param {{title: string, description: string}} newValue Values to be set.
   * @private
   */
  _update(id, newValue) {
    ChartStore.update(id, newValue);
  }
}
