import React, {useState, useEffect} from "react";
import Axios from "axios";

const Fetch = (id) => {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    Axios
      .get(`http://localhost:3000/bills/${id}`)
      .then((response) => {
        setBills(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return bills;
};
export default Fetch;
