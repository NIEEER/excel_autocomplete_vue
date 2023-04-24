<!--<template>-->
<!--  <div class="hello">-->
<!--    <div style="display: flex">-->
<!--      &lt;!&ndash; 指向隐藏的input事件接收文件 &ndash;&gt;-->
<!--      <el-button type="primary" @click="$refs.fileInput.click()">-->
<!--        导入-->
<!--        <input ref="fileInput" type="file" @change="readExcel" style="display: none"/>-->
<!--        <i class="el-icon-upload el-icon&#45;&#45;right"></i></el-button>-->
<!--      <el-button @click="recoveryOneStepExcelData">恢复上一步</el-button>-->
<!--      <el-button @click="recoveryExcelData">恢复到开始</el-button>-->
<!--      <el-button @click="exportExcel">导出为 Excel</el-button>-->
<!--    </div>-->
<!--    <LoadingAnimation :visible="loading"/>-->
<!--    <table v-if="excelData.length>0" class="table">-->
<!--      <thead>-->
<!--      <tr>-->
<!--        <th>操作</th>-->
<!--        <th v-for="(value, index) in excelData[0]" :key="index">-->
<!--          {{ index }}-->
<!--        </th>-->
<!--      </tr>-->
<!--      </thead>-->
<!--      <tbody>-->
<!--      <tr v-for="(row, rowIndex) in paginatedData" :key="rowIndex">-->
<!--&lt;!&ndash;        <td v-on="logger(row)">&ndash;&gt;-->
<!--        <td v-on="logger(row)">-->
<!--          <button @click="deleteRow(rowIndex, $event)">-->
<!--            <i class="el-icon-remove-outline"></i>-->
<!--          </button>-->
<!--        </td>-->
<!--        <td v-for="(value, key) in row"-->
<!--            :key="key"-->
<!--            style="padding: 1px">-->
<!--          <auto-complete-input-->
<!--              :rowIndex=rowIndex-->
<!--              :value=row[key]-->
<!--              :columnName="key"-->
<!--              @inputValueChange="inputValueChange"-->
<!--          />-->
<!--        </td>-->
<!--      </tr>-->
<!--      </tbody>-->
<!--    </table>-->
<!--    <el-button style="display: flex" v-if="excelData.length>0 && currentPage === totalPages" @click="addRow">添加行-->
<!--    </el-button>-->
<!--    <div v-if="excelData.length" class="pagination">-->
<!--      <button @click="currentPage > 1 && currentPage&#45;&#45;">上一页</button>-->
<!--      <span>一共{{ totalPages }}页 当前页：{{ currentPage }}</span>-->
<!--      <button @click="currentPage < totalPages && currentPage++">下一页</button>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import * as XLSX from 'xlsx';-->
<!--import {saveAs} from 'file-saver';-->
<!--import AutoCompleteInput from './util_component/AutoCompleteInput.vue';-->
<!--import LoadingAnimation from "@/components/style_component/LoadingAnimation";-->

