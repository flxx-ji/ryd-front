<script>
  const headline = "Tarifs";
  const subtitle = "Simple, dégressif, premium";

  const ranges = [
    {
      name: "Scooter & Vespa",
      priceFrom: 79,
      desc: "Idéal ville + bord de mer. Style, confort, légèreté.",
      highlight: "Le plus accessible"
    },
    {
      name: "Roadster & Classiques",
      priceFrom: 129,
      desc: "Polyvalent, fun, parfait pour la route en PACA.",
      highlight: "Best balance"
    },
    {
      name: "Cruiser Premium",
      priceFrom: 179,
      desc: "Harley / Indian : couple, présence, plaisir pur.",
      highlight: "Le plus demandé"
    },
    {
      name: "Sport & Prestige",
      priceFrom: 199,
      desc: "Ducati & performance : sensations + look agressif.",
      highlight: "Pour les pilotes"
    }
  ];

  // Dégressif : plus tu loues, moins tu payes par jour
  // (valeurs demo, tu peux ajuster)
  const packs = [
    { days: 1, label: "1 jour", discount: 0 },
    { days: 2, label: "2 jours", discount: 5 },
    { days: 3, label: "3 jours", discount: 10 },
    { days: 4, label: "4 jours", discount: 15 },
    { days: 5, label: "5 jours", discount: 20 },
    { days: 6, label: "6 jours", discount: 25 },
    { days: 7, label: "1 semaine", discount: 30 }
  ];

  // Exemple visuel sur une base “Roadster”
  const exampleBase = 129;
  const calc = (days, discount) => {
    const total = exampleBase * days * (1 - discount / 100);
    return Math.round(total);
  };
</script>

