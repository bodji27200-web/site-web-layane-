# Photos des réalisations (Avant / Après)

Déposez ici les photos des interventions.

## Comment ajouter une réalisation

1. Déposez les deux photos dans ce dossier, par exemple :
   - `clio-avant.jpg`
   - `clio-apres.jpg`
2. Ouvrez le fichier `js/gallery.js` et ajoutez un bloc dans `GALLERY_ITEMS` :

   ```js
   {
     avant: "assets/images/realisations/clio-avant.jpg",
     apres: "assets/images/realisations/clio-apres.jpg",
     titre: "Restauration des deux phares avant",
     ville: "Les Sables-d'Olonne",          // optionnel
     description: "Optiques ternis, transparence retrouvée.", // optionnel
   },
   ```

3. La galerie se met à jour automatiquement.

## Conseils photo

- Même angle et même distance pour l'avant et l'après.
- Format paysage de préférence (les photos sont affichées en 4:3).
- Lumière naturelle, phare bien visible.
