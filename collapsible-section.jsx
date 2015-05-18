/**
 * Component with title and body, and clicking on the title should toggle
 * display of the body.
 */
var CollapsibleSection = React.createClass({
  getInitialState: function() {
    return {
      collapsed: false,
      startHeight: ''
    };
  },

  toggle: function() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  },

  render: function() {
    var contentStyle = {};
    // Setup height of component.
    if (this.state.collapsed) {
      contentStyle = {height: '0'};
    } else if (this.state.startHeight) {
      contentStyle = {height: this.state.startHeight};
    }

    return (
      <div className="collapsible-section">
        <div className="collapsible-section-title" onClick={this.toggle}>
          {this.props.title}
        </div>
        <div className="collapsible-section-content" style={contentStyle}>
          <div className="collapsible-section-content-inner">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  },

  /**
   * Remember initial height of component to allow CSS animation.
   */
  componentDidMount: function() {
    var content =
        React.findDOMNode(this).querySelector('.collapsible-section-content');
    content.style.height = content.clientHeight + 'px';
    this.setState({
      startHeight:  content.clientHeight + 'px'
    });
  }
});