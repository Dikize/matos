Créer une application web en ReactJS, sans backend, avec stockage des données uniquement via LocalStorage.

Style visuel :
- Interface moderne en glassmorphism / glasmorph
- Fond avec dégradés doux
- Cartes translucides avec blur
- Design responsive mobile, tablette et desktop
- Interface claire, professionnelle et simple à utiliser

Objectif :
Créer une application de gestion de stock de matériel à récupérer à l’agence.

Fonctionnalités principales :
1. Gestion du stock de matériel avec CRUD complet :
   - Créer un matériel
   - Afficher la liste des matériels
   - Modifier un matériel
   - Supprimer un matériel

2. Chaque matériel doit contenir les champs suivants :
   - Nom du produit
   - Client, optionnel
   - Catégorie, optionnel
   - Quantité
   - Statut :
     - À récupérer
     - Validé
     - Stand by
   - Date prévue de récupération, optionnelle
   - Date de réception à l’agence, optionnelle

3. Statuts :
   - Permettre de valider un matériel lorsqu’il est récupéré
   - Permettre de le mettre en stand by
   - Permettre d’indiquer une date pour récupérer le matériel une fois reçu à l’agence

4. Gestion des catégories :
   - Permettre de créer une nouvelle catégorie
   - Stocker les catégories dans LocalStorage
   - Proposer les catégories existantes dans une liste déroulante lors de la création ou modification d’un matériel

5. Gestion des produits :
   - Permettre de créer des produits réutilisables
   - Associer chaque produit à une catégorie
   - Stocker les produits dans LocalStorage
   - Lorsqu’une catégorie est sélectionnée, afficher uniquement les produits associés à cette catégorie dans une liste déroulante
   - Exemple :
     - Catégorie : Extincteurs
     - Produits associés : E6EVT, E6FFF

6. Expérience utilisateur :
   - Ajouter une barre de recherche
   - Ajouter des filtres par statut et par catégorie
   - Afficher un compteur du nombre total de matériels
   - Afficher un compteur par statut
   - Prévoir des messages de confirmation pour suppression
   - Prévoir des notifications visuelles après ajout, modification, suppression ou validation

7. Structure de l’interface :
   - Header avec le nom de l’application
   - Tableau de bord avec compteurs
   - Formulaire d’ajout/modification de matériel
   - Liste des matériels sous forme de cartes ou tableau moderne
   - Section de gestion des catégories et produits

8. Données :
   - Toutes les données doivent être persistantes dans LocalStorage
   - Aucune API externe
   - Aucun backend
   - Prévoir des données d’exemple au premier lancement

9. Contraintes techniques :
   - Utiliser ReactJS
   - Utiliser uniquement le frontend
   - Code propre, bien organisé et maintenable
   - Composants réutilisables
   - Gestion simple de l’état avec useState/useEffect ou Context API