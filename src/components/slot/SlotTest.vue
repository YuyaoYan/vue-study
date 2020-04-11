<template>
  <div>
    <Slot name="slot">
      <template v-slot:slot-first="foo">
        <div class="title">
          <h5>Here might be a page title</h5>
          <h5>{{foo}}</h5>
        </div>
      </template>
      <template v-slot:slot-second>
        <div class="content">
          <h5>Here might be a page content</h5>
        </div>
      </template>
      <template>
        <div class="footer">
          <h5>Here might be a page footer</h5>
        </div>
      </template>
    </Slot>
  </div>
</template>
<script>
import Slot from "./Slot";
export default {
  components: {
    Slot
  },
  name: "SlotTest"
};
</script>
