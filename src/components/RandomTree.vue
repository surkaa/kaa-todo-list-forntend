<template>
  <div>
    <canvas :width="width" :height="height" ref="canvas"></canvas>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    width: {
      type: Number,
      default: 180
    },
    height: {
      type: Number,
      default: 180
    },
    thickRatio: {
      type: Number,
      default: 0.8
    },
    lengthRatio: {
      type: Number,
      default: 0.9
    },
    liveRatio: {
      type: Number,
      default: 0.5
    },
    flowerOfEndRatio: {
      type: Number,
      default: 1
    },
    flowerOfMiddleRatio: {
      type: Number,
      default: 0.1
    },
    maxDirChildren: {
      type: Number,
      default: 30
    }
  },
  mounted() {
    this.drawCanvas();
  },
  methods: {
    drawCanvas() {
      const canvas = this.$refs.canvas as HTMLCanvasElement;
      const context = canvas.getContext('2d');
      if (!context) return;
      context.translate(canvas.width / 2, canvas.height);
      context.scale(0.2, -0.2);
      this.draw(0, 0, 30, 80, 90 + (Math.random() - 0.5) * 25, context);
    },
    draw(v0x: number, v0y: number, thick: number, length: number, dir: number, context: CanvasRenderingContext2D) {
      if (thick < 15 && Math.random() < (1 - this.liveRatio)) {
        if (Math.random() < this.flowerOfMiddleRatio) {
          // 在树枝末端绘制花朵
          this.drawFlower(v0x, v0y, context);
        }
        return;
      }
      if (thick < 1) {
        if (Math.random() < this.flowerOfEndRatio) {
          // 在树枝末端绘制花朵
          this.drawFlower(v0x, v0y, context);
        }
        return;
      }
      context.beginPath();
      context.moveTo(v0x, v0y);
      const v1x = v0x + length * Math.cos((Math.PI * dir) / 180);
      const v1y = v0y + length * Math.sin((Math.PI * dir) / 180);
      context.lineWidth = thick;
      context.strokeStyle = '#111';
      context.lineCap = 'round';
      context.lineTo(v1x, v1y);
      context.stroke();
      this.draw(v1x, v1y, thick * this.thickRatio, length * this.lengthRatio, dir + this.maxDirChildren * Math.random(), context);
      this.draw(v1x, v1y, thick * this.thickRatio, length * this.lengthRatio, dir - this.maxDirChildren * Math.random(), context);
    },
    drawFlower(x: number, y: number, context: CanvasRenderingContext2D) {
      context.beginPath();
      context.arc(x, y, 5, 0, 2 * Math.PI);
      context.fillStyle = 'red';
      context.fill();
      context.closePath();
    },
  },
});
</script>
