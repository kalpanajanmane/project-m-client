// AdminAuth.js
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AdminAuthContext = React.createContext(null);

const AdminAuthProvider = (props) => {
	const [admin, setAdmin] = useState(() => {
		// Try to get admin info from localStorage on component mount
		const storedAdmin = localStorage.getItem('admin');
		return storedAdmin ? JSON.parse(storedAdmin) : null;
	});

	const [adminlist, setAdminlist] = useState([]);

	const API = process.env.REACT_APP_API;

	const saveAdminToLocalStorage = (admin) => {
		localStorage.setItem('admin', JSON.stringify(admin));
		// console.log(admin);
	};

	const adminlogin = (_id, adminname, adminemail, adminpassword) => {
		const newAdmin = { _id, adminname, adminemail, adminpassword };
		setAdmin(newAdmin);
		saveAdminToLocalStorage(newAdmin);
	};

	useEffect(() => {
		axios
			.get(`${API}admin`)
			.then((res) => {
				setAdminlist(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [API]);

	const adminsignup = (adminname, adminemail, adminpassword) => {
		axios
			.post(`${API}/admin`, {
				adminname: adminname,
				adminemail: adminemail,
				adminpassword: adminpassword,
			})
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const adminlogout = () => {
		setAdmin(null);
		// Remove admin info from localStorage on logout
		localStorage.removeItem('admin');
	};

	return (
		<AdminAuthContext.Provider
			value={{ admin, adminsignup, adminlist, adminlogin, adminlogout }}
		>
			{props.children}
		</AdminAuthContext.Provider>
	);
};

const useAdminAuth = () => {
	return useContext(AdminAuthContext);
};

export { AdminAuthProvider, useAdminAuth };
