import { Box, SimpleGrid, Heading } from "@chakra-ui/react";
import Suggestion from "./SuggestionV2";
import SuggestionsSkeleton from "./SuggestionsSkeleton";

interface Props {
  data: any[];
  isLoading: boolean;
  chooseFormat: (format: string, videoId: string) => void;
}
export default function Suggestions(props: Props) {
  const { data, isLoading, chooseFormat } = props;

  return (
<></>
  );
}
