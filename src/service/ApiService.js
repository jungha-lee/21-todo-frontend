import { API_BASE_URL } from '../app-config';
const ACCESS_TOKEN = 'ACCESS_TOKEN';

export function call(api, method, request) {
    let headers = new Headers({
        'Content-Type': 'application/json',
    });

    // get ACCESS_TOKEN from local storage
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (accessToken && accessToken != null) {
        headers.append('Authorization', 'Bearer ' + accessToken);
    }

    const options = {
        headers: headers,
        url: API_BASE_URL + api,
        method: method,
    };
    if (request) {
        // GET method
        options.body = JSON.stringify(request);
    }
    return fetch(options.url, options)
        .then((response) =>
            response.json().then((json) => {
                if (!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        )
        .catch((error) => {
            console.log(error.status);
            if (error.status === 403) {
                window.location.href = '/login'; // redirect
            }
            return Promise.reject(error);
        });
}

export function signin(userDTO) {
    return call('/auth/signin', 'POST', userDTO).then((response) => {
        if (response.token) {
            // save token in local storage
            localStorage.setItem(ACCESS_TOKEN, response.token);
            // if token exists, redirect to Todo
            window.location.href = '/';
        }
    });
}

export function signout() {
    localStorage.setItem(ACCESS_TOKEN, null);
    window.location.href = '/login';
}
