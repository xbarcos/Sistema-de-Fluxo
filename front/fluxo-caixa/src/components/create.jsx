import { React, useState } from "react";
import Axios from "axios";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Select,
  Text,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";

export default function Create() {
  function validatePrice(value) {
    return value.replace(".", "").replace(",", ".");
  }

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [bank, setBank] = useState("Caixa Empresa");
  const [situation, setSituation] = useState("Entrada");
  const [date, setDate] = useState("");

  const submitValue = () => {
    const data = {
      name: name,
      price: validatePrice(price),
      bank: bank,
      situation: situation,
      date: date
    };
    fetch(data);
  };
  return (
    <>
      <Button onClick={onOpen} marginRight={"10px"} colorScheme="green">
        Nova Entrada
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Inserir Movimentação de Caixa</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Nome</FormLabel>
              <Input
                placeholder={"Identifique a movimentação"}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <FormLabel>Preço</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  fontSize="1.2em"
                  children="R$"
                />
                <Input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Digite o valor no formato 0,00"
                />
              </InputGroup>
              <FormLabel>Situação</FormLabel>
              <Select onChange={(e) => setSituation(e.target.value)}>
                <option value="Entrada">Entrada</option>
                <option value="Saída">Saída</option>
              </Select>
              <FormLabel>Banco</FormLabel>
              <Select
                isDisabled={situation === "Entrada" ? true : false}
                value={situation === "Entrada" ? "Caixa Empresa" : bank}
                onChange={(e) => setBank(e.target.value)}
              >
                <option value="Itaú">Itaú</option>
                <option value="C6">C6</option>
                <option value="Caixa Econômica">Caixa Econômica</option>
                <option value="Bradesco">Bradesco</option>
                <option
                  disabled={situation === "Saída" ? true : false}
                  value="Caixa Empresa"
                >
                  Saldo da Empresa
                </option>
              </Select>
              <Text fontSize={"12px"} padding={"12px"}>
                Caso a situação seja Entrada, o banco deve sempre ser marcado
                como Caixa da Empresa
              </Text>
              <FormLabel>Data da Movimentação</FormLabel>
              <Input
                onChange={(e) => setDate(e.target.value)}
                placeholder="Select Date"
                size="md"
                type="date"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={submitValue}
              variant="ghost"
              colorScheme="green"
            >
              Criar nova entrada
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

async function fetch(data) {
  const config = {
    headers: {
      "Content-Type": "aplication/json",
    },
  };
  console.log(data);
  await Axios.post("http://localhost:3000/bills", data)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => window.location.reload(false));
}
