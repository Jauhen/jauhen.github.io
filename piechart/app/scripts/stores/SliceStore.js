import {EventEmitter} from 'events';
import SliceApi from '../server/SliceApi';
import List from '../stores/List';


/** @const {string} Name of update event. */
var CHANGE_EVENT = 'change';

/**
 * Object to store slices and interact with Server Api.
 */
export default class extends EventEmitter {

  /**
   * @param {number} chartId Chart Id.
   */
  constructor(chartId) {
    super();
    this.chartId = chartId;
    this.slices = new List();

    SliceApi.getAll(this.chartId).then(function(result) {
      this.slices.setAll(result);
      this.emitChange();
    }.bind(this));

    this._updateOnServerDebounced =
        _.debounce(this._updateOnServer.bind(this), 500);
  }

  /**
   * Adds new slice.
   */
  add() {
    SliceApi.add(this.chartId).then(function(result) {
      this.slices.addItem(result);
      this.emitChange();
    }.bind(this));
  }

  /**
   * Deletes slice.
   * @param {Object} chart
   */
  delete(slice) {
    SliceApi.delete(this.chartId, slice).then(function(result) {
      this.slices.removeItemById(result.id);
      this.emitChange();
    }.bind(this)).catch(function() {
      this.slices.removeItemById(slice.id);
      this.emitChange();
    }.bind(this))
  }

  /**
   * Updates slice. Server update is debounced to prevent server flooding.
   * @param {number} id
   * @param {{name: string, value: number}} newData
   */
  update(id, newData) {

    this.slices.updateFields(id, newData);
    this.emitChange();

    this._updateOnServerDebounced(id, newData);
  }

  /**
   * Function to be called to update server.
   * @param {number} id
   * @param {{name: string, value: number}} newData
   * @private
   */
  _updateOnServer(id, newData) {
    SliceApi.update(this.chartId, id, newData).then(function(data) {
      this.slices.updateItem(data);
      this.emitChange();
    }.bind(this)).catch(function() {
      // Not updated on server.
    });
  }

  /**
   * Get the entire collection of slices.
   * @return {Array.<Object>}
   */
  getAll() {
    return this.slices.data;
  }

  /**
   * Fires callbacks on list update.
   */
  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  /**
   * @param {function} callback
   */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  /**
   * @param {function} callback
   */
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
}
