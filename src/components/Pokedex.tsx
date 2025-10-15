import { useState } from "react";
import "../index.css";
import pokeball from "../assets/pokeball.png";

interface Pokemon {
  id: number;
  nombre: string;
  imagen: string;
  peso: string;
  altura: string;
}

const Pokedex: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [mostrar, setMostrar] = useState<boolean>(false);
  const [indice, setIndice] = useState<number>(0);

  const obtenerDatos = async (): Promise<void> => {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0");
    const data = await res.json();

    const detalles: Pokemon[] = await Promise.all(
      data.results.map(async (p: { url: string; name: string }) => {
        const res2 = await fetch(p.url);
        const dp = await res2.json();
        return {
          id: dp.id,
          nombre: dp.name,
          imagen: dp.sprites.front_default,
          peso: (dp.weight * 0.453592).toFixed(1),
          altura: (dp.height * 0.3048).toFixed(1),
        };
      })
    );

    setPokemons(detalles);
  };

  const alternarMostrar = (): void => {
    if (!mostrar) {
      setMostrar(true);
      obtenerDatos();
      setIndice(0);
    } else {
      setMostrar(false);
      setPokemons([]);
    }
  };

  const avanzar = (): void => {
    if (!pokemons.length) return;
    setIndice((prev) => (prev + 1) % pokemons.length);
  };

  const retroceder = (): void => {
    if (!pokemons.length) return;
    setIndice((prev) => (prev - 1 + pokemons.length) % pokemons.length);
  };

  return (
    <main className="pokedex">
      <div className="nav">
        <img src={pokeball} alt="Pokeball" className="logo" />
        <div className="cir amarillo"></div>
        <div className="cir rojo"></div>
        <div className="cir verde"></div>
      </div>

      <div className="info">
        <div className="pantalla">
          <div className="contenedor">
            {mostrar && pokemons.length > 0 && (
              <div className="divPokemon">
                <div className="imgid">
                  <img src={pokemons[indice].imagen} alt={pokemons[indice].nombre} />
                  <p>No. {pokemons[indice].id}</p>
                </div>
                <div className="rest">
                  <h1>{pokemons[indice].nombre}</h1>
                  <p>Peso: {pokemons[indice].peso} Kilos</p>
                  <p>Altura: {pokemons[indice].altura} Metros</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="navegacion">
        <button onClick={retroceder} className="reg">
          {"<"}
        </button>
        <button
          onClick={alternarMostrar}
          className="en"
          style={{ background: mostrar ? "#00bceb" : "#f00" }}
        ></button>
        <button onClick={avanzar} className="av">
          {">"}
        </button>
      </div>
    </main>
  );
};

export default Pokedex;