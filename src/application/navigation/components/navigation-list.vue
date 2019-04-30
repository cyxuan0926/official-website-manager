<template>
    <div class="navigation-list">
      <i-card class="content-card">
        <div class="content-card__header">
          <span>导航栏管理</span>
        </div>
        <div class="edit">
          <div class="edit__fields">
            <i-row >
              <i-col :span="6">
                <i-input placeholder="导航标题" v-model.trim="title" clearable></i-input>
              </i-col>
              <i-col :span="4" :offset="14">
                <i-button type="primary" @click="getOrSearchNavigation(1)">搜 索</i-button>
              </i-col>
            </i-row>
            <i-row>
              <i-table :columns="navigationColumns" border :data="navigationList"></i-table>
            </i-row>
            <i-row style="border: 1px solid #e9eaec;border-top: none">
              <div class="edit__page">
                <span>共有{{total}}条记录</span>
                <i-page :total="total" size="small" show-elevator></i-page>
              </div>
            </i-row>
          </div>
        </div>
      </i-card>
    </div>
</template>

<script>
import axios from 'axios'
import {mapMutations} from 'vuex'
import moment from '@/filter/moment.js'
export default {
  data () {
    return {
      total: 0,
      title: '',
      current: 1,
      navigationColumns: [
        {
          title: '导航标题',
          key: 'title',
          minWidth: 180
        },
        {
          title: '导航地址',
          key: 'url',
          minWidth: 150
        },
        {
          title: '导航创建时间',
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
                    let obj = {
                      title: params.row.title,
                      url: params.row.url
                    }
                    this.setNavigation(obj)
                    this.$router.push({path: `/main/navigation/edit/${params.row._id}`})
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
                        axios.delete(`/navigation/${params.row._id}`).then(response => {
                          // console.log(response.data)
                          if (response.data.code === 200) {
                            this.getOrSearchNavigation(1)
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
      navigationList: []
    }
  },
  methods: {
    ...mapMutations(['setNavigation']),
    getOrSearchNavigation (pages) {
      this.current = pages
      axios.get('navigation', {
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
          this.navigationList = response.data.data.navigation
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
    }
  },
  mounted () {
    this.getOrSearchNavigation(1)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
