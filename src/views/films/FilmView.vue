<template>
    <div v-if="film">
      <div v-show="showTitle">
        {{ film.title }}
        <button @click="switchTitle">Edit</button>
      </div>
      <div v-show="!showTitle">
        <Edit :data="film.title" :isNumber="false" @changed="editTitle"/>
      </div>
      <div v-show="showYear">
        Year: {{ film.year }}
        <button @click="switchYear">Edit</button>
      </div>
      <div v-show="!showYear">
        <Edit :data="film.year.toString()" :isNumber="true" @changed="editYear"/>
      </div>
      <p></p>
      Actors:
      <ActorTwo v-for="actor in film.actors" :name="actor" @delete="deleteActor"/>
      <div>
        <button @click="switchAssign">Assign Actor</button>
        <Select :choices="allActorNames" @chosen="assignActor" @cancel="cancelAssign" v-show="showAssign"/>
      </div>
    </div>
  </template>
  
  <script>
  import Edit from '@/components/Edit.vue';
  import ActorTwo from '@/components/ActorTwo.vue';
  import Select from '@/components/Select.vue';
  
  export default {
    components: {
      Edit,
      ActorTwo,
      Select
    },
    data() {
      return {
        id: null,
        film: null,
        showTitle: true,
        showYear: true,
        showAssign: false,
        allActors: null
      }
    },
    computed: {
    allActorNames() {
      if (this.film && this.allActors) {
        let res = []
        for (let actor of this.allActors) {
          if (!this.film.actors.includes(actor.name)) {
            res.push(actor.name)
          }
        }
        return res
      }
      else {
        return []
      }
    }
  },
    methods: {
      switchTitle() {
        this.showTitle = !this.showTitle
      },
      editTitle(newTitle) {
        this.film.title = newTitle
        this.switchTitle()
      },
      switchYear() {
        this.showYear = !this.showYear
      },
      editYear(newYear) {
        this.film.year = Number(newYear)
        this.switchYear()
      },
      deleteActor(actor) {
        this.film.actors.splice(this.film.actors.indexOf(actor), 1)
      },
      switchAssign() {
        this.showAssign = !this.showAssign
      },
      assignActor(actor) {
        this.film.actors.push(actor)
        this.switchAssign()
      },
      cancelAssign(actor) {
        this.switchAssign()
      },
    },
    mounted() {
        this.id = this.$route.params.id
        fetch('http://localhost:3000/films/' + this.id)
            .then(res => res.json())
            .then(data => this.film = data)
            .catch(err => console.log(err.message))
        fetch('http://localhost:3000/actors')
          .then(res => res.json())
          .then(data => this.allActors = data)
          .catch(err => console.log(err.message))
    }
  }
  </script>