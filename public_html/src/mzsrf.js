// 在网页中包含此程序，可在任何 <input> 或 <textarea> 元素中用所选的民族文字输入
// 有多个语种时使用 Ctrl + Shift 切换语种
// 可选语种：['蒙','藏','维','哈','柯']
// 设置方法：（启用后，该打字框的默认输入语种为所指定列表中的第一种）
// document.getElementsByTagName('input')[0].使用民族文输入法(['无','蒙'])
// document.getElementsByTagName('textarea')[0].使用民族文输入法(['蒙','藏','维'])
const 元素=`<div class=键盘 style=width:100%>
<div style=width:100%;height:20%>
<div class=键 style=width:calc(100%/14.5);height:100% onclick=输入字符(this,event)></div><!--
--><div class=键 style=width:calc(100%/14.5);height:100% onclick=输入字符(this,event)></div><!--
--><div class=键 style=width:calc(100%/14.5);height:100% onclick=输入字符(this,event)></div><!--
--><div class=键 style=width:calc(100%/14.5);height:100% onclick=输入字符(this,event)></div><!--
--><div class=键 style=width:calc(100%/14.5);height:100% onclick=输入字符(this,event)></div><!--
--><div class=键 style=width:calc(100%/14.5);height:100% onclick=输入字符(this,event)></div><!--
--><div class=键 style=width:calc(100%/14.5);height:100% onclick=输入字符(this,event)></div><!--
--><div class=键 style=width:calc(100%/14.5);height:100% onclick=输入字符(this,event)></div><!--
--><div class=键 style=width:calc(100%/14.5);height:100% onclick=输入字符(this,event)></div><!--
--><div class=键 style=width:calc(100%/14.5);height:100% onclick=输入字符(this,event)></div><!--
--><div class=键 style=width:calc(100%/14.5);height:100% onclick=输入字符(this,event)></div><!--
--><div class=键 style=width:calc(100%/14.5);height:100% onclick=输入字符(this,event)></div><!--
--><div class=键 style=width:calc(100%/14.5);height:100% onclick=输入字符(this,event)></div><!--
--><div class=键 style=width:calc(100%/14.5*1.5);height:100% onclick="del();"></div>
</div><div style=width:100%;height:20%>
<div class=键 style=width:calc(100%/14.5*1.45);height:100% onclick="输入字符('\t')"></div><!--
--><div class=键 style=width:calc(100%/14.5);height:100% onclick=输入字符(this,event)></div><!--
--><div class=键 style=width:calc(100%/14.5);height:100% onclick=输入字符(this,event)></div><!--
--><div class=键 style=width:calc(100%/14.5);height:100% onclick=输入字符(this,event)></div><!--
--><div class=键 style=width:calc(100%/14.5);height:100% onclick=输入字符(this,event)></div><!--
--><div class=键 style=width:calc(100%/14.5);height:100% onclick=输入字符(this,event)></div><!--
--><div class=键 style=width:calc(100%/14.5);height:100% onclick=输入字符(this,event)></div><!--
--><div class=键 style=width:calc(100%/14.5);height:100% onclick=输入字符(this,event)></div><!--
--><div class=键 style=width:calc(100%/14.5);height:100% onclick=输入字符(this,event)></div><!--
--><div class=键 style=width:calc(100%/14.5);height:100% onclick=输入字符(this,event)></div><!--
--><div class=键 style=width:calc(100%/14.5);height:100% onclick=输入字符(this,event)></div><!--
--><div class=键 style=width:calc(100%/14.5);height:100% onclick=输入字符(this,event)></div><!--
--><div class=键 style=width:calc(100%/14.5);height:100% onclick=输入字符(this,event)></div><!--
--><div class=键 style=width:calc(100%/14.5*1.05);height:100% onclick=输入字符(this,event)></div>
</div><div style=width:100%;height:20%>
<div class=键 style=width:calc(100%/14.5*1.7);height:100%></div><!--
--><div class=键 style=width:calc(100%/14.5);height:100% onclick=输入字符(this,event)></div><!--
--><div class=键 style=width:calc(100%/14.5);height:100% onclick=输入字符(this,event)></div><!--
--><div class=键 style=width:calc(100%/14.5);height:100% onclick=输入字符(this,event)></div><!--
--><div class=键 style=width:calc(100%/14.5);height:100% onclick=输入字符(this,event)></div><!--
--><div class=键 style=width:calc(100%/14.5);height:100% onclick=输入字符(this,event)></div><!--
--><div class=键 style=width:calc(100%/14.5);height:100% onclick=输入字符(this,event)></div><!--
--><div class=键 style=width:calc(100%/14.5);height:100% onclick=输入字符(this,event)></div><!--
--><div class=键 style=width:calc(100%/14.5);height:100% onclick=输入字符(this,event)></div><!--
--><div class=键 style=width:calc(100%/14.5);height:100% onclick=输入字符(this,event)></div><!--
--><div class=键 style=width:calc(100%/14.5);height:100% onclick=输入字符(this,event)></div><!--
--><div class=键 style=width:calc(100%/14.5);height:100% onclick=输入字符(this,event)></div><!--
--><div class=键 style=width:calc(100%/14.5*1.8);height:100% onclick="输入字符('\n')"></div>
</div><div style=width:100%;height:20%>
<div class=键 style=width:calc(100%/14.5*2.25);height:100% onclick="上排=!上排"></div><!--
--><div class=键 style=width:calc(100%/14.5);height:100% onclick=输入字符(this,event)></div><!--
--><div class=键 style=width:calc(100%/14.5);height:100% onclick=输入字符(this,event)></div><!--
--><div class=键 style=width:calc(100%/14.5);height:100% onclick=输入字符(this,event)></div><!--
--><div class=键 style=width:calc(100%/14.5);height:100% onclick=输入字符(this,event)></div><!--
--><div class=键 style=width:calc(100%/14.5);height:100% onclick=输入字符(this,event)></div><!--
--><div class=键 style=width:calc(100%/14.5);height:100% onclick=输入字符(this,event)></div><!--
--><div class=键 style=width:calc(100%/14.5);height:100% onclick=输入字符(this,event)></div><!--
--><div class=键 style=width:calc(100%/14.5);height:100% onclick=输入字符(this,event)></div><!--
--><div class=键 style=width:calc(100%/14.5);height:100% onclick=输入字符(this,event)></div><!--
--><div class=键 style=width:calc(100%/14.5);height:100% onclick=输入字符(this,event)></div><!--
--><div class=键 style=width:calc(100%/14.5*2.25);height:100% onclick="上排=!上排"></div>
</div><div style=width:100%;height:20%>
<div class=键 style=width:calc(100%/14.5*1.25);height:100%></div><!--
--><div class=键 style=width:calc(100%/14.5*1);height:100%></div><!--
--><div class=键 style=width:calc(100%/14.5*1.125);height:100%></div><!--
--><div class=键 style=width:calc(100%/14.5*6.75);height:100% onclick=输入字符(this,event)></div><!--
--><div class=键 style=width:calc(100%/14.5*1.125);height:100% onclick="更改.软=!更改.软"></div><!--
--><div class=键 style=width:calc(100%/14.5*1);height:100%></div><!--
--><div class=键 style=width:calc(100%/14.5*1);height:100%></div><!--
--><div class=键 style=width:calc(100%/14.5*1.25);height:100%></div>
</div>
</div>`
const 样式=`
.键{background:lightgrey;border-radius:5%;display:inline-block;border:solid 1px darkgrey;box-sizing:border-box;position:relative;overflow:hidden}
.键:hover{background:darkgrey;border:solid 1px grey;z-index:1001;overflow:visible}`
HTMLInputElement.prototype.使用民族文输入法=HTMLTextAreaElement.prototype.使用民族文输入法=function(要使用的语种){
if(要使用的语种.some(需求=>需求 in 语种列表)){
  this.onkeydown=按键动作=>{
    if(按键动作.ctrlKey&&按键动作.shiftKey&&(按键动作.key=='Shift'||按键动作.key=='Control')){
      按键动作.preventDefault()
      按键动作.stopPropagation()
      切换到下一输入法(this)
    }
  }
  this.语种序列=要使用的语种;this.语种序号=0
  this.onfocus=()=>{
    if(正在打字的打字框==this){return}
    正在打字的打字框=this;
    if(this.语种序列[this.语种序号]in 语种列表){this.语种序号-=1;setTimeout(()=>{正在打字的打字框=this;切换到下一输入法(this)},1)}
  }
  this.onblur=()=>{
    let 键盘
    let 软键盘=(键盘=document.getElementsByClassName('键盘')[0])?.parentNode
    setTimeout(()=>{if(软键盘&&!软键盘.contains(document.activeElement)){软键盘.remove();正在打字的打字框=undefined;if(变字){清除变字()}}},1)
  }
}
function 切换到下一输入法(打字框){
let 软键盘,键盘
if(!(软键盘=(键盘=document.getElementsByClassName('键盘')[0])?.parentNode)){
软键盘=document.createElement('div')
软键盘.innerHTML=元素
软键盘.setAttribute('tabindex','0')
软键盘.style.width='100%'
软键盘.style.position='absolute'
document.body.appendChild(软键盘)
const 样式表=document.createElement('style')
样式表.textContent=样式
document.head.appendChild(样式表)
键盘=document.getElementsByClassName('键盘')[0]
}
打字框.语种序号=打字框.语种序号!==undefined?(++打字框.语种序号)%打字框.语种序列.length:0
if(打字框.语种序列[打字框.语种序号]in 语种列表){
  const 全部按键=键盘.getElementsByClassName('键')
  let 按键序号=0
  const 文字书写方向=语种列表[打字框.语种序列[打字框.语种序号]].书写方向
  for(let 字符 of 语种列表[打字框.语种序列[打字框.语种序号]].按键分布表.flat()){
    let 改变方向的文字
    if(文字书写方向%2>0){
      const 候选字符=字符.split('\n')
      const 是竖写语种的字符=字符=>字符.charCodeAt(0)>=0x1800&&字符.charCodeAt(0)<=0x18AF
      改变方向的文字=候选字符.some(是竖写语种的字符)?'':undefined
      if(改变方向的文字!==undefined){
        for(let 字符选项 of 候选字符){
          改变方向的文字+=`<div${是竖写语种的字符(字符选项)?' style=transform:rotate(90deg)':''}>${字符选项}</div>`
        }
      }
    }
    const 附加字表=语种列表[打字框.语种序列[打字框.语种序号]].附加字表
    全部按键[按键序号].innerHTML=附加字表&&附加字表[按键序号]?`<div style=position:absolute;top:0;right:0;color:grey>${附加字表[按键序号]}</div>`:''
    全部按键[按键序号++].innerHTML+=`<div style=position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);white-space:pre;text-align:center>${改变方向的文字??字符}</div>`
  }

打字框.onkeypress=按键动作=>{
  if(正在打字的语种键盘&&名称和序号[按键动作.code]!==undefined){按键动作.preventDefault();按键动作.stopPropagation();const 传递的动作参数=new PointerEvent('click',{shiftKey:按键动作.shiftKey});传递的动作参数.getModifierState=名称=>按键动作.getModifierState(名称);正在打字的语种键盘.getElementsByClassName('键')[名称和序号[按键动作.code]].dispatchEvent(传递的动作参数)}
  if(按键动作.code.startsWith('Numpad')&&按键动作.target!==打字框&&(按键动作.key.length===1||按键动作.key==='Enter')){
    按键动作.preventDefault();按键动作.stopPropagation()
    输入字符(按键动作.key.length===1?按键动作.key:'\n')
  }
}
打字框.onkeydown=按键动作=>{
  if((按键动作.code=='Tab'||按键动作.code=='Enter')&&变字){清除变字()}
  if(按键动作.code=='Backspace'&&(按键动作.target!==打字框||变字)){按键动作.preventDefault();按键动作.stopPropagation();del()}
  if(按键动作.code=='Tab'){按键动作.preventDefault();按键动作.stopPropagation();输入字符('\t')}
  if(按键动作.code=='AltRight'){按键动作.preventDefault();按键动作.stopPropagation();更改.硬=true}
  if(正在打字的语种键盘&&更改.硬&&名称和序号[按键动作.code]!==undefined){按键动作.preventDefault();按键动作.stopPropagation();const 传递的动作参数=new PointerEvent('click',{shiftKey:按键动作.shiftKey});传递的动作参数.getModifierState=名称=>按键动作.getModifierState(名称);正在打字的语种键盘.getElementsByClassName('键')[名称和序号[按键动作.code]].dispatchEvent(传递的动作参数)}
    if(按键动作.ctrlKey&&按键动作.shiftKey&&(按键动作.key=='Shift'||按键动作.key=='Control')){
      按键动作.preventDefault()
      按键动作.stopPropagation()
      切换到下一输入法(打字框)
    }
}
打字框.onkeyup=按键动作=>{if(按键动作.code=='AltRight'&&更改.硬){按键动作.preventDefault();按键动作.stopPropagation();更改.硬=false}}
正在打字的语种键盘=键盘
}else{软键盘.remove();打字框.onkeydown=打字框.onkeypress=打字框.onkeyup=undefined
  打字框.onkeydown=按键动作=>{
    if(按键动作.ctrlKey&&按键动作.shiftKey&&(按键动作.key=='Shift'||按键动作.key=='Control')){
      按键动作.preventDefault()
      按键动作.stopPropagation()
      切换到下一输入法(打字框)
    }
  }
  正在打字的语种键盘=undefined
}

    if(变字){清除变字()}
    const 书写方向=语种列表[打字框.语种序列[打字框.语种序号]]?.书写方向
    if(书写方向==2){打字框.style.direction='rtl'}else{打字框.style.direction=''}
    if(书写方向==1){
      打字框.style.writingMode='vertical-lr'
    }else if(书写方向==3){
      打字框.style.writingMode='vertical-rl'
    }else{打字框.style.writingMode=''}
const 打字框位置=打字框.getBoundingClientRect()
软键盘.style.height=软键盘.clientWidth/14.5*5
软键盘.style.left=0
软键盘.style.top=打字框位置.y+打字框位置.height
}
}
let 上排=false,更改={软:false,硬:false},变字=undefined,正在打字的语种键盘=undefined,正在打字的打字框=undefined,前后引号={单引号:false,双引号:false}
const 设定键盘高度=()=>{
  const 键盘=document.getElementsByClassName('键盘')[0]
  if(键盘){键盘.style.height=`${键盘.clientWidth/14.5*5}px`}
}
addEventListener('resize',设定键盘高度)
function 输入字符(按键,交互参数){
  const 打字框=正在打字的打字框;if(!打字框){return}
  if(typeof 按键==='string'){要输入的字符=按键;if(变字){清除变字()}}
  else{
  let 按键内容,字符;
  if(按键.children[按键.children.length-1].children.length===0||Array.from(按键.children[按键.children.length-1].children).every(按键标签=>按键标签.tagName.toLowerCase()=='font')){
    按键内容=按键.children[按键.children.length-1].textContent.split('\n')
  }else{
    按键内容=[]
    for(let 内容 of 按键.children[按键.children.length-1].children){
      按键内容.push(内容.textContent)
    }
  }
  const 大写锁定=交互参数.getModifierState("CapsLock")
  const 按了上排键=交互参数.shiftKey||上排
  if(上排){上排=false}

  const 按了更改键=更改.软||更改.硬
  if(更改.软){更改.软=false}  
  let 按键序号;
  const 附加字表=语种列表[打字框.语种序列[打字框.语种序号]].附加字表
  if(按了更改键&&附加字表&&附加字表[按键序号=语种列表[打字框.语种序列[打字框.语种序号]].按键分布表.flat().indexOf(按键内容.join('\n'))]){字符=附加字表[按键序号]}
  else if(按键内容.length==1){字符=按键内容[0];if(按了上排键==大写锁定){字符=字符.toLowerCase()}}
  else if(按了上排键){字符=按键内容[0]}else{字符=按键内容[1]}
  if(字符){
    const 引号控制=语种列表[打字框.语种序列[打字框.语种序号]].引号控制
    if((字符=='\''||字符=='"')&&引号控制){
      if(字符=='\''&&引号控制%2==1){前后引号.单引号=!前后引号.单引号;字符=前后引号.单引号?'‘':'’'}
      else if(字符=='"'){前后引号.双引号=!前后引号.双引号;字符=前后引号.双引号?'“':'”'}
    }
    const 变字表=语种列表[打字框.语种序列[打字框.语种序号]].变字表
    if(变字!==字符&&变字表&&变字表[字符]&&(!变字||!变字表[变字][字符])){准备变字(字符,变字表);字符=undefined}
    else if(变字){字符=变字表[变字][字符]??字符;清除变字()}
  }
  要输入的字符=字符
  }
  if(要输入的字符){const 输入原位=打字框.selectionStart
  打字框.value=打字框.value.substr(0,打字框.selectionStart)+要输入的字符+打字框.value.substr(打字框.selectionEnd)
  打字框.setSelectionRange(输入原位+要输入的字符.length,输入原位+要输入的字符.length)}
  打字框.focus();
}
function del() {
    const 打字框=正在打字的打字框
    打字框.focus();
    if(变字){清除变字();return}
    const 输入原位=打字框.selectionStart-(打字框.selectionStart==打字框.selectionEnd?1:0)
    打字框.value = 打字框.value.substr(0, 打字框.selectionStart - (打字框.selectionStart==打字框.selectionEnd?1:0))+打字框.value.substr(打字框.selectionEnd);
    打字框.setSelectionRange(输入原位,输入原位)
}

