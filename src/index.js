import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Register from './component/pages/register';
import TableListJobVacancy from './component/pages/job-vacancy/table';
import DetailJob from './component/pages/job-vacancy/detail';
import TableListApproval from './component/pages/approval/table';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <Table data={dataArrayOfObject} />
  // <Login></Login>
  // <Register/>
  // <Table/>
  // <TableListJobVacancy/>
  // <TableListRoadmapVacancy/>
  // <TableListApproval data={dataArrayOfObject}/>
  <TableListApproval/>
  // <RegisterRole/>
  // <TableRole/>
  // <DetailJob/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
