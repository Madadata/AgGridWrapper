import React from 'react';
import AgGridWrapper from './src/AgGridWrapper.jsx';
import { columnDefs, rowData } from './src/testdata';

const App = () => (
  <div>
    <AgGridWrapper
      title="Athletes"
      columnDefs={columnDefs}
      data={rowData}
    />
  </div>
);

export default App;
