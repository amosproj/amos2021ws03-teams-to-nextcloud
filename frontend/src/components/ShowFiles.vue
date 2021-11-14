<template>
    <File/>
    <p> {{files}} </p>
</template>



<script>
import File from './File.vue'
import { createClient } from "webdav";

const client = createClient("https://tms2nc.de/remote.php/webdav/", {
    username: "freefreeP@freefreep.onmicrosoft.com",
    password: ""
});





export default {
    name: 'ShowFiles',
    components: {
        File,

    },
    data () {
        return {
            files: null
        }
    },
    async created() {
        this.files = await this.fetchFiles()
    },
    methods: {
        async fetchFiles() {
            const data = await client.getDirectoryContents("/")
            console.log(data)
            return data

        }
    }
}

</script>