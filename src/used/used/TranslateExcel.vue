<!--<template>-->
<!--  <div class="hello">-->
<!--    <input type="file" @change="readExcel"/>-->
<!--    <button @click="recoveryExcelData">恢复上一步</button>-->
<!--    <button @click="exportExcel">导出为 Excel</button>-->
<!--    <LoadingAnimation :visible="loading"/>-->
<!--    <table v-if="excelData.length>0" class="table">-->
<!--      <thead>-->
<!--      <tr>-->
<!--        <th>操作</th>-->
<!--        <th v-for="(value, key) in excelData[0]" :key="key">-->
<!--          {{ key }}-->
<!--        </th>-->
<!--      </tr>-->
<!--      </thead>-->
<!--      <tbody>-->
<!--      <tr v-for="(row, rowIndex) in paginatedData" :key="rowIndex">-->
<!--        <td>-->
<!--          <button @click="deleteRow(rowIndex)">-</button>-->
<!--        </td>-->
<!--        <td v-for="(value, key) in row"-->
<!--            :key="key"-->
<!--            style="padding: 2px"-->
<!--        >-->
<!--          <auto-complete-input-->
<!--              :value=row[key]-->
<!--              :columnName="key"-->
<!--          />-->
<!--        </td>-->
<!--      </tr>-->
<!--      </tbody>-->
<!--    </table>-->
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
<!--      currentPage: 1,-->
<!--      pageSize: 20,-->
<!--      loading: false-->
<!--    }-->
<!--  },-->
<!--  props: {-->
<!--    msg: String-->
<!--  },-->
<!--  watch: {},-->
<!--  methods: {-->
<!--    deleteRow(rowIndex) {-->
<!--      // 根据索引删除行，并备份表格数据-->
<!--      this.oldExcelData.push(JSON.stringify(this.excelData));-->
<!--      this.excelData.splice(rowIndex, 1);-->
<!--    },-->
<!--    recoveryExcelData() {-->
<!--      try {-->
<!--        this.$set(this, 'excelData', JSON.parse(this.oldExcelData.pop()))-->
<!--      }catch (e) {-->
<!--        console.log(e)-->
<!--        alert("已恢复到最初位置")-->
<!--      }-->
<!--    },-->
<!--    async readExcel(event) {-->
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
<!--        this.excelData = XLSX.utils.sheet_to_json(worksheet);-->
<!--        // this.oldExcelData.push(JSON.stringify(this.excelData));-->
<!--        this.loading = false;-->
<!--      };-->
<!--      reader.readAsBinaryString(file);-->
<!--    },-->
<!--    exportExcel() {-->
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
