// import useAuth from "./useAuth";
// import axios from 'axios';

// const useRefreshToken = async () => {
//     const { setAuth } = useAuth();

//     const refreshToken = setAuth(prev => {
//         return (JSON.stringify(prev.refreshToken))
//     });

//     const refresh = async () => {
//         const response = await axios.post('http://localhost:3001/users/token',
//             JSON.stringify({ token: refreshToken }),
//             {
//                 headers: { 'Content-Type': 'application/json' },
//                 withCredentials: true
//             }
//         );
//         console.log(response);
//     }

// };

// export default useRefreshToken;