<script>
  export let data;
  import { PUBLIC_API_URL2 } from '$env/static/public';

  const baseURL = PUBLIC_API_URL2;
  let moto = data.moto;

  const imageURL = moto.image?.startsWith('/uploads')
    ? `${baseURL}${moto.image}`
    : moto.image;
</script>

<section class="page">
  <div class="wrap">

    <!-- HERO IMAGE -->
    <div class="hero">
      <img class="moto-img" src={imageURL} alt={moto.nom} />
      <div class="hero-overlay"></div>

      <div class="hero-content">
        <p class="kicker">{moto.marque} • {moto.modele}</p>
        <h1 class="title">{moto.nom}</h1>

        <div class="chips">
          <span class="chip">{moto.couleur}</span>
          <span class="chip">{moto.annee}</span>
          <span class:ok={moto.disponible} class:ko={!moto.disponible} class="chip">
            {moto.disponible ? 'Disponible' : 'Indisponible'}
          </span>
        </div>

        <div class="cta-row">
          <a class="btn gold" href={`/reservation/${moto._id}`}>Réserver</a>
          <a class="btn ghost" href="/catalogue">Retour au catalogue</a>
        </div>
      </div>
    </div>

    <!-- CONTENT GRID -->
    <div class="grid">

      <article class="card">
        <h2>Tarifs</h2>
        <ul class="list">
          <li><span>1 jour</span><b>{moto.tarifs?.unJour} €</b></li>
          <li><span>2–3 jours</span><b>{moto.tarifs?.deuxTroisJours}</b></li>
          <li><span>4–5 jours</span><b>{moto.tarifs?.quatreCinqJours}</b></li>
          <li><span>1 semaine</span><b>{moto.tarifs?.uneSemaine} €</b></li>
        </ul>
        <p class="hint">*Démo : tarifs indicatifs selon période & options.</p>
      </article>

      <article class="card">
        <h2>Caractéristiques</h2>
        <ul class="list">
          <li><span>Moteur</span><b>{moto.caracteristiques?.moteur}</b></li>
          <li><span>Cylindrée</span><b>{moto.caracteristiques?.cylindree} cc</b></li>
          <li><span>Transmission</span><b>{moto.caracteristiques?.transmission}</b></li>
          <li><span>Poids</span><b>{moto.caracteristiques?.poids}</b></li>
          <li><span>Autonomie</span><b>{moto.caracteristiques?.autonomie}</b></li>
          <li><span>Réservoir</span><b>{moto.caracteristiques?.reservoir}</b></li>
        </ul>
      </article>

      <article class="card full">
        <h2>Équipements inclus</h2>

        {#if moto.equipements?.length}
          <div class="equip">
            {#each moto.equipements as item}
              <span class="equip-item">• {item}</span>
            {/each}
          </div>
        {:else}
          <p class="hint">— Non spécifiés —</p>
        {/if}
      </article>

    </div>

    <!-- bottom CTA (mobile friendly) -->
    <div class="bottom-cta">
      <a class="btn gold" href={`/reservation/${moto._id}`}>Réserver cette moto</a>
      <a class="btn ghost" href="/catalogue">Voir d’autres modèles</a>
    </div>

  </div>
</section>

<style>
  .page {
    width: 100%;
    padding: 1.5rem 0 4rem;
  }

  .wrap {
    width: min(1100px, 100%);
    margin: 0 auto;
    padding: 0 1rem;
  }

  /* HERO */
  .hero {
    position: relative;
    border-radius: 18px;
    overflow: hidden;
    border: 1px solid rgba(212,175,55,0.18);
    box-shadow: 0 24px 70px rgba(0,0,0,.45);
  }

  .moto-img {
    width: 100%;
    height: clamp(280px, 45vh, 520px);
    object-fit: cover;
    display: block;
    filter: saturate(1.05);
  }

  .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(0,0,0,.15) 0%,
      rgba(0,0,0,.55) 55%,
      rgba(0,0,0,.85) 100%
    );
  }

  .hero-content {
    position: absolute;
    left: 18px;
    right: 18px;
    bottom: 18px;
    z-index: 2;
  }

  .kicker {
    margin: 0 0 .4rem;
    letter-spacing: .22em;
    text-transform: uppercase;
    color: rgba(212,175,55,.92);
    font-size: .8rem;
    text-shadow: 1px 1px 2px #000;
  }

  .title {
    margin: 0 0 .8rem;
    color: rgba(255,255,255,.95);
    font-size: clamp(1.6rem, 3vw, 2.4rem);
    font-weight: 900;
    text-shadow: 1px 1px 2px #000;
  }

  .chips {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 1rem;
  }

  .chip {
    display: inline-flex;
    align-items: center;
    padding: 7px 10px;
    border-radius: 999px;
    background: rgba(0,0,0,.45);
    border: 1px solid rgba(212,175,55,.18);
    color: rgba(255,255,255,.88);
    font-weight: 800;
    font-size: .85rem;
    text-shadow: 1px 1px 2px #000;
  }

  .chip.ok { color: rgba(165, 255, 205, .95); }
  .chip.ko { color: rgba(255, 170, 170, .95); }

  .cta-row {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  /* GRID */
  .grid {
    margin-top: 1.2rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
  }

  .card {
    border-radius: 16px;
    border: 1px solid rgba(212,175,55,0.16);
    background: rgba(0,0,0,0.55);
    backdrop-filter: blur(10px);
    box-shadow: 0 0 18px rgba(0,0,0,.45);
    padding: 18px;
    color: rgba(255,255,255,.88);
    text-align: left;
  }

  .card.full {
    grid-column: 1 / -1;
  }

  .card h2 {
    margin: 0 0 12px;
    color: rgba(255,255,255,.92);
    font-size: 1.1rem;
    letter-spacing: .06em;
  }

  .list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: 10px;
  }

  .list li {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(255,255,255,.08);
  }

  .list span {
    color: rgba(255,255,255,.7);
  }

  .list b {
    color: #D4AF37;
  }

  .hint {
    margin: 12px 0 0;
    color: rgba(255,255,255,.55);
    font-size: .9rem;
  }

  .equip {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  .equip-item {
    padding: 8px 10px;
    border-radius: 999px;
    background: rgba(0,0,0,.35);
    border: 1px solid rgba(212,175,55,.14);
    color: rgba(255,255,255,.78);
    font-weight: 700;
    font-size: .9rem;
  }

  /* BUTTONS */
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 11px 14px;
    border-radius: 10px;
    text-decoration: none;
    font-weight: 900;
    letter-spacing: .06em;
    text-transform: uppercase;
    font-size: .85rem;
    border: 1px solid rgba(212,175,55,0.25);
  }

  .btn.gold {
    background: #D4AF37;
    color: #000;
  }

  .btn.gold:hover {
    box-shadow: 0 0 16px rgba(212,175,55,.35);
    filter: brightness(1.03);
  }

  .btn.ghost {
    background: rgba(0,0,0,.45);
    color: rgba(255,255,255,.9);
  }

  .btn.ghost:hover {
    box-shadow: 0 0 12px rgba(212,175,55,.25);
    color: #D4AF37;
  }

  .bottom-cta {
    margin-top: 18px;
    display: none;
    gap: 12px;
    flex-wrap: wrap;
    justify-content: center;
  }

  /* RESPONSIVE */
  @media (max-width: 900px) {
    .grid { grid-template-columns: 1fr; }
  }

  @media (max-width: 520px) {
    .cta-row { display: none; }
    .bottom-cta { display: flex; }
  }
</style>
