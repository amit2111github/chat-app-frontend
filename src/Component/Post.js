import React, { useState } from 'react'
import timediff from 'timediff'
import '../style/NewPost.css'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import NearMeIcon from '@material-ui/icons/NearMe'
import { ExpandMoreOutlined, NearMe } from '@material-ui/icons'
import CommentBox from './CommentBox'
import { isSignedIn } from '../apicaller/auth'
import ImageGallery from 'react-image-gallery';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const getTimeString = (time) => {
	return time.years
		? time.years + ' years'
		: false || time.months
			? time.months + ' months'
			: false || time.weeks
				? time.weeks + ' weeks'
				: false || time.days
					? time.days + ' days'
					: false || time.hours
						? time.hours + ' hours'
						: false || time.minutes
							? time.minutes + ' minutes'
							: false || time.seconds
								? time.seconds + ' seconds'
								: 'just now'
}
const Post = ({
	post,
	index,
	increasePostLike,
	handleChange,
	handleCommentSubmit,
	commentText,
	increaseCommentLike,
}) => {
	let { user } = isSignedIn()
	if (!user) user = { _id: null };
	const [showComment, setShowComment] = useState(false)
	const [postLikeColor, setPostLikeColor] = useState(() => {
		if (post.likes.includes(user._id)) return '#5b96de'
		return 'grey'
	})
	const { postedBy, description, comment, createdAt } = post

	const time = getTimeString(
		timediff(createdAt, new Date(), { returnZeros: false }),
	)
	const settings = {
		dots: true,
		infinite: true,
		speed: 1000,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrow: "dark"
	};
	return (
		<div className="post-content">
			<div className="post-header">
				<img src="https://i.imgur.com/t9toMAQ.jpg" alt="Avatar" />
				<div className="post-header-info">
					<strong>{postedBy.name}</strong>
					<small>{time} ago</small>
				</div>
			</div>
			<p style={{ fontSize: '15px', fontWeight: 'normal' }}>{description}</p>
			<Slider {...settings}>
				{post.links.map((url, imageIndex) => {
					return (
						<div style={{ width: '70%', height: '100px' }} className="container">
							<img
								src={url}
								key={imageIndex}
								className="rounded border mb-1"
								style={{ width: "100%", height: "300px" }}
							/>
						</div>
					)
				})}
			</Slider>
			<div className="post-options">
				<div
					className="post-option"
					onClick={() => {
						increasePostLike(post._id, index)
						setPostLikeColor('#5b96de')
					}}
				>
					<ThumbUpIcon style={{ color: postLikeColor }} />
					<p>Like {post.likes.length}</p>
				</div>
				<div
					className="post-option"
					onClick={() => setShowComment(!showComment)}
				>
					<ChatBubbleOutlineIcon />
					<p>
						{comment.length > 0 ? comment.length + ' Comments' : 'No comments'}
					</p>
				</div>
				<div className="post-option">
					<NearMeIcon />
					<p>Share</p>
				</div>
				<div className="post-option">
					<AccountCircleIcon />
					<ExpandMoreOutlined />
				</div>
			</div>
			{showComment && (
				<ul className="comment">
					<CommentBox
						postId={post._id}
						comment={commentText}
						handleChange={handleChange}
						handleCommentSubmit={handleCommentSubmit}
					/>
					<div>
						<input type="text" placeholder="" />
					</div>
					{comment.map((comment, commentIndex) => {
						let colorForLikeButton = 'grey'
						comment.like.forEach((users) => {
							if (users._id === user._id) colorForLikeButton = '#5b96de'
						})

						return (
							<li key={comment._id} style={{ width: '100%' }}>
								<img src="https://i.imgur.com/t9toMAQ.jpg" alt="Avatar" />
								<div
									style={{ marginLeft: '10px', fontWeight: 'lighter' }}
									onClick={() => {
										if (colorForLikeButton === '#5b96de') return
										increaseCommentLike(comment._id, index, commentIndex)
									}}
								>
									<ThumbUpIcon
										style={{ fontSize: '15px', color: colorForLikeButton }}
									/>
									{comment.like.length}
								</div>
								<p>
									<strong>{comment.commentBy.name} : </strong>{' '}
									{comment.description}
								</p>
							</li>
						)
					})}
				</ul>
			)}
		</div>
	)
}
export default Post
