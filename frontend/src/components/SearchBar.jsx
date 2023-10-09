import React, { useRef, useState } from 'react';
import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Spinner,
} from '@chakra-ui/react';
import { BsSearch } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { searchProducts } from '../store/productSlice';

const SearchBar = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const ref = useRef(null);
  const dispatch = useDispatch();

  const handleSearch = async () => {
    if (ref.current) {
      const query = ref.current.value.toLowerCase();
      setLoading(true);
      setError(null);

      try {
        await dispatch(searchProducts(query));
      } catch (error) {
        setError('Search failed. Please try again.');
        console.error('Search failed', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSearch();
      }}
    >
      <InputGroup
        maxW={{ base: '100%', sm: '400px', md: '500px', lg: '600px' }}
        width="100%"
        mx="auto"
        mt="5px"
      >
        <Input
          ref={ref}
          borderRadius={10}
          placeholder="Search"
          variant="outline"
          bg="white"
          _placeholder={{ opacity: 1, color: 'gray.500' }}
        />
        <InputRightElement>
          <Button
            type="submit"
            colorScheme="blue"
            onClick={handleSearch}
            isDisabled={loading}
          >
            {loading ? <Spinner size="sm" color="white" /> : <BsSearch color="white" />}
          </Button>
        </InputRightElement>
      </InputGroup>
      {error && (
        <div style={{ color: 'red', marginTop: '5px' }}>
          Error: {error}
        </div>
      )}
    </form>
  );
};

export default SearchBar;
