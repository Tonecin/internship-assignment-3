<template>
    <div v-show="!deleted">
        <div v-show="!showForm">
            {{ title }}
            <button @click="show">Remove</button>
        </div>
        <div v-show="showForm">
            Remove {{ title }}?
            <button @click="deleteFilm">Yes</button>
            <button @click="cancel">No</button>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
    emits: ['delete'],
    props: {
        title: {
            type: String,
            required: true
        }
    },
    setup(props, { emit }) {

        const showForm = ref(false)
        const deleted = ref(false)

        const show = () => {
            showForm.value = true
        }

        const deleteFilm = () => {
            deleted.value = true
            emit('delete', props.title)
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