<template>
  <div class="table-wrap">
    <table class="table">
      <tr>
        <th v-for="(col, i) in getColumns" :key="i">
          {{ col
          }}<button
            type="button"
            class="table-btn table-btn--sort"
            :class="{ 'table-btn--sort-active': filters.sortCol === col }"
            @click="setFilter(col)"
          >
            Sort
          </button>
        </th>
        <th></th>
      </tr>
      <tr
        v-for="item in getDisplayData"
        :key="item.id"
        @click="$emit('onTrClick', { id: item.id })"
        :class="{ 'table-row--active': activeRow === item.id }"
      >
        <td v-for="(col, i) in getColumns" :key="i">{{ item[col] }}</td>
        <td>
          <div class="table-options">
            <button
              type="button"
              class="table-btn table-btn--edit"
              @click="$emit('onEditBtn', { itemId: item.id })"
            >
              Edit
            </button>
            <button
              type="button"
              class="table-btn table-btn--delete"
              @click="$emit('onDeleteBtn', { id: item.id })"
              :disabled="$store.state.data.length === 1"
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  name: "AppTable",
  props: {
    activeRow: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapState(["filters"]),
    ...mapGetters(["getColumns", "getDisplayData"])
  },
  methods: {
    ...mapMutations(["setFilters"]),
    setFilter(col) {
      let sortType = this.filters.sortType === "asc" ? "dsc" : "asc";

      this.setFilters({
        type: "sortCol",
        val: col
      });
      this.setFilters({
        type: "sortType",
        val: sortType
      });
    }
  }
};
</script>
