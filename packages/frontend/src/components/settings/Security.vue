<template>
  <div>
    <div>
      <h5 class="title is-5">Change Password</h5>
      <p class="subtitle is-6">Changing your password will invalidate all API keys you've generated</p>

      <ValidationObserver ref="observer" tag="form" v-slot="{ passes }">
        <BInputWithValidation
          @keyup.native.enter="passes(changePassword)"
          rules="required"
          type="password"
          label="Old Password"
          vid="password"
          :error="passwordError"
          v-model="password"
        />
        
        <BInputWithValidation
          @keyup.native.enter="passes(changePassword)"
          rules="required"
          name="New Password"
          type="password"
          label="New Password"
          vid="newPassword"
          :error="newPasswordError"
          v-model="newPassword"
        />

        <BInputWithValidation
          @keyup.native.enter="passes(changePassword)"
          rules="required|confirmed:newPassword"
          name="Confirm New Password"
          type="password"
          label="Confirm New Password"
          v-model="confirmation"
          :error="newPasswordError"
        />

        <div class="buttons">
          <b-button type="is-primary is-fullwidth" @click="passes(changePassword)">Change Password</b-button>
        </div>
      </ValidationObserver>
    </div>
    <br>
    <div>
      <h5 class="title is-5">Generate API Key</h5>
      <p class="subtitle is-6">API keys allow you to set up your own integrations with your account.</p>

      <div class="buttons">
        <b-button type="is-primary" @click="isAPIKeyModalActive = true">Create Key</b-button>

        <b-modal :active.sync="isAPIKeyModalActive"
                 has-modal-card
                 trap-focus
                 :destroy-on-hide="true"
                 aria-role="dialog"
                 aria-modal>
                 <APIKeyGenerator />
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ValidationObserver } from "vee-validate";
import BInputWithValidation from "../inputs/BInputWithValidation.vue";
import APIKeyGenerator from "../partials/APIKeyGenerator.vue";
import apiClient from "../../api";

@Component({
  components: {
    ValidationObserver,
    BInputWithValidation,
    APIKeyGenerator
  }
})
export default class Security extends Vue {
  static displayName = "Security";
  isAPIKeyModalActive = false;

  password: string = '';
  newPassword: string = '';
  confirmation: string = '';

  passwordError: string | null = null;
  newPasswordError: string | null = null;

  $refs: {
    observer: InstanceType<typeof ValidationObserver>;
  };

  async changePassword() {
    const { password, newPassword } = this;
    const result = await apiClient.changePassword({ password, newPassword });

    if ("ok" in result) {
      this.$buefy.toast.open({ type: "is-success", message: "Your password has been changed." });
      this.reset();
      return;
    }

    if (!result.fields) {
      this.$buefy.toast.open({ type: "is-danger", message: "Sorry, we couldn't change your password." });
      return;
    }

    result.fields.forEach(field => {
      switch (field) {
        case "password":
          this.passwordError = result.error;
          break;
        case "newPassword":
          this.newPasswordError = result.error;
          break;
        default:
          // fuck
          break;
      }
    });
  }

  reset() {
    this.password = this.newPassword = this.confirmation = '';
    this.passwordError = this.newPasswordError = null;

    requestAnimationFrame(() => {
      this.$refs.observer.reset();
    })
  }
}
</script>

<style lang="scss">
.title:not(.is-spaced) + .subtitle {
  margin-top: -1.25rem;
}
</style>