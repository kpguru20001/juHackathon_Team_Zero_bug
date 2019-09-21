export default function ({ app, error, redirect }) {
  // If the user is not authenticated
  const hasToken = !!app.$apolloHelpers.getToken()
  if (!hasToken) {
    error({ errorCode: 503, message: 'You are not allowed to see this' })
    redirect('/login')
  } else {
    console.log('Is authenticated')
  }
}
