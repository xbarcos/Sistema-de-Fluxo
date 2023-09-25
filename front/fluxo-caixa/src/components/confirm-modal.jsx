import React from "react";
import { formatDate } from "./read";

const Confirm = (name, date, situation) => {
  const header = "Confirmação";
  const body = `A ${situation} de nome ${name} está marcada para o dia ${formatDate(date)}, gostaria de incluir para as contas do mês referido mesmo assim?`;
  const color = 'green'
	return (
    <>
      <Button onClick={onOpen} colorScheme={color}>
				Criar Nova Entrada
      </Button>
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
                onClick={() => console.log('deu certo')}
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
};
export default Confirm;