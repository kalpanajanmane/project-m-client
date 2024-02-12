import React, { useState, useEffect } from 'react';
import './AdminVechicleManage.css';
import './AdminStateManage.css';
import './AdminPartyRefManage.css';
import './AdminBuyerManage.css';
import axios from 'axios';
import background from '../images/Desktop.png';
// import ReactPaginate from 'react-paginate';
import AdminNavbar from './AdminNavbar';
import E from '../images/E.png';
import D from '../images/D.png';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminLoadingManage() {
	const [loadings, setLoadings] = useState([]);
	const [file, setFile] = useState(null);
	// const [pageNumber, setPageNumber] = useState(0);
	const [selectedLoadingId, setSelectedLoadingId] = useState(null);
	const [states, setStates] = useState([]);
	const [parties, setParties] = useState([]);
	const [partiesForDelete, setPartiesForDelete] = useState([]);
	const [selectedStateId, setSelectedStateId] = useState(null);
	const [selectedPartyId, setSelectedPartyId] = useState(null);
	const [selectedParties, setSelectedParties] = useState([]);
	const [isGroupDeleteClicked, setIsGroupDeleteClicked] = useState(false);
	const API = process.env.REACT_APP_API;

	const validationSchema = Yup.object().shape({
		startstate: Yup.string().required('Start State is required'),
		endstate: Yup.string().required('End State is required'),
		// rate: Yup.number()
		// 	.required('Rate is required')
		// 	.positive('Rate must be positive'),
	});

	const stateValidationSchema = Yup.object().shape({
		statename: Yup.string().required('State Name is required'),
		statecode: Yup.string().required('State Code is required'),
	});

	const partyValidationSchema = Yup.object().shape({
		partyname: Yup.string().required('Party Name is required'),
		partyrefno: Yup.string().required('Party Code is required'),
		partyrate: Yup.number()
			.required('Rate is required')
			.positive('Rate must be positive'),
	});

	const formik = useFormik({
		initialValues: {
			startstate: '',
			endstate: '',
			// rate: '',
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			handleFormSubmit(values);
		},
	});

	const stateFormik = useFormik({
		initialValues: {
			statename: '',
			statecode: '',
		},
		stateValidationSchema: stateValidationSchema,
		onSubmit: (values) => {
			handleStateFormSubmit(values);
		},
	});

	const partyFormik = useFormik({
		initialValues: {
			partyname: '',
			partyrefno: '',
			partyrate: '',
		},
		partyValidationSchema: partyValidationSchema,
		onSubmit: (values) => {
			handlePartyFormSubmit(values);
		},
	});

	// const itemsPerPage = 12;
	const [searchInput, setSearchInput] = useState('');
	const [searchStateInput, setSearchStateInput] = useState('');
	const [searchPartyInput, setSearchPartyInput] = useState('');

	const sortedLoadings = [...loadings].reverse();
	const sortedStates = [...states].reverse();
	const sortedParties = [...parties].reverse();
	const displayedLoadingsSearch = sortedLoadings.filter(
		(item) =>
			(item.startstate &&
				item.startstate.toLowerCase().includes(searchInput.toLowerCase())) ||
			(item.endstate &&
				item.endstate.toLowerCase().includes(searchInput.toLowerCase()))
	);
	const displayedStatesSearch = sortedStates.filter(
		(item) =>
			(item.statename &&
				item.statename
					.toLowerCase()
					.includes(searchStateInput.toLowerCase())) ||
			(item.statecode &&
				item.statecode.toLowerCase().includes(searchStateInput.toLowerCase()))
	);
	const displayedPartiesSearch = sortedParties.filter(
		(item) =>
			(item.partyname &&
				item.partyname
					.toLowerCase()
					.includes(searchPartyInput.toLowerCase())) ||
			(item.partyrefno &&
				item.partyrefno.toLowerCase().includes(searchPartyInput.toLowerCase()))
	);
	// 	.slice(pageNumber * itemsPerPage, (pageNumber + 1) * itemsPerPage);

	// const pageCount = Math.ceil(sortedLoadings.length / itemsPerPage);

	// const changePage = ({ selected }) => {
	// 	setPageNumber(selected);
	// };

	useEffect(() => {
		axios
			.get(`${API}load`)
			.then((response) => {
				setLoadings(response.data);
			})
			.catch((error) => {
				console.error('Error fetching loading data:', error);
			});
	}, [API]);
	useEffect(() => {
		axios
			.get(`${API}state`)
			.then((response) => {
				setStates(response.data);
			})
			.catch((error) => {
				console.error('Error fetching state data:', error);
			});
	}, [API]);
	useEffect(() => {
		axios
			.get(`${API}party`)
			.then((response) => {
				setParties(response.data);
			})
			.catch((error) => {
				console.error('Error fetching party data:', error);
			});
	}, [API]);

	const handleLoadingUpdate = (loadingUpdateId) => {
		const selectedLoading = loadings.find(
			(loading) => loading._id === loadingUpdateId
		);
		setSelectedLoadingId(loadingUpdateId);
		formik.setValues({
			startstate: selectedLoading.startstate,
			endstate: selectedLoading.endstate,
			// rate: selectedLoading.rate,
		});
	};
	const handleStateUpdate = (stateUpdateId) => {
		const selectedState = states.find((state) => state._id === stateUpdateId);
		setSelectedStateId(stateUpdateId);
		stateFormik.setValues({
			statename: selectedState.statename,
			statecode: selectedState.statecode,
		});
	};
	const handlePartyUpdate = (partyUpdateId) => {
		const selectedParty = parties.find((party) => party._id === partyUpdateId);
		setSelectedPartyId(partyUpdateId);
		partyFormik.setValues({
			partyname: selectedParty.partyname,
			partyrefno: selectedParty.partyrefno,
			partyrate: selectedParty.partyrate,
		});
	};
	const handleLoadingDelete = (loadingDeleteId) => {
		const isConfirmed = window.confirm(
			'Are you sure you want to delete this loading?'
		);

		if (isConfirmed) {
			axios
				.delete(`${API}load/${loadingDeleteId}`)
				.then(() => {
					console.log('Loading deleted successfully');
					setLoadings((prevLoadings) =>
						prevLoadings.filter((loading) => loading._id !== loadingDeleteId)
					);
					toast.success('Loading Deleted Successfully');
				})
				.catch((error) => {
					console.error('Error deleting loading:', error);
					toast.error('Error deleting loading. Please try again.');
				});
		}
	};
	const handleStateDelete = (stateDeleteId) => {
		const isConfirmed = window.confirm(
			'Are you sure you want to delete this state?'
		);

		if (isConfirmed) {
			axios
				.delete(`${API}state/${stateDeleteId}`)
				.then(() => {
					console.log('State deleted successfully');
					setStates((prevStates) =>
						prevStates.filter((state) => state._id !== stateDeleteId)
					);
					toast.success('State Deleted Successfully');
				})
				.catch((error) => {
					console.error('Error deleting state:', error);
					toast.error('Error deleting state. Please try again.');
				});
		}
	};
	const handlePartyDelete = (partyDeleteId) => {
		const isConfirmed = window.confirm(
			'Are you sure you want to delete this party?'
		);

		if (isConfirmed) {
			axios
				.delete(`${API}party/${partyDeleteId}`)
				.then(() => {
					console.log('Party deleted successfully');
					setParties((prevParties) =>
						prevParties.filter((party) => party._id !== partyDeleteId)
					);
					toast.success('Party Deleted Successfully');
					partyFormik.resetForm(); // Reset the form after deletion
					setSelectedPartyId(null);
				})
				.catch((error) => {
					console.error('Error deleting party:', error);
					toast.error('Error deleting party. Please try again.');
				});
		}
	};

	const handleFormSubmit = (formData) => {
		// console.log(formData);
		if (selectedLoadingId) {
			axios
				.put(`${API}load/${selectedLoadingId}`, formData)
				.then((response) => {
					setLoadings((prevLoadings) =>
						prevLoadings.map((loading) =>
							loading._id === selectedLoadingId ? response.data : loading
						)
					);
					toast.success('Loading Details are Updated Successfully');
				})
				.catch((error) => {
					console.error('Error updating loading:', error);
					toast.error('Error updating loading. Please try again.');
				});
		} else {
			axios
				.post(`${API}load`, formData)
				.then((response) => {
					setLoadings((prevLoadings) => [...prevLoadings, response.data]);
					toast.success('Loading Details are Saved Successfully');
				})
				.catch((error) => {
					console.error('Error creating loading:', error);
					toast.error('Error creating loading. Please try again.');
				});
		}

		formik.resetForm();
		setSelectedLoadingId(null);
	};

	const handleStateFormSubmit = (formData) => {
		if (selectedStateId) {
			axios
				.put(`${API}state/${selectedStateId}`, formData)
				.then((response) => {
					setStates((prevStates) =>
						prevStates.map((state) =>
							state._id === selectedStateId ? response.data : state
						)
					);
					toast.success('State Details are Updated Successfully');
				})
				.catch((error) => {
					console.error('Error updating state:', error);
					toast.error('Error updating state. Please try again.');
				});
		} else {
			axios
				.post(`${API}state`, formData)
				.then((response) => {
					setStates((prevStates) => [...prevStates, response.data]);
					toast.success('State Details are Saved Successfully');
				})
				.catch((error) => {
					console.error('Error creating state:', error);
					toast.error('Error creating state. Please try again.');
				});
		}

		stateFormik.resetForm();
		setSelectedStateId(null);
	};

	const handlePartyFormSubmit = (formData) => {
		if (selectedPartyId) {
			axios
				.put(`${API}party/${selectedPartyId}`, formData)
				.then((response) => {
					setParties((prevParties) =>
						prevParties.map((party) =>
							party._id === selectedPartyId ? response.data : party
						)
					);
					toast.success('Party Details are Updated Successfully');
				})
				.catch((error) => {
					console.error('Error updating party:', error);
					toast.error('Error updating party. Please try again.');
				});
		} else {
			axios
				.post(`${API}party`, formData)
				.then((response) => {
					setParties((prevParties) => [...prevParties, response.data]);
					toast.success('Party Details are Saved Successfully');
				})
				.catch((error) => {
					console.error('Error creating party:', error);
					toast.error('Error creating party. Please try again.');
				});
		}

		partyFormik.resetForm();
		setSelectedPartyId(null);
	};

	const handleFileChange = (event) => {
		const selectedFile = event.target.files[0];

		if (selectedFile) {
			toast.info(`Selected file: ${selectedFile.name}`);
		}

		setFile(selectedFile);
	};

	const handleFileUpload = async () => {
		try {
			if (!file) {
				toast.error('Please select a file before uploading.');
				return;
			}

			const formData = new FormData();
			formData.append('file', file);

			const response = await axios.post(`${API}party/upload`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

			console.log('File uploaded successfully:', response.data);
			toast.success('File is Uploaded Successfully');
			window.location.reload();
		} catch (error) {
			console.error('Error uploading file:', error);
			toast.error('Error uploading file. Please try again.');
		}
	};

	const handleBuyerSelection = (partyId) => {
		// console.log(partyId);
		const updatedSelectedParties = selectedParties.includes(partyId)
			? selectedParties.filter((id) => id !== partyId)
			: [...selectedParties, partyId];
		setSelectedParties(updatedSelectedParties);
	};

	const handleSelectAll = () => {
		if (selectedParties.length === displayedPartiesSearch.length) {
			setSelectedParties([]);
		} else {
			const allPartyIds = displayedPartiesSearch.map((party) => party._id);
			setSelectedParties(allPartyIds);
		}
	};

	const handleGroupDeleteClick = () => {
		setIsGroupDeleteClicked(true);
	};

	const handleGroupDelete = () => {
		const confirmDelete = window.confirm(
			'Are you sure you want to delete selected parties?'
		);

		if (confirmDelete) {
			// console.log('Confirm delete');

			// Create an array of promises for each buyer deletion
			const deletePromises = selectedParties.map(async (partyId) => {
				try {
					await axios.delete(`${API}party/${partyId}`);
					return partyId;
				} catch (error) {
					console.error(`Error deleting party ${partyId}:`, error);
					return null;
				}
			});

			// Wait for all promises to resolve
			Promise.all(deletePromises)
				.then((deletedParties) => {
					// Filter out null values (failed deletions) and update the state
					const updatedParties = parties.filter(
						(party) => !deletedParties.includes(party._id)
					);
					setPartiesForDelete(updatedParties);
					toast.success('Selected parties deleted successfully');
				})
				.catch((error) => {
					console.error('Error deleting selected parties:', error);
					toast.error('Error deleting selected parties. Please try again.');
				});
		}
		setTimeout(() => {
			// Refresh the page
			window.location.reload();
		}, 2000);

		setIsGroupDeleteClicked(false);
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
			<AdminNavbar />
			<div className='admin-loading-manage'>
				<div className='admin-loading-manage-data'>
					<h1 className='admin-loading-manage-data-title'>ALL LOADINGS</h1>
					<input
						type='text'
						placeholder='Search Loading...'
						className='admin-user-manage-form-input'
						value={searchInput}
						onChange={(e) => setSearchInput(e.target.value)}
					/>
					<div className='table-scroll'>
						<table className='admin-loading-manage-data-table'>
							<thead className='admin-loading-manage-data-table-head'>
								<tr className='admin-loading-manage-data-table-row-head'>
									<th className='admin-loading-manage-data-table-header'>Sl</th>
									<th className='admin-loading-manage-data-table-header'>
										Start State
									</th>
									<th className='admin-loading-manage-data-table-header'>
										End State
									</th>
									{/* <th className='admin-loading-manage-data-table-header'>
										Rate
									</th> */}
									<th className='admin-loading-manage-data-table-header'>
										Action
									</th>
								</tr>
							</thead>
							<tbody className='admin-loading-manage-data-table-body'>
								{displayedLoadingsSearch.map((loading, idx) => (
									<tr
										key={loading._id}
										className='admin-loading-manage-data-table-row-body'
									>
										<td className='admin-loading-manage-data-table-data'>
											{idx + 1}
										</td>
										<td className='admin-loading-manage-data-table-data'>
											{loading.startstate}
										</td>
										<td className='admin-loading-manage-data-table-data'>
											{loading.endstate}
										</td>
										{/* <td className='admin-loading-manage-data-table-data'>
											{loading.rate}
										</td> */}
										<td className='admin-loading-manage-data-table-data'>
											<button
												style={{
													background: 'none',
													border: 'none',
												}}
												onClick={() => handleLoadingUpdate(loading._id)}
											>
												<img
													src={E}
													alt='Update'
													style={{
														height: '15px',
														width: '15px',
														cursor: 'pointer',
													}}
												/>
											</button>
											<button
												style={{
													background: 'none',
													border: 'none',
												}}
												onClick={() => handleLoadingDelete(loading._id)}
											>
												<img
													src={D}
													alt='delete'
													style={{
														height: '15px',
														width: '15px',
														cursor: 'pointer',
													}}
												/>
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<br />
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
				<div className='admin-loading-manage-form'>
					<h1 className='admin-loading-manage-form-title'>
						{selectedLoadingId ? 'UPDATE LOADING' : 'ADD LOADING'}
					</h1>
					<form
						className='admin-loading-manage-form-form'
						onSubmit={formik.handleSubmit}
					>
						<input
							type='text'
							className='admin-loading-manage-form-input-high'
							placeholder='Start State'
							required
							name='startstate'
							value={formik.values.startstate}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
						{formik.touched.startstate && formik.errors.startstate && (
							<div className='error-message'>{formik.errors.startstate}</div>
						)}
						<input
							type='text'
							className='admin-loading-manage-form-input-high'
							placeholder='End State'
							required
							name='endstate'
							value={formik.values.endstate}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
						{formik.touched.endstate && formik.errors.endstate && (
							<div className='error-message'>{formik.errors.endstate}</div>
						)}
						{/* <input
							type='number'
							className='admin-loading-manage-form-input-high'
							placeholder='Rate'
							required
							name='rate'
							value={formik.values.rate}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
						{formik.touched.rate && formik.errors.rate && (
							<div className='error-message'>{formik.errors.rate}</div>
						)} */}
						<br />
						<button
							type='submit'
							className='admin-loading-manage-form-button'
							disabled={formik.isSubmitting || !formik.isValid}
						>
							{selectedLoadingId ? 'Update' : 'Add'}
						</button>
					</form>
				</div>
			</div>
			<br />
			<div className='admin-state-manage'>
				<div className='admin-state-manage-data'>
					<h1 className='admin-state-manage-data-title'>ALL STATES</h1>
					<input
						type='text'
						placeholder='Search State...'
						className='admin-user-manage-form-input'
						value={searchStateInput}
						onChange={(e) => setSearchStateInput(e.target.value)}
					/>
					<div className='table-scroll'>
						<table className='admin-state-manage-data-table'>
							<thead className='admin-state-manage-data-table-head'>
								<tr className='admin-state-manage-data-table-row-head'>
									<th className='admin-state-manage-data-table-header'>Sl</th>
									<th className='admin-state-manage-data-table-header'>
										State Name
									</th>
									<th className='admin-state-manage-data-table-header'>
										State Code
									</th>
									<th className='admin-state-manage-data-table-header'>
										Action
									</th>
								</tr>
							</thead>
							<tbody className='admin-state-manage-data-table-body'>
								{displayedStatesSearch.map((state, idx) => (
									<tr
										key={state._id}
										className='admin-state-manage-data-table-row-body'
									>
										<td className='admin-state-manage-data-table-data'>
											{idx + 1}
										</td>
										<td className='admin-state-manage-data-table-data'>
											{state.statename}
											{/* {state.statename.substring(0, 23)} */}
										</td>
										<td className='admin-state-manage-data-table-data'>
											{state.statecode}
										</td>
										<td className='admin-state-manage-data-table-data'>
											<button
												style={{
													background: 'none',
													border: 'none',
												}}
												onClick={() => handleStateUpdate(state._id)}
											>
												<img
													src={E}
													alt='Update'
													style={{
														height: '15px',
														width: '15px',
														cursor: 'pointer',
													}}
												/>
											</button>
											<button
												style={{
													background: 'none',
													border: 'none',
												}}
												onClick={() => handleStateDelete(state._id)}
											>
												<img
													src={D}
													alt='delete'
													style={{
														height: '15px',
														width: '15px',
														cursor: 'pointer',
													}}
												/>
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<br />
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
				<div className='admin-state-manage-form'>
					<h1 className='admin-state-manage-form-title'>
						{selectedStateId ? 'UPDATE STATE' : 'ADD STATE'}
					</h1>
					<form
						className='admin-state-manage-form-form'
						onSubmit={stateFormik.handleSubmit}
					>
						<input
							type='text'
							className='admin-state-manage-form-input-high'
							placeholder='State Name'
							required
							name='statename'
							value={stateFormik.values.statename}
							onChange={stateFormik.handleChange}
							onBlur={stateFormik.handleBlur}
						/>
						{stateFormik.touched.statename && stateFormik.errors.statename && (
							<div className='error-message'>
								{stateFormik.errors.statename}
							</div>
						)}
						<input
							type='text'
							className='admin-state-manage-form-input-high'
							placeholder='State Code'
							required
							name='statecode'
							value={stateFormik.values.statecode}
							onChange={stateFormik.handleChange}
							onBlur={stateFormik.handleBlur}
						/>
						{stateFormik.touched.statecode && stateFormik.errors.statecode && (
							<div className='error-message'>
								{stateFormik.errors.statecode}
							</div>
						)}
						<br />
						<button
							type='submit'
							className='admin-state-manage-form-button'
							disabled={stateFormik.isSubmitting || !stateFormik.isValid}
						>
							{selectedStateId ? 'Update' : 'Add'}
						</button>
					</form>
				</div>
			</div>
			<br />
			<div className='admin-party-ref-manage'>
				<div className='admin-party-ref-manage-data'>
					<h1 className='admin-party-ref-manage-data-title'>
						ALL PARTY REFERENCES
					</h1>
					<div className='admin-buyer-manage-file-upload'>
						<input
							className='admin-buyer-manage-file-upload-input'
							type='file'
							accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
							onChange={handleFileChange}
						/>
						<div className='upload-delete-btn-div'>
							<button
								className='admin-buyer-manage-file-upload-button'
								onClick={handleFileUpload}
							>
								Upload File
							</button>
							<div className='delete-btn-div'>
								<button
									style={{
										display: isGroupDeleteClicked ? 'none' : 'inline-block',
									}}
									className='admin-buyer-manage-file-upload-button'
									onClick={handleGroupDeleteClick}
								>
									Group Delete
								</button>
								{isGroupDeleteClicked && (
									<button
										// style={{ marginLeft: '15px' }}
										className='admin-buyer-manage-file-upload-button'
										onClick={handleGroupDelete}
									>
										Delete Selected
									</button>
								)}
							</div>
						</div>
					</div>
					<input
						type='text'
						placeholder='Search Party...'
						className='admin-user-manage-form-input'
						value={searchPartyInput}
						onChange={(e) => setSearchPartyInput(e.target.value)}
					/>
					<div className='table-scroll'>
						<table className='admin-party-ref-manage-data-table'>
							<thead className='admin-party-ref-manage-data-table-head'>
								<tr className='admin-party-ref-manage-data-table-row-head'>
									<th className='admin-party-ref-manage-data-table-header'>
										Sl
									</th>
									<th className='admin-party-ref-manage-data-table-header'>
										Party Name
									</th>
									<th className='admin-party-ref-manage-data-table-header'>
										Party Code
									</th>
									<th className='admin-party-ref-manage-data-table-header'>
										Party Rate
									</th>
									<th className='admin-party-ref-manage-data-table-header'>
										Action
									</th>
									{isGroupDeleteClicked && (
										<th className='admin-buyer-manage-data-table-header'>
											<input
												type='checkbox'
												checked={
													selectedParties.length ===
													displayedPartiesSearch.length
												}
												onChange={() => handleSelectAll()}
											/>
										</th>
									)}
								</tr>
							</thead>
							<tbody className='admin-party-ref-manage-data-table-body'>
								{displayedPartiesSearch.map((party, idx) => (
									<tr
										key={party._id}
										className='admin-party-ref-manage-data-table-row-body'
									>
										<td className='admin-party-ref-manage-data-table-data'>
											{idx + 1}
										</td>
										<td className='admin-party-ref-manage-data-table-data'>
											{party.partyname}
										</td>
										<td className='admin-party-ref-manage-data-table-data'>
											{party.partyrefno}
										</td>
										<td className='admin-party-ref-manage-data-table-data'>
											{party.partyrate ? party.partyrate : 'N/A'}
										</td>
										<td className='admin-party-ref-manage-data-table-data'>
											<button
												style={{
													background: 'none',
													border: 'none',
												}}
												onClick={() => handlePartyUpdate(party._id)}
											>
												<img
													src={E}
													alt='Update'
													style={{
														height: '15px',
														width: '15px',
														cursor: 'pointer',
													}}
												/>
											</button>
											<button
												style={{
													background: 'none',
													border: 'none',
												}}
												onClick={() => handlePartyDelete(party._id)}
											>
												<img
													src={D}
													alt='delete'
													style={{
														height: '15px',
														width: '15px',
														cursor: 'pointer',
													}}
												/>
											</button>
										</td>
										{isGroupDeleteClicked && (
											<td className='admin-buyer-manage-data-table-data'>
												<input
													type='checkbox'
													checked={selectedParties.includes(party._id)}
													onChange={() => handleBuyerSelection(party._id)}
												/>
											</td>
										)}
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<br />
				</div>
				<div className='admin-party-ref-manage-form'>
					<h1 className='admin-party-ref-manage-form-title'>
						{selectedPartyId ? 'UPDATE PARTY REFERENCE' : 'ADD PARTY REFERENCE'}
					</h1>
					<form
						className='admin-party-ref-manage-form-form'
						onSubmit={partyFormik.handleSubmit}
					>
						<input
							type='text'
							className='admin-party-ref-manage-form-input-high'
							placeholder='Party Name'
							required
							name='partyname'
							value={partyFormik.values.partyname}
							onChange={partyFormik.handleChange}
							onBlur={partyFormik.handleBlur}
						/>
						{partyFormik.touched.partyname && partyFormik.errors.partyname && (
							<div className='error-message'>
								{partyFormik.errors.partyname}
							</div>
						)}
						<input
							type='text'
							className='admin-party-ref-manage-form-input-high'
							placeholder='Party Code'
							required
							name='partyrefno'
							value={partyFormik.values.partyrefno}
							onChange={partyFormik.handleChange}
							onBlur={partyFormik.handleBlur}
						/>
						{partyFormik.touched.partyrefno &&
							partyFormik.errors.partyrefno && (
								<div className='error-message'>
									{partyFormik.errors.partyrefno}
								</div>
							)}
						<input
							type='number'
							className='admin-party-ref-manage-form-input-high'
							placeholder='Party Rate'
							required
							name='partyrate'
							value={partyFormik.values.partyrate}
							onChange={partyFormik.handleChange}
							onBlur={partyFormik.handleBlur}
						/>
						{partyFormik.touched.partyrate && partyFormik.errors.partyrate && (
							<div className='error-message'>
								{partyFormik.errors.partyrate}
							</div>
						)}
						<br />
						<button
							type='submit'
							className='admin-party-ref-manage-form-button'
							disabled={partyFormik.isSubmitting || !partyFormik.isValid}
						>
							{selectedPartyId ? 'Update' : 'Add'}
						</button>
					</form>
				</div>
			</div>
			<ToastContainer position='top-right' autoClose={1500} />
		</div>
	);
}

export default AdminLoadingManage;
