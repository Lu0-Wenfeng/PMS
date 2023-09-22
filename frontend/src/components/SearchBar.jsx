import { useRef } from "react";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";

const SearchBar = (onSearch) => {
  const ref = useRef(null);
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (ref.current) {
          onSearch(ref.current.value);
        }
      }}
    >
      <InputGroup w="500px" mt="5px">
        <Input
          ref={ref}
          borderRadius={10}
          placeholder="Search"
          variant="outline"
					bg="white"
					_placeholder={{ opacity: 1, color: 'gray.500' }}
        />
        <InputRightElement children={<BsSearch color="gray" />} />
      </InputGroup>
    </form>
  );
};

export default SearchBar;
