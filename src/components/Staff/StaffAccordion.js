import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Staffdashboard.css';
import { useStaffAuth } from './StaffAuth';
import mu from '../images/mu.png';

const StaffAccordion = () => {
	const auth = useStaffAuth();
	const [isAccordionOpen, setIsAccordionOpen] = useState(false);

	const toggleAccordion = () => {
		setIsAccordionOpen(!isAccordionOpen);
	};

	const handleLogout = () => {
		auth.stafflogout();
	};

	return (
		<div>
			<div>
				<button onClick={toggleAccordion} className='admin-logout-button-value'>
					{auth.staff.staffname}
					<img className='admin-logout-icon' src={mu} alt='icon' />
					{isAccordionOpen && (
						<div className='accordion-popover-adm'>
							<div className='modal-btn-div-pdf-inv-adm'>
								<button type='button' className='modal-btn-inv-adm'>
									<Link
										style={{ textDecoration: 'none', color: 'black' }}
										to='/staffpasswordchange'
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

export default StaffAccordion;
