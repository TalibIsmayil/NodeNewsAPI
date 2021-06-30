const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const News = require('../models/News');
const verify = require('./verifyToken');

const sizes = [
    "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48"
]

const newsMedia = [
    {
        title: "Hər kəsin xoşuna gəlməyə çalışmayın",
        publishedAt: "Bugün",
        url: "https://marja.az/73109/her-kesin-xosuna-gelmeye-calismayin",
        urlToImage: "https://marja.az/storage/thumbnail/cover/cdn/2021/%C4%B0yun/30/anar-esgerov.jpeg"
    },
    {
        title: "Qərb fond birjaları üzrə ÖDƏNİŞSİZ təlimlər",
        publishedAt: "Bugün",
        url: "https://marja.az/72720/qerb-fond-birjalari-uzre-odenissiz-telimler",
        urlToImage: "https://marja.az/storage/thumbnail/cover/cdn/2021/%C4%B0yun/17/freedom-finance-azerbaijan-2.jpg"
    },
    {
        title: "“Slavyanka” yeniləndi - VİDEO",
        publishedAt: "Bugün",
        url: "https://marja.az/73062/slavyanka-yenilendi-video",
        urlToImage: "https://marja.az/storage/thumbnail/cover/cdn/2021/%C4%B0yun/29/slavyanka.jpg"
    },
    {
        title: "“Western Union”la beynəlxalq pul köçürmələri indi UBank mobil tətbiqində",
        publishedAt: "Bugün",
        url: "https://marja.az/73106/western-unionla-beynelxalq-pul-kocurmeleri-indi-ubank-mobil-tetbiqinde",
        urlToImage: "https://marja.az/storage/thumbnail/cover/cdn/2021/%C4%B0yun/30/unibank-pul.jpg"
    },
    {
        title: "Mühərriki BMW, sürəti 170 km/saat...",
        publishedAt: "Bugün",
        url: "https://marja.az/73099/muherriki-bmw-sureti-170-kmsaat",
        urlToImage: "https://marja.az/storage/thumbnail/cover/cdn/2021/%C4%B0yun/30/ucan-avtomobil.jpg"
    }
]
const reviews = [
    {
        reviewId: 1,
        fullName: "",
        photo: "",
        comment: "",
        rating: "",
        date: ""
    },
    {
        reviewId: 2,
        fullName: "",
        photo: "",
        comment: "",
        rating: "",
        date: ""
    },
    {
        reviewId: 3,
        fullName: "",
        photo: "",
        comment: "",
        rating: "",
        date: ""
    },
    {
        reviewId: 4,
        fullName: "",
        photo: "",
        comment: "",
        rating: "",
        date: ""
    },
    {
        reviewId: 5,
        fullName: "",
        photo: "",
        comment: "",
        rating: "",
        date: ""
    },
    {
        reviewId: 6,
        fullName: "",
        photo: "",
        comment: "",
        rating: "",
        date: ""
    }
]

const advertismentProducts = [
    {
        productId: 1,
        title: "Super Flash Sale 50% Off",
        image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d2hpdGUlMjBzaG9lc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
        date: "08:34:52"
    },
    {
        productId: 2,
        title: "Mega Sale 80% Off",
        image: "https://cdn.stocksnap.io/img-thumbs/960w/nike-shoes_0R37EU64ZH.jpg",
        date: "15:14:43"
    },
    {
        productId: 3,
        title: "Super Mega Sale 90% Off",
        image: "https://c0.wallpaperflare.com/preview/762/772/865/pair-of-white-and-blue-air-jordan-1-s.jpg",
        date: "21:34:12"
    }
]

