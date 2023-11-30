import {Navigate, createBrowserRouter} from 'react-router-dom';
import DefaultLayout from './components/DefaultLayout.jsx';
import GuestLayout from './components/GuestLayout.jsx';
import Login from './views/Login.jsx';
import Dashboard from './views/Dashboard.jsx';
import {Signup} from './views/Signup.jsx';
import Surveys from './views/Surveys.jsx';
import SurveyView from './views/SurveyView.jsx';
import SurveyPublicView from './views/SurveyPublicView.jsx';
import AnswerView from './views/AnswerView.jsx';

const router = createBrowserRouter([
   {
    path : '/',
    element : <DefaultLayout/>,
    children:[{
      path: '/',
      element:<Navigate to={'/dashboard'} />
    },
   {
      path: '/dashboard',
      element:<Dashboard />
    },
   {
      path: '/surveys',
      element:<Surveys />
    },
   {
      path: '/surveys/create',
      element:<SurveyView/>
    },
   {
      path: '/surveys/:id',
      element:<SurveyView/>
    },
   {
      path: '/surveys/view/:id',
      element:<AnswerView/>
    },
  
  
   ]
   },
   {
    path : '/',
    element : <GuestLayout/>,
    children:[{
      path: '/login',
      element:<Login/>
    },
    {
      path: '/',
      element:<Navigate to={'/login'}/>
    },
    {
      path: '/signup',
      element:<Signup/>
    },
    
   ]
   },
   {
    path: '/survey/public/:slug',
    element:<SurveyPublicView/>
  },
]);


export default router;