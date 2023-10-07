import moment from 'moment-timezone'

const gmt7Time = moment().tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY')

export { gmt7Time }
