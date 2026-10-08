# Carrinho de Compras - E-commerce (DummyStore)

**Link público da aplicação (GitHub Pages):** [https://larissadrechsler.github.io/Carrinho-de-Compras/](https://www.google.com/search?q=https://larissadrechsler.github.io/Carrinho-de-Compras/)

**Tema escolhido:** E-commerce (Catálogo público de produtos, carrinho de compras e painel administrativo protegido).

---

## 🚀 Como executar o projeto localmente

1. Clone o repositório para a sua máquina:

```bash
git clone https://github.com/larissadrechsler/Carrinho-de-Compras.git

```

2. Entre na pasta do projeto:

```bash
cd Carrinho-de-Compras

```

3. Instale as dependências:

```bash
npm install

```

4. Execute o servidor de desenvolvimento:

```bash
npm run dev

```

5. Abra o navegador em `http://localhost:5173`.
   _(Credenciais de teste para o login: Usuário: `emilys` / Senha: `emilyspass`)_

---

## ✅ Checklist dos 10 Requisitos Técnicos

**1. Estrutura de componentes e tipagem com TypeScript**
Projeto inicializado via Vite com o template React + TypeScript. A aplicação está modularizada em pastas como `components`, `pages`, `layouts`, `contexts` e `services`. Todas as _props_ possuem tipagem estrita via interfaces, garantindo ausência do tipo `any` e facilitando a composição com `children`.

**2. Estado reativo, imutabilidade e ciclo de vida**
O estado local é gerenciado com `useState`, respeitando a imutabilidade através do _spread operator_ (`...`) ao atualizar os arrays do carrinho. O `useEffect` foi utilizado para chamadas iniciais à API na montagem dos componentes, garantindo arrays de dependências limpos e prevenidos de loops infinitos.

**3. Estado global com Context API e Custom Hooks**
Foram criados o `AuthContext` e o `CartContext` para gerenciar a sessão do usuário e os itens do carrinho globalmente. O consumo desses contextos foi isolado nos hooks customizados `useAuth` e `useCart`, que lançam erros automáticos caso sejam chamados fora dos seus respectivos _Providers_.

**4. Roteamento e layouts com React Router**
Roteamento configurado com `BrowserRouter` e a propriedade `basename` mapeada para a raiz do repositório no GitHub Pages. Foi aplicado o conceito de layouts aninhados com o componente `<Outlet/>` renderizando as páginas filhas. Navegação declarativa implementada nas listagens e navegação dinâmica em rotas como `/produtos/:id`.

**5. Interface gráfica e formulários com Mantine UI**
Configuração global com `<MantineProvider>`. A construção visual conta com componentes da biblioteca Mantine para garantir responsividade, cards padronizados, inputs de formulário e alertas visuais integrados de forma nativa e sem uso de CSS manual complexo.

**6. Fluxo de autenticação JWT e rotas protegidas**
Login integrado com a rota POST `/auth/login` da API DummyJSON. A resposta retorna um token JWT que é armazenado no `localStorage`. A rota administrativa (`/admin`) foi envolvida pelo componente `<ProtectedRoute>`, que verifica o estado global de autenticação e redireciona usuários não logados de volta para o login.

**7. Consumo de API REST, interceptors e validação com Zod**
Camada de serviços centralizada no arquivo `api.ts` usando Axios. Interceptors injetam dinamicamente o cabeçalho `Authorization: Bearer <token>` nas requisições. As validações de formulário e inferência de tipagem para as chamadas externas foram feitas com a biblioteca Zod (ex: schemas de login).

**8. Testes automatizados com Vitest e RTL**
Configuração de ambiente de testes com Vitest. Foram desenvolvidos testes cobrindo a renderização de componentes usando a React Testing Library (RTL). Interações de interface foram validadas localizando os elementos de forma acessível (`getByRole`, `getByText`) para simular o comportamento real.

**9. Testes ponta a ponta com Playwright**
Testes E2E (Fim a Fim) implementados e operacionais para a validação de dois fluxos cruciais:

1. Autenticação e redirecionamento seguro.
2. Busca e visualização no catálogo de produtos.
   Os testes configurados rodam em ambiente _headless_ utilizando localizadores semânticos na pasta `e2e/`.

**10. Pipeline de CI/CD e deploy em produção**
Automação integral criada via GitHub Actions (`build-test-deploy.yml`). A cada _push_ na branch principal, a esteira CI:

- Instala dependências.
- Executa testes unitários (Vitest) e ponta-a-ponta (Playwright).
- Realiza o _build_ (CD) apontando a subpasta dinamicamente.
- Publica de forma contínua no GitHub Pages (`gh-pages`).

---

## 🤖 Uso de Inteligência Artificial

A Inteligência Artificial foi empregada de forma colaborativa durante o desenvolvimento, atuando como "Pair Programmer". O modelo foi acionado para auxiliar na depuração de erros complexos (ex: conflitos de rotas SPA no GitHub Pages e _timeouts_ nos testes Playwright em ambiente CI), criação rápida das tipagens de ambiente (`.d.ts`), e adequação da pipeline YAML no GitHub Actions baseada em boas práticas de mercado.
