"use client";
import { useState } from "react";

export default function Segundooriginal() {
  const [estado, setEstado] = useState<"inicio" | "esperando" | "listo" | "resultado">("inicio");
  const [mensaje, setMensaje] = useState("Presiona para comenzar");
  const [inicioTiempo, setInicioTiempo] = useState<number | null>(null);
  const [reaccion, setReaccion] = useState<number | null>(null);
  const [color, setColor] = useState("bg-blue-500");

  const comenzarJuego = () => {
    setEstado("esperando");
    setMensaje("Espera que cambie el color...");
    setColor("bg-blue-500");
    setReaccion(null);

    const tiempoAleatorio = Math.floor(Math.random() * 3000) + 2000; // entre 2 y 5 segundos
    setTimeout(() => {
      setEstado("listo");
      setMensaje("¡Presiona ahora! ");
      setColor("bg-green-500");
      setInicioTiempo(Date.now());
    }, tiempoAleatorio);
  };

  const manejarClick = () => {
    if (estado === "inicio") {
      comenzarJuego();
    } else if (estado === "esperando") {
      setEstado("resultado");
      setMensaje("❌ ¡Muy pronto! Intenta de nuevo.");
      setColor("bg-red-500");
    } else if (estado === "listo") {
      const tiempo = Date.now() - (inicioTiempo ?? 0);
      setReaccion(tiempo);
      setEstado("resultado");
      setMensaje(` Tu tiempo fue: ${tiempo} ms`);
      setColor("bg-yellow-500");
    } else {
      setEstado("inicio");
      setMensaje("Presiona para comenzar otra vez");
      setColor("bg-blue-500");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center animate-gradient text-white text-center p-6">
      <div className="card fade-in max-w-sm w-full">
        <h1 className="text-3xl font-bold mb-6">Reflejos Rápidos</h1>

        <div
          onClick={manejarClick}
          className={`${color} w-full h-60 flex items-center justify-center rounded-2xl text-xl font-semibold shadow-lg cursor-pointer transition-all duration-300 active:scale-95`}
        >
          {mensaje}
        </div>

        {reaccion && (
          <p className="mt-6 text-lg fade-in">
            {reaccion < 200
              ? "🥷 ¡Reflejos de ninja!"
              : reaccion < 400
              ? " Muy rápido"
              : " Puedes mejorar"}
          </p>
        )}

        <button
          onClick={() => setEstado("inicio")}
          className="btn mt-6 fade-in"
        >
           Reiniciar
        </button>
      </div>
    </div>
  );
}
