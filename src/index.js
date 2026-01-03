import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PagesJobVacancy from './component/pages/job-vacancy/table';
import OfferingApproval from './component/pages/approval/offeringApproval';
import TableListRoadmapVacancy from './component/pages/roadmap-vacancy/table';
import NewLayout from './component/pages/layout/layout';
import Login from './component/pages/login';
import Register from './component/pages/register';
import DetailJob from './component/pages/job-vacancy/detail'
import PrivateRoute from './utils/privateRoute';
import NotFoundPage from './component/errorPages/notFound'
import ListApplicationCandidate from './component/pages/candidate-application/list';
import Profile from './component/pages/candidate-employee/profile';
import UpdateProfile from './component/pages/candidate-employee/update';
import SetAccount from './component/pages/candidate-employee/account';
import Home from './component/pages/home';
import PageSchedule from './component/pages/schedule/page-schedule';
import TableListCandidateEmployee from './component/pages/candidate-employee'
import HrApproval from './component/pages/approval/hrApproval';
import PageDetailCandidate from './component/pages/job-vacancy/detail-interview';
import ListUser from './component/pages/user/table';
import ModalEditRoleUser from './component/organisms/form-edit-role-user';
import ModalFormCreateJob from './component/organisms/form-create-job';
import ModalFormEditJob from './component/organisms/form-edit-job';
import ModalFormEditProfile from './component/organisms/form-edit-profile';

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();
root.render(
  // <Table data={dataArrayOfObject} />
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path='/signin' element={<Login />} />
        <Route path='/signup' element={<Register />} />
        <Route path='*' element={<NotFoundPage />} />
        <Route path='/' element={<PrivateRoute element={<NewLayout />} />}>
          <Route path='/home' element={<PrivateRoute element={<Home />} />}></Route>
          <Route path='/profile' element={<PrivateRoute element={<Profile />} />}></Route>
          <Route path='/profile/update' element={<PrivateRoute element={<UpdateProfile />} />}></Route>
          <Route path='/account' element={<PrivateRoute element={<SetAccount />} />}></Route>
          <Route path='/application' element={<PrivateRoute element={<ListApplicationCandidate />} />} />
          <Route path='/offering' element={<PrivateRoute element={<OfferingApproval />} />} />
          <Route path='/schedule' element={<PrivateRoute element={<PageSchedule />} />} />
          <Route path='/approval/hr' element={<PrivateRoute element={<HrApproval />} />} />
          <Route path='/job' element={<PrivateRoute element={<PagesJobVacancy />} />}></Route>
          <Route path='/candidate' element={<PrivateRoute element={<TableListCandidateEmployee />} />}></Route>
          <Route path='/roadmap' element={<PrivateRoute element={<TableListRoadmapVacancy />} />} />
          <Route path='/detail-job/:id' element={<PrivateRoute element={<DetailJob />} />} />
          <Route element={<PrivateRoute element={<ModalFormEditProfile />} />} ></Route>
          <Route element={<PrivateRoute element={<ModalFormCreateJob />} />}></Route>
          <Route element={<PrivateRoute element={<ModalFormEditJob />} />}></Route>
          <Route path='/candidate-detail' element={<PrivateRoute element={<PageDetailCandidate />} />}></Route>
          <Route path='/user' element={<PrivateRoute element={<ListUser />} />}></Route>
          <Route element={<PrivateRoute element={<ModalEditRoleUser />} />}></Route>
        </Route>
      </Routes>
    </QueryClientProvider>
  </BrowserRouter>
  // <Provider store={store}>
  //   <Counter />
  // </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
