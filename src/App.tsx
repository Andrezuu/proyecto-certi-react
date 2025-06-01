import "./App.css";
import { AppRoutes } from "./routes/routes";
import Layout from "./layout/Layout";

function App() {
  return (
    <Layout>
      <AppRoutes />
    </Layout>
  );
}

export default App;
