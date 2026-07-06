# Gestion des photos Avant / Après — solution retenue

Ce document compare deux façons simples de gérer les photos de réalisations,
et explique la solution retenue pour resto.phare.

## État actuel

La galerie est déjà en place (lot 4) :

- Les photos vont dans `assets/images/realisations/`
- La liste des réalisations est le tableau `GALLERY_ITEMS` en haut de `js/gallery.js`
- Aucun backend, aucune base de données : le site reste 100 % statique

## Option 1 — Sans backend : photos et données dans le dépôt (retenue)

**Principe** : on ajoute les photos dans le dépôt GitHub et on complète le
tableau `GALLERY_ITEMS`. C'est exactement ce que le site fait déjà.

**Comment ajouter une réalisation sans rien installer** (depuis un navigateur,
même sur téléphone) :

1. Sur GitHub, ouvrir le dossier `assets/images/realisations/` → *Add file* →
   *Upload files* → déposer les deux photos (ex : `clio-avant.jpg`,
   `clio-apres.jpg`) → *Commit*.
2. Ouvrir `js/gallery.js` → icône crayon (*Edit*) → copier le bloc d'exemple
   dans `GALLERY_ITEMS`, adapter les chemins et les textes → *Commit*.
3. Le site se met à jour tout seul au prochain déploiement.

**Avantages** : gratuit, zéro maintenance, zéro compte supplémentaire, tout
est versionné (on peut annuler une erreur), déjà fonctionnel.

**Limites** : il faut éditer un petit bloc de code (guidé par les commentaires
du fichier) ; une virgule oubliée peut casser la galerie — dans ce cas,
annuler le commit suffit.

**Conseil** : redimensionner les photos avant envoi (~1200 px de large,
format JPG) pour garder le site rapide.

## Option 2 — Admin léger : CMS git-based (Decap CMS) ou service externe

**Principe** : ajouter une page d'administration `/admin` avec
[Decap CMS](https://decapcms.org) (ex-Netlify CMS). On y téléverse les photos
et on remplit un formulaire (titre, ville, description) ; le CMS commite
lui-même dans le dépôt. Le site reste statique, pas de base de données.

Variante « service externe » : héberger les images sur Cloudinary (offre
gratuite) et ne garder que les URLs dans le dépôt — utile seulement si le
volume de photos devient important.

**Avantages** : interface conviviale, aucun code à toucher, gratuit (plan
gratuit Decap + Netlify/GitHub).

**Limites** : mise en place initiale (fichier de config, connexion GitHub
OAuth ou Netlify Identity), une dépendance externe de plus à maintenir,
surdimensionné pour quelques réalisations par mois.

## Recommandation

**Rester sur l'option 1** pour l'instant : elle est gratuite, déjà en place,
et l'ajout d'une réalisation prend deux minutes via l'interface web de GitHub
(procédure ci-dessus, aussi décrite dans
`assets/images/realisations/README.md`).

**Passer à l'option 2 (Decap CMS) plus tard, seulement si** :

- l'édition de `js/gallery.js` devient une source d'erreurs récurrentes, ou
- une personne non technique doit publier des réalisations en autonomie.

La structure actuelle (un objet par réalisation avec `avant`, `apres`,
`titre`, `ville`, `description`) se transposera telle quelle dans un CMS,
donc rien à refaire le jour du changement.
