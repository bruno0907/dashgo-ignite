import axios, { AxiosError } from "axios";
import { parseCookies, setCookie } from "nookies";

let cookies = parseCookies();
let isRefreshing = false;
let failedRequestsQueue = [];

const auth = axios.create({
  baseURL: 'http://localhost:3333', 
  headers: {
    Authorization: `Bearer ${cookies['dashgo.token']}`
  }
});

auth.interceptors.response.use(
  response => {
    return response
  }, 
  (error: AxiosError) => {
    if(error.response.status === 401) {
      if(error.response.data?.code === 'token.expired') {        
        cookies = parseCookies();

        const { 'dashgo.refreshToken' : refreshToken } = cookies;

        const originalConfig = error.config

        if(!isRefreshing) {
          isRefreshing = true;

          auth.post('/refresh', {
            refreshToken,
          }).then(({ data }) => {
            setCookie(undefined, 'dashgo.token', data.token, {
              maxAge: 60 * 60 * 24 * 30, // 30 days
              path: '/'
            })
            setCookie(undefined, 'dashgo.refreshToken', data.refreshToken, {
              maxAge: 60 * 60 * 24 * 30, // 30 days
              path: '/'
            })
  
            auth.defaults.headers['Authorization'] = `Bearer ${data.token}` // Default header setup on refresh token

            failedRequestsQueue.forEach(request => request.onRequestSuccess(data.token));
            failedRequestsQueue = [];
          }).catch(error => {
            failedRequestsQueue.forEach(request => request.onRequestFailure(error));
            failedRequestsQueue = [];
          }).finally(() => {
            isRefreshing = false;
          })
        }

        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            onRequestSuccess: (token: string) => {
              originalConfig.headers['Authorization'] = `Bearer ${token}`

              resolve(auth(originalConfig))
            },
            onRequestFailure: (error: AxiosError) => {
              reject(error)
            } 
          })
        })
      } else {
        // user logout if token is refreshing

      }
    }
  }
);

export { auth };
