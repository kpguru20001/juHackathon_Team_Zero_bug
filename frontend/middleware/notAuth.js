export default function ({ app, redirect }) {
  // If the user is authenticated redirect to home page
  const hasToken = !!app.$apolloHelpers.getToken()
  if (hasToken) {
    redirect('/')
  }
}
