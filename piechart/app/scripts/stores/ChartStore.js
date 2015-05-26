import {EventEmitter} from 'events';
import ChartApi from '../server/ChartApi';
import List from '../stores/List';


/** @const {string} Name of update event. */
var CHANGE_EVENT = 'change';

/**
 * Object to store charts and interact with Server Api.
 */
class ChartStore extends EventEmitter {

  constructor() {
    super();
    this.charts = new List();
    ChartApi.getAll().then(function(result) {
      this.charts.setAll(result);
      this.emitChange();
    }.bind(this));

    this._updateOnServerDebounced =
        _.debounce(this._updateOnServer.bind(this), 500);
  }

  /**
   * Adds new chart.
   */
  add() {
    ChartApi.add().then(function(result) {
      this.charts.addItem(result);
      this.emitChange();
    }.bind(this));
  }

  /**
   * Deletes chart.
   * @param {Object} chart
   */
  delete(chart) {
    ChartApi.delete(chart).then(function(data) {
      this.charts.removeItemById(data.id);
      this.emitChange();
    }.bind(this)).catch(function() {
      this.charts.removeItemById(chart.id);
      this.emitChange();
    }.bind(this));
  }

  /**
   * Updates chart. Server update is debounced to prevent server flooding.
   * @param {number} id
   * @param {{title: string, description: string}} newData
   */
  update(id, newData) {
    this.charts.updateFields(id, newData);
    this.emitChange();

    this._updateOnServerDebounced(id, newData);
  }

  /**
   * Function to be called to update server.
   * @param {number} id
   * @param {{title: string, description: string}} newData
   * @private
   */
  _updateOnServer(id, newData) {
    ChartApi.update(id, newData).then(function(data) {
      this.charts.updateItem(data);
      this.emitChange();
    }.bind(this)).catch(function() {
      // Not updated on server.
    });
  }

  /**
   * Get the entire collection of charts.
   * @return {Array.<Object>}
   */
  getAll() {
    return this.charts.data;
  }

  /**
   * Fires callbacks on list update.
   */
  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  /**
   * @param {Function} callback
   */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  /**
   * @param {Function} callback
   */
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
}

/**
 * Singleton.
 * @type {ChartStore}
 */
const chartStore = new ChartStore();

export default chartStore;
