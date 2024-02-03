import React, { useState, useEffect } from 'react';
import './AdminStaffManage.css';
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

function AdminStaffManage() {
	const [staffMembers, setStaffMembers] = useState([]);
	// const [pageNumber, setPageNumber] = useState(0);
	const [selectedStaffId, setSelectedStaffId] = useState(null);
	const API = process.env.REACT_APP_API;

	// const itemsPerPage = 12;
	const [searchInput, setSearchInput] = useState('');

	// Sort the staff members array in reverse order (newest first)
	const sortedStaffMembers = [...staffMembers].reverse();
	const displayedStaffSearch = sortedStaffMembers.filter((item) =>
		item.staffname.toLowerCase().includes(searchInput.toLowerCase())
	);
	// 	.slice(pageNumber * itemsPerPage, (pageNumber + 1) * itemsPerPage);

	// const pageCount = Math.ceil(sortedStaffMembers.length / itemsPerPage);

	// const changePage = ({ selected }) => {
	// 	setPageNumber(selected);
	// };

	useEffect(() => {
		axios
			.get(`${API}staff`)
			.then((response) => {
				setStaffMembers(response.data);
			})
			.catch((error) => {
				console.error('Error fetching staff member data:', error);
			});
	}, [API]);

	// Formik and Yup Validation
	const formik = useFormik({
		initialValues: {
			staffname: '',
			staffemail: '',
			staffpassword: '',
			// staffphone: '',
			staffaccess: '',
			staffofficebranch: '',
		},
		validationSchema: Yup.object({
			staffname: Yup.string().required('Staff Name is required'),
			staffemail: Yup.string()
				.email('Invalid email address')
				.required('Email is required'),
			staffpassword: Yup.string().required('Password is required'),
			// staffphone: Yup.string()
			// 	.matches(/^[0-9]+$/, 'Invalid phone number')
			// 	.required('Phone is required'),
			staffaccess: Yup.string().required('Access is required'),
			staffofficebranch: Yup.string().required('Office Branch is required'),
		}),
		onSubmit: (values) => {
			handleFormSubmit(values);
		},
	});

	const handleStaffUpdate = (staffUpdateId) => {
		setSelectedStaffId(staffUpdateId);
		const selectedStaff = staffMembers.find(
			(staff) => staff._id === staffUpdateId
		);
		formik.setValues({ ...selectedStaff });
	};

	const handleFormSubmit = (values) => {
		if (selectedStaffId) {
			// Update an existing staff member
			axios
				.put(`${API}staff/${selectedStaffId}`, values)
				.then((response) => {
					// Handle successful update (if needed)
					console.log('Staff member updated successfully:', response.data);
					// Optionally, you can update the local state to reflect the changes
					setStaffMembers((prevStaffMembers) =>
						prevStaffMembers.map((staff) =>
							staff._id === selectedStaffId ? response.data : staff
						)
					);
					toast.success('Staff Details are Updated Successfully');
				})
				.catch((error) => {
					console.error('Error updating staff member:', error);
					toast.error('Error updating staff member. Please try again.');
				});
		} else {
			// Create a new staff member
			axios
				.post(`${API}staff`, values)
				.then((response) => {
					// Handle successful creation (if needed)
					console.log('Staff member created successfully:', response.data);
					// Optionally, you can update the local state to include the new staff member
					setStaffMembers((prevStaffMembers) => [
						...prevStaffMembers,
						response.data,
					]);
					toast.success('Staff Details are Saved Successfully');
				})
				.catch((error) => {
					console.error('Error creating staff member:', error);
					toast.error('Error creating staff member. Please try again.');
				});
		}

		// Reset the form
		formik.resetForm();
		setSelectedStaffId(null);
	};

	const handleDeleteStaff = (staffId) => {
		const confirmDelete = window.confirm(
			'Are you sure you want to delete this Staff member?'
		);
		if (confirmDelete) {
			axios
				.delete(`${API}staff/${staffId}`)
				.then((response) => {
					console.log('Staff member deleted successfully');
					toast.success('Staff member deleted successfully');
					setStaffMembers((prevStaffMembers) =>
						prevStaffMembers.filter((staff) => staff._id !== staffId)
					);
				})
				.catch((error) => {
					console.error('Error deleting staff member:', error);
					toast.error('Error deleting staff member. Please try again.');
				});
		}
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
			<div className='admin-staff-manager'>
				<div className='admin-staff-manager-data'>
					<h1 className='admin-staff-manager-data-title'>ALL STAFF MEMBERS</h1>
					<input
						type='text'
						placeholder='Search Staff...'
						className='admin-user-manage-form-input' // Search input placeholder
						value={searchInput} // Bind the input value to the state
						onChange={(e) => setSearchInput(e.target.value)} // Update the searchInput state as the user types
					/>
					<div className='table-scroll-staff'>
						<table className='admin-staff-manager-data-table'>
							<thead className='admin-staff-manager-data-table-head'>
								<tr className='admin-staff-manager-data-table-row-head'>
									<th className='admin-staff-manager-data-table-header'>Sl</th>
									<th className='admin-staff-manager-data-table-header'>
										Staff Name
									</th>
									<th className='admin-staff-manager-data-table-header'>
										Email
									</th>
									{/* <th className='admin-staff-manager-data-table-header'>
										Phone
									</th> */}
									<th className='admin-staff-manager-data-table-header'>
										Office Branch
									</th>
									<th className='admin-staff-manager-data-table-header'>
										Access
									</th>
									<th className='admin-staff-manager-data-table-header'>
										Action
									</th>
								</tr>
							</thead>
							<tbody className='admin-staff-manager-data-table-body'>
								{displayedStaffSearch.map((staff, idx) => (
									<tr
										key={staff._id}
										className='admin-staff-manager-data-table-row-body'
									>
										<td className='admin-staff-manager-data-table-data highlight'>
											{idx + 1}
										</td>
										<td className='admin-staff-manager-data-table-data highlight'>
											{staff.staffname.substring(0, 12)}
										</td>
										<td className='admin-staff-manager-data-table-data'>
											{staff.staffemail.substring(0, 18)}
										</td>
										{/* <td className='admin-staff-manager-data-table-data'>
											{staff.staffphone}
										</td> */}
										<td className='admin-staff-manager-data-table-data'>
											{staff.staffofficebranch.substring(0, 12)}
										</td>
										<td className='admin-staff-manager-data-table-data'>
											{staff.staffaccess.substring(0, 12)}
										</td>
										<td className='admin-staff-manager-data-table-data'>
											<button
												style={{
													background: 'none',
													border: 'none',
												}}
												onClick={() => handleStaffUpdate(staff._id)}
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
												onClick={() => {
													handleDeleteStaff(staff._id);
												}}
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
				<div className='admin-staff-manager-form'>
					<h1 className='admin-staff-manager-form-title'>
						{selectedStaffId ? 'UPDATE STAFF' : 'ADD STAFF'}
					</h1>
					<form
						className='admin-staff-manager-form-form'
						onSubmit={formik.handleSubmit}
					>
						<input
							type='text'
							required
							className='admin-staff-manager-form-input'
							placeholder='Staff Name'
							{...formik.getFieldProps('staffname')}
						/>
						{formik.touched.staffname && formik.errors.staffname ? (
							<div className='error-message'>{formik.errors.staffname}</div>
						) : null}

						<input
							type='email'
							required
							className='admin-staff-manager-form-input'
							placeholder='Email'
							{...formik.getFieldProps('staffemail')}
						/>
						{formik.touched.staffemail && formik.errors.staffemail ? (
							<div className='error-message'>{formik.errors.staffemail}</div>
						) : null}

						<input
							type='password'
							required
							className='admin-staff-manager-form-input'
							placeholder='Password'
							{...formik.getFieldProps('staffpassword')}
						/>
						{formik.touched.staffpassword && formik.errors.staffpassword ? (
							<div className='error-message'>{formik.errors.staffpassword}</div>
						) : null}

						{/* <input
							type='tel'
							required
							maxLength='10'
							className='admin-staff-manager-form-input'
							placeholder='Phone'
							{...formik.getFieldProps('staffphone')}
						/>
						{formik.touched.staffphone && formik.errors.staffphone ? (
							<div className='error-message'>{formik.errors.staffphone}</div>
						) : null} */}

						<select
							required
							className='admin-staff-manager-form-input'
							{...formik.getFieldProps('staffaccess')}
						>
							<option value='Super-Staff'>Super-Staff</option>
							<option value='HO-Staff'>HO-Staff</option>
							<option value='Staff'>Staff</option>
						</select>
						{formik.touched.staffaccess && formik.errors.staffaccess ? (
							<div className='error-message'>{formik.errors.staffaccess}</div>
						) : null}

						<input
							type='text'
							required
							className='admin-staff-manager-form-input'
							placeholder='Office Branch'
							{...formik.getFieldProps('staffofficebranch')}
						/>
						{formik.touched.staffofficebranch &&
						formik.errors.staffofficebranch ? (
							<div className='error-message'>
								{formik.errors.staffofficebranch}
							</div>
						) : null}

						<br />
						<button type='submit' className='admin-staff-manager-form-button'>
							{selectedStaffId ? 'Update Staff' : 'Add Staff'}
						</button>
					</form>
				</div>
			</div>
			<ToastContainer position='top-right' autoClose={3000} />
		</div>
	);
}

export default AdminStaffManage;
