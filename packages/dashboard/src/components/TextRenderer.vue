<template>
  <c-link v-if="text" :link="link" :tag="tag">
    <vue-markdown v-if="markdown" :html="false" :breaks="false" :source="text" />
    <template v-else>{{text}}</template>
  </c-link>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { PresenceText } from "@presenti/utils";
import ConditionalLink from "./ConditionalLink.vue";
import VueMarkdown from "vue-markdown";

type Optional<T> = T | undefined | null;

@Component({
  components: {
    CLink: ConditionalLink,
    VueMarkdown
  }
})
export default class TextRenderer extends Vue {
  @Prop()
  value: PresenceText;

  @Prop()
  tag: string | undefined;

  get text(): Optional<string> {
    return typeof this.value === "object" ? this.value?.text : this.value;
  }

  get type() {
    return typeof this.value === "object" ? (this.value?.type || "text") : "text";
  }

  get markdown() {
    return this.type === "md";
  }

  get link(): Optional<string> {
    return typeof this.value === "object" ? this.value?.link : null;
  }
}
</script>