import SERVER from '../server/server';


/**
 * Component to interact with server chart api.
 */
export default class {

  /**
   * Gets List of charts.
   * @return {Promise} Promise to be resolved in list of charts.
   */
  static getAll() {
    return new Promise(function(resolve, reject) {
      $.get(`${SERVER}/pie_charts`)
          .done(function(result) {
            resolve(result);
          }).error(function(error) {
            reject(error);
          });
    });
  }

  /**
   * Adds a new chart.
   * @return {Promise} Promise to be resolved in a new chart object.
   */
  static add() {
    return new Promise(function(resolve, reject) {
      $.post(`${SERVER}/pie_charts`, {title: 'title', description: ''})
          .done(function(result) {
            resolve(result);
          }).error(function(error) {
            reject(error);
          });
    });
  }

  /**
   * Deletes the chart.
   * @param {Object} chart Chart object to delete.
   * @return {Promise} Promise to be resolved in the deleted chart object.
   */
  static delete(chart) {
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: `${SERVER}/pie_charts/${chart.id}`,
        method: 'DELETE'
      }).done(function(result) {
        resolve(result);
      }).error(function(error) {
        console.log(`curl -n -X DELETE ${SERVER}/pie_charts/${chart.id}`);
        reject(error);
      });
    });
  }

  /**
   * Updates chart info.
   * @param {number} id Chart id.
   * @param {{title: string, description: string}} newData Data to be set.
   * @return {Promise} Promise to be resolved in the updated chart object.
   */
  static update(id, newData) {
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: `${SERVER}/pie_charts/${id}`,
        method: 'PATCH',
        data: newData
      }).done(function(result) {
        resolve(result);
      }).error(function(error) {
        console.log(`curl -n -X PATCH ${SERVER}/pie_charts/${id} ` +
            '-H "Content-Type: application/json" ' +
            `-d '${JSON.stringify(newData)}'`);
        reject(error);
      });
    });
  }
}