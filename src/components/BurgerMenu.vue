<template>
  <div class="burger-menu" :class="{ 'burger-menu--open': isOpen }">
    <button
      type="button"
      class="burger-close"
      @click="$emit('onCloseBurger')"
    ></button>
    <router-link
      :to="{ name: 'home', query: { table: 'users', page: 1 } }"
      class="burger-link"
    >
      Users
    </router-link>
    <router-link
      :to="{ name: 'home', query: { table: 'products', page: 1 } }"
      class="burger-link"
    >
      Products
    </router-link>
    <router-link
      :to="{ name: 'home', query: { table: 'shops', page: 1 } }"
      class="burger-link"
    >
      Shops
    </router-link>
  </div>
</template>

<script>
export default {
  name: "BurgerMenu",
  props: {
    isOpen: {
      type: Boolean,
      required: true
    }
  }
};
</script>
