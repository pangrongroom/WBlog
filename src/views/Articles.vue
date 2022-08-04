<template>
  <div class="articles">
    <banner></banner>
    <div class="site-content animate">
      <!-- 文章目录 -->
      <div id="article-menus">
        <menu-tree :menus="menus" child-label="child"></menu-tree>
      </div>
      <main class="site-main">
        <article class="hentry">
          <!-- 文章头部 -->
          <header class="entry-header">
            <!-- 标题输出 -->
            <h1 class="entry-title">前端vue项目打包--性能优化</h1>
            <hr />
            <div class="breadcrumbs">
              <div id="crumbs">最后更新时间：2021年09月21日</div>
            </div>
          </header>
          <!-- 正文输出 -->
          <div class="entry-content">
            <h4>打包优化</h4>
            <h4 id="引言：">引言：</h4>
            <p>
              项目开发完成，优化才是精髓
            </p>
            <h4 id="lua-应用场景">怎么打包 ：</h4>
            <ul>
              <li>
                用webpack做打包（把.vue, .js, .less ------> .js, .css, .html）
              </li>
              <li>在项目中都会提供命令： npm run build</li>
            </ul>
            <hr />
            <h4 id="安装">打包优化的好处:</h4>
            <ul>
              <li>
                在保证功能可用的前提下，让我们的文件尽可能小
              </li>
              <li>
                在保证功能可用的前提下，让我们的页面显示出来的速度更快一些
              </li>
            </ul>
            <p>
              打包之后，会得到dist目录，如果希望可以双击打开index.html，则需要提前在vue.config.js中配置：vue.config.js中
            </p>
            <pre><code> {
  publicPath: './'
}
</code></pre>
            <hr />
            <h4 id="安装过程可能出现的问题">一、打包优化-路由懒加载</h4>
            <ol>
              <li>
                1.什么是路由懒加载
                <blockquote>
                  <p>
                    一个路由对一个组件，表示一个页面。懒加载的意思是：只有在路由进入这个页面时，才去加载这个组件对应的资源
                  </p>
                </blockquote>
              </li>
            </ol>
            <hr />
            <ol start="2">
              <li>
                2.怎么实现路由懒加载
                <blockquote>
                  <p>在路由匹配规则中，把 component 属性变为如下函数，</p>
                  <pre><code>{
   path: '/login',
   component: () => import('@/views/login/index'),
   hidden: true
}
</code></pre>
                </blockquote>
              </li>
            </ol>
            <hr />
            <ol start="3">
              <li>
                3.路由懒加载中的魔法注释
                <blockquote>
                  <p>
                    通过在注释中指定webpackChunkName，可以人为设置这个文件的名字。如下是一个示例。
                  </p>
                  <pre><code>components = () => import(/* webpackChunkName:"login"*/ "../component/Login.vue");

</code></pre>
                </blockquote>
              </li>
            </ol>
            <hr />
            <h4 id="安装过程可能出现的问题">二、打包优化-包大小分析</h4>
            <ol>
              <li>
                1.目标
                <blockquote>
                  <p>
                    对开发的应用进行包大小分析
                  </p>
                </blockquote>
              </li>
            </ol>
            <hr />
            <ol start="2">
              <li>
                2.包大小分析
                <blockquote>
                  <p>
                    我们集成了功能，写了很多组件，最终都会打包成一堆文件（js目录下会有很多.js文件），每个包大小如何呢？
                  </p>
                  <p>
                    我们可以使用vue-cli本身提供的性能分析工具，对我们开发的所有功能进行打包分析，它的使用非常简单
                  </p>
                  <pre><code>npm run preview -- --report

