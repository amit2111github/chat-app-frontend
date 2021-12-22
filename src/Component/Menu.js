import React from 'react';
import { withRouter } from 'react-router-dom';
import '../style/cardStyle.css';
import { isSignedIn, signOut } from '../apicaller/auth';

const Menu = () => (
	<div class="container" style={{ height: '50px' }}>
		<div class="header_section_top">
			<div class="row">
				<div class="col-sm-12">
					<div class="custom_menu">
						<ul>
							<li>
								<a style={{ textDecoration: 'none' }} href="/">
									Home
								</a>
							</li>
							<li>
								<a style={{ textDecoration: 'none' }} href="/user/contactpage">
									Friends
								</a>
							</li>

							<li>
								<a style={{ textDecoration: 'none' }} href="/user/dashboard">
									DashBoard
								</a>
							</li>

							{!isSignedIn() && (
								<>
									<li>
										<a style={{ textDecoration: 'none' }} href="/signin">
											Sign In
										</a>
									</li>
									<li>
										<a style={{ textDecoration: 'none' }} href="/signup">
											Sign Up
										</a>
									</li>
								</>
							)}
							{isSignedIn() && (
								<li>
									<a
										style={{ textDecoration: 'none' }}
										href="/"
										onClick={() => {
											signOut();
										}}
									>
										Sign Out
									</a>
								</li>
							)}
						</ul>
					</div>
				</div>
			</div>

		</div>
	</div>
);
export default withRouter(Menu);
