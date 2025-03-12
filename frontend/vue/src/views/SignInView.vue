<script setup lang="ts">
import { reactive } from 'vue'
import { useMutation } from '@vue/apollo-composable'
import { Form, Input, Button, message } from 'ant-design-vue'
import gql from 'graphql-tag'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

const LOGIN_MUTATION = gql`
  mutation login($emailOrPhoneNumber: String!, $password: String!) {
    login(emailOrPhoneNumber: $emailOrPhoneNumber, password: $password) {
      sessionId
      expiresAt
    }
  }
`

interface FormState {
  emailOrPhoneNumber: string
  password: string
}

const formState = reactive<FormState>({
  emailOrPhoneNumber: '',
  password: '',
})

const { mutate: login, loading } = useMutation(LOGIN_MUTATION)

const onFinish = async (values: any) => {
  try {
    const result = await login({
      emailOrPhoneNumber: values.emailOrPhoneNumber,
      password: values.password,
    })

    if (result?.data?.login) {
      authStore.setSessionId(result.data.login.sessionId)
      router.replace('/contacts')
    }
  } catch (error: any) {
    message.error(error.message || 'Login failed, please try again.')
  }
}
</script>

<template>
  <div class="flex min-h-screen w-full max-w-96 items-center justify-center">
    <main class="row-start-2 flex w-full flex-col items-center gap-8 sm:items-start">
      <h1 class="w-full text-center text-3xl font-semibold">Sign In</h1>
      <Form :model="formState" class="w-full" layout="vertical" @finish="onFinish">
        <Form.Item name="emailOrPhoneNumber" :rules="[{ required: true }]">
          <Input v-model:value="formState.emailOrPhoneNumber" placeholder="Email or Phone Number" />
        </Form.Item>
        <Form.Item name="password" :rules="[{ required: true }]">
          <Input.Password
            v-model:value="formState.password"
            placeholder="Password"
            autoComplete="current-password"
          />
        </Form.Item>
        <Form.Item class="!mb-0 !mt-12 w-full">
          <Button htmlType="submit" type="primary" class="w-full" :loading="loading">
            Sign In
          </Button>
        </Form.Item>
      </Form>
      <div class="flex w-full items-center justify-center">
        <p>Does not have an account?</p>
        <RouterLink to="/sign-up">
          <Button type="link"> Sign Up </Button>
        </RouterLink>
      </div>
    </main>
  </div>
</template>
