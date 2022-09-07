export default function response(res, status, body) {
  return res.status(status).json(body)
}
