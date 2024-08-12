<template>
  <div v-if="actor">
    <div v-show="showName">
      {{ actor.name }}
      <button @click="switchName">Edit</button>
    </div>
    <div v-show="!showName">
      <Edit :data="actor.name" :isNumber="false" @changed="editName"/>
    </div>
    <div v-show="showYob">
      Born: {{ actor.yearOfBirth }}
      <button @click="switchYob">Edit</button>
    </div>
    <div v-show="!showYob">
      <Edit :data="actor.yearOfBirth.toString()" :isNumber="true" @changed="editYob"/>
    </div>
    Films:
    <FilmTwo v-for="film in actor.films" :title="film" @delete="deleteFilm"/>
    <div>
      <button @click="switchAssign">Assign Film</button>
      <Select :choices="allFilmTitles" @chosen="assignFilm" @cancel="cancelAssign" v-show="showAssign"/>
    </div>
  </div>
</template>

<script>
import Edit from '@/components/Edit.vue';
import FilmTwo from '@/components/FilmTwo.vue';
import Select from '@/components/Select.vue';

export default {
  components: {
    Edit,
    FilmTwo,
    Select
  },
  data() {
    return {
      id: null,
      actor: null,
      showName: true,
      showYob: true,
      showAssign: false,
      allFilms: null
    }
  },
  computed: {
    allFilmTitles() {
      if (this.actor && this.allFilms) {
        let res = []
        for (let film of this.allFilms) {
          if (!this.actor.films.includes(film.title)) {
            res.push(film.title)
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
    switchName() {
      this.showName = !this.showName
    },
    editName(newName) {
      this.actor.name = newName
      this.switchName()
    },
    switchYob() {
      this.showYob = !this.showYob
    },
    editYob(newYob) {
      this.actor.yearOfBirth = Number(newYob)
      this.switchYob()
    },
    switchAssign() {
      this.showAssign = !this.showAssign
    },
    assignFilm(film) {
      this.actor.films.push(film)
      this.switchAssign()
    },
    cancelAssign(film) {
      this.switchAssign()
    },
    deleteFilm(film) {
      this.actor.films.splice(this.actor.films.indexOf(film), 1)
    }
  },
  mounted() {
      this.id = this.$route.params.id
      fetch('http://localhost:3000/actors/' + this.id)
          .then(res => res.json())
          .then(data => this.actor = data)
          .catch(err => console.log(err.message))

      fetch('http://localhost:3000/films')
        .then(res => res.json())
        .then(data => this.allFilms = data)
        .catch(err => console.log(err.message))
  }
}
</script>