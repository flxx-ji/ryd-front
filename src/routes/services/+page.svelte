<script>
  import { onMount } from 'svelte';
  import TitreChicanos from '$lib/components/TitreChicanos.svelte';
  import { PUBLIC_API_URL2 } from '$env/static/public';

  const baseURL = PUBLIC_API_URL2;

  onMount(() => {
    document.body.style.backgroundImage = `url('${baseURL}/uploads/services2.webp')`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundAttachment = 'fixed';
  });

  const services = [
    {
      title: 'Vidange moto',
      img: `${baseURL}/uploads/motorbike-407186_1280.webp`,
      alt: 'Vidange moto',
      desc: `Un moteur sain est un moteur entretenu.
Nous réalisons la vidange complète de votre moto avec des huiles haut de gamme adaptées à votre machine.
Sur place, sans rendez-vous ou sur réservation.`
    },
    {
      title: 'Changement de pneus',
      img: `${baseURL}/uploads/duc-van-2EeVtfFi4G8-unsplash.webp`,
      alt: 'Changement pneus',
      desc: `Que ce soit pour une Harley, une Vespa ou une Triumph, nous montons vos pneus avec soin et équilibre.
Pneus homologués route, adaptés à votre style de conduite.`
    }
  ];
</script>

<TitreChicanos text="Services" size="5rem" strokeSize="2px" />

<section class="wrap">
  <header class="intro">
    <h2>Nos Services</h2>
    <p class="slogan">Entretien, custom & expérience deux-roues</p>
  </header>

  <div class="grid">
    {#each services as s, i}
      <article class="service-card" class:reverse={i % 2 === 1}>
        <div class="media">
          <img src={s.img} alt={s.alt} />
        </div>

        <div class="text">
          <h3>{s.title}</h3>
          <p>{s.desc}</p>
        </div>
      </article>
    {/each}
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
    margin: 0 auto 3rem;
    padding: 2rem;
    backdrop-filter: blur(10px);
    background: rgba(0, 0, 0, 0.6);
    border-radius: 16px;
    border: 1px solid rgba(212,175,55,0.16);
    box-shadow: 0 0 25px rgba(0, 0, 0, 0.5);
    text-align: center;
  }

  .intro h2 {
    margin: 0 0 .6rem;
    color: #D4AF37;
  }

  .slogan {
    margin: 0;
    font-size: 1.15rem;
    color: #FFD700;
    text-shadow: 1px 1px 2px #000;
  }

  .grid {
    display: grid;
    gap: 18px;
  }

  .service-card {
    display: grid;
    grid-template-columns: 360px 1fr;
    gap: 18px;
    padding: 1.4rem;
    border-radius: 18px;
    backdrop-filter: blur(12px);
    background: rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(212,175,55,0.14);
    box-shadow: 0 0 18px rgba(0,0,0,.45);
    align-items: center;
  }

  .service-card.reverse {
    grid-template-columns: 1fr 360px;
  }

  .service-card.reverse .media {
    order: 2;
  }

  .media img {
    width: 100%;
    height: 230px;
    object-fit: cover;
    border-radius: 14px;
    box-shadow: 0 0 10px rgba(255, 215, 0, 0.18);
  }

  .text {
    color: rgba(255,255,255,0.85);
    text-shadow: 1px 1px 2px #000;
  }

  .text h3 {
    margin: 0 0 .6rem;
    color: #FFD700;
    font-size: 1.6rem;
  }

  .text p {
    margin: 0;
    line-height: 1.65;
    font-size: 1.05rem;
    white-space: pre-line;
  }

  @media (max-width: 900px) {
    .service-card,
    .service-card.reverse {
      grid-template-columns: 1fr;
    }
    .service-card.reverse .media {
      order: 0;
    }
    .media img {
      height: auto;
    }
  }
</style>
