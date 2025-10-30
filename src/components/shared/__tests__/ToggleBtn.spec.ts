import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import ToggleBtn from "@/components/shared/ToggleBtn.vue";

describe("ToggleBtn.vue", () => {
  it("respects disabled state", async () => {
    const wrapper = shallowMount(ToggleBtn, {
      props: { modelValue: false, disabled: true },
    });
    await wrapper.get("button").trigger("click");
    expect(wrapper.emitted()["update:modelValue"]).toBeUndefined();
  });

  it("has correct ARIA attributes", () => {
    const wrapper = shallowMount(ToggleBtn, { props: { modelValue: true } });
    const btn = wrapper.get("button");
    expect(btn.attributes("role")).toBe("switch");
    expect(btn.attributes("aria-checked")).toBe("true");
  });
});
