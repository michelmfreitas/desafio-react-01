import React, {useState, useEffect} from "react";

import "./styles.css";

import api from './services/api';

const newProject = {
  title: "Desafios do Bootcamp",
  url: "http://www.rocketseat.com.br",
  techs: [
    "React",
    "React Native",
    "Node"
  ]
}

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(()=>{
    api.get('repositories').then(res => {
      setProjects(res.data);
    });
  }, [projects]);

  async function handleAddRepository() {
    await api.post("repositories", newProject);    
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`);
      setProjects(
        projects.filter((project) => project.id !== id)
      );
    } catch (err) {
      alert("Erro ao excluir o repositório");
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {projects.map( project => 
          <li key={project.id}>
            {project.title}
            <button onClick={() => handleRemoveRepository(project.id)}>Remover</button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
