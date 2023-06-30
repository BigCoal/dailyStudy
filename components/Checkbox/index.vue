<template>
  <div class="container">
    <div class="ac-custom ac-checkbox ac-cross" style="position: relative">
      <input
        ref="boxOne"
        name="cb1"
        type="checkbox"
        style="position: absolute"
      />
      <label for="cb1" class="content"> {{ title }}</label>
    </div>
  </div>
</template>
<script lang="ts" setup>
import "./css/component.css";
import { controlCheckbox, draw } from "./js/svgcheckbx";
import { onMounted, ref } from "vue";

const boxOne = ref();
const props = defineProps({
  title: String,
  isOk: Boolean,
});
onMounted(() => {
  controlCheckbox(boxOne.value, "list", {
    viewBox: "3 1 4 200",
    preserveAspectRatio: "none",
  });
  controlCheckbox(boxOne.value, "checkmark");

  if (props.isOk) {
    draw(boxOne.value, "list");
    draw(boxOne.value, "checkmark");
  }
});
</script>
