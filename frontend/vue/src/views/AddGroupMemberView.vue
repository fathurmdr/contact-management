<script setup lang="ts">
import BackButton from '@/components/BackButton.vue'
import { Breadcrumb, Form, Select, Button, notification } from 'ant-design-vue'
import { reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuery, useMutation } from '@vue/apollo-composable'
import { GET_CONTACTS_QUERY } from '@/queries/contact'
import { ADD_GROUP_MEMBER_MUTATION } from '@/mutations/group'

const router = useRouter()
const route = useRoute()

const { result, loading: loadingContacts } = useQuery(GET_CONTACTS_QUERY, null, {
  fetchPolicy: 'no-cache',
})

interface FormState {
  contactId?: number
}

const formState = reactive<FormState>({})

const { mutate: saveGroupMember, loading } = useMutation(ADD_GROUP_MEMBER_MUTATION)

const onFinish = async (values: any) => {
  try {
    const result = await saveGroupMember({
      ...values,
      id: route.params.id,
    })
    if (result?.errors) {
      throw result
    }
    notification.success({
      message: 'Success',
      description: 'Group Member added successfully',
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
        description: error.message || 'Add Group Member failed, please try again.',
      })
    }
  }
}
</script>

<template>
  <div class="mb-6 flex items-center justify-between px-6">
    <Breadcrumb>
      <Breadcrumb.Item>
        <RouterLink to="/groups" class="font-semibold">Groups</RouterLink>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <h1 class="font-semibold">Add</h1>
      </Breadcrumb.Item>
    </Breadcrumb>
    <BackButton />
  </div>
  <div class="overflow-y-auto p-6">
    <Form :model="formState" layout="vertical" @finish="onFinish">
      <Form.Item name="contactId" :rules="[{ required: true }]">
        <Select
          v-model:value="formState.contactId"
          placeholder="Contact"
          :loading="loadingContacts"
        >
          <Select.Option
            v-for="contact in result?.contacts ?? []"
            :key="contact.id"
            :value="contact.id"
          >
            {{ contact.fullName }}
          </Select.Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" html-type="submit" block :loading="loading">Save</Button>
      </Form.Item>
    </Form>
  </div>
</template>

<style scoped></style>
