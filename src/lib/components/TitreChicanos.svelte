<script>
  export let text = "";
  export let size = "4.5rem";       // Par défaut comme sur home
  export let strokeSize = "2px";    // Taille du contour
</script>

<style>
  .titre-wrapper {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 3rem auto 2rem auto;
    width: fit-content;
    max-width: 90vw;
    text-align: center;
  }

  .titre-stroke {
    position: absolute;
    top: 0;
    left: 0;
    font-family: 'Chicanos', cursive;
    color: transparent;
    -webkit-text-stroke: var(--stroke-size, 2px) #000;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.6);
    z-index: 1;
  }

  .titre-fill {
    font-family: 'Chicanos', cursive;
    color: #D4AF37;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.6);
    z-index: 2;
    position: relative;
  }
</style>

<div class="titre-wrapper">
  <h1 class="titre-stroke" style="font-size: {size}; --stroke-size: {strokeSize}">{text}</h1>
  <h1 class="titre-fill" style="font-size: {size}">{text}</h1>
</div>
