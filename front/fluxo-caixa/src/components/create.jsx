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
import Confirm from './confirm-modal.jsx'
import { formatDate } from "./read";

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

  const body = `Deseja incluir ${name} no valor de ${price} para as contas do próximo mês?`;
  const header = "Nova Entrada";
  const color = "green";

  const submitValue = () => {
    const data = {
      name: name,
      price: validatePrice(price),
      bank: bank,
      situation: situation,
      date: date,
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
              <FormLabel>Parcelamento</FormLabel>
              <Select onChange={(e) => setSituation(e.target.value)}>
                <option default value="1">1x</option>
                <option value="2">2x</option>
                <option value="3">3x</option>
                <option value="4">4x</option>
                <option value="5">5x</option>
                <option value="6">6x</option>
                <option value="7">7x</option>
                <option value="8">8x</option>
                <option value="9">9x</option>
                <option value="10">10x</option>
                <option value="11">11x</option>
                <option value="12">12x</option>
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
            {/* <Confirm name={name} situation={situation} date={date}/> */}
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
