<script setup lang="ts">
import { dayBefore, getFirstDayWeek, getLastDayWeek, monthBefore, nextDay, nextMonth, nextWeek, weekBefore } from '@/plugins/dates';
import { ref } from 'vue';


const selectedDay = ref(new Date());
const viewTaskMode = [ "Today", "Week", "Month", "All" ],
    selected = ref("Today"),
    monthList = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "Dezember"
    ],

    emit = defineEmits(['selectedViewTaskMode', 'selectedDay']),

    selectedDayOutput = ref(formatDateToISOString(selectedDay.value));

function setNextDay(){
  selectedDay.value = nextDay(selectedDay.value);
  selectedDayOutput.value = formatDateToISOString(selectedDay.value);
  emit('selectedDay', selectedDay.value);
}

function setDayBefore(){
  selectedDay.value = dayBefore(selectedDay.value);
  selectedDayOutput.value = formatDateToISOString(selectedDay.value);
  emit('selectedDay', selectedDay.value);
}

function setNextWeek(){
  selectedDay.value = nextWeek(selectedDay.value);
  emit('selectedDay', selectedDay.value);
}

function setWeekBefore(){
  selectedDay.value = weekBefore(selectedDay.value);
  emit('selectedDay', selectedDay.value);
}

function setMonthBefore(){
  selectedDay.value = monthBefore(selectedDay.value);
  emit('selectedDay', selectedDay.value);
}

function setNextMonth(){
  selectedDay.value = nextMonth(selectedDay.value);
  emit('selectedDay', selectedDay.value);
}

function emitselectedViewTaskMode(){
  emit('selectedViewTaskMode', selected.value);
};

function formatDateToISOString(date2Format: Date): string {
  const 
    year = date2Format.getFullYear(),
    month = String(date2Format.getMonth() + 1).padStart(2, "0"),
    day = String(date2Format.getDate()).padStart(2, "0"),
    promptDay: string = year + "-" + month + "-" + day;
  return promptDay;
};

function changedSelectedDay(event: Event){
  selectedDay.value = new Date((event.target as HTMLInputElement).value);
}
</script>
<template>
  <div class="navBox">
    <div style="width: 100%; display: flex; justify-content: center; margin-bottom: 1rem;">
    <select v-model="selected" style="width: fit-content;" v-on:change="emitselectedViewTaskMode">
      <option v-for="item in viewTaskMode" :key="item" :value="item">{{ item }}</option>
    </select>
    </div>
    <div v-if="selected === viewTaskMode[0]" class="nav" style="font-size: xx-large;">
      <button class="btn-test" v-on:click="setDayBefore()">
        <i class="bi bi-arrow-left-circle "></i>
        <i class="bi bi-arrow-left-circle-fill "></i>
        <span>Day Before</span>
      </button>
      <input type="date" v-bind:value="selectedDayOutput" v-on:change="changedSelectedDay" />
      <button class="btn-test" v-on:click="setNextDay()">
        <span>Next Day</span>
        <i class="bi bi-arrow-right-circle "></i>
        <i class="bi bi-arrow-right-circle-fill "></i>
      </button>
    </div>

    <div v-if="selected === viewTaskMode[1]" class="nav">
      <button class="btn-test" v-on:click="setWeekBefore()">
        <i class="bi bi-arrow-left-circle "></i>
        <i class="bi bi-arrow-left-circle-fill "></i>
        <span>Week Before</span>
      </button>
      <h1>
        {{ getFirstDayWeek(selectedDay).toDateString() }}
        <br />
        <i class="bi bi-arrows"></i>
        <i class="bi bi-arrows-vertical"></i>
        <i class="bi bi-arrow-down-up"></i>
        <i class="bi bi-arrow-left-right"></i>
        <br />
        {{ getLastDayWeek(selectedDay).toDateString() }}
      </h1>
      <button class="btn-test" v-on:click="setNextWeek()">
        <span>Next Week</span>
        <i class="bi bi-arrow-right-circle "></i>
        <i class="bi bi-arrow-right-circle-fill "></i>
      </button>
    </div>

    <div v-if="selected === viewTaskMode[2]" class="nav">
      <button class="btn-test" v-on:click="setMonthBefore()">
        <i class="bi bi-arrow-left-circle "></i>
        <i class="bi bi-arrow-left-circle-fill "></i>
        <span>Month Before</span>
      </button>
      <h1>{{ monthList[selectedDay.getMonth()] }} {{ selectedDay.getFullYear() }}</h1>
      <button class="btn-test" v-on:click="setNextMonth()">
        <span>Next Month</span>
        <i class="bi bi-arrow-right-circle "></i>
        <i class="bi bi-arrow-right-circle-fill "></i>
      </button>
    </div>
  </div>
</template>
<style lang="css" scoped>
.navBox {
  padding: 20px;
  max-width: 100vw;
  width: fit-content;
  border: 2px solid black;
  border-radius: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background-color: cornflowerblue;
  background-color: hsla(160, 100%, 47%, 1);
}

.nav {
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: center;
  gap: 40px;
}

input[type=date]{
  font-size: x-large;
}

.btn-test {
  --margin-icon-span: 1rem;
}

.btn-test i.bi.bi-arrow-left-circle-fill {
  display: none;
  margin-right: var(--margin-icon-span);
}

.btn-test i.bi.bi-arrow-left-circle {
  margin-right: var(--margin-icon-span);
  display: inline;
}

.btn-test:hover i.bi.bi-arrow-left-circle {
  margin-right: var(--margin-icon-span);
  display: none;
}

.btn-test:hover i.bi.bi-arrow-left-circle-fill {
  margin-right: var(--margin-icon-span);
  display: inline;
}

.btn-test i.bi.bi-arrow-right-circle-fill {
  display: none;
  margin-left: var(--margin-icon-span);
}

.btn-test i.bi.bi-arrow-right-circle {
  margin-left: var(--margin-icon-span);
  display: inline;
}

.btn-test:hover i.bi.bi-arrow-right-circle {
  margin-left: var(--margin-icon-span);
  display: none;
}

.btn-test:hover i.bi.bi-arrow-right-circle-fill {
  margin-left: var(--margin-icon-span);
  display: inline;
}
</style>