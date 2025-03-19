import { useState, useEffect, useMemo } from "react";

function App() {

  const [politicians, setPoliticians] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('https://boolean-spec-frontend.vercel.app/freetestapi/politicians')
      .then(res => res.json())
      .then(data => setPoliticians(data))
      .catch(err => console.error(err));
  }, [])

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
          <div key={p.id} className="debug">
            <img src={p.image} alt={p.name} />
            <h3>{p.name}</h3>
            <h4>{p.position}</h4>
            <p>{p.biography}</p>
          </div>
        )}
      </div>
    </>
  )
}

export default App
