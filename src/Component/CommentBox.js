import React from 'react';

const CommentBox = ({ comment, handleChange, handleCommentSubmit, postId }) => {
	const handleKeyDown = (event) => {
		if (event.key === "Enter") handleCommentSubmit(postId);
	}
	return (
		<div className="row mt-4 container mb-3" >
			<div className="col-10 form-group">
				<input
					type="text"
					placeholder="Share Your Comment..."
					className="form-control"
					value={comment}
					name="comment"
					onChange={handleChange}
					onKeyDown={handleKeyDown}
				/>
			</div>
			<div className="col-1 form-group">
				<button className="btn btn-primary btn-md" onClick={() => handleCommentSubmit(postId)} >
					Comments
				</button>
			</div>
		</div >
	);
};

export default CommentBox;
