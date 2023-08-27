import { ipcRenderer } from "electron";
import process from "node:child_process";
import { unlinkSync,writeFileSync,readFileSync } from "node:fs";
const wallpaper = require('wallpaper');
const schedule = require('node-schedule')



export const window = (event:string) => {ipcRenderer.send("window",event)}

export const bootup = async (event?:boolean) => {return await ipcRenderer.invoke("bootup",event)}

export const bingdaily = async () => {
          const data = await info()
          setwallpaper('http://bing.com'+data.images[0].urlbase+'_UHD.jpg','')
    }



export const info = async (idx?:number) => {
        return fetch('http://bing.com/HPImageArchive.aspx?format=js&idx='+idx+'&n=1')
             .then(response => response.json())
             .then(data => {return data})
    }

export const setwallpaper = async (url:string,path:string) => {
        const filePath = await ipcRenderer.invoke("download",url,path)
        await wallpaper.set(filePath);
        unlinkSync(filePath)
    }



export const choosefolder = () => {
    return ipcRenderer.invoke("choosefolder")
    
    }

export const Interval = async(url:string,time:string,path:string) => {
  let delay = parseInt(time.split(":")[0])*3600+parseInt(time.split(":")[1])*60+parseInt(time.split(":")[2])
  let timeobj = setInterval(async () => {
   let state = await getform()
   if (state.radio==false||state.timepicker=="0:0:0"||url!=state.api||url=="") {clearInterval(timeobj)}
   else {await setwallpaper(url,path);}
  },delay*1000)
}

export const schedules = (url:string,form:any,path:string) => {
  for (let i in form) {
    let rule = new schedule.RecurrenceRule();
    rule.hour = form[i].value.split(":")[0];
    rule.minute = form[i].value.split(":")[1];
    rule.second = form[i].value.split(":")[2];
    let timeobj = schedule.scheduleJob(rule, async () => {
      let state = await getform()
      if (state.radio==true||form[i].value=="0:0:0"||url!=state.api||url=="") {timeobj.cancel()}
      else {await setwallpaper(url,path);}
    });
  }
}

export const saveform = async (form:any) => {
    const path = await ipcRenderer.invoke("getpath")
    writeFileSync(path+"/config.json",JSON.stringify(form))
    }

export const getform =  async() => {

    const path = await ipcRenderer.invoke("getpath")
    try {
      const dict = JSON.parse(readFileSync(path+"/config.json").toString())
      return dict
    }
    catch (err) {return ""}
    }



export const setimage = () => {process.exec('start ms-settings:personalization-background')}