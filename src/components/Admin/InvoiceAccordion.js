import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import copy from 'clipboard-copy';
import './AdminInvoiceManager.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const InvoiceAccordion = ({ invoice, code, pdfUrl }) => {
	const [isAccordionOpen, setAccordionOpen] = useState(false);
	const navigate = useNavigate();
	const API = process.env.REACT_APP_API;
	const selectedInvoiceId = invoice;
	const selectedCode = code;
	const selectedPdfUrl = pdfUrl;
	// console.log(selectedPdfUrl);

	const pdfUrlOriginal = `${API}download/${selectedInvoiceId}`;
	const ViewURLOriginal = `https://docs.google.com/viewer?url=${encodeURIComponent(
		pdfUrlOriginal
	)}&embedded=true`;

	const toggleAccordion = () => {
		setAccordionOpen(!isAccordionOpen);
	};
	// const pdfUrl = `${selectedInvoiceId}`;

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

	const handleView = () => {
		window.open(selectedPdfUrl);
	};

	// const handleInvoiceDownload = () => {
	// 	// window.location = `${API}download/${selectedInvoiceId}`;
	// };

	const handleOriginalCopy = () => {
		const linkToCopy = `${selectedPdfUrl}`;
		try {
			copy(linkToCopy);
			// alert('Link copied to clipboard!');
			toast.success('Link copied to clipboard!');
		} catch (error) {
			console.error('Unable to copy to clipboard.', error);
			// alert('Error copying to clipboard. Please try again.');
			toast.error('Error copying to clipboard. Please try again.');
		}
	};

	const handleCodeCopy = () => {
		const code = selectedCode;
		const linkToCopy = `${code}`;
		try {
			copy(linkToCopy);
			// alert('Code copied to clipboard!');
			toast.success('Code copied to clipboard!');
		} catch (error) {
			console.error('Unable to copy to clipboard.', error);
			// alert('Error copying to clipboard. Please try again.');
			toast.error('Error copying to clipboard. Please try again.');
		}
	};

	return (
		<div>
			<div>
				<button
					onClick={toggleAccordion}
					className='invoice-management-data-body-table-data-button'
				>
					View
					{isAccordionOpen && (
						<div className='accordion-popover'>
							<div className='modal-btn-div-pdf-inv'>
								<button
									type='button'
									className='modal-btn-inv'
									onClick={handleView}
								>
									View Invoice
								</button>
								{/* <button className='modal-btn-inv' onClick={handleInvoiceDownload}>
								Download
							</button> */}
								<button className='modal-btn-inv' onClick={handleOriginalCopy}>
									Copy Link
								</button>
								<button className='modal-btn-inv' onClick={handleCodeCopy}>
									Copy Code
								</button>
							</div>
						</div>
					)}
				</button>
			</div>
		</div>
	);
};

export default InvoiceAccordion;
