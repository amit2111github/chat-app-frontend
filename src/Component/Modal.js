import * as React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	borderRadius: "10px",
	boxShadow: 24,
	p: 4,
};

const pad = (num) => {
	if ((num + "").length == 1) return "0" + num;
	return num;
};
const BasicModal = ({ handleClose, date, time, open, setDate, setTime }) => {
	const curtime = new Date();
	const today =
		curtime.getFullYear() +
		"-" +
		pad(curtime.getMonth() + 1) +
		"-" +
		pad(curtime.getDate());
	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<p>Select Date and time to send message at future time</p>
					<div style={{ marginBottom: "10px" }}>
						<input
							onChange={(e) => setDate(e.target.value)}
							type="date"
							min={today}
							placeholder="Enter Date"
							className="form-control"
							value={date}
						/>
					</div>
					<div style={{ marginBottom: "10px" }}>
						<input
							onChange={(e) => setTime(e.target.value)}
							type="time"
							className="form-control"
							placeholder="enter time"
							value={time}
						/>
					</div>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
						}}
					>
						<button
							disabled={!date && !time}
							className="btn btn-primary btn-md"
							onClick={() => {
								setDate("");
								setTime("");
							}}
						>
							clear time
						</button>
						<button
							className="btn btn-primary btn-md"
							onClick={handleClose}
						>
							close
						</button>
					</div>
				</Box>
			</Modal>
		</div>
	);
};

export default BasicModal;
