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
              alert('服务端出错')
          }
        }
        return Promise.reject(err)
      }
    )
  }
}
