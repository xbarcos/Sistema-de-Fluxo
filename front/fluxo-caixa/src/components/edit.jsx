import { React } from "react";
import { Button } from "@chakra-ui/react";
import Axios from "axios";

async function EditRequest(id) {
  await Axios.put(`http://localhost:3000/bills/${id}`)
    .then((response) => {
      window.location.replace(`/show`);
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}
export const Edit = (props) => {
  const { id } = props;
  return (
    <Button colorScheme="red" onClick={() => {deleteRequest(id)}}
    >
      Deletar
    </Button>
  );
}
