import React from 'react';
import ReactPasswordToggleIcon from 'react-password-toggle-icon';
const ChangePasswordForm = React.forwardRef((props, ref) => {
	const { showPasswordRef, showConfirmPasswordRef } = ref;
	const {
		password,
		handleChange,
		handleSubmit,
		confirmPassoword,
	} = props;
	return (
		<div className="row">
			<div className="col-md-6 offset-sm-3 text-left">
				<form className="mt-4 mb-4">
					<div className="mb-3 form-group" style={{ position: 'relative' }}>
						<h5 className="fw-bold">Enter New Password</h5>

						<input
							ref={showPasswordRef}
							className="form-control"
							type="password"
							placeholder="Password"
							value={password}
							onChange={handleChange}
							name="password"
						/>
						<ReactPasswordToggleIcon
							inputRef={showPasswordRef}
							style={{ marginTop: '40px' }}
							hideIcon={() => {
								if (showConfirmPasswordRef.currnet) {
									showConfirmPasswordRef.current.type = 'password';
								}
								return <i className="fa fa-eye" aria-hidden="true"></i>;
							}}
							showIcon={() => {
								if (showConfirmPasswordRef.currnet) {
									showConfirmPasswordRef.current.type = 'text';
								}
								return <i className="fa fa-eye-slash" aria-hidden="true"></i>;
							}}
						/>
					</div>
					<div className="mb-3 form-group" style={{ position: 'relative' }}>
						<h5 className="fw-bold">Confirn Password</h5>

						<input
							ref={showConfirmPasswordRef}
							className="form-control"
							type="password"
							placeholder="Confirm Password"
							value={confirmPassoword}
							onChange={handleChange}
							name="confirmPassword"
						/>
						<ReactPasswordToggleIcon
							inputRef={showConfirmPasswordRef}
							style={{ marginTop: '40px' }}
							hideIcon={() => {
								if (showConfirmPasswordRef.currnet) {
									showConfirmPasswordRef.current.type = 'password';
								}

								return <i className="fa fa-eye" aria-hidden="true"></i>;
							}}
							showIcon={() => {
								if (showConfirmPasswordRef.currnet) {
									showConfirmPasswordRef.current.type = 'text';
								}
								return <i className="fa fa-eye-slash" aria-hidden="true"></i>;
							}}
						/>
					</div>
					<div class="addtoCart mb-4">
						<a href onClick={handleSubmit} type="submit">
							Reset Password
						</a>
					</div>
				</form>
			</div>
		</div>
	);
});

export default ChangePasswordForm;
