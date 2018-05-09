<template>
    <div class="introduction-list">
      <i-card class="content-card">
        <div class="content-card__header">
          <span>简介管理</span>
        </div>
        <div class="edit">
          <div class="edit__fields">
            <i-row>
              <i-col :span="6">
                <i-input placeholder="标题栏标题"></i-input>
              </i-col>
              <i-col :span="4" :offset="14">
                <i-button type="primary">搜 索</i-button>
              </i-col>
            </i-row>
            <i-row>
              <i-table border :columns="introductionColumns" :data="introductionList"></i-table>
            </i-row>
            <i-row style="border: 1px solid #e9eaec;border-top: none;margin-top: 0px">
              <div class="edit__page">
                <span>共有3条记录</span>
                <i-page :total="100" size="small" show-elevator></i-page>
              </div>
            </i-row>
          </div>
        </div>
      </i-card>
    </div>
</template>

<script>
// import axios from 'axios'
export default {
  data () {
    return {
      introductionColumns: [
        {
          title: '公司简介标题',
          key: 'title'
        },
        {
          title: '公司简介内容',
          key: 'content'
        },
        {
          title: '公司简介图片',
          key: 'images'
        },
        {
          title: '简介创建时间',
          key: 'createdAt'
        },
        {
          title: '操作',
          key: 'action',
          minWidth: 100,
          ellipsis: true,
          render: (h, params) => {
            return h('div', [
              h('i-button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                class: {

                },
                style: {
                  marginRight: '5px',
                  textAlign: 'left',
                  paddingLeft: '0px'
                },
                on: {
                  click: () => {
                    console.log(2)
                  },
                  hover: () => {
                    console.log(1)
                  }
                }
              }, '修改'),
              h('i-button', {
                props: {
                  size: 'small',
                  type: 'text'
                },
                style: {
                  color: 'red'
                },
                on: {
                  click: () => {
                    console.log(3)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      introductionList: []
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
