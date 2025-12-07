import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import FloatingActionButton from "../../components/floating-action-button/floating-action-button.component";
import FilterPanel from "../../components/filter-panel/filter-panel.component";

import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";

const Shop = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.showToast?.('Scrolled to top ⬆️', 'info');
  };

  const handleSearch = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.showToast?.('Focus on search bar 🔍', 'info');
  };

  const handleFilter = () => {
    setIsFilterOpen(true);
  };

  const handleApplyFilters = (filters) => {
    console.log('Applied filters:', filters);
    // In a real app, you would filter products here
  };

  return (
    <>
      <Routes>
        <Route index element={<CategoriesPreview />} />
        <Route path=":category" element={<Category />} />
      </Routes>

      <FloatingActionButton
        onSearch={handleSearch}
        onFilter={handleFilter}
        onScrollToTop={handleScrollToTop}
      />

      <FilterPanel
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApplyFilters={handleApplyFilters}
      />
    </>
  );
};
export default Shop;
