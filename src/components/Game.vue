<script>
import { Engine } from "@/js/Engine.js";

export default {
  async mounted() {
    console.log("mounted");
    const engine = new Engine();
    await engine.init();
  },
};
</script>

<template>
  <div class="container">
    <h2>Game Component</h2>
    <canvas id="gameCanvas" width="800" height="600"></canvas>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin-top: -50px;
}

#gameCanvas {
  image-rendering: -moz-crisp-edges;
  image-rendering: -webkit-crisp-edges;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
  width: 800px;
  height: 600px;
  border: 1px solid #000;
  user-select: none;
}
</style>
