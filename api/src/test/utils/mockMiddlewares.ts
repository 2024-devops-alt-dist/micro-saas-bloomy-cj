// import { vi } from "vitest";

// // Mock du middleware auth
// export const mockAuthMiddleware = () => {
//   vi.mock("../middlewares/auth", () => ({
//     default: (req: any, _res: any, next: any) => {
//       req.user = { id: 1, role: "admin" }; // utilisateur connecté
//       next();
//     },
//   }));
// };

// // Mock du middleware isAdmin
// export const mockIsAdmin = () => {
//   vi.mock("../middlewares/isAdmin", () => ({
//     default: (_req: any, _res: any, next: any) => next(),
//   }));
// };

// // Mock du middleware isGardenOwnerOrAdmin
// export const mockIsGardenOwnerOrAdmin = () => {
//   vi.mock("../middlewares/isGardenOwnerOrAdmin", () => ({
//     default: (_req: any, _res: any, next: any) => next(),
//   }));
// };
