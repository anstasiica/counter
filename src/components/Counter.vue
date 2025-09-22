<script>
export default {
  name: 'Counter',
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
      this.$emit('incremented', this.count)
    },
    decrement() {
      this.count--
      this.$emit('decremented', this.count)
    },
    reset() {
      this.count = 0
      this.$emit('reset', this.count)
    }
  }
}
</script>

<template>
<div class="counter">
    <h2>Счетчик: {{ count }}</h2>
    <div class="counter-buttons">
        <button @click="decrement" class="btn btn-decrement">-</button>
        <button @click="reset" class="btn btn-reset">Сбросить</button>
        <button @click="increment" class="btn btn-increment">+</button>
    </div>
    <p class="counter-message" v-if="count > 10"> Счетчик превысил 10 🎉</p>
</div>
</template>

<style scoped>
.counter {
    text-align: center;
    padding: 10px;
}

.counter-buttons {
    margin: 5px 0;
    display: flex;
    justify-content: center;
    gap: 10px;
}

.btn {
    padding: 30px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.btn-increment {
    background-color: rgba(24, 196, 24, 0.511);
}

.btn-increment:hover {
    background-color: rgb(24, 196, 24);
}

.btn-decrement {
    background-color: rgba(224, 1, 1, 0.511);
}

.btn-decrement:hover {
    background-color: rgb(224, 1, 1);
}

.btn-reset {
    background-color: rgba(112, 210, 252, 0.511);
}

.btn-reset:hover {
    background-color: rgb(112, 210, 252);
}
</style>
