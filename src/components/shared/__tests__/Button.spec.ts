import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Button from "@/components/shared/Button.vue";

describe("Button.vue", () => {
  it("renders slot content", () => {
    const wrapper = mount(Button, {
      slots: { default: "Click me" },
    });
    expect(wrapper.text()).toContain("Click me");
  });

  it("applies disabled when prop is true", async () => {
    const wrapper = mount(Button, { props: { disabled: true } });
    const btn = wrapper.get("button");
    expect(btn.attributes("disabled")).toBeDefined();
    expect(btn.classes()).toContain("disabled");
  });

  it("shows loader and disables when isLoading", () => {
    const wrapper = mount(Button, { props: { isLoading: true } });
    const btn = wrapper.get("button");
    expect(btn.attributes("disabled")).toBeDefined();
    expect(btn.classes()).toContain("loading");
    expect(wrapper.find(".loader").exists()).toBe(true);
  });
});
