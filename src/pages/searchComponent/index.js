import React, { useEffect, useState,useCallback } from "react";
import { Header } from "../../Components";
import {debounce} from 'lodash';
import {
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from "@mui/material";
import { APIS } from "../../api/api.constant";
import { getApi } from "../../api/api.client";

function SearchComponent() {
  const [data, setdata] = useState([]);
  const [search, setSearch] = useState("");


  useEffect(() => {
    debouncedGetProduct();
  }, [search]);

  const getproduct = async () => {
    try {
      const result = await getApi(`${APIS.SEARCH_PRODUCT}${search}`);
      setdata(result?.products);
    } catch (error) {
      console.log("error", error);
    }
  };

  const debouncedGetProduct = debounce(getproduct, 1000);

  const handlechange = (e)=>{
    const value = e.target.value;
    setSearch(value);
    debouncedGetProduct(value);
  }
  return (
    <>
      <Header />
         
      <div className="col-sm-4 offset-sm-4 p-4">
        <h1>Search Product</h1>
        <div style={{ display: "flex", alignItems: "baseline" }}>
            <div style={{ paddingTop: "30px", paddingLeft: "120px" }}>
              <input
                placeholder="Search product here"
                name="searchproduct"
                value={search}
                onChange={handlechange}
                type="text"
                className="form-control"
              />
            </div>
          </div>
      </div>
      <TableContainer style={{ padding: "20px", border: "1px solid #f1f1f1" }}>
        <Table>
          <TableHead>
            <TableRow style={{ fontSize: "22px", fontWeight: "bolder" }}>
              <TableCell>Product Name</TableCell>
              <TableCell>Product description</TableCell>
              <TableCell>Product Price</TableCell>
              <TableCell>Product discount Percentage</TableCell>
              <TableCell>Product Rating</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>thumbnail</TableCell>
              <TableCell>Images</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((info) => {
              return (
                <>
                  <TableRow>
                    <TableCell>{info.title}</TableCell>
                    <TableCell>{info.description}</TableCell>
                    <TableCell>{info.price}</TableCell>
                    <TableCell>{info.discountPercentage}</TableCell>
                    <TableCell>{info.rating}</TableCell>
                    <TableCell>{info.stock}</TableCell>
                    <TableCell>{info.brand}</TableCell>
                    <TableCell>{info.category}</TableCell>
                    <TableCell>
                      <img width="40%" src={info.thumbnail} />
                    </TableCell>
                    <TableCell>
                      <img width="40%" src={info.images} />
                    </TableCell>
                  </TableRow>
                </>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default SearchComponent;
