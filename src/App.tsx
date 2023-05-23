import GlobalStyle from "./styles/globalStyles";
import Routers from "./routers";
import { Header } from "./components/Header";

const App = () => {
  return (
    <>
      <Header />
      <GlobalStyle />
      <Routers />
    </>
  );
};

export default App;
