import { useState } from 'react';
import {
  FABContainer,
  FABButton,
  FABMenu,
  FABMenuItem,
  FABIcon,
  FABLabel,
} from './floating-action-button.styles';

const FloatingActionButton = ({ onSearch, onFilter, onScrollToTop }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { icon: '🔍', label: 'Search', action: onSearch },
    { icon: '🎚️', label: 'Filter', action: onFilter },
    { icon: '⬆️', label: 'Top', action: onScrollToTop },
  ];

  const handleItemClick = (action) => {
    action?.();
    setIsOpen(false);
  };

  return (
    <FABContainer>
      {isOpen && (
        <FABMenu>
          {menuItems.map((item, index) => (
            <FABMenuItem
              key={index}
              onClick={() => handleItemClick(item.action)}
              delay={index * 0.05}
            >
              <FABIcon>{item.icon}</FABIcon>
              <FABLabel>{item.label}</FABLabel>
            </FABMenuItem>
          ))}
        </FABMenu>
      )}
      <FABButton onClick={toggleMenu} isOpen={isOpen}>
        {isOpen ? '✕' : '✨'}
      </FABButton>
    </FABContainer>
  );
};

export default FloatingActionButton;
