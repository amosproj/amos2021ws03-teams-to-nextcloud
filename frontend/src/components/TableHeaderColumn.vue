<template>
    <th scope="col" :class="{'text-left': true, resizable}">
    <div :style="{'display': 'flex', 'justify-content': 'space-between'}">
        <slot>
            <span @click="reorderBy(orderKey)" style="user-select: none">
            <span>{{header}}</span><img :src="getOrderIcon(orderKey)" width="16" height="16">
            </span>
        </slot>
        <div class="resizer" scope="col" v-if="resizable" @mousedown="startResize">
        </div>
    </div>
    </th>
</template>

<script>
export default {
    name: 'TableHeaderColumn',
    computed: {
      storedWidth(){
        return 0;
      }
    },
    props: { 
        'header': String ,
        'orderKey': String,
        'resizable': Boolean,
    },
    methods: {
        resize(event){
            if(!this.resizing) return;
            let boundingBox = this.resizeColumn.getBoundingClientRect();
            let newWidth = event.clientX - boundingBox.left;
            this.resizeColumn.style.width = `${newWidth}px`;
        },
        startResize(){
            console.log(this.$el)
            this.resizing = true;
            this.resizeColumn = this.$el;
            document.addEventListener('mousemove', this.resize);
            document.addEventListener('mouseup', this.stopResize);
        },
        stopResize(event){
          console.log({event});
          document.removeEventListener('mousemove', this.resize);
        },
        reorderBy(orderKey) {
            this.$store.commit("setCurrentOrderProperty", orderKey);
            this.$store.commit("orderChildrenByCurrentOrderProperty");
        },
        getOrderIcon(orderKey) {
            if(orderKey === this.$store.getters.StateCurrentOrderProperty) {
                if(this.$store.getters.StateCurrentOrderDirection === "asc") {
                    return "images/up.svg";
                } else {
                    return "images/down.svg";
                }
            }
            return "images/bi.svg";
        }
  },
}
</script>

<style>
    .resizer{
        width: 16px;
        cursor: col-resize;
    }
    .resizer:hover::after{
        content: "";
        background: blue;
        width: 1px;
    }
</style>
