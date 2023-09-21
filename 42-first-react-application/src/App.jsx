import { useState } from "react";
import MyClicker from "./MyClicker";

export default function App() {
  //Toggle clicker ile componenti yok etme
  let [hasClicker, setHasClicker] = useState(true);
  let [displayed, setDisplayed] = useState("we are here");

  // const Clicked = () =>{
  //   if(hasClicker){
  //       setHasClicker( hasClicker = false)
  //       setDisplayed(displayed = "Get the clicker")
  //   }
  //   else{
  //       setHasClicker(hasClicker = true)
  //       setDisplayed(displayed = "Delete Clicker")

  //   }
  // }
  const toggleClicker = () => {
    setHasClicker(!hasClicker);
  };
  
  return (
    <>
      {/* {
        hasClicker ? <MyClicker/> : "There is no clicker here dont search for it"
    } */}

      <button onClick={toggleClicker}>
        {hasClicker ? "Hide" : "show"} Clicker
      </button>
      {hasClicker && (
        <>
          <MyClicker keyName="countA" keyColor={`hsl(${Math.random() *360}deg, 100%, 70%)`}/>
          <MyClicker keyName="countB" keyColor={`hsl(${Math.random() *360}deg, 100%, 70%)`}/>
          <MyClicker keyName="countC" keyColor={`hsl(${Math.random() *360}deg, 100%, 70%)`}/>
        </>
      )}
    </>
  );
}
