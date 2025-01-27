# Simulasi Payment Intent dengan Midtrans

Repository ini adalah contoh sederhana implementasi **Payment Intent** menggunakan **Midtrans API**. Proyek ini dirancang untuk membantu memahami integrasi pembayaran online dengan Midtrans melalui skenario simulasi sederhana.

---

## ✨ Fitur Utama

- Membuat "Payment Intent" yang terhubung dengan produk.
- Integrasi dengan Midtrans Snap API untuk simulasi pembayaran.
- Callback endpoint untuk menangani notifikasi dari Midtrans.
- Menyimpan status pembayaran ke dalam database MongoDB.

---

## 🔧 Tools dan Teknologi yang Digunakan

### 📦 Dependencies:

- **[express](https://www.npmjs.com/package/express)**: Framework Node.js untuk membuat server.
- **[mongoose](https://www.npmjs.com/package/mongoose)**: Untuk menghubungkan dan mengelola MongoDB.
- **[node-fetch](https://www.npmjs.com/package/node-fetch)**: Untuk melakukan HTTP request ke Midtrans API.
- **[dotenv](https://www.npmjs.com/package/dotenv)**: Untuk mengelola variabel lingkungan (environment variables).

### 🛠️ DevDependencies:

- **[nodemon](https://www.npmjs.com/package/nodemon)**: Untuk mempermudah pengembangan dengan auto-reload server.

---

## 🚀 Instalasi dan Penggunaan

### 1️⃣ Clone Repository

```bash
git clone https://github.com/username/simulasi-payment-intent-midtrans.git
cd simulasi-payment-intent-midtrans
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Buat File `.env`

Tambahkan file `.env` di root project dan isi dengan variabel berikut:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
MIDTRANS_SERVER_KEY=your_midtrans_server_key
```

### 4️⃣ Jalankan Server

```bash
npm run dev
```

Server akan berjalan di `http://localhost:5000`.

---

## 📋 Endpoint API

### 1️⃣ 1. **POST /api/payment**

Membuat "Payment Intent" baru dan mendapatkan token serta URL pembayaran dari Midtrans.

**Request Body:**

```json
{
  "products": "product_id"
}
```

**Response:**

```json
{
  "message": "Order confirmed and payment intent created",
  "paymentData": {
    "token": "midtrans_token",
    "redirect_url": "midtrans_payment_url"
  }
}
```

### 2️⃣ **POST /api/payment/midtrans/callback**

Endpoint untuk menerima notifikasi dari Midtrans terkait status pembayaran.

**Catatan:** Pastikan URL ini diatur di dashboard Midtrans.

---

## 📁 Struktur Folder

```
.
├── controllers
│   ├── paymentIntent.controller.js
│   └── product.controller.js
├── models
│   ├── paymentIntent.model.js
│   └── product.model.js
├── routes
│   └── payment.route.js
│   └── product.route.js
├── index.js
├── .env
├── package.json
└── README.md
```

---

## 📝 Catatan Tambahan

- Pastikan MongoDB terhubung dengan benar melalui variabel `MONGO_URI`.
- Callback URL harus menggunakan protokol HTTPS jika digunakan di lingkungan produksi.

---

## 📄 Lisensi

Proyek ini menggunakan lisensi **ISC**.

