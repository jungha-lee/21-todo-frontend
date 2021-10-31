let backendHost;

const hostname = window && window.location && window.location.hostname;

if (hostname === 'localhost') {
    backendHost = 'http://localhost:8080';
} else {
    backendHost = 'http://21-todo-backend-dev.eu-north-1.elasticbeanstalk.com';
}

export const API_BASE_URL = `${backendHost}`;
