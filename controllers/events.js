const { initializeApp } = require("firebase/app");
const {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  orderByChild,
  query,
  get,
  child,
  remove,
} = require("firebase/database");
const firebaseConfig = require("../services/firebase-config");

const appDB = initializeApp(firebaseConfig);
const db = getDatabase();

function home(req, res) {
  console.log("hola mundo");
  res.status(200).send({
    message: "Hola mundo",
  });
}

function setConfirmation(req, res) {
  let { name, surnames, phone, rsvp, message, event_name, email } = req.body;
  console.log(event_name);
  let names_path = name.replace(" ", "_");
  let surnames_path = surnames.replace(" ", "_");
  let path = `${names_path.toLowerCase()}_${surnames_path.toLowerCase()}`;
  const postListRef = ref(db, event_name); //Agregar el nombre de la coleccion por medio
  const newPostRef = push(postListRef);

  if (
    name != null &&
    name != undefined &&
    name != "" &&
    surnames != null &&
    surnames != undefined &&
    surnames != "" &&
    phone != null &&
    phone != undefined &&
    phone != "" &&
    event_name != null &&
    event_name != undefined &&
    event_name != "" &&
    rsvp != null &&
    rsvp != undefined &&
    rsvp != ""
  ) {
    set(ref(db, `${event_name}/invitados/${path}`), {
      name: name,
      surnames: surnames,
      phone: phone,
      email: email,
      rsvp: rsvp,
      message: message,
    })
      .then(() => {
        res.json({
          message: "Se guardo correctamente la confirmacion",
          status: 200,
        });
      })
      .catch((error) => {
        res.send(400).send({
          message: "Status 400 error al guardar los datos.",
          error: `Error: ${error}`,
        });
      });
  } else {
    //Si no se envia ningun dato en body retorna un estado code 501 (Not Implemented) y una respuesta
    res.send({
      message: "Alguno de los campos no estan completo.",
      status: 501,
      campos: {
        "name": name,
        "surnames": surnames,
        "email": email,
        "phone": phone,
        "rsvp": rsvp,
        "message": message,
        "event_name": event_name
      }
    });
  }
}

function deleteConfirmation(req, res) {
  let { name, surnames, event_name } = req.body;
  surnames = surnames.replace(" ", "_");

  remove(ref(db, `${event_name}/invitados/${name}_${surnames}`))
    .then(() => {
      res.status(200).send({
        message: "Se borro correctamente la confirmacion",
      });
    })
    .catch((error) => {
      res.send(400).send({
        message: "Status 400 error al guardar los datos.",
        error: `Error: ${error}`,
      });
    });
}

function confirmationList(req, res) {
  let guest_list = []
  console.log(req.query);
  let { event_name } = req.query;
  console.log(req.body);
  const guests = ref(db, `${event_name}/invitados`);

  onValue(guests, (snapshot) => {
    const data = snapshot.val();

    console.log(Object.keys(data).length);
    let array = [];
    for (var i in data) {
      
      console.log("******************************");
      console.log(data[i].name);
      console.log("******************************");
      guest_list.push(data[i])
    }
    console.log(array);
    res.status(200).send(guest_list);
    console.log("*************** Data ***************");
    console.log(guest_list);
  });

  // const dbRef = ref(getDatabase());
  // get(child(dbRef, `${event_name}/invitados`))
  //   .then((snapshot) => {
  //     if (snapshot.exists()) {
  //       //console.log(snapshot.val());

  //       res.status(200).send(snapshot.val());
  //     } else {
  //       res.status(400).send({ message: "No data available" });
  //     }
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
}

module.exports = {
  home,
  setConfirmation,
  confirmationList,
  deleteConfirmation,
};
