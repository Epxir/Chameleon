<script async setup lang="ts">
import { ref,shallowRef } from 'vue'
import { ElButton , ElRow , ElNotification , ElIcon , ElCard , ElCheckbox} from 'element-plus'
import { Close,Minus,Setting } from '@element-plus/icons-vue'
import bing from './components/bing.vue'
import api from './components/api.vue'
import { window,setimage,bootup,bingdaily } from './components/node-api'
import './assets/font/iconfont.js'
import i18n from './components/i18n'

const vue=shallowRef(),isCheck=ref(false),setting=ref(false),daily=ref()
const Notification = () => {
  ElNotification({
    title: i18n.global.messages[i18n.global.locale].language.folders.title,
    message: i18n.global.messages[i18n.global.locale].language.folders.message,
    position:'bottom-right',
    type:'warning'
  });setimage();
}

const changeLanguage = () => {
  i18n.global.locale = i18n.global.locale=='en'?'zh':'en'
}

const boot = ref(false)
bootup().then(boolean=>{boot.value = boolean})
const bootauto = () => {bootup(boot.value)}

let dailyexist
if (dailyexist = localStorage.getItem('daily')) {daily.value=dailyexist==="true"}
const dailyoption = () => {
  localStorage.setItem('daily',daily.value);
  if (daily.value) {
    bingdaily()
  }
  };dailyoption();
</script>

<template>
<div id="function">
<el-row>
    <el-button type="success" @click="isCheck=!isCheck,vue=bing" round>{{$t('language.bing')}}</el-button>
</el-row>
<el-row>
    <el-button type="success" @click="isCheck=!isCheck,vue=api" round>{{$t('language.api')}}</el-button>
</el-row>
<el-row id="row">
    <el-button type="success" @click="Notification" round>{{$t('language.folder')}}</el-button>
</el-row>
</div>
<div id="menubar">
  <el-icon @click="window('min')" :size="35" style="margin-right: 10px;"><Minus/></el-icon>
  <el-icon @click="window('close')" :size="35" style="margin-right: 15px;"><Close/></el-icon>
</div>
<div id="setting">
  <el-button @click="changeLanguage" type="success" circle>
    <template #icon>
    <svg class="icon" aria-hidden="true"><use xlink:href="#icon-fanyi"/></svg>
    </template>
  </el-button>
  <el-button @click="setting=!setting" type="success" :icon="Setting"  circle/>
</div>
<Suspense>
<div>
<component :is="vue" v-model:isCheck="isCheck"></component>
<el-card id="setup" :body-style="{padding:'0px',textAlign:'center'}" v-show="setting" >
  <el-checkbox @change="bootauto" v-model="boot" :label="$t('language.bootup')" style="margin-right: 0px;"/>
  <el-checkbox @change="dailyoption" v-model="daily" :label="$t('language.dailybing')"/>
</el-card>
</div>
</Suspense>
</template>

<style>
#function {
	left: 5%;
	position: fixed;
	bottom: 5%;
	width: 50%;
}
.el-row {
  margin-bottom: 20px;
}
#row {
  margin-bottom: 0px;
}
#menubar {
  top: 10px;
  right: 0px;
  color: #A8ABB2;
  position:absolute;
  -webkit-app-region: no-drag;
}
#setting {
  right: 5%;
  text-align: right;
	position: fixed;
	bottom: 5%;
	width: 50%;
}
.el-button {
  -webkit-app-region: no-drag;
}
#setup{
  right: 5%;
  bottom: calc(5% + 40px);
  width: 100px;
  height: 65px;
  position:absolute;
  -webkit-app-region: no-drag;
}
</style>