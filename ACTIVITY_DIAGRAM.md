---
title: Parcours utilisateur - création d'un jardin
---
flowchart TD
    A([Début])

    %% Choix du mode %%
    A --> B{Quel mode de création souhaitez-vous ?}
    B -->|Assistant Bloomy| C[Répondre aux questions de l’assistant]
    B -->|Manuellement| D[Saisir les infos du jardin - nom, description, image, etc.]

    %% Parcours Assistant %%
    C --> I[Saisir les infos du jardin - nom, description, image, etc.]
    I --> E[Proposition de légumes adaptés]
    E --> J[Prévisualiser la sélection de légumes]

    %% Parcours Manuel %%
    D --> M[Sélectionner les légumes]
    M --> J

    %% Point de jonction %%
    J --> F{La sélection convient ?}
    F -->|Oui| G[Valider la sélection]
    F -->|Non| M

    %% Partie commune %%
    G --> X[Création du jardin]
    X --> Y[Ajout du jardin à la liste de l’utilisateur]
    Y --> Z[Redirection vers Mes Jardins]

    %% Interaction avec la base de données %%
    X --> DB[(Enregistrement en base de données)]

    %% Fin %%
    Z --> FIM((Fin))
