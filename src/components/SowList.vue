<template>
    <div>
        <div class="todolist">
            <v-list>
                <v-list-item v-for="task in tasks" :key="task.id">
                    <v-list-item-content>
                        <v-list-item-title v-text="task.title"></v-list-item-title>
                    </v-list-item-content>

                    <v-icon @click="deleteTask(task.id)">mdi-delete</v-icon>
                </v-list-item>
            </v-list>
        </div>

        <div class="addtask">
            <v-text-field 
                v-model="newTask"
                class="mt-3 ml-3"
                label="Add Task"
                @keyup.enter="addTask"
                clearable
                hide-details
                counter
                maxlength="20"
                prepend-icon="mdi-plus"
            ></v-text-field>
        </div>
        
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from "axios"
interface Task {
    id:string,
    tasks:string,
    title:string,
}
export default Vue.extend({
    data:()=>({
        newTask:"" as string,
        tasks:[] as Task[],
        newTaskObj:{} as Task,
        id:"" as string
    }),
    methods:{
        getTasks(){
            axios.get(process.env.VUE_APP_GETAPI_URL)
            .then((res)=>{
                this.tasks = res.data;
            })
            .catch((error)=>{
                console.log(error);
                alert("タスクの取得に失敗しました。DBサーバが停止しています…");
            });
        },
        addTask(){
            if(this.newTask.length > 0){
                this.id = String(Date.now());
                this.newTaskObj = {
                    id:this.id,
                    tasks:this.id,
                    title:this.newTask
                }
                axios.post(process.env.VUE_APP_ADDAPI_URL,this.newTaskObj)
                .then((res)=>{
                    console.log(res.data);
                    this.getTasks();
                    this.newTask = "";
                })
                .catch((error)=>{
                    console.log(error);
                    alert("タスクの追加に失敗しました。問合せから連絡をください!");
                });
            }else{
                alert("タスクを入力してください");
            }

        },
        deleteTask(id:string){
            axios.post(process.env.VUE_APP_DELETEAPI_URL,{id:id})
            .then(()=>{
                alert("Success!");
                this.getTasks();
            })
            .catch((error)=>{
                console.log(error);
                alert("エラー:問合せから連絡をください!");
            });
                
        
        }
    },
    mounted(){
        this.getTasks();
    }

})
</script>