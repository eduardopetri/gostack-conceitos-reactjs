import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const data = {
      title: "Ui clone",
      url: "https://github.com",
      techs: ["react native", "reactJs"]

    }
    api.post('repositories', data).then(response => {
      setRepositories([...repositories, response.data])
    })
  }

  async function handleRemoveRepository(id) {
    const repositoryIndex = repositories.findIndex(repository => repository.id === id);

    repositories.splice(repositoryIndex, 1)
     api.delete(`repositories/${id}`).then(
      setRepositories(
         [...repositories]
      )
    )
  }

  useEffect(() => {
    api.get('repositories').then(response => setRepositories(response.data))
  }, [])

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => {
          return (
            <li key={repository.id}>
              {repository.title}

              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          )
        })}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
