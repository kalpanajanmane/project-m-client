import React, { useState, useEffect } from 'react';
import './AdminUserManage.css';
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import background from '../images/Desktop.png';
// import ReactPaginate from 'react-paginate';
import AdminNavbar from './AdminNavbar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import E from '../images/E.png';
import D from '../images/D.png';

const validationSchema = Yup.object().shape({
	username: Yup.string().required('Username is required'),
	useremail: Yup.string()
		.email('Invalid email format')
		.required('Email is required'),
	userpassword: Yup.string().required('Password is required'),
	// userphone: Yup.string()
	// 	.matches(/^\d{10}$/, 'Invalid phone number format')
	// 	.required('Phone number is required'),
	useraccess: Yup.string().required('User access is required'),
});

function AdminUserManage() {
	const [users, setUsers] = useState([]);
	// const [pageNumber, setPageNumber] = useState(0);
	const [selectedUserId, setSelectedUserId] = useState(null);
	const API = process.env.REACT_APP_API;

	const formik = useFormik({
		initialValues: {
			username: '',
			useremail: '',
			userpassword: '',
			// userphone: '',
			useraccess: '',
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			handleFormSubmit(values);
		},
	});

	// const itemsPerPage = 12;
	const [searchInput, setSearchInput] = useState('');

	const sortedUsers = [...users].reverse();
	const displayedUserSearch = sortedUsers.filter((item) =>
		item.username.toLowerCase().includes(searchInput.toLowerCase())
	);
	// 	.slice(pageNumber * itemsPerPage, (pageNumber + 1) * itemsPerPage);

	// const pageCount = Math.ceil(users.length / itemsPerPage);

	// const changePage = ({ selected }) => {
	// 	setPageNumber(selected);
	// };

	useEffect(() => {
		axios
			.get(`${API}user`)
			.then((response) => {
				setUsers(response.data);
			})
			.catch((error) => {
				console.error('Error fetching user data:', error);
			});
	}, [API]);

	const handleUserUpdate = (userUpdateId) => {
		setSelectedUserId(userUpdateId);
		const selectedUser = users.find((user) => user._id === userUpdateId);

		formik.setValues({
			username: selectedUser.username || '',
			useremail: selectedUser.useremail || '',
			userpassword: selectedUser.userpassword || '',
			// userphone: selectedUser.userphone || '',
			useraccess: selectedUser.useraccess || '',
		});

		formik.setErrors({});
		formik.setSubmitting(false);
	};

	const handleFormSubmit = (formData) => {
		if (selectedUserId) {
			axios
				.put(`${API}user/${selectedUserId}`, formData)
				.then((response) => {
					setUsers((prevUsers) =>
						prevUsers.map((user) =>
							user._id === selectedUserId ? response.data : user
						)
					);
					toast.success('User Details are Updated Successfully');
				})
				.catch((error) => {
					console.error('Error updating user:', error);
					toast.error('Error updating user. Please try again.');
				});
		} else {
			axios
				.post(`${API}user`, formData)
				.then((response) => {
					setUsers((prevUsers) => [...prevUsers, response.data]);
					toast.success('User Details are Saved Successfully');
				})
				.catch((error) => {
					console.error('Error creating user:', error);
					toast.error('Error creating user. Please try again.');
				});
		}

		formik.resetForm();
		setSelectedUserId(null);
	};

	const handleDeleteUser = (userId) => {
		const confirmDelete = window.confirm(
			'Are you sure you want to delete this user?'
		);
		if (confirmDelete) {
			axios
				.delete(`${API}user/${userId}`)
				.then((response) => {
					setUsers((prevUsers) =>
						prevUsers.filter((user) => user._id !== userId)
					);
					toast.success('User Deleted Successfully');
				})
				.catch((error) => {
					console.error('Error deleting user:', error);
					toast.error('Error deleting user. Please try again.');
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
			<div className='admin-user-manage'>
				<div className='admin-user-manage-data'>
					<h1 className='admin-user-manage-data-title'>ALL USERS</h1>
					<input
						type='text'
						placeholder='Search User...'
						className='admin-user-manage-form-input'
						value={searchInput}
						onChange={(e) => setSearchInput(e.target.value)}
					/>
					<div className='table-scroll-user'>
						<table className='admin-user-manage-data-table'>
							<thead className='admin-user-manage-data-table-head'>
								<tr className='admin-user-manage-data-table-row-head'>
									<th className='admin-user-manage-data-table-header'>Sl</th>
									<th className='admin-user-manage-data-table-header'>
										Username
									</th>
									<th className='admin-user-manage-data-table-header'>Email</th>
									{/* <th className='admin-user-manage-data-table-header'>Phone</th> */}
									<th className='admin-user-manage-data-table-header'>
										Access
									</th>
									<th className='admin-user-manage-data-table-header'>
										Action
									</th>
								</tr>
							</thead>
							<tbody className='admin-user-manage-data-table-body'>
								{displayedUserSearch.map((user, idx) => (
									<tr
										key={user._id}
										className='admin-user-manage-data-table-row-body'
									>
										<td className='admin-user-manage-data-table-data highlight'>
											{idx + 1}
										</td>
										<td className='admin-user-manage-data-table-data highlight'>
											{user.username.substring(0, 12)}
										</td>
										<td className='admin-user-manage-data-table-data'>
											{user.useremail.substring(0, 18)}
										</td>
										{/* <td className='admin-user-manage-data-table-data'>
											{user.userphone}
										</td> */}
										<td className='admin-user-manage-data-table-data'>
											{user.useraccess.substring(0, 12)}
										</td>
										<td className='admin-user-manage-data-table-data'>
											<button
												style={{
													background: 'none',
													border: 'none',
												}}
												onClick={() => handleUserUpdate(user._id)}
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
												onClick={() => handleDeleteUser(user._id)}
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
				<div className='admin-user-manage-form'>
					<h1 className='admin-user-manage-form-title'>
						{selectedUserId ? 'UPDATE USER' : 'ADD USER'}
					</h1>
					<form
						className='admin-user-manage-form-form'
						onSubmit={formik.handleSubmit}
					>
						<input
							type='text'
							required
							className='admin-user-manage-form-input'
							placeholder='Username'
							name='username'
							value={formik.values.username}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
						{formik.touched.username && formik.errors.username && (
							<div className='error-message'>{formik.errors.username}</div>
						)}
						<input
							type='email'
							required
							className='admin-user-manage-form-input'
							placeholder='Email'
							name='useremail'
							value={formik.values.useremail}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
						{formik.touched.useremail && formik.errors.useremail && (
							<div className='error-message'>{formik.errors.useremail}</div>
						)}
						<input
							type='password'
							required
							className='admin-user-manage-form-input'
							placeholder='Password'
							name='userpassword'
							value={formik.values.userpassword}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
						{formik.touched.userpassword && formik.errors.userpassword && (
							<div className='error-message'>{formik.errors.userpassword}</div>
						)}
						{/* <input
							type='tel'
							required
							maxLength='10'
							className='admin-user-manage-form-input'
							placeholder='Phone'
							name='userphone'
							value={formik.values.userphone}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
						{formik.touched.userphone && formik.errors.userphone && (
							<div className='error-message'>{formik.errors.userphone}</div>
						)} */}
						<select
							required
							className='admin-staff-manager-form-input'
							name='useraccess'
							value={formik.values.useraccess}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						>
							<option value='Super-User'>Super-User</option>
							<option value='HO-User'>HO-User</option>
							<option value='User'>User</option>
						</select>
						<br />
						<button
							type='submit'
							className='admin-user-manage-form-button'
							disabled={formik.isSubmitting || !formik.isValid}
						>
							{selectedUserId ? 'Update' : 'Add'}
						</button>
					</form>
				</div>
			</div>
			<ToastContainer position='top-right' autoClose={1500} />
		</div>
	);
}

export default AdminUserManage;