const categories = [
    {
        categoryId: 1,
        title: "Man Shirt",
        icon: "https://i.ibb.co/YRBH08h/tshirt-112188.png"
    },
    {
        categoryId: 2,
        title: "Dress",
        icon: "https://cdn.stocksnap.io/img-thumbs/960w/nike-shoes_0R37EU64ZH.jpg"
    },
    {
        categoryId: 3,
        title: "Dress",
        icon: "https://cdn.stocksnap.io/img-thumbs/960w/nike-shoes_0R37EU64ZH.jpg"
    },
    {
        categoryId: 4,
        title: "Dress",
        icon: "https://cdn.stocksnap.io/img-thumbs/960w/nike-shoes_0R37EU64ZH.jpg"
    },
    {
        categoryId: 5,
        title: "Dress",
        icon: "https://cdn.stocksnap.io/img-thumbs/960w/nike-shoes_0R37EU64ZH.jpg"
    },
    {
        categoryId: 6,
        title: "Dress",
        icon: "https://cdn.stocksnap.io/img-thumbs/960w/nike-shoes_0R37EU64ZH.jpg"
    },
    {
        categoryId: 7,
        title: "Dress",
        icon: "https://cdn.stocksnap.io/img-thumbs/960w/nike-shoes_0R37EU64ZH.jpg"
    },
    {
        categoryId: 8,
        title: "Dress",
        icon: "https://cdn.stocksnap.io/img-thumbs/960w/nike-shoes_0R37EU64ZH.jpg"
    }
]

