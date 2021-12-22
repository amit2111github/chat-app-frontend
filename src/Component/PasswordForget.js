import React, { useState, useRef } from 'react';
import Footer from './Footer';
import Menu from './Menu';
import { errorMessage, successMessage, loadingMessage } from './Message';
import { changePassword } from '../apicaller/auth';

const PasswordForget = () => {
	const changePasswordRef = useRef();
	const [values, setValues] = useState({ error: '', success: '', loading: '' });
	const { error, success, loading } = values;
	const [email, setEmail] = useState();
	const handleChange = (event) => {
		setEmail(event.target.value);
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!email) {
			setValues({ ...values, error: 'Email is required' });
		}
		changePasswordRef.current.disabled = true;
		setValues({ ...values, error: false, success: false, loading: true });
		const data = await changePassword(email);
		setValues({ ...values, error: false, success: false, loading: false });
		setEmail('');
		changePasswordRef.current.disabled = false;
		if (data.error) {
			setValues({ ...values, error: data.error, success: false });
			return;
		}
		setValues({ ...values, error: false, success: true });
	};
	const passwordChangeForm = () => {
		return (
			<div className="row">
				<div className="col-md-6 offset-sm-3 text-left">
					<form>
						<div className=" mb-3 form-group">
							<label className="fw-bold text-xl-">Email address</label>
							<input
								className="form-control"
								type="text"
								placeholder="Email"
								value={email}
								onChange={handleChange}
								name="email"
							/>
						</div>

						<div>
							<button
								className="addtoCart btn-block rounded"
								style={{ width: '100%' }}
								ref={changePasswordRef}
							>
								<a href onClick={handleSubmit} type="submit">
									Change Passoword
								</a>
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	};
	return (
		<>
			<div className="fashion_section" style={{ backgroundColor: "#f0de6e" }}>
				<Menu />
				<div className="logo_section mb-2">
					{/* // logo section */}
					<div className="container">
						<div className="row">
							<div className="col-sm-12">
								<div className="logo">
									<a href="/">
										<img
											alt="Logo"
											style={{ maxwidth: "100%" }}
											src="https://fontmeme.com/permalink/211220/293d7532b26cd531b84fcc2c6d4fa661.png"
										/>
									</a>
								</div>
							</div>
						</div>
						<p className="messages font-weight-normal">Welcome Back</p>
						{error && errorMessage(error)}
						{success && successMessage("Check your MailBox")}
						{loading && loadingMessage("Processing...")}
						{passwordChangeForm()}
					</div>
					{/* logo ends here */}
				</div>
			</div>
			<Footer />
		</>
	);
};
export default PasswordForget;
