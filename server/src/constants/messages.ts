// Message về blog cá nhân
const MESSAGES = {
  VALIDATE_ERROR: 'Lỗi xác thực.',
  UNAUTHORISED: 'Không có quyền truy cập.',
  FORBIDDEN: 'Không được phép truy cập.',
  NOT_FOUND: 'Không tìm thấy.',
  CONFLICT: 'Xung đột.',
  UNPROCESSABLE_ENTITY: 'Dữ liệu không hợp lệ.',
  INTERNAL_SERVER_ERROR: 'Lỗi hệ thống.',
  SERVICE_UNAVAILABLE: 'Dịch vụ không khả dụng.',
  USER_NOT_FOUND: 'Không tìm thấy người dùng.',
  USER_EXISTED: 'Người dùng đã tồn tại.',
  USER_NOT_EXISTED: 'Người dùng không tồn tại.',
  REGISTER_SUCCESS: 'Đăng ký thành công!.',
  REGISTER_FAIL: 'Đăng ký thất bại!.',
  LOGIN_SUCCESS: 'Đăng nhập thành công!.',
  LOGIN_FAIL: 'Đăng nhập thất bại!',
  LOGOUT_SUCCESS: 'Đăng xuất thành công!.',
  LOGOUT_FAIL: 'Đăng xuất thất bại!.'
} as const

export default MESSAGES
