<template>
    <div id="app">
        <b-button size="sm" @click="toggle">
            {{ show ? 'Hide' : 'Show' }} Alert
        </b-button>
        <b-alert
        v-model="show"
        class="mt-3"
        dismissible
        @dismissed="dismissed"
        >
            Hello {{ name }}!
      </b-alert>

    </div>

    
</template>

<script>
import * as microsoftTeams from '@microsoft/teams-js'
export default {
  name: 'App',
    data() {
    return {
      name: 'BootstrapVue',
      show: true
    }
  },
  watch: {
    show(newVal) {
      console.log('Alert is now ' + (newVal ? 'visible' : 'hidden'))
    }
  },
  methods: {
    toggle() {
      console.log('Toggle button clicked')
      this.show = !this.show
    },
    dismissed() {
      console.log('Alert dismissed')
    }
  },
  mounted: function() {
    /*
        For the moment this our configuration page so that we can add the Tab to Teams
        TODO: This should be moved into its own route with Vue Routing later
     */
    microsoftTeams.initialize();
    microsoftTeams.settings.registerOnSaveHandler((saveEvent) => {
        microsoftTeams.settings.setSettings({
            websiteUrl: process.env.VUE_APP_NGROK_URL,
            contentUrl: process.env.VUE_APP_NGROK_URL,
            entityId: "grayIconTab",
            suggestedDisplayName: "Nextcloud"
        });
        saveEvent.notifySuccess();
    });
    microsoftTeams.settings.setValidityState(true);
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
