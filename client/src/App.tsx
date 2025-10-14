import { Routes, Route, BrowserRouter } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import AddGarden from "./pages/AddGarden";
import AddGardenInfo from "./pages/AddGardenInfo";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addGarden" element={<AddGarden />} />
          <Route path="/addGardenInfo" element={<AddGardenInfo />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
