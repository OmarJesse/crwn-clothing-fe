import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../../store/network/category';
import {
  SidebarContainer,
  SidebarHeader,
  SidebarTitle,
  CategoryList,
  CategoryItem,
  CategoryIcon,
  CategoryName,
  CategoryCount,
  SidebarSection,
  SectionTitle,
  QuickLink,
  QuickLinkIcon,
  ToggleButton,
  CollapsedSidebar
} from './sidebar-menu.styles';

const SidebarMenu = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const categories = data?.categories || [];

  const categoryIcons = {
    hats: '🎩',
    jackets: '🧥',
    sneakers: '👟',
    womens: '👗',
    mens: '👔'
  };

  const handleCategoryClick = (categoryName) => {
    navigate(`/shop/${categoryName.toLowerCase()}`);
  };

  if (isCollapsed) {
    return (
      <CollapsedSidebar>
        <ToggleButton onClick={() => setIsCollapsed(false)}>
          ☰
        </ToggleButton>
      </CollapsedSidebar>
    );
  }

  return (
    <SidebarContainer>
      <ToggleButton onClick={() => setIsCollapsed(true)}>
        ✕
      </ToggleButton>
      
      <SidebarHeader>
        <SidebarTitle>Browse</SidebarTitle>
      </SidebarHeader>

      <SidebarSection>
        <SectionTitle>Categories</SectionTitle>
        <CategoryList>
          {categories.map((category) => {
            const icon = categoryIcons[category.name.toLowerCase()] || '📦';
            const productCount = category.products?.length || 0;
            
            return (
              <CategoryItem 
                key={category.id}
                onClick={() => handleCategoryClick(category.name)}
              >
                <CategoryIcon>{icon}</CategoryIcon>
                <CategoryName>{category.name}</CategoryName>
                <CategoryCount>{productCount}</CategoryCount>
              </CategoryItem>
            );
          })}
        </CategoryList>
      </SidebarSection>

      <SidebarSection>
        <SectionTitle>Quick Links</SectionTitle>
        <QuickLink onClick={() => navigate('/onboarding')}>
          <QuickLinkIcon>📏</QuickLinkIcon>
          <span>My Fit Profile</span>
        </QuickLink>
        <QuickLink onClick={() => navigate('/shop')}>
          <QuickLinkIcon>🛍️</QuickLinkIcon>
          <span>All Products</span>
        </QuickLink>
        <QuickLink onClick={() => navigate('/shop')}>
          <QuickLinkIcon>⭐</QuickLinkIcon>
          <span>New Arrivals</span>
        </QuickLink>
        <QuickLink onClick={() => navigate('/shop')}>
          <QuickLinkIcon>🔥</QuickLinkIcon>
          <span>Best Sellers</span>
        </QuickLink>
        <QuickLink onClick={() => navigate('/shop')}>
          <QuickLinkIcon>💎</QuickLinkIcon>
          <span>Premium</span>
        </QuickLink>
      </SidebarSection>

      <SidebarSection>
        <SectionTitle>Help & Support</SectionTitle>
        <QuickLink>
          <QuickLinkIcon>📞</QuickLinkIcon>
          <span>Contact Us</span>
        </QuickLink>
        <QuickLink>
          <QuickLinkIcon>❓</QuickLinkIcon>
          <span>FAQ</span>
        </QuickLink>
      </SidebarSection>
    </SidebarContainer>
  );
};

export default SidebarMenu;
