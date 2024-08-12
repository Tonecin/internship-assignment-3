<template>
    <div v-show="!deleted">
        <div v-show="!showForm">
            <button @click="show">Delete</button>
            {{ name }}
            
        </div>
        <div v-show="showForm">
            Delete {{ name }}?
            <button @click="deleteActor">Apply</button>
            <button @click="cancel">Cancel</button>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
    props: {
        name: {
            type: String,
            required: true
        }
    },
    setup(props) {

        const showForm = ref(false)
        const deleted = ref(false)

        const show = () => {
            showForm.value = true
        }

        const deleteActor= () => {
            deleted.value = true
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