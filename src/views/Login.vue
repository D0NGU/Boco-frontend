<!-- inneholder loginform komponent -->

<template>
  <div id="loginPage">
    <LoginForm></LoginForm>
  </div>

</template>

<script>
import LoginForm from "@/components/LoginForm";
export default {
    name: 'Login',
    components: {
      LoginForm,
    },
}
</script>

<style>

#loginPage {

}
</style>