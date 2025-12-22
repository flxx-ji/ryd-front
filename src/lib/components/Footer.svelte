<script>
  import { Facebook, Instagram, Youtube, MapPin, Clock } from 'lucide-svelte';
</script>

<footer class="site-footer">
  <div class="footer-inner">

    <!-- Brand -->
    <div class="footer-brand">
      <div class="brand-name">Free Torque</div>
      <p class="brand-tagline">
        Location de motos premium & expériences motardes dans le Sud.
      </p>
    </div>

    <!-- Navigation -->
    <nav class="footer-nav" aria-label="Navigation pied de page">
      <a href="/">Home</a>
      <a href="/catalogue">Catalogue</a>
      <a href="/services">Services</a>
      <a href="/custom">Custom</a>
      <a href="/apropos">À propos</a>
    </nav>

    <!-- Infos -->
    <div class="footer-infos">
      <div class="info-item">
        <MapPin size="16" />
        <span>Toulon • Var • PACA</span>
      </div>
      <div class="info-item">
        <Clock size="16" />
        <span>Lun–Sam · 9h–19h</span>
      </div>
    </div>

    <!-- Socials -->
    <div class="socials">
      <a href="https://fr-fr.facebook.com/" aria-label="Facebook">
        <Facebook size="20" />
      </a>
      <a href="https://www.instagram.com/" aria-label="Instagram">
        <Instagram size="20" />
      </a>
      <a href="https://www.youtube.com/" aria-label="YouTube">
        <Youtube size="20" />
      </a>
    </div>

  </div>

  <!-- Bottom -->
  <div class="footer-bottom">
    © 2025 · Free Torque — Tous droits réservés
  </div>
</footer>

<style>
  .site-footer {
    background: rgba(0,0,0,0.9);
    backdrop-filter: blur(8px);
    border-top: 1px solid rgba(212,175,55,0.15);
    color: rgba(255,255,255,0.75);
  }

  .footer-inner {
    max-width: 1180px;
    margin: 0 auto;
    padding: 3rem 1.5rem 2rem;
    display: grid;
    grid-template-columns: 1.2fr 1fr 1fr 1fr;
    gap: 2rem;
  }

  /* Brand */
  .footer-brand .brand-name {
    font-weight: 900;
    letter-spacing: .08em;
    color: #D4AF37;
    font-size: 1.1rem;
    margin-bottom: .6rem;
  }

  .brand-tagline {
    font-size: .95rem;
    line-height: 1.6;
    color: rgba(255,255,255,0.6);
    max-width: 260px;
  }

  /* Navigation */
  .footer-nav {
    display: flex;
    flex-direction: column;
    gap: .6rem;
  }

  .footer-nav a {
    color: rgba(255,255,255,0.65);
    text-decoration: none;
    font-weight: 700;
    font-size: .9rem;
    transition: color .2s ease;
  }

  .footer-nav a:hover {
    color: #D4AF37;
  }

  /* Infos */
  .footer-infos {
    display: flex;
    flex-direction: column;
    gap: .7rem;
    font-size: .9rem;
  }

  .info-item {
    display: flex;
    align-items: center;
    gap: .5rem;
    color: rgba(255,255,255,0.65);
  }

  /* Socials */
  .socials {
    display: flex;
    gap: 14px;
    align-items: flex-start;
  }

  .socials a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 10px;
    border: 1px solid rgba(212,175,55,0.3);
    color: #D4AF37;
    transition: all .25s ease;
  }

  .socials a:hover {
    background: rgba(212,175,55,0.15);
    transform: translateY(-2px);
  }

  /* Bottom */
  .footer-bottom {
    border-top: 1px solid rgba(212,175,55,0.12);
    text-align: center;
    padding: 1rem;
    font-size: .85rem;
    color: rgba(255,255,255,0.45);
  }

  /* Responsive */
  @media (max-width: 900px) {
    .footer-inner {
      grid-template-columns: 1fr;
      text-align: center;
    }

    .footer-nav,
    .footer-infos {
      align-items: center;
    }

    .brand-tagline {
      margin: 0 auto;
    }

    .socials {
      justify-content: center;
    }
  }
</style>
