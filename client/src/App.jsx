import HomePage from './routes/homepage/HomePage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ListPage from './routes/listpage/ListPage'
import  {Layout, RequireAuth } from './routes/layout/Layout'
import SinglePage from './routes/singlepage/SinglePage'
import ProfilePage from './routes/profile/ProfilePage'
import Register from './routes/register/Register'
import Login from './routes/login/Login'
import ProfileUpdatePage from './routes/profileupdatepage/ProfileUpdatePage'
import NewPostPage from './routes/newpostpage/NewPostPage'
import { listPageLoader, profilePageLoader, singlePageLoader } from './lib/loaders'


function App (){

  const router = createBrowserRouter([
    {
      path :'/',
      element:<Layout />,
      children : [
        {
          path:'/',
          element : <HomePage />
        },{
          path :'/list',
          element : <ListPage />,
          loader : listPageLoader
        },{
          path :'/:id',
          element : <SinglePage />,
          loader : singlePageLoader,
        },{
          path :'/register',
          element : <Register />
        },{
          path :'/login',
          element : <Login />
        }
      ]
    },
    {
      path:'/',
      element: <RequireAuth />,
      children:[
        {
          path :'/profile',
          element : <ProfilePage />,
          loader : profilePageLoader,
        },{
          path :'/profile/update',
          element : <ProfileUpdatePage/>
        },{
          path :'/add',
          element : <NewPostPage/>
        },
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
