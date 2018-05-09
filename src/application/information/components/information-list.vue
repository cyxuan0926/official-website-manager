<template>
    <div class="information-list">
      <i-card class="content-card">
        <div class="content-card__header">
          <span>基本信息管理</span>
        </div>
        <div class="edit">
          <div class="edit__fields">
            <i-row>
              <i-table border :columns="informationColumns" :data="informationList"></i-table>
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
      informationList: [],
      informationColumns: [
        {
          title: '公司名称',
          key: 'company',
          minWidth: 120,
          ellipsis: true
        },
        {
          title: '股票代码',
          key: 'shareCode',
          minWidth: 70,
          ellipsis: true
        },
        {
          title: '公司地址',
          key: 'address',
          minWidth: 140,
          ellipsis: true
        },
        {
          title: '公司电话',
          key: 'tel',
          minWidth: 100,
          ellipsis: true
        },
        {
          title: '公司传真',
          key: 'fax',
          minWidth: 100,
          ellipsis: true
        },
        {
          title: '公司邮箱',
          key: 'email',
          minWidth: 100,
          ellipsis: true
        },
        {
          title: '信息创建时间',
          key: 'createdAt',
          minWidth: 130,
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
          minWidth: 90,
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
                    this.$router.push({path: `/main/information/edit/${params.row._id}`})
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
                    axios.delete(`information/${params.row._id}`).then(response => {
                      if (response.data.code === 200) {
                        this.getOrSearchInformationList(1)
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
      ]
    }
  },
  methods: {
    getOrSearchInformationList (pages) {
      this.current = pages
      axios.get('information', {
        params: {
          page: pages,
          rows: 10
        }
      }).then(response => {
        if (response.data.code === 200) {
          this.informationList = response.data.data.information
          this.total = response.data.data.total
        }
      }).catch(err => {
        console.log(err)
      })
    },
    pageChange (page) {
      this.getOrSearchInformationList(page)
    }
  },
  mounted () {
    this.getOrSearchInformationList(1)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
