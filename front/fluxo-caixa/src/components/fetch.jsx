import axios from "axios";
import React, { useState, useEffect } from "react";

export default function fetch() {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/bills")
      .then((response) => {
        setBills(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return bills;
}

