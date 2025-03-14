<script setup lang="ts">
import { ADD_GROUP_MUTATION, UPDATE_GROUP_MUTATION } from '@/mutations/group'
import { useMutation } from '@vue/apollo-composable'
import { Button, Form, Input, notification } from 'ant-design-vue'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  id: String,
  initialValue: Object,
})

const router = useRouter()

interface FormState {
  name: string
  description?: string
}

const formState = reactive<FormState>(
  props.initialValue
    ? JSON.parse(JSON.stringify(props.initialValue))
    : {
        name: '',
      },
)

const { mutate: saveGroup, loading } = useMutation(
  props.id ? UPDATE_GROUP_MUTATION : ADD_GROUP_MUTATION,
)

const onFinish = async (values: any) => {
  try {
    const result = await saveGroup({
      ...values,
      id: props.id,
    })
    if (result?.errors) {
      throw result
    }
    notification.success({
      message: 'Success',
      description: 'Group saved successfully',
    })
    router.replace('/groups')
  } catch (error: any) {
    if (error.errors) {
      notification.error({
        message: 'Error',
        description: error.errors.errorMsg,
      })
    } else {
      notification.error({
        message: 'Error',
        description: error.message || 'Save Group failed, please try again.',
      })
    }
  }
}
</script>

<template>
  <Form :model="formState" layout="vertical" @finish="onFinish">
    <Form.Item name="name" :rules="[{ required: true }]">
      <Input v-model:value="formState.name" placeholder="Name" />
    </Form.Item>

    <Form.Item name="description">
      <Input v-model:value="formState.description" placeholder="Description" />
    </Form.Item>

    <Form.Item>
      <Button type="primary" html-type="submit" block :loading="loading">Save</Button>
    </Form.Item>
  </Form>
</template>

<style scoped></style>
