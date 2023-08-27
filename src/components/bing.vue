<script setup lang="ts">
import { ref,Ref,watch,onMounted } from 'vue'
import {ElDrawer,ElIcon,ElLink,ElSelect,ElOption,ElButton,ElSkeleton,ElSkeletonItem} from "element-plus";
import { Back,DArrowLeft,DArrowRight,Check } from '@element-plus/icons-vue'
import { setwallpaper,getform,info } from './node-api';


const emit = defineEmits(['update:isCheck'])
type Props = {
	isCheck:boolean,
}
const props = withDefaults(defineProps<Props>(),{
	isCheck:false,
})
const isCheck:Ref<boolean> = ref(false)
  watch(() => props.isCheck,() => {
	isCheck.value = props.isCheck;
},{
	immediate:true
})
const onCheckChange = () => {
	emit('update:isCheck',!isCheck.value)
}
let copyright = ref(''),copyrightlink = ref(''),idx = ref(0),url = ref('')
const link = async () =>{
  const data = await info(idx.value)
  url.value='http://bing.com'+data.images[0].urlbase;
  copyright.value=data.images[0].copyright;
  copyrightlink.value=data.images[0].copyrightlink;};link();
const idxincrease = () => {if(idx.value<7){idx.value++};link()}
const idxdecrease = () => {if(idx.value>0){idx.value--};link()}
const show = ref(true)
let timer: ReturnType<typeof setTimeout>;
const MovementTrigger = () => {
  clearTimeout(timer);
  show.value = true
  timer = setTimeout(() => {show.value = false;}, 1500);
}
onMounted(() =>{
        window.addEventListener("mousemove",MovementTrigger)
    })

const value = ref('_UHD.jpg')
const options = [{value:'_1366x768.jpg',label:'1366x768',},{value:'_1920x1080.jpg',label:'1920x1080',},{value:'_UHD.jpg',label:'UHD',},]

</script>

<template>

<el-drawer 
v-model="isCheck" 
:with-header="false" 
modal-append-to-body='false'
size="100%" 
direction="btt"
:style="{ backgroundImage: 'url(' + url+'_1366x768.jpg' + ')',webkitAppRegion:show?'drag':'no-drag'}"
>
<el-skeleton :loading="url==''" animated>
<template #template>
  <el-skeleton-item id="image" variant="image" style="width: 50%; height: 50%"/>
  <el-skeleton-item id="link" variant="text" style="width: 50%;"/>
  <el-skeleton-item id="button" variant="button"/>
</template>
<template #default>
<div id="show" v-show="show">
 <el-icon id="back" size="35" color="white" @click="onCheckChange"><Back /></el-icon>
 <el-icon id="arrowleft" size="50" color="white" v-if="idx<7"><DArrowLeft /></el-icon>
 <el-icon id="arrowright" size="50" color="white" v-if="idx>0"><DArrowRight /></el-icon>
 <div id="left" @click="idxincrease"></div>
 <div id="right" @click="idxdecrease"></div>
 <el-link :href="copyrightlink" target=“_blank” type="info">{{copyright}}</el-link>
 <div id="save">
  <el-select v-model="value" placeholder="Select">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      style="-webkit-app-region: no-drag;"
    />
  </el-select>
  <el-button type="success" :icon="Check" @click="getform().then(form=>setwallpaper(url+value,form.folder))"/>
 </div>
</div>
</template>
</el-skeleton>
</el-drawer>
</template>

<style>
.el-drawer {
  width: 100%;
  height: 100%;
  background-size: cover;
  position:relative;
}

#show > * {
  -webkit-app-region: no-drag;
}

#image{
  position:absolute;
  left:50%;
  top:50%;
  transform: translate(-50%,-50%);
}
#link{
  left: 3%;
  position: absolute;
  bottom: 5%;
  transform: translateY(-50%);
}
#button{
  right: 1%;
  position: absolute;
  bottom: 0%;
  transform: translateY(-50%);
  width: 15%;
}
#back{
  left: 0px;
  position:absolute;
}
#arrowleft{
  left: 1%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
#arrowright{
  right: 1%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
#left{
  top: 50%;
  left: 0px;
  width: 40%;
  height: 50%;
  position: absolute;
  transform: translateY(-50%);
}

#right{
  top: 50%;
  right: 0px;
  width: 40%;
  height: 50%;
  position: absolute;
  transform: translateY(-50%);
}

#save{
  right: 1%;
  position: absolute;
  bottom: 0%;
  transform: translateY(-50%);
}

#save .el-select{
  width: 115px;
}

.el-drawer .el-link{
  left: 3%;
  position: absolute;
  bottom: 5%;
  transform: translateY(-50%);
}
</style>
