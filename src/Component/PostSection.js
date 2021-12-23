import React, { useState, useEffect, useRef } from "react"
import "../style/PostSection.css";
import Post from "./Post";
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import Menu from "./Menu";
import Footer from "./Footer"
import Sidebar from "./Sidebar"
import Widgets from "./Widgets"
import { getAllPost, isSignedIn, likeComment, sendPost, getPostOnSkip, likePost, commentCreation } from "../apicaller/auth"
import { errorMessage, successMessage, loadingMessage, loader } from './Message';
const PostSection = ({ history }) => {
    const attachmentRef = useRef('');
    const postButtonRef = useRef('');
    const [hasMorePost, setHasMorePost] = useState(true);
    const [pageCount, setPageCount] = useState(0);
    const [showEmojiSelector, setShowEmojiSelector] = useState(false);
    const [post, setPost] = useState([]);
    const [showLoader, setShowLoader] = useState(false);
    const preloadPost = async () => {
        const data = await getAllPost();
        setPost([...data]);
    };
    useEffect(() => {
        preloadPost();
    }, []);

    const getMorePost = async () => {
        setShowLoader(true);
        setPageCount(pageCount + 1);
        const data = await getPostOnSkip((pageCount + 1) * 4);
        if (data.length == 0) setHasMorePost(false);
        setPost([...post, ...data]);
        setShowLoader(false);
    };
    const [values, setValues] = useState({ error: '', success: '', loading: '' });
    const [comment, setComment] = useState('');
    const { error, success, loading } = values;

    const [postDescription, setpostDescription] = useState('');
    const { user, token } = isSignedIn();
    const increasePostLike = async (postId, postIndex) => {
        if (!isSignedIn()) {
            history.push('/signin');
            return;
        }
        const data = await likePost(user._id, token, postId);
        console.log(data);
        if (data.error) {
            setValues({ ...values, error: data.error });
            return;
        }
        let newPost = [...post];
        newPost[postIndex].likes = data;
        setPost(newPost);
    };
    const handleCommentSubmit = async (postId) => {
        if (!isSignedIn()) {
            history.push('/signin');
            return;
        }
        const data = await commentCreation(user._id, token, postId, comment);
        if (data.error) {
            setValues({ ...values, error: data.error });
        }
        setComment('');
    };
    const handlePostSubmit = async (event) => {
        if (!isSignedIn()) {
            history.push('/signin');
            return;
        }
        setValues({ ...values, loading: true });

        if (!postDescription && attachmentRef.current.files.length === 0) {
            setValues({ ...values, loading: false, error: "Post Can't be Empty" });
            setTimeout(() => {
                setValues({ ...values, loading: false, error: '' });
            }, 2000);
            return;
        }
        postButtonRef.current.disabled = true;
        const formdata = new FormData();
        console.log(attachmentRef.current.files);
        Array.from(attachmentRef.current.files).forEach((item, index) => {
            formdata.append('attachment' + index, item);
        });
        formdata.append('description', postDescription);
        const data = await sendPost(user._id, token, formdata);
        setpostDescription('');
        setValues({ ...values, loading: false });
        postButtonRef.current.disabled = false;
        if (data && data.data) {
            setValues({ ...values, error: data.error, success: false, loading: false, postDescription: '' });
        } else {
            setValues({ ...values, error: false, success: true, loading: false, postDescription: '' });
            setTimeout(() => {
                setValues({ ...values, error: false, success: false, loading: false, postDescription: '' });
            }, 2000);
        }
    };
    const handleChange = (event) => {
        if (event.target.name === 'comment') {
            setComment(event.target.value);
        } else {
            setpostDescription(event.target.value);
        }
    };
    const increaseCommentLike = async (commentId, postIndex, commentIndex) => {
        if (!isSignedIn()) {
            history.push('/signin');
            return;
        }
        const data = await likeComment(user._id, commentId, token);
        if (data.error) {
            setValues({ ...values, error: data.error });
            return;
        }
        let newPost = [...post];
        newPost[postIndex].comment[commentIndex].like = data;
        setPost(newPost);
    };
    return (
        <div style={{ backgroundColor: "#f1f2f5", width: "100%", overflow: "hidden" }}>
            <div >
                <Menu />

            </div>

            <div className="app-body row">
                <Sidebar history={history} />
                <div className="feed col-7" >
                    <div className="mt-4" style={{ width: "100%", marginTop: "30px" }}>
                        {error && errorMessage(error)}
                        {success && successMessage('Post is posted')}
                        {loading && loadingMessage('Processing...')}
                        <div className="row mb-2 mt-3">
                            <div className="col-8 mb-3 d-flex flex-row">
                                <svg
                                    onClick={() => setShowEmojiSelector(!showEmojiSelector)}
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="icon"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>

                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Add New Post"
                                    value={postDescription}
                                    onChange={handleChange}
                                    style={{ width: "100%" }}
                                />


                                <input
                                    ref={attachmentRef}
                                    multiple="multiple"
                                    type="file"
                                    name="attachment"
                                    style={{ display: 'none' }}
                                />
                            </div>

                            <div className="col-4" style={{ width: "150px", marginLeft: "40px" }}>
                                <img
                                    type="file"
                                    onClick={() => attachmentRef.current.click()}
                                    style={{ width: '35px', height: '40px', paddingRight: "6px" }}
                                    alt="attachment"
                                    src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/000000/external-attachment-basic-ui-elements-flatart-icons-outline-flatarticons.png"
                                />
                                <button
                                    ref={postButtonRef}
                                    className="btn btn-primary shadow btn-md"
                                    onClick={handlePostSubmit}

                                >
                                    Post
                                </button>
                            </div>
                            {showEmojiSelector && (
                                <div className="col-8 offset-1 mb-3">
                                    <Picker onSelect={(e) => setpostDescription((oldValue) => oldValue + e.native)} />
                                </div>
                            )}
                        </div>
                    </div>
                    <div >
                        <InfiniteScroll
                            className="container"
                            dataLength={post.length}
                            next={getMorePost}
                            hasMore={hasMorePost}
                            loader={<h4 className="text-center"></h4>}
                            endMessage={
                                <p style={{ textAlign: 'center' }}>
                                </p>
                            }
                            refreshFunction={getMorePost}
                            pullDownToRefresh
                            pullDownToRefreshThreshold={50}
                            pullDownToRefreshContent={
                                <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
                            }
                            releaseToRefreshContent={
                                <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
                            }
                        >
                            {post.map((post, index) => (
                                <Post key={post._id} post={post} increaseCommentLike={increaseCommentLike} increasePostLike={increasePostLike} index={index} handleChange={handleChange} handleCommentSubmit={handleCommentSubmit} commentText={comment} />
                            ))}
                            {showLoader && loader()}
                        </InfiniteScroll>
                    </div>
                </div>
                <Widgets />
            </div>

            <Footer />
        </div >
    )

}
export default PostSection;