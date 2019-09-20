export default function (context) {
  return {
    httpEndpoint: 'http://localhost:4000/graphql',
    getAuth: () => 'Bearer my-static-token' // use this method to overwrite functions
  }
}
