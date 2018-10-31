<template>
  <div>
    <el-form ref="ruleForm2" :model="ruleForm2" :rules="rules2" status-icon label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm2.username" @keyup.enter="handleEsc" />
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input v-model="ruleForm2.pass" type="password" />
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input v-model="ruleForm2.checkPass" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
        <el-button @click="resetForm('ruleForm2')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addUser } from '@/api/user'
export default {
  name: 'RegisterForm',
  data() {
    const validateUserName = (rule, value, callback) => {
      if (!/^[a-zA-Z0-9]+$/.test(value)) {
        callback(new Error('用户名由大小写字母和数字组成'))
      } else {
        callback()
      }
    }

    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm2: {
        pass: '',
        checkPass: '',
        username: ''
      },
      rules2: {
        pass: [
          { type: 'string', min: 6, max: 12, message: '密码的长度在6至12之间' },
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { type: 'string', min: 6, max: 12, message: '密码的长度在6至12之间' },
          { validator: validatePass2, trigger: 'blur' }
        ],
        username: [
          { type: 'string', min: 6, max: 12, message: '用户名的长度在6至12之间' },
          { validator: validateUserName, trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm2)
          const userName = this.ruleForm2.username
          const pwd = this.ruleForm2.pass
          addUser(userName, pwd).then(response => {
            if (response.code === 10003) {
              const errorMessageStr = response.data.errorMessage
              console.log(errorMessageStr)
              console.log(response.code)
              const errorMessageObj = JSON.parse(errorMessageStr)
              console.log(errorMessageObj)
              var errorStr = ''
              for (const key in errorMessageObj) {
                errorStr += errorMessageObj[key]
              }
              this.$message.error(errorStr)
            }
            if (response.code === 20000) {
              const un = response.data.user.username
              this.$message.success('创建用户' + un + '成功')
              this.$emit('close', 'false', 123)
            }
          }).catch(error => {
            console.log(error)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleEsc() {
      console.log('sss')
    }
  }
}
</script>

<style scoped>

</style>
