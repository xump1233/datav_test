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

## 创建一个数据库

1. 创建一个总表
    ```mysql
        CREATE TABLE `vd_base`.`leval1` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `isParent` TINYINT NOT NULL DEFAULT 0 COMMENT '是不是一个父表',
        `childrenName` VARCHAR(45) NOT NULL COMMENT '子表名称',
        PRIMARY KEY (`id`),
        UNIQUE INDEX `childrenName_UNIQUE` (`childrenName` ASC) VISIBLE)
        COMMENT = '这是一个总表\n';
    ```
    
2. 创建三个子表
    1. 毕业生就业基本情况表
        ```mysql
            CREATE TABLE `vd_base`.`level2_01` (
            `id` INT NOT NULL AUTO_INCREMENT,
            `isParent` TINYINT NOT NULL DEFAULT 0 COMMENT '是不是一个父表',
            `childrenName` VARCHAR(45) NOT NULL COMMENT '子表名称',
            `type` VARCHAR(45) COMMENT '子表类型',
            PRIMARY KEY (`id`),
            UNIQUE INDEX `childrenName_UNIQUE` (`childrenName` ASC) VISIBLE)
            COMMENT = '这是一个毕业生就业基本情况表\n';
        ```

    2. 择业过程与招聘需求分析表
        ```mysql
            CREATE TABLE `vd_base`.`level2_02` (
            `id` INT NOT NULL AUTO_INCREMENT,
            `isParent` TINYINT NOT NULL DEFAULT 0 COMMENT '是不是一个父表',
            `childrenName` VARCHAR(45) NOT NULL COMMENT '子表名称',
            `type` VARCHAR(45) COMMENT '子表类型',
            PRIMARY KEY (`id`),
            UNIQUE INDEX `childrenName_UNIQUE` (`childrenName` ASC) VISIBLE)
            COMMENT = '这是一个择业过程与招聘需求分析表\n';
        ```
    3. 毕业生就业质量调查分析表
        ```mysql
            CREATE TABLE `vd_base`.`level2_03` (
            `id` INT NOT NULL AUTO_INCREMENT,
            `isParent` TINYINT NOT NULL DEFAULT 0 COMMENT '是不是一个父表',
            `childrenName` VARCHAR(45) NOT NULL COMMENT '子表名称',
            `type` VARCHAR(45) COMMENT '子表类型',
            PRIMARY KEY (`id`),
            UNIQUE INDEX `childrenName_UNIQUE` (`childrenName` ASC) VISIBLE)
            COMMENT = '这是一个毕业生就业质量调查分析表\n';
        ```
