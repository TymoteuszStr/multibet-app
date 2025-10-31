import { describe, it, expect, vi } from "vitest";
import InputNumber from "@/components/shared/InputNumber.vue";
import { shallowMount } from "@vue/test-utils";

describe("InputNumber.vue", () => {
  it("binds v-model and updates on input", async () => {
    const wrapper = shallowMount(InputNumber, {
      props: { modelValue: "", placeholder: "amounppt" },
    });
    const input = wrapper.get("input");
    await input.setValue("123");
    expect((input.element as HTMLInputElement).value).toBe("123");
  });

  it("prevents invalid keys like '-' and 'e'", async () => {
    const wrapper = shallowMount(InputNumber, { props: { modelValue: "" } });
    const input = wrapper.get("input");
    const prevent = vi.fn();
    await input.trigger("keydown", { key: "-", preventDefault: prevent });
    expect(prevent).toHaveBeenCalledOnce();
    const prevent2 = vi.fn();
    await input.trigger("keydown", { key: "e", preventDefault: prevent2 });
    expect(prevent2).toHaveBeenCalledOnce();
  });

  it("no allow but 0 and , or . from user", async () => {
    const wrapper = shallowMount(InputNumber, { props: { modelValue: "" } });
    const input = wrapper.get("input");
    (input.element as HTMLInputElement).value = "0005";
    await input.trigger("input");
    expect((input.element as HTMLInputElement).value).toBe("5");

    (input.element as HTMLInputElement).value = ".5";
    await input.trigger("input");
    expect((input.element as HTMLInputElement).value).toBe("5");

    (input.element as HTMLInputElement).value = "0";
    await input.trigger("input");
    expect((input.element as HTMLInputElement).value).toBe("1");
  });
});