</code></pre>
                  <p>
                    这个命令会从我们的入口main.js进行依赖分析，分析出各个包的大小，方便我们进行观察和优化
                  </p>
                  <p>
                    打包完成之后会在 dist 目录下生成一个 report.html
                    ，双击打开就会看到如下图
                  </p>
                  <p>
                    <img
                      src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ee7be564b2da429bab965a014daf708b~tplv-k3u1fbpfcp-watermark.awebp"
                      alt=""
                    />
                  </p>
                  <p>
                    如图所示，方块越大，说明该文件占用的文件越大，文件越大，对于网络带宽和访问速度的要求就越高，这也就是我们优化的方向。
                  </p>
                </blockquote>
              </li>
            </ol>
            <hr />
            <h4 id="安装过程可能出现的问题">
              三、webpack配置排除打包-整体分析
            </h4>
            <ol>
              <li>
                1.回顾
                <blockquote>
                  <p>
                    打包过程：从main.js开始出发，由webpack进行打包
                  </p>
                  <img
                    src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1b40969c73db4547a4cca994a2bbf211~tplv-k3u1fbpfcp-watermark.awebp"
                    alt=""
                  />
                </blockquote>
              </li>
            </ol>
            <hr />
            <ol start="2">
              <li>
                2.分析
                <blockquote>
                  <p>
                    我们是否需要把第三方的库全部打包到自己的项目中呢？不需要
                  </p>
                  <p>
                    如图：xlsx这个包就很大(715K)，而且这类插件长期不需要我们进行更新，所以没有必要打包进来！
                  </p>
                </blockquote>
              </li>
            </ol>
            <hr />
            <ol start="3">
              <li>
                3.思路
                <blockquote>
                  <p>
                    打包时，不要把这些包打进来，
                  </p>
                  <p>
                    <img
                      src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d510ec2d7e564a21942ccaab1095b456~tplv-k3u1fbpfcp-watermark.awebp"
                      alt=""
                    />
                  </p>
                </blockquote>
              </li>
            </ol>
            <h4 id="安装过程可能出现的问题">
              四、webpack配置排除打包-打包瘦身
            </h4>
            <ol>
              <li>
                1.目标
                <blockquote>
                  <p>
                    通过配置vue-cli把一些平常不需要用的包排除在打包文件之外。
                  </p>
                  <p>
                    例如:让 webpack 不打包 vue xlsx 和 element
                  </p>
                </blockquote>
              </li>
            </ol>
            <hr />
            <ol start="2">
              <li>
                2.使用方式
                <blockquote>
                  <p>先找到 vue.config.js， 添加 externals 项，具体如下：</p>
                  <pre><code>configureWebpack: {
  // 配置单页应用程序的页面的标题
  name: name,
  externals: {
     /**
      * externals 对象属性解析。
      *  基本格式：
      *     '包名' : '在项目中引入的名字'
      *
    */
    'vue': 'Vue',
    'element-ui': 'ElementUI',
    'xlsx': 'XLSX'
  },
  resolve: {
    alias: {
      '@': resolve('src')
    }
  }
}

</code></pre>
                  <p>
                    再次运行打包，我们会发现包的大小已经大幅减小：
                    三个包已经不在打包的目标文件中了。
                  </p>
                </blockquote>
              </li>
            </ol>
            <hr />
            <h4 id="安装过程可能出现的问题">
              五、webpack配置排除打包-引用网络资源
            </h4>
            <ol>
              <li>
                1.目标
                <blockquote>
                  <p>
                    做相关配置：把排除在外的包，通过公共网络资源方式引入
                  </p>
                  <p>
                    <img
                      src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e65a8d026202403d9d5acb286adc76af~tplv-k3u1fbpfcp-watermark.awebp"
                      alt=""
                    />
                  </p>
                </blockquote>
              </li>
            </ol>
            <hr />
            <ol start="2">
              <li>
                2.具体配置-在生产环境时生效
                <blockquote>
                  <p>
                    请注意，在开发环境时，文件资源还是可以从本地node_modules中取出，而只有项目上线了，才需要去使用外部资源。此时我们可以使用环境变量来进行区分。具体如下：
                  </p>
                  <p>在vue.config.js文件中：</p>
                  <pre><code>let externals = {}
