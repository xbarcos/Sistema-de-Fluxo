import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";

export default function toastEffect() {
  const toast = useToast();

  useEffect(() => {
    const { search } = window.location;
    const param = new URLSearchParams(search).get("param");

    if (param === "%created") {
      toast({
        title: "Sucesso",
        description: "A movimentação foi criada com sucesso!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  }, []);

  return (
    {toast}
  );
}
