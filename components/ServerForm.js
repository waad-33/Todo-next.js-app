import React, { useContext, useState } from "react";
import { TodosContext } from "../contexts/TodosContext";

export default function ServerForm() {
  const [server, setServer] = useState("");
  const [serverLocation, setServerLocation] = useState("");
  const [customer, setCustomer] = useState([]);
  const { addServer } = useContext(TodosContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    addServer(server, serverLocation, customer);
    setServer("");
    setServerLocation("");
    setCustomer("");
  };
  return (
    <form className="form my-6" onSubmit={handleSubmit}>
      <div className="flex flex-col text-sm mb-2">
        <label htmlFor="server" className="font-bold mb-2 text-grey-800">
          Server
        </label>
        <input
          type="text"
          name="server"
          value={server}
          placeholder="add server"
          className="appearance-none border border-gray-200 p-2 focus:outline-none focus:border-gray-500 rounded-lg"
          onChange={(e) => setServer(e.target.value)}
        />
      </div>
      <div className="flex flex-col text-sm mb-2">
        <label htmlFor="location" className="font-bold mb-2 text-gray-800">
          location
        </label>
        <input
          type="text"
          name="location"
          value={serverLocation}
          placeholder="add location"
          className="apperance-none border border-gray-200 p-2 focus:outline-none focus:border-gray-500 rounded-lg"
          onChange={(e) => setServerLocation(e.target.value)}
        />
      </div>
      <div className="flex flex-col text-sm mb-2">
        <label htmlFor="customer" className="font-bold mb-2 text-gray-800">
          customer
        </label>
        <input
          type="text"
          value={customer}
          placeholder="add customer"
          onChange={(e) => {
            setCustomer(e.target.value);
          }}
          className="apperance-none border border-gray-200 p-2 focus:outline-none focus:border-gray-500 rounded-lg"
        />
      </div>
      <button
        type="submit"
        className=" w-full rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4"
      >
        Submit
      </button>
    </form>
  );
}
