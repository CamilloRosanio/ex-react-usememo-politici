import { useState, useEffect, useMemo, memo } from "react";

function PoliticianCard({ name, image, position, biography }) {
  console.log('CARD stampata.')
  return <>
    <div className="debug">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <h4>{position}</h4>
      <p>{biography}</p>
    </div>
  </>
}

// MEMO - Variabile
/*Per sfruttare "memo" di REACT salvo in una nuova variabile il componente a cui voglio applicare MEMO.
Importante che anche il nome della costante (che rappresenta un COMPONENT) inizi con una MAIUSCOLA (come i COMPONENTS).*/
const PoliticianCardMemoVar = memo(PoliticianCard);

// MEMO - Senza Variabile
/* Se voglio compattare il codice posso utilizzare MEMO direttamente sul COMPONENT, scrivendo coem segue.*/
const PoliticianCardMemo = memo(({ name, image, position, biography }) => {
  console.log('CARD stampata.')
  return <>
    <div className="debug">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <h4>{position}</h4>
      <p>{biography}</p>
    </div>
  </>
})



function App() {

  const [politicians, setPoliticians] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('https://boolean-spec-frontend.vercel.app/freetestapi/politicians')
      .then(res => res.json())
      .then(data => setPoliticians(data))
      .catch(err => console.error(err));
  }, [])

  // USE-MEMO
  /*Ottimizzazione delle performance grazie all'utiizzo di use-memo.*/
  const filteredPoliticians = useMemo(() => {
    return politicians.filter(p => {
      const inclName = p.name.toLowerCase().includes(search.toLowerCase());
      const inclPosition = p.position.toLowerCase().includes(search.toLowerCase());
      const inclBiography = p.biography.toLowerCase().includes(search.toLowerCase());
      return inclName || inclPosition || inclBiography;
    })
  }, [politicians, search]);

  return (
    <>
      <h1 className="debug">Lista politici</h1>
      <input
        type="text"
        placeholder="Cerca per nome o biografia"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div>
        {filteredPoliticians.map(p =>
          <PoliticianCardMemo
            key={p.id}
            {...p}
          />
        )}
      </div>
    </>
  )
}

export default App
