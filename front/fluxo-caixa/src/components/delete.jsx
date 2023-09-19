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
} from "@chakra-ui/react";
import Axios from "axios";

export default function Delete(props) {
  const { id } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const createAlert = (res) => {
    const Error = ['Erro!', 'Não foi possível deletar!']
    const Success = ['Sucesso!', 'A movimentação foi deletada com sucesso!']
    return (
      <>
        <Alert status={res == 'error'? 'error' : 'success'}>
          <AlertIcon />
          <AlertTitle>{res == 'error'? Error[0] : Success[0]}</AlertTitle>
          <AlertDescription>{res == 'error'? Error[1] : Success[1]}</AlertDescription>
        </Alert>
      </>
    );
  };

  async function deleteRequest(id) {
    await Axios.delete(`http://localhost:3000/bills/${id}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        createAlert('error')
      })
      .finally(() => {
        createAlert('success')
        window.location.reload(false);
      });
  }
  return (
    <>
      <Button colorScheme="red" onClick={onOpen}>
        Deletar
      </Button>

      <AlertDialog isOpen={isOpen} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Deletar
            </AlertDialogHeader>

            <AlertDialogBody>
              Você tem certeza? Não tem como voltar atrás depois de deletar!
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose}>Cancelar</Button>
              <Button
                colorScheme="red"
                onClick={() => deleteRequest(id)}
                ml={3}
              >
                Deletar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
