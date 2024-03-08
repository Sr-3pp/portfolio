<template lang="pug">
.contact-form
    SrForm(:fieldsets="contactForm" submit="Evniar" @submit="submitForm")
</template>

<script setup lang="ts">
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

const submitForm = (data: any) => {
  console.log(data);
};
</script>
