import React, { useEffect, useContext, useState } from "react";
import { table, minifyRecords } from "../api/utils/Airtable";
import { TodosContext } from "../../contexts/TodosContext";
import auth0 from "../api/utils/auth0";
import { useRouter } from "next/router";
import { Record } from "airtable";

export default function todoItem({ initialTodo }) {
  const { updateTodo, setTodos } = useContext(TodosContext);
  useEffect(() => {
    setTodos(initialTodo);
  }, []);

  console.log(initialTodo, "llll");

  const router = useRouter();
  const id = router.query.id;

  const rec = initialTodo.find((Record) => Record.id === id);
  const [detailedDesc, setDetailedDesc] = useState(
    rec.fields.detailedDescription
  );

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedFields = {
      ...rec.fields,
      detailedDescription: detailedDesc,
    };
    const updatedTodo = { id: rec.id, fields: updatedFields };

    updateTodo(updatedTodo);
  };

  console.log(rec);

  console.log(rec.fields.description, "new one");

  //setDetailedDesc(rec.fields.detailedDescription);
  console.log(detailedDesc, "detailedDescription");

  return (
    <form className="form my-6 text-center mt-6" onSubmit={handleFormSubmit}>
      <p className="text-3xl text-blue-600 font-bold mb-2">Todo </p>
      <p className="text-2xl mb-2">{rec.fields.description}</p>

      <p>
        <label htmlFor="detailedDescription">Todo Description</label>
      </p>
      <textarea
        id="detailedDescription"
        name="detailedDescription"
        rows="4"
        cols="50"
        value={detailedDesc}
        onChange={(e) => setDetailedDesc(e.target.value)}
      ></textarea>
      <br />
      <button
        type="submit"
        className="  rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4"
      >
        Submit
      </button>
    </form>
  );
}

export async function getServerSideProps(context) {
  const session = await auth0.getSession(context.req, context.res);
  let todos;
  try {
    if (session?.user) {
      todos = await table
        .select({
          filterByFormula: `userId = '${session.user.sub}'`,
        })
        .firstPage();
    }
    return {
      props: {
        initialTodo: minifyRecords(todos),
        user: session?.user || null,
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
