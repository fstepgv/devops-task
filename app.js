const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.post('/log', (req, res) => {
  console.log('Button clicked!');
  res.status(200).send('Clicked!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
 ~/project1/my-test-app                                                                                                                                             ok | denis@denis-virtual-machine 










