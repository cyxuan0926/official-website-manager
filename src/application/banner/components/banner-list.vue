<template>
    <div class="banner-list">
        <i-card class="content-card">
          <div class="content-card__header">
            <span>标题栏管理</span>
          </div>
          <div class="edit">
            <div class="edit__fields">
              <i-row>
                <i-col :span="6">
                  <i-input placeholder="标题栏标题" v-model.trim="title" clearable></i-input>
                </i-col>
                <i-col :span="4" :offset="14">
                  <i-button type="primary" @click="getOrSearchBannerList(1)">搜 索</i-button>
                </i-col>
              </i-row>
              <i-row>
                <i-table border :columns="bannerColumns" :data="bannerList"></i-table>
              </i-row>
              <i-row style="border: 1px solid #e9eaec;border-top: none;margin-top: 0px">
                <div class="edit__page">
                  <span>共有{{total}}条记录</span>
                  <i-page :total="total" size="small" show-elevator @on-change="pageChange" :current="current"></i-page>
                </div>
              </i-row>
            </div>
          </div>
        </i-card>
    </div>
</template>

<script>
import moment from '@/filter/moment.js'
import {mapMutations} from 'vuex'
import axios from 'axios'
export default {
  data () {
    return {
      title: '',
      total: 0,
      current: 1,
      bannerList: [],
      bannerColumns: [
        {
          title: '标题',
          key: 'title',
          minWidth: 100,
          ellipsis: true
        },
        {
          title: '标题地址',
          key: 'url',
          minWidth: 100,
          ellipsis: true
        },
        {
          title: '标题图片',
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
          title: '标题描述',
          key: 'description',
          minWidth: 200,
          ellipsis: true
        },
        {
          title: '创建时间',
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
          minWidth: 100,
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
                    let obj = {
                      title: params.row.title,
                      url: params.row.url,
                      description: params.row.description,
                      imgUrl: params.row.imgUrl
                    }
                    this.setBanner(obj)
                    this.$router.push({path: `/main/banner/edit/${params.row._id}`})
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
                domProps: {
                  innerHTML: '删除'
                },
                on: {
                  click: () => {
                    this.$Modal.confirm({
                      title: '提示',
                      content: '<p style="font-size: 14px">此操作将会永久删除该条记录，是否继续？</p>',
                      closable: true,
                      onOk: () => {
                        axios.delete(`banner/${params.row._id}`).then(response => {
                          // console.log(response.data)
                          if (response.data.code === 200) {
                            this.getOrSearchBannerList(1)
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
                        console.log('取消了')
                      }
                    })
                  }
                }
              })
            ])
          }
        }
      ]
    }
  },
  methods: {
    ...mapMutations(['setBanner']),
    getOrSearchBannerList (pages) {
      this.current = pages
      axios.get('banner', {
        params: {
          page: pages,
          rows: 10,
          title: this.title
        }
      }).then(response => {
        // console.log(response.data)
        if (response.data.code === 200) {
          this.bannerList = response.data.data.banner
          this.total = response.data.data.total
        }
      }).catch(err => {
        console.log(err)
      })
    },
    pageChange (page) {
      this.getOrSearchBannerList(page)
    }
  },
  mounted () {
    this.getOrSearchBannerList(1)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  /*& > .ivu-row*/
        /*&:first-child*/
</style>
