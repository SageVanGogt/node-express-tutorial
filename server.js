const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const urlLogger = (request, response, next) => {
  console.log('Request URL:', request.url);
  next()
}

const timeLogger = (request, response, next) => {
  console.log('Datetime:', new Date(Date.now()).toString());
  next();
}
app.locals.messages = [
  { id: 'a1', message: 'Hello World' },
  { id: 'b2', message: 'Goodbye World' }
];

app.use(urlLogger, timeLogger);

app.use(express.static('public'));

app.get('/json/', urlLogger, timeLogger, (request, response) => {
  response.status(200).json({"name": "Robbie"});
});

app.post('/api/messages', (request, response) => {
  const id = Date.now();
  const { message } = request.body;

  app.locals.messages.push(message);

  response.status(201).json({ id, message });
});

app.listen(3000, () => {
  console.log('Express intro running on localhost: 3000')
});

