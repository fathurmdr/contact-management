<script setup lang="ts">
import { reactive } from 'vue'
import { useMutation } from '@vue/apollo-composable'
import { Form, Input, Button, message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import gql from 'graphql-tag'

const router = useRouter()

const REGISTER_MUTATION = gql`
  mutation Register(
    $name: String!
    $email: String!
    $phoneNumber: String!
    $bio: String
    $password: String!
  ) {
    register(name: $name, email: $email, phoneNumber: $phoneNumber, bio: $bio, password: $password)
  }
`

interface FormState {
  name: string
  email: string
  phoneNumber: string
  bio: string
  password: string
}

const formState = reactive<FormState>({
  name: '',
  email: '',
  phoneNumber: '',
  bio: '',
  password: '',
})

const { mutate: register, loading } = useMutation(REGISTER_MUTATION)

const onFinish = async (values: any) => {
  try {
    const result = await register({
      name: values.name,
      email: values.email,
      phoneNumber: values.phoneNumber,
      bio: values.bio || null,
      password: values.password,
    })

    if (result?.data?.register) {
      message.success('Registration successful! Please sign in.')
      router.push('/sign-in')
    }
  } catch (error: any) {
    message.error(error.message || 'Registration failed, please try again.')
  }
}
</script>

<template>
  <div class="flex min-h-screen w-full max-w-96 items-center justify-center">
    <main class="row-start-2 flex w-full flex-col items-center gap-8 sm:items-start">
      <h1 class="w-full text-center text-3xl font-semibold">Sign Up</h1>
      <Form :model="formState" class="w-full" layout="vertical" @finish="onFinish">
        <Form.Item name="name" :rules="[{ required: true }]">
          <Input v-model:value="formState.name" placeholder="Full Name" />
        </Form.Item>
        <Form.Item name="email" :rules="[{ required: true }]">
          <Input v-model:value="formState.email" placeholder="Email" />
        </Form.Item>
        <Form.Item name="phoneNumber" :rules="[{ required: true }]">
          <Input v-model:value="formState.phoneNumber" placeholder="Phone Number" />
        </Form.Item>
        <Form.Item name="bio">
          <Input v-model:value="formState.bio" placeholder="Bio (Optional)" />
        </Form.Item>
        <Form.Item name="password" :rules="[{ required: true }]">
          <Input.Password
            v-model:value="formState.password"
            placeholder="Password"
            autoComplete="new-password"
          />
        </Form.Item>
        <Form.Item class="!mb-0 !mt-12 w-full">
          <Button htmlType="submit" type="primary" class="w-full" :loading="loading">
            Sign Up
          </Button>
        </Form.Item>
      </Form>
      <div class="flex w-full items-center justify-center">
        <p>Already have an account?</p>
        <RouterLink to="/sign-in">
          <Button type="link"> Sign In </Button>
        </RouterLink>
      </div>
    </main>
  </div>
</template>
