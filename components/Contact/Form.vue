<template lang="pug">
.contact-form
    SrForm.sr-form(v-if="!sent && !error" :form="contactForm" submit="Enviar" @submit="submitForm")
      template(#submit)
        SrButton(label="Enviar")
    .success-message(v-else-if="sent")
      SrText(text="Your message has been sent successfully" tag="h3" class="subtitle" style="--text-align: center;")
    .error-message(v-else-if="error")
      SrText(text="There was an error sending your message. Please try again later." tag="h3" class="subtitle" style="--text-align: center;")
</template>

<script setup lang="ts">
const mail = useMail();
const sent = ref(false);
const error = ref(false);

const contactForm = ref([
  {
    fields: [
      {
        component: "SrFormInput",
        props: {
          label: "Name",
          name: "name",
          type: "text",
          required: true,
        },
      },
      {
        component: "SrFormInput",
        props: {
          label: "E-mail",
          name: "email",
          type: "email",
          required: true,
        },
      },
      {
        component: "SrFormInput",
        props: {
          label: "Message",
          name: "message",
          type: "textarea",
          required: true,
        },
      },
    ],
  },
]);

const emit = defineEmits(["sent"]);

const submitForm = (data: { name: string; email: string; message: string }) => {
  try {
    mail.send({
      from: "Sr3pp Contact Form",
      subject: "sr3pp.dev Contact Form",
      text: `Name: ${data.name}\nEmail: ${data.email}\nMessage: ${data.message}`,
    });
    sent.value = true;
    emit("sent");
  } catch (e) {
    error.value = true;
  }
};
</script>

<style lang="scss">
.contact-form {
  .form {
    color: $color-vue-text;

    fieldset {
      padding: unit(20);
      border-color: $color-vue;
      border-width: unit(2);
      border-radius: unit(16);
      box-shadow: 0 0 unit(30) rgba($color-vue, 0.2);
    }

    .input {
      input,
      textarea {
        color: $color-vue-text;
        background-color: $color-vue-bg;
        transition: border-color 0.35s ease, box-shadow 0.35s ease;

        &.filled {
          border-color: $color-vue;
          box-shadow: 0 0 unit(30) rgba($color-vue, 0.5);
        }

        &:focus,
        &:active {
          border-color: $color-vue-active;
          box-shadow: 0 0 unit(30) rgba($color-vue-active, 0.5);
        }
      }
    }

    .cta {
      margin: auto;
    }
  }
}
</style>
