<template>
    <div class="solution-list">
      <i-card class="content-card">
        <div class="content-card__header">
          <span>解决方案管理</span>
        </div>
        <div class="edit">
          <div class="edit__fields">
            <i-row>
              <i-col :span="6">
                <i-input placeholder="解决方案标题" v-model.trim="title" clearable></i-input>
              </i-col>
              <i-col :span="4" :offset="14">
                <i-button type="primary" @click="getOrSearchSolutionList(1)">搜 索</i-button>
              </i-col>
            </i-row>
            <i-row>
              <i-table :columns="solutionColumns" border :data="solutionList"></i-table>
            </i-row>
            <i-row style="border: 1px solid #e9eaec;border-top: none">
              <div class="edit__page">
                <span>共有{{total}}条记录</span>
                <i-page :total="total" size="small" show-elevator :current="current" @on-change="pageChange"></i-page>
              </div>
            </i-row>
          </div>
        </div>
      </i-card>
    </div>
</template>

<script>
import axios from 'axios'
import moment from '@/filter/moment.js'
export default {
  data () {
    return {
      title: '',
      total: 0,
      current: 1,
      solutionColumns: [
        {
          title: '解决方案标题',
          key: 'title',
          minWidth: 120,
          ellipsis: true
        },
        {
          title: '解决方案地址',
          key: 'url',
          minWidth: 100,
          ellipsis: true
        },
        {
          title: '图片',
          key: 'imgUrl',
          minWidth: 120,
          render: (h, params) => {
            return h('div', {
              style: {
                textAlign: 'center'
              }
            }, [
              h('img', {
                attrs: {
                  src: params.row.imgUrl
                },
                style: {
                  width: '80px',
                  height: '80px',
                  verticalAlign: 'middle'
                }
              })
            ])
          }
        },
        {
          title: '解决方案描述',
          key: 'description',
          minWidth: 210,
          ellipsis: true
        },
        {
          title: '解决方案创建时间',
          key: 'createdAt',
          minWidth: 120,
          render: (h, params) => {
            return h('div', [
              h('span', {
                domProps: {
                  innerHTML: moment(params.row.createdAt)
                }
              })
            ])
          }
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
                    this.$router.push({path: `/main/solution/edit/${params.row._id}`})
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
                    axios.delete(`solution/${params.row._id}`).then(response => {
                      if (response.data.code === 200) {
                        this.getOrSearchSolutionList(1)
                        this.$Message.success({
                          content: response.data.msg,
                          duration: 5,
                          closable: true
                        })
                      } else {
                        this.$Message.error({
                          content: response.data.msg,
                          duration: 5,
                          closable: true
                        })
                      }
                    }).catch(err => {
                      console.log(err)
                    })
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      solutionList: []
    }
  },
  methods: {
    getOrSearchSolutionList (pages) {
      axios.get('solution', {
        params: {
          page: pages,
          rows: 10,
          title: this.title
        }
      }).then(response => {
        if (response.data.code === 200) {
          this.solutionList = response.data.data.solution
          this.total = response.data.data.total
        }
      }).catch(err => {
        console.log(err)
      })
    },
    pageChange (page) {
      this.getOrSearchSolutionList(page)
    }
  },
  mounted () {
    this.getOrSearchSolutionList(1)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
