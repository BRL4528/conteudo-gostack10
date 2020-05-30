const express = require('express');

const server = express();

server.use(express.json());

const projects = [];

function logRequests(req, res, next){

    console.count("Quantidade de requisições");

    return next();
}

server.use(logRequests);

function checkProject(req, res, next){
    if(!req.body.id){
        return res.status(400).json({ error: "Projeto não existe" });
    }
    return next();
}

server.get('/projects', (req, res) => {
    return res.json(projects);
});

server.post('/projects', (req, res) => {

  const { id, title } = req.body;

  const project = {
      id,
      title,
      tasks: []
  };
   
  projects.push(project);

  return res.json(project);
});

server.put(' /projects/id: ', checkProject, (req, res) => {

    const { id } = req.params;

    const { title } = req.body;

    const project = projects.find( project => project.id == id);

    project.title = title;

    return res.json(project);
});

server.delete('/projects/id:', checkProject, (req, res) => {

    const { id } = req.params;

    const projectIdx = project.findIdx( project => project.id == id );

    projects.slice(projectIdx, 1);

    return res.send();
});

server.post('/projects/:id/tasks', checkProject, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    
  

    const project = projects.find(project => project.id == id);

    project.tasks.push(title);

    return res.json(project);
});

server.listen(3000);