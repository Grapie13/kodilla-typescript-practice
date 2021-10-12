import app from './app';

async function startApp() {
  app.listen(3000, () => {
    console.log('Application started listening on port 3000...');
  });
}

startApp();
