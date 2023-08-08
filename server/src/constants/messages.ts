// Message về blog cá nhân
const MESSAGES = {
  VALIDATE_ERROR: 'Lỗi xác thực.',
  REGISTER_SUCCESS: 'Đăng ký thành công.',
  REGISTER_FAIL: 'Đăng ký thất bại.',
  USER_EXISTED: 'Tài khoản đã tồn tại.',
  LOGIN_SUCCESS: 'Đăng nhập thành công.',
  LOGIN_FAIL: 'Đăng nhập thất bại.',
  USER_NOT_FOUND: 'Tài khoản không tồn tại.',
  WRONG_PASSWORD: 'Mật khẩu không chính xác.',
  LOGOUT_FAIL: 'Đăng xuất thất bại.',
  LOGOUT_SUCCESS: 'Đăng xuất thành công.',
  CREATE_BLOG_SUCCESS: 'Tạo blog thành công.',
  CREATE_BLOG_FAIL: 'Tạo blog thất bại.',
  FORBIDDEN: 'Bạn không có quyền truy cập.',
  EDIT_BLOG_SUCCESS: 'Sửa blog thành công.',
  EDIT_BLOG_FAIL: 'Sửa blog thất bại.',
  BLOG_NOT_FOUND: 'Không tìm thấy blog.',
  DELETE_BLOG_SUCCESS: 'Xóa blog thành công.',
  DELETE_BLOG_FAIL: 'Xóa blog thất bại.',
  BLOG_ID_REQUIRED: 'ID blog là bắt buộc.',
  BLOG_ID_INVALID: 'ID blog không hợp lệ.',
  BLOG_ID_NOT_FOUND: 'Không tìm thấy ID blog.',
  BLOG_ID_MUST_BE_STRING: 'ID blog phải là chuỗi.',
  GET_BLOG_SUCCESS: 'Lấy danh sách blog thành công.',
  GET_BLOG_FAIL: 'Lấy danh sách blog thất bại.',
  GET_BLOG_BY_ID_SUCCESS: 'Lấy blog theo ID thành công.',
  GET_BLOG_BY_ID_FAIL: 'Lấy blog theo ID thất bại.',
  TAG_ID_REQUIRED: 'ID tag là bắt buộc.',
  UPLOAD_IMAGE_FAIL: 'Tải ảnh lên thất bại.',
  UPLOAD_IMAGE_SUCCESS: 'Tải ảnh lên thành công.'
} as const

export default MESSAGES
