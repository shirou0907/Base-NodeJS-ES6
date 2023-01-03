export const getErrorMessages = () => {
  const customError = (res, message, status) => res.status(status).send({ message })
  const invalidError = res => res.status(400).send({ message: 'Định dạng sai, vui lòng kiểm tra lại!' })
  const unAuthorizationError = res => res.status(401).send({ message: 'Mã truy cập không hợp lệ!' })
  const accessDeniedError = res => res.status(403).send({ message: 'Bạn không có quyền truy cập!' })
  const notFoundError = res => res.status(404).send({ message: 'Không tìm thấy dữ liệu!' })
  const serverError = res => res.status(500).send({ message: 'Có lỗi xảy ra, vui lòng thử lại sau!' })

  return { customError, invalidError, serverError, unAuthorizationError, accessDeniedError, notFoundError }
}