const products = [
    {
        productId: 1,
        title: "Nike Sportswear Futura Luxe",
        thumbnailImage: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,b_rgb:f5f5f5/aa59e8dd-8e26-4fac-90ff-c85f4bdb4b80/sportswear-futura-luxe-%C3%A7apraz-%C3%A7antas%C4%B1-SPHsqZ.png",
        images: [
            "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,b_rgb:f5f5f5/aa59e8dd-8e26-4fac-90ff-c85f4bdb4b80/sportswear-futura-luxe-%C3%A7apraz-%C3%A7antas%C4%B1-SPHsqZ.png",
            "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,b_rgb:f5f5f5/7f6bf476-a748-49ab-aa40-8f97d77d73fc/sportswear-futura-luxe-%C3%A7apraz-%C3%A7antas%C4%B1-SPHsqZ.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/4489edeb-608f-4f0e-89fa-5175fcf8a703/sportswear-futura-luxe-%C3%A7apraz-%C3%A7antas%C4%B1-SPHsqZ.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/1302a360-b8b0-4401-88d0-8f3a0b65847b/sportswear-futura-luxe-%C3%A7apraz-%C3%A7antas%C4%B1-SPHsqZ.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/39a8649d-7566-40f7-af1e-ee566e7b6c2e/sportswear-futura-luxe-%C3%A7apraz-%C3%A7antas%C4%B1-SPHsqZ.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/04c10c44-3828-4ccd-a3fc-9a63c99c2da8/sportswear-futura-luxe-%C3%A7apraz-%C3%A7antas%C4%B1-SPHsqZ.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/cfdbcc9e-31f5-4614-b28d-abe39662221e/sportswear-futura-luxe-%C3%A7apraz-%C3%A7antas%C4%B1-SPHsqZ.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/fda756f4-b6ec-4abf-9fb8-9d747de40f56/sportswear-futura-luxe-%C3%A7apraz-%C3%A7antas%C4%B1-SPHsqZ.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/37f0177f-cc56-49e5-9b55-671a46631624/sportswear-futura-luxe-%C3%A7apraz-%C3%A7antas%C4%B1-SPHsqZ.png"
        ],
        rating: 4.7,
        price: 534.33,
        discountPrice: 299.43,
        discountPercent: 24
    },
    {
        productId: 2,
        title: "Nike Air Max 90 LX",
        thumbnailImage: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/c089ca4a-23bb-411b-b826-7c6fd7e7d0f1/air-max-90-60-ayakkab%C4%B1s%C4%B1-DQbQ5r.png",
        images: [
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/c089ca4a-23bb-411b-b826-7c6fd7e7d0f1/air-max-90-60-ayakkab%C4%B1s%C4%B1-DQbQ5r.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/3eafcf37-75dd-4d45-9286-d4cda9655c20/air-max-90-60-ayakkab%C4%B1s%C4%B1-DQbQ5r.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/a241ba02-6a67-44b5-80b6-7972697be24e/air-max-90-60-ayakkab%C4%B1s%C4%B1-DQbQ5r.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/50d4fe7a-2915-4ad4-8251-bc90cafcfacb/air-max-90-60-ayakkab%C4%B1s%C4%B1-DQbQ5r.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/1b0b6127-f08a-46f6-9cea-9dd71802ff3d/air-max-90-60-ayakkab%C4%B1s%C4%B1-DQbQ5r.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/386a2ec7-1255-43e5-ac0d-2d611a0b81e4/air-max-90-60-ayakkab%C4%B1s%C4%B1-DQbQ5r.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/ea172f50-41ed-4a1f-9f1d-c1e4c130b17b/air-max-90-60-ayakkab%C4%B1s%C4%B1-DQbQ5r.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/af0bc0b6-c5b2-4942-b20e-c11033af0e91/air-max-90-60-ayakkab%C4%B1s%C4%B1-DQbQ5r.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/05a55391-375a-4490-9a96-c1ca677b4f89/air-max-90-60-ayakkab%C4%B1s%C4%B1-DQbQ5r.png"
        ],
        rating: 4.9,
        price: 1349.90,
        discountPrice: 944.93,
        discountPercent: 30
    },
    {
        productId: 3,
        title: "Jordan Max Aura 2",
        thumbnailImage: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/81e221df-6553-48db-861d-329cb581cc59/jordan-max-aura-2-ayakkab%C4%B1s%C4%B1-vssjMJ.png",
        images: [
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/81e221df-6553-48db-861d-329cb581cc59/jordan-max-aura-2-ayakkab%C4%B1s%C4%B1-vssjMJ.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/dcb7404e-699f-4c50-a0b0-12552b1ff4f4/jordan-max-aura-2-ayakkab%C4%B1s%C4%B1-vssjMJ.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/9dd82717-1696-4a37-810c-f9908b36ef42/jordan-max-aura-2-ayakkab%C4%B1s%C4%B1-vssjMJ.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/5a9da9fc-162b-4871-b9e0-158002d19eda/jordan-max-aura-2-ayakkab%C4%B1s%C4%B1-vssjMJ.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/902006d5-cc86-4fc7-8a59-d4d5fe7d5cc3/jordan-max-aura-2-ayakkab%C4%B1s%C4%B1-vssjMJ.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/d152b331-d0f6-422e-aa5a-9918038ae384/jordan-max-aura-2-ayakkab%C4%B1s%C4%B1-vssjMJ.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/d84425d5-ef98-443d-a2ba-00de6ccd0492/jordan-max-aura-2-ayakkab%C4%B1s%C4%B1-vssjMJ.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/4ee7511e-2af0-4bb8-bd76-d1dddae83bc2/jordan-max-aura-2-ayakkab%C4%B1s%C4%B1-vssjMJ.png"
        ],
        rating: 4.9,
        price: 1079.90,
        discountPrice: 801.32,
        discountPercent: 20
    },
    {
        productId: 4,
        title: "Nike Air Force 1 Low",
        thumbnailImage: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/b4ddd9bb-a650-423a-9cd9-a276f3a56edf/air-force-1-low-ayakkab%C4%B1-hb72wk.png",
        images: [
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/b4ddd9bb-a650-423a-9cd9-a276f3a56edf/air-force-1-low-ayakkab%C4%B1-hb72wk.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/42d9d558-620b-456d-b076-3e4ea35281ed/air-force-1-low-ayakkab%C4%B1-hb72wk.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/78e3d998-1259-4add-9176-5498168cff9a/air-force-1-low-ayakkab%C4%B1-hb72wk.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/28cca568-29f0-4ee8-b614-f48ff85d4710/air-force-1-low-ayakkab%C4%B1-hb72wk.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/bf24c631-7fe2-4f71-b63a-d2b82c6b1cfe/air-force-1-low-ayakkab%C4%B1-hb72wk.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/83f61bda-9cf6-4732-b086-47ade53e3173/air-force-1-low-ayakkab%C4%B1-hb72wk.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/d37aff76-baac-4a88-8721-2accc1ce9bb9/air-force-1-low-ayakkab%C4%B1-hb72wk.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/e98b1d34-92c1-41c1-aec2-c8d7a149fdfc/air-force-1-low-ayakkab%C4%B1-hb72wk.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/72b96b95-db23-444e-81d9-935d40fa8a17/air-force-1-low-ayakkab%C4%B1-hb72wk.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/52ebcd1a-a189-405b-96e8-94433184e260/air-force-1-low-ayakkab%C4%B1-hb72wk.png"
        ],
        rating: 4.6,
        price: 899.90,
        discountPrice: 584.94,
        discountPercent: 35
    },
    {
        productId: 5,
        title: "Nike Air Force 1 Mid By You",
        thumbnailImage: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/0499abab-0fea-4aa7-a712-83e1911492eb/custom-nike-air-force-1-mid-by-you.png",
        images: [
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/0499abab-0fea-4aa7-a712-83e1911492eb/custom-nike-air-force-1-mid-by-you.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/7f3daf6e-609b-4fcb-bebc-9314429a10e3/custom-nike-air-force-1-mid-by-you.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/e443c5c7-22f6-49f1-8c45-cac3df12832d/custom-nike-air-force-1-mid-by-you.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/8d36be32-dbcc-45b0-b134-35309ab904c7/custom-nike-air-force-1-mid-by-you.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/754181d7-4efb-427a-81bc-b2d0ed4d37ba/custom-nike-air-force-1-mid-by-you.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/2d73e3af-2c63-4ccd-9d8d-e2e14d4654c9/custom-nike-air-force-1-mid-by-you.png"
        ],
        rating: 4.4,
        price: 643.65,
        discountPrice: 512.35,
        discountPercent: 15
    },
    {
        productId: 6,
        title: "Jordan MA2",
        thumbnailImage: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/fb5fdd9f-a9d0-4bcc-8258-d4fbf6751de0/jordan-ma2-ayakkab%C4%B1-dmkgC9.png",
        images: [
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/fb5fdd9f-a9d0-4bcc-8258-d4fbf6751de0/jordan-ma2-ayakkab%C4%B1-dmkgC9.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/0f3344f9-2310-47b3-997e-cb2c5c3bf8b6/jordan-ma2-ayakkab%C4%B1-dmkgC9.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/b7cfd781-68ba-4b5a-bd22-59215b49a721/jordan-ma2-ayakkab%C4%B1-dmkgC9.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/11b6c6eb-70f8-4f4e-aa46-c7e5e72fe566/jordan-ma2-ayakkab%C4%B1-dmkgC9.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/0382f255-5d9a-4e4b-a320-9e3179e2f44c/jordan-ma2-ayakkab%C4%B1-dmkgC9.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/adea284c-17a2-4e6f-9e55-9cd70506ff7f/jordan-ma2-ayakkab%C4%B1-dmkgC9.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/34fbae3c-a52a-4dcc-bdfc-9e2b2eb30e11/jordan-ma2-ayakkab%C4%B1-dmkgC9.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/4e18c3cb-023d-4ad0-ad14-1f62f4216f65/jordan-ma2-ayakkab%C4%B1-dmkgC9.png"
        ],
        rating: 4.5,
        price: 1199.90,
        discountPrice: 719.94,
        discountPercent: 40
    },
    {
        productId: 7,
        title: "Jordan MA2",
        thumbnailImage: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/be84ba96-30c0-4d79-a0fe-978e5dde301b/jordan-ma2-ayakkab%C4%B1s%C4%B1-Pd6D4H.png",
        images: [
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/be84ba96-30c0-4d79-a0fe-978e5dde301b/jordan-ma2-ayakkab%C4%B1s%C4%B1-Pd6D4H.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/70913d5c-2fc2-4292-a79e-bc8397c7508e/jordan-ma2-ayakkab%C4%B1s%C4%B1-Pd6D4H.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/fa4b26a1-4564-403b-97e8-99a088560255/jordan-ma2-ayakkab%C4%B1s%C4%B1-Pd6D4H.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/61e0f50f-9834-4d81-9fd9-9a0d6285c53e/jordan-ma2-ayakkab%C4%B1s%C4%B1-Pd6D4H.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/b438a1a9-4c95-48a9-ae84-95f10c498672/jordan-ma2-ayakkab%C4%B1s%C4%B1-Pd6D4H.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/87e6a0d8-5040-473e-90c2-e85bdc765710/jordan-ma2-ayakkab%C4%B1s%C4%B1-Pd6D4H.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/d77602bc-772d-4b4f-a405-00ce2af36978/jordan-ma2-ayakkab%C4%B1s%C4%B1-Pd6D4H.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/986a1267-3a06-4478-aa05-349b865f6494/jordan-ma2-ayakkab%C4%B1s%C4%B1-Pd6D4H.png"
        ],
        rating: 4.8,
        price: 1199.90,
        discountPrice: 840.78,
        discountPercent: 24
    },
    {
        productId: 8,
        title: "",
        thumbnailImage: "",
        images: [],
        rating: 4.7,
        price: 534.33,
        discountPrice: 299.43,
        discountPercent: 24
    },
    {
        productId: 9,
        title: "",
        thumbnailImage: "",
        images: [],
        rating: 4.7,
        price: 534.33,
        discountPrice: 299.43,
        discountPercent: 24
    },
    {
        productId: 10,
        title: "",
        thumbnailImage: "",
        images: [],
        rating: 4.7,
        price: 534.33,
        discountPrice: 299.43,
        discountPercent: 24
    },
    {
        productId: 11,
        title: "",
        thumbnailImage: "",
        images: [],
        rating: 4.7,
        price: 534.33,
        discountPrice: 299.43,
        discountPercent: 24
    },
    {
        productId: 12,
        title: "",
        thumbnailImage: "",
        images: [],
        rating: 4.7,
        price: 534.33,
        discountPrice: 299.43,
        discountPercent: 24
    },
    {
        productId: 13,
        title: "",
        thumbnailImage: "",
        images: [],
        rating: 4.7,
        price: 534.33,
        discountPrice: 299.43,
        discountPercent: 24
    },
    {
        productId: 14,
        title: "",
        thumbnailImage: "",
        images: [],
        rating: 4.7,
        price: 534.33,
        discountPrice: 299.43,
        discountPercent: 24
    },
    {
        productId: 15,
        title: "",
        thumbnailImage: "",
        images: [],
        rating: 4.7,
        price: 534.33,
        discountPrice: 299.43,
        discountPercent: 24
    }
]

const homePage = {
    advertisments: advertismentProducts,
    categories: categories.filter((val, i) => i < 6),
    items: [
        {
            title: "Flash Sale",
            products: products.slice(0, 5)
        },
        {
            title: "Mega Sale",
            products: products.slice(5, 10)
        },
        {
            title: "Recomended Product",
            products: products.slice(10, 15)
        }
    ]
}

router.get('/news', async (req, res) => {
    res.json(newsMedia);
});

router.get('/home-page', verify, async (req, res) => {
    res.json(homePage);
});

router.get('/categories', verify, async (req, res) => {
    res.json(categories);
});

router.get('/product-detail/:id', verify, async (req, res) => {
    const product = products.find(o => o.productId == req.params.id)
    if (product != null) {
        res.json({ info: product, sizes: sizes, 
            specification: `${product.title} combines a full-length React foam midsole with a 270 Max Air unit for unrivaled comfort and a striking visual experience.`,
        reviews: reviews});
    }
    res.json({ message: "Product Not found" })
});

router.post('/', (req, res) => {
    const news = new News({
        title: req.body.title,
        url: req.body.url,
        urlToImage: req.body.imageUrl,
        publishedAt: Date.now()
    });
    news.save().then(data => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    });
});



module.exports = router;