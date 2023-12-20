<script setup>
import { ref, watch, watchEffect, reactive, computed } from 'vue'
const input = ref('')
function blurClick () {
  // console.log('打印数据室', input.value)
}
const myValue = reactive({})
const props = defineProps(['formData'])
console.log('propsprops', props.formData)
watch(
  () => props.formData,
  newValue => {
    console.log('更新表单的数据了恶霸', newValue)
  },
  { flush: 'post' }
)
const publishedBooksMessage = computed(() => {
  return props.formData
})
console.log('publishedBooksMessage', publishedBooksMessage)
// watchEffect(() => {
//   console.log('props.formData', props.formData)
// })
</script>

<template>
  <el-input v-model="input" placeholder="Please input" @blur="blurClick" />
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
