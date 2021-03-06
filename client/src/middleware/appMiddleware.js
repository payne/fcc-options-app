import authActions from "../actions/authActions"

function appMiddleware() {
  return (next) => (action) => {

    if (isUnauthenticated(action)) {
      authActions.clientLogout()
    }else if (isUnauthorized(action)) {
      authActions.unauthorize();
    }
    next(action)

  }
}

function isUnauthorized(action) {
  return (action.error && action.error.status == 403)
}

function isUnauthenticated(action) {
  return (action.error && action.error.status == 401)
}

module.exports = appMiddleware;
