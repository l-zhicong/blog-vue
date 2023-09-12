import router from './router'
import store from './store'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'

const whiteList = ['/','/article','/music','/notice','/about']

router.beforeEach(async(to, from, next) => {
  document.title = '博客'
  const hasToken = getToken()

  if (hasToken) {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          await store.dispatch('user/getInfo')
          next()
        } catch (error) {
          //暂时没有换token

          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          await store.dispatch("user/showLogin")
        }
      }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      await store.dispatch("user/showLogin")
    }
  }
})


