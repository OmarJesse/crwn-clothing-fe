import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  SearchContainer,
  SearchWrapper,
  SearchInput,
  SearchIcon,
  SearchResults,
  SearchResultItem,
  SearchResultImage,
  SearchResultInfo,
  SearchResultPrice,
  NoResults,
  ClearButton,
  SearchOverlay,
} from './search-bar.styles';

const SearchBar = ({ allProducts, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = allProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered.slice(0, 6)); // Limit to 6 results
      setIsOpen(true);
    } else {
      setFilteredProducts([]);
      setIsOpen(false);
    }
  }, [searchTerm, allProducts]);

  const handleProductClick = (productId, categoryTitle) => {
    navigate(`/shop/${categoryTitle}`);
    setSearchTerm('');
    setIsOpen(false);
    if (onClose) onClose();
  };

  const handleClear = () => {
    setSearchTerm('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleOverlayClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && <SearchOverlay onClick={handleOverlayClick} />}
      <SearchContainer>
        <SearchWrapper isOpen={isOpen}>
          <SearchIcon>🔍</SearchIcon>
          <SearchInput
            ref={inputRef}
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => searchTerm && setIsOpen(true)}
          />
          {searchTerm && (
            <ClearButton onClick={handleClear}>×</ClearButton>
          )}
        </SearchWrapper>

        {isOpen && (
          <SearchResults>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <SearchResultItem
                  key={product.id}
                  onClick={() => handleProductClick(product.id, product.categoryTitle)}
                >
                  <SearchResultImage src={product.imageUrl} alt={product.name} />
                  <SearchResultInfo>
                    <h4>{product.name}</h4>
                    <SearchResultPrice>${product.price}</SearchResultPrice>
                  </SearchResultInfo>
                </SearchResultItem>
              ))
            ) : (
              <NoResults>
                <span>😕</span>
                <p>No products found</p>
              </NoResults>
            )}
          </SearchResults>
        )}
      </SearchContainer>
    </>
  );
};

export default SearchBar;
