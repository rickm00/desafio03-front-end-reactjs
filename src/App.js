import React, { useEffect, useState } from "react"; //Importando as funções useEffect e useState do React

import api from "./services/api"; //Importando a API

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
        setRepositories(response.data);
    })
 }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Desafio 03 - React JS ${Date.now()}`,
      url: "https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/desafio-conceitos-reactjs",
      techs: ["React", "React JS", "NodeJS", "HTML", "CSS"],
      likes: 0
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);

  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    setRepositories([
      ...repositories.filter((repository) => repository.id !== id),
    ]);
  
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map((repository) => ( //.map percorre o repositório e retorna algo
          <li key={repository.id}>
            {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
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
