import Moment from 'moment'
function moment (data, format) {
  if (!data) {
    return ''
  }
  format = format || 'YYYY-MM-DD HH:mm:ss'
  return Moment(data).format(format)
}
export default moment