let cdn = { css: [], js: [] }
const isProduction = process.env.NODE_ENV === 'production' // 判断是否是生产环境
if (isProduction) {
  externals = {
      /**
      * externals 对象属性解析：
      * '包名' : '在项目中引入的名字'
    */
      'vue': 'Vue',
      'element-ui': 'ELEMENT',
      'xlsx': 'XLSX'
  }
  cdn = {
    css: [
      'https://unpkg.com/element-ui/lib/theme-chalk/index.css' // element-ui css 样式表
    ],
    js: [
      // vue must at first!
      'https://unpkg.com/vue@2.6.12/dist/vue.js', // vuejs
      'https://unpkg.com/element-ui/lib/index.js', // element-ui js
      'https://cdn.jsdelivr.net/npm/xlsx@0.16.6/dist/xlsx.full.min.js', // xlsx
    ]
  }
}

</code></pre>
                </blockquote>
              </li>
            </ol>
            <hr />
            <ol start="3">
              <li>
                3.webpack配置externals配置项
                <blockquote>
                  <pre><code>configureWebpack: {
  // 配置单页应用程序的页面的标题
  name: name,
+ externals: externals,
  resolve: {
    alias: {
      '@': resolve('src')
    }
  }
}


</code></pre>
                </blockquote>
              </li>
            </ol>

            <ol start="4">
              <li>
                4.注入CDN配置到html模板
                <blockquote>
                  <p>之后通过 html-webpack-plugin注入到 index.html之中:</p>
                  <p>在vue.config.js中，设置</p>
                  <pre><code>chainWebpack(config) {
  config.plugin('preload').tap(() => [
    {
      rel: 'preload',
      fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
      include: 'initial'
    }
  ])
  // 注入cdn变量 (打包时会执行)
  config.plugin('html').tap(args => {
    args[0].cdn = cdn // 配置cdn给插件
    return args
  })
  // 省略其他...
}


</code></pre>
                  <p>
                    找到 public/index.html 通过配置CDN Config 依次注入 css 和
                    js。
                  </p>
                  <p>修改head的内容如下：</p>
                  <pre><code>
</code></pre>
                </blockquote>
              </li>
            </ol>

            <ol start="5">
              <li>
                5.打包 ，检查效果
                <blockquote>
                  <pre><code>npm run build:prod

</code></pre>
                  <p>
                    检查生成的index.html中是否有css引入和js引入
                  </p>
                </blockquote>
              </li>
            </ol>
            <ol start="6">
              <li>
                6.更改publicPath
                <blockquote>
                  <pre><code>publicPath: './',

