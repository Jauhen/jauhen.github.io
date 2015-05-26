import React from 'react';
import SliceStore from '../../stores/SliceStore';
import SliceLine from '../sliceline/SliceLine'


/**
 * Component to represend chart editor.
 */
export default class extends React.Component {

  /**
   * @param {{data: SliceStore}} props
   */
  constructor(props) {
    super(props);
    this._view = this._view.bind(this);
    this._add = this._add.bind(this);
    this.state = {
      items: this.props.data.getAll()
    };
    this.props.data.addChangeListener(this._updateList.bind(this));
  }

  /**
   * Generates React template.
   */
  render() {

    return (
        <div className="pc-slices-editor">
          <table>
            <tr><th>Name</th><th>Value</th></tr>
            {this.state.items.map(function(slice, index) {
              return (
                  <SliceLine key={index} slice={slice}
                      onupdate={this._update.bind(this, slice)}
                      ondelete={this._delete.bind(this, slice)}
                      />);
            }.bind(this))}
          </table>
          <div className="pc-slices-editor-add" onClick={this._add}>Add new slice</div>
          <div className="pc-slices-editor-view" onClick={this._view}>View</div>
        </div>
    );
  }

  /**
   * Triggers state update on any slices update.
   * @private
   */
  _updateList() {
    this.setState({items: this.props.data.getAll()});
  }

  /**
   * Switches to chart view.
   * @private
   */
  _view() {
    this.props.oncancel();
  }

  /**
   * Propagates changes to storage.
   * @param {Object} slice Slice object.
   * @param {{name: string, value: number}} newValue New slice values.
   * @private
   */
  _update(slice, newValue) {
    this.props.data.update(slice.id, newValue);
  }

  /**
   * Deletes slice.
   * @param {Object} slice Slice object.
   * @private
   */
  _delete(slice) {
    this.props.data.delete(slice);
  }

  /**
   * Adds a new slice.
   * @private
   */
  _add() {
    this.props.data.add();
  }
}
