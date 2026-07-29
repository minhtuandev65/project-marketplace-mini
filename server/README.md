# Project Marketplace Mini Server

Backend service cho dự án `project-marketplace-mini`, xây dựng theo hướng module hóa với `Express`, `MongoDB`, `Redis`, `Elasticsearch` và các provider như `JWT`, `Resend`, `AWS S3`.

Tài liệu này tập trung vào:
- mục tiêu dự án
- cách cài đặt và chạy backend
- biến môi trường cần chuẩn bị
- các API đang được expose ở thời điểm hiện tại

> Ghi chú: README này mô tả trạng thái hiện tại của backend và phần định hướng phát triển gần nhất. Các tài liệu phân tích chi tiết hơn nằm trong thư mục `docs-output/`.

## Tổng quan

`project-marketplace-mini` là một backend cho sàn thương mại điện tử mini, nơi:
- người dùng có thể đăng ký, đăng nhập và xác thực email
- buyer có thể gửi yêu cầu trở thành seller
- seller sẽ gắn với hồ sơ kinh doanh và shop
- hệ thống hỗ trợ tìm kiếm sản phẩm qua Elasticsearch
- nền tảng được chuẩn bị để mở rộng thêm sản phẩm, giỏ hàng, đơn hàng và thanh toán

Hiện tại, phần code đang rõ nhất ở các module:
- `auth`
- `sellers`
- `settings`
- `elasticsearch`

Module `shops` đang trong quá trình hoàn thiện.

## Kiến trúc chính

Backend đang đi theo cấu trúc:
- `routes` nhận request và định tuyến theo version
- `controllers` xử lý request/response
- `services` xử lý nghiệp vụ
- `repositories` làm việc với dữ liệu
- `models` ánh xạ collection MongoDB
- `shared` chứa middleware, provider, helper, template và constant dùng chung

Entry point hiện tại là:
- `src/server.js`

API version đang được mount dưới:
- `/v1`

## Công nghệ sử dụng

- Node.js `20.x`
- npm `11.x`
- Express
- MongoDB
- Redis
- Elasticsearch
- Babel
- Joi
- JWT
- Resend
- AWS S3 SDK

## Yêu cầu trước khi chạy

Bạn nên chuẩn bị sẵn:
- Node.js `20.x`
- npm `11.x`
- MongoDB instance
- Redis instance
- Elasticsearch instance
- Resend API key nếu muốn chạy luồng gửi email thật
- AWS S3 credentials nếu muốn dùng luồng upload tài nguyên thật

## Cài đặt dự án

Từ thư mục gốc repo:

```bash
cd server
npm install
```

## Biến môi trường

Backend đang đọc cấu hình từ `src/config/env/environment.js`. Bạn cần có file `.env` trong thư mục `server/`.

Các biến môi trường hiện đang được sử dụng:

```env
MONGODB_URI=
DATABASE_NAME=

LOCAL_DEV_APP_HOST=localhost
LOCAL_DEV_APP_PORT=8017

BUILD_MODE=dev
AUTHOR=Dev_Tuan

WEBSITE_DOMAIN_DEVELOPMENT=http://localhost:3000
WEBSITE_DOMAIN_PRODUCTION=

RESEND_API_KEY=
ADMIN_EMAIL_ADDRESS=
ADMIN_EMAIL_NAME=

ACCESS_TOKEN_SECRET_SIGNATURE=
ACCESS_TOKEN_LIFE=15m

REFRESH_TOKEN_SECRET_SIGNATURE=
REFRESH_TOKEN_LIFE=2d

FORGOT_PASSWORD_TOKEN_LIFE=15m

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
S3_BUCKET=

DEFAULT_AVATAR=
DEFAULT_LOGO_SHOP=

ELASTICSEARCH_NODE=
ELASTICSEARCH_API_KEY=

REDIS_URL=

SUPPORT_EMAIl=
```

> Ghi chú:
> - Không commit file `.env` chứa secret thật.
> - Nếu chỉ muốn chạy backend cục bộ để đọc code, bạn vẫn nên điền tối thiểu MongoDB, Redis và các JWT secret.

## Chạy dự án

### Chạy môi trường development

```bash
cd server
npm run dev
```

### Build source

```bash
cd server
npm run build
```

### Chạy bản build production

```bash
cd server
npm run start
```

### Kiểm tra lint

```bash
cd server
npm run lint
```

### Chạy test

```bash
cd server
npm run test
```

## Luồng khởi động hiện tại

Khi chạy `npm run dev`, backend sẽ:
- kết nối MongoDB
- tạo unique index cho email người dùng
- kết nối Redis
- khởi tạo Express app
- mount route `/v1`
- bật middleware `cookie-parser`, `cors`, `express.json`, `i18next`

## API hiện có

Base path:

```text
/v1
```

### Health Check

- `GET /v1/health`

### Auth

- `POST /v1/api/auth/register`
- `POST /v1/api/auth/login`
- `POST /v1/api/auth/verify-email`
- `POST /v1/api/auth/refresh-token`
- `POST /v1/api/auth/logout`
- `POST /v1/api/auth/forgot-password`
- `POST /v1/api/auth/reset-password`

### Settings

- `POST /v1/api/settings/language`

### Seller

- `POST /v1/api/seller`

### Search

- `GET /v1/api/search`

## Gợi ý quy trình chạy local

1. Tạo file `.env` trong thư mục `server`
2. Điền các thông số MongoDB, Redis và JWT secret
3. Cài package bằng `npm install`
4. Chạy `npm run dev`
5. Gọi `GET /v1/health` để kiểm tra server đã sẵn sàng

## Trạng thái phát triển

Backend hiện đang ở giai đoạn:
- đã có nền tảng xác thực người dùng
- đã có luồng đăng ký seller cơ bản
- đã có tìm kiếm sản phẩm qua Elasticsearch
- đã chuẩn bị khung cho shop, cart, order, payment

Các tài liệu phân tích sâu hơn để tiếp tục hoàn thiện dự án nằm tại:
- `docs-output/README.md`
- `docs-output/01-project-summary.md`
- `docs-output/02-modules-analysis.md`
- `docs-output/03-use-cases.md`
- `docs-output/04-use-case-diagram.mmd`
- `docs-output/05-class-diagram.mmd`
- `docs-output/06-complete-schemas.md`
- `docs-output/07-project-brief.md`
- `docs-output/07-project-brief.docx`
