<script setup lang="ts">
import { ADD_CONTACT_MUTATION, UPDATE_CONTACT_MUTATION } from '@/mutations/contact'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons-vue'
import { useMutation } from '@vue/apollo-composable'
import { Button, Col, Form, Input, Row, notification } from 'ant-design-vue'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  id: String,
  initialValue: Object,
})

const router = useRouter()

interface FormState {
  fullName: string
  nickName?: string
  postalCode?: string
  phoneNumber: string
  email?: string
  addresses: any[]
}

const formState = reactive<FormState>(
  props.initialValue
    ? JSON.parse(JSON.stringify(props.initialValue))
    : {
        fullName: '',
        phoneNumber: '',
        addresses: [],
      },
)

const { mutate: saveContact, loading } = useMutation(
  props.id ? UPDATE_CONTACT_MUTATION : ADD_CONTACT_MUTATION,
)

const normalizePostalCode = (address: any) => {
  address.postalCode = address.postalCode.replace(/\D/g, '')
}

const addAddress = () => {
  if (formState.addresses) {
    formState.addresses.push({
      street: '',
      city: '',
      district: '',
      subDistrict: '',
      postalCode: '',
    })
  } else {
    formState.addresses = [
      {
        street: '',
        city: '',
        district: '',
        subDistrict: '',
        postalCode: '',
      },
    ]
  }
}

const removeAddress = (index: number) => {
  formState?.addresses?.splice(index, 1)
}

const onFinish = async (values: any) => {
  try {
    const result = await saveContact({
      ...values,
      id: props.id,
    })
    if (result?.errors) {
      throw result
    }
    notification.success({
      message: 'Success',
      description: 'Contact saved successfully',
    })
    router.replace('/contacts')
  } catch (error: any) {
    if (error.errors) {
      notification.error({
        message: 'Error',
        description: error.errors.errorMsg,
      })
    } else {
      notification.error({
        message: 'Error',
        description: error.message || 'Add Contact failed, please try again.',
      })
    }
  }
}
</script>

<template>
  <Form :model="formState" layout="vertical" @finish="onFinish">
    <Form.Item name="fullName" :rules="[{ required: true }]">
      <Input v-model:value="formState.fullName" placeholder="Full Name" />
    </Form.Item>

    <Form.Item name="nickName">
      <Input v-model:value="formState.nickName" placeholder="Nick Name" />
    </Form.Item>

    <Form.Item name="phoneNumber" :rules="[{ required: true }]">
      <Input v-model:value="formState.phoneNumber" placeholder="Phone Number" />
    </Form.Item>

    <Form.Item name="email">
      <Input v-model:value="formState.email" placeholder="Email" />
    </Form.Item>

    <Form.Item v-for="(address, index) in formState.addresses" :key="index">
      <Row :gutter="[16, 16]">
        <Col :span="1">
          <span>{{ index + 1 }}.</span>
        </Col>
        <Col :span="20">
          <Form.Item :name="['addresses', index, 'street']" :rules="[{ required: true }]">
            <Input v-model:value="address.street" placeholder="Street" />
          </Form.Item>
        </Col>
        <Col :span="2">
          <MinusCircleOutlined @click="removeAddress(index)" />
        </Col>
      </Row>
      <Row :gutter="[16, 16]">
        <Col :span="1"> </Col>
        <Col :span="10">
          <Form.Item :name="['addresses', index, 'city']">
            <Input v-model:value="address.city" placeholder="City" />
          </Form.Item>
        </Col>
        <Col :span="10">
          <Form.Item :name="['addresses', index, 'district']">
            <Input v-model:value="address.district" placeholder="District" />
          </Form.Item>
        </Col>
      </Row>
      <Row :gutter="[16, 16]">
        <Col :span="1"> </Col>
        <Col :span="10">
          <Form.Item :name="['addresses', index, 'subDistrict']">
            <Input v-model:value="address.subDistrict" placeholder="Sub District" />
          </Form.Item>
        </Col>
        <Col :span="10">
          <Form.Item :name="['addresses', index, 'postalCode']">
            <Input
              v-model:value="address.postalCode"
              placeholder="Postal Code"
              @input="normalizePostalCode(address)"
            />
          </Form.Item>
        </Col>
      </Row>
    </Form.Item>

    <Form.Item>
      <Button type="dashed" block @click="addAddress"> <PlusOutlined /> Add Address </Button>
    </Form.Item>

    <Form.Item>
      <Button type="primary" html-type="submit" block :loading="loading">Save</Button>
    </Form.Item>
  </Form>
</template>

<style scoped></style>
