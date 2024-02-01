import React, { useState, useEffect } from 'react';
import './SellerManage.css'
import axios from 'axios';
import background from '../images/Desktop.png';
import ReactPaginate from 'react-paginate';

function SellerManage() {
  const [sellers, setSellers] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [selectedSellerId, setSelectedSellerId] = useState(null);
  const [selectedSellerData, setSelectedSellerData] = useState({
    sellerid: '',
    sellercompanyname: '',
    sellercompanygstno: '',
    sellercompanyaddress: '',
    sellercompanystatename: '',
    sellercompanystatecode: '',
  });

  const itemsPerPage = 12;
  const pagesVisited = pageNumber * itemsPerPage;

  // Sort the seller array in reverse order (newest first)
  const sortedSellers = [...sellers].reverse();
  const displayedSellers = sortedSellers.slice(pagesVisited, pagesVisited + itemsPerPage);

  const pageCount = Math.ceil(sortedSellers.length / itemsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    axios
      .get('http://localhost:5000/seller')
      .then((response) => {
        setSellers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching seller data:', error);
      });
  }, []);

  const handleSellerUpdate = (sellerUpdateId) => {
    setSelectedSellerId(sellerUpdateId);
    const selectedSeller = sellers.find((seller) => seller._id === sellerUpdateId);
    setSelectedSellerData({ ...selectedSeller });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (selectedSellerId) {
      // Update an existing seller
      axios
        .put(`http://localhost:5000/seller/${selectedSellerId}`, selectedSellerData)
        .then((response) => {
          // Handle successful update (if needed)
          console.log('Seller updated successfully:', response.data);
          // Optionally, you can update the local state to reflect the changes
          setSellers((prevSellers) =>
            prevSellers.map((seller) => (seller._id === selectedSellerId ? response.data : seller))
          );
        })
        .catch((error) => {
          console.error('Error updating seller:', error);
        });
    } else {
      // Create a new seller
      axios
        .post('http://localhost:5000/seller', selectedSellerData)
        .then((response) => {
          // Handle successful creation (if needed)
          console.log('Seller created successfully:', response.data);
          // Optionally, you can update the local state to include the new seller
          setSellers((prevSellers) => [...prevSellers, response.data]);
        })
        .catch((error) => {
          console.error('Error creating seller:', error);
        });
    }

    setSelectedSellerData({
      sellerid: '',
      sellercompanyname: '',
      sellercompanygstno: '',
      sellercompanyaddress: '',
      sellercompanystatename: '',
      sellercompanystatecode: '',
    });

    setSelectedSellerId(null);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
      }}
    >
      <div className='seller-manage'>
        <div className='seller-manage-data'>
          <h1 className='seller-manage-data-title'>ALL SELLERS</h1>
          <table className='seller-manage-data-table'>
  <thead className='seller-manage-data-table-head'>
    <tr className='seller-manage-data-table-row-head'>
      <th className='seller-manage-data-table-header'>Sellers Id</th>
      <th className='seller-manage-data-table-header'>Company Name</th>
      <th className='seller-manage-data-table-header'>GST NO</th>
      <th className='seller-manage-data-table-header'>State Name</th>
      
      <th className='seller-manage-data-table-header'>Action</th>
    </tr>
  </thead>
  <tbody className='seller-manage-data-table-body'>
    {displayedSellers.map((seller) => (
      <tr key={seller._id} className='seller-manage-data-table-row-body'>
        <td className='seller-manage-data-table-data highlight'>{seller.sellerid.substring(0, 12)}</td>
        <td className='seller-manage-data-table-data'>{seller.sellercompanyname.substring(0, 12)}</td>
        <td className='seller-manage-data-table-data'>{seller.sellercompanygstno.substring(0, 12)}</td>
        <td className='seller-manage-data-table-data'>{seller.sellercompanystatename.substring(0, 12)}</td>
        
        <td className='seller-manage-data-table-data'>
          <button
            className='seller-manage-data-table-button'
            onClick={() => handleSellerUpdate(seller._id)}
          >
            Update
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
          <br />
          <ReactPaginate
            className='pagination-container'
            previousLabel='Previous'
            nextLabel='Next'
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName='pagination'
            previousLinkClassName='previous-page'
            nextLinkClassName='next-page'
            disabledClassName='pagination-button disabled'
            activeClassName='pagination-button active'
            pageClassName='pagination-button'
            breakClassName='pagination-space'
          />
        </div>
        <div className='seller-manage-form'>
          <h1 className='seller-manage-form-title'>
            {selectedSellerId ? 'UPDATE SELLER' : 'ADD SELLER'}
          </h1>
          <form className='seller-manage-form-form' onSubmit={handleFormSubmit}>
            <input
              type='text'
              required
              className='seller-manage-form-input'
              placeholder='Seller ID'
              value={selectedSellerData.sellerid || ''}
              onChange={(e) => setSelectedSellerData({ ...selectedSellerData, sellerid: e.target.value })}
            />
            <input
              type='text'
              required
              className='seller-manage-form-input'
              placeholder='Company Name'
              value={selectedSellerData.sellercompanyname || ''}
              onChange={(e) => setSelectedSellerData({ ...selectedSellerData, sellercompanyname: e.target.value })}
            />
            <input
              type='text'
              //required
              className='seller-manage-form-input'
              placeholder='Company GST Number'
              value={selectedSellerData.sellercompanygstno || ''}
              onChange={(e) => setSelectedSellerData({ ...selectedSellerData, sellercompanygstno: e.target.value })}
            />
            <input
              type='text'
              required
              className='seller-manage-form-input'
              placeholder='Company Address'
              value={selectedSellerData.sellercompanyaddress || ''}
              onChange={(e) => setSelectedSellerData({ ...selectedSellerData, sellercompanyaddress: e.target.value })}
            />
            <input
              type='text'
              required
              className='seller-manage-form-input'
              placeholder='Company State Name'
              value={selectedSellerData.sellercompanystatename || ''}
              onChange={(e) => setSelectedSellerData({ ...selectedSellerData, sellercompanystatename: e.target.value })}
            />
            <input
              type='text'
              required
              className='seller-manage-form-input'
              placeholder='Company State Code'
              value={selectedSellerData.sellercompanystatecode || ''}
              onChange={(e) => setSelectedSellerData({ ...selectedSellerData, sellercompanystatecode: e.target.value })}
            />
             <br />
            <input type='checkbox' required className='vechicle-manage-form-input-checkbox' />
            <label className='vechicle-manage-form-input-checkbox-label'>
              By creating an account, you agree with Terms and Conditions & Privacy Policy
            </label>
            <button type='submit' className='seller-manage-form-button'>
              {selectedSellerId ? 'Update' : 'Add'}
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}

export default SellerManage;
