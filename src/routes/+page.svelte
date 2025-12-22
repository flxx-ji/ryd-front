<!-- HERO -->
<section class="hero">
  <!-- overlay global (plus premium) -->
  <div class="hero-overlay"></div>

  <div class="hero-inner">
    <!-- Eyebrow (sur-titre) -->
    <p class="hero-eyebrow">Location premium • Toulon / Var</p>

    <!-- TON TITRE DOUBLE (inchangé) -->
    <div class="titre-wrapper">
      <h1 class="titre-stroke">Free Torque</h1>
      <h1 class="titre-fill">Free Torque</h1>
    </div>

    <!-- Promesse claire -->
    <p class="hero-tagline">Louez une moto de caractère. Vivez le Sud autrement.</p>
    <p class="hero-promise">Harley-Davidson • Indian • Triumph • Ducati • Vespa</p>

    <!-- CTA -->
    <div class="hero-cta">
      <a class="btn primary" href="/catalogue">Voir les motos</a>
      <a class="btn outline" href="/tarifs">Nos tarifs</a>
    </div>

    <!-- micro copy (rassurance) -->
    <p class="hero-micro">
      Réservation simple • Assistance • Options casque/gants • Départ Toulon
    </p>

    <!-- Proof / stats -->
    <div class="hero-proof">
      <div class="proof-item">
        <span class="proof-value">24/7</span>
        <span class="proof-label">Assistance</span>
      </div>
      <div class="proof-item">
        <span class="proof-value">Premium</span>
        <span class="proof-label">Motos sélectionnées</span>
      </div>
      <div class="proof-item">
        <span class="proof-value">Toulon</span>
        <span class="proof-label">Départ / retour</span>
      </div>
    </div>

    <!-- Meta -->
    <div class="hero-meta">
      <span>📍 Toulon • Var • PACA</span>
      <span>🕘 Lun–Sam 9h–19h</span>
    </div>
  </div>
</section>
<script>
  import HowItWorks from '$lib/components/HowItWorks.svelte';
</script>

<HowItWorks />

<style>
  .hero {
    position: relative;
    min-height: calc(100vh - 120px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 7rem 1rem 3.5rem;
  }

  .hero-overlay {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(900px 500px at 50% 35%, rgba(212,175,55,0.12), transparent 60%),
      linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.65));
    z-index: 0;
  }

  .hero-inner {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 980px;
    text-align: center;
    padding: 2.4rem 2rem;
    border-radius: 18px;
    backdrop-filter: blur(14px);
    background: rgba(0,0,0,0.52);
    box-shadow: 0 0 35px rgba(0, 0, 0, 0.6);
    border: 1px solid rgba(212,175,55,0.18);
  }

  .hero-eyebrow {
    display: inline-block;
    margin-bottom: 1rem;
    font-size: .8rem;
    letter-spacing: .28em;
    text-transform: uppercase;
    color: rgba(212,175,55,0.9);
  }

  .hero-tagline {
    margin-top: 1.2rem;
    font-size: 1.55rem;
    color: rgba(255,255,255,0.9);
    text-shadow: 1px 1px 2px #000;
    line-height: 1.35;
  }

  .hero-promise {
    margin-top: .7rem;
    font-size: .95rem;
    letter-spacing: .18em;
    text-transform: uppercase;
    color: rgba(212,175,55,0.95);
  }

  .hero-cta {
    margin-top: 2.1rem;
    display: flex;
    justify-content: center;
    gap: 14px;
    flex-wrap: wrap;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 12px 22px;
    border-radius: 10px;
    font-weight: 800;
    letter-spacing: .08em;
    text-transform: uppercase;
    font-size: .95rem;
    transition: .2s ease;
    text-decoration: none;
  }

  .btn.primary {
    background: #D4AF37;
    color: #000;
  }
  .btn.primary:hover {
    filter: brightness(1.05);
    box-shadow: 0 0 14px rgba(212,175,55,0.35);
    transform: translateY(-1px);
  }

  .btn.outline {
    border: 1px solid rgba(212,175,55,0.85);
    color: #D4AF37;
    background: transparent;
  }
  .btn.outline:hover {
    background: rgba(212,175,55,0.12);
    transform: translateY(-1px);
  }

  .hero-micro {
    margin-top: 1.2rem;
    font-size: .95rem;
    color: rgba(255,255,255,0.55);
  }

  .hero-proof {
    margin: 2rem auto 0;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
    max-width: 760px;
  }

  .proof-item {
    padding: 14px 12px;
    border-radius: 12px;
    border: 1px solid rgba(212,175,55,0.14);
    background: rgba(0,0,0,0.35);
  }

  .proof-value {
    display: block;
    font-weight: 900;
    letter-spacing: .06em;
    color: rgba(212,175,55,0.95);
    font-size: 1.05rem;
  }

  .proof-label {
    display: block;
    margin-top: 6px;
    font-size: .9rem;
    color: rgba(255,255,255,0.55);
  }

  .hero-meta {
    margin-top: 1.6rem;
    display: flex;
    justify-content: center;
    gap: 18px;
    flex-wrap: wrap;
    color: rgba(255,255,255,0.6);
    font-size: .95rem;
  }

  @media (max-width: 720px) {
    .hero-inner { padding: 2rem 1.3rem; }
    .hero-proof { grid-template-columns: 1fr; }
    .hero-tagline { font-size: 1.25rem; }
    .hero-promise { letter-spacing: .14em; }
  }
</style>
