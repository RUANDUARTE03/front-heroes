import GlobalStyle from "./styles/globalStyles";
import Routers from "./routers";
import { Footer, Header } from "./components";

const App = () => {
  return (
    <>
      <Header />
      <GlobalStyle />
      <Routers />
      <Footer />
    </>
  );
};

export default App;
