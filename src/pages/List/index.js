import React, { useEffect,useState} from "react";
import { Header } from "../../Components";
import {TableContainer,Table, TableHead, TableCell, TableBody, TableRow} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

const buttondata = [
    {
        objindentifier :"edit",
        icon:faEdit
    },
    {
        objindentifier:"delete",
        icon:faTrash
    }
]
const List = () =>{
 const [data ,Setdata] = useState([]);
const navigate = useNavigate();
 const actionHandler = (btn,id) =>{
      if(btn.objindentifier === 'edit'){
        navigate(`/Updateproduct/${id}`);
      }

      if(btn.objindentifier === 'delete'){
           alert(`${id}`)
      }
 }
    useEffect(()=>{
        getData();
    },[])

    const getData = async() =>{
         try{
            let res = await fetch("https://dummyjson.com/products");     
            res = await res.json();
            console.log(res?.products);
            Setdata(res?.products);
        }
         catch(error){
            console.log("error",error);
         }
    }

    console.log("data------->",data);



    return(
        <>
          <Header/>
        <h1>Poduct List</h1>

       <TableContainer style={{padding:"20px", border:"1px solid #f1f1f1"}}>
            <Table>
                <TableHead >
                    <TableRow style={{fontSize:"22px", fontWeight:"bolder"}}>
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
                    <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        data?.map((info)=>{
                            return(
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
                                 <TableCell><img width="40%" src={info.thumbnail}/></TableCell>
                                 <TableCell><img width="40%" src={info.images}/></TableCell>
                                 {
                                    buttondata?.map((btn)=>{
                                        return(
                                            <>
                                            
                                             <TableCell>  <button onClick={()=>actionHandler(btn,info.id)} style={{border:"none",outline:"none"}}><FontAwesomeIcon icon={btn.icon}/></button> </TableCell>              
                                          
                                            </>
                                        )
                                    })
                                 }
                               
                                </TableRow>
                                </>
                            )
                          
                            
                        })
                    }
                    
                </TableBody>
            </Table>
       </TableContainer>
        </>
    )
}

export default List;