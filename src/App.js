import React, { useState, useEffect } from "react";
import faker from "faker";

import "./styles.css";

import api from "services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api
      .get("repositories")
      .then((response) => setRepositories(response.data))
      .catch((error) =>
        console.error(`Error on try search repositories: ${error.message}`)
      );
  }, []);

  async function handleAddRepository() {
    var response = await api.post("repositories", {
      title: faker.company.companyName(),
      url: faker.internet.url(),
      techs: ["Java", ".Net Core", "Elixir"],
    });
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepositories(repositories.filter(
      repository => repository.id !== id
    ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((r) => (
          <li key={r.id}>
            {r.title}
            <button onClick={() => handleRemoveRepository(r.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
