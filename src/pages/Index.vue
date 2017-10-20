<template>
  <el-container style="height: 100%">
    <el-header>
      <div class="header-left-div">
        <div class="header-left-logo-div">
          <img src="../assets/images/cloud.png?1" alt=""/>
        </div>
      </div>

      <div class="header-right-div">
        <div class="header-right-search-div">
          <i class="el-icon-search"></i>
          <span>搜索</span>
        </div>
        <div class="header-right-message-div">
          <i class="iconfont icon-remind" style="font-size: 20px;"></i>
        </div>
        <div class="header-right-help-div">
          <i class="iconfont icon-feedback" style="font-size: 20px;"></i>
        </div>
        <div class="header-right-avatar-div">
          <div class="avater-div">
            <el-dropdown trigger="click" v-if="userinfo">
              <img v-lazy="userinfo.avatar" alt=""/>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="personcenter">个人信息</el-dropdown-item>
                <el-dropdown-item @click.native="logout">注销</el-dropdown-item>
                <!--<el-dropdown-item>删除</el-dropdown-item>-->
              </el-dropdown-menu>
            </el-dropdown>

          </div>
        </div>
      </div>
    </el-header>
    <el-container style="height: 100%">
      <el-aside width="50px" class="left-aside" v-if="isCollapse">
        <i class="iconfont icon-enter"
           v-if="!rightMenuVisible && leftClick"
           @click="changeRightMenuVisible"
           id="icon-left">
        </i>
        <div class="index-left-small-menu">
          <div class="index-logo" @click="collapseMenu">
            <i class="iconfont icon-other" style="font-size:26px;line-height: 30px;"></i>
          </div>
          <div class="menu-item-div">
            <div v-for="(l,index) in menuList"
                 @click="clickMenu('leftsmallmenu'+l.permissionId,l.children,l.name)"
                 :id="'leftsmallmenu'+l.permissionId"
                 :class="{'left-hover':index===leftHover}"
                 @mouseenter="mousein(index)"
                 @mouseleave="mouseout">
              <i :class="l.icon" v-if="l.pid == 0"></i>
            </div>
          </div>
        </div>
      </el-aside>
      <el-aside width="160px" class="left-aside" v-if="!isCollapse">
        <i class="iconfont icon-enter"
           v-if="!rightMenuVisible && leftClick"
           @click="changeRightMenuVisible"
           id="icon-left">
        </i>
        <div class="index-left-menu">
          <div class="index-logo" @click="collapseMenu">
            <i class="iconfont icon-other" style="font-size:26px;line-height: 30px;"></i>
          </div>
          <div class="menu-item-div">
            <div v-for="(l,index) in menuList"
                 @click="clickMenu('leftbigmenu'+l.permissionId,l.children,l.name)"
                 :id="'leftbigmenu'+l.permissionId"
                 :class="{'left-hover':index===leftHover}"
                 @mouseenter="mousein(index)"
                 @mouseleave="mouseout">
              <i :class="l.icon" v-if="l.pid == 0" style="margin-right: 10px"></i>
              <span class="menu-name">{{l.name}}</span>
            </div>
          </div>
        </div>
      </el-aside>
      <transition name="custom-classes-transition"
                  enter-active-class="animated slideInLeft"
                  leave-active-class="animated slideOutLeft"
                >
        <el-aside width="180px" class="right-aside" v-if="rightMenuVisible" id="right-menu-aside">
          <i class="iconfont icon-return"
             v-if="rightMenuVisible"
             @click="changeRightMenuVisible"
             id="icon-right">
          </i>
          <div class="index-right-menu">
            <div class="right-menu-title">
              {{rightMenuTitle}}
            </div>
            <ul class="right-menu-item-div">
              <li class="items"
                  v-for="(r,index) in rightMenuList"
                  :id="'rightmenu' + r.permissionId"
                  :class="{'right-hover':index===rightHover}"
                  @mouseenter="rightmousein(index)"
                  @mouseleave="rightmouseout">
                <router-link :to="r.url" active-class="router-class">
                  {{r.name}}
                </router-link>
              </li>
            </ul>
          </div>
        </el-aside>
      </transition>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
  export default{
    data(){
      return {
        menuList: [],
        itemNumber: '',
        isCollapse: false,
        rightMenuVisible: false,
        rightMenuTitle: '',
        rightMenuList: [],
        leftClick: '',
        rightHover: '',
        leftHover: ''
      }
    },
    computed: {
      'userinfo': function () {
        return JSON.parse(localStorage.getItem('userinfo'));
      }
    },

    mounted(){
      let self = this;
      self.getMenu(function (data) {
        self.menuList = data;
        localStorage.setItem('menu', JSON.stringify(data));
        let collapseStatus = localStorage.getItem('collapseStatus');
        let rightMenuVisible = localStorage.getItem('rightMenuVisible');
        if (collapseStatus === 'true') {
          self.isCollapse = true;
        }
        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < data[i].children.length; j++) {
            if (data[i].children[j].url === self.$router.currentRoute.path) {
              let parentId = data[i].permissionId;
              let selfId = data[i].children[j].permissionId;
              let leftMenus = document.getElementsByClassName('menu-item-div')[0].childNodes;
              for (let t = 0; t < leftMenus.length; t++) {
                leftMenus[t].style.backgroundColor = "#333745";
              }
              self.$nextTick(function () {
                if (document.getElementById('leftbigmenu' + parentId)) {
                  document.getElementById('leftbigmenu' + parentId).style.backgroundColor = "#00c1e1";
                } else {
                  document.getElementById('leftsmallmenu' + parentId).style.backgroundColor = "#00c1e1";
                }
              })
            }
          }
        }
      });
    },
    components: {
      'menu-tree': require('../components/Menu')
    },
    methods: {
      collapseMenu(){
        this.isCollapse = !this.isCollapse;
        localStorage.setItem('collapseStatus', this.isCollapse)
      },
      getMenu(callback){//获取菜单
        let self = this;
        let requestData = {token: window.localStorage.getItem('token')};
        self.httpApi.index.menus(requestData, function (data) {
          callback(data.data);
        });
      },
      changeRightMenuVisible(){
        this.rightMenuVisible = !this.rightMenuVisible;
        localStorage.setItem('rightMenuVisible', this.rightMenuVisible)
      },
      clickMenu(id, children, name){//点击菜单
        if (children) {
          this.leftClick = id;
          //localStorage.setItem('leftClick',JSON.stringify({id:id,children:children,name:name}));
          let leftMenus = document.getElementsByClassName('menu-item-div')[0].childNodes;
          for (let i = 0; i < leftMenus.length; i++) {
            leftMenus[i].style.backgroundColor = "#333745";
          }
          document.getElementById(id).style.backgroundColor = "#00c1e1";
          this.rightMenuVisible = true;
          this.rightMenuTitle = name;
          this.rightMenuList = children;
        }
      },
      rightmousein(index){
        this.rightHover = index;
      },
      rightmouseout(){
        this.rightHover = '';
      },
      mousein(index){
        this.leftHover = index;
      },
      mouseout(){
        this.leftHover = '';
      },
      handleIconClick(){//头部搜索

      },
      personcenter(){//跳转个人中心
        this.$router.push('/personal/user/myinfo');
      },
      logout(){//注销
        let self = this;
        let requestData = {token: window.localStorage.getItem('token')};
        self.httpApi.user.logout(requestData, function (data) {
          self.$router.push('/login');
        });
      }
    }
  }
</script>
<style scoped>
  .el-header, .el-footer {
    background-color: #373d41;
    color: white;
    text-align: center;
    line-height: 50px;
    height: 50px !important;
    padding: 0;
    overflow: hidden;
  }

  .el-aside {
    color: white;
    height: 100%;
  }
  #menu-animate{
    animate-duration: .1s !important;
  }
  .router-class {
    background-color: #606368 !important;
  }

  .left-aside {
    background-color: #333745 !important;
    position: relative;
    height: 100%;
    z-index: 100;
  }

  .right-aside {
    background-color: #4f5257 !important;
    position: relative;
    height: 100%;
    z-index: 50;
  }

  .left-hover {
    background-color: #00c1e1 !important;
  }

  .right-hover {
    background-color: #606368 !important;
  }

  body > .el-container {
    height: 500px;
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  #icon-left {
    cursor: pointer;
    position: absolute;
    top: 50%;
    right: 0px;
    z-index: 999;
  }

  #icon-right {
    cursor: pointer;
    position: absolute;
    top: 50%;
    right: 0;
    z-index: 999;
  }
</style>
