<script>
  /**
   * ============================
   * MotoCard.svelte
   * ============================
   * - Affiche une moto dans le catalogue
   * - Image dynamique Cloudinary
   * - Fallback sécurisé
   * - Overlay accessible
   * - Compatible SSR / CSR
   */

  export let moto;

  // État hover (desktop)
  let isHovered = false;

  /**
   * Image de secours (Cloudinary)
   * ⚠️ Choisir une image VISUELLEMENT différente
   * pour détecter facilement les fallbacks
   */
  const FALLBACK_IMG =
    "https://res.cloudinary.com/dlafo7ne1/image/upload/v1768322600/fordMustang69_xwuwd8.jpg";

  /**
   * ✅ RÉACTIVITÉ SVELTE
   * Le `$:` est CRUCIAL ici pour éviter
   * les problèmes SSR + cache
   */
  $: imageURL =
    typeof moto?.image === "string" && moto.image.length > 0
      ? moto.image
      : FALLBACK_IMG;

  // Sécurisation des données
  const price = moto?.tarifs?.unJour ?? "—";
  const id = moto?._id ?? "";
</script>

<!--
  ============================
  CARD MOTO
  ============================
  - role="group" pour accessibilité
  - aria-label descriptive
-->
<article
  class="card"
  role="group"
  aria-label={`Moto ${moto?.marque ?? ""} ${moto?.modele ?? ""}`}
  style={`background-image: url("${imageURL}")`}
  on:mouseenter={() => (isHovered = true)}
  on:mouseleave={() => (isHovered = false)}
>
  <!-- Overlay de contraste (lisibilité texte) -->
  <div class="shade" aria-hidden="true"></div>

  <div class="content">
    <!-- Haut de la card -->
    <div class="top">
      <h3 class="name">
        {moto?.modele ?? "Modèle inconnu"}
      </h3>

      <p class="meta">
        {moto?.marque ?? "—"} • {moto?.modele ?? "—"}
      </p>

      <p class="meta">
        {moto?.couleur ?? "—"} • {moto?.annee ?? "—"}
      </p>
    </div>

    <!-- Bas de la card -->
    <div class="bottom">
      <p class="price">
        {price}€ <span>/ jour</span>
      </p>

      <!--
        Actions :
        - visibles au hover (desktop)
        - toujours visibles sur mobile
        - accessibles clavier
      -->
      <div
        class="actions"
        class:show={isHovered}
        aria-hidden={!isHovered}
      >
        {#if id}
          <a
            class="btn ghost"
            href={`/moto/${id}`}
            aria-label={`Voir les détails de ${moto?.modele}`}
          >
            Voir plus
          </a>

          <a
            class="btn gold"
            href={`/reservation/${id}`}
            aria-label={`Réserver ${moto?.modele}`}
          >
            Réserver
          </a>
        {/if}
      </div>
    </div>
  </div>
</article>

<style>
  /**
   * ============================
   * STRUCTURE CARD
   * ============================
   */
  .card {
    position: relative;
    width: 100%;
    max-width: 360px;
    height: 240px;
    border-radius: 18px;
    overflow: hidden;

    /* Image dynamique */
    background-size: cover;
    background-position: center;

    transform: translateZ(0);
    border: 1px solid rgba(212, 175, 55, 0.18);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.45);

    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }

  .card:hover {
    transform: scale(1.03);
    box-shadow: 0 28px 70px rgba(0, 0, 0, 0.55);
  }

  /**
   * ============================
   * OVERLAY / CONTRASTE
   * ============================
   */
  .shade {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.25) 0%,
      rgba(0, 0, 0, 0.65) 55%,
      rgba(0, 0, 0, 0.85) 100%
    );
  }

  /**
   * ============================
   * CONTENU
   * ============================
   */
  .content {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 16px;
    z-index: 2;
  }

  .name {
    margin: 0;
    color: rgba(255, 255, 255, 0.92);
    font-size: 1.15rem;
    font-weight: 900;
    text-shadow: 1px 1px 2px #000;
  }

  .meta {
    margin: 6px 0 0;
    color: rgba(255, 255, 255, 0.72);
    font-size: 0.9rem;
    text-shadow: 1px 1px 2px #000;
  }

  .price {
    margin: 0;
    color: #d4af37;
    font-weight: 900;
    font-size: 1.15rem;
    text-shadow: 1px 1px 2px #000;
  }

  .price span {
    color: rgba(255, 255, 255, 0.65);
    font-weight: 600;
    font-size: 0.9rem;
  }

  /**
   * ============================
   * ACTIONS
   * ============================
   */
  .actions {
    margin-top: 12px;
    display: flex;
    gap: 10px;

    opacity: 0;
    transform: translateY(8px);
    transition: all 0.2s ease;

    pointer-events: none;
  }

  .actions.show {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }

  /**
   * ============================
   * BOUTONS
   * ============================
   */
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    padding: 10px 12px;
    border-radius: 10px;

    text-decoration: none;
    font-weight: 900;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    font-size: 0.8rem;

    border: 1px solid rgba(212, 175, 55, 0.25);
  }

  .btn:focus-visible {
    outline: 2px solid #d4af37;
    outline-offset: 2px;
  }

  .btn.ghost {
    background: rgba(0, 0, 0, 0.45);
    color: rgba(255, 255, 255, 0.9);
  }

  .btn.ghost:hover {
    box-shadow: 0 0 12px rgba(212, 175, 55, 0.25);
    color: #d4af37;
  }

  .btn.gold {
    background: #d4af37;
    color: #000;
  }

  .btn.gold:hover {
    box-shadow: 0 0 16px rgba(212, 175, 55, 0.35);
    filter: brightness(1.03);
  }

  /**
   * ============================
   * MOBILE
   * ============================
   */
  @media (max-width: 768px) {
    .actions {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }
  }
</style>
