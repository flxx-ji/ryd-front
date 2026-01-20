<script>
  export let moto;
  let isHovered = false;

  const FALLBACK_IMG =
  "https://res.cloudinary.com/dlafo7ne1/image/upload/f_auto,q_auto/fallback_moto";


  // Image finale (Cloudinary ou fallback)
 $: imageURL =
  typeof moto?.image === "string" &&
  moto.image.startsWith("http")
    ? moto.image
    : FALLBACK_IMG;


  const price = moto?.tarifs?.unJour ?? "—";
  const id = moto?._id ?? "";
</script>



<article
  class="card"
  on:mouseenter={() => (isHovered = true)}
  on:mouseleave={() => (isHovered = false)}
>
  <!-- IMAGE (REMPLACE LE BACKGROUND) -->
  <img
    class="bg-image"
    src={imageURL}
    alt={`Moto ${moto?.marque ?? ""} ${moto?.modele ?? ""}`}
    loading="lazy"
    decoding="async"
  />

  <div class="shade"></div>

  <div class="content">
    <div class="top">
      <h3 class="name">{moto.modele}</h3>
      <p class="meta">{moto.marque} • {moto.modele}</p>
      <p class="meta">{moto.couleur} • {moto.annee}</p>
    </div>

    <div class="bottom">
      <p class="price">{price}€ <span>/ jour</span></p>

      <div class="actions" class:show={isHovered}>
        {#if id}
          <a class="btn ghost" href={`/moto/${id}`}>Voir plus</a>
          <a class="btn gold" href={`/reservation/${id}`}>Réserver</a>
        {/if}
      </div>
    </div>
  </div>
</article>




<style>

  .bg-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

  .card {
    position: relative;
    width: 100%;
    max-width: 360px;
    height: 240px;
    border-radius: 18px;
    overflow: hidden;
    transform: translateZ(0);
    border: 1px solid rgba(212,175,55,0.18);
    box-shadow: 0 20px 50px rgba(0,0,0,.45);
    transition: transform .25s ease, box-shadow .25s ease;
  }

  .card:hover {
    transform: scale(1.03);
    box-shadow: 0 28px 70px rgba(0,0,0,.55);
  }

  .shade {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(0,0,0,.25) 0%,
      rgba(0,0,0,.65) 55%,
      rgba(0,0,0,.85) 100%
    );
  }

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
    color: rgba(255,255,255,.92);
    font-size: 1.15rem;
    font-weight: 900;
    text-shadow: 1px 1px 2px #000;
  }

  .meta {
    margin: 6px 0 0;
    color: rgba(255,255,255,.72);
    font-size: .9rem;
    text-shadow: 1px 1px 2px #000;
  }

  .price {
    margin: 0;
    color: #D4AF37;
    font-weight: 900;
    font-size: 1.15rem;
    text-shadow: 1px 1px 2px #000;
  }

  .price span {
    color: rgba(255,255,255,.65);
    font-weight: 600;
    font-size: .9rem;
  }

  .actions {
    margin-top: 12px;
    display: flex;
    gap: 10px;
    opacity: 0;
    transform: translateY(8px);
    transition: all .2s ease;
    pointer-events: none;
  }

  .actions.show {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px 12px;
    border-radius: 10px;
    text-decoration: none;
    font-weight: 900;
    letter-spacing: .06em;
    text-transform: uppercase;
    font-size: .8rem;
    border: 1px solid rgba(212,175,55,0.25);
  }

  .btn.ghost {
    background: rgba(0,0,0,.45);
    color: rgba(255,255,255,.9);
  }

  .btn.ghost:hover {
    box-shadow: 0 0 12px rgba(212,175,55,.25);
    color: #D4AF37;
  }

  .btn.gold {
    background: #D4AF37;
    color: #000;
  }

  .btn.gold:hover {
    box-shadow: 0 0 16px rgba(212,175,55,.35);
    filter: brightness(1.03);
  }

  @media (max-width: 768px) {
  .actions {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }
}

</style>
