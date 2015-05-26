/**
 * Class to operate with list of object.
 */
export default class {

  constructor() {
    /**
     * @type {Array.<Object>}
     */
    this.data = [];
  }

  /**
   * @param {Array.<Object>} list
   */
  setAll(list) {
    this.data = list;
  }

  /**
   * @param {Object} item
   */
  addItem(item) {
    this.data.push(item);
  }

  /**
   * @param {number} id
   */
  removeItemById(id) {
    for (var i = 0; i < this.data.length; i++) {
      if (this.data[i].id == id) {
        this.data.splice(i, 1);
        return;
      }
    }
  }

  /**
   * Replaces item in a list with new item with same id.
   * @param {Object} item
   */
  updateItem(item) {
    for (var i = 0; i < this.data.length; i++) {
      if (this.data[i].id == item.id) {
        this.data[i] = item;
      }
    }
  }

  /**
   * Updates only passed info.
   * @param {number} id
   * @param {Object} newData
   */
  updateFields(id, newData) {
    for (var i = 0; i < this.data.length; i++) {
      if (this.data[i].id == id) {
        for (var key in newData) {
          this.data[i][key] = newData[key];
        }
      }
    }
  }
}