</code></pre>
                </blockquote>
              </li>
            </ol>
            <h4 id="安装成功验证">六、打包去掉console.log</h4>
            <blockquote>
              <p>
                在vue.config.js中，配置：
              </p>
            </blockquote>
            <pre><code>chainWebpack(config) {
    config.optimization.minimizer('terser').tap((args) => {
      args[0].terserOptions.compress.drop_console = true
      return args
    })
}
</code></pre>
            <p>再次打开，就可以双击dist/index.html查看效果了</p>
          </div>
          <!-- 文章底部 -->
          <section-title>
            <footer class="post-footer">
              <!-- 阅读次数 -->
              <div class="post-like">
                <i class="iconfont iconeyes"></i>
                <span class="count">685</span>
              </div>
              <!-- 分享按钮 -->
              <!--                        <div class="post-share">-->
              <!--                            <ul class="sharehidden">-->
              <!--                                <li><a href="http://qr.liantu.com/api.php?text=https://zhebk.cn/Web/gongan.html"-->
              <!--                                       onclick="window.open(this.href, 'renren-share', 'width=490,height=700');return false;"-->
              <!--                                       class="s-weixin" target="_blank" rel="nofollow noopener noreferrer"><img src="https://cdn.zhebk.cn/usr/themes/Akina/images/wechat.png"></a></li>-->
              <!--                                <li>-->
              <!--                                    <a href="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=https://zhebk.cn/Web/gongan.html/&amp;title=公安联网备案记录"-->
              <!--                                       onclick="window.open(this.href, 'weibo-share', 'width=730,height=500');return false;"-->
              <!--                                       class="s-qq" target="_blank" rel="nofollow noopener noreferrer"><img src="https://cdn.zhebk.cn/usr/themes/Akina/images/qzone.png"></a></li>-->
              <!--                                <li>-->
              <!--                                    <a href="http://service.weibo.com/share/share.php?url=https://zhebk.cn/Web/gongan.html/&amp;title=公安联网备案记录"-->
              <!--                                       onclick="window.open(this.href, 'weibo-share', 'width=550,height=235');return false;"-->
              <!--                                       class="s-sina" target="_blank" rel="nofollow noopener noreferrer"><img src="https://cdn.zhebk.cn/usr/themes/Akina/images/sina.png"></a></li>-->
              <!--                                <li>-->
              <!--                                    <a href="http://shuo.douban.com/!service/share?https://zhebk.cn/Web/gongan.html/&amp;title=公安联网备案记录"-->
              <!--                                       onclick="window.open(this.href, 'renren-share', 'width=490,height=600');return false;"-->
              <!--                                       class="s-douban" target="_blank" rel="nofollow noopener noreferrer"><img src="https://cdn.zhebk.cn/usr/themes/Akina/images/douban.png"></a></li>-->
              <!--                            </ul>-->
              <!--                            <i class="iconfont show-share"></i>-->
              <!--                        </div>-->
              <!-- 赞助按钮 -->
              <div class="donate" @click="showDonate = !showDonate">
                <span>赏</span>
                <ul class="donate_inner" :class="{ show: showDonate }">
                  <li class="wedonate">
                    <img
                      src="https://seikim.com/i/2021/09/07/pm8k4f.jpg
"
                    />
                    <p>微信</p>
                  </li>
                  <li class="alidonate">
                    <img src="https://seikim.com/i/2021/09/07/pmvx8h.jpg" />
                    <p>支付宝</p>
                  </li>
                </ul>
              </div>
              <!-- 文章标签 -->
              <div class="post-tags">
                <i class="iconfont iconcategory"></i>
                <router-link to="/category/web">Web</router-link>
              </div>
            </footer>
          </section-title>

          <!--声明-->
          <div class="open-message">
            <p>
              声明：Wblog博客|版权所有，违者必究|如未注明，均为原创|本网站采用<a
                href="https://creativecommons.org/licenses/by-nc-sa/3.0/"
                target="_blank"
                >BY-NC-SA</a
              >协议进行授权
            </p>
            <p>
              转载：转载请注明原文链接 -
              <a href="/">前端vue项目打包--性能优化 </a>
            </p>
          </div>
          <!--评论-->
          <div class="comments">
            <comment
              v-for="item in comments"
              :key="item.comment.id"
              :comment="item.comment"
            >
              <template v-if="item.reply.length">
                <comment
                  v-for="reply in item.reply"
                  :key="reply.id"
                  :comment="reply"
                ></comment>
              </template>
            </comment>
          </div>
        </article>
      </main>
    </div>
  </div>
</template>

