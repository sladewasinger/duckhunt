<script setup>
import { Engine } from "@/js/Engine.js";

const engine = new Engine();
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
  width: 800px;
  height: 600px;
  border: 1px solid #000;
}
</style>
