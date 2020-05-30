/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect, useMemo, useCallback } from 'react';

// Toda vez wue utilo o useState, ele recebe uma funções para atualizar o estado, neste caso utilizo o setTech

function App() {
  // o hook recebe o valor padrão do estado, podendo ser numero, string, objeto,
  // e retorna uma valor  o "tech", e função para atualizar "setTech"
  const [tech, setTech] = useState([]);

  const [newTech, setNewTech] = useState('');

  // atualiza o estado com as novas informações
  // function handleAdd() {
  //   setTech([...tech, newTech]);
  //   setNewTech('');
  // }

  // Para funções que não precisam de serem montadas toda vez que acontecer algum evento na tela, Use useCallBack para resolver diminuir consumo processamento.
  // Neste caso, minha função esta ouvindo apenas as variaveis [newTech, tech], e só vai montada na memoria, depois que eles sofrem alterações.
  const handleAdd = useCallback(() => {
    setTech([...tech, newTech]);
    setNewTech('');
  }, [newTech, tech]);

  // Como o array [], esta vazio, ele executa uma unica vez, buscando as informações do localStorage
  // Sobrepoem os metos de siclo de vida componentDidMount, componentDidUpdate e elouMount.
  useEffect(() => {
    const storageTech = localStorage.getItem('tech');

    if (storageTech) {
      setTech(JSON.parse(storageTech));
    }
  }, []);

  // Executa a função useEffect, toda vez que o [tech] for alterado, ele fica ouvindo a função tech basicamente.
  useEffect(() => {
    localStorage.setItem('tech', JSON.stringify(tech));
  }, [tech]);

  // Evita executar tech.length toda fez que acontecer um evento na tela, usando useMemo, vai executar apenas quando a variavel [tech] mudar
  // mostrando quantos tecnologias tem no array
  const techsize = useMemo(() => tech.length, [tech]);

  return (
    <>
      <ul>
        {tech.map(t => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <strong> Você possui {techsize} Tecnologias</strong>
      <br />
      <input value={newTech} onChange={e => setNewTech(e.target.value)} />
      <button type="button" onClick={handleAdd}>
        Adicionar
      </button>
    </>
  );
}

export default App;
