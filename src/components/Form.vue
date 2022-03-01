<template>
    <div class="form">
        <h1 class="title">感想を送って!</h1>
        <div class="sendBox">
            <input type="text" v-model="from" class="from" placeholder="あなたのアドレス">
            <textarea v-model="text" name="textarea" id="textarea" cols="30" rows="10" placeholder="内容"></textarea>
            <button class="sendBtn" @click="sendText">送信</button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from "axios"
interface Mail {
    from:string,
    to:string,
    subject:string,
    text:string,
    html:""
}
export default Vue.extend({
    data:()=>({
        text:"" as string,
        from:"" as string,
        mail:{} as Mail,
    }),
    methods:{
        sendText(){
            if(this.text.length > 0 && this.from.length > 0){
                this.mail = {
                    from:this.from,
                    to:process.env.VUE_APP_MYMAIL_ADDRESS,
                    subject:"",
                    text:this.text,
                    html:""
                }
                axios.post(process.env.VUE_APP_MAILAPI_URL,this.mail)
                .then((res)=>{
                    console.log(res);
                    this.from = "";
                    this.text = "";
                    alert("送信完了!");
                })
                .catch((error)=>{
                    console.log(error);
                    alert("エラー:メールを送れませんでした...");
                });
            }else{alert("あなたのアドレス、もしくは内容が未入力です。");}
           
        }
    }
})
</script>

<style scoped>
    .form{
        background-color: rgba(0, 255, 255, 0.116);
        height: 450px;
        margin: 30px 30px;
        border: 1px solid rgba(22, 22, 22, 0);
        border-radius: 30px;
        box-shadow: 3px 3px rgba(128, 123, 123, 0.753);
    }
    .title{
        margin-left: 5%;
        margin-top: 20px;
        padding: 0 8px;
        color: rgba(0, 0, 0, 0.664);
        width: 150px;
        border-color: rgba(255, 255, 255, 0);
        border-radius: 10px;
        background-color: rgb(255, 255, 255);
    }
    #textarea{
        border-bottom: 1px solid rgba(0, 0, 0, 0.404);
        border-top: 1px solid rgba(0, 0, 0, 0.404);
        width: 100%;
        margin: 30px auto;
        background-color: rgba(192, 235, 232, 0.418);
    }
    #textarea:hover{
        background-color: rgba(234, 245, 244, 0.205);
    }
    #textarea:focus{
        outline: none;
    }
    .sendBtn{
        display: block;
        margin:0 auto;
        background-color: rgb(255, 255, 255);
        height: 50px;
        width: 50px;
        border: 2px solid rgba(73, 65, 65, 0.486);
        border-radius: 50%;
    }
    .from{
        margin-top: 10px;
        margin-left: 30px;
        background-color: white;
    }
    .from:focus{
        outline: none;
    }
</style>