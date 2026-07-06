// Aucun backend n'est configuré : la demande est envoyée via un mailto: pré-rempli,
// ouvert dans le client mail du visiteur, puis confirmée manuellement par resto.phare.
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("rdv-form");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);

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
    window.location.href = `mailto:${SITE_CONFIG.email}?subject=${sujet}&body=${corps}`;
  });
});
