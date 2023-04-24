<!--&lt;!&ndash; src/components/ElasticsearchManager.vue &ndash;&gt;-->
<!--<template>-->
<!--  <div>-->
<!--    <el-row>-->
<!--      <el-col :span="12">-->
<!--        <h2>Elasticsearch 索引库管理</h2>-->
<!--      </el-col>-->
<!--      <el-col :span="12">-->
<!--        <el-button type="primary" @click="getIndices">刷新索引库列表</el-button>-->
<!--      </el-col>-->
<!--    </el-row>-->
<!--    <el-table :data="indices" style="width: 100%">-->
<!--      <el-table-column prop="index" label="索引库名称" width="200"></el-table-column>-->
<!--      <el-table-column prop="docs_count" label="文档数量" width="100"></el-table-column>-->
<!--      <el-table-column prop="store_size" label="存储空间" width="100"></el-table-column>-->
<!--      <el-table-column label="操作" width="120">-->
<!--        <template v-slot="scope">-->
<!--          <el-button type="danger" size="mini" @click="deleteIndex(scope.$index, scope.row)">删除</el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--    </el-table>-->
<!--  </div>-->

<!--</template>-->

<!--<script>-->
<!--// import axios from "axios";-->

<!--export default {-->
<!--  name: "ElasticsearchManager",-->
<!--  data() {-->
<!--    return {-->
<!--      indices: [],-->
<!--    };-->
<!--  },-->
<!--  methods: {-->
<!--    async getIndices() {-->
<!--      const response = {-->
<!--        data: [-->
<!--          {-->
<!--            index: "index-1",-->
<!--            docs_count: 1000,-->
<!--            store_size: "500MB",-->
<!--          },-->
<!--          {-->
<!--            index: "index-2",-->
<!--            docs_count: 2000,-->
<!--            store_size: "1GB",-->
<!--          },-->
<!--          {-->
<!--            index: "index-3",-->
<!--            docs_count: 1500,-->
<!--            store_size: "750MB",-->
<!--          },-->
<!--        ],-->
<!--      };-->
<!--      try {-->
<!--        // const response = await axios.get("/api/elasticsearch/indices");-->
<!--        this.indices = response.data;-->
<!--      } catch (error) {-->
<!--        console.error(error);-->
<!--      }-->
<!--    },-->
<!--    async deleteIndex(index, row) {-->
<!--      console.log(index, row);-->
<!--      try {-->
<!--        // await axios.delete(`/api/elasticsearch/indices/${row.index}`);-->
<!--        this.indices.splice(index, 1);-->
<!--      } catch (error) {-->
<!--        console.error(error);-->
<!--      }-->
<!--    },-->
<!--  },-->
<!--  created() {-->
<!--    this.getIndices();-->
<!--  },-->
<!--};-->
<!--</script>-->
