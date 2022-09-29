import { createContext, useState } from "react";

const TodosContext = createContext();

const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [servers, setServers] = useState([]);

  const refreshTodos = async () => {
    try {
      const res = await fetch("/api/getTodos");
      const latestTodos = await res.json();
      setTodos(latestTodos);
    } catch (err) {
      console.error(err);
    }
  };

  const addTodo = async (todo) => {
    try {
      const res = await fetch("/api/createTodo", {
        method: "POST",
        body: JSON.stringify({ description: todo }),
        headers: { "Content-Type": "application/json" },
      });
      const newTodo = await res.json();
      setTodos((prevTodos) => {
        const updatedTodos = [newTodo, ...prevTodos];
        return updatedTodos;
      });
    } catch (err) {
      console.error(err);
    }
  };

  const updateTodo = async (updatedTodo) => {
    try {
      await fetch("/api/updateTodo", {
        method: "PUT",
        body: JSON.stringify(updatedTodo),
        headers: {
          "content-type": "application/json",
        },
      });

      setTodos((prevTodos) => {
        console.log(prevTodos, "prevTodos");
        const existingTodos = [...prevTodos];
        const existingTodo = existingTodos.find(
          (todo) => todo.id === updatedTodo.id
        );
        console.log(existingTodo, "existingTodo");
        console.log(updatedTodo, "updatedTodo");
        existingTodo.fields = updatedTodo.fields;
        return existingTodos;
      });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch("/api/deleteTodo", {
        method: "Delete",
        body: JSON.stringify({ id: id }),
        headers: { "Content-Type": "application/json" },
      });

      setTodos((prevTodos) => {
        return prevTodos.filter((todo) => todo.id !== id);
      });
    } catch (err) {
      console.error(err);
    }
  };

  const addServer = async (name, location, customer) => {
    try {
      const res = await fetch("/api/createServer", {
        method: "POST",
        body: JSON.stringify({ name, location, customer: [customer] }),
        headers: { "Content-type": "application/json" },
      });
      const newServer = await res.json();
      setServers((prevServer) => {
        const updatedServer = [newServer, ...prevServer];
        return updatedServer;
      });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteServer = async (id) => {
    try {
      await fetch("api/deleteServer", {
        method: "Delete",
        body: JSON.stringify({ id: id }),
        headers: { "Content-Type": "application/json" },
      });
      setServers((prevServers) => {
        return prevServers.filter((server) => server.id !== id);
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        setTodos,
        servers,
        setServers,
        refreshTodos,
        updateTodo,
        deleteTodo,
        addTodo,
        addServer,
        deleteServer,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export { TodosProvider, TodosContext };