const 改变了的键=[]
function 准备变字(字符,变字表){
 if(变字!=undefined){清除变字()}  
 变字=字符
 const 全部按键=正在打字的语种键盘.getElementsByClassName('键')
 for(const 键 of 全部按键){
  let 按键内容
  if(键.children[键.children.length-1].children.length===0){
    按键内容=键.children[键.children.length-1].textContent.split('\n')
  }else{
    按键内容=[]
    for(let 内容 of 键.children[键.children.length-1].children){
      按键内容.push(内容.textContent)
    }
  }
  if(按键内容.every(键上的字符=>!键上的字符.trim())){continue}
  const 要改变的字符=[]
  for(const 键上的字符 of 按键内容){
    if(变字表[变字][键上的字符]){
      要改变的字符.push([键上的字符,变字表[变字][键上的字符]])
    }
  }
  改变了的键.push([键,键.innerHTML])
  for(const 改变的字符 of 要改变的字符){
    键.innerHTML=键.innerHTML.replace(改变的字符[0],`<font color=blue>${改变的字符[1]}</font>`)
  }
 }
}
function 清除变字(){
  变字=undefined
  for(const 原字 of 改变了的键){原字[0].innerHTML=原字[1]}
  改变了的键.length=0
}
const 名称和序号={
Backquote:0,
Digit1:1,
Digit2:2,
Digit3:3,
Digit4:4,
Digit5:5,
Digit6:6,
Digit7:7,
Digit8:8,
Digit9:9,
Digit0:10,
Minus:11,
Equal:12,
KeyQ:15,
KeyW:16,
KeyE:17,
KeyR:18,
KeyT:19,
KeyY:20,
KeyU:21,
KeyI:22,
KeyO:23,
KeyP:24,
BracketLeft:25,
BracketRight:26,
Backslash:27,
KeyA:29,
KeyS:30,
KeyD:31,
KeyF:32,
KeyG:33,
KeyH:34,
KeyJ:35,
KeyK:36,
KeyL:37,
Semicolon:38,
Quote:39,
Enter:40,
KeyZ:42,
KeyX:43,
KeyC:44,
KeyV:45,
KeyB:46,
KeyN:47,
KeyM:48,
Comma:49,
Period:50,
Slash:51,
Space:56,
}
const 语种列表={
蒙:{书写方向:1,
按键分布表:[["~\n᠍","!\n1","@\n2","#\n3","¥\n4","%\n5","^\n6","᠊\n7","*\n8","(\n9",")\n0","᠎\n ","+\n=","回删"],
["制表","ᡂ\nᠣ","ᠸ","ᠧ\nᠡ","ᠿ\nᠷ","ᠲ","ᠶ","ᠦ","ᠢ","ᠥ","ᠫ","〈\n[","〉\n]","|\n᠁"],
["大写锁定","ᠠ","ᠰ","ᠳ","ᠹ","ᠭ","ᠾ\nᠬ","ᠵ","ᠻ\nᠺ","ᡀ\nᠯ","᠄\n;","᠌\n᠋","换行"],
["上排","ᡁ\nᠽ","ᠱ","ᠼ\nᠴ","ᠤ","ᠪ","ᠩ\nᠨ","ᠮ","《\n᠂","》\n᠃","?\n/","上排"],
["控制","系统","更改"," ","更改","系统","选项","控制"]]
},
藏:{
按键分布表:[["༁\nཨ","༪\n༡","༫\n༢","༬\n༣","༭\n༤","༮\n༥","༯\n༦","༰\n༧","༱\n༨","༲\n༩","༳\n༠","༼\nཧ","༽\nཝ","回删"],
["制表","༕\nཅ","༖\nཆ","༗\nེ","ྼ\nར","ཊ\nཏ","ྻ\nཡ","༘\nུ","༙\nི","༚\nོ","༛\nཕ","༜\nཙ","༝\nཚ","༞\nཛ"],
["大写锁定","ཱ\nའ","༟\nས","ཌ\nད","༾\nབ","༿\nང","࿏\nམ","༂\n་","༃\nག","༆\nལ","༇\nཞ","༸\n།","换行"],
["上排","༴\nཟ","ཥ\nཤ","ཀྵ\nཀ","྇\nཁ","྆\nཔ","ཎ\nན","变字二\n变字一","ཋ\nཐ","༺\nཇ","༻\nཉ","上排"],
["控制","系统","更改"," ","更改字表","系统","选项","控制"]],
变字表:{
变字一:{
'༠':'༈', // U+0F08 TIBETAN MARK SBRUL SHAD
'༡':'༄', // U+0F04 TIBETAN MARK INITIAL YIG MGO MDUN MA
'༢':'༅', // U+0F05 TIBETAN MARK CLOSING YIG MGO SGAB MA
'༣':'ཾ', // U+0F7E TIBETAN SIGN RJES SU NGA RO
'༤':'ྃ', // U+0F83 TIBETAN SIGN SNA LDAN
'༥':'༷', // U+0F37 TIBETAN MARK NGAS BZUNG SGOR RTAGS
'༦':'༵', // U+0F35 TIBETAN MARK NGAS BZUNG NYI ZLA
'༧':'ཿ', // U+0F7F TIBETAN SIGN RNAM BCAD
'༨':'༔', // U+0F14 TIBETAN MARK GTER TSHEG
'༩':'༑', // U+0F11 TIBETAN MARK RIN CHEN SPUNGS SHAD
'འ':'ྰ', // U+0FB0 TIBETAN SUBJOINED LETTER -A
'པ':'ྤ', // U+0FA4 TIBETAN SUBJOINED LETTER PA
'ཀ':'ྐ', // U+0F90 TIBETAN SUBJOINED LETTER KA
'ད':'ྡ', // U+0FA1 TIBETAN SUBJOINED LETTER DA
'ེ':'ཻ', // U+0F7B TIBETAN VOWEL SIGN EE
'བ':'ྦ', // U+0FA6 TIBETAN SUBJOINED LETTER BA
'ང':'ྔ', // U+0F94 TIBETAN SUBJOINED LETTER NGA
'མ':'ྨ', // U+0FA8 TIBETAN SUBJOINED LETTER MA
'ི':'ྀ', // U+0F80 TIBETAN VOWEL SIGN REVERSED I
'་':'྄', // U+0F84 TIBETAN MARK HALANTA
'ག':'ྒ', // U+0F92 TIBETAN SUBJOINED LETTER GA
'ལ':'ླ', // U+0FB3 TIBETAN SUBJOINED LETTER LA
'变字一':'྅', // U+0F85 TIBETAN MARK PALUTA
'ན':'ྣ', // U+0FA3 TIBETAN SUBJOINED LETTER NA
'ོ':'ཽ', // U+0F7D TIBETAN VOWEL SIGN OO
'ཕ':'ྥ', // U+0FA5 TIBETAN SUBJOINED LETTER PHA
'ཅ':'ྕ', // U+0F95 TIBETAN SUBJOINED LETTER CA
'ར':'ྲ', // U+0FB2 TIBETAN SUBJOINED LETTER RA
'ས':'ྶ', // U+0FB6 TIBETAN SUBJOINED LETTER SA
'ཏ':'ྟ', // U+0F9F TIBETAN SUBJOINED LETTER TA
'ུ':'ྭ', // U+0FAD TIBETAN SUBJOINED LETTER WA
'ཁ':'ྑ', // U+0F91 TIBETAN SUBJOINED LETTER KHA
'ཆ':'ྖ', // U+0F96 TIBETAN SUBJOINED LETTER CHA
'ཤ':'ྴ', // U+0FB4 TIBETAN SUBJOINED LETTER SHA
'ཡ':'ྱ', // U+0FB1 TIBETAN SUBJOINED LETTER YA
'ཟ':'ྯ', // U+0FAF TIBETAN SUBJOINED LETTER ZA
'ཞ':'ྮ', // U+0FAE TIBETAN SUBJOINED LETTER ZHA
'ཝ':'ྺ', // U+0FBA TIBETAN SUBJOINED LETTER FIXED-FORM WA
'ཐ':'ྠ', // U+0FA0 TIBETAN SUBJOINED LETTER THA
'ཧ':'ྷ', // U+0FB7 TIBETAN SUBJOINED LETTER HA
'ཇ':'ྗ', // U+0F97 TIBETAN SUBJOINED LETTER JA
'ཉ':'ྙ', // U+0F99 TIBETAN SUBJOINED LETTER NYA
'ཨ':'ྸ', // U+0FB8 TIBETAN SUBJOINED LETTER A
'ཙ':'ྩ', // U+0FA9 TIBETAN SUBJOINED LETTER TSA
'ཛ':'ྫ', // U+0FAB TIBETAN SUBJOINED LETTER DZA
'ཚ':'ྪ', // U+0FAA TIBETAN SUBJOINED LETTER TSHA
'།':'༎', // U+0F0E TIBETAN MARK NYIS SHAD
},
变字二:{
'ད':'ཌྷ', // U+0F4D TIBETAN LETTER DDHA
'བ':'ྦྷ', // U+0FA7 TIBETAN SUBJOINED LETTER BHA
'ག':'ྒྷ', // U+0F93 TIBETAN SUBJOINED LETTER GHA
'变字一':'ྡྷ', // U+0FA2 TIBETAN SUBJOINED LETTER DHA
'变字二':'༹', // U+0F39 TIBETAN MARK TSA -PHRU
'ཏ':'ྜྷ', // U+0F9D TIBETAN SUBJOINED LETTER DDHA
'ཛ':'ྫྷ', // U+0FAC TIBETAN SUBJOINED LETTER DZHA
}},
附加字表:{
0: 'ༀ',
1: 'ྲྀ',
2: 'ྲཱྀ',
3: 'ླྀ',
4: 'ླཱྀ',
5: 'ཱྀ',
6: '༉',
7: '༊',
8: '༏',
9: '༐',
10: '༒',
11: '༌',
12: '༓',
15: 'ྉ',
16: 'ྈ',
17: '྾',
18: 'ཪ',
19: 'ྚ',
20: '྿',
21: 'ཱུ',
22: 'ཱི',
23: '࿀',
24: '࿁',
25: '࿂',
26: '࿃',
29: '࿄',
30: '࿅',
31: 'ྜ',
32: 'བྷ',
33: '࿆',
34: '࿇',
35: '࿈',
36: 'གྷ',
37: '࿉',
38: '࿊',
39: '࿋',
27: 'ཛྷ',
42: '࿌',
43: 'ྵ',
44: 'ྐྵ',
45: '༶',
46: 'ྂ',
47: 'ྞ',
48: 'དྷ',
49: 'ྛ',
50: 'ྋ',
51: 'ྊ',
}},
维:{书写方向:2,
按键分布表:[["~\n`","!\n1","@\n2","#\n3","¥\n4","%\n5","^\n6","&\n7","*\n8",")\n9","(\n0","_\n-","+\n=","回删"],
["制表","چ","ۋ","ې","ر","ت","ي","ۇ","ڭ","و","پ","»\n]","«\n[","|\n\\"],
["大写锁定","ھ","س","ژ\nد","ف\nا","گ\nە","خ\nى","ج\nق","ۆ\nك","لا\nل",":\n؛","\"\n'","换行"],
["上排","ز","ش","غ","ۈ","ب","ن","م",">\n،","<\n.","؟\nٸ","上排"],
["控制","系统","更改"," ","更改","系统","选项","控制"]]},
哈:{书写方向:2,
按键分布表:[["~\n`","!\n1","@\n2","#\n3","¥\n4","%\n5","^\n6","&\n7","*\n8",")\n9","(\n0","_\n-","+\n=","回删"],
["制表","چ","ۋ","ٴ","ر","ت","ي","ۇ","ڭ","و","پ","»\n]","«\n[","|\n\\"],
["大写锁定","ھ","س","د","ف\nا","گ\nە","ح\nى","ج\nق","ك","لا\nل",":\n؛","\"\n'","换行"],
["上排","ز","ش","ع","ۆ","ب","ن","م",">\n،","<\n.","؟\n/","上排"],
["控制","系统","更改"," ","更改","系统","选项","控制"]]},
柯:{书写方向:2,
按键分布表:[["~\n`","!\n1","@\n2","#\n3","¥\n4","%\n5","^\n6","&\n7","*\n8",")\n9","(\n0","_\n-","+\n=","回删"],
["制表","چ","ۋ","ح","ر","ت","ي","ۇ","ڭ","و","پ","»\n]","«\n[","|\n\\"],
["大写锁定","ۅ","س","د","ف\nا","گ\nە","ى","ج\nق","ك","لا\nل",":\n؛","\"\n'","换行"],
["上排","ز","ش","ع","ۉ","ب","ن","م",">\n،","<\n.","؟\nئ","上排"],
["控制","系统","更改"," ","更改","系统","选项","控制"]]}
}