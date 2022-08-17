<template>
  <div class="modal">
    <div class="modal__substrate"></div>
    <div class="modal__window">
      <header class="header">
        <slot name="header"></slot>
      </header>
      <main class="main">
        <slot></slot>
      </main>
      <footer class="footer">
        <slot name="footer"></slot>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal'
}
</script>

<style scoped>
  .modal {
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .modal__substrate {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0, 0.5);
    z-index: 1;
  }

  .modal__window {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    max-width: 800px;
    margin: 30px auto;
    padding: 20px;
    border-radius: 5px;
    background: #fff;
    z-index: 2;
  }

  .header {
    margin-bottom: 10px;
    font-size: 18px;
  }

  .footer {
    display: flex;
    margin-top: auto;
  }
</style>
