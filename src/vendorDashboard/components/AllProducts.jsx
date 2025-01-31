import React,{useState,useEffect} from 'react'
import { API_URL} from '../data/ApiPath'


const AllProducts = () => {
    const[products,setProducts]=useState([]);

    const productsHandler=async()=>{
        const firmId=localStorage.getItem('firmId');
        try {
            const response=await fetch(`${API_URL}/product/${firmId}/products`);
            const newProductsData=await response.json();
            setProducts(newProductsData.products);
            console.log(newProductsData)
        } catch (error) {
            console.error("failed to fetch products",error);
            alert('failed to fetch products')
        }
    }

    useEffect(()=>{
        productsHandler()
        console.log('this is useEffect')

    },[])

  return (
    <div>
        {products.length===0?(
            <p>No products added</p>
        ):(
            <table className='product-table'>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((item)=>{
                        return(
                            <>
                            <tr key={item._id}>
                                <td>{item.productName}</td>
                                <td>{item.price}</td>
                                <td>{item.image && (
                                    <img src={`${API_URL}/uploads/${item.image}`} alt={item.productName} style={{width:'100px',height:'100px'}} />
                            )}
                            </td>
                            <td><button className='deletebtn'>Delete</button></td>
                            </tr>
                            
                                </>
                        )
                    })}
                </tbody>
            </table>
        )}
      
    </div>
  )
}

export default AllProducts
