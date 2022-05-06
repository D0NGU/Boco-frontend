<!-- inneholder LoginForm komponent -->

<template>
  <div id="loginPage">
    <LoginForm></LoginForm>
  </div>

</template>

<script>
import LoginForm from "@/components/LogIn/LoginForm";
export default {
    name: 'Login',
    components: {
      LoginForm,
    },
}
</script>

<style>

#loginPage {
  display: grid;
  justify-content: center;
}
</style>