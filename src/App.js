import React, { useState, useEffect } from 'react';

import api from './services/api';
import './styles.css';

function App() {
	const [projects, setProjects] = useState([]);

	useEffect(() => {
		api.get('repositories').then((response) => {
			setProjects(response.data);
		});
	}, []);

	async function handleAddRepository() {
		const newProject = {
      id:'123',
			title: 'Desafio ReactJS',
			url: 'https://github.com/josepholiveira',
			techs: ["React", "Node.js"],
		};

		await api.post('repositories', newProject);

		setProjects([...projects, newProject]);
	}

	async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    
    const newProjects = projects.filter(project => project.id !== id);
    setProjects(newProjects)
	}

	return (
		<div>
			<ul data-testid="repository-list">
				{projects.map((project) => (
					<li key={project.id}>
						{project.title}
						<button onClick={(e) => handleRemoveRepository(project.id)}>
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
