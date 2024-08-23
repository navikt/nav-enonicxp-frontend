(self.webpackChunknav_enonicxp_frontend=self.webpackChunknav_enonicxp_frontend||[]).push([[1326],{"./src/components/_common/image/NextImageBuildTime.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{NextImageBuildTime:()=>NextImageBuildTime});var _object_spread=__webpack_require__("./node_modules/@swc/helpers/esm/_object_spread.js"),_object_spread_props=__webpack_require__("./node_modules/@swc/helpers/esm/_object_spread_props.js"),_object_without_properties=__webpack_require__("./node_modules/@swc/helpers/esm/_object_without_properties.js"),jsx_runtime=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js"),pageContext=(__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),__webpack_require__("./src/store/pageContext.tsx")),fs_ignored_=__webpack_require__("?042d"),fs_ignored_default=__webpack_require__.n(fs_ignored_);class Node{value;next;constructor(value){this.value=value}}class Queue{#head;#tail;#size;constructor(){this.clear()}enqueue(value){const node=new Node(value);this.#head?(this.#tail.next=node,this.#tail=node):(this.#head=node,this.#tail=node),this.#size++}dequeue(){const current=this.#head;if(current)return this.#head=this.#head.next,this.#size--,current.value}peek(){if(this.#head)return this.#head.value}clear(){this.#head=void 0,this.#tail=void 0,this.#size=0}get size(){return this.#size}*[Symbol.iterator](){let current=this.#head;for(;current;)yield current.value,current=current.next}}var srcCommon_logger=__webpack_require__("./srcCommon/logger.ts"),process=__webpack_require__("./node_modules/process/browser.js");(function pLimit(concurrency){if(!Number.isInteger(concurrency)&&concurrency!==Number.POSITIVE_INFINITY||!(concurrency>0))throw new TypeError("Expected `concurrency` to be a number from 1 and up");const queue=new Queue;let activeCount=0;const resumeNext=()=>{queue.size>0&&(queue.dequeue()(),activeCount++)},run=async(function_,resolve,arguments_)=>{const result=(async()=>function_(...arguments_))();resolve(result);try{await result}catch{}activeCount--,resumeNext()},generator=(function_,...arguments_)=>new Promise((resolve=>{((function_,resolve,arguments_)=>{new Promise((internalResolve=>{queue.enqueue(internalResolve)})).then(run.bind(void 0,function_,resolve,arguments_)),(async()=>{await Promise.resolve(),activeCount<concurrency&&resumeNext()})()})(function_,resolve,arguments_)}));return Object.defineProperties(generator,{activeCount:{get:()=>activeCount},pendingCount:{get:()=>queue.size},clearQueue:{value(){queue.clear()}}}),generator})(5);const manifestDir=void 0!==process.env?"../.next/image-cache":".",manifestFile=`${manifestDir}/image-manifest`;var NextImage=__webpack_require__("./src/components/_common/image/NextImage.tsx");const NextImageBuildTime=props=>{const{src,alt,maxWidth=1440,quality=90}=props,imgAttribs=(0,_object_without_properties._)(props,["src","alt","maxWidth","quality"]),{editorView}=(0,pageContext.i)();if(!src)return null;const cachedSrc=(0,NextImage.x)({src,maxWidth,quality,isEditorView:!!editorView});return(src=>{fs_ignored_default().existsSync(manifestDir)||(srcCommon_logger.v.info(`Creating image manifest dir ${manifestDir}`),fs_ignored_default().mkdirSync(manifestDir,{recursive:!0})),fs_ignored_default().appendFile(manifestFile,`${src}\n`,{encoding:"utf-8"},(e=>{e?srcCommon_logger.v.error(`Error while appending to image manifest - ${e}`):srcCommon_logger.v.info(`Appended ${src} to image manifest`)}))})(cachedSrc),(0,jsx_runtime.jsx)("img",(0,_object_spread_props._)((0,_object_spread._)({},imgAttribs),{src:cachedSrc,alt}))};try{NextImageBuildTime.displayName="NextImageBuildTime",NextImageBuildTime.__docgenInfo={description:"",displayName:"NextImageBuildTime",props:{src:{defaultValue:null,description:"",name:"src",required:!1,type:{name:"string"}},alt:{defaultValue:null,description:"",name:"alt",required:!1,type:{name:"string"}},maxWidth:{defaultValue:null,description:"",name:"maxWidth",required:!1,type:{name:"enum",value:[{value:"480"},{value:"768"},{value:"1024"},{value:"1440"},{value:"16"},{value:"32"},{value:"48"},{value:"64"},{value:"96"},{value:"128"},{value:"256"},{value:"384"}]}},quality:{defaultValue:null,description:"",name:"quality",required:!1,type:{name:"number"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/_common/image/NextImageBuildTime.tsx#NextImageBuildTime"]={docgenInfo:NextImageBuildTime.__docgenInfo,name:"NextImageBuildTime",path:"src/components/_common/image/NextImageBuildTime.tsx#NextImageBuildTime"})}catch(__react_docgen_typescript_loader_error){}},"?042d":()=>{}}]);