import React from 'react';
import SliceStore from '../../stores/SliceStore';
import SlicesEditor from '../sliceseditor/SlicesEditor';


/**
 * Component to represent single chart component. It includes header, chart and
 * edit chart form.
 */
export default class extends React.Component {
  /**
   * @param {{item: Object, ondelete: Function, onupdate: Function}} props
   */
  constructor(props) {
    super(props);
    this.slices = new SliceStore(props.item.id);
    this.state = {
      slices: this.slices.getAll(),
      inEditMode: false
    };

    // Newly created chart render in edit mode.
    if (props.item.title == 'title' && props.item.description == '') {
      this.state.inEditMode = true;
    }

    this.slices.addChangeListener(this._updateList.bind(this));
    this._toEditMode = this._toEditMode.bind(this);
    this._toChartMode = this._toChartMode.bind(this);

    this._onTitleChange = this._onTitleChange.bind(this);
    this._onDescriptionChange = this._onDescriptionChange.bind(this);
  }

  /**
   * Generates React template.
   */
  render() {
    var item = this.props.item;
    var parentClassName = 'pc-chart' +
        (this.state.inEditMode ? ' pc-chart-editmode' : '');

    return (
        <div className={parentClassName} key={item.id}>
          <div className="pc-chart-header">
            {item.title}
            <span className="pc-chart-header-description">({item.description})</span></div>
          <div className="pc-chart-header-edit">
            <input value={item.title} onChange={this._onTitleChange}/>
            <span className="pc-chart-header-description">
              (<input value={item.description} onChange={this._onDescriptionChange}/>)
            </span></div>
          <div className="pc-chart-container"/>
          <SlicesEditor data={this.slices} oncancel={this._toChartMode}/>
          <div className="pc-chart-edit" onClick={this._toEditMode}>Edit</div>
          <div className="pc-chart-delete" onClick={this.props.ondelete}>x</div>
        </div>
    );
  }

  /**
   * Renders Highchart component. Initially all charts are have empty list of
   * slices, so this function will be called on actual data receive.
   * @param {Object} prevProps This is ignored.
   * @param {Object} prevState Previous value of component state.
   */
  componentDidUpdate(prevProps, prevState) {
    // If there are no changes, piechart don't need to be updated.
    if (_.isEqual(prevState, this.state)) {
      return;
    }

    var content = React.findDOMNode(this).querySelector('.pc-chart-container');
    // This is copied from Highchart sample, so update for your needs.
    $(content).highcharts({
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false
      },
      title: {
        text: ''
      },
      credits: {
        enabled: false
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            style: {
              color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
            }
          }
        }
      },
      series: [{
        type: 'pie',
        name: 'Percentage',
        data: this.state.slices.map(function(slice) {
          return [slice.name, slice.value];
        })
      }]
    });
  }

  /**
   * Triggers state update on any slices update.
   * @private
   */
  _updateList() {
    this.setState({slices: this.slices.getAll()});
  }

  /**
   * Switches to Edit mode.
   * @private
   */
  _toEditMode() {
    this.setState({inEditMode: true});
  }

  /**
   * Switches to Chart mode.
   * @private
   */
  _toChartMode() {
    this.setState({inEditMode: false});
  }

  /**
   * Handles update of title field.
   * @param {Object} event React event object.
   * @private
   */
  _onTitleChange(event) {
    this.props.onupdate({
      title: event.target.value,
      description: this.props.item.description
    });
  }

  /**
   * Handles update of description field.
   * @param {Object} event React event object.
   * @private
   */
  _onDescriptionChange(event) {
    this.props.onupdate({
      title: this.props.item.title,
      description: event.target.value
    });
  }
}
