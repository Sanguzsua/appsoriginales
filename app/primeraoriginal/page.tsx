"use client";
import { useState } from "react";

export default function Primeroriginal() {
  const [numeroSecreto, setNumeroSecreto] = useState(Math.floor(Math.random() * 10) + 1);
  const [intento, setIntento] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [intentos, setIntentos] = useState(0);

  const verificarNumero = () => {
    const num = parseInt(intento);
    if (isNaN(num)) {
      setMensaje("❌ Ingresa un número válido.");
      return;
    }

    setIntentos((prev) => prev + 1);

    if (num === numeroSecreto) {
      setMensaje(` ¡Adivinaste el número ${numeroSecreto} en ${intentos + 1} intentos!`);
    } else if (num < numeroSecreto) {
      setMensaje(" El número es más alto.");
    } else {
      setMensaje(" El número es más bajo.");
    }
  };

  const reiniciarJuego = () => {
    setNumeroSecreto(Math.floor(Math.random() * 10) + 1);
    setIntento("");
    setMensaje("");
    setIntentos(0);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center animate-gradient text-white text-center p-6">
      <div className="card fade-in max-w-sm w-full">
        <h1 className="text-3xl font-bold mb-3"> Adivina el número</h1>
        <p className="mb-4 text-lg opacity-90">
          Estoy pensando en un número del <strong>1 al 10</strong>
        </p>

        <input
          type="number"
          value={intento}
          onChange={(e) => setIntento(e.target.value)}
          className="w-full text-black rounded-xl p-2 mb-4 text-center text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Tu número"
        />

        <div className="flex flex-col gap-3">
          <button onClick={verificarNumero} className="btn">
            🔍 Adivinar
          </button>

          <button onClick={reiniciarJuego} className="btn bg-gray-200 text-black hover:bg-gray-300">
             Reiniciar
          </button>
        </div>

        <p className="mt-6 text-lg fade-in">{mensaje}</p>
        <p className="mt-2 text-sm opacity-80">Intentos: {intentos}</p>
      </div>
    </div>
  );
}
