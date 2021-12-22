import { API } from '../backend.js';
export const signin = (email, password) => {
	return fetch(`${API}/home/signin`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
	})
		.then((response) => response.json())
		.catch((err) => console.log(err));
};
export const signup = (name, email, password) => {
	return fetch(`${API}/home/signup`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ name, email, password }),
	})
		.then((response) => response.json())
		.catch((err) => console.log(err));
};
export const storeInLocalStorage = (data, next) => {
	if (typeof window !== undefined) {
		localStorage.setItem('jwt', JSON.stringify(data));
		next();
	}
};
export const isSignedIn = () => {
	if (typeof window !== undefined) {
		if (localStorage.getItem('jwt')) {
			return JSON.parse(localStorage.getItem('jwt'));
		}
	}
	return false;
};

export const addToContact = (email, userId, token) => {
	return fetch(`${API}/user/${userId}/create-contact`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ email }),
	})
		.then((res) => res.json())
		.catch((err) => console.log(err));
};

export const signOut = () => {
	if (typeof window !== undefined) {
		localStorage.removeItem('jwt');
		return fetch(`${API}/home/signout`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		})
			.then((res) => res.json())
			.catch((err) => console.log(err));
	}
};

export const getContactList = (userId, token) => {
	return fetch(`${API}/user/${userId}/getAllContact`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${token}`,
		},
	})
		.then((res) => res.json())
		.catch((err) => console.log(err));
};
export const setItemInLocalStorageForChat = (user) => {
	if (typeof window !== undefined) {
		localStorage.setItem('friend', JSON.stringify(user));
	}
};

export const getFriend = () => {
	if (typeof window !== undefined) {
		return JSON.parse(localStorage.getItem('friend'));
	}
};

export const getAllMessage = (userId, token, to) => {
	return fetch(`${API}/message/${userId}/getAllMessage/${to}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${token}`,
		},
	})
		.then((res) => res.json())
		.catch((err) => console.log(err));
};

export const sendMessage = (userId, token, description, sender, receiver) => {
	return fetch(`${API}/message/send/${userId}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ description, sender, receiver }),
	})
		.then((res) => res.json())
		.catch((err) => console.log(err));
};

export const deleteContact = (userId, token, email) => {
	return fetch(`${API}/user/${userId}/remove-contact`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ email }),
	})
		.then((res) => res.json())
		.catch((err) => console.log(err));
};
export const getAllPost = () => {
	return fetch(`${API}/post/getAll`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	})
		.then((res) => res.json())
		.catch((err) => console.log(err));
};
export const getPostOnSkip = (skipCount) => {
	console.log(skipCount);
	return fetch(`${API}/post/getAll?skipcount=${skipCount}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	})
		.then((res) => res.json())
		.catch((err) => console.log(err));
};
export const likeComment = (userId, commentId, token) => {
	console.log('like it');
	return fetch(`${API}/comment/like/${userId}/${commentId}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${token}`,
		},
	})
		.then((res) => res.json())
		.catch((err) => console.log(err));
};

export const sendPost = (userId, token, post) => {
	console.log(post, token, userId);

	return fetch(`${API}/post/create/${userId}`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: post,
	})
		.then((res) => console.log(res))
		.catch((err) => console.log(err));
};

export const likePost = (userId, token, postId) => {
	return fetch(`${API}/post/like/${userId}/${postId}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${token}`,
		},
	})
		.then((res) => res.json())
		.catch((err) => console.log(err));
};

export const commentCreation = (userId, token, postId, description) => {
	return fetch(`${API}/comment/create/${userId}/${postId}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ description }),
	})
		.then((res) => res.json())
		.catch((err) => console.log(err));
};

export const deleteMessage = (msgId, userId, token) => {
	return fetch(`${API}/message/delete/${userId}/${msgId}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${token}`,
		},
	})
		.then((res) => res.json())
		.catch((err) => console.log(err));
};

export const isValidLink = (token) => {
	return fetch(`${API}/user/reset-password?token=${token}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
	})
		.then((res) => res.json())
		.catch((err) => console.log(err));
};
export const changePassword = (email) => {
	return fetch(`${API}/user/forget-password`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
		body: JSON.stringify({ email }),
	})
		.then((res) => res.json())
		.catch((err) => console.log(err));
};

export const resetpassword = (password, token) => {
	console.log(token);
	return fetch(`${API}/user/update-password`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
		body: JSON.stringify({ password, token }),
	})
		.then((res) => res.json())
		.then((res) => {
			console.log(res);
			return res;
		})
		.catch((err) => console.log(err));
};
