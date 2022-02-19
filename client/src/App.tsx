import {
  NavBar,
  Welcome,
  Services,
  Loader,
  Transactions,
  Footer,
} from "./components";

const App = () => {
  return (
    <div className="App">
      <div className="min-h-screen">
        <div className="gradient-bg-welcome">
          <NavBar />
          <Welcome />
        </div>

        <Services />
        <Transactions />
        <Footer />
      </div>
    </div>
  );
};

export default App;
