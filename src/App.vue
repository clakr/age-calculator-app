<script setup lang="ts">
import { inject, onBeforeMount, reactive, ref } from "vue";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import duration from "dayjs/plugin/duration";

dayjs.extend(customParseFormat);
dayjs.extend(duration);

const addSRHeading = inject("addSRHeading") as () => void;

onBeforeMount(() => {
  addSRHeading();
});

const date = reactive({
  day: "",
  month: "",
  year: "",
});

const result = reactive({
  day: "",
  month: "",
  year: "",
});

const inputDayRef = ref<HTMLInputElement | null>(null);
const inputMonthRef = ref<HTMLInputElement | null>(null);
const inputYearRef = ref<HTMLInputElement | null>(null);

function handleSubmit() {
  if (!inputDayRef.value || !inputMonthRef.value || !inputYearRef.value) return;

  const inputDayElement = inputDayRef.value;
  const inputMonthElement = inputMonthRef.value;
  const inputYearElement = inputYearRef.value;

  day: {
    const inputSpan = inputDayElement.nextElementSibling as HTMLSpanElement;

    if (date.day === "") {
      inputDayElement.classList.add("invalid");

      inputDayElement.setAttribute("required", "");

      inputSpan.innerText = "This field is required";
      break day;
    }

    const dayValue = +date.day;

    if (dayValue < 1 || dayValue > 31) {
      inputDayElement.classList.add("invalid");

      inputDayElement.setAttribute("min", "1");
      inputDayElement.setAttribute("max", "31");

      inputSpan.innerText = "Must be a valid day";
      break day;
    }

    inputDayElement.classList.remove("invalid");
    inputSpan.innerText = "";
  }

  month: {
    const inputSpan = inputMonthElement.nextElementSibling as HTMLSpanElement;

    if (date.month === "") {
      inputMonthElement.classList.add("invalid");

      inputMonthElement.setAttribute("required", "");

      inputSpan.innerText = "This field is required";
      break month;
    }

    const monthValue = +date.month;

    if (monthValue < 1 || monthValue > 12) {
      inputMonthElement.classList.add("invalid");

      inputMonthElement.setAttribute("min", "1");
      inputMonthElement.setAttribute("max", "12");

      inputSpan.innerText = "Must be a valid month";
      break month;
    }

    inputMonthElement.classList.remove("invalid");
    inputSpan.innerText = "";
  }

  year: {
    const inputSpan = inputYearElement.nextElementSibling as HTMLSpanElement;

    if (date.year === "") {
      inputYearElement.classList.add("invalid");

      inputYearElement.setAttribute("required", "");

      inputSpan.innerText = "This field is required";
      break year;
    }

    const yearValue = +date.year;
    const currentYear = new Date().getFullYear();

    if (yearValue < 1900 || yearValue > currentYear) {
      inputYearElement.classList.add("invalid");

      inputYearElement.setAttribute("min", "1900");
      inputYearElement.setAttribute("max", currentYear.toString());

      inputSpan.innerText = "Must be a valid year";
      break year;
    }

    inputYearElement.classList.remove("invalid");
    inputSpan.innerText = "";
  }

  if (
    inputDayElement.classList.contains("invalid") ||
    inputMonthElement.classList.contains("invalid") ||
    inputYearElement.classList.contains("invalid")
  )
    return;

  const inputDate = `${date.year}-${String(date.month).padStart(
    2,
    "0"
  )}-${String(date.day).padStart(2, "0")}`;

  if (!dayjs(inputDate, "YYYY-MM-DD", true).isValid()) {
    inputDayElement.classList.add("invalid");
    inputMonthElement.classList.add("invalid");
    inputYearElement.classList.add("invalid");

    const inputDaySpan = inputDayElement.nextElementSibling as HTMLSpanElement;

    inputDaySpan.innerText = "Must be a valid date";

    return;
  }

  const now = new Date();
  const birthday = new Date(inputDate);

  let years = now.getFullYear() - birthday.getFullYear();
  let months = now.getMonth() - birthday.getMonth();
  let days = now.getDate() - birthday.getDate();

  if (!months || months < 0) {
    years--;
    months += 12;
  }

  if (!days || days < 0) {
    months--;
    days += 31;
  }

  result.year = years.toString();
  result.day = days.toString();
  result.month = months.toString();
}
</script>

<template>
  <section>
    <form id="form" @submit.prevent="handleSubmit">
      <fieldset>
        <label for="day">Day</label>
        <input
          id="day"
          ref="inputDayRef"
          v-model="date.day"
          type="number"
          placeholder="DD"
        />
        <span />
      </fieldset>
      <fieldset>
        <label for="month">Month</label>
        <input
          id="month"
          ref="inputMonthRef"
          v-model="date.month"
          type="number"
          placeholder="MM"
        />
        <span />
      </fieldset>
      <fieldset>
        <label for="year">Year</label>
        <input
          id="year"
          ref="inputYearRef"
          v-model="date.year"
          type="number"
          placeholder="YYYY"
        />
        <span />
      </fieldset>
    </form>
    <div class="container--button">
      <button form="form">
        <img src="/icon-arrow.svg" alt="" />
      </button>
    </div>
    <div class="container--age">
      <span
        ><strong>{{ result.year || "--" }}</strong> years</span
      >
      <span
        ><strong>{{ result.month || "--" }}</strong> months</span
      >
      <span
        ><strong>{{ result.day || "--" }}</strong> days</span
      >
    </div>
  </section>
</template>

<style lang="scss" scoped>
section {
  background-color: white;
  min-width: 34.3rem;
  max-width: 84rem;
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
      display: none;
      color: var(--red);
      font-size: 1.2rem;
      font-style: italic;
    }

    &:has(input.invalid) {
      span {
        display: inline-block;
      }

      label {
        color: var(--red);
      }
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

  &:is(:active, :hover, :focus) {
    border-color: var(--purple);
  }

  &::placeholder {
    opacity: 0.5;
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

  &:is(:active, :hover, :focus) {
    background-color: var(--black);
  }
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

@media screen and (min-width: 768px) {
  section {
    row-gap: unset;
    padding: 5.6rem;
    border-bottom-right-radius: 20rem;
  }

  form {
    column-gap: 3.2rem;

    fieldset {
      row-gap: 0.8rem;
      flex: 0 0 16rem;

      span {
        display: none;
        color: var(--red);
        font-size: 1.4rem;
      }
    }
  }

  label {
    color: var(--grey);
    font-size: 1.4rem;
    letter-spacing: 0.35rem;
  }

  input {
    color: var(--black);
    font-size: 3.2rem;
    letter-spacing: 0.032rem;
    padding-inline: 2.4rem;
  }

  .container--button {
    place-items: flex-end;
  }

  img {
    width: 4.4rem;
    height: 4.4rem;
  }

  .container--age {
    font-size: 10.4rem;
    letter-spacing: -0.208rem;
  }
}
</style>
