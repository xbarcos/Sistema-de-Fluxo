import { React } from "react";
import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  flexbox,
  Flex,
  Text,
} from "@chakra-ui/react";
import { formatDate, formatMoney } from "./read";

import { DeleteIcon } from "@chakra-ui/icons";
import Axios from "axios";

export default function Delete(props) {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const { id, name, price, date, situation } = props;
  const header = "Deletar";
  const body = `Deseja cancelar a ${situation.toLowerCase()} de nome ${name}, referente ao dia ${formatDate(
    date
  )} no valor de ${formatMoney(price)}?`;
  const color = "red";

  const createOverlay = () => {
    return (
      <AlertDialog isOpen={isOpen} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent marginLeft={200}>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {header}
            </AlertDialogHeader>
            <AlertDialogBody>{body}</AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={onClose}>Cancelar</Button>
              <Button
                colorScheme={color}
                onClick={() => deleteRequest(id)}
                ml={3}
              >
                Deletar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    );
  };

  async function deleteRequest(id) {
    await Axios.delete(`http://localhost:3000/bills/${id}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        window.location.reload(false);
      });
  }

  return (
    <>
      <Button colorScheme="red" onClick={onOpen} size={"sm"}>
        <DeleteIcon boxSize={5} />
      </Button>
      {createOverlay()}
    </>
  );
}
