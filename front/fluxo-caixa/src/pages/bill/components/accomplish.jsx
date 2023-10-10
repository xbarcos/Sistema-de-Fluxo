import React from 'react';
import { Button } from '@chakra-ui/react';
import Axios from 'axios';

const AccomplishBill = async (bill) => {
  const config = {
    headers: {
      "Content-Type": "aplication/json",
    },
  };
  await Axios.put(`http://localhost:3000/bills/${bill._id}`, {accomplished: true})
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => window.location.replace("/show"));
}

const Accomplish = (props) => {
	const { bill, disabled } = props;
	return (
		<Button
		colorScheme='green'
		isDisabled={disabled}
		onClick={()=>AccomplishBill(bill)}
		>
			Efetuar Movimentação
		</Button>
	)
}
export default Accomplish;