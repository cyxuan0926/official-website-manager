import Bus from '@/plugin/bus.js'
export default {
  config (axios, store, router) {
    axios.interceptors.response.use(
      response => {
        if (response.data.code === 400) {
          sessionStorage['userName'] = ''
          sessionStorage['userId'] = ''
          router.push({path: '/'})
        }
        return response
      },
      err => {
        if (err.response) {
          switch (err.response.status) {
            case 500:
              Bus.$Message.error({
                content: '服务部出错',
                duration: 10,
                closable: true
              })
          }
        }
        return Promise.reject(err)
      }
    )
  }
}
