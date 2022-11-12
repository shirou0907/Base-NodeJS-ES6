export const getErrorMessages = () => {
  const customError = (res, message, status) => res.status(status).json({ message })
  const invalidError = res => res.status(400).json({ message: 'Định dạng sai, vui lòng kiểm tra lại!' })
  const unAuthorizationError = res => res.status(401).json({ message: 'Mã truy cập không hợp lệ!' })
  const accessDeniedError = res => res.status(403).json({ message: 'Bạn không có quyền truy cập!' })
  const notFoundError = res => res.status(404).json({ message: 'Không tìm thấy dữ liệu!' })
  const serverError = res => res.status(500).json({ message: 'Có lỗi xảy ra, vui lòng thử lại sau!' })

  return { customError, invalidError, serverError, unAuthorizationError, accessDeniedError, notFoundError }
}
