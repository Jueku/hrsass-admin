<template>
  <div>
    <!-- 工作日历, 年和月 -->
    <div class="select-box">
      <el-select v-model="currentYear" size="small" style="width: 120px; margin-right: 10px" @change="changeDate">
        <!-- 年份取给定年份的, 前五年 + 后五年 -->
        <el-option v-for="item in yearList" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="currentMonth" size="small" style="width: 120px;" @change="changeDate">
        <el-option v-for="item in 12" :key="item" :label="item" :value="item" />
      </el-select>
    </div>
    <!-- el-calendar跟select-box是同级的元素 -->
    <el-calendar v-model="currentDate">
      <template #dateCell="{date}">
        <div class="date-content">
          <span class="text">{{ getDate(date) }}</span>
          <span v-if="isWeek(date)" class="rest">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  props: {
    startDate: {
      type: Date,
      default: () => {
        return new Date()
      }
    }
  },
  data() {
    return {
      currentYear: null, // 当前年份
      currentMonth: null, // 当前月份
      currentDate: null
    }
  },
  computed: {
    yearList() {
      // 前5年 + 后5年
      const arr = []
      const startYear = this.currentYear - 5
      const endYear = this.currentYear + 5
      for (let i = startYear; i <= endYear; i++) {
        arr.push(i)
      }
      return arr
    }
  },
  watch: {
    currentDate(newVal) {
      // console.log(newVal)
      this.currentYear = new Date(newVal).getFullYear()
      this.currentMonth = new Date(newVal).getMonth() + 1
    }
  },
  created() {
    this.currentYear = this.startDate.getFullYear() // 得到当前年份
    this.currentMonth = this.startDate.getMonth() + 1 // 当前月份
  },
  methods: {
    isWeek(date) {
      const day = new Date(date).getDay()
      if ([0, 6].includes(day)) {
        return true
      }
    },
    getDate(date) {
      return new Date(date).getDate()
    },
    /**
     * 日期改变
     */
    changeDate() {
      this.currentDate = new Date(`${this.currentYear}-${this.currentMonth}-1`)
    }
  }
}
</script>

<style lang="scss" scoped>
.select-box {
  display: flex;
  justify-content: flex-end;
}

::v-deep .el-calendar-day {
  height:  auto;
}
::v-deep .el-calendar-table__row td::v-deep .el-calendar-table tr td:first-child, ::v-deep .el-calendar-table__row td.prev{
  border: none;
}
.date-content {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.date-content .rest {
  color: #fff;
  border-radius: 50%;
  background: rgb(250, 124, 77);
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
}
.date-content .text{
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;

}
::v-deep .el-calendar-table td.is-selected .text{
  background: #409eff;
  color: #fff;
  border-radius: 50%;
}
::v-deep .el-calendar__header {
  display: none
}
</style>
