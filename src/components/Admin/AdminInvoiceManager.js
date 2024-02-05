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
import InvoiceAccordion from './InvoiceAccordion';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminInvoiceManagement() {
	// const navigate = useNavigate();
	const [invoice, setInvoice] = useState([]);
	// const [pageNumber, setPageNumber] = useState(0);
	// const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
	const [searchInput, setSearchInput] = useState('');

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
	const displayedInvoiceSearch = sortedInvoice.filter((item) => {
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
	});
	// 	.slice(pageNumber * itemsPerPage, (pageNumber + 1) * itemsPerPage);

	// const pageCount = Math.ceil(sortedInvoice.length / itemsPerPage);

	// const changePage = ({ selected }) => {
	// 	setPageNumber(selected);
	// };
	// const [isModalOpen, setIsModalOpen] = useState(false);
	// const [isAccordionOpen, setAccordionOpen] = useState(false);
	// const [selectedOption, setSelectedOption] = useState('Original');

	// const openPdfViewer = () => {
	// 	setAccordionOpen(!isAccordionOpen);
	// };

	// const closePdfViewer = () => {
	// 	setIsModalOpen(false);
	// };

	// const handleOptionChange = (event) => {
	// 	setSelectedOption(event.target.value);
	// };

	// const handleCopy = () => {
	// 	closePdfViewer();
	// };

	// const handleCopy = () => {
	// 	if (selectedOption === 'Original') {
	// 		handleOriginalCopy();
	// 	} else {
	// 		handleDuplicateCopy();
	// 	}
	// };

	// const handleOriginalCopy = () => {
	// 	const expirationTimestamp = Date.now() + 5 * 24 * 60 * 60 * 1000;
	// 	const id = selectedInvoiceId;
	// 	console.log(`${API}/download/${id}`);
	// 	const pdfUrl = `${id}/${expirationTimestamp}`;

	// 	console.log('Handling Original Invoice Copy');
	// 	const linkToCopy = `${ViewURLOriginal}`;
	// 	try {
	// 		copy(linkToCopy);
	// 		alert('Link copied to clipboard!');
	// 		// toast.success('Link copied to clipboard!');
	// 	} catch (error) {
	// 		console.error('Unable to copy to clipboard.', error);
	// 		alert('Error copying to clipboard. Please try again.');
	// 		// toast.error('Error copying to clipboard. Please try again.');
	// 	}
	// };

	// const handleDuplicateCopy = () => {
	// 	const expirationTimestamp = Date.now() + 5 * 24 * 60 * 60 * 1000;
	// 	const id = selectedInvoiceId;
	// 	console.log(`${API}/download/${id}`);
	// 	const pdfUrl = `${id}/${expirationTimestamp}`;

	// 	console.log('Handling Original Invoice Copy');
	// 	const linkToCopy = `${ViewURLDuplicate}`;

	// 	try {
	// 		copy(linkToCopy);
	// 		alert('Link copied to clipboard!');
	// 		// toast.success('Link copied to clipboard!');
	// 	} catch (error) {
	// 		console.error('Unable to copy to clipboard.', error);
	// 		alert('Error copying to clipboard. Please try again.');
	// 		// toast.error('Error copying to clipboard. Please try again.');
	// 	}
	// };

	// const ViewInvoice = (invoiceid) => {
	// 	setSelectedInvoiceId(invoiceid);
	// 	openPdfViewer();
	// };

	// const handleInvoiceChoice = () => {
	// 	if (selectedOption === 'Original') {
	// 		handleOriginalInvoice();
	// 	} else {
	// 		handleDuplicateInvoice();
	// 	}
	// 	closePdfViewer();
	// };

	// const handleOriginalInvoice = () => {
	// 	const expirationTimestamp = Date.now() + 5 * 24 * 60 * 60 * 1000;
	// 	const id = selectedInvoiceId;
	// 	console.log(`${API}/download/${id}`);
	// 	const pdfUrl = `${id}/${expirationTimestamp}`;
	// 	// Assuming 'navigate' is a function for navigating in your application
	// 	// You may need to replace it with the appropriate navigation logic
	// 	navigate(`/pdf/${pdfUrl}`);
	// 	console.log('Handling Original Invoice');
	// };

	// const handleDuplicateInvoice = () => {
	// 	const expirationTimestamp = Date.now() + 5 * 24 * 60 * 60 * 1000;
	// 	const id = selectedInvoiceId;
	// 	console.log(`${API}/download2/${id}`);
	// 	const pdfUrl = `${id}/${expirationTimestamp}`;
	// 	// Assuming 'navigate' is a function for navigating in your application
	// 	// You may need to replace it with the appropriate navigation logic
	// 	navigate(`/pdf2/${pdfUrl}`);
	// 	console.log('Handling Duplicate Invoice');
	// };

	// const PrintInvoice = (invoiceid) => {
	// 	setSelectedInvoiceId(invoiceid);
	// 	if (selectedInvoiceId) {
	// 		window.location = ${API}download/${selectedInvoiceId};
	// 	}
	// };

	useEffect(() => {
		axios
			.get(`${API}invoice`)
			.then((response) => {
				setInvoice(response.data);
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
											{invoice.invoicedetails.invoiceno?.substring(0, 12) ??
												'N/A'}
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
											{invoice.loadingdetails?.transportationcost
												? invoice.loadingdetails.transportationcost
												: 'N/A'}
										</td>
										<td className='invoice-management-data-body-table-data'>
											{invoice
												? invoice.vehicledetails.drivernumber +
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
											<InvoiceAccordion
												invoice={invoice._id}
												pdfUrl={invoice.pdfUrl}
												code={
													invoice.vehicledetails.drivernumber +
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
											{/* {isAccordionOpen && (
												<div className='accordion-popover'>
													<div className='modal-content-invoice'>
														<div className='modal-btn-div-pdf-invoice'>
															<div style={{ display: 'flex', gap: '30px' }}>
																<button
																	className='modal-btn-invoice'
																	onClick={handleOriginalInvoice}
																>
																	View Original Invoice
																</button>
																<button
																	className='modal-btn-invoice'
																	onClick={handleOriginalCopy}
																>
																	Copy Link
																</button>
															</div>
														</div>
													</div>
												</div>
											)} */}
											{/* {isModalOpen && (
												<div className='modal'>
													<div className='modal-content'>
														<img
															src={Close}
															alt='Close'
															className='close-modal'
															onClick={() => closePdfViewer()}
														/>
														<div className='modal-btn-div-pdf'>
															<div style={{ display: 'flex', gap: '30px' }}>
																<button
																	className='modal-btn'
																	onClick={handleOriginalInvoice}
																>
																	View Original Invoice
																</button>
																<button
																	className='modal-btn'
																	onClick={handleOriginalCopy}
																>
																	Copy Link
																</button>
															</div>
														</div>
													</div>
												</div>
											)} */}
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
			<ToastContainer position='top-right' autoClose={1000} />
		</div>
	);
}

export default AdminInvoiceManagement;
