# datav_test

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).  

<hr>


## 表的创建(node.js)
1. 总览
2. 创建一个总表
3. 其他表的创建
4. 表中数据的插入

### 总览
1. 文件目录
    - Json
        - chapter_1.json
        - chapter_2.json
        - chapter_3.json 
    - node_modules
    - index.js
    - package-lock.json
    - package.json
2. 包管理信息(package.json)
```json
{
  "name": "createtable",
  "version": "1.0.3",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "mysql": "^2.18.1"
  }
}

```
3. index.js
    1. 导入模块
    ```js
    const mysql = require('mysql')
    const fs = require('fs')
    const path = require('path')
    ```
    2. 连接数据库
    ```js
    const db = mysql.createPool({
        host:'127.0.0.1',
        user:"root",
        password:'admin123',
        database:'vd_base'
    })
    ```
    3. 读取本地文件并操作数据库
    ```js
   new Promise((resolve,reject)=>{
        fs.readFile(path.join(__dirname,'Json','chapter_1.json'),'utf-8',(err,data)=>{
            if(err) reject(err)
            resolve(JSON.parse(data))
        })
    }).then(value=>{
        // createOverall()
        // createTable(value)
        // insertData(value,'level1')
    }).catch(err=>{
        console.log(err.message)
    })
   ```
    4. 关闭连接
    ```js 
    db.end() 
    ```

### 总表的创建 
1. 创建一个总表
```js
async function createOverall(){
    let sql = `
    CREATE TABLE vd_base.leval1 (
        id INT NOT NULL AUTO_INCREMENT,
        isParent TINYINT NOT NULL DEFAULT 0 COMMENT '是不是一个父表',
        childrenName VARCHAR(45) NOT NULL COMMENT '子表名称',
        PRIMARY KEY (id),
        UNIQUE INDEX childrenName_UNIQUE (childrenName ASC) VISIBLE)
        COMMENT = '这是一个总表';
    `
    await db.query(sql,(err)=>{
        if(err) console.log(err.message)
        else console.log('创建成功')
    })
}
```

### 其他子表的创建

- 递归进行表的创建
```js
// value为整个chapter的json数据
async function createTable(value){
    if(!Array.isArray(value.data)){
        let sql=`create table ${value.title} (
            id INT NOT NULL AUTO_INCREMENT,
            varName varchar(45),
            value varchar(45),
            PRIMARY KEY (id)
        );`
        await db.query(sql,(err)=>{
            if(err) console.log(err)
            else{
                console.log(value.title,'创建成功********');
            }
        })
    }
    else{
        let sql = `CREATE TABLE ${value.title} (
            id INT NOT NULL AUTO_INCREMENT,
            isParent TINYINT NOT NULL DEFAULT 0 COMMENT '是不是一个父表',
            childrenName VARCHAR(45) NOT NULL COMMENT '子表名称',
            type VARCHAR(45) COMMENT '子表类型',
            PRIMARY KEY (id),
            UNIQUE INDEX childrenName_UNIQUE (childrenName ASC) VISIBLE)
            COMMENT = '这是一个${value.title}表';
        `
        await db.query(sql,(err)=>{
            if(err) console.log(err)
            console.log(value.title,'创建成功----------')
        })
        for(let item of value.data){
            createTable(item)
        }
    }
    
}
```

### 表中数据的插入

```js
// value为整个chapter的json数据,fatherTable为总表
async function insertData(value,fatherTable){
    if(!Array.isArray(value.data)){
        for(let key in value.data){
            let sql = `insert into ${value.title} (varName,value) values ('${key}','${value.data[key]}')`
            await db.query(sql,(err)=>{
                if(err) console.log(err)
                else{
                    console.log(key,'插入成功');
                }
            })
        }
        return {
            isParent:0,
            childrenName:value.title,
            type:value.type
        }
    }
    else{
        let sql = `insert into ${fatherTable} (isParent,childrenName) values (?,?)`
        
        await db.query(sql,[1,value.title],(err)=>{
            if(err) console.log(err.message)
            else{
                console.log(value.title,"插入",fatherTable,'成功----------')
            }
        })
        for(let item of value.data){
            let sql = `insert into ${value.title} (isParent,childrenName,type) values (?,?,?)`
            const dataObj =await insertData(item,value.title)
            if(dataObj){
                await db.query(sql,[dataObj.isParent,dataObj.childrenName,dataObj.type],(err)=>{
                    if(err) console.log(err)
                    else console.log(dataObj.childrenName,'插入',value.title,'成功')
                })
            }
        }
    }
    
}
```