<script>
import Banner from "@/components/banner";
import sectionTitle from "@/components/section-title";
import comment from "@/components/comment";
import menuTree from "@/components/menu-tree";
import { fetchComment } from "../api";
export default {
  name: "articles",
  data() {
    return {
      showDonate: false,
      comments: [],
      menus: [],
    };
  },
  components: {
    Banner,
    sectionTitle,
    comment,
    menuTree,
  },
  methods: {
    getComment() {
      fetchComment()
        .then((res) => {
          this.comments = res.data || [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchH(arr, left, right) {
      if (right) {
        return arr.filter(
          (item) => item.offsetTop > left && item.offsetTop < right
        );
      } else {
        return arr.filter((item) => item.offsetTop > left);
      }
    },
    // 生成目录
    createMenus() {
      let arr = [];
      for (let i = 6; i > 0; i--) {
        let temp = [];
        let e = document
          .querySelector(".entry-content")
          .querySelectorAll(`h${i}`);
        for (let j = 0; j < e.length; j++) {
          let child = this.fetchH(
            arr,
            e[j].offsetTop,
            j + 1 === e.length ? undefined : e[j + 1].offsetTop
          );
          temp.push({
            h: i,
            title: e[j].innerText,
            id: e[j].id,
            offsetTop: e[j].offsetTop,
            child,
          });
        }
        if (temp.length) {
          arr = temp;
        }
      }
      this.menus = arr;
    },
  },
  mounted() {
    this.createMenus();
  },
  created() {
    this.getComment();
  },
};
</script>
<style scoped lang="less">
.site-content {
  position: relative;
  .site-main {
    padding: 80px 0 0 0;
  }
}
#article-menus {
  position: sticky;
  top: 0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  padding: 15px;
  width: 300px;
  transform: translateX(-120%) translateY(150px);
  font-size: 14px;
}
article.hentry {
  .entry-header {
    .entry-title {
      font-size: 23px;
      font-weight: 600;
      color: #737373;
      margin: 0.67em 0;

      &:before {
        content: "#";
        margin-right: 6px;
        color: #d82e16;
        font-size: 20px;
        font-weight: 600;
      }
    }

    hr {
      height: 1px;
      border: 0;
      background: #efefef;
      margin: 15px 0;
    }

    .breadcrumbs {
      font-size: 14px;
      color: #d2d2d2;
      text-decoration: none;
      margin-bottom: 30px;
    }
  }

  .entry-content {
  }

  footer.post-footer {
    width: 100%;
    padding: 20px 10px;
    margin-top: 30px;
    height: 65px;
    position: relative;
    i {
      font-size: 18px;
      margin-right: 5px;
    }
    .post-like {
      float: right;
      margin: 7px 0 0 20px;
    }

    .post-share {
      float: right;
      list-style: none;
      margin-right: 20px;
    }

    .donate {
      float: left;
      line-height: 36px;
      border-radius: 100%;
      -webkit-border-radius: 100%;
      -moz-border-radius: 100%;
      border: 1px solid #2b2b2b;
      &:hover {
        border: 1px solid goldenrod;
        span {
          color: goldenrod;
        }
      }
      span {
        color: #2b2b2b;
        padding: 10px;
        position: relative;
        cursor: pointer;
      }

      .donate_inner {
        display: none;
        margin: 0;
        list-style: none;
        position: absolute;
        left: 80px;
        top: -40px;
        background: #fff;
        padding: 10px;
        border: 1px solid #ddd;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
        border-radius: 3px;
        &.show {
          display: block;
        }
        li {
          float: left;
        }

        img {
          width: 100px;
        }
        p {
          text-align: center;
          font-size: 15px;
          color: #d2d2d2;
          line-height: 1rem;
        }
      }

      .donate_inner:after,
      .donate_inner:before {
        content: "";
        position: absolute;
        left: 0;
        bottom: 45%;
        margin-left: -8px;
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
        border-right: 8px solid #fff;
      }

      .donate_inner:before {
        left: -1px;
        border-right: 8px solid #ddd;
      }
    }

    .post-tags {
      margin: 7px 0 0 20px;
      float: left;
      text-transform: uppercase;
      a:hover {
        color: #ff6d6d;
      }
    }
  }
  .open-message {
    margin: 50px 0;
    position: relative;
    background: #2b2b2b;
    padding: 10px 30px;
    border-radius: 3px;
    font-size: 14px;
    color: #fff;
    &:after {
      content: "";
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 10px solid #2b2b2b;
      position: absolute;
      top: -8px;
      left: 48%;
    }
    p {
      margin: 10px 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    a {
      color: #a0dad0;
      padding: 0 5px;
    }
  }
}
</style>