<!--export default {-->
<!--  name: 'TranslateExcel',-->
<!--  components: {-->
<!--    LoadingAnimation,-->
<!--    AutoCompleteInput,-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      excelData: [],-->
<!--      oldExcelData: [],-->
<!--      recoveryData: [],-->
<!--      currentPage: 1,-->
<!--      pageSize: 20,-->
<!--      loading: false-->
<!--    }-->
<!--  },-->
<!--  props: {},-->
<!--  watch: {},-->
<!--  methods: {-->
<!--    logger(msg){-->
<!--      console.log(msg)-->
<!--    },-->
<!--    generateUniqueKey(){-->
<!--      return this.$utils.getUUID();-->
<!--    },-->
<!--    addRow(event) {-->
<!--      // 备份表格数据-->
<!--      this.oldExcelData.push(JSON.stringify(this.excelData));-->
<!--      // 获取第一个对象的键（key）-->
<!--      const keys = Object.keys(this.excelData[0]);-->
<!--      // 创建一个新的空对象-->
<!--      const newEmptyObject = {};-->
<!--      for (const key of keys) {-->
<!--        newEmptyObject[key] = '';-->
<!--      }-->
<!--      // 将新的空对象添加到数组中-->
<!--      // this.excelData.push(newEmptyObject);-->
<!--      this.excelData.unshift(newEmptyObject);-->
<!--      this.$utils.makeButtonUnFocus(event);-->
<!--    },-->
<!--    deleteRow(rowIndex, event) {-->
<!--      // 备份表格数据-->
<!--      this.oldExcelData.push(JSON.stringify(this.excelData));-->
<!--      // 根据索引删除行-->
<!--      this.excelData.splice(rowIndex, 1);-->
<!--      this.$utils.makeButtonUnFocus(event);-->
<!--    },-->
<!--    recoveryOneStepExcelData(event) {-->
<!--      try {-->
<!--        if (this.oldExcelData.length < 1) {-->
<!--          alert("已恢复到最初位置");-->
<!--          this.$utils.makeButtonUnFocus(event);-->
<!--          return;-->
<!--        }-->
<!--        this.$set(this, 'excelData', JSON.parse(this.oldExcelData.pop()))-->
<!--      } catch (e) {-->
<!--        alert("已恢复到最初位置")-->
<!--      }-->
<!--      this.$utils.makeButtonUnFocus(event);-->
<!--    },-->
<!--    recoveryExcelData(event) {-->
<!--      try {-->
<!--        this.$set(this, 'excelData', JSON.parse(this.recoveryData));-->
<!--        this.$set(this, 'oldExcelData', []);-->
<!--      } catch (e) {-->
<!--        alert("操作失败，已经是初始状态");-->
<!--      }-->
<!--      this.$utils.makeButtonUnFocus(event);-->
<!--    },-->
<!--    inputValueChange(value) {-->
<!--      this.excelData[value.rowIndex][value.columnName] = value.inputValue;-->
<!--    },-->
<!--    initExcelData() {-->
<!--      this.$set(this, 'excelData', []);-->
<!--      this.$set(this, 'oldExcelData', []);-->
<!--      this.$set(this, 'recoveryData', []);-->
<!--      this.$set(this, 'currentPage', 1);-->
<!--    },-->
<!--    async readExcel(event) {-->
<!--      this.initExcelData();-->
<!--      this.loading = true;-->
<!--      const file = event.target.files[0];-->
<!--      const reader = new FileReader();-->

<!--      reader.onload = (e) => {-->
<!--        const data = e.target.result;-->
<!--        const workbook = XLSX.read(data, {type: 'binary'});-->

<!--        // 选择工作表，默认选择第一个-->
<!--        const sheetName = workbook.SheetNames[0];-->
<!--        const worksheet = workbook.Sheets[sheetName];-->

<!--        // 将工作表转换为 JSON 格式-->
<!--        // 在此处处理或显示数据，例如将其保存到 Vue data 属性中-->
<!--        this.$set(this, 'excelData', XLSX.utils.sheet_to_json(worksheet));-->
<!--        this.$set(this, 'recoveryData', JSON.stringify(this.excelData));-->
<!--        this.loading = false;-->
<!--      };-->
<!--      reader.readAsBinaryString(file);-->
<!--    },-->
<!--    exportExcel(event) {-->
<!--      try {-->
<!--        if (this.excelData.length < 1) {-->
<!--          alert("没有数据");-->
<!--          this.$utils.makeButtonUnFocus(event);-->
<!--          return;-->
<!--        }-->
<!--      } catch (e) {-->
<!--        alert("操作错误");-->
<!--        this.$utils.makeButtonUnFocus(event);-->
<!--        return;-->
<!--      }-->
<!--      const worksheet = XLSX.utils.json_to_sheet(this.excelData);-->
<!--      const workbook = XLSX.utils.book_new();-->

<!--      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');-->

<!--      const wbout = XLSX.write(workbook, {bookType: 'xlsx', type: 'binary'});-->

<!--      const buf = new ArrayBuffer(wbout.length);-->
<!--      const view = new Uint8Array(buf);-->
<!--      for (let i = 0; i < wbout.length; i++) {-->
<!--        view[i] = wbout.charCodeAt(i) & 0xFF;-->
<!--      }-->
<!--      saveAs(new Blob([buf], {type: 'application/octet-stream'}), '导出文件.xlsx');-->
<!--      this.$utils.makeButtonUnFocus(event);-->
<!--    }-->
<!--  },-->
<!--  computed: {-->
<!--    paginatedData() {-->
<!--      const start = (this.currentPage - 1) * this.pageSize;-->
<!--      const end = start + this.pageSize;-->
<!--      return this.excelData.slice(start, end);-->
<!--    },-->
<!--    totalPages() {-->
<!--      return Math.ceil(this.excelData.length / this.pageSize);-->
<!--    }-->
<!--  }-->


<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--table {-->
<!--  border-collapse: collapse;-->
<!--  width: 100%;-->
<!--}-->

<!--th {-->
<!--  background-color: #f2f2f2;-->
<!--  font-weight: bold;-->
<!--  padding: 8px;-->
<!--  text-align: left;-->
<!--  border: 1px solid #ddd;-->
<!--}-->

<!--td {-->
<!--  padding: 8px;-->
<!--  border: 1px solid #ddd;-->
<!--}-->

<!--tr:nth-child(even) {-->
<!--  background-color: #f9f9f9;-->
<!--}-->

<!--.pagination {-->
<!--  display: flex;-->
<!--  justify-content: center;-->
<!--  align-items: center;-->
<!--  margin-top: 1em;-->
<!--}-->

<!--.pagination button {-->
<!--  background-color: #4CAF50;-->
<!--  color: white;-->
<!--  padding: 8px 16px;-->
<!--  margin: 0 4px;-->
<!--  border: none;-->
<!--  cursor: pointer;-->
<!--}-->

<!--.pagination button:hover {-->
<!--  background-color: #45a049;-->
<!--}-->

<!--.pagination span {-->
<!--  padding: 8px 16px;-->
<!--}-->
<!--</style>-->
