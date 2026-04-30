import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import CartDropDown from "../../components/cart-dropdown/cart-dropdown.component";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import SearchBar from "../../components/search-bar/search-bar.component";
import AddProductFAB from "../../components/add-product-fab/add-product-fab.component";
import { getCategories } from "../../store/network/category";
import { selectCurrentUser } from "../../store/user/user.selector";
import { signOutStart } from "../../store/user/user.action";
import ToastNotification from "../../components/toast/toast.component";
import { useTheme } from "../../contexts/theme-context";
import { THEME_LABELS } from "../../styles/themes";
import { getBucketLabel as getStyleBucketLabel } from "../../utils/style-inference";
import {
  AppSurface,
  AppBackdrop,
  AppDock,
  DockActions,
  DockButton,
  DockBrand,
  DockGroup,
  DockHint,
  DockLink,
  DockPanel,
  DockTag,
  DockTitle,
  DockSurface,
  SearchModalBackdrop,
  SearchModalCard,
  SearchModalBody,
  SearchModalHeader,
  SearchModalLabel,
  SearchModalClose,
  ThemeToggle,
  ProfilePopover,
  ProfileButton,
  ProfileChip,
  DockIconLink,
  DockIconBadge,
} from "./navigation.styles";

const Navigation = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const bodyProfile = useSelector((state) => state.user.bodyProfile);
  const styleProfile = useSelector((state) => state.user.styleProfile);
  const isAdmin = currentUser?.role === "admin";
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const { themeName, cycleTheme } = useTheme();
  const isDarkMode = themeName === "dark";
  const themeMeta = THEME_LABELS[themeName] || THEME_LABELS.light;

  useEffect(() => {
    if (!isProfileOpen) return undefined;
    const handler = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isProfileOpen]);

  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const allProducts = useMemo(() => {
    return data?.categories?.flatMap((category) => category.products || []) || [];
  }, [data]);

  const handleSignOut = () => {
    dispatch(signOutStart());
    navigate("/onboarding");
  };


  return (
    <AppSurface $isDark={isDarkMode}>
      <AppBackdrop $isDark={isDarkMode} />
      <ToastNotification />
      <CartDropDown />
      <DockPanel>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </DockPanel>

      {isSearchOpen && (
        <SearchModalBackdrop onClick={() => setIsSearchOpen(false)}>
          <SearchModalCard onClick={(event) => event.stopPropagation()}>
            <SearchModalHeader>
              <div>
                <SearchModalLabel>Search</SearchModalLabel>
                <DockTitle>Find products fast</DockTitle>
              </div>
              <SearchModalClose onClick={() => setIsSearchOpen(false)}>×</SearchModalClose>
            </SearchModalHeader>
            <SearchModalBody>
              <SearchBar allProducts={allProducts} onClose={() => setIsSearchOpen(false)} />
            </SearchModalBody>
          </SearchModalCard>
        </SearchModalBackdrop>
      )}

      {isAdmin && <AddProductFAB />}

      <AppDock>
        <DockSurface $isDark={isDarkMode}>
          <DockBrand to="/">
            <span>CRWN</span>
            <DockTag>fit-aware</DockTag>
          </DockBrand>

          <DockGroup>
            <DockLink to="/">Home</DockLink>
            <DockLink to="/shop">Shop</DockLink>
            <DockIconLink
              to="/onboarding"
              aria-label={bodyProfile ? "Edit fit profile" : "Set up fit profile"}
              title={bodyProfile ? "Edit fit profile" : "Set up fit profile"}
            >
              📐
              {bodyProfile ? <DockIconBadge /> : null}
            </DockIconLink>
            <DockButton type="button" onClick={() => setIsSearchOpen(true)}>
              Search
            </DockButton>
          </DockGroup>

          <DockActions>
            <ThemeToggle
              type="button"
              onClick={cycleTheme}
              aria-label={`Theme: ${themeMeta.label}. Click to cycle.`}
            >
              {themeMeta.icon} {themeMeta.label}
            </ThemeToggle>
            {currentUser ? (
              <div ref={profileRef} style={{ position: "relative" }}>
                <ProfileButton
                  type="button"
                  onClick={() => setIsProfileOpen((v) => !v)}
                  aria-haspopup="true"
                  aria-expanded={isProfileOpen}
                >
                  <ProfileChip>
                    <span className="dot" />
                    {currentUser.name?.split(" ")[0] || "Account"}
                  </ProfileChip>
                </ProfileButton>
                {isProfileOpen ? (
                  <ProfilePopover role="menu">
                    <strong>{currentUser.name || "Account"}</strong>
                    <small>{currentUser.email}</small>
                    {bodyProfile ? (
                      <small>
                        {bodyProfile.heightCm ? `${bodyProfile.heightCm}cm · ` : ""}
                        {bodyProfile.preferredFit ? `${bodyProfile.preferredFit} fit` : ""}
                        {bodyProfile.bodyShape ? ` · ${bodyProfile.bodyShape}` : ""}
                      </small>
                    ) : (
                      <small>No fit profile yet</small>
                    )}
                    {styleProfile ? (
                      <small>Palette: {getStyleBucketLabel(styleProfile.paletteBucket)}</small>
                    ) : null}
                    <Link to="/onboarding" onClick={() => setIsProfileOpen(false)}>
                      {bodyProfile ? "Re-scan fit profile" : "Set up fit profile"}
                    </Link>
                    <button type="button" onClick={() => { setIsProfileOpen(false); handleSignOut(); }}>
                      Sign out
                    </button>
                  </ProfilePopover>
                ) : null}
              </div>
            ) : (
              <DockLink to="/auth">Sign In</DockLink>
            )}
            <CartIcon />
          </DockActions>
        </DockSurface>
        <DockHint>
          Sizes, recommendations, and checkout now follow your fit profile.
        </DockHint>
      </AppDock>
    </AppSurface>
  );
};

export default Navigation;