<section class="tarifs">
  <div class="wrap">
    <header class="head">
      <span class="kicker">{subtitle}</span>
      <h1 class="title">{headline}</h1>
      <p class="lead">
        Des prix <strong>dégressifs</strong> selon la durée. Tu choisis la moto, on s’occupe du reste.
      </p>
      <div class="divider"></div>
    </header>

    <!-- Cartes "gammes" -->
    <div class="ranges">
      {#each ranges as r}
        <article class="range-card">
          <div class="range-top">
            <h2>{r.name}</h2>
            <span class="pill">{r.highlight}</span>
          </div>

          <p class="range-desc">{r.desc}</p>

          <div class="range-price">
            <span class="from">À partir de</span>
            <span class="amount">{r.priceFrom}€</span>
            <span class="per">/jour</span>
          </div>

          <a class="btn primary" href="/catalogue">Voir les motos</a>
        </article>
      {/each}
    </div>

    <!-- Packs dégressifs -->
    <section class="packs">
      <h2 class="packs-title">Packs durée (dégressifs)</h2>
      <p class="packs-sub">
        Plus tu roules, plus le prix / jour baisse. Exemple sur une base Roadster à {exampleBase}€/jour.
      </p>

      <div class="pack-grid">
        {#each packs as p}
          <div class="pack">
            <div class="pack-head">
              <span class="pack-days">{p.label}</span>
              <span class="pack-off">-{p.discount}%</span>
            </div>

            <div class="pack-body">
              <span class="pack-total">{calc(p.days, p.discount)}€</span>
              <span class="pack-note">total estimé</span>
            </div>
          </div>
        {/each}
      </div>

      <div class="fineprint">
        <p>
          *Tarifs indicatifs (démo). Le prix exact dépend du modèle, de la période et des options.
          Caution possible selon cylindrée (pré-autorisation CB).
        </p>
      </div>
    </section>

    <!-- Promesses / rassurance -->
    <section class="promises">
      <div class="promise">
        <h3>✅ Réservation fluide</h3>
        <p>Choix du modèle → dates → confirmation rapide. Paiement possible en ligne (démo Stripe).</p>
      </div>
      <div class="promise">
        <h3>✅ Options utiles</h3>
        <p>Casque, pluie, GoPro, GPS… selon stock et modèle. Parfait pour une virée propre.</p>
      </div>
      <div class="promise">
        <h3>✅ Retrait ou livraison</h3>
        <p>Retrait sur place + briefing. Livraison possible selon zone (si tu veux l’activer).</p>
      </div>
    </section>

    <div class="cta">
      <a class="btn primary" href="/catalogue">Choisir une moto</a>
      <a class="btn outline" href="/services">Voir les services</a>
    </div>
  </div>
</section>

<style>
  .tarifs {
    width: 100%;
    padding: 5.5rem 1rem 4rem;
  }

  .wrap {
    width: min(1100px, 100%);
    margin: 0 auto;
  }

  .head {
    text-align: center;
    margin-bottom: 2.6rem;
  }

  .kicker {
    display: inline-block;
    color: rgba(212, 175, 55, 0.95);
    font-size: .8rem;
    letter-spacing: .28em;
    text-transform: uppercase;
    margin-bottom: .8rem;
  }

  .title {
    margin: 0;
    font-size: clamp(2.2rem, 4.5vw, 3.4rem);
    color: rgba(255,255,255,0.92);
    text-shadow: 1px 1px 2px #000;
  }

  .lead {
    margin: 1rem auto 0;
    max-width: 720px;
    color: rgba(255,255,255,0.72);
    line-height: 1.7;
    text-shadow: 1px 1px 2px #000;
  }

  .divider {
    width: 92px;
    height: 1px;
    margin: 1.4rem auto 0;
    background: linear-gradient(90deg, transparent, rgba(212,175,55,.9), transparent);
  }

  .ranges {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    margin-top: 2rem;
  }

  .range-card {
    border-radius: 18px;
    border: 1px solid rgba(212,175,55,0.16);
    background: rgba(0,0,0,0.55);
    backdrop-filter: blur(10px);
    box-shadow: 0 0 18px rgba(0,0,0,.45);
    padding: 22px;
  }

  .range-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
  }

  .range-card h2 {
    margin: 0;
    color: rgba(255,255,255,0.92);
    font-size: 1.2rem;
  }

  .pill {
    border-radius: 999px;
    padding: 6px 10px;
    font-weight: 800;
    font-size: .75rem;
    letter-spacing: .12em;
    color: rgba(212,175,55,0.95);
    border: 1px solid rgba(212,175,55,0.22);
    background: rgba(212,175,55,0.14);
    text-transform: uppercase;
  }

  .range-desc {
    margin: .9rem 0 1.2rem;
    color: rgba(255,255,255,0.68);
    line-height: 1.7;
    text-shadow: 1px 1px 2px #000;
  }

  .range-price {
    display: flex;
    align-items: baseline;
    gap: 8px;
    margin-bottom: 1.2rem;
  }

  .from { color: rgba(255,255,255,0.55); font-size: .9rem; }
  .amount { color: #D4AF37; font-size: 2rem; font-weight: 900; }
  .per { color: rgba(255,255,255,0.55); font-size: .9rem; }

  .packs {
    margin-top: 3rem;
    border-radius: 18px;
    border: 1px solid rgba(212,175,55,0.16);
    background: rgba(0,0,0,0.55);
    backdrop-filter: blur(10px);
    box-shadow: 0 0 18px rgba(0,0,0,.45);
    padding: 22px;
  }

  .packs-title {
    margin: 0;
    color: rgba(255,255,255,0.92);
    font-size: 1.3rem;
  }

  .packs-sub {
    margin: .6rem 0 1.3rem;
    color: rgba(255,255,255,0.68);
    line-height: 1.7;
    text-shadow: 1px 1px 2px #000;
  }

  .pack-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
  }

  .pack {
    border-radius: 14px;
    border: 1px solid rgba(212,175,55,0.14);
    background: rgba(0,0,0,0.45);
    padding: 14px;
  }

  .pack-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .pack-days { color: rgba(255,255,255,0.9); font-weight: 800; }
  .pack-off { color: rgba(212,175,55,0.95); font-weight: 900; }

  .pack-body {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .pack-total {
    font-size: 1.4rem;
    font-weight: 900;
    color: #D4AF37;
  }

  .pack-note {
    color: rgba(255,255,255,0.5);
    font-size: .85rem;
  }

  .fineprint {
    margin-top: 1.2rem;
    color: rgba(255,255,255,0.45);
    font-size: .9rem;
    line-height: 1.7;
  }

  .promises {
    margin-top: 2.2rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
  }

  .promise {
    border-radius: 16px;
    border: 1px solid rgba(212,175,55,0.12);
    background: rgba(0,0,0,0.45);
    padding: 16px;
  }

  .promise h3 {
    margin: 0 0 .6rem;
    color: rgba(255,255,255,0.92);
    font-size: 1.05rem;
  }

  .promise p {
    margin: 0;
    color: rgba(255,255,255,0.65);
    line-height: 1.7;
    text-shadow: 1px 1px 2px #000;
  }

  .cta {
    margin-top: 2.2rem;
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
    border: 1px solid rgba(212,175,55,0.35);
  }

  .btn.primary:hover {
    box-shadow: 0 0 14px rgba(212,175,55,0.35);
    filter: brightness(1.03);
  }

  .btn.outline {
    border: 1px solid rgba(212,175,55,0.8);
    color: #D4AF37;
    background: transparent;
  }

  .btn.outline:hover {
    background: rgba(212,175,55,0.12);
  }

  @media (max-width: 1024px) {
    .ranges { grid-template-columns: 1fr; }
    .pack-grid { grid-template-columns: repeat(2, 1fr); }
    .promises { grid-template-columns: 1fr; }
  }

  @media (max-width: 520px) {
    .pack-grid { grid-template-columns: 1fr; }
  }
</style>
