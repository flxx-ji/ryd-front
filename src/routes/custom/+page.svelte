<script>
  import { onMount } from 'svelte';
  import TitreChicanos from '$lib/components/TitreChicanos.svelte';
  import { PUBLIC_API_URL2 } from '$env/static/public';

  const baseURL = PUBLIC_API_URL2;

  onMount(() => {
    // Sécurité SSR
    if (typeof document === 'undefined') return;

    document.body.style.backgroundImage = `url('${baseURL}/uploads/garageCustom.webp')`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundAttachment = 'fixed';
  });

  const offers = [
    {
      title: 'Stage 1 / 2 / 3',
      desc: 'Installation conforme + réglages pour gagner en couple, réactivité et agrément.'
    },
    {
      title: 'Optimisation moteur',
      desc: 'Réglages fins : couple, reprise, rendement. Objectif : du propre, pas du bricolage.'
    },
    {
      title: 'Banc de puissance',
      desc: 'Mesure avant/après pour valider ce qui a été fait. Factuel, pas de blabla.'
    },
    {
      title: 'Montage sur mesure',
      desc: 'Selle, guidon, phares, échappement… tu choisis, on monte proprement.'
    },
    {
      title: 'Demande de puissance',
      desc: 'Étude du setup et config adaptée à ton usage (ville, touring, perf, etc.).'
    },
    {
      title: 'Contrat Poivre Noir',
      desc: 'Service premium : suivi + entretien + accompagnement sur la durée.'
    }
  ];
</script>

<TitreChicanos text="Custom" />

<section class="wrap">
  <header class="intro">
    <h2>Préparation & Customisation</h2>
    <p class="lead">
      Chaque moto est unique, et chaque rider mérite une machine à son image.
      Ici, on fait du sur-mesure : propre, efficace, assumé.
    </p>
  </header>

  <div class="grid">
    {#each offers as o}
      <article class="card">
        <h3>{o.title}</h3>
        <p>{o.desc}</p>
      </article>
    {/each}
  </div>

  <div class="cta">
    <p class="cta-text">Tarifs sur demande — chaque projet est unique, le prix aussi.</p>
    <a class="cta-btn" href="/contact">Demander un devis</a>
  </div>
</section>

<style>
  .wrap {
    width: min(1100px, 100%);
    margin: 0 auto;
    padding: 0 1rem 4rem;
  }

  .intro {
    max-width: 950px;
    margin: 1.2rem auto 2.2rem;
    padding: 2rem;
    backdrop-filter: blur(10px);
    background: rgba(0, 0, 0, 0.6);
    border-radius: 16px;
    border: 1px solid rgba(212,175,55,0.16);
    box-shadow: 0 0 25px rgba(0,0,0,0.5);
    text-align: center;
    color: rgba(255,255,255,0.88);
    text-shadow: 1px 1px 2px #000;
  }

  .intro h2 {
    margin: 0 0 .6rem;
    color: #D4AF37;
    font-size: clamp(1.6rem, 3vw, 2.1rem);
    letter-spacing: .02em;
  }

  .lead {
    margin: 0;
    line-height: 1.65;
    color: rgba(255,255,255,0.7);
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 14px;
  }

  .card {
    padding: 18px 16px;
    border-radius: 16px;
    border: 1px solid rgba(212,175,55,0.14);
    background: rgba(0,0,0,0.52);
    backdrop-filter: blur(10px);
    box-shadow: 0 0 18px rgba(0,0,0,.45);
    color: rgba(255,255,255,0.82);
    text-shadow: 1px 1px 2px #000;
    transition: transform .2s ease, box-shadow .2s ease;
  }

  .card:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 24px rgba(0,0,0,.55);
  }

  .card h3 {
    margin: 0 0 .6rem;
    color: #FFD700;
    font-size: 1.1rem;
    letter-spacing: .02em;
  }

  .card p {
    margin: 0;
    line-height: 1.6;
    color: rgba(255,255,255,0.7);
    font-size: .98rem;
  }

  .cta {
    margin: 2rem auto 0;
    max-width: 950px;
    padding: 1.4rem 1.2rem;
    border-radius: 16px;
    border: 1px solid rgba(212,175,55,0.16);
    background: rgba(0,0,0,0.58);
    backdrop-filter: blur(10px);
    text-align: center;
    box-shadow: 0 0 20px rgba(0,0,0,.45);
  }

  .cta-text {
    margin: 0 0 12px;
    color: rgba(255,255,255,0.65);
    text-shadow: 1px 1px 2px #000;
  }

  .cta-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 12px 18px;
    border-radius: 10px;
    background: #D4AF37;
    color: #000;
    text-decoration: none;
    font-weight: 900;
    letter-spacing: .08em;
    text-transform: uppercase;
    font-size: .9rem;
    border: 1px solid rgba(212,175,55,0.35);
  }

  .cta-btn:hover {
    box-shadow: 0 0 14px rgba(212,175,55,0.35);
    filter: brightness(1.03);
  }

  @media (max-width: 980px) {
    .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }

  @media (max-width: 560px) {
    .grid { grid-template-columns: 1fr; }
  }
</style>
