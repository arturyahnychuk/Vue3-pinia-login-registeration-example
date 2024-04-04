<script setup lang="ts"></script>

<template>
  <div class="card m-3">
    <h4 class="card-header">Register</h4>
    <div class="card-body">
      <form @submit="onSubmit">
        <div class="form-group">
          <label>First Name</label>
          <Field name="firstname" type="text" class="form-control" />
        </div>
        <div class="form-group">
          <label>Last Name</label>
          <Field name="lastname" type="text" class="form-control" />
        </div>
        <div class="form-group">
          <label>User Name</label>
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
          <router-link to="login" class="btn btn-link">Cancel</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
