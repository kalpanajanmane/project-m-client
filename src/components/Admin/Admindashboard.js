import React, { useState } from 'react';
import './Admindashboard.css';
import background from '../images/Desktop.png';
import gr from '../images/gr.png';
import mc from '../images/mc.png';
import mu from '../images/mu.png';
import mv from '../images/mv.png';
import mi from '../images/mi.png';
import ms from '../images/ms.png';
import ad from '../images/ad.png';
import vs from '../images/vs.png';
import { useAdminAuth } from './AdminAuth';
import { Link, useNavigate } from 'react-router-dom';
import AdminAccordion from './AdminAccordion';

function Admindashboard() {
	const auth = useAdminAuth();
	const navigate = useNavigate();

	const [isClicked, setIsClicked] = useState(false);

	const handleClick = () => {
		setIsClicked(!isClicked);
	};

	const handleLogout = () => {
		auth.adminlogout();
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
			<div className='admin-dashboard'>
				<div className='admin-logout'>
					<div className='admin-logout-box'>
						<div className='admin-logout-container'>
							<div className='admin-logout-button'>
								{/* <button
									onClick={handleClick}
									className='admin-logout-button-value'
								>
									{auth.admin.adminname}
									<img className='admin-logout-icon' src={mu} alt='icon' />
								</button>
								<div>
									{isClicked && (
										<div>
											<div className='active-user'>
												<Link
													style={{ textDecoration: 'none', color: 'black' }}
													to='/adminpasswordchange'
												>
													Change Password
												</Link>
											</div>
											<div
												type='button'
												className='active-user'
												onClick={handleLogout}
											>
												LOGOUT
											</div>
										</div>
									)}
								</div> */}
								<AdminAccordion />
							</div>
						</div>
					</div>
				</div>
				<h1 className='admin-dashboard-title'>MAIN MENU</h1>
				<div className='admin-dashboard-buttons'>
					<div className='admin-dashboard-buttons-row'>
						<button
							className='admin-dashboard-button'
							onClick={() => navigate('/admingenrep')}
						>
							<div className='admin-card-box'>
								<img
									src={gr}
									alt='gr'
									className='admin-dashboard-button-icon'
								/>
								<span>GENERATE REPORTS</span>
							</div>
						</button>
						<button
							className='admin-dashboard-button'
							onClick={() => navigate('/adminuserman')}
						>
							<div className='admin-card-box'>
								<img
									src={mu}
									alt='mu'
									className='admin-dashboard-button-icon'
								/>
								<span>MANAGE USERS</span>
							</div>
						</button>
						<button
							className='admin-dashboard-button'
							onClick={() => navigate('/admininvdash')}
						>
							<div className='admin-card-box'>
								<img
									src={mi}
									alt='ms'
									className='admin-dashboard-button-icon'
								/>
								<span>MANAGE INVOICE</span>
							</div>
						</button>
						<button
							className='admin-dashboard-button'
							onClick={() => navigate('/adminvecman')}
						>
							<div className='admin-card-box'>
								<img src={vs} alt='' className='admin-dashboard-button-icon' />
								<span>MANAGE OTHERS</span>
							</div>
						</button>
						<button
							className='admin-dashboard-button'
							onClick={() => navigate('/admincomman')}
						>
							<div className='admin-card-box'>
								<img
									src={mc}
									alt='mc'
									className='admin-dashboard-button-icon'
								/>
								<span>MANAGE COMPANY</span>
							</div>
						</button>
						<button
							className='admin-dashboard-button'
							onClick={() => navigate('/adminstaffman')}
						>
							<div className='admin-card-box'>
								<img
									src={mu}
									alt='mi'
									className='admin-dashboard-button-icon'
								/>
								<span>MANAGE STAFF</span>
							</div>
						</button>
						<button
							className='admin-dashboard-button'
							onClick={() => navigate('/adminsellman')}
						>
							<div className='admin-card-box'>
								<img
									src={mv}
									alt='mv'
									className='admin-dashboard-button-icon'
								/>
								<span>MANAGE CONSIGNEES</span>
							</div>
						</button>
						<button
							className='admin-dashboard-button'
							onClick={() => navigate('/adminbuyman')}
						>
							<div className='admin-card-box'>
								<img
									src={ms}
									alt='mi'
									className='admin-dashboard-button-icon'
								/>
								<span>MANAGE BUYERS</span>
							</div>
						</button>
						<button
							className='admin-dashboard-button'
							onClick={() => navigate('/adminconman')}
						>
							<div className='admin-card-box'>
								<img
									src={ad}
									alt='mc'
									className='admin-dashboard-button-icon'
								/>
								<span>MANAGE ITEMS</span>
							</div>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Admindashboard;
