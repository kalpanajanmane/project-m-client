import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserEditInvoice.css'
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const UserEditInvoice = () => {
    const { id } = useParams();
    const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 const API = process.env.REACT_APP_API;
 useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axios.get(`${API}invoice/${id}`);
        if (response.data) {
          setFormData(response.data);
          setLoading(false);
        } else {
          setError('Invoice not found');
          setLoading(false);
        }
      } catch (error) {
        setError('Error retrieving invoice data');
        setLoading(false);
      }
    };
    fetchInvoice();
  }, [id, API]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Split the name into nested levels
    const nameParts = name.split('.');
  
    // Clone the previous state
    const updatedFormData = { ...formData };
  
    // Traverse the nested structure and update the value
    let currentLevel = updatedFormData;
    for (let i = 0; i < nameParts.length; i++) {
      const key = nameParts[i];
      if (i === nameParts.length - 1) {
        // Last level, update the value
        currentLevel[key] = value;
      } else {
        // Intermediate level, go deeper
        if (!currentLevel[key]) {
          // Initialize nested objects if they don't exist
          currentLevel[key] = {};
        }
        currentLevel = currentLevel[key];
      }
    }
  
    // Update the state
    setFormData(updatedFormData);
  };
  
  const formatDate = (dateString) => {
    try {
        if (!dateString) return ''; // Handle empty or undefined date strings
        const date = new Date(dateString);
        // Check if the date is valid
        if (isNaN(date.getTime())) {
            throw new Error('Invalid date');
        }
        return dateString.split('T')[0]; // Extract yyyy-MM-dd
    } catch (error) {
        console.error('Error formatting date:', error);
        return ''; // Return empty string in case of error
    }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API}invoice/${id}`, formData);
      alert('Update invoice successful')
      navigate('/userinman');
      // Handle successful update (e.g., show a success message)
    } catch (error) {
      // Handle error (e.g., display an error message)
      console.error('Error updating invoice:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
<form onSubmit={handleSubmit}>
  <label>
    Company Name:
    <input
      type="text"
      name="companydetails.companyname"
      value={formData.companydetails?.companyname || ''}
      onChange={handleChange}
    />
  </label>
  <br />


  <label>
    Company GST No:
    <input
      type="text"
      name="companydetails.companygstno"
      value={formData.companydetails?.companygstno || ''}
      onChange={handleChange}
    />
  </label>
  <br />

  <label>
    Company Contact:
    <input
      type="text"
      name="companydetails.companycontact"
      value={formData.companydetails?.companycontact || ''}
      onChange={handleChange}
    />
  </label>
<br />
  <label>
    Company State:
    <input
      type="text"
      name="companydetails.companystate"
      value={formData.companydetails?.companystate || ''}
      onChange={handleChange}
    />
  </label>
<br />
  <label>
    Company Pincode:
    <input
      type="text"
      name="companydetails.companypincode"
      value={formData.companydetails?.companypincode || ''}
      onChange={handleChange}
    />
  </label>
<br />
  <label>
    Company Office Address:
    <input
      type="text"
      name="companydetails.companyofficeaddress"
      value={formData.companydetails?.companyofficeaddress || ''}
      onChange={handleChange}
    />
  </label>
  <br />
  <label>
    Seller Company Name:
    <input
      type="text"
      name="sellerdetails.sellercompanyname"
      value={formData.sellerdetails?.sellercompanyname || ''}
      onChange={handleChange}
    />
  </label>
  <br />
  <label>
    Seller Company GST No:
    <input
      type="text"
      name="sellerdetails.sellercompanygstno"
      value={formData.sellerdetails?.sellercompanygstno || ''}
      onChange={handleChange}
    />
  </label>
  <br />
  <label>
    Seller Company Address:
    <input
      type="text"
      name="sellerdetails.sellercompanyaddress"
      value={formData.sellerdetails?.sellercompanyaddress || ''}
      onChange={handleChange}
    />
  </label>
  <br />
  <label>
    Seller Company State Name:
    <input
      type="text"
      name="sellerdetails.sellercompanystatename"
      value={formData.sellerdetails?.sellercompanystatename || ''}
      onChange={handleChange}
    />
  </label>
  <br />
  <label>
    Seller Company State Code:
    <input
      type="text"
      name="sellerdetails.sellercompanystatecode"
      value={formData.sellerdetails?.sellercompanystatecode || ''}
      onChange={handleChange}
    />
  </label>
  <br />
  <label>
    Buyer Company Name:
    <input
      type="text"
      name="buyerdetails.buyercompanyname"
      value={formData.buyerdetails?.buyercompanyname || ''}
      onChange={handleChange}
    />
  </label>
  <br />
  <label>
    Buyer Company GST No:
    <input
      type="text"
      name="buyerdetails.buyercompanygstno"
      value={formData.buyerdetails?.buyercompanygstno || ''}
      onChange={handleChange}
    />
  </label>
  <br />
  <label>
    Buyer Company Address:
    <input
      type="text"
      name="buyerdetails.buyercompanyaddress"
      value={formData.buyerdetails?.buyercompanyaddress || ''}
      onChange={handleChange}
    />
  </label>
  <br />
  <label>
    Buyer Company State Name:
    <input
      type="text"
      name="buyerdetails.buyercompanystatename"
      value={formData.buyerdetails?.buyercompanystatename || ''}
      onChange={handleChange}
    />
  </label>
  <br />
  <label>
    Buyer Company State Code:
    <input
      type="text"
      name="buyerdetails.buyercompanystatecode"
      value={formData.buyerdetails?.buyercompanystatecode || ''}
      onChange={handleChange}
    />
  </label>
  <br />
  <label>
    Driver Number:
    <input
      type="number"
      name="vehicledetails.drivernumber"
      value={formData.vehicledetails?.drivernumber || ''}
      onChange={handleChange}
    />
  </label>
  <br />
  <label>
    Vehicle Number:
    <input
      type="text"
      name="vehicledetails.vechiclenumber"
      value={formData.vehicledetails?.vechiclenumber || ''}
      onChange={handleChange}
    />
  </label>
  <br />
  <label>
    Vehicle Model:
    <input
      type="text"
      name="vehicledetails.vechiclemodel"
      value={formData.vehicledetails?.vechiclemodel || ''}
      onChange={handleChange}
    />
  </label>
  <br />
  {/* Consignment Details */}
  {/* Assuming you have multiple items, you can map over the items array */}
  {formData.consignmentdetails?.itemdetails?.map((item, index) => (
    <div key={index}>
      <label>
        Item Name:
        <input
          type="text"
          name={`consignmentdetails.itemdetails[${index}].itemname`}
          value={item.itemname || ''}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Item Description:
        <input
          type="text"
          name={`consignmentdetails.itemdetails[${index}].itemdesc`}
          value={item.itemdesc || ''}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Item Quantity:
        <input
          type="number"
          name={`consignmentdetails.itemdetails[${index}].itemquantity`}
          value={item.itemquantity || ''}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Item HSN:
        <input
          type="text"
          name={`consignmentdetails.itemdetails[${index}].itemhsn`}
          value={item.itemhsn || ''}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Item Price:
        <input
          type="number"
          name={`consignmentdetails.itemdetails[${index}].itemprice`}
          value={item.itemprice || ''}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Item Tax Rate:
        <input
          type="number"
          name={`consignmentdetails.itemdetails[${index}].itemtaxrate`}
          value={item.itemtaxrate || ''}
          onChange={handleChange}
        />
      </label>
      <br />
      {/* Add other fields for each item */}
    </div>
  ))}


<br />
<label>
  Invoice Date:
  <input
    type="date"
    name="invoicedetails.invoicedate"
    value={formatDate(formData.invoicedetails?.invoicedate) || ''}
    onChange={handleChange}
  />
</label>
<br />
  <label>
    Invoice Maker Name:
    <input
      type="text"
      name="invoicedetails.invoicemakername"
      value={formData.invoicedetails?.invoicemakername || ''}
      onChange={handleChange}
    />
  </label>

  <br />
  

  <label>
    Invoice ID:
    <input
      type="text"
      name="invoicedetails.invoiceid"
      value={formData.invoicedetails?.invoiceid || ''}
      onChange={handleChange}
    />
  </label>
  <br />
  <label>
  Date of Loading:
  <input
    type="date"
    name="boardingdetails.dateofloading"
    value={formatDate(formData.boardingdetails?.dateofloading) || ''}
    onChange={handleChange}
  />
</label>

<br />
  <label>
    Party Reference:
    <input
      type="text"
      name="boardingdetails.partyref"
      value={formData.boardingdetails?.partyref || ''}
      onChange={handleChange}
    />
  </label>
  <br />

  <label>
    Party Rate:
    <input
      type="number"
      name="boardingdetails.partyrate"
      value={formData.boardingdetails?.partyrate || ''}
      onChange={handleChange}
    />
  </label>
  <br />
  <label>
    Start State:
    <input
      type="text"
      name="loadingdetails.startstate"
      value={formData.loadingdetails?.startstate || ''}
      onChange={handleChange}
    />
  </label>
  <br />
  <label>
    End State:
    <input
      type="text"
      name="loadingdetails.endstate"
      value={formData.loadingdetails?.endstate || ''}
      onChange={handleChange}
    />
  </label>
  <br />
<label>
  Transportation Cost:
  <input
    type="text"
    name="loadingdetails.transportationcost"
    value={formData.loadingdetails?.transportationcost || ''}
    onChange={handleChange}
  />
</label>

<br />
  <label>
    Start Point:
    <input
      type="text"
      name="loadingdetails.startpoint"
      value={formData.loadingdetails?.startpoint || ''}
      onChange={handleChange}
    />
  </label>
  <br />
  <label>
    End Point:
    <input
      type="text"
      name="loadingdetails.endpoint"
      value={formData.loadingdetails?.endpoint || ''}
      onChange={handleChange}
    />
  </label>
  <br />
  <button type="submit">Update Invoice</button>
</form>

    


  );
};

export default UserEditInvoice;
