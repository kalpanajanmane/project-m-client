import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Admindashboard.css';
import { useAdminAuth } from './AdminAuth';
import mu from '../images/mu.png';

const AdminAccordion = () => {
	const auth = useAdminAuth();
	const [isAccordionOpen, setAccordionOpen] = useState(false);

	const toggleAccordion = () => {
		setAccordionOpen(!isAccordionOpen);
	};

	const handleLogout = () => {
		auth.adminlogout();
	};

	return (
		<div>
			<div>
				<button onClick={toggleAccordion} className='admin-logout-button-value'>
					{auth.admin.adminname}
					<img className='admin-logout-icon' src={mu} alt='icon' />
					{isAccordionOpen && (
						<div className='accordion-popover-adm'>
							<div className='modal-btn-div-pdf-inv-adm'>
								<button type='button' className='modal-btn-inv-adm'>
									<Link
										style={{ textDecoration: 'none', color: 'black' }}
										to='/adminpasswordchange'
									>
										Change Password
									</Link>
								</button>
								<button className='modal-btn-inv-adm' onClick={handleLogout}>
									Logout
								</button>
							</div>
						</div>
					)}
				</button>
			</div>
		</div>
	);
};

export default AdminAccordion;
