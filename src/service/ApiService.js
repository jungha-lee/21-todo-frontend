import { API_BASE_URL } from '../app-config';

export function call(api, method, request) {
    const options = {
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
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
        console.log('response : ', response);
        alert('Login token: ' + response.token);
    });
}
