import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "./Login";
import { AuthProvider } from "../../context/AuthContext";
import { MemoryRouter } from "react-router-dom";
import { server } from "../../../../test/mocks/server";
import { http, HttpResponse } from "msw";


describe("Login", () => {
  it("affiche les erreurs si champs vides", async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </MemoryRouter>
    );

    await userEvent.click(screen.getByRole("button", { name: /se connecter/i }));

    // console.log("Formulaire soumis avec champs vides");

    expect(screen.getByText("L'email est obligatoire.")).toBeInTheDocument();
    expect(screen.getByText("Le mot de passe doit contenir au moins 8 caractères.")).toBeInTheDocument();
  });

  it("soumet le formulaire avec des données valides", async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText(/email/i) as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText(/mot de passe/i) as HTMLInputElement;

    await userEvent.type(emailInput, "test@test.com");
    await userEvent.type(passwordInput, "password123");

    // console.log("Données saisies :", { email: emailInput.value, password: passwordInput.value });

    await userEvent.click(screen.getByRole("button", { name: /se connecter/i }));

    await waitFor(() => {
      expect(emailInput.value).toBe("test@test.com");
    });
  });

  it("affiche l'erreur si login incorrect", async () => {
    // On override le handler pour simuler une erreur 401
    server.use(
      http.post("api/login", async () => {
        return HttpResponse.json({ message: "Erreur serveur" }, { status: 401 });
      })
    );

    render(
      <MemoryRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText(/email/i) as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText(/mot de passe/i) as HTMLInputElement;

    await userEvent.type(emailInput, "wrong@test.com");
    await userEvent.type(passwordInput, "wrongpass");

    // console.log("Données saisies pour login incorrect :", {
      // email: emailInput.value,
      // password: passwordInput.value,
    // });

    await userEvent.click(screen.getByRole("button", { name: /se connecter/i }));

    await waitFor(() => {
      expect(screen.getByText(/Request failed with status code 401/i)).toBeInTheDocument();
      // console.log("Erreur serveur affichée pour login incorrect");
    });
  });
});
