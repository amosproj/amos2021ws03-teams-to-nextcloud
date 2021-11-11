<template>
<b-card 
    :context="context"
    :title="userName"
>
    <b-card-text>
        <p>{{teamName}}</p>
        <p>{{channelName}}</p>
        <p>{{channelID}}</p>
    </b-card-text>
</b-card>
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
