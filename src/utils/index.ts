import { UseToastOptions, useToast } from "@chakra-ui/react";

export const useCustomToast = () => {
  const toast = useToast();

  const showToast = (options: UseToastOptions) => {
    toast({
      ...options,
      duration: options.duration || 5000,
      isClosable: options.isClosable !== undefined ? options.isClosable : true,
    });
  };

  return showToast;
};
