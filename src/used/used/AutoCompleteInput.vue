<!--<template>-->
<!--  <div class="auto-complete">-->
<!--    <input class="input-style"-->
<!--           :style="cellStyle"-->
<!--           v-model="inputValue"-->
<!--           @input="onInputChange(columnName, inputValue)"-->
<!--           @blur="hideSuggestions"-->
<!--           @focus="showSuggestions"-->
<!--           @keydown.up.prevent="navigateSuggestions(-1)"-->
<!--           @keydown.down.prevent="navigateSuggestions(1)"-->
<!--           @keydown.enter.prevent="selectHighlighted"-->
<!--           @keydown.ctrl.89.prevent="reset"-->
<!--    />-->
<!--    <ul v-show="showSuggestionList" class="suggestion-list">-->
<!--      <li-->
<!--          v-for="(item, index) in filteredData"-->
<!--          :key="index"-->
<!--          @click="selectItem(item)"-->
<!--          :class="{ 'highlighted': highlightedIndex === index }"-->
<!--      >-->
<!--        {{ item }}-->
<!--      </li>-->

<!--    </ul>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import axios from "axios";-->

<!--axios.defaults.baseURL = 'http://192.168.31.13:10000';-->
<!--const searchApi = require('../../api/search_api.json')-->

<!--export default {-->
<!--  props: {-->
<!--    value: String,-->
<!--    columnName: String // 添加此属性以从父组件接收列名-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      oldValue: this.value,-->
<!--      inputValue: this.value,-->
<!--      showSuggestionList: false,-->
<!--      filteredData: [],-->
<!--      highlightedIndex: -1, // 添加此属性以跟踪当前突出显示的索引-->
<!--      cellStyle: {}-->
<!--    };-->
<!--  },-->
<!--  watch: {-->
<!--    value(newVal) {-->
<!--      this.inputValue = newVal;-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    async getCellStyle(key, value) {-->
<!--      this.$set(this, "cellStyle", {borderColor: "#ffff00"})-->
<!--      let celColor = "";-->
<!--      await axios.get(searchApi.columnValueExist, {-->
<!--        params: {-->
<!--          columnName: key,-->
<!--          inputValue: value-->
<!--        }-->
<!--      }).then((res) => {-->
<!--        celColor = (res.data.data ? "" : "#ff0000")-->
<!--        this.$set(this, "cellStyle", {borderColor: celColor})-->
<!--      }).catch((err) => {-->
<!--        console.log(err)-->
<!--      });-->
<!--    },-->
<!--    getFilteredData(columnName, inputValue) {-->
<!--      axios.get(searchApi.columnValueList, {-->
<!--        params: {-->
<!--          columnName: columnName,-->
<!--          inputValue: inputValue-->
<!--        },-->
<!--        timeout: 800-->
<!--      }).then((res) => {-->
<!--        this.$set(this, "filteredData", res.data.data)-->
<!--      });-->
<!--    },-->
<!--    onInputChange(columnName, inputValue) {-->
<!--      this.getFilteredData(columnName, inputValue);-->
<!--      this.$emit('inputValueChange', this.inputValue);-->
<!--    },-->
<!--    selectItem(item) {-->
<!--      this.inputValue = item;-->
<!--      this.$emit('inputValueChange', this.inputValue);-->
<!--      this.hideSuggestions();-->
<!--    },-->
<!--    showSuggestions() {-->
<!--      this.getFilteredData(this.columnName, this.inputValue);-->
<!--      this.showSuggestionList = true;-->
<!--    },-->
<!--    hideSuggestions() {-->
<!--      this.getCellStyle(this.columnName, this.inputValue);-->
<!--      setTimeout(() => {-->
<!--        this.showSuggestionList = false;-->
<!--      }, 200);-->
<!--    },-->
<!--    navigateSuggestions(direction) {-->
<!--      if (!this.showSuggestionList) {-->
<!--        return;-->
<!--      }-->
<!--      this.highlightedIndex += direction;-->
<!--      if (this.highlightedIndex < 0) {-->
<!--        this.highlightedIndex = this.filteredData.length - 1;-->
<!--      } else if (this.highlightedIndex >= this.filteredData.length) {-->
<!--        this.highlightedIndex = 0;-->
<!--      }-->
<!--    },-->
<!--    selectHighlighted() {-->
<!--      if (this.highlightedIndex >= 0 && this.highlightedIndex < this.filteredData.length) {-->
<!--        this.selectItem(this.filteredData[this.highlightedIndex]);-->
<!--      }-->
<!--    },-->
<!--    reset() {-->
<!--      // 按ctrl+y恢复原数据-->
<!--      this.inputValue = this.oldValue;-->
<!--      this.$emit('inputValueChange', this.oldValue);-->
<!--    }-->
<!--  },-->
<!--  mounted() {-->
<!--    this.getCellStyle(this.columnName, this.value);-->
<!--  }-->
<!--};-->
<!--</script>-->

<!--<style scoped>-->
<!--.input-style {-->
<!--  border: 1px solid #ccc;-->
<!--  padding-left: 5px;-->
<!--  height: 24px;-->
<!--  font-size: 14px;-->
<!--}-->

<!--.input-style:focus {-->
<!--  border-color: #66afe9;-->
<!--  outline: 0;-->
<!--  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6);-->
<!--  box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6)-->
<!--}-->

<!--.auto-complete {-->
<!--  position: relative;-->
<!--  display: inline-block;-->
<!--}-->

<!--.suggestion-list {-->
<!--  position: absolute;-->
<!--  z-index: 1000;-->
<!--  background-color: white;-->
<!--  list-style: none;-->
<!--  margin: 0;-->
<!--  padding: 0;-->
<!--  border: 1px solid #ddd;-->
<!--  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);-->
<!--  max-height: 200px;-->
<!--  overflow-y: auto;-->
<!--  width: 100%;-->
<!--}-->

<!--.suggestion-list li {-->
<!--  padding: 8px;-->
<!--  cursor: pointer;-->
<!--}-->

<!--.suggestion-list li:hover {-->
<!--  background-color: #f9f9f9;-->
<!--}-->

<!--.suggestion-list li.highlighted {-->
<!--  background-color: #f1f1f1;-->
<!--}-->

<!--</style>-->
