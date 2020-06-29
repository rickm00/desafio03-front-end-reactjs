import React, { useEffect, useState } from "react"; //Importando as funções useEffect e useState do React

import api from "./services/api"; //Importando a API de dentro de services

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]); //useState 
  //UseState retorna um arry com 2 posições
  //1. Variável com seu valor inicial "repositories"
  //2. Função para atualizarmos o valor "setRepositories"

  useEffect(() => { //useEffect dispara função
    api.get('repositories').then(response => { 
    })
 }, []);

  async function handleAddRepository() { //Função para add um repositório
    const response = await api.post('repositories', {
      title: `Desafio 03 - React JS ${Date.now()}`,
      url: "https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/desafio-conceitos-reactjs",
      techs: ["React", "React JS", "NodeJS", "HTML", "CSS"],
      likes: 0
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);

  }

  async function handleRemoveRepository(id) { //Função para remover um repositório
    await api.delete(`/repositories/${id}`);

    setRepositories([
      ...repositories.filter((repository) => repository.id !== id),
    ]);
  
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map((repository) => ( //.map percorre o repositório e retorna algo
          <li key={repository.id}> //Seta o id único do repositório
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
