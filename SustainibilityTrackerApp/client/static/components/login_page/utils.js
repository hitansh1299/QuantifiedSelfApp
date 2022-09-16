export const signin = function(email, password){
    axios.post("/auth/login", {
        'username': email,
        'password': password
    }).then(response => {
        axios.get()
        console.log(response)
        $cookies.set('access_token',response['data']['access_token'])
        console.log($cookies.get('access_token'))

        axios
        .get('/protectedEndpoint', { headers: {"Authorization" : 'Bearer ${$cookies.get("access_token")}'} })
        .then(res => {
           console.log('profile is:', res.data);
          })
          .catch(error => console.log(error)) 
    }).catch(reject => console.log(reject));
}