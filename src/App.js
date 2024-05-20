import './App.css';
import { BrowserRouter, Route ,Routes} from 'react-router-dom';
import {Login,Register, Addproducts ,Updateproduct,List} from "./pages"
import { Header } from './Components';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          {/* <Header/> */}
           <Routes>
            <Route path="/" element={<List/>} />
            <Route path="/List" element={<List/>}/>
            <Route path="/Register" element={<Register/>}/>
           <Route path="/Login" element={<Login />} />
          <Route path="/Addproduct" element={<Addproducts />}  />
          <Route path="/Updateproduct/:id" element={<Updateproduct />}  />
          </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
