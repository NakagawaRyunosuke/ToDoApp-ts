<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <!-- ハンバーガーメニュー内 -->
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            MENU
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.to"
        >
          <v-list-item-icon>
            <v-icon color="blue darken-2">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>TODO LIST</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
  import Vue from "vue";

  export default Vue.extend({
    name:"App",
    data:()=>({
      drawer:null,
      items:[
        {title: "Todo",icon: "mdi-format-list-checks",to: "/"},
        {title: "感想",icon:"mdi-email",to:"/review"}
      ]
    }),
  });
</script>