### index.js全部代码
```js
const mysql = require('mysql')
const fs = require('fs')
const path = require('path')

const db = mysql.createPool({
    host:'127.0.0.1',
    user:"root",
    password:'admin123',
    database:'vd_base'
})

new Promise((resolve,reject)=>{
    fs.readFile(path.join(__dirname,'Json','chapter_1.json'),'utf-8',(err,data)=>{
        if(err) reject(err)
        resolve(JSON.parse(data))
    })
}).then(value=>{
    // createOverall()
    // createTable(value)
    // insertData(value,'level1')
}).catch(err=>{
    console.log(err.message)
})


async function createTable(value){
    if(!Array.isArray(value.data)){
        let sql=`create table ${value.title} (
            id INT NOT NULL AUTO_INCREMENT,
            varName varchar(45),
            value varchar(45),
            PRIMARY KEY (id)
        );`
        await db.query(sql,(err)=>{
            if(err) console.log(err)
            else{
                console.log(value.title,'创建成功********');
            }
        })
    }
    else{
        let sql = `CREATE TABLE ${value.title} (
            id INT NOT NULL AUTO_INCREMENT,
            isParent TINYINT NOT NULL DEFAULT 0 COMMENT '是不是一个父表',
            childrenName VARCHAR(45) NOT NULL COMMENT '子表名称',
            type VARCHAR(45) COMMENT '子表类型',
            PRIMARY KEY (id),
            UNIQUE INDEX childrenName_UNIQUE (childrenName ASC) VISIBLE)
            COMMENT = '这是一个${value.title}表';
        `
        await db.query(sql,(err)=>{
            if(err) console.log(err)
            console.log(value.title,'创建成功----------')
        })
        for(let item of value.data){
            createTable(item)
        }
    }
    
}

async function insertData(value,fatherTable){
    if(!Array.isArray(value.data)){
        for(let key in value.data){
            let sql = `insert into ${value.title} (varName,value) values ('${key}','${value.data[key]}')`
            await db.query(sql,(err)=>{
                if(err) console.log(err)
                else{
                    console.log(key,'插入成功');
                }
            })
        }
        return {
            isParent:0,
            childrenName:value.title,
            type:value.type
        }
    }
    else{
        let sql = `insert into ${fatherTable} (isParent,childrenName) values (?,?)`
        
        await db.query(sql,[1,value.title],(err)=>{
            if(err) console.log(err.message)
            else{
                console.log(value.title,"插入",fatherTable,'成功----------')
            }
        })
        for(let item of value.data){
            let sql = `insert into ${value.title} (isParent,childrenName,type) values (?,?,?)`
            const dataObj =await insertData(item,value.title)
            if(dataObj){
                await db.query(sql,[dataObj.isParent,dataObj.childrenName,dataObj.type],(err)=>{
                    if(err) console.log(err)
                    else console.log(dataObj.childrenName,'插入',value.title,'成功')
                })
            }
        }
    }
    
}

async function createOverall(){
    let sql = `
    CREATE TABLE vd_base.level1 (
        id INT NOT NULL AUTO_INCREMENT,
        isParent TINYINT NOT NULL DEFAULT 0 COMMENT '是不是一个父表',
        childrenName VARCHAR(45) NOT NULL COMMENT '子表名称',
        PRIMARY KEY (id),
        UNIQUE INDEX childrenName_UNIQUE (childrenName ASC) VISIBLE)
        COMMENT = '这是一个总表';
    `
    await db.query(sql,(err)=>{
        if(err) console.log(err)
        else {
            console.log('创建成功')
            db.end()
        }
    })

}


```




## 数据库服务器的创建(node.js)

### 总览
1. 文件结构
    - node_modules
    - routers
        - queryTable.js
    - index.js
    - package-lock.json
    - package.json
2. Package.json
```json
{
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.19.2",
    "mysql": "^2.18.1"
  }
}

```

### index.js详细
1. 模块导入
```js
const express = require('express') //用于创建web服务器
const cors = require('cors')     // 用于解决跨域问题
const queryTable = require('./routers/queryTable')     //导入路由模块
```

2. 中间件
```js
app.use(cors()) //跨域
app.use(queryTable) //使用路由
```

3. 监听启动服务
```js
app.listen(5003,()=>{
    console.log('http://127.0.0.1:5003   正在监听。。。')
})
```

### 路由模块
1. 所需模块
```js
const express = require('express')
const mysql = require('mysql') //读取数据

const router = express.Router() //创建路由实例
```

2. 连接数据库
```js
const db = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'admin123',
    database:'vd_base'
})
```

