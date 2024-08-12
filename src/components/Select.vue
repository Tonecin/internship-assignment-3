<template>
  <div class="dropdown-select">
    <select v-model="selectedChoice">
      <option v-for="choice in choices" :key="choice">
        {{ choice }}
      </option>
    </select>
    <button @click="apply">Apply</button>
    <button @click="cancel">Cancel</button>
    <div v-show="errorMessage !== ''" class="error">
        {{ errorMessage }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'DropdownSelect',
  props: {
    choices: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selectedChoice: '',
      errorMessage: ''
    };
  },
  methods: {
    apply() {
        if (this.selectedChoice === '') {
            this.errorMessage = "Please make a choice!"
        }
        else {
            this.$emit('chosen', this.selectedChoice)
            this.selectedChoice = ''
        }
    },
    cancel() {
        this.selectedChoice = ''
        this.errorMessage = ''
        this.$emit('cancel', this.selectedChoice)
    }
  }
};
</script>