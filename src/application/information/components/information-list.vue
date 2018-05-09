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
export default {
  data () {
    return {
      informationList: [],
      informationColumns: [
        {
          title: '公司名称',
          key: 'company'
        },
        {
          title: '股票代码',
          key: 'shareCode'
        },
        {
          title: '公司地址',
          key: 'address'
        },
        {
          title: '公司电话',
          key: 'tel'
        },
        {
          title: '公司传真',
          key: 'fax'
        },
        {
          title: '公司邮箱',
          key: 'email'
        },
        {
          title: '信息创建时间',
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
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
