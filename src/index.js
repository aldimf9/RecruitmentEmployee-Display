import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Landing from './component/pages/landing';
import Register from './component/pages/register';
import Table from './component/pages/table-candidate-employee';
import dataArrayOfObject from './utils/staticData';
import Login from './component/pages/login';
import TableListJobVacancy from './component/pages/table-job-vacancy';
import TableListRoadmapVacancy from './component/pages/table-roadmap-vacancy';
import TableListApproval from './component/pages/table-approval';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <Table data={dataArrayOfObject} />
  // <Login></Login>
  // <Register></Register>
  // <Table/>
  // <TableListJobVacancy/>
  // <TableListRoadmapVacancy/>
  <TableListApproval/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
