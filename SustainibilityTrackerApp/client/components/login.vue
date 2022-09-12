<template id="registerTemplate">
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
</template>

