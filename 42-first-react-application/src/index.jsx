import App from "./app";
import "./style.css";
import { createRoot } from "react-dom/client";


const root = createRoot(document.querySelector("#root"));
const name = "muzaffer"
const state = true
root.render(
  <>
    <App/>
    {/* <h1>Hello {name}</h1>
    <h1>So {state ? "How are you" : "just Danceee"}</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, aliquam.</p> */}
  </>
);
