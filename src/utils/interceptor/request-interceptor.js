export default {
  config (axios) {
    axios.interceptors.request.use(
      config => {
        return Promise.resolve(config)
      },
      err => {
        return Promise.reject(err)
      }
    )
  }
}
