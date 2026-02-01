// objectif : mock des requêtes réseau dans les tests
import { setupServer } from "msw/node";
import { handlers } from "./handlers";

export const server = setupServer(...handlers);

// permet de gérer server.listen(), server.resetHandlers(), server.close() dans vitest.setup.ts