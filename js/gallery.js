// Galerie "Avant / Après" — réalisations resto.phare
//
// ── POUR AJOUTER UNE RÉALISATION ─────────────────────────────────────────
// 1. Déposez les deux photos dans le dossier : assets/images/realisations/
//    (idéalement au même cadrage, format paysage, ex : clio-avant.jpg / clio-apres.jpg)
// 2. Copiez le bloc d'exemple ci-dessous dans la liste GALLERY_ITEMS
//    et adaptez les chemins et les textes.
// 3. Enregistrez le fichier : la galerie se met à jour automatiquement.
//
// Champs disponibles :
//   avant       (obligatoire)  chemin de la photo AVANT
//   apres       (obligatoire)  chemin de la photo APRÈS
//   titre       (obligatoire)  titre court de la réalisation
//   ville       (optionnel)    ville de l'intervention
//   description (optionnel)    description courte
// ─────────────────────────────────────────────────────────────────────────

const GALLERY_ITEMS = [
  // Exemple — retirez les "//" pour l'activer, puis adaptez :
  // {
  //   avant: "assets/images/realisations/vehicule1-avant.jpg",
  //   apres: "assets/images/realisations/vehicule1-apres.jpg",
  //   titre: "Restauration des deux phares avant",
  //   ville: "Les Sables-d'Olonne",
  //   description: "Optiques ternis et jaunis, transparence retrouvée.",
  // },
];

// ─── Rendu de la galerie (ne pas modifier ci-dessous) ────────────────────

// Visuel de remplacement propre si une photo est manquante ou introuvable
const GALLERY_PLACEHOLDER =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">' +
      '<rect width="400" height="300" fill="#1c1815"/>' +
      '<g fill="none" stroke="#3a342e" stroke-width="6" stroke-linecap="round">' +
      '<rect x="120" y="105" width="160" height="110" rx="14"/>' +
      '<circle cx="200" cy="160" r="30"/>' +
      '<path d="M165 105l12-20h46l12 20"/>' +
      "</g>" +
      '<text x="200" y="262" text-anchor="middle" fill="#6b645c" font-family="Segoe UI, Arial, sans-serif" font-size="16">Photo à venir</text>' +
      "</svg>"
  );

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("galerie-grid");
  const emptyState = document.getElementById("galerie-vide");
  if (!grid) return;

  const items = GALLERY_ITEMS.filter((item) => item && item.titre);

  if (items.length === 0) {
    // Aucune réalisation : on garde l'état vide affiché dans le HTML
    return;
  }

  if (emptyState) emptyState.hidden = true;

  const buildPhoto = (src, labelText, labelClass, alt) => {
    const figure = document.createElement("figure");
    figure.className = "galerie-photo";

    const img = document.createElement("img");
    img.src = src || GALLERY_PLACEHOLDER;
    img.alt = alt;
    img.loading = "lazy";
    img.addEventListener("error", () => {
      img.src = GALLERY_PLACEHOLDER;
    });

    const label = document.createElement("figcaption");
    label.className = "galerie-label " + labelClass;
    label.textContent = labelText;

    figure.append(img, label);
    return figure;
  };

  items.forEach((item) => {
    const card = document.createElement("article");
    card.className = "galerie-card";

    const photos = document.createElement("div");
    photos.className = "galerie-photos";
    photos.append(
      buildPhoto(item.avant, "Avant", "galerie-label-avant", "Phare avant restauration — " + item.titre),
      buildPhoto(item.apres, "Après", "galerie-label-apres", "Phare après restauration — " + item.titre)
    );

    const infos = document.createElement("div");
    infos.className = "galerie-infos";

    const titre = document.createElement("h3");
    titre.textContent = item.titre;
    infos.append(titre);

    if (item.ville) {
      const ville = document.createElement("p");
      ville.className = "galerie-ville";
      ville.textContent = item.ville;
      infos.append(ville);
    }

    if (item.description) {
      const description = document.createElement("p");
      description.className = "galerie-description";
      description.textContent = item.description;
      infos.append(description);
    }

    card.append(photos, infos);
    grid.append(card);
  });
});
