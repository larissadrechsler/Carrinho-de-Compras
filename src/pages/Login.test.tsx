import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { describe, it, expect } from "vitest";
import { Login } from "./Login";
import { AuthProvider } from "../contexts/AuthContext";
import "@testing-library/jest-dom";

function renderLogin() {
  return render(
    <MantineProvider>
      <AuthProvider>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </AuthProvider>
    </MantineProvider>,
  );
}

describe("Página de Login", () => {
  it("deve renderizar os campos de usuário, senha e botão de submissão", () => {
    renderLogin();

    expect(
      screen.getByRole("heading", { name: /acesso administrativo/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/usuário/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /entrar/i })).toBeInTheDocument();
  });

  it("deve permitir a digitação nos campos do formulário", async () => {
    const user = userEvent.setup();
    renderLogin();

    const userInput = screen.getByLabelText(/usuário/i);
    const passwordInput = screen.getByLabelText(/senha/i);

    await user.type(userInput, "emilys");
    await user.type(passwordInput, "emilyspass");

    expect(userInput).toHaveValue("emilys");
    expect(passwordInput).toHaveValue("emilyspass");
  });
});
