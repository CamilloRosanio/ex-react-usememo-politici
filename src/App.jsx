import { useState, useEffect } from "react";

function App() {

  const [politicians, setPoliticians] = useState([]);

  useEffect(() => {
    fetch('https://boolean-spec-frontend.vercel.app/freetestapi/politicians')
      .then(res => res.json())
      .then(data => setPoliticians(data))
      .catch(err => console.error(err));
  }, [])

  console.log(politicians);

  return (
    <>
      <h1 className="debug">Lista politici</h1>
      <div>
        {politicians.map(p =>
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
