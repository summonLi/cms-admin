<template>
  <div class="content-box" :class="{'app-side-shrink':!sidebar.opened}">
    <div class="layout-header">
      <div class="logo-Box" title="广州闪电鲸网络科技有限公司">
        <img class="logo-Img" src="../assets/img/logo.png">
        <div class="logo-text">后台管理系统</div>
      </div>
      <div class="left-icon" @click="toggleSideBar">
        <i v-if="sidebar.opened" class="el-icon-s-fold iconColor"></i>
        <i v-else class="el-icon-s-unfold iconColor"></i>
      </div>
      <div class="cm-flex1"></div>
      <div class="base-infoBox">
        <ul>
          <li>
            <span class="base-text">闪电鲸</span>
            <i class="el-icon-s-custom iconColor"></i>
          </li>
          <li @click="loginOut"><i class="el-icon-s-tools iconColor"></i>注销</li>
        </ul>
      </div>
    </div>
    <div class="layout-mainbox">
      <aside class='layout-left'>
        <div class="menu-box">
          <ul class="menu-ul">
            <!--左菜单栏鼠标上移，显示二级菜单-->
<!--            <template v-for="(item ,index) in $router.options.routes" v-if="!item.hidden && checkContains(item.name)">-->
<!--              <li class="menu-li" :class="item.path == activePath?'router-active':''" :index="index+''" v-if="!item.isSingle">-->
<!--                <div class="menu-li-sub">-->
<!--                  <i class="el-icon-s-order"></i><span class="menu-text">{{item.name}}</span>-->
<!--                </div>-->
<!--                <div class="menu-child-pos">-->
<!--                  <div class="menu-child-box">-->
<!--                    <ul class="menu-child-ul">-->
<!--                      <span class="menu-child-title">{{item.childName}}</span>-->
<!--                      <router-link v-for="childitem in item.children" :key="item.path+'/'+childitem.path" :to="item.path+'/'+childitem.path">-->
<!--                        <li @click="addRouter(childitem, item.path+'/'+childitem.path)" class="menu-child-li">{{childitem.name}}</li>-->
<!--                      </router-link>-->
<!--                    </ul>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </li>-->
<!--              &lt;!&ndash; 单菜单&ndash;&gt;-->
<!--              <router-link v-else v-for="childitem in item.children" :index="item.path+'/'+childitem.path" :key="item.path+'/'+childitem.path" :to="item.path+'/'+childitem.path">-->
<!--                <li class="menu-li" :class="item.path == activePath?'router-active':''" @click="addRouter(childitem, item.path+'/'+childitem.path)">-->
<!--                  <div class="menu-li-sub">-->
<!--                    <i class="el-icon-s-order"></i><span class="menu-text">{{childitem.name}}</span>-->
<!--                  </div>-->
<!--                </li>-->
<!--              </router-link>-->
<!--            </template>-->
            <template v-for="(item ,index) in $router.options.routes" v-if="!item.hidden && checkContains(item.name)">
              <!-- 多个子菜单-->
              <li class="menus-li" :class="item.path == activePath?'current-active':''" :index="index+''" @click="activePath=item.path" v-if="!item.isSingle">
                <div class="menus-li-nav">
                  <i :class="item.icon"></i>
                  <span class="menu-text">{{item.name}}</span>
                </div>
                <ul class="menus-child">
                  <router-link v-for="childitem in item.children" :key="item.path+'/'+childitem.path" :to="item.path+'/'+childitem.path">
                    <li @click="addRouter(childitem, item.path+'/'+childitem.path)" :class="item.path+'/'+childitem.path == tabActive?'child-active':''" class="menus-child-li">{{childitem.name}}</li>
                  </router-link>
                </ul>
              </li>
              <!-- 只有一个子菜单-->
              <router-link v-else v-for="childitem in item.children" :index="item.path+'/'+childitem.path" :key="item.path+'/'+childitem.path" :to="item.path+'/'+childitem.path">
                <li class="menus-li single-li" :class="item.path == activePath?'current-active':''" @click="addRouter(childitem, item.path+'/'+childitem.path)">
                  <div class="menus-li-nav">
                    <i :class="item.icon"></i><span class="menu-text">{{childitem.name}}</span>
                  </div>
                </li>
              </router-link>
            </template>
          </ul>
        </div>
      </aside>
      <section class="layout-main">
        <div>
          <div class="router-tab">
            <div class="router-tab-li arrow-left" @click="onPageScroll('left')">
              <i class="el-icon-d-arrow-left"></i>
            </div>
            <div class="router-tab-li arrow-right" @click="onPageScroll('right')">
              <i class="el-icon-d-arrow-right"></i>
            </div>
            <el-dropdown class="router-tab-li arrow-down" @command="handleCommand">
              <i class="el-icon-arrow-down"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="closeCurrentTab" v-if="tabActive != '/home'">关闭当前标签页</el-dropdown-item>
                <el-dropdown-item command="closeOtherTab">关闭其他标签页</el-dropdown-item>
                <el-dropdown-item command="closeAllTab">关闭全部标签页 </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <div ref="router-tabs">
              <div class="router-tab-box" ref="router-tab-box" :style="{left: tabLeft +'px'}">
                <div class="router-tab-li" @click="toHome" :class="tabActive == '/home'?'active':''">
                  <i class="el-icon-s-home"></i>
                </div>
                <div class="router-tab-li" @click="changeTab(index)" :data-ss="index" :class="tab.path ==tabActive?'active':''" v-for="(tab, index) in tabRouter">
                  <span>{{tab.name}}</span>
                  <span @click.stop="removeTab(index,tab.path ==tabActive)"><i class="el-icon-close mune-close"></i></span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { removeToken, setStorge, getStorge, removeStorge } from "@/utils/auth";
    export default {
        name: "layout",
        data() {
          return {
            tabRouter:[],//选项卡菜单栏目数据
            activePath:'',//当前选中的路由父级path,单个菜单使用
            tabActive:'',//当前选中的tab路由，用来显示样式，tabActive等于当前选中路由的话，显示选中状态
            tabLeft: 0,//router-tab的left值
          }
        },
        watch: {
          $route(to, from) {
            //实时监听路由变化
            this.activePath = to.matched[0].path
            //取父菜单栏的path作为选中状况
            this.tabActive = to.path;
          }
        },
        computed: {
            ...mapGetters([
              'sidebar'
            ])
        },
        created(){
          //获取缓存中的tabRouterData数据，
          if(getStorge('tabRouterData')){
            this.tabRouter = JSON.parse(getStorge('tabRouterData'));//保存的时候做了JavaScript 对象转字符串，获取的时候，进行数据转换成JavaScript 对象
            this.activePath = '/'+this.$route.path.split('/')[1];//当前选中的父级路由路径
            this.tabActive = this.$route.path;//当前选中的路由路径
          }else{
            //没有缓存值，把当前的路由放进去
            this.activePath = '/'+this.$route.path.split('/')[1];
            this.tabActive = this.$route.path; //当前选中的路由
          }
        },
        mounted(){

        },
        methods:{
          //跳转首页链接
          toHome(){
            this.$router.push('/home')
          },
          //隐藏菜单文字
          toggleSideBar(){
            this.$store.dispatch('ToggleSideBar');
          },
          //左右移动菜单栏
          onPageScroll(type){
            const tabWidth = this.$refs['router-tabs'].offsetWidth;//router-tab的kuan
            const lastChild = this.$refs['router-tab-box'].lastChild;//router-tab-box里面的	最后一个子节点
            const currentChilds = this.$refs['router-tab-box'].getElementsByClassName('active');//获取当前选中的tab
            const currentChild = (currentChilds && currentChilds.length > 0 ? currentChilds[0] : lastChild);//当前选中的节点
            const lastOffsetX = lastChild.offsetLeft + lastChild.offsetWidth;  //获取最后子节点到父节点的X轴的长
            const currentOffsetLeft = currentChild.offsetLeft; //获取当前选中tab到定位父节点的left方向的距离
            const currentOffsetRight = currentChild.offsetLeft + currentChild.offsetWidth;//获取取当前选中tab到定位父节点的left方向的距离+本身的宽

            // console.log(type)
            // console.log('tabWidth:' + tabWidth)
            // console.log('lastOffsetX:' + lastOffsetX)
            // console.log('lastChild.offsetWidth:' + lastChild.offsetWidth)
            // console.log('lastChild.offsetLeft:' + lastChild.offsetLeft)

            if(type == 'left') {
              this.tabLeft = Math.min(this.tabLeft + tabWidth,0)
            } else if ( type == 'right' && (lastOffsetX + this.tabLeft) > tabWidth) {
              console.log('rigth-this.tabLeft:' + this.tabLeft )
              this.tabLeft = (this.tabLeft - tabWidth)
            } else if ( type == 'auto') {
              // console.log('currentOffsetLeft:' + currentOffsetLeft)
              // console.log('currentOffsetRight:' + currentOffsetRight)
              // console.log(this.tabLeft)
              // console.log(currentOffsetRight + this.tabLeft)
              // console.log('tabWidth:' + tabWidth)
              if(currentOffsetLeft < -this.tabLeft) {
                this.tabLeft = -currentOffsetLeft + currentChild.offsetWidth / 2
                return
              }
              if(currentOffsetRight + this.tabLeft >= tabWidth) {//如果点击的tab的left距离
                this.tabLeft = this.tabLeft - (currentOffsetRight + this.tabLeft - tabWidth) - currentChild.offsetWidth / 2
              }
            }
          },
          //退出登录
          loginOut(){
            this.$confirm('是否注销?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'info'
            }).then(() => {
              removeToken();
              removeStorge('tabRouterData');
              location.reload(); // 为了重新实例化vue-router对象 避免bug
              // this.$store.dispatch('LogOut').then(() => {
              //   location.reload() // 为了重新实例化vue-router对象 避免bug
              // })
            }).catch(() => {
            })
          },
          //检查树结构是否包括当前节点
          checkContains(name){
            return true
          },
          //点击左菜单栏，添加tab标签页显示
          addRouter(data,path){
            const that = this;
            //往tab中添加路由
            const obj = Object.assign({},data);
            obj.path = path;
            let add = true;
            for (let i = 0; i< this.tabRouter.length; i++){
              if(this.tabRouter[i].path == obj.path) {
                add = false
              }
            }
            if(add) {
              this.tabRouter.push(obj);
            }
            add = true;
            this.$nextTick(() => {
              that.onPageScroll('auto');
            })
            //存tabRouterData，避免页面刷新的时候不显示
            setStorge('tabRouterData',JSON.stringify(this.tabRouter))
          },
          //点击tab标签页,进入选中标签页面
          changeTab(index){
            const that = this;
            this.$router.push(this.tabRouter[index].path);
            this.$nextTick(() => {
              that.onPageScroll('auto')
            })
          },
          //删除tab标签页
          removeTab(index,active){
            console.log(active)
            this.tabRouter.splice(index,1);
            //active为true，表示当前页，关闭当前页，路由跳转到下一个页面。为false,非当前页，直接从tabRouter删除，路由不做跳转。
            if(active){
              //this.tabRouter的值为空的时候，页面默认跳转至首页
              if(this.tabRouter.length == 0) {
                this.$router.push('/home');
              }else{
                this.$router.push(this.tabRouter[this.tabRouter.length - 1].path);
              }
            }
            setStorge('tabRouterData',JSON.stringify(this.tabRouter));
          },
          //标签页的操作
          handleCommand(command){
            var that = this;
            if (command === 'closeCurrentTab') {
              //关闭当前标签页
              that.tabRouter.forEach(function (item,index) {
                if(item.path == that.tabActive) {
                  that.tabRouter.splice(index,1);
                  if(that.tabRouter.length == 0) {
                    that.$router.push('/home');
                  }else{
                    that.$router.push(that.tabRouter[that.tabRouter.length - 1].path);
                  }
                  //tabRouter路由改变后，要缓存起来，避免手动刷新数据没变
                  setStorge('tabRouterData',JSON.stringify(that.tabRouter));
                  return;
                }
              })
            } else if( command === 'closeOtherTab') {
              //关闭其他标签页，如果当前选中的是首页，便关掉所有的标签页，否则就关掉未选中的其他标签页
              if(that.tabActive == '/home'){
                that.tabRouter = [];
                //移除缓存的tabRouter
                removeStorge('tabRouterData');
              }else{
                var tabs = that.tabRouter.filter(function (item) {
                  return item.path == that.tabActive;
                })
                that.tabRouter = tabs;
                //tabRouter路由改变后，要缓存起来，避免手动刷新数据没变
                setStorge('tabRouterData',JSON.stringify(that.tabRouter));
              }
            } else if( command === 'closeAllTab') {
              //关闭所有的标签页
              that.$router.push('/home');
              that.tabRouter = [];
              //移除缓存的tabRouter
              removeStorge('tabRouterData');
            }
          }
        }
    }
