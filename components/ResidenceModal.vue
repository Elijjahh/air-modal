<script lang="ts" setup>
import { useField, useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';

const isVisible = defineModel<boolean>('visible');

const emit = defineEmits<{
  showThankYou: [];
}>();

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

const selectedOption = ref({ key: 'production', label: 'Производственная площадь' });

const validationSchema = toTypedSchema(
  zod.object({
    name: zod
      .string({ message: 'Это обязательное поле' })
      .min(1, { message: 'Это обязательное поле' }),
    phone: zod
      .string({ message: 'Это обязательное поле' })
      .min(1, { message: 'Это обязательное поле' })
      .length(10, {
        message: 'Введите корректный номер телефона',
      }),
    selected: zod
      .string({ message: 'Это обязательное поле' })
      .min(1, { message: 'Это обязательное поле' }),
    address: zod
      .string({ message: 'Это обязательное поле' })
      .min(1, { message: 'Это обязательное поле' }),
    spaceStart: zod
      .string({ message: 'Это обязательное поле' })
      .min(1, { message: 'Это обязательное поле' }),
    spaceEnd: zod
      .string({ message: 'Это обязательное поле' })
      .min(1, { message: 'Это обязательное поле' }),
    datesStart: zod
      .string({ message: 'Это обязательное поле' })
      .min(1, { message: 'Это обязательное поле' })
      .date('Это поле должно быть датой'),
    datesEnd: zod
      .string({ message: 'Это обязательное поле' })
      .min(1, { message: 'Это обязательное поле' })
      .date('Это поле должно быть датой'),
  }),
);

const { handleSubmit, errors } = useForm({
  validationSchema,
});

const { value: name } = useField<string>('name');
const { value: phone } = useField<string>('phone');
const { value: selected } = useField<string>('selected');
const { value: address } = useField<string>('address');

const { value: spaceStart } = useField<string>('spaceStart');
const { value: spaceEnd } = useField<string>('spaceEnd');

const { value: datesStart } = useField<string>('datesStart');
const { value: datesEnd } = useField<string>('datesEnd');

const datesStartRaw = ref('');
const datesEndRaw = ref('');

watch(
  selectedOption,
  (val) => {
    selected.value = val.key;
  },
  { immediate: true },
);

watch(datesStartRaw, (val) => {
  const [day, month, year] = val.split('.');
  datesStart.value = `${year}-${month}-${day}`;
});

watch(datesEndRaw, (val) => {
  const [day, month, year] = val.split('.');
  datesEnd.value = `${year}-${month}-${day}`;
});

const onSubmit = handleSubmit(() => {
  submitForm();
});

const loading = ref(false);
const error = ref('');

async function submitForm() {
  const submitData = {
    name: name.value,
    phone: phone.value,
    address: address.value,
    selected: selected.value,
    space: {
      start: spaceStart.value,
      end: spaceEnd.value,
    },
    dates: {
      start: datesStart.value,
      end: datesEnd.value,
    },
  };

  loading.value = true;
  error.value = '';

  try {
    const result = await $fetch('https://httpbin.org/status/200%2C409', {
      method: 'POST',
      body: submitData,
    });

    console.log(result);

    isVisible.value = false;
    emit('showThankYou');
  } catch {
    error.value = 'Уже есть резидент с таким номером телефона';
  }

  loading.value = false;
}
</script>

<template>
  <BaseModal v-model:visible="isVisible">
    <div class="residence-modal">
      <h2 class="residence-modal__title">Заполните заявку, чтобы стать резидентом</h2>
      <form class="residence-modal__form" @submit.prevent="onSubmit">
        <div class="residence-modal__inputs">
          <div>
            <BaseInput
              v-model="name"
              :invalid="!!errors.name"
              label="Наименование организации / ИП"
            />
            <p v-if="errors.name" class="residence-modal__error">
              {{ errors.name }}
            </p>
          </div>

          <div>
            <BaseInputMask
              v-model:unmasked="phone"
              mask="+7(###)###-##-##"
              :invalid="!!errors.phone"
              label="Контактный телефон"
            />
            <p v-if="errors.phone" class="residence-modal__error">
              {{ errors.phone }}
            </p>
          </div>

          <div>
            <BaseSelect
              v-model="selectedOption"
              label="Тип помещения"
              :options="options"
              option-label="label"
              :invalid="!!errors.selected"
            />
            <p v-if="errors.selected" class="residence-modal__error">
              {{ errors.selected }}
            </p>
          </div>

          <div>
            <BaseInput v-model="address" :invalid="!!errors.address" label="Адрес" />
            <p v-if="errors.address" class="residence-modal__error">
              {{ errors.address }}
            </p>
          </div>

          <BaseRange
            v-model:start="spaceStart"
            v-model:end="spaceEnd"
            :start-error="errors.spaceStart"
            :end-error="errors.spaceEnd"
            label="Площадь помещения (м2)"
          />
          <BaseRange
            v-model:start="datesStartRaw"
            v-model:end="datesEndRaw"
            :start-error="errors.datesStart"
            :end-error="errors.datesEnd"
            label="Дата начала аренды"
            type="date"
          />
        </div>

        <p class="residence-modal__error">{{ error }}</p>

        <BaseButton class="residence-modal__btn" :disabled="loading">{{
          loading ? 'Отправляем...' : 'Отправить'
        }}</BaseButton>
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

  &__error {
    margin-top: 10px;
    color: red;
  }

  &__btn {
    margin: 40px auto 0;
  }
}
</style>
