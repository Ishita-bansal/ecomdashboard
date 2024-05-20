import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorHandle from "../../Components/Errorhandle";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../Components";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Required*"),
  description: Yup.string()
    .max(100, "Atleast 20 characters")
    .required("Required*"),
  price: Yup.number().required("Required*"),
  discountPercentage: Yup.number().required("Required*"),
  rating: Yup.number().required("Required*"),
  stock: Yup.number().required("Required*"),
  brand: Yup.string().required("Required*"),
  category: Yup.string().notOneOf([""], "You must select an option!"),
  thumbnail: Yup.mixed()
    .test("fileType", "Only jpg, jpeg, or png files are allowed", (value) => {
      if (!value) return true;
      const supportedFormats = ["image/jpeg", "image/jpg", "image/png"];
      return supportedFormats.includes(value.type);
    })
    .required("File is required"),
  images: Yup.mixed()
    .test("fileType", "Only jpg, jpeg, or png files are allowed", (value) => {
      if (!value) return true;
      const supportedFormats = ["image/jpeg", "image/jpg", "image/png"];
      return supportedFormats.includes(value.type);
    })
    .required("File is required"),
});

const Updateproduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categorydata, setcategorydata] = useState([]);
  const [imagefile, setimagefile] = useState(null);
  const [productdata, setproductdata] = useState({});
  const [userImg, setUserImg] = useState("/images/images.jpg");
 
  useEffect(() => {
    if (id) {
      getres();
    }
  
  }, [id]);

 

  const getres = async () => {
    try {
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await res.json();
     console.log("daddaddataaaap==-=->",data);
     
     const res2 = await fetch("https://dummyjson.com/products/categories");
     const data2 = await res2.json();
     console.log("res2-=-=-=>",data2);
      setcategorydata(data2);
      await setproductdata(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const onSubmit = async (values) => {
console.log("Values=======>",values);
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("discountpercentage", values.discountpercentage);
    formData.append("rating", values.rating);
    formData.append("stock", values.stock);
    formData.append("brand", values.brand);
    formData.append("category", values.category);
    formData.append(
      "thumbnail",
      userImg === "/images/images.jpg" ? null : userImg
    );
    formData.append(
      "images",
      userImg === "/images/images.jpg" ? null : userImg
    );

    // console.log("formdata---->",formData);
    const response = await fetch("https://dummyjson.com/products/add");

    let result = await fetch("https://dummyjson.com/products/1", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(values),
    });
    result = await result.json();
    console.log("result===>", result);
    localStorage.setItem("user-info", JSON.stringify(result));
  };

  const formik = useFormik({
    initialValues:productdata,
    onSubmit: onSubmit,
    validationSchema: validationSchema,
    enableReinitialize:true
  });
  const { values, handleSubmit, setTouched, setFieldValue, touched, errors } =
    formik;

  console.log("errors=====>",errors);
  return (
    <>
      <Header />
      <div className="col-sm-4 offset-sm-4 p-4" style={{ height: "70vh" }}>
        <h1>Update product</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <div style={{ paddingTop: "40px" }}>
              <input
                placeholder="Product Title"
                name="title"
                value={values?.title}
                onChange={(e) => {
                  setFieldValue("title", e.target.value);
                }}
                onBlur={() => {
                  setTouched({ ...touched, title: "true" });
                }}
                type="text"
                className="form-control"
              />
              <ErrorHandle
                touched={touched}
                errors={errors}
                fieldname="title"
              />
            </div>
            <div>
              <input
                placeholder="description"
                name="description"
                value={values?.description}
                onChange={(e) => setFieldValue("description", e.target.value)}
                onBlur={() => {
                  setTouched({ ...touched, description: "true" });
                }}
                type="text"
                className="form-control"
              />
              <ErrorHandle
                touched={touched}
                errors={errors}
                fieldname="description"
              />
            </div>
            <div>
              <input
                placeholder="price"
                name="price"
                value={values?.price}
                onChange={(e) => {
                  setFieldValue("price", e.target.value);
                }}
                onBlur={() => {
                  setTouched({ ...touched, price: "true" });
                }}
                type="number"
                className="form-control"
              />
              <ErrorHandle
                touched={touched}
                errors={errors}
                fieldname="price"
              />
            </div>
            <div>
              <input
                placeholder="discount Percentage"
                name="discountPercentage"
                value={values?.discountPercentage}
                onChange={(e) => {
                  setFieldValue("discountPercentage", e.target.value);
                }}
                onBlur={() => {
                  setTouched({ ...touched, discountPercentage: "true" });
                }}
                type="number"
                className="form-control"
              />
              <ErrorHandle
                touched={touched}
                errors={errors}
                fieldname="discountpercentage"
              />
            </div>
            <div>
              <input
                placeholder="rating"
                name="rating"
                value={values?.rating}
                onChange={(e) => {
                  setFieldValue("rating", e.target.value);
                }}
                onBlur={() => {
                  setTouched({ ...touched, rating: "true" });
                }}
                type="number"
                className="form-control"
              />
              <ErrorHandle
                touched={touched}
                errors={errors}
                fieldname="rating"
              />
            </div>

            <div>
              <input
                placeholder="stock"
                name="stock"
                value={values?.stock}
                onChange={(e) => {
                  setFieldValue("stock", e.target.value);
                }}
                onBlur={() => {
                  setTouched({ ...touched, stock: "true" });
                }}
                type="number"
                className="form-control"
              />
              <ErrorHandle
                touched={touched}
                errors={errors}
                fieldname="stock"
              />
            </div>

            <div>
              <input
                placeholder="brand"
                name="brand"
                value={values?.brand}
                onChange={(e) => {
                  setFieldValue("brand", e.target.value);
                }}
                onBlur={() => {
                  setTouched({ ...touched, brand: "true" });
                }}
                type="text"
                className="form-control"
              />
              <ErrorHandle
                touched={touched}
                errors={errors}
                fieldname="brand"
              />
            </div>
            <div>
              <select
                style={{
                  width: "100%",
                  padding: "5px",
                  border: "1px solid grey",
                  borderRadius: "5px",
                }}
                // defaultValue={preValue}
                value={values?.category}
                onChange={(e) => {
                  setFieldValue("category", e.target.value);
                }}
                onBlur={() => setTouched({ ...touched, category: true })}
              >
                {categorydata?.map((info) => {
                  return <option value={info}>{info}</option>;
                })}
              </select>
              <ErrorHandle
                touched={touched}
                errors={errors}
                fieldname="category"
              />
            </div>

            <div>
              <input
                id="thumbnailInput"
                type="file"
                name="thumbnail"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setUserImg(file);
                  setFieldValue("thumbnail", file);
                  setTouched({ ...touched, thumbnail: true });
                }}
              />
              <ErrorHandle
                touched={touched}
                errors={errors}
                fieldname="thumbnail"
              />
            </div>

            <div>
              <input
                id="imagesInput"
                type="file"
                name="images"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setUserImg(file);
                  setFieldValue("images", file);
                  setTouched({ ...touched, images: true });
                }}
              />
              <ErrorHandle
                touched={touched}
                errors={errors}
                fieldname="images"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Update Products
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Updateproduct;
