import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminInvoiceManager.css';
import background from '../images/Desktop.png';
// import ReactPaginate from 'react-paginate';
import AdminNavbar from './AdminNavbar';
// import PdfViewer from './AdminInvoiceView';
// import Modal from 'react-modal';
// import { useNavigate } from 'react-router-dom';
// import Close from '../images/cross_icon.jpg';
// import copy from 'clipboard-copy';
import AdminInvoiceAccordion from './AdminInvoiceAccordion';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function formatDate(date) {
	const day = date.getDate().toString().padStart(2, '0');
	const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
	const year = date.getFullYear();

	// return `${day}/${month}/${year}`;
	return `${year}/${month}/${day}`;
}

function AdminInvoiceManagement() {
	// const navigate = useNavigate();
	const [invoice, setInvoice] = useState([]);
	// const [pageNumber, setPageNumber] = useState(0);
	// const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
	const [searchInput, setSearchInput] = useState('');

	// Get today's date in the format "YYYY-MM-DD"
	const today = new Date().toISOString().split('T')[0];
	const [startDate, setStartDate] = useState(today);

	// const [loading, setLoading] = useState(true); // State to manage loading status

	const API = process.env.REACT_APP_API;
	// const pdfUrlOriginal = `${API}download/${selectedInvoiceId}`;
	// const pdfUrlDuplicate = `${API}download2/${selectedInvoiceId}`;
	// const ViewURLOriginal = `https://docs.google.com/viewer?url=${encodeURIComponent(
	// 	pdfUrlOriginal
	// )}&embedded=true`;
	// const ViewURLDuplicate = `https://docs.google.com/viewer?url=${encodeURIComponent(
	// 	pdfUrlDuplicate
	// )}&embedded=true`;
	// const itemsPerPage = 10;

	const sortedInvoice = [...invoice].reverse();
	const displayedInvoiceSearch = sortedInvoice
		.filter((item) => {
			// const invoiceNo = item.invoicedetails?.invoiceno || '';
			// const companyName = item.companydetails?.companyname || '';
			const vehicleNumber = item.vehicledetails?.vechiclenumber || '';

			// Check if the search criteria is null or cannot be converted to lowercase
			if (
				// (invoiceNo &&
				// 	invoiceNo.toLowerCase().includes(searchInput?.toLowerCase() ?? '')) ||
				// (companyName &&
				// 	companyName.toLowerCase().includes(searchInput?.toLowerCase() ?? '')) ||
				vehicleNumber &&
				vehicleNumber.toLowerCase().includes(searchInput?.toLowerCase() ?? '')
			) {
				return true;
			}

			return false;
		})
		.filter((item) => {
			const itemDate = new Date(item.invoicedetails.invoicedate);
			const itemDate_format = formatDate(itemDate);

			// Check if startDate and endDate are valid date strings
			const isStartDateValid =
				startDate !== '' && !isNaN(new Date(startDate).getTime());

			if (
				(isStartDateValid &&
					itemDate_format === formatDate(new Date(startDate))) ||
				!isStartDateValid
			) {
				return true;
			}
			return false;
		})
		.map((item) => {
			// const toDate = endDate ? new Date(endDate) : null;

			// if (toDate) {
			// 	toDate.setDate(toDate.getDate() + 1);
			// }

			return {
				...item,
				fromDate: startDate || null,
				// toDate: toDate || null,
			};
		});
	// 	.slice(pageNumber * itemsPerPage, (pageNumber + 1) * itemsPerPage);

	// const pageCount = Math.ceil(sortedInvoice.length / itemsPerPage);

	// const changePage = ({ selected }) => {
	// 	setPageNumber(selected);
	// };

	const handleFromDateSelect = (e) => {
		const selectedFromDate = e.target.value;
		setStartDate(selectedFromDate);
		// console.log(selectedFromDate);
	};

	useEffect(() => {
		axios
			.get(`${API}invoice`)
			.then((response) => {
				setInvoice(response.data);
				// Simulate a loading time of 2 seconds
				// setTimeout(() => {
				// 	setLoading(false); // Set loading to false after 2 seconds
				// }, 2000);
			})
			.catch((error) => {
				console.error('Error fetching Invoice data:', error);
			});
	}, [API]);

	return (
		<div
			style={{
				backgroundImage: `url(${background})`,
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat',
				minHeight: '100vh',
			}}
		>
			<AdminNavbar />
			<div className='invoice-management'>
				<div className='invoice-management-data'>
					<div className='invoice-management-data-header'>
						All Invoice
						<input
							type='text'
							placeholder='Search Invoice Vehicle Number...'
							className='invoice-manage-search-input'
							value={searchInput}
							onChange={(e) => setSearchInput(e.target.value)}
						/>
						<label className='date-label-inv'>Date : </label>
						<input
							className='date-select-inv'
							type='date'
							value={startDate}
							onChange={handleFromDateSelect}
						/>
						{/* {loading && <div>Loading...</div>}  */}
					</div>
					<div className='invoice-management-data-body'>
						<table className='invoice-management-data-body-table'>
							<thead className='invoice-management-data-body-table-row-head'>
								<tr className='invoice-management-data-body-table-row'>
									<th className='invoice-management-data-body-table-header'>
										Sl
									</th>
									<th className='invoice-management-data-body-table-header'>
										Invoice No
									</th>
									<th className='invoice-management-data-body-table-header'>
										Company Name
									</th>
									<th className='invoice-management-data-body-table-header'>
										Invoice Date
									</th>
									<th className='invoice-management-data-body-table-header'>
										Vehicle Number
									</th>
									<th className='invoice-management-data-body-table-header'>
										Transportation Cost
									</th>
									<th className='invoice-management-data-body-table-header'>
										Code
									</th>
									<th className='invoice-management-data-body-table-header'>
										Action
									</th>
								</tr>
							</thead>
							<tbody className='invoice-management-data-body-table-row-body'>
								{displayedInvoiceSearch.map((invoice, idx) => (
									<tr
										key={invoice._id}
										className='invoice-management-data-body-table-row'
									>
										<td className='invoice-management-data-body-table-data'>
											{idx + 1}
										</td>
										<td className='invoice-management-data-body-table-data'>
											{invoice.invoicedetails.invoiceno ?? 'N/A'}
										</td>
										<td className='invoice-management-data-body-table-data'>
											{invoice.companydetails?.companyname?.substring(0, 12) ??
												'N/A'}
										</td>

										<td className='invoice-management-data-body-table-data'>
											{invoice.invoicedetails.invoicedate
												? new Date(
														invoice.invoicedetails.invoicedate
												  ).toLocaleDateString('en-GB', {
														day: '2-digit',
														month: '2-digit',
														year: 'numeric',
												  })
												: 'N/A'}
										</td>

										<td className='invoice-management-data-body-table-data'>
											{invoice.vehicledetails?.vechiclenumber?.substring(
												0,
												12
											) ?? 'N/A'}
										</td>
										<td className='invoice-management-data-body-table-data'>
											{invoice.boardingdetails?.partyrate
												? invoice.boardingdetails.partyrate
												: 'N/A'}
										</td>
										<td className='invoice-management-data-body-table-data'>
											{invoice
												? invoice.vehicledetails.drivernumber +
												  ' ' +
												  invoice.buyerdetails.buyercompanyname.slice(0, 8) +
												  ' ' +
												  invoice.loadingdetails.endpoint.toUpperCase() +
												  ' ' +
												  invoice.boardingdetails.partyref.toUpperCase() +
												  ' ' +
												  invoice.loadingdetails.startpoint.toUpperCase() +
												  ' ' +
												  invoice.vehicledetails?.vechiclenumber
														.replace(/\s/g, '')
														.slice(-4)
												: 'N/A'}
										</td>

										<td className='invoice-management-data-body-table-data'>
											{/* <button
												onClick={() => ViewInvoice(invoice._id)}
												className='invoice-management-data-body-table-data-button'
											>
												View
											</button> */}
											<AdminInvoiceAccordion
												invoice={invoice._id}
												pdfUrl={invoice.pdfUrl}
												preSignedUrl={invoice.preSignedUrl}
												code={
													invoice.vehicledetails.drivernumber +
													' ' +
													invoice.buyerdetails.buyercompanyname +
													' ' +
													invoice.loadingdetails.endpoint.toUpperCase() +
													' ' +
													invoice.boardingdetails.partyref.toUpperCase() +
													' ' +
													invoice.loadingdetails.startpoint.toUpperCase() +
													' ' +
													invoice.vehicledetails?.vechiclenumber
														.replace(/\s/g, '')
														.slice(-4)
												}
											/>
										</td>
									</tr>
								))}
							</tbody>
						</table>

						{/* <ReactPaginate
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
						/> */}
					</div>
				</div>
			</div>
			<ToastContainer position='top-right' autoClose={1500} />
		</div>
	);
}

export default AdminInvoiceManagement;
