import { useState, useMemo, useRef } from "react";
import MyClicker from "./MyClicker";
import People from "./People";

export default function App({ clickersCount, children }) {
  //Toggle clicker ile componenti yok etme
  let [hasClicker, setHasClicker] = useState(true);
  const [count, setCount] = useState(0);

  const toggleClicker = () => {
    setHasClicker(!hasClicker);
  };

  const increment = () => {
    setCount(count + 1);
  };

  // butonlara her basıldığında sayfadaki renk değişimlerini kontrol edicek
  // useMemo(() => {
  //   const colors = [];

  //   for (let i = 0; i < clickersCount; i++) {
  //     colors.push(`hsl(${Math.random() * 360}deg, 100%, 70%)`);
  //   }
  //   return colors;
  // }, [clickersCount]);
  // bir nevi cache olarak çalışıyor
  const colors = useMemo(()=>{
    const colors = [];

    for (let i = 0; i < clickersCount; i++) 
      colors.push(`hsl(${Math.random() * 360}deg, 100%, 70%)`);
    return colors;
  },[clickersCount])

 

  // const tempArray = [...Array(clickersCount)]
  // console.log(tempArray)

  // tempArray.map((value, index)=>{
  //   console.log(value, index)
  // })

  return (
    <>
      {children}
      <h3>Total Count: {count}</h3>
      <button onClick={toggleClicker}>
        {hasClicker ? "Hide" : "show"} Clicker
      </button>
      {hasClicker && (
        <>
          {[...Array(clickersCount)].map((value, index) => (
            //içerisinde react icin key koyuyoruz
            <MyClicker
              key={index}
              increment={increment}
              keyName={`count${index}`}
              keyColor={colors[index]}
            />
          ))}
        </>
      )}
      <People/>
    </>
  );
}
