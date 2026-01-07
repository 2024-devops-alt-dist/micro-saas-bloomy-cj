import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual<any>("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

import AddGarden from "./AddGarden";
import { AuthProvider } from "../../../../features/auth/context/AuthContext";

describe("AddGarden page - fonctionnel", () => {
    beforeEach(() => {
        mockNavigate.mockReset(); // reset entre chaque test
    });

    it("affiche correctement les titres et boutons", () => {
        render(
            <MemoryRouter>
                <AuthProvider>
                <AddGarden />
                </AuthProvider>
            </MemoryRouter>
        );

        expect(screen.getByText("Créez votre jardin")).toBeInTheDocument();
        expect(
            screen.getByText("Choisissez votre méthode préférée pour commencer votre aventure jardinage :")
        ).toBeInTheDocument();

        expect(screen.getByText("Avec l’aide de Bloomy")).toBeInTheDocument();
        expect(screen.getByText("Sélection manuelle")).toBeInTheDocument();
    });

    it("navigue vers /addGardenInfo quand on clique sur Sélection manuelle", async () => {
        const user = userEvent.setup();

        render(
            <MemoryRouter>
                <AuthProvider>
                <AddGarden />
                </AuthProvider>
            </MemoryRouter>
        );

        const manualButton = screen.getByText("Sélection manuelle");
        await user.click(manualButton);

        expect(mockNavigate).toHaveBeenCalledWith("/addGardenInfo");
    });
});
