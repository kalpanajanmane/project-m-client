import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import copy from 'clipboard-copy';
import './UserInvoiceManage.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StaffInvoiceAccordion = ({ invoice, code, pdfUrl, preSignedUrl }) => {
	const [isAccordionOpen, setAccordionOpen] = useState(false);
	const navigate = useNavigate();
	const API = process.env.REACT_APP_API;
	const selectedInvoiceId = invoice;
	const selectedCode = code;
	const selectedPdfUrl = pdfUrl;
	const selectedPreSignedUrll = preSignedUrl;
	 const [shortenedUrl, setShortenedUrl] = useState('');
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

	const handleOriginalCopy = async () => {
    const requestData = {
      url: selectedPreSignedUrll,
      workspace_id: 174477
    };

    const options = {
      method: 'POST',
      url: 'https://app.linklyhq.com/api/v1/link?api_key=4Btnug%2B%2B3emlEzFhnm7X8A%3D%3D',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'x-csrf-token': 'HhdcLz0uDScPJw1ZFy4oPH0VMllxNyxozvncbT8BIlj3TMeH2skn9EgE'
      },
      data: requestData
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      const fullUrl = response.data.full_url;
      setShortenedUrl(fullUrl);
      copy(fullUrl);
      toast.success('Link shortened and copied to clipboard!');
    } catch (error) {
      console.error('Error shortening link:', error);
      toast.error('Error shortening link. Please try again.');
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
					...
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

export default StaffInvoiceAccordion;
