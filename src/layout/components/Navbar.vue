<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <div class="app-breadcrumb">
      {{ $t('navbar.companyName') }}
      <span class="breadBtn">{{ $t('navbar.version') }}</span>
    </div>
    <!-- <breadcrumb class="breadcrumb-container" /> -->

    <div class="right-menu">
      <lang class="right-menu-item" />
      <screen-full class="right-menu-item" />
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <!-- <img v-imgError="defaultImg" src="@/assets/common/bigUserHeader.png" class="user-avatar"> -->
          <!-- 事件onerror：触发时机，当图片加载失败的时候自动触发这个函数 -->
          <img
            v-imgError="defaultImg"
            :src="staffPhoto"
            class="user-avatar"
          >
          <span class="name">{{ name }}</span>
          <i class="el-icon-caret-bottom" style="color: #fff" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item> {{ $t('navbar.dashboard') }} </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'
import defaultImg from '@/assets/common/bigUserHeader.png'
import { resetRouter } from '@/router'

export default {
  components: {
    Hamburger
  },
  data() {
    return {
      // webpack不支持
      // 如果在脚手架的环境 想使用本地图片当成默认图，先把图片进行导入，然后在使用
      defaultImg
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar', 'name', 'staffPhoto'])
  },
  created() {
    // this.$store.dispatch('user/getUserInfo')
  },
  methods: {
    // errorEvent(e) {
    //   // console.log('图片加载失败了')
    //   e.target.src = this.defaultImg
    // },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    logout() {
      // 清除token 清除用户信息
      this.$store.commit('user/logOut')
      // 1.清空路由对象中的路由规则
      resetRouter()
      // 2.清空vuex中的路由规则
      this.$store.commit('routes/setRoutes', [])
      // this.$route.fullPath 获取当前的路径
      // /login?redirect=${this.$route.fullPath}  退出的时候 记录下你是在哪个页面退出的
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  // background: #fff;
  background: -webkit-linear-gradient(left, #3d6df8, #5b8cff);
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .app-breadcrumb {
    display: inline-block;
    font-size: 18px;
    line-height: 50px;
    margin-left: 10px;
    color: #ffffff;
    cursor: text;
    .breadBtn {
      background: #84a9fe;
      font-size: 14px;
      padding: 0 10px;
      display: inline-block;
      height: 30px;
      line-height: 30px;
      border-radius: 10px;
      margin-left: 15px;
    }
  }
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: middle;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 15px;
          vertical-align: middle;
        }
        .name {
          cursor: pointer;
          color: #fff;
          vertical-align: middle;
          margin-left: 5px;
        }
        .user-dropdown {
          color: #fff;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 20px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
