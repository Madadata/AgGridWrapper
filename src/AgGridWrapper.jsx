import React, { Component, PropTypes } from 'react';
import { AgGridReact } from 'ag-grid-react';
import styles from './AgGridWrapper.css';
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/theme-blue.css';

import classNames from 'classnames';

import MDButton from 'mdbutton';

class AgGridWrapper extends Component {

  constructor() {
    super();
    this.onGridReady = this.onGridReady.bind(this);
    this.onSelectionChanged = this.onSelectionChanged.bind(this);
    this.onRowAdded = this.onRowAdded.bind(this);
    this.onRowDeleted = this.onRowDeleted.bind(this);
  }

  componentWillMount() {
    const { data, columnDefs } = this.props;
    this.setState({
      columnDefs,
      rowData: data,
    });
  }

  componentDidMount() {
    this.api.sizeColumnsToFit();
  }

  componentWillUnmount() {
    this.api.destroy();
  }

  onGridReady(params) {
    this.api = params.api;
    this.columnApi = params.columnApi;
  }

  onSelectionChanged() {
    this.selectedRow = this.api.getSelectedRows()[0];
  }

  onRowAdded() {
    const { rowData } = this.state;
    const rowToAdd = rowData.indexOf(this.selectedRow);
    rowData.splice(rowToAdd, 0, this.selectedRow);
    this.setState({ rowData });
    this.refreshView();
  }

  onRowDeleted() {
    const { rowData } = this.state;
    const rowToDelete = rowData.indexOf(this.selectedRow);
    rowData.splice(rowToDelete, 1);
    this.setState({ rowData });
    this.refreshView();
  }

  refreshView() {
    this.api.setRowData(this.state.rowData);
  }

  render() {
    const { rowData, columnDefs } = this.state;
    const { title, width, height } = this.props;
    const configurableStyles = { width, height };
    return(
      <div
        className={classNames('ag-blue', styles.container)}
        style={configurableStyles}
      >
        <div className={styles.content}>
          <div className={styles.title}>{title}</div>
          <div className={styles.buttons}>
            <MDButton onClick={this.onRowAdded}>Add</MDButton>
            <MDButton onClick={this.onRowDeleted}>Delete</MDButton>
          </div>
          <AgGridReact
            onGridReady={this.onGridReady}
            onSelectionChanged={this.onSelectionChanged}
            columnDefs={columnDefs}
            rowData={rowData}
            rowSelection="single"
            rowHeight="22"

            enableColResize
            enableSorting
            enableFilter
          />
        </div>
      </div>
    );
  }

}

AgGridWrapper.propTypes = {
  title: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object),
  columnDefs: PropTypes.arrayOf(PropTypes.object),
  width: PropTypes.number,
  height: PropTypes.number,
};

export default AgGridWrapper;
