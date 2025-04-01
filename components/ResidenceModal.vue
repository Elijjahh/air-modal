<script lang="ts" setup>
const isVisible = defineModel<boolean>('visible');

const name = ref('');
const phone = ref('');
const address = ref('');

const space = ref({
  start: '',
  end: '',
});

const dates = ref({
  start: '',
  end: '',
});

const options = ref([
  {
    key: 'production',
    label: 'Производственная площадь',
  },
  {
    key: 'no-production',
    label: 'Не производственная площадь',
  },
]);

const selected = ref({ key: 'production', label: 'Производственная площадь' });

function submitForm() {
  const submitData = {
    name: name.value,
    phone: phone.value,
    address: address.value,
    selected: selected.value,
  };
  console.log(submitData);
}
</script>

<template>
  <BaseModal v-model:visible="isVisible">
    <div class="residence-modal">
      <h2 class="residence-modal__title">Заполните заявку, чтобы стать резидентом</h2>
      <form class="residence-modal__form" @submit.prevent="submitForm">
        <div class="residence-modal__inputs">
          <BaseInput v-model="name" label="Наименование организации / ИП" />
          <BaseInputMask
            v-model:unmasked="phone"
            mask="+7(###)###-##-##"
            label="Контактный телефон"
          />
          <BaseSelect
            v-model="selected"
            label="Тип помещения"
            :options="options"
            option-label="label"
          />
          <BaseInput v-model="address" label="Адрес" />
          <BaseRange
            v-model:start="space.start"
            v-model:end="space.end"
            label="Площадь помещения (м2)"
          />
          <BaseRange
            v-model:start="dates.start"
            v-model:end="dates.end"
            label="Дата начала аренды"
            type="date"
          />
        </div>

        <BaseButton class="residence-modal__btn">Отправить</BaseButton>
      </form>
    </div>
  </BaseModal>
</template>

<style scoped lang="scss">
.residence-modal {
  &__title {
    color: rgb(26, 38, 61);

    font-size: 24px;
    font-weight: 600;
    line-height: 110%;
    letter-spacing: 0%;
  }

  &__form {
    margin-top: 40px;
  }

  &__inputs {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__btn {
    margin-top: 40px;
  }
}
</style>
