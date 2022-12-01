import * as React from 'react'

import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css'; // optional for styling

import { readFileSync } from 'fs'
import path from "path"
import Select from 'react-select'

import { AiFillSetting, AiFillCloseCircle } from 'react-icons/ai'
import { ImShuffle } from 'react-icons/im'

const VERSION = '1.0.0'

export default function Home(data) {

  /**
   * 设置项
   */
  //默认设置
  var settings = {
    "model": null,
    "custom_model": []
  };
  //词组模型设置
  var modelList = Object.keys(data.data.libs);
  const modelOptions = [{"value":"random","label":"随机模型"}]
  modelList.forEach((e)=>{
    modelOptions.push({
      "value": e,
      "label": data.data.libs[e].name
    })
  })
  //自定义模型设置 - 显示所有词库
  var libList = Object.keys(data.data.words);
  const customModelOptions = []
  libList.forEach((e)=>{
    customModelOptions.push({
      "value": e,
      "label": e
    })
  })
  
  /**
   * 核心代码
   */
  var inspireTimes=0;
  var inspire = () => {
    const text = document.getElementById('inspiration');

    function getRandomWord(lib){
      //获取词库
      var words = data.data.words[lib];
      //获取随机数
      var range = words.length;
      var rand = Math.random();
      var num = (Math.round(rand*range));

      return words[num];
    }

    function getRandomModel(){
      //获取词组模型列表
      var libs = Object.keys(data.data.libs);
      //获取随机数
      var range = libs.length-1;
      var rand = Math.random();
      var num = (Math.round(rand*range));

      return libs[num];
    }

    try {
      //开始生成词组
      var output='';
      //获取词组模型
      var model;
      if(settings.model==null || settings.model=='random'){
        model = data.data.libs[getRandomModel()]
      }else{
        model = data.data.libs[settings.model]
      }
      var word_list=[]; var i=0; //用于查重去重
      //获取词组格式
      if(settings.custom_model.length==0) {
        var format = model["format"];
      }else{
        var format = settings.custom_model
      }
      //生成词组
      format.forEach((e) => {
        var repeat = true;
        while(repeat) {
          var word = getRandomWord(e);
          if(i!=0 && word_list[i-1]==word || word==undefined || word==''){
            repeat=true;
          }else{
            output += '<span>'+word+'</span>';
            word_list.push(word);
            repeat=false;
          }
        }
        i++
      });
    } catch(e) {
      console.log(e)
    }

    text.innerHTML = output;

    const keyTip = document.getElementById('key-tip')
    if(inspireTimes>10){
      const keyTip = document.getElementById('key-tip')
      keyTip.classList.remove('opacity-0')
    }else{
      keyTip.classList.add('opacity-0')
      inspireTimes++;
    }
  }

  var shuffle = () => {
    const text = document.getElementById('inspiration');
    text.classList.toggle('flex-row-reverse')

    const shuffleBtn = document.getElementById('shuffle-btn');
    shuffleBtn.childNodes[0].classList.toggle("rotate-180")
  }

  /**
   * 绑定事件
   */
  React.useEffect(()=>{

    /**
     * 绑定核心代码
     */
    inspire();

    const btn = document.getElementById('inspire');
    btn?.addEventListener("click", inspire);
    const text = document.getElementById('inspiration');
    text?.addEventListener("click", inspire);

    const shuffleBtn = document.getElementById('shuffle-btn');
    shuffleBtn?.addEventListener("click", shuffle);

    /**
     * 窗口开关
     */
    const overlay = document.getElementById('overlay');
    const setting = document.getElementById('setting');
    //打开窗口
    function openSetting() {
      overlay?.classList.remove('hidden');
      setting?.classList.remove('hidden')
    }
    //关闭窗口
    function closeSetting() {
      overlay?.classList.add('hidden');
      setting?.classList.add('hidden')
    }

    const settingBtn = document.getElementById('setting-btn');
    settingBtn?.addEventListener("click", openSetting);

    const closeBtn = document.getElementById('close-btn');
    closeBtn?.addEventListener("click", closeSetting);
    
    //保存设置
    const saveBtn = document.getElementById('save-setting');
    saveBtn?.addEventListener("click", closeSetting);

    //使用 tippy
    tippy('[data-tippy-content', {
      placement: "bottom"
    })

    /**
     * 快捷键
     */
    document.onkeydown = () => {
      if ( event.keyCode=='32' ) inspire()
      if ( event.keyCode=='17' ) shuffle()
      inspireTimes=0;
    }
  }, [])
  
  return (
    <div id="page">

      <main className="flex flex-col justify-between items-center w-full min-h-screen text-center
      md:justify-center z-10">
        <header className="my-3 md:my-4">
          <h1 className="font-semibold text-gray-600 text-lg">怪奇灵感生成器</h1>
          <p className="text-sm text-gray-500 md:hidden">
            <span className="bg-gray-200 px-1 rounded-sm">v{VERSION}</span>
          </p>
        </header>
        <div className="font-bold text-gray-800 tracking-wider px-4">
          <p className="select-none text-3xl md:text-6xl my-2">我想到了</p>
          <p className="text-gray-600 text-5xl font-normal md:text-6xl flex-wrap flex justify-center" id="inspiration">什么呢？</p>
        </div>
        <div className="my-4 md:my-8 flex gap-2 flex-row-reverse md:flex-row z-10" id="action">
          <button className="rounded-full py-2 px-3 bg-gray-100 text-gray-700 text-xl border
          shadow hover:shadow-md hover:bg-gray-200 transition duration-300 select-none z-10 mb-14 md:mb-0" 
          id="shuffle-btn" data-tippy-content="倒转语序">
            <span className="transition duration-300 block"><ImShuffle /></span>
          </button>

          <button className="rounded-full py-2 px-6 bg-gray-700 text-white z-10 mb-14 md:mb-0
          shadow hover:shadow-lg hover:bg-gray-900 transition duration-300 select-none" 
          id="inspire">想一想</button>

          <button className="rounded-full py-2 px-3 bg-gray-100 text-gray-700 text-xl border
          shadow hover:shadow-md hover:bg-gray-200 transition duration-300 select-none
          fixed top-4 left-4 md:static" 
          id="setting-btn" data-tippy-content="设置项"><AiFillSetting /></button>
        </div>
        <p id="key-tip" className="text-gray-400 opacity-0 transition duration-300
        hidden md:block">使用 [空格] 来快速生成词组，使用 [ctrl] 来快速翻转词组</p>
      </main>

      <aside>
        <div id="overlay" className="fixed inset-0 bg-gray-900/40 z-40 hidden" />
        <div id="setting" className="fixed z-50 bg-white rounded-lg shadow-lg overflow-hidden hidden">
          <div id="setting-head" className="flex justify-between items-center text-xl py-2 px-5 border-b border-gray-300">
            <h2 className="flex items-center gap-3 text-md mt-1">设置</h2>
            <button className="text-2xl text-gray-600 mt-1" id="close-btn"><AiFillCloseCircle /></button>
          </div>
          <div id="setting-content" className="p-5 py-2 overflow-y-auto" style={{minHeight: 'calc(80vh - 3rem)'}}>

            <label className="text-lg my-2 block">词组模型</label>
            <Select id="model-option" options={modelOptions} defaultValue={modelOptions[0]} 
            onChange={(choice)=>{settings.model=choice.value}} placeholder="选择一个词组模型..." />
            <p className="text-gray-600 my-2 text-sm">决定生成什么样的词组或句子。若自定义模型设置项不为空，则此项不生效。</p>

            <label className="text-lg my-2 block">自定义模型</label>
            <Select options={customModelOptions} isMulti placeholder="按照顺序添加元素..."
            onChange={(choice)=>{
              settings.custom_model=[];
              choice.forEach((e) => {
                settings.custom_model.push(e.value)
              })
            }} />
            <p className="text-gray-600 my-2 text-sm">adjective 为“形容词”，verb-i 为不及物动词，verb-t 为及物动词，abstruct 为抽象名词，concrete 为具象名词，place 为地点副词。</p>

            <button id="save-setting" className="block p-3 py-2 rounded bg-gray-700 text-white w-full mt-3
            transition duration-300 hover:bg-gray-900">应用</button>
          </div>
        </div>
        <style jsx>{`
        #setting {
          left: 1rem;
          right: 1rem;
          top: 50%;
          height: 90vh;
          margin-top: -45vh
        }
        @media screen and (min-width: 768px) {
          #setting {
            width: 30rem;
            height: 80vh; 
            margin-top: -40vh; 
            margin-left: -15rem;
            left: 50%;
            top: 50%
          }
        }
        `}</style>
      </aside>

      <footer className="absolute inset-x-0 bottom-0 w-full text-gray-400 text-sm p-4 z-0
      flex flex-row justify-between">
        <p>版本: v{VERSION}</p>
        <p>作者 <a href="https://guhub.cn" rel="noreferrer" target="_blank"
        className="underline underline-offset-4">Eltrac</a></p>
      </footer>

    </div>
  )
}

export async function getStaticProps() {

  const words = readFileSync(path.join(process.cwd(), 'data', `words.json`), 'utf-8');
  const libs = readFileSync(path.join(process.cwd(), 'data', `library.json`), 'utf-8');

  return {
    props: {
      data: {
        "words": JSON.parse(words),
        "libs": JSON.parse(libs)
      },
    },
  }

}