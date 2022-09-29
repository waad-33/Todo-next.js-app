import React, { useContext } from "react";
import Link from "next/link";
import { TodosContext } from "../contexts/TodosContext";

export default function ServersList({ server, open }) {
  const { deleteServer } = useContext(TodosContext);
  console.log(server.id, "server id");
  return (
    <li className="bg-white flex items-center shadow-lg rounded-lg my-2 px-4">
      <p className="flex-1 text-grey-800">Server name :{server.fields.name}</p>

      <p className="flex-1">Server location :{server.fields.location}</p>

      <Link href={`/customerView/${server.fields.customer}`}>
        <a className="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded mr-1">
          open {open.fields.Name}
        </a>
      </Link>
      <button
        type="button"
        className="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded"
        onClick={() => deleteServer(server.id)}
      >
        Delete
      </button>
    </li>
  );
}
