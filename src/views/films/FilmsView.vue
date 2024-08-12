<template>
  <div>
    <AddFilm @added="addFilm"/>
  </div>
  <div v-for="film in films" :key="film.id">
    <Film :title="film.title" :year="film.year"/>
  </div>
  
  
</template>

<script>
import AddFilm from '@/components/AddFilm.vue';
import Film from '@/components/Film.vue';

export default {
  components: {
    AddFilm,
    Film
  },
  data() {
    return {
      films: []
    }
  },
  mounted() {
    fetch('http://localhost:3000/films')
      .then(res => res.json())
      .then(data => this.films = data)
      .catch(err  => console.log(err.message))
  },
  methods: {
    addFilm(film) {
      film.id = this.films.length + 1
      this.films.push(film)
    }
  }
}
</script>
