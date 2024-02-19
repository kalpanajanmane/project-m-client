import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Userdashboard.css';
import { useUserAuth } from './UserAuth';
import mu from '../images/mu.png';

const UserAccordion = () => {
	const auth = useUserAuth();
	const [isAccordionOpen, setIsAccordionOpen] = useState(false);

	const toggleAccordion = () => {
		setIsAccordionOpen(!isAccordionOpen);
	};

	const handleLogout = () => {
		auth.userlogout();
	};

	return (
		<div>
			<div>
				<button onClick={toggleAccordion} className='admin-logout-button-value'>
					{auth.user.username}
					<img className='admin-logout-icon' src={mu} alt='icon' />
					{isAccordionOpen && (
						<div className='accordion-popover-adm'>
							<div className='modal-btn-div-pdf-inv-adm'>
								<button type='button' className='modal-btn-inv-adm'>
									<Link
										style={{ textDecoration: 'none', color: 'black' }}
										to='/userpasswordchange'
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

export default UserAccordion;
