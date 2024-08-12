<template>
    <div v-show="!deleted">
        <div v-show="!showForm">
            {{ name }}
            <button @click="show">Remove</button>
        </div>
        <div v-show="showForm">
            Remove "{{ name }}"?
            <button @click="deleteActor">Yes</button>
            <button @click="cancel">No</button>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
    emits: ['delete'],
    props: {
        name: {
            type: String,
            required: true
        }
    },
    setup(props, {emit}) {

        const showForm = ref(false)
        const deleted = ref(false)

        const show = () => {
            showForm.value = true
        }

        const deleteActor= () => {
            deleted.value = true
            emit('delete', props.name)
        }
        
        const cancel = () => {
            showForm.value = false
        }

        return {
            show,
            showForm,
            deleted,
            deleteActor,
            cancel,
            name: props.name
        };
    }
}

</script>