</script>

<style scoped lang="scss">
  @import '../styles/index.scss';
  .app-side-shrink {
    .layout-header {
      .logo-Box {
        width: 80px;
        padding-left: 0;
        .logo-Img {
          display: none;
        }
        .logo-text {
          display: none;
        }
      }
    }
    .layout-left {
      width: 80px;
      .menu-box {
        .menu-ul{
          .menu-li {
            width: 20px;
            .menu-text {
              display: none;
            }
            .menu-child-pos {
              left: 80px;
            }
          }
          .menus-li {
            width: 20px;
            .menu-text {
              display: none;
            }
            .menus-child {
              display: none!important;
            }
          }
        }
      }
    }
  }
  .layout-mainbox {
    display: flex;
    height: calc(100% - 50px);
    .layout-main {
      background: #f0f2f5;
      flex: 1;
      .router-tab {
        position: relative;
        height: 40px;
        line-height: 40px;
        background: #fff;
        padding: 0 80px 0 40px;
        overflow: hidden;
        -webkit-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
        -moz-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
        .router-tab-box {
          display: -webkit-box;
          position: relative;
          left: 0px;
        }
        .router-tab-li {
          font-size: 14px;
          cursor: pointer;
          padding: 0 15px;
          border-right: 1px solid #eeeeee;
          background: #ffffff;
          .mune-close {
            transform: rotate(0deg);
            transition: transform 1s;
          }
          .mune-close:hover {
            transform: rotate(180deg);
          }
        }
        .router-tab-li.arrow-left {
          position: absolute;
          left: 0;
          top: 0;
          width: 40px;
          padding: 0;
          text-align: center;
          z-index: 999;
        }
        .router-tab-li.arrow-right {
          position: absolute;
          right: 40px;
          top: 0;
          width: 40px;
          padding: 0;
          text-align: center;
          border-left: 1px solid #eeeeee;
          z-index: 999;
        }
        .router-tab-li.arrow-down{
          position: absolute;
          right: 0;
          top: 0;
          width: 40px;
          padding: 0;
          text-align: center;
          border-left: 1px solid #eeeeee;
          background: #fff;
          z-index: 999;
        }
        .router-tab-li.active {
          color: $baseColor;
        }
      }
    }
  }
  .content-box {
    position: relative;
    height: 100%;
  }
  .layout-header {
    display: flex;
    align-items: center;
    overflow: hidden;
    height: 50px;
    background: $baseBgColor;
    .logo-Box {
      width: 200px;
      height: 50px;
      padding-left: 20px;
      text-align: center;
      display: flex;
      align-items: center;
      cursor: pointer;
      .logo-Img {
        width: 35px;
        height: 35px;
        display: inline-block;
        margin-right: 10px;
      }
      .logo-text {
        display: inline-block;
        color: #fff;
        font-size: 18px
      }
    }
    .logo-Box:hover {
      background: #3a8ee6;
    }
    .left-icon {
      width: 60px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      display: inline-block;
      cursor: pointer;
      .iconColor{
        color: #fff;
        font-size: 20px;
        text-align: center;
      }
    }
    .left-icon:hover {
      background: #3a8ee6;
    }
    .base-infoBox {
      height: 50px;
      line-height: 50px;
      color: #fff;
      float: right;
    }
    .base-infoBox ul {
      display: flex;
    }
    .base-infoBox ul li {
      padding: 0 20px;
      .base-text {
        padding-right: 10px;
      }
    }
    .base-infoBox ul li:hover {
      background: #3a8ee6;
    }
    .iconColor {
      /*background: #fff;*/
    }
  }
  .layout-left {
    width: 220px;
    background: #001529;
    height: 100%;
    .menu-box {
      padding: 20px 0;
      .menu-ul {
        cursor: pointer;
        display: flex;
        flex-direction: column;
        color: #fff;
        .menu-li {
          font-size: 16px;
          height: 56px;
          line-height: 56px;
          padding: 0 30px;
          position: relative;
          color: #ffffff;
          .menu-text {
            padding-left: 10px;
          }
          .menu-child-pos {
            display: none;
            color: #444444;
            position: absolute;
            top: 0;
            left: 220px;
            z-index: 9999;
            .menu-child-box {
              cursor: pointer;
              padding: 20px 30px;
              background: #ffffff;
              box-shadow: 1px 0 6px rgba(0,0,0,.2);
              .menu-child-ul {
                width: 100px;
                .menu-child-title {
                  display: block;
                  font-size: 16px;
                  color: #666666;
                  text-align: center;
                  height: 30px;
                  line-height: 30px;
                }
                .menu-child-li {
                  height: 30px;
                  line-height: 30px;
                  text-align: center;
                  font-size: 14px;
                  color: #444444;
                  cursor: pointer;
                }
                .menu-child-li:hover {
                  color: #3a8ee6;
                }
              }
            }
          }
        }
        .menus-li {
          .menus-li-nav {
            height: 56px;
            line-height: 56px;
            font-size: 16px;
            padding: 0 30px;
            color: #ffffff;
            position: relative;
          }
          .menus-child {
            display: none;
            background: #000c17;
            .menus-child-li {
              height: 50px;
              line-height: 50px;
              padding-left: 50px;
              font-size: 14px;
            }
            .menus-child-li.child-active {
              background: $baseBgColor;
              color: #ffffff;
            }
            .menus-child-li:hover {
              color: $baseBgColor;
            }
            .menus-child-li:hover.child-active {
              color: #ffffff;
            }
          }
        }
        .single-li.current-active {
          background: $baseBgColor;
          color: #ffffff;
        }
        .menus-li.current-active > .menus-child {
          display: block;
        }
        .menus-li:hover .menus-li-nav::after {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 4px;
          height: 100%;
          background: $baseBgColor;
        }
        .menu-li.router-active {
          background: $baseBgColor;
        }
        .menu-li:hover {
          background: $baseBgColor;
        }
        .menu-li:hover .menu-child-pos {
          display: block;
        }
      }
    }
  }
</style>
<style scoped>
  .el-dropdown-menu__item {
    padding: 0 20px;
  }
</style>
