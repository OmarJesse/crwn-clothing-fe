import { Fragment, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropDown from "../../components/cart-dropdown/cart-dropdown.component";
import BurgerMenu from "../../components/burger-menu/burger-menu.component";
import MobileMenu from "../../components/mobile-menu/mobile-menu.component";
import SearchBar from "../../components/search-bar/search-bar.component";
import ToastNotification from "../../components/toast/toast.component";
import AddProductFAB from "../../components/add-product-fab/add-product-fab.component";

import {
  LogoContainer,
  NavigationContainer,
  NavLink,
  NavLinks,
  LeftSection,
  CenterSection,
  RightSection,
  BrandName,
} from "./navigation.styles";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { signOutStart } from "../../store/user/user.action";
import { getCategories } from "../../store/network/category";

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const signOutUser = () => dispatch(signOutStart());
  const isAdmin = currentUser?.role === "admin";

  // Fetch categories for search
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  // Flatten all products from all categories for search
  const allProducts = useMemo(() => {
    if (!data?.categories) return [];
    return data.categories.flatMap(category =>
      (category.products || []).map(product => ({
        ...product,
        categoryTitle: category.name
      }))
    );
  }, [data]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <Fragment>
      <ToastNotification />
      
      <NavigationContainer>
        <LeftSection>
          <LogoContainer to="/">
            <CrwnLogo className="logo" />
          </LogoContainer>
          <BrandName to="/">CRWN</BrandName>
        </LeftSection>

        <CenterSection>
          <SearchBar allProducts={allProducts} />
        </CenterSection>

        <RightSection>
          <NavLinks>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/shop">Shop</NavLink>
            {currentUser ? (
              <NavLink as="span" onClick={signOutUser}>
                Sign Out
              </NavLink>
            ) : (
              <NavLink to="/auth">Sign In</NavLink>
            )}
            <CartIcon />
          </NavLinks>
          <BurgerMenu isOpen={isMobileMenuOpen} onClick={toggleMobileMenu} />
        </RightSection>

        {isCartOpen && <CartDropDown />}
      </NavigationContainer>

      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={closeMobileMenu}
        currentUser={currentUser}
        signOutUser={signOutUser}
      />

      {isAdmin && <AddProductFAB />}

      <Outlet />
    </Fragment>
  );
};
export default Navigation;
