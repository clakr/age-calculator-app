<script setup lang="ts">
import { inject, onBeforeMount, ref } from "vue";
const addSRHeading = inject("addSRHeading") as () => void;

onBeforeMount(() => {
  addSRHeading();
});

const inputDayRef = ref<HTMLInputElement | null>(null);
const inputMonthRef = ref<HTMLInputElement | null>(null);
const inputYearRef = ref<HTMLInputElement | null>(null);

function handleSubmit() {
  if (!inputDayRef.value || !inputMonthRef.value || !inputYearRef.value) return;

  const inputArray = [
    inputDayRef.value,
    inputMonthRef.value,
    inputYearRef.value,
  ];

  for (const input of inputArray) {
    if (!input.value) {
      input.setAttribute("required", "");
      input.setCustomValidity("This field is required");
    }

    const inputSpan = input.nextElementSibling as HTMLSpanElement;
    inputSpan.innerText = input.validationMessage;
  }
}
</script>

<template>
  <section>
    <form id="form" @submit.prevent="handleSubmit">
      <fieldset>
        <label for="day">Day</label>
        <input id="day" ref="inputDayRef" type="number" />
        <span />
      </fieldset>
      <fieldset>
        <label for="month">Month</label>
        <input id="month" ref="inputMonthRef" type="number" />
        <span>Must be a valid month</span>
      </fieldset>
      <fieldset>
        <label for="year">Year</label>
        <input id="year" ref="inputYearRef" type="number" />
        <span>Must be in the past</span>
      </fieldset>
    </form>
    <div class="container--button">
      <button form="form">
        <img src="/icon-arrow.svg" alt="" />
      </button>
    </div>
    <div class="container--age">
      <span><strong>--</strong> years</span>
      <span><strong>--</strong> months</span>
      <span><strong>--</strong> days</span>
    </div>
  </section>
</template>

<style lang="scss" scoped>
section {
  background-color: white;
  width: 34.3rem;
  display: flex;
  flex-direction: column;
  row-gap: 3.2rem;
  padding: 4.8rem 2.4rem;
  border-radius: 2.4rem 2.4rem 10rem;
}

form {
  display: flex;
  column-gap: 1.6rem;

  fieldset {
    display: flex;
    flex-direction: column;
    row-gap: 0.4rem;

    span {
      display: none;
      color: var(--red);
      font-size: 1.2rem;
      font-style: italic;
    }

    &:has(input:invalid) label {
      color: var(--red);
    }
  }
}

label {
  color: var(--grey);
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 0.3rem;
  text-transform: uppercase;
}

input {
  color: var(--black);
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 0.02rem;
  padding: 1.2rem 1.6rem;
  border-radius: 0.8rem;
  border: 1px solid var(--line);
  width: 100%;

  &:invalid {
    border-color: var(--red);

    + span {
      display: block;
    }
  }
}

.container--button {
  display: grid;
  place-items: center;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 100%;
    height: 0.1rem;
    background: var(--line, #dcdcdc);
  }
}

button {
  background-color: var(--purple);
  padding: 2rem;
  border-radius: 100%;
  z-index: 1;
}

img {
  width: 2.4rem;
  height: 2.4rem;
}

.container--age {
  display: flex;
  flex-direction: column;
  color: var(--black);
  font-size: 5.6rem;
  font-style: italic;
  font-weight: 800;
  line-height: 110%;
  letter-spacing: -0.112rem;
}

span {
  display: flex;
  column-gap: 0.8rem;
}

strong {
  color: var(--purple);
}
</style>
