import { router } from '../../main.js'
export const signin = function(email, password){
    axios.post("/auth/login", {
        'identity': email,
        'password': password
    }).then(response => {
        // axios.get()
        console.log(response)
        $cookies.set('access_token',response['data']['access_token'])
        console.log($cookies.get('access_token'))
        router.push('/home')
        
    }).catch(reject => console.log(reject));
}