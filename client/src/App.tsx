import { Routes, Route, BrowserRouter } from "react-router-dom";

import "./App.css";
import "./assets/styles/global.css";
import { AuthProvider } from "./features/auth/context/AuthContext";
import ProtectedRoute from "./features/auth/components/ProtectedRoute";
import { lazy, Suspense } from "react";
import HomeAuth from "./HomePage/HomeAuth";
import ListPlant from "./features/plants/pages/ListPlant/ListPlant";

const Home = lazy(() => import("./HomePage/Home"));
const AddGarden = lazy(() => import("./features/garden/pages/AddGarden0/AddGarden"));
const AddGardenInfo = lazy(() => import("./features/garden/pages/AddGardenManu/AddGardenInfo/AddGardenInfo"));
const GardenSelectPlants = lazy(() => import("./features/garden/pages/GardenSelectPlants/GardenSelectPlants"));
const DetailsPlant = lazy(() => import("./features/plants/pages/DetailsPlant/DetailsPlant"));
const PanierGarden = lazy(() => import("./features/garden/pages/PanierGarden/PanierGarden"));
const AddGardenInfoFacultative = lazy(() => import("./features/garden/pages/AddGardenManu/AddGardenInfoFacultative/AddGardenInfoFacultative"));
const GardenSuccess = lazy(() => import("./features/garden/pages/GardenSuccess"));
const MyGarden = lazy(() => import("./features/profil/pages/MyGarden/MyGarden"));
const Login = lazy(() => import("./features/auth/pages/Login/Login"));
const Register = lazy(() => import("./features/auth/pages/Register/Register"));
const GardenId = lazy(() => import("./features/profil/pages/Garden_id/Garden_id"));

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/addGarden" element={<ProtectedRoute><AddGarden /></ProtectedRoute>} />
            <Route path="/addGardenInfo" element={<ProtectedRoute><AddGardenInfo /></ProtectedRoute>} />
            <Route path="/addGardenInfoFa" element={<ProtectedRoute><AddGardenInfoFacultative /></ProtectedRoute>} />
            <Route path="/gardenSelectPlants" element={<ProtectedRoute><GardenSelectPlants /></ProtectedRoute>} />
            <Route path="/plants/:id" element={<DetailsPlant />} />
            <Route path="/panierGarden" element={<ProtectedRoute><PanierGarden /></ProtectedRoute>} />
            <Route path="/garden-success/:id" element={<ProtectedRoute><GardenSuccess /></ProtectedRoute>} />
            <Route path="/mes-jardins" element={<ProtectedRoute><MyGarden /></ProtectedRoute>} />
            <Route path="/garden/:id" element={<ProtectedRoute><GardenId /></ProtectedRoute>} />

            <Route path="/accueil" element={<ProtectedRoute><HomeAuth /></ProtectedRoute>} />
            <Route path="/bibliotheque-plantes" element={ <ListPlant /> } />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}
export default App;
