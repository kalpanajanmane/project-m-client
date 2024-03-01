import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserEditInvoice.css";
import { useParams } from "react-router-dom";
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
          setError("Invoice not found");
          setLoading(false);
        }
      } catch (error) {
        setError("Error retrieving invoice data");
        setLoading(false);
      }
    };
    fetchInvoice();
  }, [id, API]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Split the name into nested levels
    const nameParts = name.split(".");

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
      if (!dateString) return ""; // Handle empty or undefined date strings
      const date = new Date(dateString);
      // Check if the date is valid
      if (isNaN(date.getTime())) {
        throw new Error("Invalid date");
      }
      return dateString.split("T")[0]; // Extract yyyy-MM-dd
    } catch (error) {
      console.error("Error formatting date:", error);
      return ""; // Return empty string in case of error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API}invoice/${id}`, formData);
      alert("Update invoice successful");
      navigate("/userinman");
      // Handle successful update (e.g., show a success message)
    } catch (error) {
      // Handle error (e.g., display an error message)
      console.error("Error updating invoice:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1 className="admin-create-invoice-title">Edit INVOICE</h1>
      <form className="admin-create-invoice-form-all" onSubmit={handleSubmit}>
        <div className="admin-create-invoice-container">
          <div className="admin-create-invoice-data">
            <h2 className="admin-create-invoice-subtitle">COMPANY DETAILS</h2>
          </div>
          <div className="admin-create-invoice-form">
            <div className="admin-create-invoice-form-div">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label
                  className="admin-create-invoice-form-label"
                  htmlFor="companyname"
                >
                  Company Name
                </label>
                <input
                  className="admin-create-invoice-form-input"
                  type="text"
                  name="sellerdetails.sellercompanyname"
                  value={formData.sellerdetails?.sellercompanyname || ""}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="admin-create-invoice-form-div">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label
                  className="admin-create-invoice-form-label"
                  htmlFor="companygstno"
                >
                  Company GST No.
                </label>
                <input
                  className="admin-create-invoice-form-input"
                  type="text"
                  name="sellerdetails.sellercompanygstno"
                  value={formData.sellerdetails?.sellercompanygstno || ""}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="admin-create-invoice-form-div">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label
                  className="admin-create-invoice-form-label"
                  htmlFor="companystate"
                >
                  Company State
                </label>
                <input
                  className="admin-create-invoice-form-input"
                  type="text"
                  name="companydetails.companystate"
                  value={formData.companydetails?.companystate || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="admin-create-invoice-form-div">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label
                  className="admin-create-invoice-form-label"
                  htmlFor="companyofficeaddress"
                >
                  Company Office Address
                </label>
                <input
                  className="admin-create-invoice-form-input"
                  type="text"
                  name="companydetails.companyofficeaddress"
                  value={formData.companydetails?.companyofficeaddress || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="admin-create-invoice-form-div">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label
                  className="admin-create-invoice-form-label"
                  htmlFor="companypincode"
                >
                  Company State Code
                </label>
                <input
                  className="admin-create-invoice-form-input"
                  type="text"
                  name="companydetails.companypincode"
                  value={formData.companydetails?.companypincode || ""}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* <div className='admin-create-invoice-form-div'>
							<div style={{ display: 'flex', flexDirection: 'column' }}>
								<label
									className='admin-create-invoice-form-label'
									htmlFor='companycontact'
								>
									Company Contact
								</label>
								 <input
    className='admin-create-invoice-form-input'
      type="text"
      name="companydetails.companycontact"
      value={formData.companydetails?.companycontact || ''}
      onChange={handleChange}
    />
							</div>
						</div> */}
          </div>
          <div className="admin-create-invoice-data">
            <h2 className="admin-create-invoice-subtitle">BUYER DETAILS</h2>
          </div>
          <div className="admin-create-invoice-form">
            <div className="admin-create-invoice-form-div">
              <label
                className="admin-create-invoice-form-label"
                htmlFor="buyercompanyname"
              >
                Buyer Company Name
              </label>
              <input
                className="admin-create-invoice-form-input"
                type="text"
                name="buyerdetails.buyercompanyname"
                value={formData.buyerdetails?.buyercompanyname || ""}
                onChange={handleChange}
              />
            </div>
            <div className="admin-create-invoice-form-div">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label
                  className="admin-create-invoice-form-label"
                  htmlFor="buyercompanyaddress"
                >
                  Buyer Company Address
                </label>
                <input
                  className="admin-create-invoice-form-input"
                  type="text"
                  name="buyerdetails.buyercompanyaddress"
                  value={formData.buyerdetails?.buyercompanyaddress || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="admin-create-invoice-form-div">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label
                  className="admin-create-invoice-form-label"
                  htmlFor="buyercompanygstno"
                >
                  Buyer GST No
                </label>
                <input
                  className="admin-create-invoice-form-input"
                  type="text"
                  name="buyerdetails.buyercompanygstno"
                  value={formData.buyerdetails?.buyercompanygstno || ""}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="admin-create-invoice-form-div">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label
                  className="admin-create-invoice-form-label"
                  htmlFor="buyercompanystatename"
                >
                  Buyer Company State Name
                </label>
                <input
                  className="admin-create-invoice-form-input"
                  type="text"
                  name="buyerdetails.buyercompanystatename"
                  value={formData.buyerdetails?.buyercompanystatename || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="admin-create-invoice-form-div">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label
                  className="admin-create-invoice-form-label"
                  htmlFor="buyercompanystatecode"
                >
                  Buyer Company State Code
                </label>
                <input
                  className="admin-create-invoice-form-input"
                  type="text"
                  name="buyerdetails.buyercompanystatecode"
                  value={formData.buyerdetails?.buyercompanystatecode || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="admin-create-invoice-data">
            <h2 className="admin-create-invoice-subtitle">CONSIGNEE DETAILS</h2>
          </div>
          <div className="admin-create-invoice-form">
            <div className="admin-create-invoice-form-div">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label
                  className="admin-create-invoice-form-label"
                  htmlFor="sellercompanyname"
                >
                  Consignee Company Name
                </label>
                <input
                  className="admin-create-invoice-form-input"
                  type="text"
                  name="sellerdetails.sellercompanyname"
                  value={formData.sellerdetails?.sellercompanyname || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="admin-create-invoice-form-div">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label
                  className="admin-create-invoice-form-label"
                  htmlFor="sellercompanyaddress"
                >
                  Consignee Company Address
                </label>
                <input
                  className="admin-create-invoice-form-input"
                  type="text"
                  name="sellerdetails.sellercompanyaddress"
                  value={formData.sellerdetails?.sellercompanyaddress || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="admin-create-invoice-form-div">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label
                  className="admin-create-invoice-form-label"
                  htmlFor="buyercompanygstno"
                >
                  Consignee GST No
                </label>
                <input
                  className="admin-create-invoice-form-input"
                  type="text"
                  name="sellerdetails.sellercompanygstno"
                  value={formData.sellerdetails?.sellercompanygstno || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="admin-create-invoice-form-div">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label
                  className="admin-create-invoice-form-label"
                  htmlFor="sellercompanystatename"
                >
                  Consignee Company State Name
                </label>
                <input
                  className="admin-create-invoice-form-input"
                  type="text"
                  name="sellerdetails.sellercompanystatename"
                  value={formData.sellerdetails?.sellercompanystatename || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="admin-create-invoice-form-div">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label
                  className="admin-create-invoice-form-label"
                  htmlFor="sellercompanystatecode"
                >
                  Consignee Company State Code
                </label>
                <input
                  className="admin-create-invoice-form-input"
                  type="text"
                  name="sellerdetails.sellercompanystatecode"
                  value={formData.sellerdetails?.sellercompanystatecode || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="admin-create-invoice-data">
            <h2 className="admin-create-invoice-subtitle">VEHICLE DETAILS</h2>
          </div>
          <div className="admin-create-invoice-form">
            <div className="admin-create-invoice-form-div">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label
                  className="admin-create-invoice-form-label"
                  htmlFor="drivernumber"
                >
                  Driver Mobile Number
                </label>
                <input
                  className="admin-create-invoice-form-input-v"
                  type="number"
                  name="vehicledetails.drivernumber"
                  value={formData.vehicledetails?.drivernumber || ""}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="admin-create-invoice-form-div">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label className="admin-create-invoice-form-label" htmlFor="">
                  Vehicle Number
                </label>
                <input
                  className="admin-create-invoice-form-input-v"
                  type="text"
                  name="vehicledetails.vechiclenumber"
                  value={formData.vehicledetails?.vechiclenumber || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="admin-create-invoice-form-div">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label
                  className="admin-create-invoice-form-label"
                  htmlFor="vechiclemodel"
                >
                  Vehicle Model
                </label>
                <br />
                <input
                  className="admin-create-invoice-form-input-v"
                  type="text"
                  name="vehicledetails.vechiclemodel"
                  value={formData.vehicledetails?.vechiclemodel || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="admin-create-invoice-data">
            <h2 className="admin-create-invoice-subtitle">ITEM DETAILS</h2>
          </div>
          {/* <table className="admin-create-invoice-table-consigment">
            <thead className="admin-create-invoice-table-thead">
              <tr className="admin-create-invoice-table-row-head">
                <th className="admin-create-invoice-table-row-th">Item Name</th>
                <th className="admin-create-invoice-table-row-th">Item Desc</th>
                <th className="admin-create-invoice-table-row-th">
                  Item Quantity
                </th>
                <th className="admin-create-invoice-table-row-th">Item HSN</th>
                <th className="admin-create-invoice-table-row-th">
                  Item Price
                </th>
                <th className="admin-create-invoice-table-row-th">
                  Item Tax Rate
                </th>
              </tr>
            </thead>
            <tbody className="admin-create-invoice-table-tbody">
              <tr className="admin-create-invoice-table-row-body">
                <td className="admin-create-invoice-table-row-body-td">
                  <input
                    className="admin-create-invoice-table-consigment-input"
                    type="text"
                    name={`consignmentdetails.itemdetails[${index}].itemname`}
                    value={item.itemname || ""}
                    onChange={handleChange}
                  />
                </td>
                <td className="admin-create-invoice-table-row-body-td">
                  <input
                    className="admin-create-invoice-table-consigment-input"
                    input
                    type="text"
                    name={`consignmentdetails.itemdetails[${index}].itemdesc`}
                    value={item.itemdesc || ""}
                    onChange={handleChange}
                  />
                </td>
                <td className="admin-create-invoice-table-row-body-td">
                  <input
                    className="admin-create-invoice-table-consigment-input"
                    type="number"
                    name={`consignmentdetails.itemdetails[${index}].itemquantity`}
                    value={item.itemquantity || ""}
                    onChange={handleChange}
                  />
                </td>
                <td className="admin-create-invoice-table-row-body-td">
                  <input
                    className="admin-create-invoice-table-consigment-input"
                    type="text"
                    name={`consignmentdetails.itemdetails[${index}].itemhsn`}
                    value={item.itemhsn || ""}
                    onChange={handleChange}
                  />
                </td>
                <td className="admin-create-invoice-table-row-body-td">
                  <input
                    className="admin-create-invoice-table-consigment-input"
                    type="number"
                    name={`consignmentdetails.itemdetails[${index}].itemprice`}
                    value={item.itemprice || ""}
                    onChange={handleChange}
                  />
                </td>
                <td className="admin-create-invoice-table-row-body-td">
                  <input
                    className="admin-create-invoice-table-consigment-input"
                    type="number"
                    name={`consignmentdetails.itemdetails[${index}].itemtaxrate`}
                    value={item.itemtaxrate || ""}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr className="admin-create-invoice-table-row-subtitle">
                <h3 className="admin-create-invoice-subtitle-table">
                  ADDED ITEMS
                </h3>
              </tr>
              {formData.consignmentdetails?.itemdetails?.map((item, index) => (
                <tr key={index} className="admin-create-invoice-table-row-body">
                  <td className="admin-create-invoice-table-consigment-value">
                    {item.itemname}
                  </td>

                  <td className="admin-create-invoice-table-consigment-value color">
                    {item.itemdesc.substring(0, 10)}
                  </td>
                  <td className="admin-create-invoice-table-consigment-value">
                    {item.itemquantity}
                  </td>
                  <td className="admin-create-invoice-table-consigment-value">
                    {item.itemhsn}
                  </td>
                  <td className="admin-create-invoice-table-consigment-value">
                    {item.itemprice}
                  </td>
                  <td className="admin-create-invoice-table-consigment-value">
                    {item.itemtaxrate}
                  </td>

                  <td className="admin-create-invoice-table-consigment-value">
                    <button
                      className="admin-create-invoice-table-consigment-button"
                      type="button"
                      onClick={() => ConsignmentsRemove(index)}
                    >
                      <img
                        className="admin-create-invoice-table-consigment-icon-low"
                        src={D}
                        alt="delete"
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table> */}
          <div className="admin-create-invoice-data">
            <h2 className="admin-create-invoice-subtitle">INVOICE DETAILS</h2>
          </div>
         	<div className='admin-create-invoice-form'>
						<div className='admin-create-invoice-form-div'>
							<label
								className='admin-create-invoice-form-label'
								htmlFor='invoiceid'
							>
								Invoice ID
							</label>
							<br />
							<input
								className='admin-create-invoice-form-input'
							 type="text"
      name="invoicedetails.invoiceid"
      value={formData.invoicedetails?.invoiceid || ''}
      onChange={handleChange}
							/>
						</div>
						<div className='admin-create-invoice-form-div'>
							<label
								className='admin-create-invoice-form-label'
								htmlFor='invoiceid'
							>
								Invoice Date
							</label>
							<br />
							<input
								className='admin-create-invoice-form-input'
							 type="date"
    name="invoicedetails.invoicedate"
    value={formatDate(formData.invoicedetails?.invoicedate) || ''}
    onChange={handleChange}
							/>
						</div>
					</div>
					<div className='admin-create-invoice-data'>
						<h2 className='admin-create-invoice-subtitle'>BOARDING DETAILS</h2>
						
					</div>
					<div className='admin-create-invoice-form'>
					

						<div className='admin-create-invoice-form-div'>
							
							<label
								className='admin-create-invoice-form-label'
								htmlFor='startstate'
							>
								Start State
							</label>
							<br />
							<input
								className='admin-create-invoice-form-input'
							type="text"
      name="loadingdetails.startstate"
      value={formData.loadingdetails?.startstate || ''}
      onChange={handleChange}
							/>
						
						</div>
						<div className='admin-create-invoice-form-div'>
							
							<label
								className='admin-create-invoice-form-label'
								htmlFor='endstate'
							>
								End State
							</label>
							<br />
							<input
								className='admin-create-invoice-form-input'
								type="text"
      name="loadingdetails.endstate"
      value={formData.loadingdetails?.endstate || ''}
      onChange={handleChange}
							/>
							
						</div>
						<div className='admin-create-invoice-form-div'>
							
							<label
								className='admin-create-invoice-form-label'
								htmlFor='startpoint'
							>
								Start Point
							</label>
							<br />
							<input
								className='admin-create-invoice-form-input'
								 type="text"
      name="loadingdetails.startpoint"
      value={formData.loadingdetails?.startpoint || ''}
      onChange={handleChange}
							/>
							
						</div>
						<div className='admin-create-invoice-form-div'>
							
							<label
								className='admin-create-invoice-form-label'
								htmlFor='endpoint'
							>
								End Point
							</label>
							<br />
							<input
								className='admin-create-invoice-form-input'
								type="text"
      name="loadingdetails.endpoint"
      value={formData.loadingdetails?.endpoint || ''}
      onChange={handleChange}
							/>
							
						</div>
						<div className='admin-create-invoice-form-div'>
							
							<label
								className='admin-create-invoice-form-label'
								htmlFor='Party Ref.'
							>
								Party Ref.
							</label>
							<br />

							<input
								className='admin-create-invoice-form-input-v'
								 type="text"
      name="boardingdetails.partyref"
      value={formData.boardingdetails?.partyref || ''}
      onChange={handleChange}
							/>

							
						</div>
						<div className='admin-create-invoice-form-div'>
							
							<label
								className='admin-create-invoice-form-label'
								htmlFor='transportationcost'
							>
								Transportation Cost
							</label>
							<br />
							<input
								className='admin-create-invoice-form-input'
								 type="text"
    name="loadingdetails.transportationcost"
    value={formData.loadingdetails?.transportationcost || ''}
    onChange={handleChange}
							/>
							
						</div>

						<div className='admin-create-invoice-form-div'>
							<div style={{ display: 'flex', flexDirection: 'column' }}>
								<label
									className='admin-create-invoice-form-label'
									htmlFor='dateofloading'
								>
									Date of Loading
								</label>
								<input
									className='admin-create-invoice-form-input'
									type="date"
    name="boardingdetails.dateofloading"
    value={formatDate(formData.boardingdetails?.dateofloading) || ''}
    onChange={handleChange}
								/>
							</div>
						</div>

					
					</div>
				<div className='admin-create-invoice-data-submit'>
						<button
							type='submit'
							className='admin-create-invoice-button'
							// onClick={handleSubmit}
							// onClick={() => setIsModalOpen(true)}
						>
							UPDATE INVOICE
						</button>
						
							
					</div> 
        </div>
      </form>
    </div>
  );
};

export default UserEditInvoice;
