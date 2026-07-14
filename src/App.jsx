import { useState } from 'react'
import './App.css'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import AdminLayout from './layouts/AdminLayout'
import TeacherLayout from './layouts/TeacherLayout'
import OperatorLayout from './layouts/OperatorLayout'
import AdminHome from './pages/Home/AdminHome'
import TeacherHome from './pages/Home/TeacherHome'
import OperatorHome from './pages/Home/OperatorHome'
import Logout from './layouts/Logout'
import AdminShop from './pages/Shop/AdminShop'
import AdminTeacher from './pages/Teacher/AdminTeacher'
import AdminGroup from './pages/Group/AdminGroup'
import AdminGroupDetail from './pages/GroupDetail/AdminGroupDetail'
import AdminWorker from './pages/Worker/AdminWorker'
import OperatorShop from './pages/Shop/OperatorShop'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/logout"/>
    },
    {
      path: "logout",
      element: <Logout/>
    },
    {
      path: "admin",
      element: <AdminLayout/>,
      children: [
        {
          index: true,
          element: <Navigate to={"home"}/>
        },
        {
          path: "home",
          element: <AdminHome/>
        },
        {
          path: "shop",
          element: <AdminShop/>
        },
        {
          path: "teacher",
          element: <AdminTeacher/>
        },
        {
          path: "group",
          element: <AdminGroup/>
        },
        {
          path: "groupDetail/:firebaseKey",
          element: <AdminGroupDetail/>
        },
        {
          path: "worker",
          element: <AdminWorker/>
        }
      ]
    },
    {
      path: "teacher",
      element: <TeacherLayout/>,
      children: [
        {
          index: true,
          element: <Navigate to={"home"}/>
        },
        {
          path: "home",
          element: <TeacherHome/>
        }
      ]
    },
    {
      path: "operator",
      element: <OperatorLayout/>,
      children: [
        {
          index: true,
          element: <Navigate to={"home"}/>
        },
        {
          path: "home",
          element: <OperatorHome/>
        },
        {
          path: "shop",
          element: <OperatorShop/>
        }
      ]
    }
  ])

  return (<>
   <RouterProvider router={router}/>
  </>)
}

export default App
