const template = `
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
`

export default {
    template:template,
    name:'Base Login Page'
}

