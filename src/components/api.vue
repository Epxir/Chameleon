<script async setup lang="ts">
import { ref,Ref,watch,reactive } from 'vue'
import {ElDrawer,ElIcon,ElInput,ElRadioGroup,ElRadioButton,ElButton,ElTimePicker,ElInputNumber,ElForm,ElFormItem} from "element-plus";
import { Back,Refresh,Plus,Delete,FolderOpened} from '@element-plus/icons-vue'
import { setwallpaper,choosefolder,saveform,getform,Interval,schedules} from './node-api';

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

interface form {
  api:string,
  radio:boolean,
  timepicker:Date,
  pickerform:picker[]
  num:number,
  folder:string,
}
interface picker {index:number,value:string}
const defaultvalue="0:0:0"
const addpicker = () => {form.pickerform.push({index:form.pickerform.length,value:defaultvalue})}
const delpicker = (index:picker) => {form.pickerform.splice(form.pickerform.indexOf(index),1)}
let form = reactive({
  api:'',
  num:0,
  radio:true,
  folder:'',
  timepicker:defaultvalue,
  pickerform:[{index:0,value:defaultvalue}],
});
let getformvalues = await getform()
form = reactive(getformvalues != '' ? getformvalues : form);

const call = () => {saveform(form);Interval(form.api,form.timepicker,form.folder);schedules(form.api,form.pickerform,form.folder)}
</script>

<template>

<el-drawer v-model="isCheck" :show-close="false" modal-append-to-body='false' size="60%" direction="ltr">
<template #header>
  <el-icon id="back" size="35" @click="onCheckChange"><Back /></el-icon>
</template>
<suspense>
<el-form label-position="right" label-width="30%">
<el-form-item :label="$t('language.apitems.url')">
  <el-input v-model="form.api" placeholder="url" class="input-with-select" spellcheck ="false">
    <template #append>
    <el-button @click="setwallpaper(form.api,form.folder)" type="success" :icon="Refresh">{{$t('language.apitems.refresh')}}</el-button>
    </template>
   </el-input>
</el-form-item>
<el-form-item :label="$t('language.apitems.setting')">
 <el-radio-group v-model="form.radio">
 <el-radio-button :label=true>{{$t('language.apitems.interval')}}</el-radio-button>
 <el-radio-button :label=false>{{$t('language.apitems.timing')}}</el-radio-button>
 <el-button v-show="form.radio==false" :icon="Plus" @click="addpicker" text/>
 </el-radio-group>
</el-form-item>
<el-form-item v-show="form.radio==true">
  <el-time-picker v-model="form.timepicker" format="HH:mm:ss" value-format="H:m:s"/>
</el-form-item>
<el-form-item  v-for="picker in form.pickerform" v-show="form.radio==false">
  <el-time-picker v-model="picker.value" format="HH:mm:ss" value-format="H:m:s"/>
  <el-button :icon="Delete" @click="delpicker(picker)" text/>
</el-form-item>
<el-form-item :label="$t('language.apitems.quantity')">
   <el-input-number v-model="form.num" :min="0" controls-position="right" disabled/>
</el-form-item>
<el-form-item :label="$t('language.apitems.location')">
    <el-input v-model="form.folder">
      <template #append>
        <el-button :icon="FolderOpened" @click="choosefolder().then(path=>{form.folder=path})"/>
      </template>
    </el-input>
</el-form-item>
</el-form>
</suspense>
<template #footer>
  <div style="flex: auto">
    <el-button @click="call" type="primary">{{$t('language.apitems.save')}}</el-button>
    <el-button @click="onCheckChange">{{$t('language.apitems.cancel')}}</el-button>
  </div>
</template>



</el-drawer>

</template>

<style>
#back{
  top: 10px;
  left: 10px;
  position:absolute;
  -webkit-app-region: no-drag;
}
.el-drawer .el-form{
 
  position:absolute;
  width:80%;
  height: 80%;
  margin:0 auto;
  -webkit-app-region: no-drag;

}
</style>
