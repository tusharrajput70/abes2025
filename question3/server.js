const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios');
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/users', async (req, res) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    res.render('employees', { employees: response.data });
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).send('Error fetching employees');
  }
});

app.get('/users/new', (req, res) => { 
  res.render('register'); 
});

app.post('/users', async (req, res) => { 
  try {
    const { name, username ,email } = req.body; 
    const id=Math.floor(Math.random()*100);
    console.log(id,name,username,email);
    const response = await axios.post('https://jsonplaceholder.typicode.com/users', {id, name, username ,email }); 

    // res.redirect('/users'); 

  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).send('Error creating employee');
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});