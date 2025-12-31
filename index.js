import express from "express"

const app=express();

app.use(express());

app.get('/api/test', (req, res) => {
  res.send('Hello from Render!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});