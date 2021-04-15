import * as http from 'http';
import { debug } from 'console';
import {app} from './backend/app';

const normalizePort = (val: string | number) => {
  let port = parseInt(val as string, 10);


  if(isNaN(port)){
    // named pipe
    return val;
  }
  if(port >= 0){
    // port number
    return port;
  }
  return false;
}

const onError = (error: { sycall: string; code : string }) => {
  if(error.sycall !== 'listen'){
    throw error;
  }

  const bind = typeof port === 'string' ? 'pipe' + port : 'port' + port;

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error( bind + " is already in use" );
      process.exit(1 );
      break;
    default:
      throw error;
  }
}

/* onListening function
  - log that we are now listening to incoming requests
 */
const onListening = () => {
  const addr = server.address();
  const bind = typeof port === 'string' ? 'pipe' + port : 'port' + port;
  debug('Listening on ' + bind);
}

const port = normalizePort(process.env.PORT || 3000);
app.set('port', port);

const server = http.createServer(app);

server.on('error', onError);
server.on('listening', onListening);

server.listen(port);
console.log("Server is running.");
