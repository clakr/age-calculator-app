<script setup lang="ts">
import { inject, onBeforeMount, reactive, ref } from "vue";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const addSRHeading = inject("addSRHeading") as () => void;

onBeforeMount(() => {
  addSRHeading();
});

const date = reactive({
  day: "",
  month: "",
  year: "",
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
    const inputSpan = input.nextElementSibling as HTMLSpanElement;

    // check all inputs if empty
    if (!input.value) {
      input.setAttribute("required", "");
      inputSpan.innerText = "This field is required";
      continue;
    }

    const value = +input.value;
    const currentYear = new Date().getFullYear();

    // validation for `day` input
    if (input.id === "day" && (value < 1 || value > 31)) {
      input.setAttribute("min", "1");
      input.setAttribute("max", "31");
      inputSpan.innerText = "Must be a valid day";
      continue;
    }

    // validation for `month` input
    if (input.id === "month" && (value < 1 || value > 12)) {
      input.setAttribute("min", "1");
      input.setAttribute("max", "12");
      inputSpan.innerText = "Must be a valid month";
      continue;
    }

    // validation for `year` input
    if (input.id === "year" && value > currentYear) {
      input.setAttribute("max", currentYear.toString());
      inputSpan.innerText = "Must be in the past";
      continue;
    }
  }

  for (const input of inputArray) {
    if (!input.validity.valid) return;
  }

  const date = `${
    inputYearRef.value.value
  }-${inputMonthRef.value.value.padStart(
    2,
    "0"
  )}-${inputDayRef.value.value.padStart(2, "0")}`;

  const inputDaySpan = inputDayRef.value.nextElementSibling as HTMLSpanElement;

  if (!dayjs(date, "YYYY-MM-DD", true).isValid()) {
    inputDaySpan.style.display = "block";
    inputDaySpan.innerText = "Must be a valid date";

    for (const input of inputArray) {
      const inputLabel = input.previousElementSibling as HTMLLabelElement;
      inputLabel.style.color = "var(--red)";

      input.style.borderColor = "var(--red)";
    }

    return;
  }

  inputDaySpan.style.display = "none";
  for (const input of inputArray) {
    const inputLabel = input.previousElementSibling as HTMLLabelElement;
    inputLabel.style.color = "var(--grey)";

    input.style.borderColor = "var(--line )";
  }
}

function handleSubmit2() {
  if (!inputDayRef.value || !inputMonthRef.value || !inputYearRef.value) return;

  day: {
    const inputDayElement = inputDayRef.value;
    const inputSpan = inputDayRef.value.nextElementSibling as HTMLSpanElement;

    if (date.day === "") {
      inputDayRef.value.classList.add("invalid");

      inputDayElement.setAttribute("required", "");

      inputSpan.innerText = "This field is required";
      break day;
    }

    const dayValue = +date.day;

    if (dayValue < 1 || dayValue > 31) {
      inputDayRef.value.classList.add("invalid");

      inputDayElement.setAttribute("min", "1");
      inputDayElement.setAttribute("max", "31");

      inputSpan.innerText = "Must be a valid day";
      break day;
    }
  }

  month: {
    const inputMonthElement = inputMonthRef.value;
    const inputSpan = inputMonthRef.value.nextElementSibling as HTMLSpanElement;

    if (date.month === "") {
      inputMonthRef.value.classList.add("invalid");

      inputMonthElement.setAttribute("required", "");

      inputSpan.innerText = "This field is required";
      break month;
    }

    const monthValue = +date.month;

    if (monthValue < 1 || monthValue > 12) {
      inputMonthRef.value.classList.add("invalid");

      inputMonthElement.setAttribute("min", "1");
      inputMonthElement.setAttribute("max", "12");

      inputSpan.innerText = "Must be a valid month";
      break month;
    }
  }

  year: {
    const inputYearElement = inputYearRef.value;
    const inputSpan = inputYearRef.value.nextElementSibling as HTMLSpanElement;

    if (date.year === "") {
      inputYearRef.value.classList.add("invalid");

      inputYearElement.setAttribute("required", "");

      inputSpan.innerText = "This field is required";
      break year;
    }

    const yearValue = +date.year;

    if (yearValue < 1 || yearValue > 12) {
      inputYearRef.value.classList.add("invalid");

      inputYearElement.setAttribute("min", "1");
      inputYearElement.setAttribute("max", "12");

      inputSpan.innerText = "Must be a valid year";
      break year;
    }
  }
}
</script>

<template>
  <section>
    <form id="form" @submit.prevent="handleSubmit2">
      <fieldset>
        <label for="day">Day</label>
        <input id="day" ref="inputDayRef" v-model="date.day" type="number" />
        <span />
      </fieldset>
      <fieldset>
        <label for="month">Month</label>
        <input
          id="month"
          ref="inputMonthRef"
          v-model="date.month"
          type="number"
        />
        <span />
      </fieldset>
      <fieldset>
        <label for="year">Year</label>
        <input id="year" ref="inputYearRef" v-model="date.year" type="number" />
        <span />
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
    flex: 1 1 0px;

    span {
      color: var(--red);
      font-size: 1.2rem;
      font-style: italic;
    }

    &:has(input.invalid) label {
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

  &.invalid {
    border-color: var(--red);
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
