import Hero from "../../components/hero/hero.component";
import Directory from "../../components/directory/directory.component";
import SidebarMenu from "../../components/sidebar-menu/sidebar-menu.component";
import styled from "styled-components";

const HomeContainer = styled.div`
  margin-top: 90px;
  display: flex;

  @media (max-width: 968px) {
    margin-top: 75px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MainContent = styled.div`
  flex: 1;
  margin-left: 280px;

  @media (max-width: 968px) {
    margin-left: 260px;
  }

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const Home = () => {
  return (
    <HomeContainer>
      <SidebarMenu />
      <MainContent>
        <Hero />
        <Directory />
      </MainContent>
    </HomeContainer>
  );
};

export default Home;
