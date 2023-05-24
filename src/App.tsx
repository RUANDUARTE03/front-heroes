import GlobalStyle from "./styles/globalStyles";
import Routers from "./routers";
import { Footer, Header } from "./components";
import { ApplicationProvider } from "./context/application";

const App = () => {
  return (
    <ApplicationProvider>
      <Header />
      <GlobalStyle />
      <Routers />
      <Footer />
    </ApplicationProvider>
  );
};

export default App;
