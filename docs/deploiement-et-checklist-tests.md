# Déploiement Netlify et checklist de test réel — resto.phare

Ce document accompagne la mise en ligne du site sur Netlify et son test
en conditions réelles. Le test final du formulaire doit se faire sur le
**site déployé**, pas seulement en local.

---

## 1. Paramètres Netlify à vérifier

| Paramètre | Valeur attendue |
|---|---|
| Branch to deploy | `main` |
| Build command | *(vide — aucune)* |
| Publish directory | `.` (la racine du projet) |

Le fichier `netlify.toml` à la racine contient déjà `publish = "."` et
aucune commande de build : Netlify le lit automatiquement, il n'y a rien
à changer.

## 2. Importer le dépôt GitHub dans Netlify

1. Créer un compte gratuit sur <https://www.netlify.com> (la connexion
   avec le compte GitHub est la plus simple).
2. Cliquer sur **« Add new site » → « Import an existing project »**.
3. Choisir **GitHub** et autoriser Netlify à accéder au dépôt
   `site-web-layane-`.
4. Vérifier les paramètres du tableau ci-dessus (branch `main`, build
   command vide, publish directory `.`).
5. Cliquer sur **« Deploy site »**. Le site est en ligne en moins d'une
   minute sur une adresse du type `https://nom-aleatoire.netlify.app`.
6. Ensuite, **chaque push sur `main` redéploie automatiquement** le site.

## 3. Checklist de test après déploiement

À faire sur le site déployé (adresse `*.netlify.app`), idéalement avec un
vrai téléphone :

- [ ] **Mobile** : ouvrir le site sur un smartphone, vérifier que tout
      s'affiche correctement (menu, sections, images).
- [ ] **Bouton téléphone** : appuyer sur le numéro → l'application
      téléphone s'ouvre avec le bon numéro (`06 20 69 99 99`).
- [ ] **Bouton email** : appuyer sur l'email → l'application mail s'ouvre
      avec la bonne adresse (`resto.phare@outlook.fr`).
- [ ] **Formulaire** : remplir tous les champs et envoyer.
- [ ] **Message de succès** : « Votre demande a bien été envoyée.
      resto.phare vous recontactera pour confirmer le rendez-vous. »
      s'affiche sous le formulaire, sans ouvrir l'application email.
- [ ] **Soumission dans Netlify** : dans le dashboard Netlify, ouvrir
      **Forms → demande-rendez-vous** et vérifier que la demande est là,
      avec tous les champs (nom, prénom, téléphone, email, ville, type,
      moment, message).
- [ ] **Fallback en cas d'erreur** : couper le réseau (mode avion) ou
      tester en local, envoyer le formulaire → le message « L'envoi
      automatique a échoué… » s'affiche avec le lien « Envoyer par
      email » qui ouvre un mail pré-rempli.
- [ ] **Galerie avant/après** : la section réalisations s'affiche
      (photos avant/après, ou le message « bientôt » s'il n'y a pas
      encore de réalisation).
- [ ] **Responsive** : tester en portrait et paysage sur mobile, et sur
      un écran d'ordinateur ; aucun débordement horizontal, textes
      lisibles.

Conseil : préfixer la première soumission de test par « TEST » dans le
message, pour la reconnaître (et éventuellement la supprimer) dans le
dashboard Netlify.

## 4. Si Netlify ne détecte pas le formulaire

Symptôme : la section **Forms** du dashboard est vide, ou l'envoi renvoie
une erreur 404 sur le site déployé.

- [ ] Vérifier que **Form detection est activée** : Site configuration →
      Forms → **Enable form detection**, puis **redéployer** le site
      (Deploys → Trigger deploy → Deploy site).
- [ ] Vérifier dans `index.html` que le `<form>` porte bien
      `name="demande-rendez-vous"`, `method="POST"` et
      `data-netlify="true"` dans le **HTML statique** (le formulaire ne
      doit pas être généré en JavaScript).
- [ ] Vérifier la présence du champ caché
      `<input type="hidden" name="form-name" value="demande-rendez-vous" />`
      dans le formulaire.
- [ ] Vérifier que chaque champ a un attribut `name` (nom, prenom,
      telephone, email, ville, type, moment, message).
- [ ] Après **toute modification du formulaire**, redéployer : Netlify ne
      détecte les formulaires qu'au moment du build/déploiement.
- [ ] Vérifier le quota du plan gratuit : 100 soumissions/mois. Au-delà,
      les envois sont rejetés.
- [ ] Rappel : en local (sans Netlify), l'échec de l'envoi automatique est
      **normal** — seul le site déployé permet de tester Netlify Forms.

## 5. Connecter un nom de domaine (quand le client est prêt)

1. Acheter le domaine (chez Netlify directement, ou chez un registrar
   type OVH / Gandi / Ionos).
2. Dans Netlify : **Domain management → Add custom domain**, saisir le
   domaine.
3. Suivre les instructions DNS affichées par Netlify : soit utiliser les
   serveurs DNS de Netlify, soit ajouter un enregistrement `A` / `CNAME`
   chez le registrar.
4. Attendre la propagation DNS (de quelques minutes à 24 h).
5. Le certificat **HTTPS est fourni automatiquement et gratuitement**
   (Let's Encrypt) : vérifier que « HTTPS » est actif dans Domain
   management.
6. Optionnel : activer une notification email dans **Forms → Form
   notifications** pour recevoir chaque demande sur
   `resto.phare@outlook.fr` sans consulter le dashboard.

## 6. Checklist courte de livraison client

- [ ] Site déployé sur Netlify et accessible (URL `*.netlify.app` ou
      domaine personnalisé).
- [ ] Toute la checklist de test (section 3) passée avec succès.
- [ ] Une soumission de test reçue et visible dans Netlify Forms, puis
      supprimée.
- [ ] Notification email des soumissions activée vers
      `resto.phare@outlook.fr`.
- [ ] Prix, téléphone, email et zone vérifiés avec le client
      (`js/config.js` + JSON-LD dans `index.html`).
- [ ] Au moins une vraie réalisation avant/après ajoutée à la galerie
      (sinon le message « bientôt » s'affiche — acceptable pour la V1).
- [ ] Accès transmis au client : dashboard Netlify (invitation membre ou
      identifiants) et dépôt GitHub si souhaité.
- [ ] Expliquer au client où voir les demandes : **Netlify → Forms →
      demande-rendez-vous**.
