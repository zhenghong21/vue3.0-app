<script setup>
import HelloWorld from './components/HelloWorld.vue'
import { onMounted, getCurrentInstance, reactive } from 'vue'
import { postFormDetailsSearch } from './api/index'
const { appContext } = getCurrentInstance()
let formData = reactive({})
// 获取表单详情内容
function getEsFormsData () {
  let params = {
    size: 1,
    query: {
      bool: {
        must: [
          {
            term: {
              productid: 'bf8d42bc-7541-44f2-99b8-558d7aabe0bf' // 基本公卫
            }
          },
          {
            term: {
              areaid: '00' // 北京市表单
            }
          },
          {
            term: {
              formtypeid: '100205' // 加载哪一个表单
            }
          }
        ]
      }
    }
  }
  postFormDetailsSearch(params).then(res => {
    let { total = 0, hits = [] } = (res.data && res.data.hits) || {}
    if (total > 0) {
      if (hits[0]._source.form) {
        formData = handleStringFormData(hits[0]._source.form)
        console.log('请求成功课吗', formData)
        // this.loadingRulesData()
      }
    }
  })
}

// 处理表单文件
function handleStringFormData (newVal, type = '') {
  if (!newVal) {
    return
  } else {
    let resultData = type == 'onLine' ? JSON.stringify(newVal) : newVal
    let previewFormData = JSON.parse(resultData, (k, v) => {
      if (typeof v === 'string' && v.indexOf && v.indexOf('function') > -1) {
        return eval('(function(){return ' + v + ' })()')
      }
      return v
    })

    return previewFormData
  }
}
// console.log('proxy')
getEsFormsData()
// console.log('表单的数据', formData.value)
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld :formData="formData" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
