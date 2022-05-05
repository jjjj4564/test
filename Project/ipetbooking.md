# iPetbooking
aka. i寵訂

## 代辦事項
- App需偵測使用者的安裝版本是否是最新, 偵測到之後的行為需自行腦部, 想好做法後可跟Jakcie討論，另外需確認使用者版本若非為最新的話，是否能繼續使用App @Fandow
- App需切割出開發, Demo, 正式三個版本 @Fandow
- 小捲尾客製化須整合購物站會員中心 @Tim
- 小捲尾客製化須與購物站串接SSO @Tim

## 專案說明
iPadBooking是公司的產品之一，主要分成前台, 後台, App

- 前台
  - 前台分成公版與小捲尾客製化
    - 公版
      - 由Zat建置, Tim參與部分功能開發, 後端為Jordan & Mika & Jerry, 目前由Tim維護
    - 小捲尾客製化
      - 由Zat建置, Tim參與部分功能開發, 後端為Jordan & Mika & Jerry, 目前由Tim維護
- 後台
  - 由Fandow建置, Zat簡易RWD處理, 後端為Jordan & Mika & Jerry, 目前由Fandow維護
- App
  - 由Zat建置, 後端為Jordan & Mika & Jerry, 目前由Fandow維護


## 開發方式
![vue](../assets/image/icon/vue.png) Vue


## 開發設置

### 前台(公版)
cd 至 site-frontend
```
# 安裝套件
npm install

# 執行vue-cli-service
npm run dev

# 編譯檔案至專案根目錄的public
npm run build
```

### 前台(小捲尾客製化)
cd 至 site-frontend
```
# 安裝套件
npm install

# 執行vue-cli-service
npm run dev:jtails

# 編譯檔案至專案根目錄的public
npm run build:jtails
```

### 後台
cd 至 admin-frontend
```
# 安裝套件
npm install

# 執行vue-cli-service
npm run dev

# 編譯檔案至專案根目錄的public
npm run build
```

### App
cd 至 admin-frontend
```
# 安裝套件
npm install

# 編譯檔案至admin-frontend的public-app
npm run build:app

Use the copy command of the Capacitor CLI to copy the web assets to the native project:
npx cap copy

用xcode的手機模擬器開啟app
npx cap open ios

取得`裝置id`列表
npx cap run --list ios

用真實手機開啟app
arch -x86_64 npx cap run --target {{ 裝置id }} ios
```

### 後端

此專案須設置後端環境，直接詢問後端


## GitHub

### 前台

Branch                        | link                                                                          | Description
:---------------------------- | :---------------------------------------------------------------------------- | :---
master                        | https://github.com/DaydreamLab/ipetbooking-site                               | 正式站, Demo站
develop                       | https://github.com/DaydreamLab/ipetbooking-site/tree/develop                  | 開發站

### 後台 & App

Branch                        | link                                                                          | Description
:---------------------------- | :---------------------------------------------------------------------------- | :---
ipetbooking/master            | https://github.com/DaydreamLab/dingsomething-admin/tree/ipetbooking/master    | 正式站, Demo站
ipetbooking/develop/v1        | https://github.com/DaydreamLab/dingsomething-admin/tree/ipetbooking/develop/v1| 開發站


## 正式站(Prod)
Web               | link                                                                       | Description
:---------------- | :------------------------------------------------------------------------- | :---
前台              | https://daydreamlab.ipetbooking.com                                        | 測試商家
前台              | https://j-tails.ipetbooking.com                                            | 小捲尾客製化
後台              | https://admin.ipetbooking.com                                              |

## 示範站(Demo)
Web               | link                                                                       | Description
:---------------- | :------------------------------------------------------------------------- | :---
前台              | https://wegood.demo.ipetbooking.com                                        | 測試商家
後台              | https://admin.demo.ipetbooking.com                                       |

## 開發站(Dev)

開發站僅能綁定單一商家, 切換商家需至`.env`修改`DEFAULT_MERCHANT`參數

Web               | link                                                                       | Description
:---------------- | :------------------------------------------------------------------------- | :---
前台              | https://ipetbooking.daydream-lab.com                                       | 
後台              | https://admin.ipetbooking.daydream-lab.com                               |

## 前台帳號密碼

測試帳號, 適用示範站與開發站, 正式站請用真實的手機做驗證

手機：`any`

驗證碼: `0000`

## 後台帳號密碼

### 正式站

#### 測試商家
Permission | Account                  | Password
:--------- | :----------------------- | :---
商店擁有   | admin@j-tails1.com       | jtails1@2020

#### 小捲尾客製化
Permission | Account                  | Password
:--------- | :----------------------- | :---
商店擁有   | admin@j-tails.com       | jtails@2020

### 示範站
Permission | Account                  | Password
:--------- | :----------------------- | :---
商店擁有   | admin@wegood.com         | wegood@2020

### 開發站

#### 小捲尾客製化
Permission | Account                  | Password
:--------- | :----------------------- | :---
商店擁有   | admin@j-tails.com        | j-tails@2020


###藍新金流測試卡號

卡號: `4000-2211-1111-1111`

到期年月: `any`

末三碼: `any`

###延伸閱讀

https://capacitorjs.com/

https://www.smashingmagazine.com/2018/07/mobile-apps-capacitor-vue-js/#adding-capacitor
