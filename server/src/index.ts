const mApp = require('./app');
const PORT = process.env.PORT || 3001;

mApp.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});





