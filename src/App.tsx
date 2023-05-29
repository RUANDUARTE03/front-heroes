import GlobalStyle from "./styles/globalStyles";
import Routers from "./routers";
import { Footer, Header } from "./components";
import { ApplicationProvider } from "./context/application";
import { ThreatsProvider } from "./context/threats";

const App = () => {
  return (
    <ApplicationProvider>
      <ThreatsProvider>
        <Header />
        <GlobalStyle />
        <Routers />
        <Footer />
      </ThreatsProvider>
    </ApplicationProvider>
  );
};

export default App;
