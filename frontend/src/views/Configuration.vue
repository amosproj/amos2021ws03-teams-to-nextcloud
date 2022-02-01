<template>
  <div class="container">
    <h3 v-if="this.context">Configuration Page for {{teamName}} in channel: {{channelName}}</h3>
    <h3 v-else>This would be a configuration page for a Teams plugin will only be shown correctly when viewed inside Teams</h3>
    <p>
        This page currently does nothing and is only a placeholder for future configuration.
    </p>
  </div>
</template>

<script>
import * as ms from '@microsoft/teams-js';
export default {
  name: "Configuration",
  data() {
    return{
      context: null,
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
      ms.settings.setSettings({
        websiteUrl: `${window.location.origin}`,
        contentUrl: `${window.location.origin}/#/lobby`,
        entityId: 'nextcloudTab',
        suggestedDisplayName: "Nextcloud"
      });
      saveEvent.notifySuccess();
    });
    ms.settings.setValidityState(true);
    this.$store.commit("setShowActionBar", false);
  },
  onUnmounted() {
    this.$store.commit("setShowActionBar", true);
  }
}
</script>

<style>

</style>
