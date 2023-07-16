<template>
  <div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script lang="ts">
import {ref, onMounted} from 'vue';

export default {
  setup() {
    const canvas = ref<HTMLCanvasElement | undefined>()

    onMounted(() => {
      if (canvas.value) {
        drawCanvas();
      }
    })

    function drawCanvas() {
      const context = canvas.value!.getContext('2d')!;
      context.translate(canvas.value!.width / 2, canvas.value!.height);
      context.scale(0.2, -0.2);
      draw([0, 0], 30, 80, 90 + (Math.random() - 0.5) * 25);
    }

    function draw(v0: [number, number], thick: number, length: number, dir: number) {
      if (thick < 20 && Math.random() < 0.4) {
        if (Math.random() < 0.02) {
          // 在树枝末端绘制花朵
          drawFlower(v0);
        }
        return;
      }
      if (thick < 1) {
        // 在树枝末端绘制花朵
        drawFlower(v0);
        return;
      }
      const context = canvas.value!.getContext('2d')!;
      context.beginPath();
      context.moveTo(...v0);
      const v1: [number, number] = [
        v0[0] + length * Math.cos((Math.PI * dir) / 180),
        v0[1] + length * Math.sin((Math.PI * dir) / 180),
      ];
      context.lineWidth = thick;
      context.strokeStyle = '#111';
      context.lineCap = 'round';
      context.lineTo(...v1);
      context.stroke();
      draw(v1, thick * 0.8, length * 0.9, dir + 35 * Math.random());
      draw(v1, thick * 0.8, length * 0.9, dir - 35 * Math.random());
    }

    function drawFlower(position: [number, number]) {
      const context = canvas.value!.getContext('2d')!;
      context.beginPath();
      context.arc(position[0], position[1], 5, 0, 2 * Math.PI);
      context.fillStyle = 'red';
      context.fill();
      context.closePath();
    }

    return {
      canvas,
    };
  },
};
</script>
