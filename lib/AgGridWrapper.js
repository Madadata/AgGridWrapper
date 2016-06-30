'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _agGridReact = require('ag-grid-react');

var _AgGridWrapper = require('./AgGridWrapper.css');

var _AgGridWrapper2 = _interopRequireDefault(_AgGridWrapper);

require('ag-grid/dist/styles/ag-grid.css');

require('ag-grid/dist/styles/theme-blue.css');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _mdbutton = require('mdbutton');

var _mdbutton2 = _interopRequireDefault(_mdbutton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AgGridWrapper = function (_Component) {
  _inherits(AgGridWrapper, _Component);

  function AgGridWrapper() {
    _classCallCheck(this, AgGridWrapper);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AgGridWrapper).call(this));

    _this.onGridReady = _this.onGridReady.bind(_this);
    _this.onSelectionChanged = _this.onSelectionChanged.bind(_this);
    _this.onRowAdded = _this.onRowAdded.bind(_this);
    _this.onRowDeleted = _this.onRowDeleted.bind(_this);
    return _this;
  }

  _createClass(AgGridWrapper, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props;
      var data = _props.data;
      var columnDefs = _props.columnDefs;

      this.setState({
        columnDefs: columnDefs,
        rowData: data
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.api.sizeColumnsToFit();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.api.destroy();
    }
  }, {
    key: 'onGridReady',
    value: function onGridReady(params) {
      this.api = params.api;
      this.columnApi = params.columnApi;
    }
  }, {
    key: 'onSelectionChanged',
    value: function onSelectionChanged() {
      this.selectedRow = this.api.getSelectedRows()[0];
    }
  }, {
    key: 'onRowAdded',
    value: function onRowAdded() {
      var rowData = this.state.rowData;

      var rowToAdd = rowData.indexOf(this.selectedRow);
      rowData.splice(rowToAdd, 0, this.selectedRow);
      this.setState({ rowData: rowData });
      this.refreshView();
    }
  }, {
    key: 'onRowDeleted',
    value: function onRowDeleted() {
      var rowData = this.state.rowData;

      var rowToDelete = rowData.indexOf(this.selectedRow);
      rowData.splice(rowToDelete, 1);
      this.setState({ rowData: rowData });
      this.refreshView();
    }
  }, {
    key: 'refreshView',
    value: function refreshView() {
      this.api.setRowData(this.state.rowData);
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state;
      var rowData = _state.rowData;
      var columnDefs = _state.columnDefs;
      var _props2 = this.props;
      var title = _props2.title;
      var width = _props2.width;
      var height = _props2.height;

      var configurableStyles = { width: width, height: height };
      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)('ag-blue', _AgGridWrapper2.default.container),
          style: configurableStyles
        },
        _react2.default.createElement(
          'div',
          { className: _AgGridWrapper2.default.content },
          _react2.default.createElement(
            'div',
            { className: _AgGridWrapper2.default.title },
            title
          ),
          _react2.default.createElement(
            'div',
            { className: _AgGridWrapper2.default.buttons },
            _react2.default.createElement(
              _mdbutton2.default,
              { onClick: this.onRowAdded },
              'Add'
            ),
            _react2.default.createElement(
              _mdbutton2.default,
              { onClick: this.onRowDeleted },
              'Delete'
            )
          ),
          _react2.default.createElement(_agGridReact.AgGridReact, {
            onGridReady: this.onGridReady,
            onSelectionChanged: this.onSelectionChanged,
            columnDefs: columnDefs,
            rowData: rowData,
            rowSelection: 'single',
            rowHeight: '22',

            enableColResize: true,
            enableSorting: true,
            enableFilter: true
          })
        )
      );
    }
  }]);

  return AgGridWrapper;
}(_react.Component);

AgGridWrapper.propTypes = {
  title: _react.PropTypes.string,
  data: _react.PropTypes.arrayOf(_react.PropTypes.object),
  columnDefs: _react.PropTypes.arrayOf(_react.PropTypes.object),
  width: _react.PropTypes.number,
  height: _react.PropTypes.number
};

exports.default = AgGridWrapper;