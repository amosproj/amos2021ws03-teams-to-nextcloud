<template>
<p>
    
    {{this.file.basename}}
</p>
    
</template>



<script>


export default {
    name: 'File',
    props: {
        file: Object,
    
    }
}

</script>