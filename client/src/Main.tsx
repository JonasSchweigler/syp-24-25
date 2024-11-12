import {
  Container,
  Box,
  Heading,
  VisuallyHidden,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import NothingFoundAlert from "./NothingFoundAlert";
import PreviewBox from "./PreviewBox";
import Search from "./Search";
import Suggestions from "./Suggestions";
import { getInfos, getSuggestions } from "./utils/API";
import { getDownloadUrl, isYtUrl } from "./utils/helpers";

export default function Main() {
  const toast = useToast();
  const [downloadUrl, setDownloadUrl] = useState("");
  const [input, setInput] = useState("");
  const [isConvertionLoading, setConvertionLoading] = useState(false);
  const [isSearchLoading, setSearchLoading] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [pagingInfo, setPagingInfo] = useState<any>(null);
  const [error, setError] = useState(false);
  const downloadBtnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (downloadUrl.length && downloadBtnRef?.current) {
      setConvertionLoading(false);
      downloadBtnRef.current.click();
    }
  }, [downloadUrl]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const reset = () => {
    setError(false);
    setInput("");
    setSearchLoading(false);
    setConvertionLoading(false);
  };

  const fetchSuggestions = async () => {
    setError(false);
    setSearchLoading(true);
    try {
      const { data } = await getSuggestions(input, pagingInfo?.nextPageToken);
      setPagingInfo(data.pagingInfo);
      setSuggestions((previousSuggestions) => [...data.data]);
      setSearchLoading(false);
    } catch (err) {
      console.error(err);
      setError(true);
      // if (err && err.status === 403) {
      toast({
        title: "YouTube Search Limit exceeded",
        description:
          "You can search again tomorrow. Just paste the URL into the searchfield. This will still works. The YouTube-API allows only a few search requests.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      // }
      setTimeout(() => {
        reset();
      }, 2000);
      console.error(err);
    }
  };

  const handleSearch = async () => {
    const isYouTubeUrl = isYtUrl(input);
    if (!input) {
      setError(true);
      return;
    }
    console.log("isYouTubeUrl", isYouTubeUrl);
    if (isYouTubeUrl) {
      setError(false);
      setConvertionLoading(true);
      try {
        const { data } = await getInfos(input);
        const {
          data: { videoDetails },
        } = data;
        setCurrentVideo(videoDetails);
        setConvertionLoading(false);
      } catch (err) {
        setError(true);
        setConvertionLoading(false);
      }
    } else {
      fetchSuggestions();
    }
  };

  const chooseFormat = async (format: string, videoId: string) => {
    setDownloadUrl("");
    try {
      const downloadUrl = getDownloadUrl(videoId, format);
      setDownloadUrl(downloadUrl);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <>
      <Container maxW='container.md'>
        <Box textAlign='center' fontSize='xl'>
          <Box mt='5' mb='5'>
            {/* <Heading size='2xl' mb='2'>
              {colorMode === "light" ? <LogoBlack /> : <LogoWhite />}
            </Heading> */}
            <Heading size='2xl' mb='2'>
              YouTube Downloader
            </Heading>
          </Box>
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
          <PreviewBox
            data={currentVideo}
            chooseFormat={chooseFormat}
            isLoading={isConvertionLoading}
          />
        </Box>
        {pagingInfo?.totalResults === 0 && <NothingFoundAlert />}
        <Suggestions
          data={suggestions}
          chooseFormat={chooseFormat}
          isLoading={isSearchLoading}
        />
        {!!suggestions.length && (
          <Button
            onClick={fetchSuggestions}
            isLoading={isSearchLoading}
            loadingText='Loading more...'
            colorScheme='gray'
            width='100%'
          >
            Load More
          </Button>
        )}
      </Container>
      <VisuallyHidden>
        <a href={downloadUrl} download ref={downloadBtnRef}>
          {downloadUrl}
        </a>
      </VisuallyHidden>
    </>
  );
}
