import { readFile } from 'node:fs/promises'
import certificates from './certificates.js'
export default {
  name: "Recourse | Demonstrament",
  inspector: {
    port: 9245,
    host: "127.0.0.1",
  },
  server: {
    https: {
      key: await readFile(certificates.key.path),
      cert: await readFile(certificates.cert.path),
      port: 3350,
      host: "demonstrament.recourse",
    },
  },
  browserSync: {
    logPrefix: "Recourse | Demonstrament",
    port: 3351,
    open: false,
    ui: false, 
    ghostMode: false,
    host: "demonstrament.recourse",
    https: {
      key: certificates.key.path,
      cert: certificates.cert.path,
    },
    files: [
      'static', 'localhost',
    ],
    proxy: {
      ws: true,
    },
    reloadDelay: 500,
    reloadDebounce: 500,
    reloadThrottle: 500,
    // injectChanges: true,
  },
  sockets: {
    host: "demonstrament.recourse",
    config: '$socket.js',
    source: 'documents',
    target: 'localhost',
    logErrors: false,
  },
  routers: {
    config: '$router.js',
    source: 'documents',
    target: 'localhost',
    logErrors: false,
  },
  documents: {
    config: '$document.js',
    source: 'documents',
    target: 'localhost',
    logErrors: false,
  },
}