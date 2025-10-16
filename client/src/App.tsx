import { Routes, Route, BrowserRouter } from "react-router-dom";

import "./App.css";
import "./assets/styles/global.css";
import Home from "./pages/Home";
import AddGarden from "./features/garden/pages/AddGarden";
import AddGardenInfo from "./features/garden/pages/AddGarden1/AddGardenInfo";
import GardenSelectPlants from "./features/garden/pages/GardenSelectPlants";
import DetailsPlant from "./features/plants/pages/DetailsPlant";
import PanierGarden from "./features/garden/pages/PanierGarden";
import AddGardenInfoFacultative from "./features/garden/pages/AddGarden1/AddGardenInfoFacultative";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addGarden" element={<AddGarden />} />
          <Route path="/addGardenInfo" element={<AddGardenInfo />} />
          <Route path="/addGardenInfoFa" element={<AddGardenInfoFacultative />} />
          <Route path="/gardenSelectPlants" element={<GardenSelectPlants />} />
          <Route path="/plants/:id" element={<DetailsPlant />} />
          <Route path="/panierGarden" element={<PanierGarden />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
