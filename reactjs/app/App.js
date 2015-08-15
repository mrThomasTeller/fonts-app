var _ = require('lodash');
var React = require('react');

var App = React.createClass({
  getInitialState: function() {
    return _.clone(this.props.data);
  },
  
  render: function() {
    var fonts = this.state.fonts.filter(function(font) {
      return font.toLowerCase().indexOf(this.state.query.toLowerCase()) !== -1;
    }, this);
    
    return (
      <div>
        <Parameters query={this.state.query} str={this.state.str}
          onChangeQuery={function(value){ this.setState({query: value}); }.bind(this)}
          onChangeStr={function(value){ this.setState({str: value}); }.bind(this)}/>
        <br/>
        <Results fonts={fonts} str={this.state.str}/>
      </div>
    );
  }
});

var Parameters = React.createClass({
  createListener: function(listener) {
    if (listener) {
      return function(e) {
        listener(e.target.value);
      };
    }
    else {
      return _.noop;
    }
  },
  
  render: function() {
    return (
      <div className="row">
        <div className="col-xs-6">
          <input type="text" className="form-control" placeholder="Поиск"
            value={this.props.query} onChange={this.createListener(this.props.onChangeQuery)}/>
        </div>
        <div className="col-xs-6">
          <input type="text" className="form-control" placeholder="Пример"
            value={this.props.str} onChange={this.createListener(this.props.onChangeStr)}/>
        </div>
      </div>
    );
  }
});

var Results = React.createClass({
  render: function() {
    return (
      <table className="table">
        <tbody>
        {this.props.fonts.map(function(font) {
          return <Row key={font} str={this.props.str} font={font}/>
        }, this)}
        </tbody>
      </table>
    );
  }
});

var Row = React.createClass({
  render: function() {
    return (
      <tr>
        <td>{this.props.font}</td>
        <td style={{fontFamily: this.props.font}}>{this.props.str}</td>
      </tr>
    );
  }
});

module.exports = App;
