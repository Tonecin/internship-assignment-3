<template>

  <div>
    <input type="data" required v-model="data">
  </div>

  <button @click="apply">Apply</button>
  <button @click="cancel">Cancel</button>
  <div v-show="errorMessage !== ''" class="error">
    {{ errorMessage }}
  </div>

</template>

<script>
import { ref } from 'vue'


export default {
  emits: ['changed'],
  props: {
    data: {
      type: String,
      required: true
    },
    isNumber: {
      type: Boolean,
      required: true
    }
  },
  setup(props, {emit}) {
    const errorMessage = ref("")
    let orig = props.data
    let data = ref(props.data)
      
    const cancel = () => {
      emit('changed', orig)
      data.value = orig
    }

    const apply = () => {
      if (data.value === '') {
        errorMessage.value = "Please input something"
      }
      else if (props.isNumber && isNaN(data.value)) {
        errorMessage.value = "Please input a number"
      }
      else {
        orig = data.value
        emit('changed', data.value)
      }
    }

    return {
      errorMessage,
      apply,
      cancel,
      data
    };
  }
}
</script>

<style scoped>

</style>