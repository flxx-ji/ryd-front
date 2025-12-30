<script>
  import TitreChicanos from '$lib/components/TitreChicanos.svelte';
  import HowItWorks from '$lib/components/HowItWorks.svelte';
  
</script>



<!-- HERO -->
<section class="hero">
  <div class="hero-overlay"></div>

  <!-- ✅ Logo dans le flux, pas en absolute -->
  <div class="hero-logo">
    <TitreChicanos text="Free Torque" />
  </div>

  <div class="hero-inner">
    <p class="hero-eyebrow">Location premium • Toulon / Var</p>

    <p class="hero-tagline">Louez une moto de caractère. Vivez le Sud autrement.</p>
    <p class="hero-promise">Harley-Davidson • Indian • Triumph • Ducati • Vespa</p>

    <div class="hero-cta">
      <a class="btn primary" href="/catalogue">Voir les motos</a>
      <a class="btn outline" href="/tarifs">Nos tarifs</a>
    </div>

    <p class="hero-micro">
      Réservation simple • Assistance • Options casque/gants • Départ Toulon
    </p>

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

    <div class="hero-meta">
      <span>📍 Toulon • Var • PACA</span>
      <span>🕘 Lun–Sam 9h–19h</span>
    </div>
  </div>
</section>

<HowItWorks />

 

<style>
  .hero {
  position: relative;
  min-height: calc(100vh - var(--header-height));
  display: flex;
  flex-direction: column;
  align-items: center;
  /* width: 100%; */
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  padding: 1.5rem 0 3.5rem;

   
  justify-content: flex-start;   
 
  padding-right: 1rem;
   
  overflow: hidden;
  gap: 1.25rem;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  z-index: 0;
  background:
    radial-gradient(900px 500px at 50% 35%, rgba(212,175,55,0.12), transparent 60%),
    linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.65));
    pointer-events: none;
}
.hero-logo{
  position: relative;       
  z-index: 2;
  margin-top: 0.5rem;       
  pointer-events: none;    
}
 



.hero-inner {
  position: relative;
  z-index: 2;
  width: min(980px, calc(100% - 2rem));
  max-width: 980px;
  text-align: center;
  margin-inline: auto;
  margin-top: 0.5rem;
  left: 0.4rem;
  padding: 2.4rem 2rem;
  border-radius: 18px;
  backdrop-filter: blur(14px);
  background: rgba(0,0,0,0.52);
  box-shadow: 0 0 35px rgba(0,0,0,0.6);
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
    .hero-logo {
      top: 4rem;
    }
  }
   

</style>
