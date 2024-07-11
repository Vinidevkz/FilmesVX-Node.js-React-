import { useEffect, useState, useRef } from "react";
import "./style.css";
import "../../src/index.css";

import api from "../services/api";
import Trash from "../assets/delicon.png";

function Home() {
  const [filmes, setFilmes] = useState([]);

  const inputName = useRef();
  const inputGenero = useRef();
  const inputFaixaEtaria = useRef();
  const inputDuracaoFilme = useRef();

  async function getFilmes() {
    try {
      const filmesFromApi = await api.get("/filmes");
      setFilmes(filmesFromApi.data);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    }
  }

  async function deleteFilmes(id) {
    try {
      await api.delete(`/filmes/${id}`);
      getFilmes(); // Atualizar a lista de filmes após a exclusão
    } catch (error) {
      console.error("Erro ao deletar filme:", error);
    }
  }

  async function createFilmes() {
    try {
      const newFilm = {
        name: inputName.current.value,
        genero: inputGenero.current.value,
        faixaEtaria: inputFaixaEtaria.current.value,
        duracaoFilme: inputDuracaoFilme.current.value,
      };
      const response = await api.post("/filmes", newFilm);
      console.log("Filme criado:", response.data);
      getFilmes(); // Atualizar a lista de filmes após a criação
    } catch (error) {
      console.error("Erro ao criar filme:", error);
    }
  }

  useEffect(() => {
    getFilmes();
  }, []);

  return (
    <div className="container">
      <div>
        <form className="form">
          <h2 className="titleText">Cadastrar Filme</h2>
          <input
            ref={inputName}
            className="input"
            name="name"
            type="text"
            placeholder="Nome do filme"
          />
          <input
            ref={inputGenero}
            className="input"
            name="generoFilme"
            type="text"
            placeholder="Gênero do filme"
          />
          <input
            ref={inputFaixaEtaria}
            className="input"
            name="faixaEtaria"
            type="number"
            placeholder="Faixa etária do filme"
          />
          <input
            ref={inputDuracaoFilme}
            className="input"
            name="duracaoFilme"
            type="text"
            placeholder="Duração do filme"
          />

          <button onClick={createFilmes} className="button" type="button">
            Cadastrar Filme
          </button>
        </form>
      </div>

      <div className="divInfos">
        <div>
          <h1>Filmes:</h1>
        </div>

        <div className="infosDiv">
          {filmes.map((filme) => (
            <div key={filme.id} className="infosCont">
              <div className="infosFilme">
                <p>
                  Nome: <span>{filme.name}</span>
                </p>
                <p>
                  Gênero: <span>{filme.genero}</span>
                </p>
                <p>
                  Faixa Etária: <span>{filme.faixaEtaria}</span>
                </p>
                <p>
                  Duração do Filme: <span>{filme.duracaoFilme}</span>
                </p>
              </div>
              <div>
                <button type="button" className="delIconButton" onClick={() => deleteFilmes(filme.id)}>
                  <img src={Trash} alt="Delete" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
