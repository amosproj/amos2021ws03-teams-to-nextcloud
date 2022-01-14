<template>
  <div class="fileList">
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col" style="width: 16px; text-left">
            <div class="custom-control custom-checkbox">
              <input
                :checked="allFilesSelected"
                @change="updateSelectionAll"
                type="checkbox"
                class="form-check-input"
                id="tableCheckbox"
              />
            </div>
          </th>
          <TableHeaderColumn :resizable="true" orderKey="icon">
            <span class="fiv-viv fiv-icon-blank"></span>
          </TableHeaderColumn>
          <TableHeaderColumn header="Name" orderKey="name" :resizable=true />
          <TableHeaderColumn header="Last Modified" orderKey="lastModifiedUnixTimestamp" :resizable=false />
        </tr>
      </thead>
      <tbody>
        <File
          v-for="file in fileList"
          v-bind:key="file.path"
          v-bind:file="file"
        ></File>
      </tbody>
    </table>
  </div>
</template>

<script>
// @ is an alias to /src
import File from "@/components/File.vue";
import TableHeaderColumn from '@/components/TableHeaderColumn.vue';
import { onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';

export default {
  name: "FileList",
  components: {
    File,
    TableHeaderColumn
  },
  setup () {
    // since `this` (as in the variable) is not available during setup (or rather is the component instance in an unfinished state, 
    // also `this` inside the keydown event handler is the window instance)
    // we need to use the composition api to get the store in the setup
    const store = useStore();
    const keyPressEventHandler =  function(event){
        let holdShift = event.shiftKey;
        if(event.key === "ArrowUp"){
            event.preventDefault();
            store.dispatch('moveSelection', { direction: 'previous', holdShift: holdShift});
        }
        if(event.key === "ArrowDown"){
            event.preventDefault();
            store.dispatch('moveSelection', { direction: 'next', holdShift: holdShift});
        }
        if(event.key === "Escape"){
            event.preventDefault();
            store.dispatch("setAllFilesUnselected");
        }
    };
    onMounted(() =>{
        window.addEventListener("keydown", keyPressEventHandler);
    });
    onUnmounted(() =>{
        window.removeEventListener("keydown", keyPressEventHandler);
    });
  },
  props: ["fileList"],
  computed: {
    allFilesSelected(){
      let selectedChildren = this.$store.getters.StateSelectedChildren;
      return selectedChildren.length == this.fileList.length;
    },
  },
  methods: {
    updateSelectionAll(event){
      for(let file of this.fileList){
        this.$store.dispatch("setFileSelected",{
          path: file.path,
          selected: event.currentTarget.checked
        });
      }
    },
  }
};
</script>

<style>
  .fiv-cla, .fiv-viv, .fiv-sqo { font-size: 1.4em; }
</style>
