import './App.css';
import { BrowserRouter, Route ,Routes} from 'react-router-dom';
import {Login,Register, Addproducts ,Updateproduct} from "./pages"
import { Header } from './Components';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          {/* <Header/> */}
           <Routes>
            <Route path="/" element={<Header/>} />
            <Route path="/Register" element={<Register/>}/>
           <Route path="/Login" element={<Login />} />
          <Route path="/Addproduct" element={<Addproducts />}  />
          <Route path="/Updateproduct" element={<Updateproduct />}  />
          </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
