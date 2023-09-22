import { useCallback, useState, useEffect } from "react";

export default function People() {
  const [people, setPeople] = useState([]);

//   const getPeople = () => {
//     const request = fetch('https://jsonplaceholder.typicode.com/users')
//     request.then((response)=>{
//         const parse = response.json()
//         parse.then((result)=>{
//             console.log(result)
//         })
//     })
//   };

const getPeople = async () =>{
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    const result = await response.json()
    
    setPeople(result)
    
    //tek değişken var ise parantezler kaldırılabilir
        // .then(response =>
        //      response.json()
        // )
        // .then(result=>console.log(result))
}

  useEffect(() => {
    getPeople();
  }, []);

  return (
    <>
      <div>
        <h2>People</h2>
        {people.map((person) => (
          <li key={person.id}> {person.name}</li>
        ))}
      </div>
    </>
  );
}
