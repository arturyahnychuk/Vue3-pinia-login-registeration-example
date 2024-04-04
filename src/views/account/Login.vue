<script setup lang="ts"></script>

<template>
  <div class="card m-3">
    <h4 class="card-header">Login</h4>
    <div class="card-body">
      <form @submit="onSubmit">
        <div class="form-group">
          <label>Username</label>
          <Field name="username" type="text" class="form-control" />
        </div>
        <div class="form-group">
          <label>Password</label>
          <Field name="password" type="password" class="form-control" />
        </div>
        <div class="form-group">
          <button class="btn btn-primary">
            <span class="spinner-border-sm mr-1"></span>
            Login
          </button>
          <router-link to="register" class="btn btn-link">Register</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
