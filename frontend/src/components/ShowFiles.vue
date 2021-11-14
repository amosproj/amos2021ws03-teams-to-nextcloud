<template>
    <File/>
    <p> hallo </p>
</template>



<script>
import File from './File.vue'





export default {
    name: 'ShowFiles',
    components: {
        File,

    },
    data () {
        return {
            files: "hi"
        }
    },
}

</script>