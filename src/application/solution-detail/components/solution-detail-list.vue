<template>
    <div class="solution-detail-list">
      <i-card class="content-card">
        <div class="content-card__header">
          <span>解决方案详情管理</span>
        </div>
        <div class="edit">
          <div class="edit__fields">
            <i-row>
              <i-col :span="6">
                <i-input placeholder="软件介绍" v-model.trim="introduction" clearable></i-input>
              </i-col>
              <i-col :span="4" :offset="14">
                <i-button type="primary" @click="getOrSearchSolutionDetailList(1)">搜 索</i-button>
              </i-col>
            </i-row>
            <i-row>
              <i-table border :columns="solutionDetailColumns" :data="solutionDetailList"></i-table>
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
      total: 0,
      current: 1,
      introduction: '',
      solutionDetailList: [],
      solutionDetailColumns: [
        {
          title: '对应的解决方案',
          key: 'technology',
          minWidth: 110,
          ellipsis: true,
          align: 'center',
          render: (h, params) => {
            return h('span', {
              domProps: {
                // innerHTML: params.row.name
                innerHTML: params.row.solution.title
              }
            })
          }
        },
        {
          title: '软件介绍',
          key: 'introduction',
          minWidth: 140,
          align: 'center',
          ellipsis: true
          // render: (h, params) => {
          //   return h('', {
          //     domProps: {
          //       innerHTML: params.row.introduction
          //     }
          //   })
          // }
        },
        {
          title: '组成部分和应用领域',
          key: 'constitute',
          minWidth: 130,
          ellipsis: true,
          align: 'center'
        },
        {
          title: '技术特点',
          key: 'solutionId',
          minWidth: 120,
          ellipsis: true,
          align: 'center',
          render: (h, params) => {
            return h('span', {
              domProps: {
                innerHTML: params.row.technology.split(',').join('/')
                // innerHTML: params.row.technology.join(' / ')
              },
              style: {
                fontSize: '14px'
              }
            })
          }
        },
        {
          title: '解决方案创建时间',
          key: 'createdAt',
          minWidth: 103,
          align: 'center',
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
          minWidth: 80,
          ellipsis: true,
          align: 'center',
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
                    this.$router.push({path: `/main/solution-detail/edit/${params.row._id}`})
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
                    this.$Modal.confirm({
                      title: '提示',
                      content: '<p style="font-size: 14px">此操作将会永久删除该条记录，是否继续？</p>',
                      closable: true,
                      onOk: () => {
                        axios.delete(`solution-detail/${params.row._id}`).then(response => {
                          if (response.data.code === 200) {
                            this.getOrSearchSolutionDetailList(1)
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
                      },
                      onCancel: () => {
                      }
                    })
                  }
                }
              }, '删除')
            ])
          }
        }
      ]
    }
  },
  methods: {
    getOrSearchSolutionDetailList (pages) {
      this.current = pages
      axios.get('solution-detail', {
        params: {
          page: pages,
          rows: 10,
          introduction: this.introduction
        }
      }).then(response => {
        if (response.data.code === 200) {
          this.$Message.success({
            content: response.data.msg,
            duration: 5,
            closable: true
          })
          this.solutionDetailList = response.data.data.solutionDetail
          this.total = response.data.data.total
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
    },
    pageChange (page) {
      this.getOrSearchSolutionDetailList(page)
    }
  },
  mounted () {
    this.getOrSearchSolutionDetailList(1)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
</style>
