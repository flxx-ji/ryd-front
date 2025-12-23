<script>
  import TitreChicanos from '$lib/components/TitreChicanos.svelte';
</script>

<TitreChicanos text="Contact" />

<section class="wrap">
  <div class="panel">
    <h2>Demande de devis / infos</h2>
    <p class="lead">Réponse sous 24h (démo). Donne modèle + dates + zone.</p>

    <form
      name="contact"
      method="POST"
      action="/merci"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      class="form"
    >
      <input type="hidden" name="form-name" value="contact" />

      <p class="hidden">
        <label>Ne pas remplir: <input name="bot-field" /></label>
      </p>

      <div class="grid">
        <label>
          Nom
          <input name="nom" required placeholder="Nom" />
        </label>

        <label>
          Email
          <input name="email" type="email" required placeholder="email@exemple.com" />
        </label>

        <label>
          Téléphone
          <input name="tel" placeholder="06..." />
        </label>

        <label>
          Sujet
          <select name="sujet">
            <option>Demande de devis</option>
            <option>Disponibilité modèle</option>
            <option>Livraison / retrait</option>
            <option>Custom</option>
          </select>
        </label>
      </div>

      <label class="full">
        Message
        <textarea name="message" required rows="6" placeholder="Dates, modèle, lieu, permis..."></textarea>
      </label>

      <button class="cta" type="submit">Envoyer</button>
      <p class="note">*Démo : envoi via Netlify Forms (sans ouvrir d’appli mail).</p>
    </form>
  </div>
</section>

<style>
  .wrap { width: min(980px, 100%); margin: 0 auto; padding: 0 1rem 4rem; }
  .panel {
    margin-top: 1rem;
    padding: 2rem;
    border-radius: 18px;
    backdrop-filter: blur(12px);
    background: rgba(0,0,0,0.58);
    border: 1px solid rgba(212,175,55,0.16);
    box-shadow: 0 0 25px rgba(0,0,0,.55);
    color: rgba(255,255,255,.85);
    text-shadow: 1px 1px 2px #000;
  }
  h2 { margin: 0 0 .5rem; color: #D4AF37; }
  .lead { margin: 0 0 1.4rem; color: rgba(255,255,255,.65); line-height: 1.6; }
  .form { display: flex; flex-direction: column; gap: 14px; }
  .grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
  label { display: flex; flex-direction: column; gap: 6px; font-weight: 800; font-size: .9rem; }
  input, select, textarea {
    padding: 12px;
    border-radius: 12px;
    border: 1px solid rgba(212,175,55,0.18);
    background: rgba(0,0,0,0.45);
    color: rgba(255,255,255,.9);
    outline: none;
  }
  .cta {
    margin-top: 6px;
    padding: 12px 16px;
    border-radius: 12px;
    border: 1px solid rgba(212,175,55,0.35);
    background: #D4AF37;
    color: #000;
    font-weight: 900;
    letter-spacing: .08em;
    text-transform: uppercase;
    cursor: pointer;
  }
  .note { margin: 10px 0 0; color: rgba(255,255,255,.45); font-size: .9rem; text-align: center; }
  .hidden { display: none; }
  @media (max-width: 700px) { .grid { grid-template-columns: 1fr; } }
</style>
