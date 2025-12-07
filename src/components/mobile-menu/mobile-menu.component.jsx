import { useNavigate } from 'react-router-dom';
import { 
  MobileMenuContainer, 
  MobileMenuOverlay, 
  MobileMenuContent,
  MobileNavLink,
  MobileMenuHeader,
  MobileMenuLinks
} from './mobile-menu.styles';

const MobileMenu = ({ isOpen, onClose, currentUser, signOutUser }) => {
  const navigate = useNavigate();

  const handleNavClick = (path) => {
    onClose();
    navigate(path);
  };

  const handleSignOut = () => {
    signOutUser();
    onClose();
  };

  return (
    <>
      <MobileMenuOverlay isOpen={isOpen} onClick={onClose} />
      <MobileMenuContainer isOpen={isOpen}>
        <MobileMenuContent>
          <MobileMenuHeader>
            <h2>Menu</h2>
          </MobileMenuHeader>
          
          <MobileMenuLinks>
            <MobileNavLink onClick={() => handleNavClick('/')}>
              Home
            </MobileNavLink>
            <MobileNavLink onClick={() => handleNavClick('/shop')}>
              Shop
            </MobileNavLink>
            {currentUser ? (
              <>
                <MobileNavLink onClick={handleSignOut}>
                  Sign Out
                </MobileNavLink>
              </>
            ) : (
              <MobileNavLink onClick={() => handleNavClick('/auth')}>
                Sign In
              </MobileNavLink>
            )}
          </MobileMenuLinks>
        </MobileMenuContent>
      </MobileMenuContainer>
    </>
  );
};

export default MobileMenu;
