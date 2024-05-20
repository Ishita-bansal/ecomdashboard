import React,{useEffect} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorHandle from "../../Components/Errorhandle";
import {useNavigate} from "react-router-dom";
import { Header } from "../../Components";


const initilValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required("Required*"),
  password: Yup.string().max(7, "Invalid Format").required("Required*"),
});
const Login = () =>{
  const navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem("user-info")){
      navigate("./Addproduct");
    }
 },[]);


  useEffect(()=>{
      
  },[])

const onSubmit = async (values) => {
  console.log(values);
  console.log(touched);
const userData = {
  username: 'kminchelle',
  password: '0lelplR',
}
 let result = await fetch("https://dummyjson.com/auth/login",{
  method:"POST",
  headers:{
    "content-type":"application/json",
    "Accept":"application/json"
  },
  body: JSON.stringify(userData)
 })
 result = await result.json();
 console.log("result===>",result);
  localStorage.setItem("user-info",JSON.stringify(result));
  navigate("/Addproduct");
};

const formik = useFormik({
  initialValues: initilValues,
  onSubmit: onSubmit,
  validationSchema: validationSchema,
});
const { values, handleSubmit, setTouched, setFieldValue, touched, errors } =
  formik;
    return(
        <>
        <Header/>
        <div className="col-sm-4 offset-sm-4 p-4" style={{height:"70vh"}}>
      <h1>User Sign-In</h1>
      <form onSubmit={handleSubmit}>
      <div>
        <div style={{paddingTop:"30px"}}>
          <input
            placeholder="Your Email"
            name="email"
            value={values.email}
            onChange={(e) => setFieldValue("email", e.target.value)}
            onBlur={() => {
              setTouched({ ...touched, email: "true" });
            }}
            type="text"
            className="form-control"
          />
          <ErrorHandle touched={touched} errors={errors} fieldname="email" />
        </div>
        <div>
          <input
            placeholder="Your Password"
            name="password"
            value={values.password}
            onChange={(e) => {
              setFieldValue("password", e.target.value);
            }}
            onBlur={() => {
              setTouched({ ...touched, password: "true" });
            }}
            type="text"
            className="form-control"
          />
          <ErrorHandle touched={touched} errors={errors} fieldname="password" />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign In
        </button>
        </div>
      </form>
    </div>
        </>
    )
}

export default Login;