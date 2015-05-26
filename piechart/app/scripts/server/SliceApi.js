import SERVER from '../server/server';


/**
 * Component to interact with server slices api.
 */
export default class {

  /**
   * Gets List of slices.
   * @param {number} chartId Id of the chart.
   * @return {Promise} Promise to be resolved in list of slices.
   */
  static getAll(chartId) {
    return new Promise(function(resolve, reject) {
      $.get(`${SERVER}/pie_charts/${chartId}/slices`)
          .done(function(result) {
            resolve(result);
          }).error(function(error) {
            reject(error);
          });
    });
  }

  /**
   * Adds a new slice.
   * @param {number} chartId Id of the chart.
   * @return {Promise} Promise to be resolved in a new slice object.
   */
  static add(chartId) {
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: `${SERVER}/pie_charts/${chartId}/slices`,
        method: 'POST',
        data: {name: 'slice', value: 1}
      }).done(function(result) {
        resolve(result);
      }).error(function(error) {
        reject(error);
      });
    });
  }

  /**
   * Deletes the slice.
   * @param {number} chartId Id of the chart.
   * @param {Object} slice Slice object to delete.
   * @return {Promise} Promise to be resolved in the deleted slice object.
   */
  static delete(chartId, slice) {
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: `${SERVER}/pie_charts/${chartId}/slices/${slice.id}`,
        method: 'DELETE'
      }).done(function(result) {
        resolve(result);
      }).error(function(error) {
        console.log(`curl -n -X DELETE ${SERVER}/pie_charts` +
            `/${chartId}/slices/${slice.id}`);
        reject(error);
      });
    });
  }

  /**
   * Updates slice info.
   * @param {number} chartId Id of the chart.
   * @param {number} id Slice id.
   * @param {{name: string, value: number}} newData Data to be set.
   * @return {Promise} Promise to be resolved in the updated slice object.
   */
  static update(chartId, sliceId, newData) {
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: `${SERVER}/pie_charts/${chartId}/slices/${sliceId}`,
        method: 'PATCH',
        data: newData
      }).done(function(result) {
        resolve(result);
      }).error(function(error) {
        console.log(`curl -n -X PATCH ${SERVER}/pie_charts/${chartId}/` +
            `slices/${sliceId} -H "Content-Type: application/json" ` +
            `-d '${JSON.stringify(newData)}'`);
        reject(error);
      });
    });
  }
}