<template>
    <div v-show="!deleted">
        <div v-show="!showForm">
            <button @click="show">Delete</button>
            {{ title }} ({{ year }})
            
        </div>
        <div v-show="showForm">
            Delete {{ title }}?
            <button @click="deleteFilm">Yes</button>
            <button @click="cancel">No</button>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
    props: {
        title: {
            type: String,
            required: true
        },
        year: {
            type: Number,
            required: true
        }
    },
    setup(props) {

        const showForm = ref(false)
        const deleted = ref(false)

        const show = () => {
            showForm.value = true
        }

        const deleteFilm = () => {
            deleted.value = true
        }
        
        const cancel = () => {
            showForm.value = false
        }

        return {
            show,
            showForm,
            deleted,
            deleteFilm,
            cancel,
            title: props.title,
            year: props.year
        };
    }
}

</script>