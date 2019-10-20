const gulp = require("gulp");
// require("gulp"); 相当于在html的 <script src="gulp.js"></script>
// require("gulp"); 是用js文件引入的js文件，这是模块化的做法。
const uglify =require("gulp-uglify");
const concat = require("gulp-concat");
const rename = require("gulp-rename");
const minifycss = require("gulp-minify-css");
const connect = require("gulp-connect");//这个插件可以完成web服务器的请求和响应功能

//写一个复制文件的任务

// gulp.task("copy-html",async ()=>{
//     //以下表示，把当前目录下的index.html文件拷贝至，当前目录下的dist目录下。
//     gulp.src("index.html")
//     .pipe(gulp.dest("dist"));
// });

// gulp.task("copy-html",async ()=>{
//      //把当前目录下的所有的html文件，放在"D:\\phpStudy\\WWW\\youdian\\taobao"。
//      gulp.src("*.html")
//      .pipe(gulp.dest("D:\\phpStudy\\WWW\\youdian\\taobao"));
// });

// //压缩js文件的任务
// gulp.task("uglifyjs",async ()=>{
//     //把当前目录下的js下的所有js文件，经过压缩，把压缩的结果放在"D:\\phpStudy\\WWW\\youdian\\taobao"。
//     gulp.src("js/*.js")
//     .pipe(uglify())
//     .pipe(gulp.dest("D:\\phpStudy\\WWW\\youdian\\taobao\\js"));
// });

//启动web服务器(只是完成请求和响应)

// gulp.task("server",async ()=>{
//     connect.server({
//         "root":"D:\\yxf\\youdian02\\day10" //服务器的根目录，相当于phpstudy中的www。
//     });
// });

//启动监听
gulp.task("watchall",async ()=>{
    //监视当前项目目录下的所有html文件有没有改动，如果有改动，执行回调函数的代码
    gulp.watch("*.html",async ()=>{
        //把当前目录下的所有的html文件，放在"D:\\phpStudy\\WWW\\yanxuanmeizhuang"。
        gulp.src("*.html")
        .pipe(gulp.dest("H:\\phpStudy\\WWW\\yanxuanmeizhuang"));
    });

    // img/**/*: 表示img文件夹下的所有文件及其子文件夹下的所有文件，依次类推，直到最内层的文件夹
    gulp.watch("img/**/*",async ()=>{
        //把当前目录下的所有的img文件，放在"D:\\phpStudy\\WWW\\yanxuanmeizhuang\\img"。
        gulp.src("img/**/*")
        .pipe(gulp.dest("H:\\phpStudy\\WWW\\yanxuanmeizhuang\\img"));
    });

    // gulp.watch("js/*.js",async ()=>{
    //     gulp.src("js/*.js")
    //     .pipe(uglify())
    //     .pipe(gulp.dest("D:\\phpStudy\\WWW\\youdian\\taobao\\js"));
    // });

    // gulp.watch(["js/goods.js","js/tools.js"],async ()=>{
    //     gulp.src(["js/goods.js","js/tools.js"])
    //     .pipe(concat("common.js"))
    //     .pipe(uglify())
    //     .pipe(gulp.dest("D:\\phpStudy\\WWW\\youdian\\taobao\\js"));
    // });

    gulp.watch(["js/goods.js","js/tools.js"],async ()=>{
        gulp.src(["js/goods.js","js/tools.js"])
        .pipe(concat("common.js"))
        .pipe(gulp.dest("H:\\phpStudy\\WWW\\yanxuanmeizhuang\\js"))
        .pipe(uglify())
        .pipe(rename("common.min.js"))
        .pipe(gulp.dest("H:\\phpStudy\\WWW\\yanxuanmeizhuang\\js"));
    });

    gulp.watch("css/**/*",async()=>{
        gulp.src("css/**/*")
        .pipe(minifycss())
        .pipe(gulp.dest("H:\\phpStudy\\WWW\\yanxuanmeizhuang\\css"));
    });
});