<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">
        Generate API Key
      </p>
    </header>
    <section class="modal-card-body">
      <h5 class="title is-5">API Key</h5>
      <h6 class="subtitle is-6">Make sure to copy your API key – you can only see it once!</h6>
      <pre class="key-container">{{key}}</pre>
    </section>
    <footer class="modal-card-foot">
      <button class="button" type="button" @click="$parent.close()">Close</button>
      <b-button v-clipboard:copy="key" v-clipboard:success="onCopy" type="is-primary">
        Copy
      </b-button>
    </footer>
  </div>
</template>

<script lang="ts">
import Buefy from "buefy";
import { Component, Vue } from "vue-property-decorator";
import apiClient from "../../api";

@Component
export default class APIKeyGenerator extends Vue {
  key: string = "";

  async created() {
    this.key = await apiClient.createAPIKey();
  }

  onCopy() {
    this.$buefy.toast.open({ type: "is-success", message: "API key copied" });
  }
}
</script>

<style lang="scss">
.key-container {
  margin-bottom: 0.5rem;
}
</style>