import React from 'react';
import '../Admin/AdminInvoiceDashboard.css';
import '../Admin/AdminBuyerManage.css';
import './UserPasswordChange.css';
import background from '../images/Desktop.png';
import axios from 'axios';
import { useUserAuth } from './UserAuth';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserPasswordChange = () => {
	const navigate = useNavigate();
	const auth = useUserAuth();
	const API = process.env.REACT_APP_API;

	// Formik and Yup Validation
	const formik = useFormik({
		initialValues: {
			newpassword: '',
			userpassword: '',
		},
		validationSchema: Yup.object({
			newpassword: Yup.string().required('New Password is required'),
			userpassword: Yup.string().required('Confirm New Password is required'),
		}),
		onSubmit: (values) => {
			handleFormSubmit(values);
		},
	});

	const handleFormSubmit = (values) => {
		// console.log(auth.staff);
		if (values.newpassword === values.userpassword) {
			axios
				.put(`${API}user/${auth.user.id}`, values)
				.then((response) => {
					toast.success('User Password are Updated Successfully');
					setTimeout(() => {
						navigate('/usersuperdash');
					}, 2500);
				})
				.catch((error) => {
					console.error('Error updating password:', error);
					toast.error('Error In Updating the Password');
				});
		} else {
			toast.error(
				'Sorry, the passwords you entered do not match. Please make sure your new password and confirmation password match exactly.'
			);
			// console.log('password dont match');
		}

		formik.setValues({
			...values,
		});

		formik.resetForm();
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
			<div className='admin-in-dashboard'>
				<div className='admin-in-logout'>
					<div className='admin-in-logout-box'>
						<div className='admin-in-logout-container'>
							<div className='admin-in-logout-button'>
								<button
									className='admin-in-logout-button-value'
									onClick={() => navigate('/usersuperdash')}
								>
									DASHBOARD
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className='admin-change-password-form'>
					<h1 className='admin-in-dashboard-title-change-password'>
						CHANGE PASSWORD
					</h1>

					<form
						className='admin-change-password-form-form'
						onSubmit={formik.handleSubmit}
					>
						<input
							type='text'
							required
							className='admin-change-password-form-input'
							placeholder='New Pasword'
							{...formik.getFieldProps('newpassword')}
						/>
						{formik.touched.newpassword && formik.errors.newpassword ? (
							<div className='error-message'>{formik.errors.newpassword}</div>
						) : null}
						<input
							type='password'
							required
							className='admin-change-password-form-input'
							placeholder='Confirm New Pasword'
							{...formik.getFieldProps('userpassword')}
						/>
						{formik.touched.userpassword && formik.errors.userpassword ? (
							<div className='error-message'>{formik.errors.userpassword}</div>
						) : null}

						<br />
						<button type='submit' className='admin-change-password-form-button'>
							UPDATE
						</button>
					</form>
				</div>
			</div>
			<ToastContainer position='top-right' autoClose={1500} />
		</div>
	);
};

export default UserPasswordChange;
