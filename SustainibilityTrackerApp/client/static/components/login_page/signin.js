const signinTemplate =`
    <form ref='form' @submit.prevent='handleForm' action="" class='signin-form'>
        <h2>Signin</h2>
        <div class="form-group">
            <label for="email">Email</label>
            <input required v-model='user.email' type="email" id='email' placeholder="Email">
        </div>
        <div class="form-group">
            <label for="password">password</label>
            <input required v-model='user.password' type="password" id='password' placeholder="password">
        </div>
        <input :disabled='!isFormValid' type="submit" value="Signin">
    </form>
`;

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
export default {
    template: signinTemplate,
    name: 'SigninComponent',
    data() {
        return {
            user: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        handleForm() {
            axios.post("/auth/login", {
                'username': this.user.email,
                'password': this.user.password
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

            let formvalue = Object.assign({}, this.user)
            this.resetFormValues()
            this.$emit('signin-form', { type: 'signin', data: formvalue })
        },
        resetFormValues() {
            this.user.email = ''
            this.user.password = ''
        },
        isValid(prop) {
            switch (prop) {
                case 'email':
                    return emailRegex.test(this.user.email)
                    break
                case 'password':
                    return this.user.password.length >= 6
                    break
                default:
                    return false
            }
        },
    },
    computed: {
        isFormValid() {
            return (this.isValid('email') && this.isValid('password'))
        }
    }
}
