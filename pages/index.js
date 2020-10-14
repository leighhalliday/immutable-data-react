import { useState } from "react";
// import produce from "immer";
// import { useImmer } from "use-immer";

export default function Home() {
  const [chosen, setChosen] = useState(null);
  const [people, setPeople] = useState([
    {
      name: "Leigh",
      todos: [
        { name: "Call mom", done: false },
        { name: "Clean mess", done: false },
      ],
    },
    {
      name: "Mauricio",
      todos: [
        { name: "Write codes", done: false },
        { name: "Make business deals", done: false },
        { name: "Get paid", done: false },
      ],
    },
    {
      name: "Marian",
      todos: [
        { name: "Study laws", done: false },
        { name: "Write article", done: false },
      ],
    },
  ]);

  return (
    <div>
      <h1>All The ToDos</h1>
      <ul>
        {people.map((person, index) => (
          <li key={person.name}>
            <button onClick={() => setChosen(index)}>{person.name}</button>
          </li>
        ))}
      </ul>

      {chosen !== null && (
        <Person
          person={people[chosen]}
          setName={(name) => {
            setPeople(
              people.map((person, pIndex) => {
                if (pIndex !== chosen) {
                  return person;
                }
                return {
                  ...person,
                  name,
                };
              })
            );
          }}
          toggleTodo={(index) => {
            setPeople(
              people.map((person, pIndex) => {
                if (pIndex !== chosen) {
                  return person;
                }
                return {
                  ...person,
                  todos: person.todos.map((todo, tIndex) => {
                    if (tIndex !== index) {
                      return todo;
                    }
                    return { ...todo, done: !todo.done };
                  }),
                };
              })
            );
          }}
          setTodo={(index, value) => {
            setPeople(
              people.map((person, pIndex) => {
                if (pIndex !== chosen) {
                  return person;
                }
                return {
                  ...person,
                  todos: person.todos.map((todo, tIndex) => {
                    if (tIndex !== index) {
                      return todo;
                    }
                    return { ...todo, name: value };
                  }),
                };
              })
            );
          }}
          addTodo={(value) => {
            setPeople(
              people.map((person, pIndex) => {
                if (pIndex !== chosen) {
                  return person;
                }
                return {
                  ...person,
                  todos: [...person.todos, { name: value, done: false }],
                };
              })
            );
          }}
          removeTodo={(index) => {
            setPeople(
              people.map((person, pIndex) => {
                if (pIndex !== chosen) {
                  return person;
                }
                return {
                  ...person,
                  todos: person.todos.filter(
                    (_todo, tIndex) => tIndex !== index
                  ),
                };
              })
            );
          }}
        />
      )}
    </div>
  );
}

function Person({ person, setName, toggleTodo, setTodo, addTodo, removeTodo }) {
  const [newValue, setNewValue] = useState("");

  return (
    <div>
      <h2>{person.name}</h2>
      <input
        value={person.name}
        onChange={(event) => setName(event.target.value)}
      />
      <ul>
        {person.todos.map((todo, index) => (
          <li key={index}>
            <button onClick={() => removeTodo(index)}>del</button>
            <input
              value={todo.name}
              onChange={(event) => setTodo(index, event.target.value)}
            />
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleTodo(index)}
            />
          </li>
        ))}

        <li>
          <button
            onClick={() => {
              addTodo(newValue);
              setNewValue("");
            }}
          >
            add
          </button>
          <input
            value={newValue}
            onChange={(event) => setNewValue(event.target.value)}
          />
        </li>
      </ul>
    </div>
  );
}
