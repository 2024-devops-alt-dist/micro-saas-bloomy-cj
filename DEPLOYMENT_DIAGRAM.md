---
config:
  layout: elk
---
flowchart TB
 subgraph DEV["Développement local"]
        DEV_FRONT["Frontend (React)"]
        DEV_BACK["Backend (Node.js / Express)"]
  end

 subgraph PRECOMMIT["Pre-commit / Lefthook"]
        PC_CHECK["Vérifications : lint, audit, tests"]
        PC_OK["✅ Contrôles OK"]
        PC_KO["❌ Contrôles KO - Retour Dev"]
  end

 subgraph BACKEND["Backend - API Tests & Audit"]
        B_CHECKOUT["Checkout code"]
        B_SETUP["Setup Node.js"]
        B_INSTALL["Install dependencies (npm ci)"]
        B_PRISMA["Generate Prisma Client"]
        B_LINT["Lint code"]
        B_AUDIT["Audit sécurité"]
        B_TYPE["Contrôle typage"]
        B_TEST["Tests unitaires"]
        B_BUILD["Build projet"]
  end

 subgraph FRONTEND["Frontend CI - Audit & Tests"]
        F_CHECKOUT["Checkout code"]
        F_SETUP["Setup Node.js"]
        F_TYPE["Contrôle typage"]
        F_INSTALL["Install dependencies (npm ci)"]
        F_LINT["Lint code"]
        F_BUILD["Build projet"]
        F_AUDIT["Audit sécurité"]
        F_TEST["Tests unitaires"]
  end

  subgraph CHECK-CI["Validation CI/CD"]
        CCI_CHECK["Est-ce que la CI passe ?"]
        CCI_OK["✅ Contrôles OK"]
        CCI_KO["❌ Contrôles KO - Retour Dev"]
  end

 subgraph DOCKER["Docker Validation"]
        D_CHECKOUT["Checkout code"]
        D_BUILD["Build Docker images"]
  end

 subgraph DEPLOY["Deploy Backend"]
        DEP_CHECKOUT["Checkout repository"]
        DEP_LOGIN["Login Docker Hub"]
        DEP_BUILD["Build & Push image"]
        DEP_RENDER["Trigger Render deploy"]
  end

 subgraph ACTIONS["GitHub Actions CI/CD"]
        BACKEND
        FRONTEND
        DOCKER
        DEPLOY
  end

 subgraph GIT["Git & CI/CD"]
        GITHUB["Bloomy Repo (develop/main)"]
        ACTIONS
  end

 subgraph VERCEL["Vercel (Frontend)"]
        APP["React App (Prod)"]
  end

 subgraph RENDER["Render.com (Backend + DB)"]
        API["API Node.js/Express (Prod)"]
        DB_PROD["Database PROD Postgre"]
  end

 subgraph PROD["Production"]
        VERCEL
        RENDER
  end

 subgraph TEST["Database"]
        DB_BASE["bloomy-db"]
        DB_TEST["bloomy-db-test"]
  end

    B_CHECKOUT --> B_SETUP
    B_SETUP --> B_INSTALL
    B_INSTALL --> B_PRISMA
    B_PRISMA --> B_LINT
    B_LINT --> B_AUDIT
    B_AUDIT --> B_TYPE
    B_TYPE --> B_TEST
    B_TEST --> B_BUILD

    F_CHECKOUT --> F_SETUP
    F_SETUP --> F_TYPE
    F_TYPE --> F_INSTALL
    F_INSTALL --> F_LINT
    F_LINT --> F_BUILD
    F_BUILD --> F_AUDIT
    F_AUDIT --> F_TEST

    D_CHECKOUT --> D_BUILD
    DEP_CHECKOUT --> DEP_LOGIN
    DEP_LOGIN --> DEP_BUILD
    DEP_BUILD --> DEP_RENDER

    ACTIONS --> CHECK-CI
    CCI_CHECK -- OK--> CCI_OK -- deploiement --> PROD
    CCI_CHECK -- KO-->CCI_KO --> DEV

    DEV -- commit + push --> PC_CHECK
    PC_CHECK -- OK --> PC_OK -- Push --> GITHUB
    PC_CHECK -- KO --> PC_KO --> DEV

    
    USER["Utilisateur"] -- accède a l'interface fonctionnel en ligne --> APP
    APP -- Appel API --> API
    API -- Lecture/Ecriture --> DB_PROD
    DEV_BACK -- Accès données locales --> DB_BASE
    DEV_BACK -- Tests unitaires --> DB_TEST
    GITHUB -- création PR/reprise PR, ce qui déclenche --> ACTIONS