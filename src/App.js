import { createBrowserRouter ,RouterProvider} from 'react-router-dom';
import './App.css';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import NotFound from './Components/NotFound/NotFound';
import Dashboard from './Components/Dashboard/Dashboard';
import Create from './Components/Create/Create';
import OrderDetails from './Components/OrderDetails/OrderDetails';
import { OrderContextProvider } from './Components/OrderContext/OrderContext';


function App() {
  let routers=createBrowserRouter([
    {path:'',element:<Layout/>, children:[
      {index:true,element:<Home/>},
      // {path:'dashboard',element:<Dashboard/>},
      {path:'create',element:<Create/>},
      {path:'OrderDetails',element:<OrderDetails/>},
      {path:'editDetails',element:<editDetails/>},
      {path:'deleteOrder',element:<deleteOrder/>},
      {path:'*',element:<NotFound/>}
    ]
  }])
  return <>

  <RouterProvider router={routers}></RouterProvider>
 
  </>
}

export default App;
