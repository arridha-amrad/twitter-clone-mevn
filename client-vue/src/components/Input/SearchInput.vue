<template>
  <form @submit.prevent="">
    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div class="relative">
      <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor"
          viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </div>
      <input autocomplete="off" type="text" id="default-search" class="pl-10 
        border border-gray-200 dark:placeholder:text-gray-400 dark:border-gray-700 bg-white focus:border-transparent focus:ring-4 focus:ring-blue-300 focus:ring-offset-0 outline-none w-full rounded-lg text-sm text-gray-900 dark:text-gray-200 md:text-base dark:focus:ring-blue-500
        dark:bg-slate-800
        " placeholder="search user..." />
    </div>
  </form>
</template>

<script setup lang="ts"></script>
