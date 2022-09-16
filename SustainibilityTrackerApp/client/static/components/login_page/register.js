const registerTemplate = `
<form @submit.prevent='onSubmit' ref='form' action="" class='register-form'>
    <h2>Register</h2>
    <div class="form-group">
        <label for="firstname">First Name</label>
        <input required type="text" v-model.trim='user.firstname' id='firstname' placeholder="First Name">
    </div>
    <div class="form-group">
        <label for="lastname">Last Name</label>
        <input required type="text" v-model.trim='user.lastname' id='lastname' placeholder="Last Name">
    </div>
    <div class="form-group">
        <label for="email">Email</label>
        <input required type="email" v-model.trim='user.email' id='email' placeholder="Email">
    </div>
    <div class="form-group">
        <label for="password">Password</label>
        <input required type="password" v-model='user.password' placeholder="password" id='password'>
    </div>
    <div class="form-group">
        <label for="passwordcheck"> Confirm password</label>
        <input required type="password" v-model='user.passwordChck' placeholder="Confirm password"
            id='passwordcheck'>
    </div>
    <input type="submit" :disabled='!isFormValid' value='Register'>
</form>
    `;


const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/


export default {
    template: registerTemplate,
    name: 'registerComponent',
    data() {
        return {
            user: {
                firstname: '',
                lastname: '',
                email: '',
                password: '',
                passwordChck: ''
            }
        }
    },
    computed: {
        isFormValid() {
            return (
                this.isValid('firstname') &&
                this.isValid('lastname') &&
                this.isValid('email') &&
                this.isValid('password') &&
                this.isValid('passwordChck')
            )
        }
    },
    methods: {
        isValid(prop) {
            switch (prop) {
                case 'firstname':
                    return this.user.firstname.length >= 2
                    break
                case 'lastname':
                    return this.user.lastname.length >= 2
                    break
                case 'email':
                    return emailRegex.test(this.user.email)
                    break
                case 'password':
                    return this.user.password.length >= 6
                    break
                case "passwordChck":
                    return this.user.password === this.user.passwordChck
                    break
                default:
                    return false
            }
        },
        resetUser() {
            this.user.firstname = ''
            this.user.lastname = ''
            this.user.email = ''
            this.user.password = ''
            this.user.passwordChck = ''
        },
        onSubmit() {
            let user = Object.assign({}, this.user)
            // First register the user, wait for the response and then sign them in as well!
            axios.post("/auth/register",{
                'user' : this.user
            }).then(res => {
                console.log('profile is:', res.data);
            }).catch(rej => {});
        }
    },
    mounted() {
        let element = this.$el.querySelector('#passwordcheck')
        element.addEventListener('blur', () => {
            if (!this.isValid('passwordChck')) {
                element.classList.add('invalid')
            } else {
                element.classList.remove('invalid')
            }
        })
    }
}