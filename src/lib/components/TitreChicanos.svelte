<!-- src/lib/components/TitreChicanos.svelte -->
<script>
  export let text = "Titre par défaut";
</script>

<div class="titre-wrapper">
  <h1 class="titre-stroke">{text}</h1>
  <h1 class="titre-fill">{text}</h1>
</div>