3. 监听处理请求
    1. ***router.get('/all')***
        - 用于获取总表信息
    ```js
    router.get('/all',(req,res)=>{
        new Promise((resolve,reject)=>{
            let sql = `select * from level1`
            db.query(sql,(err,data)=>{
                if(err){
                    reject(err.message)
                    return 
                }
                resolve(data)
            })
        }).then(value=>{
            res.send(value)
        })
    })
    ```
    2. ***router.get('/chapter1')***
    ....
    #### allMessage
    ```js
    router.get('/all',(req,res)=>{
        new Promise((resolve,reject)=>{
            let sql = `select * from level1`
            db.query(sql,(err,data)=>{
                if(err){
                    reject(err.message)
                    return 
                }
                resolve(data)
            })
        }).then(value=>{
            res.send(value)
        })
    })
    
    router.get('/chapter1',(req,res)=>{
        new Promise((resolve,reject)=>{
            let sql = `select * from 毕业生就业基本情况`
            db.query(sql,(err,data)=>{
                if(err){
                    reject(err.message)
                    return 
                }
                resolve(data)
            })
        }).then(value=>{
            res.send(value)
        })
    })
    
    router.get('/chapter2',(req,res)=>{
        new Promise((resolve,reject)=>{
            let sql = `select * from 择业过程与需求分析`
            db.query(sql,(err,data)=>{
                if(err){
                    reject(err.message)
                    return 
                }
                resolve(data)
            })
        }).then(value=>{
            res.send(value)
        })
    })
    
    router.get('/chapter3',(req,res)=>{
        new Promise((resolve,reject)=>{
            let sql = `select * from 毕业生就业质量调查分析`
            db.query(sql,(err,data)=>{
                if(err){
                    reject(err.message)
                    return 
                }
                resolve(data)
            })
        }).then(value=>{
            res.send(value)
        })
    })
    
    router.get('/chapter1/:id',(req,res)=>{
        new Promise((resolve,reject)=>{
            let sql = `select * from 毕业生就业基本情况 where id=${req.params.id}`
            db.query(sql,(err,data)=>{
                if(err){
                    reject(err.message)
                    return 
                }
                // console.log(data[0].childrenName)
                resolve(data[0].childrenName)
            })
        }).then(value=>{
            return new Promise((resolve,reject)=>{
                let sql = `select * from ${value}`
                db.query(sql,(err,data)=>{
                    if(err){
                        reject(err.message)
                        return 
                    }
                    resolve(data)
                })
            })
        }).then(value=>{
            // console.log(value)
            res.send(value)
        })
    })
    
    router.get('/chapter2/:id',(req,res)=>{
        new Promise((resolve,reject)=>{
            let sql = `select * from 择业过程与需求分析 where id=${req.params.id}`
            db.query(sql,(err,data)=>{
                if(err){
                    reject(err.message)
                    return 
                }
                // console.log(data[0].childrenName)
                resolve(data[0].childrenName)
            })
        }).then(value=>{
            return new Promise((resolve,reject)=>{
                let sql = `select * from ${value}`
                db.query(sql,(err,data)=>{
                    if(err){
                        reject(err.message)
                        return 
                    }
                    resolve(data)
                })
            })
        }).then(value=>{
            // console.log(value)
            res.send(value)
        })
    })
    
    router.get('/chapter3/:id',(req,res)=>{
        new Promise((resolve,reject)=>{
            let sql = `select * from 毕业生就业质量调查分析 where id=${req.params.id}`
            db.query(sql,(err,data)=>{
                if(err){
                    reject(err.message)
                    return 
                }
                // console.log(data[0].childrenName)
                resolve(data[0].childrenName)
            })
        }).then(value=>{
            return new Promise((resolve,reject)=>{
                let sql = `select * from ${value}`
                db.query(sql,(err,data)=>{
                    if(err){
                        reject(err.message)
                        return 
                    }
                    resolve(data)
                })
            })
        }).then(value=>{
            // console.log(value)
            res.send(value)
        })
    })
    
    router.get('/chapter1/:id1/:id2',(req,res)=>{
        new Promise((resolve,reject)=>{
            let sql = `select * from 毕业生就业基本情况 where id=${req.params.id1}`
            db.query(sql,(err,data)=>{
                if(err){
                    reject(err.message)
                    return 
                }
                // console.log(data[0].childrenName)
                resolve(data[0].childrenName)
            })
        }).then(value=>{
            return new Promise((resolve,reject)=>{
                let sql = `select * from ${value} where id = ${req.params.id2}`
                db.query(sql,(err,data)=>{
                    if(err){
                        reject(err.message)
                        return 
                    }
                    resolve(data[0].childrenName)
                })
            })
        }).then(value=>{
            return new Promise((resolve,reject)=>{
                let sql = `select * from ${value}`
                db.query(sql,(err,data)=>{
                    if(err){
                        reject(err.message)
                        return 
                    }
                    resolve(data)
                })
            })
        }).then(value=>{
            // console.log(value)
            res.send(value)
        })
    })
    
    ```
    #### 最后导出路由
    ```js
     module.exports = router 
    ```