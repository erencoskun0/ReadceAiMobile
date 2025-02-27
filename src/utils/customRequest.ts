import axios from 'axios';
// import Cookies from 'js-cookie';

const customRequest = axios.create({
  baseURL: 'https://api.readceai.com',
});

// let isRefreshing = false;
// let failedQueue: any[] = [];

// const processQueue = (error: any, token: string | null = null) => {
//   failedQueue.forEach((prom) => {
//     if (token) {
//       prom.resolve(token);
//     } else {
//       prom.reject(error);
//     }
//   });

//   failedQueue = [];
// };

// customRequest.interceptors.request.use(
//   (config) => {
//     const token = " localStorage.getItem('accessToken')";
//     // const token = localStorage.getItem('accessToken');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// customRequest.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         })
//           .then((token) => {
//             originalRequest.headers.Authorization = `Bearer ${token}`;
//             return customRequest(originalRequest);
//           })
//           .catch((err) => Promise.reject(err));
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         const refreshToken = "localStorage.getItem('refreshToken')";
//         // const refreshToken = localStorage.getItem('refreshToken');
//         if (!refreshToken) {
//           return Promise.reject(error);
//         }

//         const { data } = await axios.post(
//           'https://cloudservices.ekofin.net/InformationService/AppUse/UserIdentity/RefreshToken',
//           {
//             refreshToken,
//             // UserId: Cookies.get('userId'),
//           }
//         );

//         const newToken = data.accessToken;
//         // localStorage.setItem('accessToken', newToken);

//         processQueue(null, newToken);

//         originalRequest.headers.Authorization = `Bearer ${newToken}`;
//         return customRequest(originalRequest);
//       } catch (err) {
//         // Cookies.remove('userId');
//         // Cookies.remove('user_Email');
//         // Cookies.remove('currentIp');
//         processQueue(err, null);
//         return Promise.reject(err);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export default customRequest;
