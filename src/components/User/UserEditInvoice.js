import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserEditInvoice.css';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const UserEditInvoice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [consignments, setConsignments] = useState([]);
  const [loads, setLoads] = useState([]);
  const [parties, setParties] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedValues, setEditedValues] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const API = process.env.REACT_APP_API;

  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        const response = await fetch(`${API}invoice/${id}`);
        if (response.ok) {
          const data = await response.json();
          setFormData(data);
          setLoading(false);
        } else {
          console.error('Failed to fetch invoice data');
          setError('Failed to fetch invoice data');
        }
      } catch (error) {
        console.error('Error fetching invoice data:', error);
        setError('Error fetching invoice data');
      }
    };
    const fetchSelectBoxData = async () => {
      try {
        // Fetch companies data
        const companiesResponse = await fetch(`${API}company`);
        if (companiesResponse.ok) {
          const companiesData = await companiesResponse.json();
          setCompanies(companiesData);
        } else {
          console.error('Failed to fetch companies data');
          setError('Failed to fetch companies data');
        }
    
        // Fetch sellers data
        const sellersResponse = await fetch(`${API}seller`);
        if (sellersResponse.ok) {
          const sellersData = await sellersResponse.json();
          setSellers(sellersData);
        } else {
          console.error('Failed to fetch sellers data');
          setError('Failed to fetch sellers data');
        }
    
        // Fetch buyers data
        const buyersResponse = await fetch(`${API}buyer`);
        if (buyersResponse.ok) {
          const buyersData = await buyersResponse.json();
          setBuyers(buyersData);
        } else {
          console.error('Failed to fetch buyers data');
          setError('Failed to fetch buyers data');
        }
    
        // Fetch consignments data
        const consignmentsResponse = await fetch(`${API}consignment`);
        if (consignmentsResponse.ok) {
          const consignmentsData = await consignmentsResponse.json();
          setConsignments(consignmentsData);
        } else {
          console.error('Failed to fetch consignments data');
          setError('Failed to fetch consignments data');
        }
    
        // Fetch loads data
        const loadsResponse = await fetch(`${API}load`);
        if (loadsResponse.ok) {
          const loadsData = await loadsResponse.json();
          setLoads(loadsData);
        } else {
          console.error('Failed to fetch loads data');
          setError('Failed to fetch loads data');
        }
    
        // Fetch parties data
        const partiesResponse = await fetch(`${API}party`);
        if (partiesResponse.ok) {
          const partiesData = await partiesResponse.json();
          setParties(partiesData);
        } else {
          console.error('Failed to fetch parties data');
          setError('Failed to fetch parties data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
      }
    };
    fetchInvoiceData();
    fetchSelectBoxData();
  }, [API, id]);  

    
  useEffect(() => {
    const validateForm = () => {
      const mandatoryFields = ['itemname', 'itemquantity', 'itemhsn', 'itemprice', 'itemtaxrate'];
      let isValid = mandatoryFields.every(field => editedValues[field]);
      setIsFormValid(isValid);
    };

    validateForm();
  }, [editedValues]);


  const handleChange1 = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("companydetails.")) {
      const selectedCompany = companies.find(company => company.companyname === value);
      setFormData(prevState => ({
        ...prevState,
        companydetails: {
          ...prevState.companydetails,
          companyId: selectedCompany?.id || '',
          companyname: selectedCompany?.companyname || '',
          companygstno: selectedCompany?.companygstno || '',
          companystate: selectedCompany?.companystate || '',
          companyofficeaddress: selectedCompany?.companyofficeaddress || '',
          companypincode: selectedCompany?.companypincode || '',
        }
      }));
    } else if (name.startsWith("sellerdetails.")) {
      const selectedSeller = sellers.find(seller => seller.sellercompanyname === value);
      setFormData(prevState => ({
        ...prevState,
        sellerdetails: {
          ...prevState.sellerdetails,
          sellercompanyId: selectedSeller?.id || '',
          sellercompanyname: selectedSeller?.sellercompanyname || '',
          sellercompanygstno: selectedSeller?.sellercompanygstno || '',
          sellercompanystatename: selectedSeller?.sellercompanystatename || '',
          sellercompanyaddress: selectedSeller?.sellercompanyaddress || '',
          sellercompanystatecode: selectedSeller?.sellercompanystatecode || '',
        }
      }));
    } else if (name.startsWith("buyerdetails.")) {
      const selectedBuyer = buyers.find(buyer => buyer.buyercompanyname === value);
      setFormData(prevState => ({
        ...prevState,
        buyerdetails: {
          ...prevState.buyerdetails,
          buyercompanyId: selectedBuyer?.id || '',
          buyercompanyname: selectedBuyer?.buyercompanyname || '',
          buyercompanygstno: selectedBuyer?.buyercompanygstno || '',
          buyercompanystatename: selectedBuyer?.buyercompanystatename || '',
          buyercompanyaddress: selectedBuyer?.buyercompanyaddress || '',
          buyercompanystatecode: selectedBuyer?.buyercompanystatecode || '',
        }
      }));
    }
    else if (name.startsWith("loadingdetails.")) {
      const selectedLoad = loads.find(load => load.startstate === value);
      setFormData(prevState => ({
        ...prevState,
        loadingdetails: {
          ...prevState.loadingdetails,
          startstate: selectedLoad?.startstate || '',
          endstate: selectedLoad?.endstate || '',
        }
      }));
    } else if (name.startsWith("boardingdetails.")) {
      const selectedParty = parties.find(party => party.partyname === value);
      setFormData(prevState => ({
        ...prevState,
        boardingdetails: {
          ...prevState.boardingdetails,
          partyname: selectedParty?.partyname || '',
          partyrefno: selectedParty?.partyrefno || '',
          partyrate: selectedParty?.partyrate || '',
        }
      }));

    } else if (name.startsWith("consignmentdetails.itemdetails")) {
      const [field, index, subField] = name.split(".");
      const updatedConsignments = [...formData.consignments];
      updatedConsignments[index] = {
        ...updatedConsignments[index],
        [subField]: value
      };
      setFormData(prevState => ({
        ...prevState,
        consignments: updatedConsignments
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };
  const handleChange2 = (e) => {
    const { name, value } = e.target;
    const [fieldName, subFieldName] = name.split('.');
    setFormData(prevState => ({
      ...prevState,
      [fieldName]: {
        ...prevState[fieldName],
        [subFieldName]: value
      }
    }));
  };
  const handleChange3 = (e) => {
    const { name, value } = e.target;
    const [fieldName, subFieldName] = name.split('.');
    setFormData(prevState => ({
      ...prevState,
      [fieldName]: {
        ...prevState[fieldName],
        [subFieldName]: value
      }
    }));
  };
  
  
  const formattedDate = formData.invoicedetails?.invoicedate ? formData.invoicedetails.invoicedate.slice(0, 10) : '';
  const formattedDate1 = formData.boardingdetails?.dateofloading ? formData.boardingdetails.dateofloading.slice(0, 10) : '';
    
  
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'itemname') {
      const selectedItem = consignments.find(item => item.itemname === value);
      setEditedValues(prevState => ({
        ...prevState,
        itemname: selectedItem?.itemname || '',
        itemdesc: selectedItem?.itemdesc || '',
        itemquantity: selectedItem?.itemquantity || '',
        itemhsn: selectedItem?.itemhsn || '',
        itemprice: selectedItem?.itemprice || '',
        itemtaxrate: selectedItem?.itemtaxrate || '',
      }));
    } else {
      setEditedValues(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleEditConsignment = (index) => {
    setEditingIndex(index);
    const editedItem = formData.consignmentdetails.itemdetails[index];
    setEditedValues({ ...editedItem });
  };

  const handleDeleteConsignment = (index) => {
    const updatedItemDetails = formData.consignmentdetails.itemdetails.filter((_, i) => i !== index);
    setFormData(prevState => ({
      ...prevState,
      consignmentdetails: {
        ...prevState.consignmentdetails,
        itemdetails: updatedItemDetails
      }
    }));
  };

  const handleUpdateConsignment = () => {
    const updatedItemDetails = [...formData.consignmentdetails.itemdetails];
    updatedItemDetails[editingIndex] = { ...editedValues };
    setFormData(prevState => ({
      ...prevState,
      consignmentdetails: {
        ...prevState.consignmentdetails,
        itemdetails: updatedItemDetails
      }
    }));
    setEditingIndex(null);
    setEditedValues({});
  };

  const handleCancelConsignment = () => {
    setEditingIndex(null);
    setEditedValues({});
  };

  const handleAddConsignment = () => {
    setEditingIndex(formData.consignmentdetails.itemdetails.length);
    setFormData(prevState => ({
      ...prevState,
      consignmentdetails: {
        ...prevState.consignmentdetails,
        itemdetails: [...prevState.consignmentdetails.itemdetails, editedValues]
      }
    }));
    setEditedValues({});
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(${API}invoice/${id}, formData);
      alert('Update invoice successful');
      navigate('/userinman');
    } catch (error) {
      console.error('Error updating invoice:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <form onSubmit={handleSubmit}>

      {/* Company Select */}
      <label>
        Company:
        <select
          name="companydetails.companyname"
          value={formData.companydetails?.companyname || ''}
          onChange={handleChange1}
        >
          <option value="">Select Company</option>
          {companies.map((company) => (
            <option key={company.id} value={company.companyname}>
              {company.companyname}
            </option>
          ))}
        </select>
      </label>
<br />
      <label>
        Company Name:
        <input
          type="text"
          name="companydetails.companyname"
          value={formData.companydetails?.companyname || ''}
          onChange={handleChange1}
        />
      </label>
      <br />
      <label>
        Company GST No:
        <input
          type="text"
          name="companydetails.companygstno"
          value={formData.companydetails?.companygstno || ''}
          onChange={handleChange1}
        />
      </label>
      <br />
      <label>
        Company State:
        <input
          type="text"
          name="companydetails.companystate"
          value={formData.companydetails?.companystate || ''}
          onChange={handleChange1}
        />
      </label>
      <br />
      <label>
        Company Office Address:
        <input
          type="text"
          name="companydetails.companyofficeaddress"
          value={formData.companydetails?.companyofficeaddress || ''}
          onChange={handleChange1}
        />
      </label>
      <br />
      <label>
        Company Pincode:
        <input
          type="text"
          name="companydetails.companypincode"
          value={formData.companydetails?.companypincode || ''}
          onChange={handleChange1}
        />
      </label>

      <br />
      <br />
      <hr />
    
      {/* Buyer Select */}
      <label>
        Buyer:
        <select
          name="buyerdetails.buyercompanyname"
          value={formData.buyerdetails?.buyercompanyname || ''}
          onChange={handleChange1}
        >
          <option value="">Select Buyer</option>
          {buyers.map((buyer) => (
            <option key={buyer.id} value={buyer.buyercompanyname}>
              {buyer.buyercompanyname}
            </option>
          ))}
        </select>
      </label>
      <br />
      {/* Other form inputs */}
      <label>
        Buyer Company Name:
        <input
          type="text"
          name="buyerdetails.buyercompanyname"
          value={formData.buyerdetails?.buyercompanyname || ''}
          onChange={handleChange1}
        />
      </label>
      <br />
      <label>
        Buyer Company GST No:
        <input
          type="text"
          name="buyerdetails.buyercompanygstno"
          value={formData.buyerdetails?.buyercompanygstno || ''}
          onChange={handleChange1}
        />
      </label>
      <br />
      <label>
        Buyer Company Address:
        <input
          type="text"
          name="buyerdetails.buyercompanyaddress"
          value={formData.buyerdetails?.buyercompanyaddress || ''}
          onChange={handleChange1}
        />
      </label>
      <br />
      <label>
        Buyer Company State Name:
        <input
          type="text"
          name="buyerdetails.buyercompanystatename"
          value={formData.buyerdetails?.buyercompanystatename || ''}
          onChange={handleChange1}
        />
      </label>
      <br />
      <label>
        Buyer Company State Code:
        <input
          type="text"
          name="buyerdetails.buyercompanystatecode"
          value={formData.buyerdetails?.buyercompanystatecode || ''}
          onChange={handleChange1}
        />
      </label>
      

      <br />
      <br />
      <hr />
        {/* Seller Select */}
        <label>
      Consignee:
        <select
          name="sellerdetails.sellercompanyname"
          value={formData.sellerdetails?.sellercompanyname || ''}
          onChange={handleChange1}
        >
          <option value="">Select Consignee</option>
          {sellers.map((seller) => (
            <option key={seller.id} value={seller.sellercompanyname}>
              {seller.sellercompanyname}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
      Consignee Company Name
        <input
          type="text"
          name="sellerdetails.sellercompanyname"
          value={formData.sellerdetails?.sellercompanyname || ''}
          onChange={handleChange1}
        />
      </label>
      <br />
      <label>
      Consignee Company GST No
        <input
          type="text"
          name="sellerdetails.sellercompanygstno"
          value={formData.sellerdetails?.sellercompanygstno || ''}
          onChange={handleChange1}
        />
      </label>
      <br />
      <label>
      Consignee Company Address
        <input
          type="text"
          name="sellerdetails.sellercompanyaddress"
          value={formData.sellerdetails?.sellercompanyaddress || ''}
          onChange={handleChange1}
        />
      </label>
      <br />
      <label>
      Consignee Company State Name
        <input
          type="text"
          name="sellerdetails.sellercompanystatenames" 
          value={formData.sellerdetails?.sellercompanystatename || ''}
          onChange={handleChange1}
        />
      </label>
      <br />
      <label>
      Consignee Company State Code
        <input
          type="text"
          name="sellerdetails.sellercompanystatecode"
          value={formData.sellerdetails?.sellercompanystatecode || ''}
          onChange={handleChange1}
        />
      </label>
<br />
<br />
<hr />
{/* VEHICLE DETAILS */}
<label>
        Driver Number:
        <input
          type="number"
          name="vehicledetails.drivernumber"
          value={formData.vehicledetails?.drivernumber || ''}
          onChange={handleChange2}
        />
      </label>
      <br />
      <label>
        Vehicle Number:
        <input
          type="text"
          name="vehicledetails.vechiclenumber"
          value={formData.vehicledetails?.vechiclenumber || ''}
          onChange={handleChange2}
        />
      </label>
      <br />
      <label>
        Vehicle Model :
        <input
          type="text"
          name="vehicledetails.vechiclemodel"
          value={formData.vehicledetails?.vechiclemodel || ''}
          onChange={handleChange2}
        />
      </label>

<br />
<br />
<hr />
{/* Consignment Details */}
      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Item Description</th>
            <th>Item Quantity</th>
            <th>Item HSN</th>
            <th>Item Price</th>
            <th>Item Tax Rate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {formData.consignmentdetails?.itemdetails.map((consignment, index) => (
            <tr key={index}>
              <td>
                {index === editingIndex ? (
                  <select
                    name="itemname"
                    value={editedValues.itemname || ''}
                    onChange={handleChange}
                  >
                    <option value="">Select Item</option>
                    {consignments.map((item) => (
                      <option key={item.id} value={item.itemname}>
                        {item.itemname}
                      </option>
                    ))}
                  </select>
                ) : (
                  consignment.itemname
                )}
              </td>
              <td>{index === editingIndex ? <input type="text" name="itemdesc" value={editedValues.itemdesc || ''} onChange={handleChange} /> : consignment.itemdesc}</td>
              <td>{index === editingIndex ? <input type="text" name="itemquantity" value={editedValues.itemquantity || ''} onChange={handleChange} /> : consignment.itemquantity}</td>
              <td>{index === editingIndex ? <input type="text" name="itemhsn" value={editedValues.itemhsn || ''} onChange={handleChange} /> : consignment.itemhsn}</td>
              <td>{index === editingIndex ? <input type="text" name="itemprice" value={editedValues.itemprice || ''} onChange={handleChange} /> : consignment.itemprice}</td>
              <td>{index === editingIndex ? <input type="text" name="itemtaxrate" value={editedValues.itemtaxrate || ''} onChange={handleChange} /> : consignment.itemtaxrate}</td>
              <td>
                {index === editingIndex ? (
                  <>
                    <button type="button" onClick={handleUpdateConsignment} disabled={!isFormValid}>Update</button>
                    <button type="button" onClick={handleCancelConsignment} disabled={!isFormValid}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button type="button" onClick={() => handleEditConsignment(index)}>Edit</button>
                    <button type="button" onClick={() => handleDeleteConsignment(index)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" onClick={handleAddConsignment}>Add</button>

      <br />
      <br />
      <hr />
      { /* Invoice Details */}
      <label>
        Invoice Id
        <input  
          type="text"
          name="invoicedetails.invoiceid"
          value={formData.invoicedetails?.invoiceid || ''}
          onChange={handleChange3}
        />
      </label>
      <br />
      <label>
        Invoice Date
        <input  
          type="date"
          name="invoicedetails.invoicedate"
          value={formattedDate}
          onChange={handleChange3}
        />
      </label>
      <br />
      <br />
      <hr />
      { /* BOARDING DETAILS */}
      <label>
  Load:
  <select
    name="loadingdetails.startstate"
    value={formData.loadingdetails?.startstate || ''}
    onChange={handleChange1}
  >
    <option value="">Select Load</option>
    {loads.map((load) => (
      <option key={load.id} value={load.startstate}>
        {load.startstate}
      </option>
    ))}
  </select>
</label>
<br />
<label>
  Start State :
  <input
    type="text"
    name="loadingdetails.startstate"
    value={formData.loadingdetails?.startstate || ''}
    onChange={handleChange1}
  />
</label>
<br />
<label>
  End State :
  <input
    type="text"
    name="loadingdetails.endstate"
    value={formData.loadingdetails?.endstate || ''}
    onChange={handleChange1}
  />
</label>
<br />
<label>
  Start Point:
  <input
    type="text"
    name="loadingdetails.startpoint"
    value={formData.loadingdetails?.startpoint || ''}
    onChange={handleChange3}
  />
</label>
<br />
<label>
  End Point:
  <input
    type="text"
    name="loadingdetails.endpoint"
    value={formData.loadingdetails?.endpoint || ''}
    onChange={handleChange3}
  />
</label>

<br />
<br />
<hr />
<label>
  Party:
  <select
    name="boardingdetails.partyname"
    value={formData.boardingdetails?.partyname || ''}
    onChange={handleChange1}
  >
    <option value="">Select Party</option>
    {parties.map((party) => (
      <option key={party.id} value={party.partyname}>
        {party.partyname}
      </option>
    ))}
  </select>
</label>
<br />
<label>
  Party Name:
  <input
    type="text"
    name="boardingdetails.partyname"
    value={formData.boardingdetails?.partyname || ''}
    onChange={handleChange1}
  />
</label>

<br />
<label>
  Party Ref No:
  <input
    type="text"
    name="boardingdetails.partyrefno"
    value={formData.boardingdetails?.partyref || ''}
    onChange={handleChange1}
  />
</label>
<br />
<label>
  Party Name:
  <input
    type="text"
    name="boardingdetails.partyrate"
    value={formData.boardingdetails?.partyrate || ''}
    onChange={handleChange1}
  />
</label>
<br />
      <label>
        Date of Loading
        <input  
          type="date"
          name="boardingdetails.dateofloading"
          value={formattedDate1}
          onChange={handleChange3}
        />
      </label>
      <br />
      <br />
      <hr />

      <button type="submit">Update Invoice</button>
    </form>


  );
};

export default UserEditInvoice;
