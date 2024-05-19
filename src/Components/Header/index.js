import React from "react";
import {Nav, NavDropdown} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Header = () =>{
  const navigate = useNavigate();
 const user = JSON.parse(localStorage.getItem("user-info"))
  // console.log("user--->",user);
   
  const logout = () =>{
       localStorage.clear();
       navigate("/Login");

  }
  return(
        <>
          <Nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="#">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarTogglerDemo02" style={{display:"flex",gap:"1000px"}}>
    <ul class="navbar-nav mr-auto mt-2 mt-lg-0 p-4  nav_bar_wrapper">

      {
        localStorage.getItem("user-info") ?
        <>
       <li class="nav-itemp active">
       <Link to="/Addproduct">Add Products</Link>
      </li>
      <li class="nav-item ">
      <Link to="/Updateproduct">Update Products</Link>
      </li> 
        </>  :
        <>
           <li class="nav-item">
     <Link to="/Register">Register</Link>
      </li>
      <li class="nav-item">
      <Link to="/Login">Login</Link>
      </li>
    </>
      }
    {/*    <li class="nav-item">
     <Link to="/Register">Register</Link>
      </li>
       <li class="nav-item">
       <Link to="/Login">Login</Link>
      </li>
        <li class="nav-itemp active">
        <Link to="/Addproduct">Add Products</Link>
       </li>
       <li class="nav-item ">
     <Link to="/Updateproduct">Update Products</Link>
    < li>  */}
      
     
    </ul>
{
  localStorage.getItem("user-info") ?

  <NavDropdown title={ user?.name} style={{color:"white"}}>
  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
  <NavDropdown.Item >Profile</NavDropdown.Item>
</NavDropdown> : null
}
   
  </div>
</Nav>

        </>
    )
}

export default Header;