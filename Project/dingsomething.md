# Dingsomething

代辦事項
- 熟悉專案並做分支整理
  - 將devlop/v1, devlop/v2, jtails/feature/no-reservation 分支刪除
  - 將develop/v3重新命名成develop
  - 將develop/v3 merge到master
  - ibobee/develop/v1的分支內容切一個新的repo出來, 像是ipetbooking/develop/v1 現在已經獨立出自己的repo，不綁在dingsomething的branch
  - jtails/develop/v1的分支內容切一個新的repo出來
  - backend-dev 不知道在幹嘛, 要問一下後端
  - thub/develop/v1的分支內容切一個新的repo出來
  - 最終要整理到只剩下develop跟master兩個分支


## 專案說明
Dingsomething是公司的產品之一，分支產品有iBobee, iPetbooking

- Dingsomething
  - 由Anna建置, Zat中途接手開發, 後端為Jordan


- iPetbooking
  - 由Zat建置, Tim參與部分功能開發, 後端為Jordan, 目前由Tim維護
  

## 開發方式
![vue](../assets/image/icon/vue.png) Vue


## 開發設置

### 前端

cd 至 site-frontend
```
# 安裝套件
npm install

# 執行vue-cli-service
npm run dev

# 編譯檔案至專案根目錄的public
npm run build
```

### 後端

此專案須設置後端環境，直接詢問後端


## GitHub
Branch                        | link                                                                          | Description
:---------------------------- | :---------------------------------------------------------------------------- | :---
master                        | https://github.com/DaydreamLab/dingsomething-site                             | 須從develop/v3合併進來，最後作為正式站的主要分支
develop/v1	                  | https://github.com/DaydreamLab/dingsomething-site/tree/develop/v1             | 待刪除
develop/v2	                  | https://github.com/DaydreamLab/dingsomething-site/tree/develop/v2             | 待刪除
develop/v3	                  | https://github.com/DaydreamLab/dingsomething-site/tree/develop/v3             | Dingsomething主要分支
ibobee/develop/v1             | https://github.com/DaydreamLab/dingsomething-site/tree/ibobee/develop/v1      | iＢobee的主要分支，待分割出去新的repo
jtails/develop/v1             | https://github.com/DaydreamLab/dingsomething-site/tree/jtails/develop/v1      | 待刪除
jtails/feature/no-reservation | https://github.com/DaydreamLab/dingsomething-site/tree/feature/no-reservation | 小捲尾舊預約站的主要分支，目前舊預約站僅剩下登入與會員中心功能, 完成小捲尾SSO後待分割出去新的repo
backend-dev                   | https://github.com/DaydreamLab/dingsomething-site/tree/backend-dev            | 不明分支，詢問後端
ipetbooking/develop/v1        | https://github.com/DaydreamLab/dingsomething-site/tree/ipetbooking/develop/v1 | 待刪除, iPetbooking開發前期使用分支，目前已切出獨立的repo

## 正式站(Prod)
Web               | link                                                                       | Description
:---------------- | :------------------------------------------------------------------------- | :---
前台              | https://dingsomething.com                                                 |
後台              | https://admin.dingsomething.com                                           |

## 示範站(Demo)
Web               | link                                                                       | Description
:---------------- | :------------------------------------------------------------------------- | :---
前台              | https://demo1.dingsomething.com                                           | demo1 商家
前台              | https://demo2.dingsomething.com                                           | demo2 商家
前台              | https://demo3.dingsomething.com                                           | demo3 商家
前台              | https://demo4.dingsomething.com                                           | demo4 商家
前台              | https://demo5.dingsomething.com                                           | demo5 商家
後台              | https://admin.demo.dingsomething.com                                      |

## 開發站(Dev)
Web               | link                                                                       | Description
:---------------- | :------------------------------------------------------------------------- | :---
前台              | https://dingsomething.daydream-lab.com/senji                               | senji 商家
後台              | https://admin.dingsomething.daydream-lab.com                               |

## 前台帳號密碼

測試帳號, 適用示範站與開發站, 正式站請用真實的手機做驗證

手機：`any`

驗證碼: `0000`

## 後台帳號密碼

### 正式站
無

### 示範站

#### Demo1 品酒活動（活動模組）

Permission | Account                  | Password
:--------- | :----------------------- | :---
商店擁有   | demo1@daydream-lab.com   | daydream5182

#### Demo2 瑜伽會館（課程模組）

Permission | Account                  | Password
:--------- | :----------------------- | :---
商店擁有   | demo2@daydream-lab.com   | daydream5182

#### Demo3 SPA會館（服務模組

Permission | Account                  | Password
:--------- | :----------------------- | :---
商店擁有   | demo3@daydream-lab.com   | daydream5182

#### Demo4 旅遊導覽（導覽模組）

Permission | Account                  | Password
:--------- | :----------------------- | :---
商店擁有   | demo4@daydream-lab.com   | daydream5182

#### Demo5 餐廳訂位（訂位模組

Permission | Account                  | Password
:--------- | :----------------------- | :---
商店擁有   | demo5@daydream-lab.com   | daydream5182


### 開發站

#### Senji

Permission | Account            | Password                                                       
:--------- | :----------------- | :---
商店擁有   | admin@senji.com.tw   | senji@2019
商店管理   | manager@senji.com.tw | senji@2019
資料上稿   | author@senji.com.tw  | senji@2019
訂單操作   | order@senji.com.tw   | senji@2019

###藍新金流測試卡號

卡號: `4000-2211-1111-1111`

到期年月: `any`

末三碼: `any`
