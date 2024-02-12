import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import copy from 'clipboard-copy';
import './AdminInvoiceManager.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const InvoiceAccordion = ({ invoice, code, pdfUrl, preSignedUrl }) => {
	const [isAccordionOpen, setAccordionOpen] = useState(false);
	const navigate = useNavigate();
	const API = process.env.REACT_APP_API;
	const selectedInvoiceId = invoice;
	const selectedCode = code;
	const selectedPdfUrl = pdfUrl;
	const selectedPreSignedUrll = preSignedUrl;
	const [shortenedUrl, setShortenedUrl] = useState('');
	// console.log(selectedPdfUrl);
	const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

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
		if (isMobile) {
			const newWindow = window.open();
			const newIframe = newWindow.document.createElement('iframe');
			newIframe.src = `https://docs.google.com/viewer?url=${selectedPdfUrl}&embedded=true&toolbar=0`;
			newIframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');
			newIframe.style.width = '100%';
			newIframe.style.height = '100%';
			newWindow.document.body.appendChild(newIframe);
		}
		if (!isMobile) {
			window.open(selectedPdfUrl);
		}
	};

	// const handleInvoiceDownload = () => {
	// 	// window.location = `${API}download/${selectedInvoiceId}`;
	// };

	const handleOriginalCopy = async () => {
    try {
        const apiKey = encodeURIComponent('+tRfF6lilDDsaSv2SlTB1A==');
        const csrfToken = encodeURIComponent('dQoAMh4zBVIWHQNgKjo7bSxzGVQVOwQY0r4DZUr9BoT5bJo_y7k7QmGV');
        const workspaceId = 175208;
        const requestData = {
            url: preSignedUrl,
            workspace_id: workspaceId,
            expiry_datetime: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString() // 6 hours from now
        };

        const options = {
            method: 'POST',
            url: `https://app.linklyhq.com/api/v1/link?api_key=${apiKey}`,
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'x-csrf-token': csrfToken
            },
            data: requestData
        };

        const Response = await axios.request(options);
        const shortenedUrl = Response.data.full_url;
        // Copy the shortened URL
        copy(shortenedUrl);
        toast.success('Shortened link copied to clipboard!');
    } catch (error) {
        console.error('Error:', error);
        toast.error('Error generating or copying the shortened link.');
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

	const handleDelete = () => {
		// console.log('delete');
		const confirmDelete = window.confirm(
			"Are you sure, you want to Delete Invoice?\n\nNote: Once deleted can't be recovered..."
		);

		if (confirmDelete) {
			if (confirmDelete) {
				axios
					.delete(`${API}invoice/${selectedInvoiceId}`)
					.then((response) => {
						toast.success('Invoice deleted successfully');
						setTimeout(() => {
							// Reload the page after successful deletion
							window.location.reload();
						}, 2000);
					})
					.catch((error) => {
						console.error('Error deleting invoice:', error);
						toast.error('Error deleting invoice. Please try again.');
					});
				// console.log('deleted');
			}
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
								<button className='modal-btn-inv' onClick={handleDelete}>
									Delete
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
