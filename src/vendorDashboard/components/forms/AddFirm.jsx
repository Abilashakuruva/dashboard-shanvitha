import React, { useState } from 'react'
import { API_URL } from '../../data/ApiPath';
import { ThreeCircles } from 'react-loader-spinner';

const AddFirm = () => {
  const [firmName, setFirmName] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [offer, setOffer] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);


  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value])
    }
  }

  const handleRegionChange = (event) => {
    const value = event.target.value;
    if (region.includes(value)) {
      setRegion(region.filter((item) => item !== value));
    } else {
      setRegion([...region, value])
    }
  }

  const handleImageupload = (event) => {
    const selectedImage = event.target.files[0];
    setFile(selectedImage)
  }

  const handleFirmSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const loginToken = localStorage.getItem('loginToken');
      if (!loginToken) {
        console.error("User not authenticated")
      }

      const formData = new FormData();
      formData.append('firmName', firmName);
      formData.append('area', area);
      formData.append('offer', offer);
      formData.append('image', file);

      category.forEach((value) => {
        formData.append('category', value)
      });

      region.forEach((value) => {
        formData.append('region', value)
      });

      const response = await fetch(`${API_URL}/firm/add-firm`, {
        method: 'POST',
        headers: {
          'token': `${loginToken}`
        },
        body: formData
      });
      const data = await response.json()
      if (response.ok) {
        console.log(data);
        setFirmName("");
        setArea("");
        setCategory([]);
        setRegion([]);
        setOffer("");
        setFile(null);
        alert("Firm added successfully")
      } else if (data.message === "Vendor can have only one firm") {
        alert("Firm exists. only 1 firm can be added")
      } else {
        alert("Failed to add firm")
      }

      const mango = data.firmId;
      const vendorRestuarant = data.vendorFirname

      localStorage.setItem('firmId', mango)
      localStorage.setItem('firmName', vendorRestuarant)
      window.location.reload()


    } catch (error) {
      console.error("Failed to add firm")
      alert("failed to add firm")

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="firmsec">
      {loading &&
        <div className="loadersec">
          <ThreeCircles 
          visible={loading}
            height={100}
            width={100}
            color='#4fa94d' 
            ariaLabel='three-circles-loading'
            wrapperClass='' wrapperStyle={{}} />
            <p>Please wait, your firm is being added...</p>
          
        </div>

      }

      {!loading &&

        <form className='tableform' onSubmit={handleFirmSubmit}>
          <h3>Add Firm</h3>
          <label>FirmName</label>
          <input type='text' name='firmname' value={firmName} onChange={(e) => setFirmName(e.target.value)} placeholder='enter your firmname' />
          <label>Area</label>
          <input type='text' name='area' value={area} onChange={(e) => setArea(e.target.value)} placeholder='enter your area' />
          {/*<label>Category</label><br/>
          <input type='text' /><br/>*/}

          <div className="checkinp">
            <label>Category</label>

            <div className="inputscontainer">
              <div className="checkboxcontainer">
                <label>Veg</label>
                <input type='checkbox' value="veg" checked={category.includes('veg')} onChange={handleCategoryChange} />

              </div>

              <div className="checkboxcontainer">
                <label>Non-Veg</label>
                <input type='checkbox' value="non-veg" checked={category.includes('non-veg')} onChange={handleCategoryChange} />

              </div>

            </div>
          </div>

          <label>Offer</label>
          <input type='text' name='offer' value={offer} onChange={(e) => setOffer(e.target.value)} placeholder='enter your offer' />

          {/*<label>Region</label><br/>
          <input type='text'  /><br/>*/}

          <div className="checkinp">
            <label>Region</label>

            <div className="inputscontainer">
              <div className="regboxcontainer">
                <label>South-Indian</label>
                <input type='checkbox' value="south-indian" checked={region.includes('south-indian')} onChange={handleRegionChange} />

              </div>

              <div className="regboxcontainer">
                <label>North-Indian</label>
                <input type='checkbox' value="north-indian" checked={region.includes('north-indian')} onChange={handleRegionChange} />

              </div>

              <div className="regboxcontainer">
                <label>Chinese</label>
                <input type='checkbox' value="chinese" checked={region.includes('chinese')} onChange={handleRegionChange} />

              </div>

              <div className="regboxcontainer">
                <label>Bakery</label>
                <input type='checkbox' value="bakery" checked={region.includes('bakery')} onChange={handleRegionChange} />

              </div>

            </div>
          </div>


          <label>Firm Image</label>
          <input type='file' onChange={handleImageupload} />

          <div className="btnsubmit">
            <button type='submit'>Submit</button>
          </div>
        </form>}
    </div>

  )
}

export default AddFirm
