import React from "react";
import { useSelector } from "react-redux";
import AddTodo from "./AddClient";
import { useFirestoreConnect } from "react-redux-firebase";
import Client from "../Components/Client";
const Todos = () => {
  const { displayName, uid } = useSelector((state) => state.firebase.auth);
  useFirestoreConnect({
    collection: `users/${uid}/clients`,
    storeAs: "clients",
  });
  const clients = useSelector((state) => state.firestore.data.clients);
  console.log(clients);
  return (
    <div>
      <h3>Hello {displayName}</h3>
      <h4>Todos</h4>
      <AddTodo />
      <ul
        style={{
          listStyleType: "none",
        }}
      >
        {clients &&
          Object.values(clients).map((client) => (
            <li>
              <Client
                first_name={client.first_name}
                last_name={client.last_name}
                address={client.address}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};
export default Todos;