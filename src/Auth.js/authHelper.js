// import axios from "axios";
// import { API } from "../API";


export const isAutheticated = () => {
    if (typeof window == "undefined") {
      return true;
    }
    if (localStorage.getItem("auth")) {
      return JSON.parse(localStorage.getItem("auth"));
  
    } else {
      return false;
    }
  };
  
//   export const user = async () => {
//     const { token } = JSON.parse(localStorage.getItem("auth"))
//     try {
  
//       const response = await axios
//         .get(`${API}/api/user`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         })
  
//       const userData = response.data.data
//       return userData
//     }
  
//     catch (err) {
//       console.log(err);
//     }
//   }
  

  