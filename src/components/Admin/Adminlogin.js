import React, { useState } from 'react';
import './Adminlogin.css';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from './AdminAuth';
import background from '../images/background.png';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
	Email: Yup.string()
		.email('Please enter a valid email address')
		.required('Email is required'),
	password: Yup.string().required('Password is required'),
});

function AdminLogin() {
	const auth = useAdminAuth();
	const navigate = useNavigate();
	const [userlist, setUserlist] = useState(true);

	const formik = useFormik({
		initialValues: {
			Email: '',
			password: '',
		},
		validationSchema,
		onSubmit: (values) => login(values),
	});

	const login = ({ Email, password }) => {
		const matchFound =
			auth.adminlist &&
			auth.adminlist.some(
				(item) => item.adminemail === Email && item.adminpassword === password
			);

		if (matchFound) {
			const admin = auth.adminlist.find((item) => item.adminemail === Email);
			auth.adminlogin(
				admin._id,
				admin.adminname,
				admin.adminemail,
				admin.adminpassword
			);
			navigate('/admindashboard');
		} else {
			setUserlist(false);
		}
	};

	return (
		<div
			style={{
				backgroundImage: `url(${background})`,
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center',
				minHeight: '100vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<div className='Admin-login-container'>
				<div className='Admin-login'>
					<h2 className='Admin-login-head'>LOGIN</h2>
					<div className='Admin-login-form'>
						<div className='Admin-login-email'>
							<input
								type='email'
								placeholder='Email'
								value={formik.values.Email}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								className={`Admin-login-input ${
									formik.touched.Email && formik.errors.Email ? 'error' : ''
								}`}
								name='Email'
							/>
							{formik.touched.Email && formik.errors.Email && (
								<div className='error-message-email'>{formik.errors.Email}</div>
							)}
						</div>
						<div className='Admin-login-password'>
							<input
								type='password'
								placeholder='Password'
								value={formik.values.password}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								className={`Admin-login-input ${
									formik.touched.password && formik.errors.password
										? 'error'
										: ''
								}`}
								name='password'
							/>
							{formik.touched.password && formik.errors.password && (
								<div className='error-message-password'>
									{formik.errors.password}
								</div>
							)}
						</div>
						<div className='Admin-login-button'>
							<button
								type='button'
								onClick={formik.handleSubmit}
								className='Admin-login-button-value'
							>
								Login
							</button>
						</div>
						<div className='Admin-login-not-req'>
							<p className='Admin-login-not'>
								Not Admin?
								<a className='admin-a' href='/staff'>
									staff
								</a>
								<a className='admin-a' href='/user'>
									user
								</a>
							</p>
						</div>
						{/* <div className='Admin-login-error'>
							{!userlist ? (
								<h3 id='invalid'>Invalid username or password</h3>
							) : (
								''
							)}
						</div> */}
					</div>
				</div>
				<div className='Admin-login-content'>
					<div className='Admin-login-content-head'>
						<h2>Welcome</h2>
					</div>
					<div className='Admin-login-content-body'>
						<h3>Admin</h3>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AdminLogin;
