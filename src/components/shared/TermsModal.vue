<script setup lang="ts">
import { ref, watch } from "vue";
import Button from "@/components/shared/Button.vue";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Cookies from "universal-cookie";
import { ACCEPTED_TERMS_COOKIE_NAME } from "@/assets/constants";

interface Props {
  modelValue: boolean;
  requireAccept?: boolean;
}

interface Emits {
  (e: "update:modelValue", value: boolean): void;
  (e: "accept"): void;
  (e: "decline"): void;
  (e: "close"): void;
}

const props = withDefaults(defineProps<Props>(), {
  requireAccept: true,
});
const emit = defineEmits<Emits>();
const cookies = new Cookies();
const acceptedTerms = cookies.get(ACCEPTED_TERMS_COOKIE_NAME);
const accepted = ref(acceptedTerms);

watch(
  () => props.modelValue,
  (open) => {
    if (open) {
      accepted.value = false;
    }
  }
);

function closeModal() {
  cookies.set(ACCEPTED_TERMS_COOKIE_NAME, accepted.value);
  emit("close");
  emit("update:modelValue", false);
}

function onDecline() {
  emit("decline");
  emit("update:modelValue", false);
  cookies.set(ACCEPTED_TERMS_COOKIE_NAME, accepted.value);
}

function onAccept() {
  if (props.requireAccept && !accepted.value) return;
  emit("accept");
  emit("update:modelValue", false);
  cookies.set(ACCEPTED_TERMS_COOKIE_NAME, accepted.value);
}
</script>

<template>
  <teleport to="body">
    <transition name="fade">
      <div
        v-if="modelValue"
        class="terms-modal__backdrop"
        aria-modal="true"
        role="dialog"
      >
        <div class="terms-modal" role="document" @click.stop>
          <header class="terms-modal__header">
            <h3 class="terms-modal__title">Terms & Conditions</h3>
            <font-awesome-icon
              :icon="faXmark"
              class="terms-modal__close"
              @click="closeModal"
            />
          </header>

          <section class="terms-modal__content">
            <p>
              Welcome to our application. Please read these template Terms and
              Conditions carefully before using the service. By clicking Accept,
              you acknowledge that you have read and agree to these terms.
            </p>
            <h4>1. Use of Service</h4>
            <p>
              The service is provided "as is" and "as available". You agree to
              use it in compliance with all applicable laws and regulations.
            </p>
            <h4>2. Responsible Use</h4>
            <p>
              You are responsible for all activity under your account. Do not
              engage in fraudulent or abusive behavior.
            </p>
            <h4>3. Changes</h4>
            <p>
              We may update these terms from time to time. Continued use
              constitutes acceptance of the updated terms.
            </p>
            <p>This is placeholder text for demonstration purposes.</p>
          </section>

          <footer class="terms-modal__footer">
            <label v-if="requireAccept" class="terms-modal__checkbox">
              <input type="checkbox" v-model="accepted" />
              <span>I have read and accept the Terms & Conditions</span>
            </label>

            <div class="terms-modal__actions">
              <Button class="md" @click="onDecline">Not accept</Button>
              <Button
                class="md"
                :class="{ disabled: requireAccept && !accepted }"
                :disabled="requireAccept && !accepted"
                @click="onAccept"
                >Accept</Button
              >
            </div>
          </footer>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style scoped lang="scss">
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 160ms ease;
}

.terms-modal__backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  pointer-events: auto;
}

.terms-modal {
  width: min(720px, 92vw);
  max-height: min(80vh, 900px);
  background: var(--surface, #111);
  color: var(--text-color, #fff);
  border: 1px solid var(--overlay-md, rgba(255, 255, 255, 0.12));
  border-radius: 12px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.terms-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 18px;
  background: var(--secondary, #1a1a1a);
  border-bottom: 1px solid var(--overlay-md, rgba(255, 255, 255, 0.12));
}

.terms-modal__title {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--text-color);
}

.terms-modal__close {
  cursor: pointer;
  color: var(--text-color);
  transition: color 120ms ease, transform 120ms ease;

  &:hover {
    color: var(--foreground, #fff);
    transform: scale(1.06);
  }
}

.terms-modal__content {
  padding: 16px 18px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;

  h4 {
    margin: 10px 0 2px;
    font-weight: 700;
    color: var(--foreground, #fff);
  }

  p {
    margin: 0;
    color: var(--muted, #aaa);
    line-height: 1.5;
  }
}

.terms-modal__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 18px;
  border-top: 1px solid var(--overlay-md, rgba(255, 255, 255, 0.12));
  background: var(--secondary, #1a1a1a);
}

.terms-modal__checkbox {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--text-color);

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
}

.terms-modal__actions {
  display: flex;
  gap: 10px;
}
</style>
