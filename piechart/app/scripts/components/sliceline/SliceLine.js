import React from 'react';
import SliceStore from '../../stores/SliceStore';


/**
 * Component to represent single slice editor.
 */
export default class extends React.Component {

  /**
   * @param {{slice: Object, onupdate: Function, ondelete: Function}} props
   */
  constructor(props) {
    super(props);

    this._onChangeName = this._onChangeName.bind(this);
    this._onChangeValue = this._onChangeValue.bind(this);
  }

  /**
   * Generates React template.
   */
  render() {
    var item = this.props.slice;

    return (
        <tr>
          <td><input value={item.name} onChange={this._onChangeName}/></td>
          <td><input type="number" value={item.value} onChange={this._onChangeValue}/></td>
          <td><div onClick={this.props.ondelete} className="pc-sliceline-delete">x</div></td>
        </tr>
    )
  }

  /**
   * Handles update of name field.
   * @param {Object} event React event object.
   * @private
   */
  _onChangeName(event) {
    this.props.onupdate({
      name: event.target.value,
      value: this.props.slice.value
    });
  }

  /**
   * Handles update of value field.
   * @param {Object} event React event object.
   * @private
   */
  _onChangeValue(event) {
    this.props.onupdate({
      name: this.props.slice.name,
      value: event.target.value - 0 // Convert into number
    });
  }
}
