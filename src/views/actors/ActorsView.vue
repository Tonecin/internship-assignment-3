<template>
    <div>
      <AddActor @added="addActor"/>
    </div>
    <div v-for="actor in actors" :key="actor.id">
      <Actor :name="actor.name"/>
    </div>
    
    
  </template>
  
  <script>
  import AddActor from '@/components/AddActor.vue';
  import Actor from '@/components/Actor.vue';
  
  export default {
    components: {
      AddActor,
      Actor
    },
    data() {
      return {
        actors: []
      }
    },
    mounted() {
      fetch('http://localhost:3000/actors')
        .then(res => res.json())
        .then(data => this.actors = data)
        .catch(err  => console.log(err.message))
    },
    methods: {
      addActor(name) {
        this.actors.push({
            name: name,
            films: [],
            id: this.actors.length + 1
        })
      }
    }
  }
  </script>