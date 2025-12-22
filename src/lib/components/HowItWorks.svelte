<script>
  export let title = "Louer en 4 étapes";
  export let subtitle = "Comment ça marche";

  const steps = [
    {
      number: "01",
      title: "Choisissez votre modèle",
      desc: "Parcourez le catalogue et sélectionnez la moto qui colle à votre style (cruiser, touring, scooter…)."
    },
    {
      number: "02",
      title: "Validation rapide",
      desc: "Indiquez vos dates + lieu (Toulon/Var/PACA). On vous confirme la disponibilité sous 24h."
    },
    {
      number: "03",
      title: "Vérifications & caution",
      desc: "Permis + pièce d’identité. Une caution (pré-autorisation CB) peut être demandée selon le modèle. Pré-autorisation = aucun débit, juste un blocage temporaire."
    },
    {
      number: "04",
      title: "Retrait ou livraison",
      desc: "Retrait sur place avec briefing rapide, ou livraison (selon zone). Options possibles : casque, pluie, GoPro, GPS…"
    }
  ];
</script>

<section class="howitworks">
  <div class="container">
    <header class="section-head">
      <span class="kicker">{subtitle}</span>
      <h2 class="title">{title}</h2>
      <div class="divider"></div>
    </header>

    <!-- Progress line (desktop) -->
    <div class="progress" aria-hidden="true">
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
    </div>

    <div class="grid">
      {#each steps as step}
        <article class="card">
          <span class="ghost">{step.number}</span>

          <div class="top">
            <span class="badge">{step.number}</span>
            <h3>{step.title}</h3>
          </div>

          <p>{step.desc}</p>
        </article>
      {/each}
    </div>

    <p class="note">
      *Équipements et options selon disponibilité et modèle. Caution et conditions variables selon cylindrée.
    </p>
  </div>
</section>

<style>
  .howitworks {
    width: 100%;
    padding: 5.5rem 1rem;
  }

  .container {
    width: min(1100px, 100%);
    margin: 0 auto;
  }

  .section-head {
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
    font-size: clamp(2rem, 4vw, 3rem);
    color: rgba(255,255,255,0.92);
    text-shadow: 1px 1px 2px #000;
  }

  .divider {
    width: 92px;
    height: 1px;
    margin: 1.2rem auto 0;
    background: linear-gradient(90deg, transparent, rgba(212,175,55,.9), transparent);
  }

  /* Progress line + dots */
  .progress {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    align-items: center;
    position: relative;
    margin: 2.2rem 0 1.2rem;
  }

  .progress::before {
    content: "";
    position: absolute;
    left: 7%;
    right: 7%;
    top: 50%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(212,175,55,.35), transparent);
    transform: translateY(-50%);
  }

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 999px;
    margin: 0 auto;
    background: rgba(212,175,55,0.5);
    box-shadow: 0 0 14px rgba(212,175,55,0.18);
    border: 1px solid rgba(212,175,55,0.35);
    position: relative;
    z-index: 2;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }

  .card {
    position: relative;
    padding: 22px 18px 18px;
    border-radius: 16px;
    border: 1px solid rgba(212,175,55,0.16);
    background: rgba(0,0,0,0.55);
    backdrop-filter: blur(10px);
    box-shadow: 0 0 18px rgba(0,0,0,.45);
    overflow: hidden;
    min-height: 230px;
    transition: transform .25s ease, border-color .25s ease, box-shadow .25s ease;
  }

  .card:hover {
    transform: translateY(-6px);
    border-color: rgba(212,175,55,0.35);
    box-shadow:
      0 0 22px rgba(0,0,0,.55),
      0 0 16px rgba(212,175,55,0.12);
  }

  .ghost {
    position: absolute;
    top: -14px;
    right: 10px;
    font-size: 5rem;
    line-height: 1;
    font-weight: 800;
    color: rgba(212,175,55,0.07);
    user-select: none;
    pointer-events: none;
  }

  .top {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: .9rem;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 6px 10px;
    border-radius: 999px;
    background: rgba(212,175,55,0.14);
    border: 1px solid rgba(212,175,55,0.22);
    color: rgba(212,175,55,0.95);
    font-weight: 800;
    letter-spacing: .12em;
    font-size: .75rem;
  }

  .card h3 {
    margin: 0;
    font-size: 1.12rem;
    color: rgba(255,255,255,0.92);
  }

  .card p {
    margin: 0;
    color: rgba(255,255,255,0.7);
    line-height: 1.75;
    font-size: .95rem;
    text-shadow: 1px 1px 2px #000;
  }

  .note {
    margin-top: 1.6rem;
    text-align: center;
    color: rgba(255,255,255,0.45);
    font-size: .9rem;
  }

  /* Tablet */
  @media (max-width: 1024px) {
    .grid {
      grid-template-columns: repeat(2, 1fr);
    }
    .progress {
      display: none;
    }
  }

  /* Mobile */
  @media (max-width: 520px) {
    .grid {
      grid-template-columns: 1fr;
    }
    .card {
      min-height: unset;
    }
  }
</style>
