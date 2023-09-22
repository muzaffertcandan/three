import App from "./app";
import "./style.css";
import { createRoot } from "react-dom/client";

const root = createRoot(document.querySelector("#root"));
root.render(
  <>
    <App clickersCount={3}>
      <h1>Hey how are you</h1>
      <h2>I m good</h2>
    </App>
  </>
);
