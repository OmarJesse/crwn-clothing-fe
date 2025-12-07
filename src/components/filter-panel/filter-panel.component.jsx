import { useState } from 'react';
import {
  FilterPanelOverlay,
  FilterPanel,
  FilterHeader,
  FilterTitle,
  CloseButton,
  FilterSection,
  FilterLabel,
  PriceRange,
  PriceInput,
  ColorOptions,
  ColorOption,
  SizeOptions,
  SizeOption,
  ApplyButton,
  ResetButton,
  FilterActions,
} from './filter-panel.styles';

const FilterPanelComponent = ({ isOpen, onClose, onApplyFilters }) => {
  const [priceRange, setPriceRange] = useState({ min: 0, max: 500 });
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);

  const colors = [
    { name: 'Red', hex: '#EF4444' },
    { name: 'Blue', hex: '#3B82F6' },
    { name: 'Green', hex: '#10B981' },
    { name: 'Yellow', hex: '#F59E0B' },
    { name: 'Purple', hex: '#8B5CF6' },
    { name: 'Pink', hex: '#EC4899' },
    { name: 'Black', hex: '#000000' },
    { name: 'White', hex: '#FFFFFF' },
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const toggleColor = (color) => {
    setSelectedColors(prev =>
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  const toggleSize = (size) => {
    setSelectedSizes(prev =>
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const handleApply = () => {
    onApplyFilters?.({
      priceRange,
      colors: selectedColors,
      sizes: selectedSizes,
    });
    window.showToast?.('Filters applied! 🎨', 'success');
    onClose();
  };

  const handleReset = () => {
    setPriceRange({ min: 0, max: 500 });
    setSelectedColors([]);
    setSelectedSizes([]);
    window.showToast?.('Filters reset ♻️', 'info');
  };

  if (!isOpen) return null;

  return (
    <>
      <FilterPanelOverlay onClick={onClose} />
      <FilterPanel>
        <FilterHeader>
          <FilterTitle>Filters</FilterTitle>
          <CloseButton onClick={onClose}>✕</CloseButton>
        </FilterHeader>

        <FilterSection>
          <FilterLabel>Price Range</FilterLabel>
          <PriceRange>
            <PriceInput
              type="number"
              value={priceRange.min}
              onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
              placeholder="Min"
            />
            <span>—</span>
            <PriceInput
              type="number"
              value={priceRange.max}
              onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
              placeholder="Max"
            />
          </PriceRange>
        </FilterSection>

        <FilterSection>
          <FilterLabel>Colors</FilterLabel>
          <ColorOptions>
            {colors.map((color) => (
              <ColorOption
                key={color.name}
                color={color.hex}
                isSelected={selectedColors.includes(color.name)}
                onClick={() => toggleColor(color.name)}
                title={color.name}
              />
            ))}
          </ColorOptions>
        </FilterSection>

        <FilterSection>
          <FilterLabel>Sizes</FilterLabel>
          <SizeOptions>
            {sizes.map((size) => (
              <SizeOption
                key={size}
                isSelected={selectedSizes.includes(size)}
                onClick={() => toggleSize(size)}
              >
                {size}
              </SizeOption>
            ))}
          </SizeOptions>
        </FilterSection>

        <FilterActions>
          <ResetButton onClick={handleReset}>Reset</ResetButton>
          <ApplyButton onClick={handleApply}>Apply Filters</ApplyButton>
        </FilterActions>
      </FilterPanel>
    </>
  );
};

export default FilterPanelComponent;
