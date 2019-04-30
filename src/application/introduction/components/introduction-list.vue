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
                <i-input placeholder="公司简介标题" v-model.trim="title" clearable></i-input>
              </i-col>
              <i-col :span="4" :offset="14">
                <i-button type="primary" @click="getOrSearchIntroductionList(1)">搜 索</i-button>
              </i-col>
            </i-row>
            <i-row>
              <i-table border :columns="introductionColumns" :data="introductionList"></i-table>
            </i-row>
            <i-row style="border: 1px solid #e9eaec;border-top: none;margin-top: 0px">
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
      title: '',
      introductionColumns: [
        {
          title: '公司简介标题',
          key: 'title',
          minWidth: 120,
          ellipsis: true
        },
        {
          title: '公司简介内容',
          key: 'content',
          minWidth: 210,
          ellipsis: true
        },
        {
          title: '公司简介图片',
          key: 'images',
          minWidth: 235,
          render: (h, params) => {
            return h('div', {
              style: {
                textAlign: 'center'
              }
            }, Array.from({length: params.row.images.split(',').length}).map(function (currentValue, index) {
              return h('img', {
                attrs: {
                  src: params.row.images.split(',')[index]
                },
                style: {
                  width: '80px',
                  height: '80px',
                  verticalAlign: 'middle'
                }
              })
            }))
          }
        },
        {
          title: '简介创建时间',
          key: 'createdAt',
          minWidth: 88,
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
          minWidth: 40,
          ellipsis: true,
          render: (h, params) => {
            return h('div', [
              h('i-button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                style: {
                  marginRight: '5px',
                  textAlign: 'left',
                  paddingLeft: '0px'
                },
                on: {
                  click: () => {
                    this.$router.push({path: `/main/introduction/edit/${params.row._id}`})
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
                        axios.delete(`introduction/${params.row._id}`).then(response => {
                          if (response.data.code === 200) {
                            this.getOrSearchIntroductionList(1)
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
      ],
      introductionList: []
    }
  },
  mounted () {
    this.getOrSearchIntroductionList(1)
  },
  methods: {
    getOrSearchIntroductionList (pages) {
      this.current = pages
      axios.get('introduction', {
        params: {
          page: pages,
          rows: 10,
          title: this.title
        }
      }).then(response => {
        if (response.data.code === 200) {
          this.$Message.success({
            content: response.data.msg,
            duration: 5,
            closable: true
          })
          this.introductionList = response.data.data.introduction
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
      this.getOrSearchIntroductionList(page)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">

</style>
