# planXcape

## 專案說明
planXcape是公司的產品之一, 主要分成Web與App
- Web
    - 由Zat建置網站, Anna & Alice參與部分功能開發, Jackie調整RWD, 後端為Jerry, Alex
- App
    - 由Anna建置APP, Zat做後續開發, 後端為Jerry, Alex, 已停止開發, 未開發完成
    

## 開發方式

### Web
![vue](../assets/image/icon/vue.png) Vue, Laravel-Mix

### App
![framework7](../assets/image/icon/framework7.png) Framework7


## 開發設置

### Web前端

> 前台使用的webpack是Laravel-Mix，並非vue cli 3

至專案根目錄
```
# 安裝套件
npm install

# 編譯檔案至專案根目錄的public (開發板)
npm run dev

# 監聽並編譯檔案至專案根目錄的public (開發板)
npm run watch

# 編譯檔案至專案根目錄的public (正式版)
npm run prod

# 前端檔案放置位置
/resources/assets
```

### App前端
至專案根目錄
```
# 安裝套件
npm install

# 執行vue-cli-service
npm run serve

# 編譯檔案至專案根目錄的dist
npm run build
```

### 後端

此專案須設置後端環境，直接詢問後端

## GitHub

Branch            | link                                                                       | Description
:---------------- | :------------------------------------------------------------------------- | :---
master            | https://github.com/DaydreamLab/planXcape                                   |
App               | https://github.com/DaydreamLab/planXcape/tree/App                          |


## 正式站(Prod)
Web               | link                                                                       | Description
:---------------- | :------------------------------------------------------------------------- | :---
前台              | https://planxcape.com                                                      |

## 開發站(Dev)
Web               | link                                                                       | Description
:---------------- | :------------------------------------------------------------------------- | :---
前台              | https://planxcape.daydream.com                                             |

## 延伸閱讀
https://laravel-mix.com/

https://framework7.io/vue/
