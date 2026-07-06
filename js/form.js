// Envoi principal : Netlify Forms (POST vers "/" au format x-www-form-urlencoded).
// Fallback : si l'envoi automatique échoue (hors ligne, site non hébergé sur
// Netlify...), un lien mailto: pré-rempli est proposé au visiteur.
// Le rendez-vous reste confirmé manuellement par resto.phare.
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("rdv-form");
  if (!form) return;

  const submitBtn = form.querySelector(".form-submit");

  // Zone de message (succès / échec), annoncée aux lecteurs d'écran
  const status = document.createElement("p");
  status.className = "form-note";
  status.setAttribute("role", "status");
  status.setAttribute("aria-live", "polite");
  status.hidden = true;
  form.appendChild(status);

  const buildMailto = (data) => {
    const lignes = [
      `Nom : ${data.get("nom")}`,
      `Prénom : ${data.get("prenom")}`,
      `Téléphone : ${data.get("telephone")}`,
      `Email : ${data.get("email")}`,
      `Ville : ${data.get("ville")}`,
      `Type de demande : ${data.get("type")}`,
      `Moment préféré : ${data.get("moment")}`,
      `Message : ${data.get("message") || "-"}`,
    ];
    const sujet = encodeURIComponent("Demande de rendez-vous - resto.phare");
    const corps = encodeURIComponent(lignes.join("\n"));
    return `mailto:${SITE_CONFIG.email}?subject=${sujet}&body=${corps}`;
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    data.set("form-name", "demande-rendez-vous");

    if (submitBtn) submitBtn.disabled = true;
    status.hidden = true;

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data).toString(),
      });
      if (!response.ok) throw new Error(`Réponse ${response.status}`);

      form.reset();
      status.textContent =
        "Votre demande a bien été envoyée. resto.phare vous recontactera pour confirmer le rendez-vous.";
      status.hidden = false;
    } catch (erreur) {
      status.textContent =
        "L'envoi automatique a échoué. Vous pouvez nous appeler ou envoyer votre demande par email. ";
      const lien = document.createElement("a");
      lien.href = buildMailto(data);
      lien.textContent = "Envoyer par email";
      status.appendChild(lien);
      status.hidden = false;
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });
});
