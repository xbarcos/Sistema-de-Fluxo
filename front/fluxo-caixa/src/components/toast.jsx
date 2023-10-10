import React from "react";
import { useToast } from "@chakra-ui/react";

export const showToast = () => {
  const toast = useToast();
	const makeToast = (title, desc, status) => {
		toast({
			title: title,
			description: desc,
			status: status,
			duration: 2000,
			isClosable: false,
			position: 'top-right'
		})
	}
  return makeToast;
}
