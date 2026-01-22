<script>
  // aucun script nécessaire ici
</script>

<div class="login-layout">
  <slot />
</div>

<style>
.login-layout {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(
    circle at top,
    #1a1a1a 0%,
    #000 70%
  );
}
</style>
