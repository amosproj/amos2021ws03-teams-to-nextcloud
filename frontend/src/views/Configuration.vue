<template>
  <div class="container">
    <h3>Configuration Page for {{teamName}} in channel: {{channelName}}</h3>
    <form>
      <div class="form-group text-left">
        <label for="nextcloud-url">Nextcloud URL</label>
        <input v-model="nextcloudUrl" type="text" class="form-control" id="nextcloud-url">
        </div>
    </form>
  </div>
</template>

<script>
import * as ms from '@microsoft/teams-js';
export default {
  name: "Configuration",
  data() {
    return{
      context: null,
      nextcloudUrl: ''
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
  },
  mounted() {
    ms.initialize()
    ms.getContext((context)=>{
      this.context = context;
    });
    ms.settings.registerOnSaveHandler((saveEvent)=>{
      console.log("nextcloud url set to ", this.nextcloudUrl)
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
}
</script>

<style>

</style>
