import React from 'react';
import '../Admin/AdminInvoiceDashboard.css';
import '../Admin/AdminBuyerManage.css';
import './StaffPasswordChange.css';
import background from '../images/Desktop.png';
import axios from 'axios';
import { useStaffAuth } from './StaffAuth';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StaffPasswordChange = () => {
	const navigate = useNavigate();
	const auth = useStaffAuth();
	const API = process.env.REACT_APP_API;

	// Formik and Yup Validation
	const formik = useFormik({
		initialValues: {
			newpassword: '',
			staffpassword: '',
		},
		validationSchema: Yup.object({
			newpassword: Yup.string().required('New Password is required'),
			staffpassword: Yup.string().required('Confirm New Password is required'),
		}),
		onSubmit: (values) => {
			handleFormSubmit(values);
		},
	});

	const handleFormSubmit = (values) => {
		// console.log(auth.staff);
		if (values.newpassword === values.staffpassword) {
			axios
				.put(`${API}staff/${auth.staff.id}`, values)
				.then((response) => {
					toast.success('Staff Password are Updated Successfully');
					setTimeout(() => {
						navigate('/staffgendash');
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
									onClick={() => navigate('/staffgendash')}
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
							{...formik.getFieldProps('staffpassword')}
						/>
						{formik.touched.staffpassword && formik.errors.staffpassword ? (
							<div className='error-message'>{formik.errors.staffpassword}</div>
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

export default StaffPasswordChange;
