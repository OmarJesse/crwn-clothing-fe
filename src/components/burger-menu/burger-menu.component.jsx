import { BurgerMenuContainer, BurgerLine } from './burger-menu.styles';

const BurgerMenu = ({ isOpen, onClick }) => {
  return (
    <BurgerMenuContainer onClick={onClick} isOpen={isOpen}>
      <BurgerLine isOpen={isOpen} position="top" />
      <BurgerLine isOpen={isOpen} position="middle" />
      <BurgerLine isOpen={isOpen} position="bottom" />
    </BurgerMenuContainer>
  );
};

export default BurgerMenu;
