import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import copy from 'clipboard-copy';
import './AdminInvoiceManager.css';
// import Close from 'path/to/close-icon'; // Update the path to your close icon

const InvoiceAccordion = ({ invoice, code }) => {
	const [isAccordionOpen, setAccordionOpen] = useState(false);
	const navigate = useNavigate();
	const API = process.env.REACT_APP_API;
	const selectedInvoiceId = invoice;
	const selectedCode = code;

	const pdfUrlOriginal = `${API}download/${selectedInvoiceId}`;
	const ViewURLOriginal = `https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrlOriginal)}&embedded=true`;

	const toggleAccordion = () => {
		setAccordionOpen(!isAccordionOpen);
	};

	const handleOriginalInvoice = () => {
		const expirationTimestamp = Date.now() + 5 * 24 * 60 * 60 * 1000;
		const id = selectedInvoiceId;
		console.log(`${API}/download/${id}`);
		const pdfUrl = `${id}/${expirationTimestamp}`;
		// Assuming 'navigate' is a function for navigating in your application
		// You may need to replace it with the appropriate navigation logic
		navigate(`/pdf/${pdfUrl}`);
		console.log('Handling Original Invoice');
	};

	const handleOriginalCopy = () => {
		const linkToCopy = `${ViewURLOriginal}`;
		try {
			copy(linkToCopy);
			alert('Link copied to clipboard!');
			// toast.success('Link copied to clipboard!');
		} catch (error) {
			console.error('Unable to copy to clipboard.', error);
			alert('Error copying to clipboard. Please try again.');
			// toast.error('Error copying to clipboard. Please try again.');
		}
	};

	const handleCodeCopy = () => {
		const code = selectedCode;
		const linkToCopy = `${code}`;
		try {
			copy(linkToCopy);
			alert('Code copied to clipboard!');
			// toast.success('Link copied to clipboard!');
		} catch (error) {
			console.error('Unable to copy to clipboard.', error);
			alert('Error copying to clipboard. Please try again.');
			// toast.error('Error copying to clipboard. Please try again.');
		}
	};

	return (
		<div>
			<button
				onClick={toggleAccordion}
				className='invoice-management-data-body-table-data-button'
			>
				View
				{isAccordionOpen && (
					<div className='accordion-popover'>
						<div className='modal-btn-div-pdf-inv'>
							<button className='modal-btn-inv' onClick={handleOriginalInvoice}>
								View Invoice
							</button>
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
			{/* {isAccordionOpen && (
				<div className='accordion-popover'>
					<div className='modal-btn-div-pdf-inv'>
						<button className='modal-btn-inv' onClick={handleOriginalInvoice}>
							View Original Invoice
						</button>
						<button className='modal-btn-inv' onClick={handleOriginalCopy}>
							Copy Link
						</button>
					</div>
				</div>
			)} */}
		</div>
	);
};

export default InvoiceAccordion;
