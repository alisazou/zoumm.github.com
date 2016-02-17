module.exports = function(grunt) {

  // 项目配置
  grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: { // grunt-contrib-sass的事务定义
           // option:{
           //   sourceMap: true//需要sassv3.4.0
           // },
            dist: {
              options: {       
                style: 'compressed' //以压缩模式编译css，这样咱们也没必要使用grunt-contrib-cssmin插件了
                 
              },
              files: [{
                  expand:true,
                  cwd:'css/',//css目录下
                  src:['**/*.scss'],//所有scss文件
                  dest: 'dest/',//输出到此目录下
                  ext: '.min.css'
              }]
            }
        },
        // imagemin:{
        //     dist:{
        //       options:{
        //         optimizationLevel:3,
        //         svgoPlugins: [{ removeViewBox: false }]
              
        //       },
        //       files:[{
        //         expand:true,
        //         cwd:'images/',
        //         src:['**/*.{png,jpg,gif}'],
        //         dest:'dist/'
        //       }]
        //     }
        // },
        watch: {
          html: {
            files: ['**/*.html'],
            options: {livereload:true}
          },
         
          css:{
           files:['css/*.scss'],
           tasks:['sass']
         },

         options:{
            livereload:true
           }
         
        }
 
  });

   
     //grunt.loadNpmTasks() 是告诉Grunt，咱们要使用哪些插件，顺序不分先后
     grunt.loadNpmTasks('grunt-contrib-livereload');
     // grunt.loadNpmTasks('grunt-contrib-imagemin');
      grunt.loadNpmTasks('grunt-contrib-watch');
      grunt.loadNpmTasks('grunt-contrib-sass');
      // 注册grunt默认任务
      grunt.registerTask('default', ['watch',"livereload"]);  //注意 "newer:XXX"是插件grunt-newer的事件定义，表示对冒号后面的事务生效
};