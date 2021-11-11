<template>
<div>
    <b-alert 
        fade=true
        variant="success" 
        :show="dismissCountdown"
        @dismissed="dismissCountdown=0"
        @dismiss-count-down="countdownChanged"
        dismissible>
        File uploaded
    </b-alert>
    <b-form
      @submit.prevent="onSubmit"
      method="post"
      encType="multipart/form-data">
        <b-form-group label="Upload to nextcloud">
          <b-form-file 
            name="sampleFile"
            v-model="file" 

          />
        </b-form-group>
        <b-button type="submit" >Upload!</b-button>
    </b-form>     
</div>
</template>

<script>
export default {
    name: "FileUpload",
    data () {
        return{
            file: null,
            uploadUrl: process.env.VUE_APP_BACKEND_BASE_URL + '/upload',
            showAlert: false,
            dismissCountdown: 0
        }
    },
    methods: {
        async onSubmit(event){
            let formData = new FormData(event.target);
            let response = await fetch(this.uploadUrl, {
                method: "POST",
                body: formData,
                mode: 'no-cors'
            });
            if(response){
                this.dismissCountdown = 3;
            }
        },
        countdownChanged(dismissCountdown){
            this.dismissCountdown = dismissCountdown;
        }
    }
}
</script>
<style>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to{
        opacity: 100
    }
</style>
