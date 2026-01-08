import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import AddGardenInfo from "./AddGardenInfo";
import * as gardenLocalStorageModule from "../../../services/gardenLocalStorage";
import { AuthProvider } from "../../../../auth/context/AuthContext";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<any>("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("AddGardenInfo page - fonctionnel", () => {
  beforeEach(() => {
    mockNavigate.mockReset();
  });

  it("affiche le formulaire avec le compteur de caractères", () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <AddGardenInfo />
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByLabelText("Nom de votre jardin :")).toBeInTheDocument();
    expect(screen.getByText("0/25")).toBeInTheDocument();
  });

  it("affiche une erreur si le nom est vide et qu'on submit", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <AuthProvider>
          <AddGardenInfo />
        </AuthProvider>
      </MemoryRouter>
    );

    const submitButton = screen.getByRole("button", { name: "Suivant" });
    await user.click(submitButton);

    expect(await screen.findByText(/Le nom du jardin est obligatoire/)).toBeInTheDocument();
  });

  it("submit sauvegarde le draft et navigue", async () => {
    const user = userEvent.setup();

    // Spy sur la fonction réellement importée par le composant
    const saveDraftSpy = vi.spyOn(
      gardenLocalStorageModule,
      "saveDraft"
    );

    render(
      <MemoryRouter>
        <AuthProvider>
          <AddGardenInfo />
        </AuthProvider>
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText("Écrire ...");
    await user.type(input, "Mon Jardin Test");

    const submitButton = screen.getByRole("button", { name: "Suivant" });
    await user.click(submitButton);

    expect(saveDraftSpy).toHaveBeenCalledTimes(1);
    expect(saveDraftSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Mon Jardin Test",
      })
    );

    expect(mockNavigate).toHaveBeenCalledWith("/addGardenInfoFa");
  });
});
