<template>
  <div class="container">
    <h3>Configuration Page for {{teamName}} in channel: {{channelName}}</h3>
    <form>
      <div class="form-group text-left">
        <label for="nextcloud-url">Nextcloud URL</label>
        <input type="text" class="form-control" id="nextcloud-url">
        </div>
      <button @click.prevent="saveUrl" class="btn btn-primary">Save</button>
    </form>
  </div>
</template>

<script>
import * as ms from '@microsoft/teams-js';
export default {
  name: "Configuration",
  data() {
    return{
      context: null
    }
  },
  computed:{
    teamName(){
      return this.context ? this.context.teamName: '';
    },
    channelName(){
      return this.context ? this.context.channelName: '';
    }
  },
  methods:{
    saveUrl(){
      console.log("attempting saving")
      ms.settings.registerOnSaveHandler((saveEvent)=>{
        console.log(process.env.VUE_APP_NEXTCLOUD_BASE_URL)
        ms.settings.setSettings({
          websiteUrl: `${window.location.origin}`,
          contentUrl: `${window.location.origin}/#/lobby`,
          entityId: 'nextcloudTab',
          suggestedDisplayName: "Nextcloud"
        });
        saveEvent.notifySuccess();
      });
      ms.settings.setValidityState(true);
    }
  },
  mounted() {
    ms.initialize()
    ms.getContext((context)=>{
      this.context = context;
    });
  }
}
</script>

<style>

</style>
