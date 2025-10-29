import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TableListJobVacancy from './component/pages/job-vacancy/table';
import OfferingApproval from './component/pages/approval/offeringApproval';
import TableListRoadmapVacancy from './component/pages/roadmap-vacancy/table';
import Layout from './component/pages/layout/layout';


const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();
root.render(
  // <Table data={dataArrayOfObject} />
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path='/job' element={<TableListJobVacancy/>}/>
          <Route path='/offering' element={<OfferingApproval/>}/>
          <Route path='/roadmap' element={<TableListRoadmapVacancy/>}/>
        </Route>
      </Routes>
    </QueryClientProvider>
  </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
