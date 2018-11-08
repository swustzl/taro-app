import axios from 'axios';

class StatusError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'StatusError';
    this.message = message;
    this.status = status;
    // Error.captureStackTrace(this, this.constructor.name);
  }
}

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  const BEARER = 'Bearer ';
  if (!token) {
    return ({
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }
  return ({
    headers: {
      Authorization: BEARER + token,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
};

export default function request(options, token) {
  const authHeader = getAuthHeader();
  if (token) {
    authHeader.headers.Authorization = `Bearer ${token}`;
  }
  return axios.request({ ...options, ...authHeader }).then(({ data }) => {
    return Promise.resolve(data);
  }).catch((err) => {
    const { response = {}, message = '' } = err;
    const { status: statusCode } = response;
    if (statusCode === 404 || statusCode === 401 || statusCode === 500 || message === 'Type error') {
      throw new StatusError('请求异常', statusCode);
    } else {
      return Promise.resolve({ success: false, message: `请求异常，${message}` });
    }
  });
}
