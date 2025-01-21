import {
  Box,
  Flex,
  HStack,
  Link,
  useColorModeValue,
  Heading,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

export default function Navbar() {
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            <Heading size='lg'>
              <Link
                href={`/`}
                _hover={{ textDecoration: "none", color: "gray.500" }}
              >
                Sieg
              </Link>
            </Heading>
          </HStack>
          <Flex alignItems={"center"}>
            <ColorModeSwitcher />
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
