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

    emit = defineEmits(['selectedViewTaskMode', 'selectedDay'])

let selectedDayOutput: string;

function setNextDay(){
  selectedDay.value = nextDay(selectedDay.value);
  selectedDayOutput = formatDateToISOString(selectedDay.value);
  emit('selectedDay', selectedDay.value);
}

function setDayBefore(){
  selectedDay.value = dayBefore(selectedDay.value);
  selectedDayOutput = formatDateToISOString(selectedDay.value);
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
  <select v-model="selected" style="width: fit-content;" v-on:change="emitselectedViewTaskMode">
    <option v-for="item in viewTaskMode" :key="item" :value="item">{{ item }}</option>
  </select>

  <div v-if="selected === viewTaskMode[0]" class="nav">
    <button v-on:click="setDayBefore()">⬅️ Day Before</button>
    <input type="date" v-bind:value="selectedDayOutput" v-on:change="changedSelectedDay" />
    <button v-on:click="setNextDay()">Next Day ➡️</button>
  </div>

  <div v-if="selected === viewTaskMode[1]" class="nav">
    <button v-on:click="setWeekBefore()">⬅️ Week Before</button>
    <h1>{{ getFirstDayWeek(selectedDay).toDateString() }}<br />↔<br />{{ getLastDayWeek(selectedDay).toDateString() }}</h1>
    <button v-on:click="setNextWeek()">Next Week ➡️</button>
  </div>

  <div v-if="selected === viewTaskMode[2]" class="nav">
    <button v-on:click="setMonthBefore()">⬅️ Month Before</button>
    <h1>{{ monthList[selectedDay.getMonth()] }} {{ selectedDay.getFullYear() }}</h1>
    <button v-on:click="setNextMonth()">Next Month ➡️</button>
  </div>
</template>
<style lang="css" scoped>
.nav {
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: center;
  border: 1px solid black;
  min-width: 800px;
  gap: 40px;
}

input[type=date]{
  font-size: x-large;
}
</style>