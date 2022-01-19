<template>
  <div class="fileList">
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col" style="width: 16px;">
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

  @media (hover: hover) {
    [type=checkbox] {
      visibility: hidden;
    }

    tr:hover [type="checkbox"] {
      visibility: visible;
      background-color: white;
    }

    [type="checkbox"]:hover {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E %3Cpath d='M15.88 8.29L10 14.17l-1.88-1.88a.996.996 0 1 0-1.41 1.41l2.59 2.59c.39.39 1.02.39 1.41 0L17.3 9.7a.996.996 0 0 0 0-1.41c-.39-.39-1.03-.39-1.42 0z' /%3E %3C/svg%3E");
    }
  }

  [type=checkbox] {
    -webkit-appearance: none;
    border-radius: 50%;
    width: 17px;
    height: 17px;
    color: #6872b6;
    background-size: contain;
    outline: none;
  }

  [type=checkbox]::before {
    content: "";
    display: block;
    height: inherit;
    border-radius: inherit;
    background-size: contain;
    box-shadow: inset 0 0 0 1px #4b4b4b;
  }

  [type=checkbox]:checked {
    visibility: visible;
    background-color: currentcolor;
    box-shadow: 0 0 6px #4b4b4b;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E %3Cpath d='M15.88 8.29L10 14.17l-1.88-1.88a.996.996 0 1 0-1.41 1.41l2.59 2.59c.39.39 1.02.39 1.41 0L17.3 9.7a.996.996 0 0 0 0-1.41c-.39-.39-1.03-.39-1.42 0z' fill='%23fff'/%3E %3C/svg%3E");
  }

  [type=checkbox]:checked::before {
    box-shadow: none;
  }

  :hover [type="checkbox"]:checked {
    background-color: #6872b6;
  }
</style>
