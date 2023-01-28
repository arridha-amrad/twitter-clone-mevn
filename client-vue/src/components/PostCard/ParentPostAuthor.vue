<template>
  <small v-if="users.size > 0">
    <ul class="flex flex-wrap gap-1 text-sm text-blue-500 dark:text-blue-300 p-0 m-0">
      Replying to
      <li :key="user" v-for="(user, index) in users">
        <span v-if="users.size > 1 && index + 1 === users.size">and @{{ user }}</span>
        <span v-else>
          @{{
            user
          }}<span v-show="users.size > 2 && index + 2 !== users.size">,</span>
        </span>
      </li>
    </ul>
  </small>
</template>

<script setup lang="ts">
defineProps<{ users: Set<string> }>()
</script>