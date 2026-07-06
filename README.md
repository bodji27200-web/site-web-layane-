# resto.phare — Restauration de phares de voiture

Site vitrine **100 % statique** (HTML / CSS / JavaScript, sans framework ni build)
pour un service de restauration de phares à domicile aux Sables-d'Olonne.

## Structure du projet

```
index.html                       Page unique du site
css/style.css                    Styles
js/config.js                     Infos modifiables (prix, téléphone, email, zone…)
js/gallery.js                    Galerie avant/après (liste des réalisations)
js/main.js                       Injection des infos de config dans la page
js/form.js                       Formulaire de rendez-vous (envoi via Netlify Forms)
assets/images/realisations/      Photos avant/après
docs/                            Documentation interne
netlify.toml                     Configuration de déploiement Netlify
```

## Lancer / tester le site en local

Aucune installation nécessaire. Deux possibilités :

1. **Simple** : double-cliquer sur `index.html` pour l'ouvrir dans le navigateur.
2. **Recommandé** (comportement identique au site en ligne) : lancer un petit
   serveur local depuis la racine du projet, par exemple :

   ```bash
   python3 -m http.server 8000
   ```

   puis ouvrir <http://localhost:8000> dans le navigateur.

## Modifier les infos principales (prix, téléphone, email, zone…)

Presque tout se modifie dans **`js/config.js`** :

```js
const SITE_CONFIG = {
  nom: "resto.phare",
  prix: "15€",
  prixLabel: "Prix de lancement (non définitif)",
  zone: "Les Sables-d'Olonne",
  supplement: "Supplément kilométrique possible hors secteur",
  telephone: "06 20 69 99 99",
  telephoneNote: "Si pas de réponse, merci de laisser un message",
  email: "resto.phare@outlook.fr",
};
```

Changer une valeur ici met à jour automatiquement tous les endroits de la page
où elle apparaît (texte, liens `tel:` et `mailto:`).

**Cas particuliers à mettre à jour à la main dans `index.html`** si le
téléphone, l'email ou la zone changent (valeurs écrites en dur pour le
référencement et pour les visiteurs sans JavaScript) :

- le bloc `<script type="application/ld+json">` dans le `<head>`
  (téléphone, email, zone, prix) ;
- le `<title>` et la `<meta name="description">` si la zone change.

## Ajouter une réalisation avant/après

1. Déposer les deux photos (même cadrage, format paysage de préférence) dans
   `assets/images/realisations/`, par exemple `clio-avant.jpg` et
   `clio-apres.jpg`.
2. Ouvrir **`js/gallery.js`** et ajouter un bloc dans la liste
   `GALLERY_ITEMS` :

   ```js
   {
     avant: "assets/images/realisations/clio-avant.jpg",
     apres: "assets/images/realisations/clio-apres.jpg",
     titre: "Restauration des deux phares avant",
     ville: "Les Sables-d'Olonne",        // optionnel
     description: "Optiques ternis et jaunis, transparence retrouvée.", // optionnel
   },
   ```

3. Enregistrer : la galerie s'affiche automatiquement (et le message
   « bientôt » disparaît dès qu'il y a au moins une réalisation).

Plus de détails (conseils de prise de vue, nommage, poids des images) dans
`docs/gestion-photos-avant-apres.md`.

## Formulaire de rendez-vous

Le formulaire utilise **Netlify Forms** (gratuit jusqu'à 100 soumissions/mois) :

- Les demandes envoyées sont visibles dans Netlify :
  **Site dashboard → Forms → demande-rendez-vous**.
- Après toute **modification du formulaire** dans `index.html`, il faut
  **redéployer le site** pour que Netlify détecte à nouveau le formulaire.
- En **local** (sans Netlify), l'envoi automatique ne fonctionne pas :
  c'est normal, le message d'échec s'affiche alors.
- En cas d'échec de l'envoi automatique, un lien **mailto** pré-rempli est
  proposé au visiteur comme solution de secours.

Le rendez-vous reste confirmé manuellement par téléphone ou par email.

## Déployer sur Netlify depuis GitHub

Le site se déploie tel quel, **sans aucune commande de build**.
Le fichier `netlify.toml` à la racine contient déjà la configuration.

1. Créer un compte gratuit sur <https://www.netlify.com> (connexion avec
   GitHub possible).
2. Cliquer sur **« Add new site » → « Import an existing project »**.
3. Choisir **GitHub** et autoriser Netlify à accéder au dépôt
   `site-web-layane-`.
4. Paramètres de déploiement à vérifier :
   - **Branch to deploy** : `main`
   - **Build command** : *(laisser vide — aucune)*
   - **Publish directory** : `.` *(la racine du projet)*
5. Cliquer sur **« Deploy site »**. Le site est en ligne en moins d'une
   minute sur une adresse du type `https://nom-aleatoire.netlify.app`.

Ensuite, **chaque push sur `main`** redéploie automatiquement le site.

### Connecter un nom de domaine (plus tard)

Dans Netlify : **Site settings → Domain management → Add custom domain**,
puis suivre les instructions pour pointer le domaine (DNS). Le certificat
HTTPS est fourni gratuitement et automatiquement par Netlify.
