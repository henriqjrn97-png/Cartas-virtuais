import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCC8PWevCfGdEopfZIFR3VVXyiG0DfPjns",
  authDomain: "cartas-virtuais.firebaseapp.com",
  projectId: "cartas-virtuais",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let cartaAtual = null;

window.mostrarEscrever = () => {
  esconderTudo();
  document.getElementById("escrever").classList.remove("hidden");
};

window.mostrarLer = async () => {
  esconderTudo();
  document.getElementById("ler").classList.remove("hidden");

  const snapshot = await getDocs(collection(db, "cartas"));
  const cartas = snapshot.docs;

  if (cartas.length === 0) {
    document.getElementById("carta").innerText = "Ainda não há cartas.";
    return;
  }

  const aleatoria = cartas[Math.floor(Math.random() * cartas.length)];
  cartaAtual = aleatoria.id;
  document.getElementById("carta").innerText = aleatoria.data().texto;
};

window.enviarCarta = async () => {
  const texto = document.getElementById("textoCarta").value;
  if (texto.length < 20) {
    alert("Escreva pelo menos 20 caracteres.");
    return;
  }

  await addDoc(collection(db, "cartas"), { texto });
  alert("Carta enviada.");
  voltar();
};

window.responderCarta = async () => {
  const resposta = document.getElementById("resposta").value;
  if (!resposta) return voltar();

  await addDoc(collection(db, "respostas"), {
    resposta,
    cartaId: cartaAtual,
  });

  alert("Resposta enviada.");
  voltar();
};

window.voltar = () => {
  esconderTudo();
  document.getElementById("home").classList.remove("hidden");
};

function esconderTudo() {
  document.querySelectorAll("#home, #escrever, #ler")
    .forEach(el => el.classList.add("hidden"));
}
