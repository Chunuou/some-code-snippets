<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { Plus, Delete } from '@element-plus/icons-vue'

interface Form {
  name: string
  email: string
  experience: Array<Experience>
}

interface Experience {
  id: string
  timeRange: [string | Date, string | Date]
  detail: string
}

const formRef = ref<FormInstance>()

const form = ref<Form>({
  name: '姓名',
  email: 'none@none.com',
  experience: [{ id: Date.now().toString(), timeRange: ['', ''], detail: '' }]
})

const formRules = shallowRef<FormRules<Form>>({
  name: [{ required: true, message: '请输入姓名' }],
  email: [
    { required: true, message: '请输入邮箱' },
    { type: 'email', message: '请输入正确德邮箱' }
  ],
  experience: [
    {
      type: 'array',
      required: true,
      message: '最少填写一段经历',
      defaultField: {
        type: 'object',
        fields: {
          timeRange: [
            {
              type: 'array',
              required: true,
              message: '请选择时期',
              fields: {
                0: { type: 'date', required: true, message: '请选择时期' },
                1: { type: 'date', required: true, message: '请选择时期' }
              }
            }
          ],
          detail: [{ required: true, message: '请输入详情' }]
        }
      }
    }
  ]
})

function handleDeleteExperience(index: number) {
  form.value.experience.splice(index, 1)
}

function handleAddExperience() {
  form.value.experience.push({ id: Date.now().toString(), timeRange: ['', ''], detail: '' })
}

function handleSubmmit(formRef: FormInstance | undefined) {
  formRef?.validate((isValid, invalidFields) => {
    console.log(form)
    console.log(isValid)
    console.log(invalidFields)
  })
}
</script>

<template>
  <div style="width: 800px; padding: 10px">
    <el-form ref="formRef" :model="form" :rules="formRules" label-width="auto">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>

      <el-form-item label="经历" prop="experience">
        <el-row v-for="(item, index) in form.experience" :key="item.id" :gutter="10">
          <el-col :span="10">
            <el-form-item label="时期" :prop="`experience[${index}].timeRange`">
              <el-date-picker v-model="item.timeRange" type="daterange" range-separator="-" />
            </el-form-item>
          </el-col>

          <el-col :span="10">
            <el-form-item label="详情" :prop="`experience[${index}].timeRange`">
              <el-input v-model="item.detail" />
            </el-form-item>
          </el-col>

          <el-col :span="4">
            <el-button v-if="form.experience.length > 1" @click="handleDeleteExperience(index)">
              <el-icon><Delete /></el-icon>
            </el-button>
          </el-col>
        </el-row>

        <el-button type="primary" plain @click="handleAddExperience">
          <el-icon><Plus /></el-icon>添加
        </el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleSubmmit(formRef)"> 提交 </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
