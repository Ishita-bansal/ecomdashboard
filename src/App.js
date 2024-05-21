import './App.css';
import { BrowserRouter, Navigate, Route ,Routes} from 'react-router-dom';
import {Login,Register, Addproducts ,Updateproduct,List,SearchComponent} from "./pages"

function App() {
    
   const loggedUser = localStorage.getItem("user-info");
   console.log("loggedUser",loggedUser);


    const PublicRouter = ({element}) =>{
        //  return !loggedUser.token  ? element :  Navigate("/List")
    }

    const PrivateRouter = ({element}) =>{
      return loggedUser.token  ? element :  Navigate("/Login")
    }

  return (
    <div className="App">
      <BrowserRouter>
          {/* <Header/> */}
           <Routes>
            <Route path="/" element = {<PrivateRouter element={<List/>} />}  />
            <Route path="/List" element = {<PrivateRouter element={<List/>} />}  />
            <Route path="/Register" element = {<PublicRouter element={<Register/>}/>} />
           <Route path="/Login" element={<PublicRouter  element={<Login />}/>}  />
          <Route path="/Addproduct"  element={<PrivateRouter element={<Addproducts/>} />}  />
          <Route path="/Updateproduct/:id" element={<PrivateRouter element={<Updateproduct/>} />}    />
          <Route path="/searchComponent" element={<PrivateRouter element={<SearchComponent/>} />}  />
          </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
