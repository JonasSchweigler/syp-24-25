import { Container, Box, Heading, useColorMode } from "@chakra-ui/react";
import LogoBlack from "./Icons/LogoBlack";
import LogoWhite from "./Icons/LogoWhite";
import { isYtUrl } from "./utils/helpers";
import { useState } from "react";
import Search from "./Search";

export default function Main() {
  const { colorMode } = useColorMode();
  const [input, setInput] = useState("");
  const [isConvertionLoading, setConvertionLoading] = useState(false);
  const [isSearchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSearch = async () => {
    const isYouTubeUrl = isYtUrl(input);
    if (!input) {
      setError(true);
      return;
    }
    if (isYouTubeUrl) {
      setError(false);
      setConvertionLoading(true);
      try {
        //TODO: fetch data
        setConvertionLoading(false);
      } catch (err) {
        setError(true);
        setConvertionLoading(false);
      }
    } else {
      //TODO: fetch suggesstions
    }
  };

  return (
    <Container maxW='container.md'>
      <Box textAlign='center' fontSize='xl'>
        {/* <Box mt='5' mb='5'>
          <Heading size='2xl' mb='2'>
            {colorMode === "light" ? <LogoBlack /> : <LogoWhite />}
          </Heading>
        </Box> */}
        <Search
          handleChange={handleChange}
          handleSearch={handleSearch}
          error={error}
          input={input}
          isLoading={
            (isConvertionLoading && !isSearchLoading) ||
            (!isConvertionLoading && isSearchLoading)
          }
        />
      </Box>
    </Container>
  );
}
