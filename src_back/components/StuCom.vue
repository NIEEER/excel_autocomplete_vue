<template>
  <div>
    <h2>
      <input type="button" value="点击" @click="aaa++"/>
      <span v-big="aaa"></span>
      <input v-fbind:vakue="aaa">
    </h2>
  </div>
</template>

<script>

export default {
  name: "StuCom",
  data() {
    return {
      aaa: 111
    }
  },
  methods:{
    getUID(){
      return this.$utils.getUUID()
    }
  },
  directives: {
    big(element, binding) {
      element.innerText = binding.value * 10
      console.log(binding.value)
    },
    fbind:{
      bind(element, binding){
        element.value = binding.value;
      },
      inserted(element){
        element.focus();
      },
      update(element, binding){
        element.value = binding.value
        if (element.value > 112) {
          element.style.backgroundColor = '#ff0000'
          console.log(element.style)
        }
      }
    }
  }
}
</script>

<style scoped>

</style>