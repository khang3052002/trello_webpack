import { createRoot } from "react-dom/client";
import CardHandle from "./card-handle";

console.log("da vao day card handle");

const root = document.createElement("div");
root.id = "chrome-extension-card-handle";

document.body.append(root);
createRoot(root).render(<CardHandle />);
