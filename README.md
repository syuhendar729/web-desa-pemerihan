# Setup Development Website Desa Pemerihan

> Ini adalah setup resmi untuk menginstall dan menjalankan development environtment website Desa Pemerihan.

## Installation

1. nodejs24
2. docker/podman
3. docker compose/podman compose

### Setup
> Setup ini harus dijalankan sekali saja saat belum ada development environment atau saat setelah mereset container dan volume
### 1. Setup postgres:
- Buat db local menggunakan compose
- Jika menggunakan podman ubah command docker menjadi podman (example: docker compose up -d menjadi podman compose up -d)
###### Buat container postgres
```sh
docker compose up -d
```
###### Jalankan migration prisma
> jangan lupa install dulu dependensi di package.json (run npm install)
```sh
npx prisma db push
```
###### Buat prisma client artifacts (typescript things, you don't need to think about it)
```sh
npx prisma generate
```

#### Usefull Commands:
- Beberapa command yang mungkin akan berguna
###### Reset container dan volume db
```sh
docker compose down --rmi
```
###### Cek status container
```sh
docker compose ps
```
###### Masuk ke psql di container postgres
```sh
podman exec -it web-desa-pemerihan_db_1 psql -U postgres
```

