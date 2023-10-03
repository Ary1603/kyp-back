//import { app } from "./app.js";
const { initializeApp } = require("firebase/app");
const { getDatabase, ref, set, push, onValue } = require("firebase/database");
const firebaseConfig = require("./services/firebase-config");
const app = require("./app");
const port = process.env.PORT || 3000;

//Crear servidor
app.listen(port, () => {
  
const appDB = initializeApp(firebaseConfig);
const db = getDatabase(appDB);

  console.log(`Servidor corriendo en http://localhost:${port}`);
});
