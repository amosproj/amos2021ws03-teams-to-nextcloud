<template>
        <div style="border-style:solid;" @dragover.prevent @drop.prevent>
    </div>
</template>

<script>
    export default {
        name: 'DragAndDrop',
        data: () => ({ File: []})

    }

</script>
