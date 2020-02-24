import 'reflect-metadata'; // We need this in order to use @Decorators
import serverless from 'serverless-http';

// import config from './config';

import express from 'express';
import loaders from './loaders';
// import Logger from './loaders/logger';

const app = express();  

async function startServer() {
  
  /**
   * A little hack here
   * Import/Export can only be used in 'top-level code'
   * Well, at least in node 10 without babel and at the time of writing
   * So we are using good old require.
   **/
  await loaders({ expressApp: app });

  // config.port
  app.listen(3000, () => {
    console.log("Server listening on port 3000")
    // Logger.info(`
    //   ################################################
    //   🛡️  Server listening on port: ${config.port} 🛡️ 
    //   ################################################
    // `);
  });

  return app;
}

startServer();

module.exports.handler = serverless(app);
