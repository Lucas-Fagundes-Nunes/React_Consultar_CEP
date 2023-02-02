import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './styles.css';
import api from './services/api';

function App() {

  const [valorInput, setValorInput] = useState('');
  const [valorCep, setValorCep] = useState({});


  async function botaoPressionado()
  {
    // 01310930

    if(valorInput === '')
    {
      alert("Preencha algum cep")
      return;
    }

    try
    {
      const response = await api.get(`${valorInput}/json`);
      setValorCep(response.data); // Pegar a data do objeto (data = contem os valores)
  
      setValorInput("")
    }catch
    {
      alert('Ops erro ao buscar CEP')
      setValorInput("")
    }
  }

  return (
    <div className="container">
      <h1 className='title'>Buscador CEP</h1>

      <div className="containerInput">
      <input
      type='text'
      placeholder='Digite seu cep'
      value={valorInput}
      onChange={(e) => setValorInput(e.target.value)}
      />

      <button className="buttonSearch" onClick={botaoPressionado}>
        <FiSearch size={25} color='#FFF' />
      </button>
      </div>

      {Object.keys(valorCep).length > 0 && (
          <main className='main'>
            <h2>CEP: {valorCep.cep}</h2>

            <span>Rua: {valorCep.logradouro}</span>
            <span>Complemento: {valorCep.complemento}</span>
            <span>Bairro: {valorCep.bairro}</span>
            <span>Cidade/Estado: {valorCep.localidade} - {valorCep.uf}</span>
          </main>
      )}


    </div>
  );
}

export default App;
