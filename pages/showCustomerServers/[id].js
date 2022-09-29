import { table, minifyRecords } from "../api/utils/ServersAirtable";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
export default function customerServers({ initialServers }) {
  console.log(initialServers, "from the new page");
  const router = useRouter();
  const id = router.query.id;
  console.log(id, "from route customerServers");

  return (
    <div>
      <Navbar title="servers" />
      <h1>servers</h1>
      {initialServers.map((server) => {
        if (server.fields.customer[0] === id) {
          return (
            <div key={server.id}>
              <li>{server.fields.name}</li>
            </div>
          );
        }
      })}
    </div>
  );
}

export async function getServerSideProps(context) {
  let servers;
  try {
    servers = await table.select({}).firstPage();
    return {
      props: {
        initialServers: minifyRecords(servers),
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
