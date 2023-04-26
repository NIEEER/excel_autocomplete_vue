<template>
  <div>
    <el-button type="primary" @click="$refs.fileInput.click()">
      从EXCEL导入
      <input ref="fileInput" type="file" @change="getFromFile" style="display: none"/>
      <i class="el-icon-upload el-icon--right"></i>
    </el-button>
    <el-button type="warning" @click="getFromDataBase">
      从数据库获取
      <i class="el-icon-download el-icon--right"></i>
    </el-button>
    <el-button type="success" @click="handleAdd">
      手动添加
      <i class="el-icon-edit-outline el-icon--right"></i>
    </el-button>
    <el-button type="danger" @click="init">
      重置
      <i class="el-icon-refresh-left el-icon--right"></i>
    </el-button>
    <div v-show="!showTable">
      <SplitLines :value="'请导入数据'"/>
    </div>
    <transition name="el-zoom-in-top">
      <div v-show="showTable" :style="{display: showTable ? null : true}">
        <el-table
            v-loading="showLoading"
            element-loading-spinner="el-icon-loading"
            element-loading-text="数据加载中"
            element-loading-background="waite"
            :data="paginatedData"
            border
            style="width: 100%"
            @row-dblclick="handleRowClick"
            @row-click="handleUnfocusedTable"
            @header-click="handleTableHeadClick">
          <el-table-column
              v-if="tableData.length>0"
              label="操作"
              width="80">
            <template v-slot="scope">
              <el-button
                  type="danger"
                  size="small"
                  @click="handleDelete(scope.$index)">
                删除
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
              v-for="(item, index) in tableColumns"
              :key="index"
              :label="item.label"
              width="180px"
              show-overflow-tooltip
              style="font-weight: bold">
            <template v-slot="scope">
              <el-input
                  v-if="scope.row === currentRow && item.prop !== 'id'"
                  v-model="scope.row[item.prop]"/>
              <span v-else>{{ scope.row[item.prop] }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </transition>
    <el-button v-show="tableData.length>0" type="primary" @click="handleAdd">
      添加
    </el-button>
    <div class="pagination" v-if="tableData.length">
      <el-button @click="currentPage > 1 && currentPage--">上一页</el-button>
      <span>共{{ totalPages }}页 当前页：{{ currentPage }}</span>
      <el-button @click="showNextPage">下一页</el-button>
      <el-button type="primary" @click="uploadToDataBase">更新数据</el-button>
    </div>
  </div>
</template>

<script>
import * as XLSX from "xlsx";
import axios from "axios"
import SplitLines from "@/components/style_component/SplitLines";

// axios.defaults.baseURL = 'http://127.0.0.1:10000';
const searchApi = require('../api/search_api.json')

export default {
  components: {SplitLines},
  data() {
    return {
      tableData: [],
      currentRow: null,
      currentPage: 1,
      pageSize: 10,
      totalPages: 1,
      fromDataBase: false,
      showLoading: false,
      tableColumns: []
    };
  },
  methods: {
    init() {
      {
        this.$set(this, 'tableData', []);
        this.$set(this, 'currentRow', null);
        this.$set(this, 'currentPage', 1);
        this.$set(this, 'totalPages', 1);
        this.$set(this, 'fromDataBase', false);
      }
    },
    handleUnfocusedTable(row) {
      // 点击当前行外的元素时，失焦当前行
      if (row !== this.currentRow) {
        this.currentRow = null;
      }
    },
    handleTableHeadClick() {
      // 点击表头也会触发input失焦
      this.currentRow = null;
    },
    getFromFile(event) {
      if (this.tableColumns.length < 1) {
        alert("无法连接到数据库");
        return;
      }
      const file = event.target.files[0];
      const reader = new FileReader();
      this.init();
      this.showLoading = true;
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, {type: 'binary'});
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const fileTableData = XLSX.utils.sheet_to_json(sheet);
        const fileTableColumns = this.getTableColumns(fileTableData);
        const tableColumns = JSON.parse(JSON.stringify(this.tableColumns));
        let count = 0;
        for (let i = 0, len = fileTableColumns.length; i < len; i++) {
          for (let j = 0, size = tableColumns.length; j < size; j++) {
            if (JSON.stringify(fileTableColumns[i]) === JSON.stringify(tableColumns[j])) {
              count++;
            }
          }
        }
        if (tableColumns.length !== count) {
          this.showLoading = false;
          alert("请导入正确的文件");
          return;
        }
        this.tableData = fileTableData;
        this.totalPages = Math.ceil(this.tableData.length / this.pageSize);
        this.showLoading = false;
      };
      reader.readAsBinaryString(file);
    },
    handleRowClick(row) {
      this.currentRow = row;
    },
    handleAdd() {
      if (this.tableColumns.length < 1) {
        alert("无初始化数据, 无法添加");
        return;
      }
      if (this.fromDataBase) {
        this.init();
      }
      let thisPage = this.currentPage;
      while (thisPage < (this.tableData.length / this.pageSize)) {
        thisPage++;
      }
      this.currentPage = thisPage;
      this.tableData.push({});
      if (this.currentPage < (this.tableData.length / this.pageSize)) {
        this.currentPage++;
        this.totalPages++;
      }
    },
    handleDelete(index) {
      index = 10 * (this.currentPage - 1) + index
      this.tableData.splice(index, 1);
    },
    showNextPage() {
      if (this.fromDataBase) {
        if ((this.currentPage === (this.tableData.length / this.pageSize))
            && (this.currentPage < this.totalPages)) {
          this.showLoading = true;
          const headString = 'http://api' + Math.ceil(Math.random() * 10).toString() + '.excel' + ':10000'
          axios.get(headString + searchApi.getJobListByPage, {
            params: {
              currentPage: this.currentPage + 1,
              pageSize: this.pageSize
            }
          }).then((res) => {
            this.totalPages = res.data.data["totalPages"];
            this.tableData.push(...res.data.data["jobList"]);
            this.currentPage++;
            this.showLoading = false;
          }).catch((err) => {
            alert("获取数据失败")
            console.log(err);
            this.showLoading = false;
          });
        } else if (this.currentPage < (this.tableData.length / this.pageSize)) {
          this.currentPage++;
        }
      } else {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
        }
      }
    },
    getFromDataBase() {
      this.init();
      this.showLoading = true;
      const headString = 'http://api' + Math.ceil(Math.random() * 10).toString() + '.excel' + ':10000';
      axios.get(headString + searchApi.getJobListByPage, {
        params: {
          currentPage: 1,
          pageSize: this.pageSize
        }
      }).then((res) => {
        this.totalPages = res.data.data["totalPages"];
        this.tableData = res.data.data["jobList"];
        this.tableColumns = this.getTableColumns(res.data.data["jobList"]);
        this.fromDataBase = true;
        this.showLoading = false;
      }).catch((err) => {
        alert("获取数据失败");
        console.log(err);
        this.showLoading = false;
      });
    },
    uploadToDataBase() {
      this.showLoading = true;
      if (this.checkTableData(this.tableData)) {
        alert("表格中存在空行，请检查");
        this.showLoading = false;
        return;
      }
      const headString = 'http://api' + Math.ceil(Math.random() * 10).toString() + '.excel' + ':10000';
      axios.post(headString + searchApi.uploadTableData, {
            tableData: this.tableData
          }
      ).then((res) => {
        if (res.data.code === 200) {
          alert("数据传输成功");
        } else {
          alert(res.data.msg)
        }
        this.showLoading = false;
      }).catch((err) => {
        alert("上传数据失败");
        console.log(err);
        this.showLoading = false;
      });
    },
    checkTableData(data) {
      let flag = false;
      data.forEach((objectValue) => {
        if (Object.values(objectValue).length === 0) {
          flag = true;
        }
      });
      return flag;
    },
    getTableColumns(data) {
      if (data.length === 0) return [];
      return Object.keys(this.$utils.getMaxObject(data)).map(key => ({
        prop: key,
        label: key,
      }));
    }
  },
  computed: {
    paginatedData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.tableData.slice(start, end);
    },
    showTable() {
      return this.tableData.length > 0;
    }
  },
  mounted() {
    const headString = 'http://api' + Math.ceil(Math.random() * 10).toString() + '.excel' + ':10000';
    axios.get(headString + searchApi.getOneEmptyData).then((res) => {
      this.tableColumns = this.getTableColumns(res.data.data["jobList"]);
    }).catch((err) => {
      alert("获取初始化数据失败");
      console.log(err);
    });
  }
};
</script>
<style>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1em;
}
</style>