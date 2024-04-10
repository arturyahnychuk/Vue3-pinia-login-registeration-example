export { fakeBackend }

// array in local storage for registered users
const usersKey = 'vue-3-pinia-registration-login-example-users'
let users = JSON.parse(localStorage.getItem(usersKey)) || []

function fakeBackend() {
  let realFetch = window.fetch
  window.fetch = function (url, opts) {
    return new Promise((resolve, reject) => {
      // wrap in timeout to simulate server api call
      setTimeout(handleRoute, 500)

      function handleRoute() {
        switch (true) {
          case url.endsWith('/users/authenticate') && opts.method === 'POST':
            return authenticate()
          case url.endsWith('/users/register') && opts.method === 'POST':
            return register()
          case url.endsWith('/users') && opts.method === 'GET':
            return getUsers()
          case url.match(/\/users\/\d+$/) && opts.method === 'GET':
            return getUserById()
          case url.match(/\/users\/\d+$/) && opts.method === 'PUT':
            return updateUser()
          case url.match(/\/users\/\d+$/) && opts.method === 'DELETE':
            return deleteUser()
          default:
            // pass through any requests not handled above
            return realFetch(url, opts)
              .then((response) => resolve(response))
              .catch((error) => reject(error))
        }
      }

      // route functions

      function authenticate() {
        const { username, password } = body()
        const user = users.find((x) => x.username === username && x.password === password)

        if (!user) return error('Username or password is incorrect')

        return ok({
          ...basicDetails(user),
          token: 'fake-jwt-token'
        })
      }

      function register() {
        const user = body()

        if (users.find((x) => x.username === user.username)) {
          return error('Username "' + user.username + '" is already taken')
        }

        user.id = users.length ? Math.max(...users.map((x) => x.id)) + 1 : 1
        users.push(user)
        localStorage.setItem(usersKey, JSON.stringify(users))
        return ok()
      }

      function getUsers() {
        if (!isAuthenticated()) return unauthorized()
        return ok(users.map((x) => basicDetails(x)))
      }
      // helper functions

      function ok(body) {
        resolve({ ok: true, ...headers(), json: () => Promise.resolve(body) })
      }

      function error(message) {
        resolve({ status: 400, ...headers(), json: () => Promise.resolve({ message }) })
      }

      function basicDetails(user) {
        const { id, username, firstName, lastName } = user
        return { id, username, firstName, lastName }
      }

      function isAuthenticated() {
        return opts.headers['Authorization'] === 'Bearer fake-jwt-token'
      }

      function body() {
        return opts.body && JSON.parse(opts.body)
      }

      function headers() {
        return {
          headers: {
            get(key) {
              return ['application/json']
            }
          }
        }
      }
    })
  }
}
