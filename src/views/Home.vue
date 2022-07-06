<template>
  <div class="container">
    <header class="header">
      <h1 class="page-title">{{ $store.state.title }}</h1>
      <button type="button" class="burger-btn" @click="toggleMenu"></button>
    </header>

    <burger-menu :isOpen="isMenuShown" @onCloseBurger="toggleMenu" />

    <top-panel @onCreate="setCreateModal" @onDelete="deleteActiveRow" />

    <app-table
      @onEditBtn="setUpdateModal($event)"
      @onDeleteBtn="removeData($event)"
      @onTrClick="setActiveRow($event)"
      :activeRow="activeRow"
    />

    <pagination :pagination="getPagination" />

    <transition name="fade">
      <modal
        :item-id="editedItemId"
        v-if="isModalShown"
        @closeModal="toggleModal"
      />
    </transition>
  </div>
</template>

<script>
// @ is an alias to /src
import BurgerMenu from "@/components/BurgerMenu";
import AppTable from "@/components/AppTable";
import TopPanel from "@/components/TopPanel";
import Pagination from "@/components/Pagination";
import Modal from "@/components/Modal";

import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      isModalShown: false,
      editedItemId: -1,
      activeRow: -1,
      isMenuShown: false
    };
  },
  components: { BurgerMenu, AppTable, TopPanel, Pagination, Modal },
  computed: {
    ...mapGetters(["getPagination"])
  },
  watch: {
    "$route.query": {
      handler(query, oldQuery) {
        if (query.page && query.page !== oldQuery.page) {
          this.setPage(query.page);
        }
        if (query.table && query.table !== oldQuery.table) {
          this.toggleMenu();
          this.getData(query.table);
        }
      }
    }
  },
  mounted() {
    this.getData("users");
  },
  methods: {
    ...mapMutations(["removeData", "setPage"]),
    ...mapActions(["getData"]),
    setUpdateModal(e) {
      this.editedItemId = e.itemId;
      this.toggleModal();
    },
    setCreateModal() {
      this.editedItemId = -1;
      this.toggleModal();
    },
    toggleModal() {
      this.isModalShown = !this.isModalShown;
    },
    setActiveRow(e) {
      this.activeRow = e.id;
    },
    deleteActiveRow() {
      this.removeData({ id: this.activeRow });
    },
    toggleMenu() {
      this.isMenuShown = !this.isMenuShown;
    }
  }
};
</script>
