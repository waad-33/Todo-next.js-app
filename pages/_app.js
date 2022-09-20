import "../styles/globals.css";
import "../styles/index.css";
import Layout from "../components/Layout";
import { TodosProvider } from "../contexts/TodosContext";
import { UserProvider } from "@auth0/nextjs-auth0";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <TodosProvider>
        <div className="container mx-auto my-10 max-w-xl">
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </div>
      </TodosProvider>
    </UserProvider>
  );
}

export default MyApp;