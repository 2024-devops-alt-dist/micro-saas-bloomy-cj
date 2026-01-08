import { Routes, Route, BrowserRouter } from "react-router-dom";

import "./App.css";
import "./assets/styles/global.css";
import Home from "./pages/Home";
import AddGarden from "./features/garden/pages/AddGarden0/AddGarden";
import AddGardenInfo from "./features/garden/pages/AddGardenManu/AddGardenInfo/AddGardenInfo";
import GardenSelectPlants from "./features/garden/pages/GardenSelectPlants/GardenSelectPlants";
import DetailsPlant from "./features/plants/pages/DetailsPlant/DetailsPlant";
import PanierGarden from "./features/garden/pages/PanierGarden/PanierGarden";
import AddGardenInfoFacultative from "./features/garden/pages/AddGardenManu/AddGardenInfoFacultative/AddGardenInfoFacultative";
import GardenSuccess from "./features/garden/pages/GardenSuccess";
import MyGarden from "./features/profil/pages/MyGarden/MyGarden";
import Login from "./features/auth/pages/Login/Login";
import { AuthProvider } from "./features/auth/context/AuthContext";
import ProtectedRoute from "./features/auth/components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/addGarden" element={<ProtectedRoute><AddGarden /></ProtectedRoute>} />
            <Route path="/addGardenInfo" element={<ProtectedRoute><AddGardenInfo /></ProtectedRoute>} />
            <Route path="/addGardenInfoFa" element={<ProtectedRoute><AddGardenInfoFacultative /></ProtectedRoute>} />
            <Route path="/gardenSelectPlants" element={<ProtectedRoute><GardenSelectPlants /></ProtectedRoute>} />
            <Route path="/plants/:id" element={<DetailsPlant />} />
            <Route path="/panierGarden" element={<ProtectedRoute><PanierGarden /></ProtectedRoute>} />
            <Route path="/garden-success/:id" element={<ProtectedRoute><GardenSuccess /></ProtectedRoute>} />
            <Route path="/mes-jardins" element={<ProtectedRoute><MyGarden /></ProtectedRoute>} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}
export default App;
