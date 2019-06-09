<template>
    <div id="test">
        <div class="content">
            <div class="row">
                <div class="col-md-4 offset-2">
                    <div class="form-group msg">
                        <input class="form-control" type="text" v-model="welcome"/>
                        <button class="btn btn-primary btnMsg" @click="changeMessage(welcome)">Alterar Mensagem</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    let unsubscribe

    export default {
     name:'test-app',
     components:{},
     data(){
         return {
             welcome: '',
         }
     },
     methods:{
         changeMessage: function(welcome){
             return this.$store.commit('CHANGE_MESSAGE',welcome);
             //return this.$store.state.welcome = welcome;
         }
     },
     mounted(){
         unsubscribe = this.$store.subscribe(mutation => {

                    console.log('mutations',mutation.type)
             })
        }
    }
</script>
<style scoped>
    .msg{
        margin:20px
    }
    .btnMsg{
        margin:20px;
        float:right;
    }
</style>