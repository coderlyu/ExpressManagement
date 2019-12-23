
const TokenKey = 'User-Token'
const roles = 'User-roles'

export function getToken () {
  return localStorage.getItem(TokenKey)
}

export function setToken (token) {
  return localStorage.setItem(TokenKey, token)
}

export function removeToken () {
  return localStorage.removeItem(TokenKey)
}
export function getRolesToken () {
  return localStorage.getItem(roles)
}

export function setRolesToken (token) {
  return localStorage.setItem(roles, token)
}

export function removeRolesToken () {
  return localStorage.removeItem(roles)
}
