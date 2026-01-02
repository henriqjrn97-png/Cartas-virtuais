import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, limit } from "firebase/firestore";

// 🔥 CONFIGURE SEU FIREBASE AQUI
// Import the functions you need from the SDKs you need
$ npm install firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCC8PWevCfGdEopfZIFR3VVXyiG0DfPjns",
  authDomain: "cartas-virtuais.firebaseapp.com",
  projectId: "cartas-virtuais",
  storageBucket: "cartas-virtuais.firebasestorage.app",
  messagingSenderId: "557340099268",
  appId: "1:557340099268:web:0079eead8875e3d9767f91",
  measurementId: "G-4XXHQ34RJ4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function App() {
  const [texto, setTexto] = useState("");
  const [cartas, setCartas] = useState([]);

  async function enviarCarta() {
    if (texto.trim().length < 20) return alert("Escreva um pouco mais.");
    await addDoc(collection(db, "cartas"), {
      texto,
      data: new Date(),
    });
    setTexto("");
    carregarCartas();
  }

  async function carregarCartas() {
    const q = query(collection(db, "cartas"), orderBy("data", "desc"), limit(10));
    const snapshot = await getDocs(q);
    setCartas(snapshot.docs.map(doc => doc.data()));
  }

  useEffect(() => {
    carregarCartas();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col items-center p-6 gap-6">
      <h1 className="text-3xl font-semibold">Cartas Anônimas</h1>
      <p className="text-neutral-400 max-w-xl text-center">
        Escreva o que você nunca disse. Leia o que alguém nunca contou.
      </p>

      <textarea
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Escreva sua carta aqui..."
        className="w-full max-w-xl h-40 bg-neutral-900 border border-neutral-800 rounded-xl p-4"
      />

      <button
        onClick={enviarCarta}
        className="px-6 py-3 rounded-xl bg-neutral-100 text-neutral-900 hover:bg-neutral-300 transition"
      >
        Enviar carta anonimamente
      </button>

      <div className="w-full max-w-xl mt-10 flex flex-col gap-4">
        {cartas.map((carta, i) => (
          <div key={i} className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl">
            <p className="text-sm leading-relaxed">{carta.texto}</p>
          </div>
        ))}
      </div>

      {/* 🔔 ESPAÇO PARA ADSENSE */}
      <div className="w-full max-w-xl mt-10 text-center text-neutral-600">
        Anúncio
      </div>
    </div>
  );
}
