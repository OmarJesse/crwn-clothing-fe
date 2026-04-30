import { useNavigate } from 'react-router-dom';
import { 
  MobileMenuContainer, 
  MobileMenuOverlay, 
  MobileMenuContent,
  MobileNavLink,
  MobileMenuHeader,
  MobileMenuLinks,
  MobileFitStatus,
  MobileFitStatusMeta,
} from './mobile-menu.styles';

const MobileMenu = ({ isOpen, onClose, currentUser, bodyProfile, signOutUser }) => {
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
            {currentUser ? (
              <MobileFitStatus to="/onboarding" $ready={Boolean(bodyProfile)}>
                <span>{bodyProfile ? 'Fit Ready' : 'Fit Profile'}</span>
                {bodyProfile ? (
                  <MobileFitStatusMeta>
                    {bodyProfile.preferredFit || 'Profile set'}
                    {bodyProfile.confidence ? ` · ${Math.round(bodyProfile.confidence * 100)}%` : ''}
                  </MobileFitStatusMeta>
                ) : null}
              </MobileFitStatus>
            ) : null}
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
