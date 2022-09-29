import { table, minifyRecords } from "./api/utils/ServersAirtable";
import Link from "next/link";
import { customerTable } from "./api/utils/CustomerAirtable";
import Navbar from "../components/Navbar";
import ServersList from "../components/ServerList";
import ServerForm from "../components/ServerForm";
import { useRouter } from "next/router";
import { setServers, TodosContext } from "../contexts/TodosContext";
import { useEffect, useContext } from "react";

export default function serversRendering({ initialServers, initialCustomers }) {
  const { servers, setServers } = useContext(TodosContext);
  useEffect(() => {
    setServers(initialServers);
  }, []);

  console.log(initialServers, "initialServers");
  console.log(initialCustomers, "initialCustomers");
  let open;
  /*initialServers.map((server) => {
    open = initialCustomers.find(
      (customer) => server.fields.customer[0] === customer.id
    );
    console.log(open.fields.Name, "open");
    if (open) {
      return open;
    }
  });*/

  return (
    <div>
      <Navbar title="servers" />
      <ServerForm />
      <p></p>
      <ul>
        {servers.map((server) => {
          open = initialCustomers.find(
            (customer) => server.fields.customer[0] === customer.id
          );
          console.log(open.fields.Name, "open");
          //server.fields.customer === customer.id
          return (
            <div key={server.id}>
              <ServersList server={server} open={open} />
              <hr />
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export async function getServerSideProps(context) {
  let servers = [];
  let customers = [];

  try {
    servers = await table.select({}).firstPage();
    customers = await customerTable.select({}).firstPage();

    return {
      props: {
        initialServers: minifyRecords(servers),
        initialCustomers: minifyRecords(customers),
      },
    };
  } catch (err) {
    console.error(err);
    return {
      props: {
        err: "something went wrong",
      },
    };
  }
}
