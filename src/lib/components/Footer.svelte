<script>
  import { Facebook, Instagram, Youtube } from 'lucide-svelte';
</script>

<footer class="site-footer">
  <div class="footer-container">
    <div class="socials">
      <a href="https://fr-fr.facebook.com/" aria-label="Meta"><Facebook size="24" /></a>
      <a href="https://www.instagram.com/" aria-label="Instagram"><Instagram size="24" /></a>
      <a href="https://www.youtube.com/" aria-label="YouTube"><Youtube size="24" /></a>
    </div>
    <div class="copyright">
      © 2025 - Ride Your Dream. Tous droits réservés.
    </div>
  </div>
</footer>

<style>
  .site-footer {
    background: black;
    color: white;
    padding: 20px 10px;
    text-align: center;
  }

  .footer-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .socials {
    display: flex;
    gap: 20px;
  }

  .socials a {
    color: #04C9AF;
    transition: transform 0.3s;
  }

  .socials a:hover {
    transform: scale(1.1);
  }

  .copyright {
    font-size: 0.9rem;
  }
</style>
