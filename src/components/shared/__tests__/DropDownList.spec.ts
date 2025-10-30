import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import DropDownList from "@/components/shared/DropDownList.vue";

describe("DropDownList.vue", () => {
  const items = [
    { id: "a", label: "Alpha" },
    { id: "b", label: "Beta" },
  ];

  it("toggles open/close when header clicked", async () => {
    const wrapper = shallowMount(DropDownList, {
      props: { header: { label: "Menu" }, items },
      global: { stubs: { FontAwesomeIcon: true } },
    });

    expect(wrapper.find("ul.dropdown__list").exists()).toBe(true);
    await wrapper.get(".dropdown__header").trigger("click");
    expect(wrapper.find("ul.dropdown__list").exists()).toBe(false);
  });
});
