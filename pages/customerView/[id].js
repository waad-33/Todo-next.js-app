import { useRouter } from "next/router";
import { customerTable, minifyRecords } from "../api/utils/CustomerAirtable";
import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function serversRendering({ initialCustomers }) {
  console.log(initialCustomers, "initialCustomers");
  const router = useRouter();
  const id = router.query.id;

  const customer = initialCustomers.find((customer) => customer.id === id);
  console.log(customer);
  return (
    <div>
      <Navbar title="customer" />
      <p>Customer name : {customer.fields.Name}</p>
      <Link href={`/showCustomerServers/${customer.id}`}>
        <a className="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded mr-1">
          show servers
        </a>
      </Link>
    </div>
  );
}

export async function getServerSideProps(context) {
  let customers = [];
  try {
    customers = await customerTable.select({}).firstPage();

    return {
      props: {
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
