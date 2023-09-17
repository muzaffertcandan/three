import { useState } from "react";
import MyClicker from "./MyClicker";

export default function App() {
  //Toggle clicker ile componenti yok etme
  let [hasClicker, setHasClicker] = useState(true)
  let [displayed, setDisplayed] =useState("we are here")
    

  const Clicked = () =>{
    if(hasClicker){
        setHasClicker( hasClicker = false)
        setDisplayed(displayed = "Get the clicker")
    }
    else{
        setHasClicker(hasClicker = true)
        setDisplayed(displayed = "Delete Clicker")

    }
  } 

  return (
    <>
    {
        hasClicker ? <MyClicker/> : "There is no clicker here dont search for it"
    }
    <br/>
      {/* <MyClicker /> */}
        <button onClick={Clicked}>{displayed}</button>
    </>
  );
}
