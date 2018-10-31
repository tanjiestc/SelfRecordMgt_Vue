<template>
  <div class="app-container">
    <el-table
      :data="userList"
      border
    >
      <el-table-column
        prop="username"
        label="用户名"
        width="180"/>
      <el-table-column
        prop="authorities"
        label="权限"
        width="180"/>
      <el-table-column label="密码修改时间">
        <template slot-scope="scope">
          {{ new Date(scope.row.lastPasswordChange).toLocaleString() }}
        </template>
      </el-table-column>
      <el-table-column label="是否可登录">
        <template slot-scope="scope">
          {{ scope.row.enable ? '是' : '否' }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button :ref="scope.row.username" :type="scope.row.enable ? 'primary':'success'" :key="scope.row.username" size="mini" @click="handleEnable(scope.row)"> {{ scope.row.enable ? '禁用':'激活' }} </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { list, changeEnable } from '@/api/user'
export default {
  name: 'List',
  data() {
    return {
      userList: [],
      enable: 'true',
      currentClickBtn: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList: function() {
      list().then(res => {
        console.log(res)
        this.userList = res.data.userList
      })
    },
    handleEnable: function(row) {
      const un = row.username
      const enable = !row.enable
      const e = this.$refs[un]
      e.loading = true
      changeEnable(un, enable).then(res => {
        console.log(res)
        e.loading = false
        this.getList()
      }).catch(err => {
        e.loading = false
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>

</style>
