import React,{useState} from 'react'
import { API_URL} from '../../data/ApiPath'

const AddProduct = () => {
  const[productName,setProductName]=useState("")
  const[price,setPrice]=useState("")
  const[category,setCategory]=useState([])
  const[bestSeller,setBestSeller]=useState(false)
  const[image,setImage]=useState(null)
  const[description,setDescription]=useState("")

  const handleCategoryChange=(event)=>{
    const value=event.target.value;
    if(category.includes(value)){
      setCategory(category.filter((item)=>item!==value));
    }else{
      setCategory([...category,value])
    }
  }

  const handleBestSeller=(event)=>{
    const value=event.target.value==='true'
    setBestSeller(value)
  }

  const handleImageupload=(event)=>{
    const selectedImage=event.target.files[0];
    setImage(selectedImage)    
  }

  const handleAddProduct=async(e)=>{
    e.preventDefault()
    try {
      const loginToken=localStorage.getItem('loginToken');
      const firmId=localStorage.getItem('firmId')

      if(!loginToken || !firmId){
        console.error("user not authenticated")
      }
      
      const formData=new FormData();
      formData.append('productName',productName);
      formData.append('price',price);
      formData.append('bestSeller', bestSeller);
      formData.append('description',description);
      formData.append('image',image);

      category.forEach((value)=>{
        formData.append('category',value)
      });

      const response=await fetch(`${API_URL}/product/add-product/${firmId}`,{
        method:'POST',
        body:formData
      })
      const data=await response.json()

      if(response.ok){
        setProductName("")
        setPrice("")
        setCategory([])
        setBestSeller(false)
        setDescription("")
        setImage(null)

        alert('Product added successfully')
      }

    } catch (error) {
      console.error(data.message);
      alert('failed to add product');
      
    }


  } 

  return (
    <div className="productsec">

      <form className='tableform' onSubmit={handleAddProduct}>
        <h3>Add Product</h3>
        <label>Product Name</label><br />
        <input type='text' value={productName} onChange={(e)=>setProductName(e.target.value)} placeholder='enter your product name' /><br />
        
        {/*<label>Category</label><br/>
                <input type='text'  /><br/>*/}

        <div className="checkinp">
          <label>Category</label>

          <div className="inputscontainer">
            <div className="checkboxcontainer">
              <label>Veg</label>
              <input type='checkbox'  value="veg" checked={category.includes('veg')} onChange={handleCategoryChange}/>

            </div>

            <div className="checkboxcontainer">
              <label>Non-Veg</label>
              <input type='checkbox' value="non-veg" checked={category.includes('non-veg')} onChange={handleCategoryChange} />

            </div>

          </div>
        </div>

        <label>Price</label><br />
        <input type='text' value={price} onChange={(e)=>setPrice(e.target.value)} /><br />


        {/*<label>Bestseller</label><br />
        <input type='radio' /><br />*/}

        <div className="checkinp">
          <label>Bestseller</label>

          <div className="inputscontainer">
            <div className="checkboxcontainer">
              <label>Yes</label>
              <input type='radio' value="true" checked={bestSeller===true} onChange={handleBestSeller} />
            </div>

            <div className="checkboxcontainer">
              <label>No</label>
              <input type='radio' value="false" checked={bestSeller===false} onChange={handleBestSeller} />
            </div>

          </div>
        </div>

        <label>Description</label><br />
        <input type='text' value={description} onChange={(e)=>setDescription(e.target.value)} /><br />

        <label>Image</label><br />
        <input type='file' onChange={handleImageupload} /><br />

        <div className="btnsubmit">
          <button type='submit'>Submit</button>
        </div>

      </form>
    </div>

  )
}

export default AddProduct
