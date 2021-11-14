<template>
<ul>
    <li v-for="(file,index) in files" :key="index in files">
        <File :file="file"/>        
    </li>

</ul>
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
            return await client.getDirectoryContents("/")


        }
    }
}

</script>