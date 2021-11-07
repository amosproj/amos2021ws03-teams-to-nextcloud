<template>
        <div style="border-style:solid;" @dragover.prevent @drop.prevent>
      <input type="file" multiple @change="uploadFile"/>
      <div @drop="dragFile" style="background-color:green;margin-bottom:10px;padding:10px;">
        Or drag the file here
        <div v-if="File.length">
          <ul v-for="file in File" :key="file">
            <li>{{file.name}}</li>
          </ul>
        </div>
      </div>

    </div>
</template>

<script>
    export default {
        name: 'DragAndDrop',
        data: () => ({ File: []})

    }

</script>
