import registerComponent from './register.js';
import SigninComponent from './signin.js';

// const template = `
// <div>
//     <div class="actions">
//         <button :class='[{ active: isDisabled("register") }]' @click.prevent='setComponent("register")'>Register
//         </button>
//         <button :class='[{ active: isDisabled("signin") }]' @click.prevent='setComponent("signin")'>Sign In
//         </button>
//     </div>

//     <transition name='form' mode='out-in'>
//         <keep-alive>
//             <component :feedback='feedback' :is="currentComponent" @register-form='handleForm'
//                 @signin-form='handleForm'></component>
//         </keep-alive>
//     </transition>
// </div>
// `
const template = `
<div>
    <div class="actions">
        <button :class='[{ active: isDisabled("register") }]' @click.prevent='setComponent("register")'>Register
        </button>
        <button :class='[{ active: isDisabled("signin") }]' @click.prevent='setComponent("signin")'>Sign In
        </button>
    </div>

    <transition name='form' mode='out-in'>
        <keep-alive>
            <component :feedback='feedback' :is="currentComponent" @register-form='handleForm'
                @signin-form='handleForm'></component>
        </keep-alive>
    </transition>
</div>
`

export default{
    template: template,
    name: "login",
    components: {
        register: registerComponent,
        signin: SigninComponent
    },
    data() {
        return {
            feedback: {},
            currentComponent: 'register'
        }
    },
    methods: {
        handleForm(data) {
            this.feedback = data
            setTimeout(() => {
                this.setComponent('feedback')
            }, 280)
        },
        isDisabled(btnName) {
            return (this.currentComponent === btnName)
        },
        setComponent(componentName) {
            if (this.currentComponent !== componentName) {
                this.currentComponent = componentName
            }
        }
    }
}