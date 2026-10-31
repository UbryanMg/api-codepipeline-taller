const express = require('express');

const app = express();
app.use(express.json());

const VERSION = 'v1';

let tareas = [
  { id: 1, titulo: 'Aprender AWS CodePipeline', completada: false },
  { id: 2, titulo: 'Configurar CodeBuild', completada: false }
];

app.get('/', (req, res) => {
  res.json({ mensaje: `API ${VERSION} desplegada con AWS CodePipeline`, version: VERSION });
});

app.get('/tareas', (req, res) => res.json(tareas));

app.get('/tareas/:id', (req, res) => {
  const tarea = tareas.find(t => t.id === Number(req.params.id));
  if (!tarea) return res.status(404).json({ error: 'Tarea no encontrada' });
  res.json(tarea);
});

app.post('/tareas', (req, res) => {
  if (!req.body || !req.body.titulo) {
    return res.status(400).json({ error: 'El campo titulo es obligatorio' });
  }
  const nueva = { id: tareas.length + 1, titulo: req.body.titulo, completada: false };
  tareas.push(nueva);
  res.status(201).json(nueva);
});

if (require.main === module) {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => console.log(`API escuchando en el puerto ${PORT}`));
}

module.exports = app;
