<template>
<div :context="context">
    <p>{{teamName}}</p>
    <p>{{channelName}}</p>
    <p>{{userName}}</p>
    <p>{{channelID}}</p>
</div>
</template>
<script>
export default {
    name: 'TeamsInfo',
    props: {
        context: Object
    },
    data () {
        return {
        }
    },
    computed: {
        teamName : function() {
            return this.context ? this.context.teamName : '';
        },
        channelName : function() {
            return this.context ? this.context.channelName : '';
        },
        userName : function() {
            return this.context ? this.context.userPrincipalName : '';
        },
        channelID : function() {
            return this.context ? this.context.channelId : '';
        }
    }
}
</script>
