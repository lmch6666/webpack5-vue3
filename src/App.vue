<template>
  <div class="app">
    <h1 class="hhh">Hello World</h1>
    <p @click="aaa">This is a simple example of a Vue.js component.</p>
    <span @click="change">{{ x + 1000000 }}</span>
    <span @click="change">{{ x }}</span>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        x:12321
      }
    },
    methods:{
      change(){
        this.x += 1
      },
      aaa(){
        console.log('我触发了这个');
      }
    }
  }
</script>