import React,{useEffect,useState} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorHandle from "../../Components/Errorhandle";
import {useNavigate} from "react-router-dom";
import { Header } from "../../Components";



const initilValues = {
  title: "",
  description: "",
  price: "",
  discountpercentage:"",
  rating:"",
  stock:"",
  brand:"",
  category:"",
  thumbnail:"",
  images:"",
};

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Required*"),
  description: Yup.string().max(20,"Atleast 20 characters").required("Required*"),
  price: Yup.number().required("Required*"),
  discountpercentage: Yup.number().required("Required*"),
  rating: Yup.number().required("Required*"),
  stock: Yup.number().required("Required*"),
  brand:Yup.string().required("Required*"),
  category: Yup.string().notOneOf([""], "You must select an option!"),
  thumbnail: Yup.mixed()
    .test("fileType", "Only jpg, jpeg, or png files are allowed", (value) => {
      if (!value) return true; 
      const supportedFormats = ["image/jpeg", "image/jpg", "image/png"];
      return supportedFormats.includes(value.type);
    })
    .required("File is required"),
  images:Yup.mixed().test("fileType", "Only jpg, jpeg, or png files are allowed", (value) => {
    if (!value) return true; 
    const supportedFormats = ["image/jpeg","image/jpg", "image/png"];
    return supportedFormats.includes(value.type);
  }).required("File is required"),
});
const Addproducts = () =>{
  const navigate = useNavigate();
  const [categorydata , setcategorydata] = useState([]);
  const [imagefile, setimagefile] = useState(null);
  const [preValue,setPreValue]=useState('');

  const handleimagefile = (e) => {
    setimagefile(e.target.files[0]);
  };

  useEffect(()=>{
      getres();
  },[])

  useEffect(()=>{
    setPreValue(categorydata?.[0]?.category)
  },[categorydata])

  const getres = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();
      console.log(data?.products);
      const uniqueCategories = [...new Set(data.products.map(product => product.category))];
      console.log("uniquecategories",uniqueCategories);
      setcategorydata(uniqueCategories);
      
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
   
  const onSubmit =(values) => {
    console.log(values);
  //   console.log(touched);
 
  //  let result = await fetch("",{
  //   method:"GET",
  //   headers:{
  //     "content-type":"application/json",
  //     "Accept":"application/json"
  //   },
  //   body: JSON.stringify(values)
  //  })
  //  result = await result.json();
  //  console.log("result===>",result);
    // localStorage.setItem("user-info",JSON.stringify(result));
    // localStorage.setItem("user-info",JSON.stringify(values));
    
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
      <h1>Add product</h1>
      <form onSubmit={handleSubmit}>
      <div>
        <div style={{paddingTop:"40px"}}>
          <input
            placeholder="Product Title"
            name="title"
            value={values.title}
            onChange={(e) => {
              setFieldValue("title", e.target.value);
            }}
            onBlur={() => {
              setTouched({ ...touched, title: "true" });
            }}
            type="text"
            className="form-control"
          />
          <ErrorHandle touched={touched} errors={errors} fieldname="title" />
        </div>
        <div>
          <input
            placeholder="description"
            name="description"
            value={values.description}
            onChange={(e) => setFieldValue("description", e.target.value)}
            onBlur={() => {
              setTouched({ ...touched, description: "true" });
            }}
            type="text"
            className="form-control"
          />
          <ErrorHandle touched={touched} errors={errors} fieldname="description" />
        </div>
        <div>
          <input
            placeholder="price"
            name="price"
            value={values.price}
            onChange={(e) => {
              setFieldValue("price", e.target.value);
            }}
            onBlur={() => {
              setTouched({ ...touched, price: "true" });
            }}
            type="number"
            className="form-control"
          />
          <ErrorHandle touched={touched} errors={errors} fieldname="price" />
        </div>
        <div>
          <input
            placeholder="discount percentage"
            name="discountpercentage"
            value={values.discountpercentage}
            onChange={(e) => {
              setFieldValue("discountpercentage", e.target.value);
            }}
            onBlur={() => {
              setTouched({ ...touched, discountpercentage: "true" });
            }}
            type="number"
            className="form-control"
          />
          <ErrorHandle touched={touched} errors={errors} fieldname="discountpercentage" />
        </div>
        <div>
          <input
            placeholder="rating"
            name="rating"
            value={values.rating}
            onChange={(e) => {
              setFieldValue("rating", e.target.value);
            }}
            onBlur={() => {
              setTouched({ ...touched, rating: "true" });
            }}
            type="number"
            className="form-control"
          />
          <ErrorHandle touched={touched} errors={errors} fieldname="rating" />
        </div>
        <div>
          <input
            placeholder="brand"
            name="brand"
            value={values.brand}
            onChange={(e) => {
              setFieldValue("brand", e.target.value);
            }}
            onBlur={() => {
              setTouched({ ...touched, brand: "true" });
            }}
            type="text"
            className="form-control"
          />
          <ErrorHandle touched={touched} errors={errors} fieldname="brand" />
        </div>
        <div>
              <select style={{width:"100%",padding:"5px",border:"1px solid grey",borderRadius:"5px"}}
                defaultValue={preValue}
                value={values.category}
                onChange={(e) => {
                  setFieldValue("category", e.target.value);
                }}
                onBlur={() => setTouched({ ...touched,category: true })}
              >
                {categorydata?.map((info) => {
                  return <option value={info}>{info}</option>;
                })}
              </select>
              <ErrorHandle touched={touched} errors={errors} fieldname="category" />
            </div>
            
            <div>
              <input
                id="inputTag"
                type="file"
                name=" thumbnail"
                onChange={(e) => {
                  handleimagefile(e);
                  setFieldValue("thumbnail", e.currentTarget.files[0]);
                  setTouched({ ...touched, thumbnail: true });
                }}
              />
               <ErrorHandle touched={touched} errors={errors} fieldname="thumbnail" />
              </div>
               
              <div>
              <input
                id="inputTag"
                type="file"
                 name="images"
                onChange={(e) => {
                  handleimagefile(e);
                  setFieldValue("images", e.currentTarget.files[0]);
                  setTouched({ ...touched, images: true });
                }}
              />
               <ErrorHandle touched={touched} errors={errors} fieldname="images" />
              </div>

        <button type="submit" className="btn btn-primary">
          Add Products
        </button>
        </div>
      </form>
    </div>
        </>
    )
}

export default Addproducts;