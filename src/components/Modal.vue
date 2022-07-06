<template>
  <div class="modal">
    <div class="modal-overlay"></div>
    <form class="modal-form" @submit.prevent="onSave">
      <div
        class="input-group"
        :class="{ 'input-group--hidden': field === 'id' }"
        v-for="(field, i) in getColumns"
        :key="i"
      >
        <label>{{ field }}</label>
        <input
          type="text"
          class="input"
          :value="item[field]"
          @click="onFocus"
          @input="onInput(field, $event)"
          :required="field !== 'id'"
        />
      </div>

      <div class="modal-btns">
        <button
          type="submit"
          class="btn-save"
          :disabled="Object.keys(formData).length === 0"
        >
          Save
        </button>
        <button
          type="button"
          class="btn-save btn-save--close"
          @click="$emit('closeModal')"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "Modal",
  props: {
    itemId: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      formData: {}
    };
  },
  computed: {
    ...mapGetters(["getItemById", "getColumns"]),
    item() {
      if (this.itemId >= 0) {
        return this.getItemById(this.itemId);
      } else {
        let obj = {};
        this.getColumns.forEach(el => (obj[el] = ""));
        return obj;
      }
    }
  },
  methods: {
    ...mapMutations(["addData", "updateData"]),
    onFocus() {
      if (Object.keys(this.formData).length === 0) {
        this.formData = { ...this.item };
      }
    },
    onInput(field, e) {
      this.formData[field] = e.target.value;
    },
    onSave() {
      if (this.itemId >= 0) {
        this.updateData(this.formData);
      } else {
        this.addData({
          ...this.formData,
          id: new Date().getTime(),
          read: true
        });
      }
      this.$emit("closeModal");
    }
  }
};
</script>
