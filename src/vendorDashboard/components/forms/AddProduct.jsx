import React,{useState} from 'react'
import { API_URL} from '../../data/ApiPath'
import { ThreeCircles } from 'react-loader-spinner'

const AddProduct = () => {
  const[productName,setProductName]=useState("")
  const[price,setPrice]=useState("")
  const[category,setCategory]=useState([])
  const[bestSeller,setBestSeller]=useState(false)
  const[image,setImage]=useState(null)
  const[description,setDescription]=useState("")
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    
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
        alert('Product added successfully')
      }
        setProductName("")
        setPrice("")
        setCategory([])
        setBestSeller(false)
        setDescription("")
        setImage(null)

      

    } catch (error) {
      console.error(data.message);
      alert('failed to add product');
      
    }finally{
      setLoading(false);
    }


  } 

  return (
    <div className="productsec">
       {loading &&
              <div className="loadersec">
                <ThreeCircles 
                visible={loading}
                  height={100}
                  width={100}
                  color='#4fa94d' 
                  ariaLabel='three-circles-loading'
                  wrapperClass='' wrapperStyle={{}} />
                  <p>Please wait, your product is being added...</p>
                
              </div>
      
            }

      {!loading && <form className='tableform' onSubmit={handleAddProduct}>
        <h3>Add Product</h3>
        <label>Product Name</label>
        <input type='text' value={productName} onChange={(e)=>setProductName(e.target.value)} placeholder='enter your product name' />
        
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

        <label>Price</label>
        <input type='text' value={price} onChange={(e)=>setPrice(e.target.value)} />


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

        <label>Description</label>
        <input type='text' value={description} onChange={(e)=>setDescription(e.target.value)} />

        <label>Image</label>
        <input type='file' onChange={handleImageupload} />

        <div className="btnsubmit">
          <button type='submit'>Submit</button>
        </div>

      </form>}
    </div>

  )
}

export default AddProduct
