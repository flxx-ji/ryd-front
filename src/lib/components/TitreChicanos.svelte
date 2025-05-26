<script>
  export let text = "";
  export let size = "5rem";
  export let strokeSize = "2px";
</script>

<div class="titre-wrapper">
  <h1
    class="titre-stroke"
    style="font-size: {size}; -webkit-text-stroke: {strokeSize} #000;"
  >
    {text}
  </h1>
  <h1
    class="titre-fill"
    style="font-size: {size};"
  >
    {text}
  </h1>
</div>
