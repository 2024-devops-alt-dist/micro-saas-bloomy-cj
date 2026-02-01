// ajout des matchers utiles (toBeInTheDocument, toHaveTextContent, etc.)
import "@testing-library/jest-dom";
import { afterEach, beforeAll, afterAll } from "vitest";
import { cleanup } from "@testing-library/react";
import { server } from "./mocks/server";

// 1. Démarre MSW avant tous les tests pour intercepter les requêtes réseau
beforeAll(() => server.listen());

// 2. Nettoie le DOM et réinitialise les handlers réseau après chaque test
afterEach(() => {
    cleanup();
    server.resetHandlers();
});

// 3. Coupe le serveur MSW une fois que tous les tests sont terminés
afterAll(() => server.close());
