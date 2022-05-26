const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const News = require('../models/News');
const verify = require('./verifyToken');
const jwt = require('jsonwebtoken');
const Product = require('../models/Product');


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
        productId: 1,
        fullName: "Talıb İsmayılzadə",
        photo: "https://scontent.fgyd4-2.fna.fbcdn.net/v/t1.6435-9/172375004_1948773731927161_2405534761071305864_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=SjkJrU_gLBwAX-T1ZS1&tn=VffU5FtGNLn--OnT&_nc_ht=scontent.fgyd4-2.fna&oh=3f8a9c3a35a3d2ced8895143fedd1395&oe=60EC5C29",
        comment: "The shoes are way more cool, fantastic, fabulous, vibrant, striking and showy than I expected.I’m proud owner of Naughty Schnitzel Shoes, Das Cognac Boots and now Fuchsia Shoes.I adore each pair I've got.All of them are very comfy and durable, looking great after years and years of wearing them.Atheist Team, thank you so much for being so nice, responsive and for making great shoes.",
        rating: 4.9,
        date: "April 19, 2021 3:21 PM"
    },
    {
        reviewId: 2,
        productId: 2,
        fullName: "Talıb İsmayılzadə",
        photo: "https://scontent.fgyd4-2.fna.fbcdn.net/v/t1.6435-9/172375004_1948773731927161_2405534761071305864_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=SjkJrU_gLBwAX-T1ZS1&tn=VffU5FtGNLn--OnT&_nc_ht=scontent.fgyd4-2.fna&oh=3f8a9c3a35a3d2ced8895143fedd1395&oe=60EC5C29",
        comment: "The shoes are way more cool, fantastic, fabulous, vibrant, striking and showy than I expected.I’m proud owner of Naughty Schnitzel Shoes, Das Cognac Boots and now Fuchsia Shoes.I adore each pair I've got.All of them are very comfy and durable, looking great after years and years of wearing them.Atheist Team, thank you so much for being so nice, responsive and for making great shoes.",
        rating: 4.9,
        date: "April 19, 2021 3:21 PM"
    },
    {
        reviewId: 3,
        productId: 3,
        fullName: "Talıb İsmayılzadə",
        photo: "https://scontent.fgyd4-2.fna.fbcdn.net/v/t1.6435-9/172375004_1948773731927161_2405534761071305864_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=SjkJrU_gLBwAX-T1ZS1&tn=VffU5FtGNLn--OnT&_nc_ht=scontent.fgyd4-2.fna&oh=3f8a9c3a35a3d2ced8895143fedd1395&oe=60EC5C29",
        comment: "The shoes are way more cool, fantastic, fabulous, vibrant, striking and showy than I expected.I’m proud owner of Naughty Schnitzel Shoes, Das Cognac Boots and now Fuchsia Shoes.I adore each pair I've got.All of them are very comfy and durable, looking great after years and years of wearing them.Atheist Team, thank you so much for being so nice, responsive and for making great shoes.",
        rating: 4.9,
        date: "April 19, 2021 3:21 PM"
    },
    {
        reviewId: 1,
        productId: 7,
        fullName: "Talıb İsmayılzadə",
        photo: "https://scontent.fgyd4-2.fna.fbcdn.net/v/t1.6435-9/172375004_1948773731927161_2405534761071305864_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=SjkJrU_gLBwAX-T1ZS1&tn=VffU5FtGNLn--OnT&_nc_ht=scontent.fgyd4-2.fna&oh=3f8a9c3a35a3d2ced8895143fedd1395&oe=60EC5C29",
        comment: "The shoes are way more cool, fantastic, fabulous, vibrant, striking and showy than I expected.I’m proud owner of Naughty Schnitzel Shoes, Das Cognac Boots and now Fuchsia Shoes.I adore each pair I've got.All of them are very comfy and durable, looking great after years and years of wearing them.Atheist Team, thank you so much for being so nice, responsive and for making great shoes.",
        rating: 4.9,
        date: "April 19, 2021 3:21 PM"
    },
    {
        reviewId: 1,
        productId: 7,
        fullName: "Talıb İsmayılzadə",
        photo: "https://scontent.fgyd4-2.fna.fbcdn.net/v/t1.6435-9/172375004_1948773731927161_2405534761071305864_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=SjkJrU_gLBwAX-T1ZS1&tn=VffU5FtGNLn--OnT&_nc_ht=scontent.fgyd4-2.fna&oh=3f8a9c3a35a3d2ced8895143fedd1395&oe=60EC5C29",
        comment: "The shoes are way more cool, fantastic, fabulous, vibrant, striking and showy than I expected.I’m proud owner of Naughty Schnitzel Shoes, Das Cognac Boots and now Fuchsia Shoes.I adore each pair I've got.All of them are very comfy and durable, looking great after years and years of wearing them.Atheist Team, thank you so much for being so nice, responsive and for making great shoes.",
        rating: 4.9,
        date: "April 19, 2021 3:21 PM"
    },
    {
        reviewId: 1,
        productId: 7,
        fullName: "Talıb İsmayılzadə",
        photo: "https://scontent.fgyd4-2.fna.fbcdn.net/v/t1.6435-9/172375004_1948773731927161_2405534761071305864_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=SjkJrU_gLBwAX-T1ZS1&tn=VffU5FtGNLn--OnT&_nc_ht=scontent.fgyd4-2.fna&oh=3f8a9c3a35a3d2ced8895143fedd1395&oe=60EC5C29",
        comment: "The shoes are way more cool, fantastic, fabulous, vibrant, striking and showy than I expected.I’m proud owner of Naughty Schnitzel Shoes, Das Cognac Boots and now Fuchsia Shoes.I adore each pair I've got.All of them are very comfy and durable, looking great after years and years of wearing them.Atheist Team, thank you so much for being so nice, responsive and for making great shoes.",
        rating: 4.9,
        date: "April 19, 2021 3:21 PM"
    },
    {
        reviewId: 1,
        productId: 7,
        fullName: "Talıb İsmayılzadə",
        photo: "https://scontent.fgyd4-2.fna.fbcdn.net/v/t1.6435-9/172375004_1948773731927161_2405534761071305864_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=SjkJrU_gLBwAX-T1ZS1&tn=VffU5FtGNLn--OnT&_nc_ht=scontent.fgyd4-2.fna&oh=3f8a9c3a35a3d2ced8895143fedd1395&oe=60EC5C29",
        comment: "The shoes are way more cool, fantastic, fabulous, vibrant, striking and showy than I expected.I’m proud owner of Naughty Schnitzel Shoes, Das Cognac Boots and now Fuchsia Shoes.I adore each pair I've got.All of them are very comfy and durable, looking great after years and years of wearing them.Atheist Team, thank you so much for being so nice, responsive and for making great shoes.",
        rating: 4.9,
        date: "April 19, 2021 3:21 PM"
    },
    {
        reviewId: 1,
        productId: 7,
        fullName: "Talıb İsmayılzadə",
        photo: "https://scontent.fgyd4-2.fna.fbcdn.net/v/t1.6435-9/172375004_1948773731927161_2405534761071305864_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=SjkJrU_gLBwAX-T1ZS1&tn=VffU5FtGNLn--OnT&_nc_ht=scontent.fgyd4-2.fna&oh=3f8a9c3a35a3d2ced8895143fedd1395&oe=60EC5C29",
        comment: "The shoes are way more cool, fantastic, fabulous, vibrant, striking and showy than I expected.I’m proud owner of Naughty Schnitzel Shoes, Das Cognac Boots and now Fuchsia Shoes.I adore each pair I've got.All of them are very comfy and durable, looking great after years and years of wearing them.Atheist Team, thank you so much for being so nice, responsive and for making great shoes.",
        rating: 4.9,
        date: "April 19, 2021 3:21 PM"
    },
    {
        reviewId: 1,
        productId: 7,
        fullName: "Talıb İsmayılzadə",
        photo: "https://scontent.fgyd4-2.fna.fbcdn.net/v/t1.6435-9/172375004_1948773731927161_2405534761071305864_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=SjkJrU_gLBwAX-T1ZS1&tn=VffU5FtGNLn--OnT&_nc_ht=scontent.fgyd4-2.fna&oh=3f8a9c3a35a3d2ced8895143fedd1395&oe=60EC5C29",
        comment: "The shoes are way more cool, fantastic, fabulous, vibrant, striking and showy than I expected.I’m proud owner of Naughty Schnitzel Shoes, Das Cognac Boots and now Fuchsia Shoes.I adore each pair I've got.All of them are very comfy and durable, looking great after years and years of wearing them.Atheist Team, thank you so much for being so nice, responsive and for making great shoes.",
        rating: 4.9,
        date: "April 19, 2021 3:21 PM"
    },
    {
        reviewId: 1,
        productId: 7,
        fullName: "Talıb İsmayılzadə",
        photo: "https://scontent.fgyd4-2.fna.fbcdn.net/v/t1.6435-9/172375004_1948773731927161_2405534761071305864_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=SjkJrU_gLBwAX-T1ZS1&tn=VffU5FtGNLn--OnT&_nc_ht=scontent.fgyd4-2.fna&oh=3f8a9c3a35a3d2ced8895143fedd1395&oe=60EC5C29",
        comment: "The shoes are way more cool, fantastic, fabulous, vibrant, striking and showy than I expected.I’m proud owner of Naughty Schnitzel Shoes, Das Cognac Boots and now Fuchsia Shoes.I adore each pair I've got.All of them are very comfy and durable, looking great after years and years of wearing them.Atheist Team, thank you so much for being so nice, responsive and for making great shoes.",
        rating: 4.9,
        date: "April 19, 2021 3:21 PM"
    },
    {
        reviewId: 1,
        productId: 7,
        fullName: "Talıb İsmayılzadə",
        photo: "https://scontent.fgyd4-2.fna.fbcdn.net/v/t1.6435-9/172375004_1948773731927161_2405534761071305864_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=SjkJrU_gLBwAX-T1ZS1&tn=VffU5FtGNLn--OnT&_nc_ht=scontent.fgyd4-2.fna&oh=3f8a9c3a35a3d2ced8895143fedd1395&oe=60EC5C29",
        comment: "The shoes are way more cool, fantastic, fabulous, vibrant, striking and showy than I expected.I’m proud owner of Naughty Schnitzel Shoes, Das Cognac Boots and now Fuchsia Shoes.I adore each pair I've got.All of them are very comfy and durable, looking great after years and years of wearing them.Atheist Team, thank you so much for being so nice, responsive and for making great shoes.",
        rating: 4.9,
        date: "April 19, 2021 3:21 PM"
    },
    {
        reviewId: 1,
        productId: 7,
        fullName: "Talıb İsmayılzadə",
        photo: "https://scontent.fgyd4-2.fna.fbcdn.net/v/t1.6435-9/172375004_1948773731927161_2405534761071305864_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=SjkJrU_gLBwAX-T1ZS1&tn=VffU5FtGNLn--OnT&_nc_ht=scontent.fgyd4-2.fna&oh=3f8a9c3a35a3d2ced8895143fedd1395&oe=60EC5C29",
        comment: "The shoes are way more cool, fantastic, fabulous, vibrant, striking and showy than I expected.I’m proud owner of Naughty Schnitzel Shoes, Das Cognac Boots and now Fuchsia Shoes.I adore each pair I've got.All of them are very comfy and durable, looking great after years and years of wearing them.Atheist Team, thank you so much for being so nice, responsive and for making great shoes.",
        rating: 4.9,
        date: "April 19, 2021 3:21 PM"
    },
    {
        reviewId: 1,
        productId: 7,
        fullName: "Talıb İsmayılzadə",
        photo: "https://scontent.fgyd4-2.fna.fbcdn.net/v/t1.6435-9/172375004_1948773731927161_2405534761071305864_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=SjkJrU_gLBwAX-T1ZS1&tn=VffU5FtGNLn--OnT&_nc_ht=scontent.fgyd4-2.fna&oh=3f8a9c3a35a3d2ced8895143fedd1395&oe=60EC5C29",
        comment: "The shoes are way more cool, fantastic, fabulous, vibrant, striking and showy than I expected.I’m proud owner of Naughty Schnitzel Shoes, Das Cognac Boots and now Fuchsia Shoes.I adore each pair I've got.All of them are very comfy and durable, looking great after years and years of wearing them.Atheist Team, thank you so much for being so nice, responsive and for making great shoes.",
        rating: 4.9,
        date: "April 19, 2021 3:21 PM"
    },
    {
        reviewId: 1,
        productId: 7,
        fullName: "Talıb İsmayılzadə",
        photo: "https://scontent.fgyd4-2.fna.fbcdn.net/v/t1.6435-9/172375004_1948773731927161_2405534761071305864_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=SjkJrU_gLBwAX-T1ZS1&tn=VffU5FtGNLn--OnT&_nc_ht=scontent.fgyd4-2.fna&oh=3f8a9c3a35a3d2ced8895143fedd1395&oe=60EC5C29",
        comment: "The shoes are way more cool, fantastic, fabulous, vibrant, striking and showy than I expected.I’m proud owner of Naughty Schnitzel Shoes, Das Cognac Boots and now Fuchsia Shoes.I adore each pair I've got.All of them are very comfy and durable, looking great after years and years of wearing them.Atheist Team, thank you so much for being so nice, responsive and for making great shoes.",
        rating: 4.9,
        date: "April 19, 2021 3:21 PM"
    },
    {
        reviewId: 1,
        productId: 7,
        fullName: "Talıb İsmayılzadə",
        photo: "https://scontent.fgyd4-2.fna.fbcdn.net/v/t1.6435-9/172375004_1948773731927161_2405534761071305864_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=SjkJrU_gLBwAX-T1ZS1&tn=VffU5FtGNLn--OnT&_nc_ht=scontent.fgyd4-2.fna&oh=3f8a9c3a35a3d2ced8895143fedd1395&oe=60EC5C29",
        comment: "The shoes are way more cool, fantastic, fabulous, vibrant, striking and showy than I expected.I’m proud owner of Naughty Schnitzel Shoes, Das Cognac Boots and now Fuchsia Shoes.I adore each pair I've got.All of them are very comfy and durable, looking great after years and years of wearing them.Atheist Team, thank you so much for being so nice, responsive and for making great shoes.",
        rating: 4.9,
        date: "April 19, 2021 3:21 PM"
    },
    {
        reviewId: 1,
        productId: 7,
        fullName: "Talıb İsmayılzadə",
        photo: "https://scontent.fgyd4-2.fna.fbcdn.net/v/t1.6435-9/172375004_1948773731927161_2405534761071305864_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=SjkJrU_gLBwAX-T1ZS1&tn=VffU5FtGNLn--OnT&_nc_ht=scontent.fgyd4-2.fna&oh=3f8a9c3a35a3d2ced8895143fedd1395&oe=60EC5C29",
        comment: "The shoes are way more cool, fantastic, fabulous, vibrant, striking and showy than I expected.I’m proud owner of Naughty Schnitzel Shoes, Das Cognac Boots and now Fuchsia Shoes.I adore each pair I've got.All of them are very comfy and durable, looking great after years and years of wearing them.Atheist Team, thank you so much for being so nice, responsive and for making great shoes.",
        rating: 4.9,
        date: "April 19, 2021 3:21 PM"
    }
]

const advertismentProducts = [
    {
        advertismentId: 1,
        title: "Super Flash Sale 50% Off",
        image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d2hpdGUlMjBzaG9lc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
        date: "08:34:52"
    },
    {
        advertismentId: 2,
        title: "Mega Sale 80% Off",
        image: "https://cdn.stocksnap.io/img-thumbs/960w/nike-shoes_0R37EU64ZH.jpg",
        date: "15:14:43"
    },
    {
        advertismentId: 3,
        title: "Super Mega Sale 90% Off",
        image: "https://c0.wallpaperflare.com/preview/762/772/865/pair-of-white-and-blue-air-jordan-1-s.jpg",
        date: "21:34:12"
    }
]

const categories = [
    {
        categoryId: 1,
        title: "Shirt",
        icon: "https://i.ibb.co/Tm3WwzS/bd58a83e715d576c04022d598096b890.png"
    },
    {
        categoryId: 2,
        title: "Bikini",
        icon: "https://i.ibb.co/DC9K8tT/bikini.png"
    },
    {
        categoryId: 3,
        title: "Dress",
        icon: "https://i.ibb.co/YRBH08h/tshirt-112188.png"
    },
    {
        categoryId: 4,
        title: "Work Equipment",
        icon: "https://i.ibb.co/YRBH08h/tshirt-112188.png"
    },
    {
        categoryId: 5,
        title: "Man Pants",
        icon: "https://i.ibb.co/YRBH08h/tshirt-112188.png"
    },
    {
        categoryId: 6,
        title: "Man Shoes",
        icon: "https://i.ibb.co/YRBH08h/tshirt-112188.png"
    },
    {
        categoryId: 7,
        title: "Man Underwear",
        icon: "https://i.ibb.co/YRBH08h/tshirt-112188.png"
    },
    {
        categoryId: 8,
        title: "Man T-Shirt",
        icon: "https://i.ibb.co/YRBH08h/tshirt-112188.png"
    },
    {
        categoryId: 9,
        title: "Woman Bag",
        icon: "https://i.ibb.co/YRBH08h/tshirt-112188.png"
    },
    {
        categoryId: 10,
        title: "Woman Pants",
        icon: "https://i.ibb.co/YRBH08h/tshirt-112188.png"
    }
]

const products = [
    {
        productId: 1,
        title: "Nike Sportswear Futura Luxe",
        specification: "A versatile and stylish design, the Nike Sportswear Futura Cross-Body Bag can be worn as a hip pack, over-the-shoulder, clutch or cross-body bag.2 zip pockets help keep your essentials organised, while a satin lining and Swoosh zip pulls elevate the look.This product is made from at least 65% recycled polyester fibres.",
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
        specification: "Crown your feet in the Nike Air Max 90 LX.Staying true to athletic roots, it updates the streetwear icon with hits of richly textured plant material (crafted from pineapple-leaf fibre) on the Swoosh and heel.The cork-infused Waffle outsole adds earthy sophistication to every outfit, while the embroidered pineapple on the tongue delivers the perfect summertime flavour.Lace up!'Cause you're never too old to go pineapples.",
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
        specification: "The Jordan Max Aura 2 is inspired by the brand's rich legacy of performance basketball shoes. The design takes cues from past Air Jordans with lightweight cushioning and a look that's money on the street.\n\nColour Shown: Black/Light Smoke Grey/White/Tropical Twist\nStyle: CK6636-007",
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
        specification: "In 1971, the legend of the Swoosh was born when it was stitched to a pair of football boots, drawing inspiration from the Greek goddess Nike.Embodying the spirit of sport and its power to unify, the Swoosh symbolises progress from the tracks to the fields to the streets.Celebrate this icon your way with what may be our greatest shoe of all time: the Nike Air Force 1 Unlocked By You.\n\nColour Shown: Multi-Colour/Multi-Colour/Multi-Colour/Multi-Colour\nStyle: DJ7015-991",
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
        specification: "The Nike Air Force 1 Mid By You became an instant icon after its debut in 1982. Now you can make this classic your own with a colour palette inspired by the '80s and '90s and premium materials including smooth and rippled leather and a new, matching sidewall selection. It's time to create a look that speaks to you.",
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
        specification: "Shatter the sneaker status quo in the Jordan MA2. Made from a mix of suede, full-grain leather and a variety of textiles, it's got unconventional labels, technical micro-graphics and raw foam edges for a balance of new and classic. Easy to get on and off, it looks good with just about anything.\n\nColour Shown: Light Smoke Grey/University Blue/Pollen/Game Royal\nStyle: CV8122-004",
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
        specification: "Shatter the sneaker status quo in the Jordan MA2. Made from a mix of suede, full-grain leather and a variety of textiles, it's got unconventional labels, technical micro-graphics and raw foam edges for a balance of new and classic. Easy to get on and off, it looks good with just about anything.\n\nColour Shown: Light Smoke Grey/University Blue/Pollen/Game Royal\nStyle: CV8122-004",
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
        title: "Nike Air Max 95",
        specification: "Your favourite legend that's inspired by the human body and our running DNA returns.This time, the Nike Air Max 95 mashes vibrant colours from your favourite past iterations all together.The iconic side panels represent muscles while Max Air cushions every step.\n\nColour Shown: Off-Noir/Black/Dark Smoke Grey/Solar Red \nStyle: DN8020-001",
        thumbnailImage: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/45a4c312-9da3-4086-a8d3-619b33a432c3/air-max-95-ayakkab%C4%B1s%C4%B1-klv0B9.png",
        images: [
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/45a4c312-9da3-4086-a8d3-619b33a432c3/air-max-95-ayakkab%C4%B1s%C4%B1-klv0B9.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/3539a5a9-c29f-4e69-bb02-cc115eaee550/air-max-95-ayakkab%C4%B1s%C4%B1-klv0B9.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/f05557dd-6378-46fa-901c-0db9d61bd172/air-max-95-ayakkab%C4%B1s%C4%B1-klv0B9.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/d65448b6-f00f-4f43-9d3c-321877ed88f0/air-max-95-ayakkab%C4%B1s%C4%B1-klv0B9.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/f1f3ce37-5c89-499e-b6e8-430919d292c3/air-max-95-ayakkab%C4%B1s%C4%B1-klv0B9.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/13b3328b-a959-41ee-b29d-b08aa259ade1/air-max-95-ayakkab%C4%B1s%C4%B1-klv0B9.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/2a484bf4-f504-4454-8ad8-69f5d525ae37/air-max-95-ayakkab%C4%B1s%C4%B1-klv0B9.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/7ed45a90-23eb-4d39-95c8-2d77329ab8ff/air-max-95-ayakkab%C4%B1s%C4%B1-klv0B9.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/afca5525-dfc0-4b8f-8fad-a5c5be550297/air-max-95-ayakkab%C4%B1s%C4%B1-klv0B9.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/e42086ed-2aae-450f-af98-29f50888223a/air-max-95-ayakkab%C4%B1s%C4%B1-klv0B9.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/8fdce558-50ce-4720-95f3-ef87be22178e/air-max-95-ayakkab%C4%B1s%C4%B1-klv0B9.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/648619de-1dbf-4b23-8f2b-319dd6ad9b06/air-max-95-ayakkab%C4%B1s%C4%B1-klv0B9.png"
        ],
        rating: 4.7,
        price: 641.33,
        discountPrice: 309.12,
        discountPercent: 27
    },
    {
        productId: 9,
        title: "Nike Air Max 90 SE",
        specification: "Nothing as fly, nothing as comfortable, nothing as proven—the Nike Air Max 90 SE celebrates the 50th anniversary of the Swoosh.Staying true to its running roots with an iconic Waffle sole, stitched overlays and classic TPU accents on the eyelets and heel, it now features the original Swoosh design and removable lace aglet.Other fast-paced details add to the celebratory look.\n\nColour Shown: Sail/Cream II/Light Bone/White\nStyle: DB0636-100",
        thumbnailImage: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/d3886aeb-497a-4207-bbb0-469469c806c0/air-max-90-se-shoes-4sdQbc.png",
        images: [
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/d3886aeb-497a-4207-bbb0-469469c806c0/air-max-90-se-shoes-4sdQbc.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/d8438c91-79c9-404b-a5c8-4a9b43b53377/air-max-90-se-shoes-4sdQbc.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/fc5baaee-7be4-4d6f-8a24-b0e6b8da8b6c/air-max-90-se-shoes-4sdQbc.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/74e19b96-ee68-404b-a288-4bbd1730174d/air-max-90-se-shoes-4sdQbc.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/8a62b068-a08c-4e95-9f6a-00ed4657ee85/air-max-90-se-shoes-4sdQbc.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/3af628e2-5e0f-4037-a9f8-4051f497f6c7/air-max-90-se-shoes-4sdQbc.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/2e8cbe54-5d35-478b-b0f3-8b9d47ee9a16/air-max-90-se-shoes-4sdQbc.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/5a48e90b-fbec-4a32-85da-44f79870241f/air-max-90-se-shoes-4sdQbc.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/9a081ee8-6f19-4bcf-98bc-09e6696c2590/air-max-90-se-shoes-4sdQbc.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/2f81c946-57dc-44fc-b046-30d49d73c447/air-max-90-se-shoes-4sdQbc.png"
        ],
        rating: 4.9,
        price: 731.78,
        discountPrice: 365.89,
        discountPercent: 50
    },
    {
        productId: 10,
        title: "Nike Air Force 1 Low",
        specification: "In 1971, the legend of the Swoosh was born when it was stitched to a pair of football boots, drawing inspiration from the Greek goddess Nike.Embodying the spirit of sport and its power to unify, the Swoosh symbolises progress from the tracks to the fields to the streets.Celebrate this icon your way with what may be our greatest shoe of all time: the Nike Air Force 1 Unlocked By You.\n\nColour Shown: Multi-Colour/Multi-Colour/Multi-Colour/Multi-Colour\nStyle: DJ7015-991",
        thumbnailImage: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/726ac2fa-0cbb-4542-88f4-8aefeb7ea564/custom-nike-air-force-1-unlocked-by-you.png",
        images: [
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/726ac2fa-0cbb-4542-88f4-8aefeb7ea564/custom-nike-air-force-1-unlocked-by-you.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/11d08a72-c497-483a-a9e6-d88865f38510/custom-nike-air-force-1-unlocked-by-you.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/b78d9081-d7e9-4033-bcb2-52c4207bd692/custom-nike-air-force-1-unlocked-by-you.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/1d5a1899-74e9-423e-bcc4-32c584d608d4/custom-nike-air-force-1-unlocked-by-you.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/166c1c71-231a-486a-8ded-4dfd6d379119/custom-nike-air-force-1-unlocked-by-you.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/05451b2c-773d-417b-b735-64a7384c923c/custom-nike-air-force-1-unlocked-by-you.png"
        ],
        rating: 4.5,
        price: 341.12,
        discountPrice: 239.43,
        discountPercent: 30
    },
    {
        productId: 11,
        title: "Jordan MA2",
        specification: "Shatter the sneaker status quo in the Jordan MA2. Made from a mix of suede, full-grain leather and a variety of textiles, it features unconventional labels, technical micro-graphics and raw foam edges for a balance of new and classic. Easy to get on and off and effortlessly comfortable, the shoe is a stylish symbol of Jordan attitude and innovation.\n\nColour Shown: White/University Red/Light Smoke Grey/Black\nStyle: CW5992-106",
        thumbnailImage: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/be54a636-ed40-485f-b939-c452a9c501c4/jordan-ma2-shoe-Pn2QSQ.png",
        images: [
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/be54a636-ed40-485f-b939-c452a9c501c4/jordan-ma2-shoe-Pn2QSQ.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/e998f8a8-bce2-44f6-9816-d8d0bbdaa0d3/jordan-ma2-shoe-Pn2QSQ.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/981d85d0-c354-4c78-be4a-fa754abad06b/jordan-ma2-shoe-Pn2QSQ.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/efdd7ef2-408f-4f75-8138-bc2e42c0ae9e/jordan-ma2-shoe-Pn2QSQ.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/f5ee84bf-2e10-495a-9e0a-88d317f3c859/jordan-ma2-shoe-Pn2QSQ.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/3ebd91e6-4503-4ed2-bd72-b58f78ac8d6c/jordan-ma2-shoe-Pn2QSQ.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/f5542810-ae7f-4988-9f24-1f61053697f5/jordan-ma2-shoe-Pn2QSQ.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/7329bdd6-63de-412b-92ea-a489624a05b6/jordan-ma2-shoe-Pn2QSQ.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/49327ef4-b85e-437a-be6f-6ed95c59f230/jordan-ma2-shoe-Pn2QSQ.png"
        ],
        rating: 5.0,
        price: 750.50,
        discountPrice: 375.25,
        discountPercent: 50
    },
    {
        productId: 12,
        title: "Nike Pegasus Trail 3",
        specification: "Move seamlessly from cityscapes to trails without compromising your aesthetic in the Nike Pegasus Trail 3.Desaturated tones and hidden wilderness markers are paired with the same cushioned comfort and traction you love.Support around the midfoot helps you feel secure on your journey, tackling tough terrain and city lanes in one classic shoe.",
        thumbnailImage: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/f5611d3a-8b81-4bbe-a9be-1688897b26e4/pegasus-trail-3-trail-running-shoe-ctxxng.png",
        images: [
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/f5611d3a-8b81-4bbe-a9be-1688897b26e4/pegasus-trail-3-trail-running-shoe-ctxxng.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/c0a8a49d-80af-4959-a3e0-516e17bae1d9/pegasus-trail-3-trail-running-shoe-ctxxng.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/a5368c95-cf43-4e01-b719-88cd4acfc5c2/pegasus-trail-3-trail-running-shoe-ctxxng.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/4b9ddd1b-e574-473d-aed3-23634ccfecf2/pegasus-trail-3-trail-running-shoe-ctxxng.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/b83a0824-00a7-4e09-9940-2fc98117d40e/pegasus-trail-3-trail-running-shoe-ctxxng.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/2a89a487-e349-459a-856c-2f47c5cc2f21/pegasus-trail-3-trail-running-shoe-ctxxng.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/b69983fd-6543-4dc7-850d-165e3a2ddd96/pegasus-trail-3-trail-running-shoe-ctxxng.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/0adfcab8-a151-4568-bb5b-44c1766f70e0/pegasus-trail-3-trail-running-shoe-ctxxng.png"
        ],
        rating: 4.7,
        price: 534.33,
        discountPrice: 299.43,
        discountPercent: 24
    },
    {
        productId: 13,
        title: "Nike Air Zoom Terra Kiger 7",
        specification: "Because in this sport, we all finish.The Nike Air Zoom Terra Kiger 7 embraces the motto `Leave nobody behind` and it's inscribed on the tongue with a reflective-design print to shine through every run, night and day.Fast and lightweight, the shoe delivers a breathable and secure feel as you race over rocky paths.Plus, an S-hook is connected to the laces so you can easily latch them onto your bag and take them on the go.",
        thumbnailImage: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/d5ca3ab8-dc32-4e67-b9ae-9d864cef6b34/air-zoom-terra-kiger-7-trail-running-shoe-GZTMxP.png",
        images: [
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/d5ca3ab8-dc32-4e67-b9ae-9d864cef6b34/air-zoom-terra-kiger-7-trail-running-shoe-GZTMxP.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/ddd78b7b-a2a6-4efe-aa6a-f03f8d1208a6/air-zoom-terra-kiger-7-trail-running-shoe-GZTMxP.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/e4b837f6-6a95-49c1-91ed-e61440e5f2ee/air-zoom-terra-kiger-7-trail-running-shoe-GZTMxP.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/40203b80-490c-4e85-9d5e-1ba58fe1c9f8/air-zoom-terra-kiger-7-trail-running-shoe-GZTMxP.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/7e96883a-29ad-4a86-9bc0-63b3222ea07e/air-zoom-terra-kiger-7-trail-running-shoe-GZTMxP.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/4b97f1c5-07e4-486b-b273-f9d088df5e77/air-zoom-terra-kiger-7-trail-running-shoe-GZTMxP.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/ee3c7dda-4eea-4616-9a55-f839331232fe/air-zoom-terra-kiger-7-trail-running-shoe-GZTMxP.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/a2094197-74c9-402a-a32a-7ef9f87fc37f/air-zoom-terra-kiger-7-trail-running-shoe-GZTMxP.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/fd133988-cd74-4e5e-87f5-73dbd1c5bab6/air-zoom-terra-kiger-7-trail-running-shoe-GZTMxP.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/cd957def-bd5a-44ff-9fe4-485510ab1899/air-zoom-terra-kiger-7-trail-running-shoe-GZTMxP.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/00b90ac8-c357-4216-8d30-01735b72265a/air-zoom-terra-kiger-7-trail-running-shoe-GZTMxP.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/7617dae8-5a73-4f79-b366-7dfb65afff87/air-zoom-terra-kiger-7-trail-running-shoe-GZTMxP.png"
        ],
        rating: 4.1,
        price: 124.53,
        discountPrice: 112.43,
        discountPercent: 10
    },
    {
        productId: 14,
        title: "Nike Air Max 2090",
        specification: "Bring the past into the future with the Nike Air Max 2090, a bold look inspired by the DNA of the iconic Air Max 90.Brand-new Max Air cushioning underfoot adds unparalleled comfort while mesh and cool-coloured textiles blend with timeless OG features for an edgy, modernised look.\n\nColour Shown: Black/Bleached Aqua/Summit White/Chile Red\nStyle: DA4292-001",
        thumbnailImage: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/17c3e41e-3310-4f1d-8096-d892240b534a/air-max-2090-shoes-hdzbld.png",
        images: [
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/17c3e41e-3310-4f1d-8096-d892240b534a/air-max-2090-shoes-hdzbld.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/3d490361-bc57-4c22-9a20-96b1f5a3d6c3/air-max-2090-shoes-hdzbld.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/b84bc880-90b5-4dfd-994e-4bbf14bedba6/air-max-2090-shoes-hdzbld.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/346134ce-332c-47e1-b58a-7c25208ae9f9/air-max-2090-shoes-hdzbld.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/3d18fc26-5eec-4075-b065-231530079db3/air-max-2090-shoes-hdzbld.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/02e9a842-8087-4c94-987e-fde5235d0f57/air-max-2090-shoes-hdzbld.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/e984d3fc-ba7c-4dcc-8b7a-e811992e048e/air-max-2090-shoes-hdzbld.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/2e92a7c3-3455-40fc-8484-7898e242a78f/air-max-2090-shoes-hdzbld.png"
        ],
        rating: 4.9,
        price: 129.95,
        discountPrice: 77.97,
        discountPercent: 40
    },
    {
        productId: 15,
        title: "Jordan Break",
        specification: "Featuring a fixed strap over the top of the foot, the Jordan Break Slide uses durable synthetic leather and lightweight foam cushioning for underfoot comfort.\n\nColour Shown: University Red/Metallic Silver\nStyle: AR6374-602",
        thumbnailImage: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/18907d4a-f88d-4ec5-96a9-6e09643ac448/jordan-break-slides-kv40Rq.png",
        images: [
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/18907d4a-f88d-4ec5-96a9-6e09643ac448/jordan-break-slides-kv40Rq.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/4a29e7c3-a5c1-4827-a948-9dc81f054e64/jordan-break-slides-kv40Rq.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/5235414a-5002-452c-ae41-b62690ed49b6/jordan-break-slides-kv40Rq.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/3a381da9-dcca-4e56-ac51-6ff92a94ca37/jordan-break-slides-kv40Rq.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/9c1b8887-e104-4c0a-b635-390a55da9d11/jordan-break-slides-kv40Rq.png"
        ],
        rating: 5.0,
        price: 26.95,
        discountPrice: 21.97,
        discountPercent: 18
    }
]

const homePage = {
    advertisments: advertismentProducts,
    categories: categories.filter((val, i) => i < 6),
    items: [
        {
            advertismentId: 1,
            title: "Flash Sale",
            products: products.slice(0, 5)
        },
        {
            advertismentId: 2,
            title: "Mega Sale",
            products: products.slice(5, 10)
        },
        {
            advertismentId: 4,
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

router.get('/offer-screen/:id', verify, async (req, res) => {
    const advertisment = advertismentProducts.find(o => o.advertismentId == req.params.id)
    if (advertisment != null) {
        res.json({
            title: advertisment.title,
            image: advertisment.image,
            products: products
        });
    }
    res.status(404).json({ message: "Advertisment Not found" })
});

router.get('/product-detail/:id', verify, async (req, res) => {
    const product = products.find(o => o.productId == req.params.id)
    if (product != null) {
        res.json({
            info: product, sizes: sizes,
            specification: product.specification,
            topReview: reviews[Math.floor(Math.random() * reviews.length)]
        });
    }
    res.status(404).json({ message: "Product Not found" })
});

router.get('/reviews/:id', verify, async (req, res) => {
    const review = reviews.filter(o => o.productId == req.params.id)
    if (review.length > 0) {
        res.json({ count: review.length, reviews: review });
    }
    res.status(404).json({ message: "Reviews Not found" })
});


router.post('/add-to-cart/:id', async (req, res) => {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).json({ message: 'Access Denied' });

    jwt.verify(token, 'myStrongSecret123', async (err, user) => {
        if (err) {
            return res.status(401).json({ message: 'Access Denied' });
        }
        const product = products.find(o => o.productId == req.params.id)
        if (product != null) {
            const productExist = await Product.findOne({ userId: user._id, productId: req.params.id });
            if (productExist) {
                try {
                    await Product.updateOne(
                        { _id: productExist._id },
                        { $set: { count: productExist.count + 1 } }
                    );
                    const productExist2 = await Product.findOne({ userId: user._id, productId: req.params.id });
                    res.json({ data: productExist2 });
                } catch (e) {
                    res.json({ message: e });
                }
            } else {
                const productModel = new Product({
                    productTitle: product.title,
                    image: product.thumbnailImage,
                    price: product.price,
                    count: 1,
                    userId: user._id,
                    productId: product.productId
                });

                productModel.save().then(data => {
                    res.json({ data: data });
                }).catch(er => {
                    res.json(er);
                });
            }

        } else {
            res.status(404).json({ message: "Product Not found" })
        }
    });
});

router.get('/notifications', verify, async (req, res) => {
    res.json({
        offerCount: Math.floor(Math.random() * 10),
        feedCount: Math.floor(Math.random() * 10),
        activityCount: Math.floor(Math.random() * 10),
    });
});

router.get('/notifications/offer', verify, async (req, res) => {
    res.json([{
        title: "SUMMER OFFER 98% Cashback",
        description: "Culpa cillum consectetur labore nulla nulla magna irure. Id veniam culpa officia aute dolor",
        date: "April 30, 2021 3:01 PM"
    },
    {
        title: "Special Offer 25% OFF",
        description: "Culpa cillum consectetur labore nulla nulla magna irure. Id veniam culpa officia aute dolor",
        date: "April 28, 2021 1:13 PM"
    },
    {
        title: "Buy 1 get 1 FREE",
        description: "Culpa cillum consectetur labore nulla nulla magna irure. Id veniam culpa officia aute dolor",
        date: "April 25, 2021 2:07 PM"
    }]);
});

router.get('/notifications/feed', verify, async (req, res) => {
    res.json([
        {
            title: "New Product",
            description: "Nike Air Force 1 Pixel - Special For your Activity",
            image: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/10bad0b9-abd3-47e2-8fc0-1323d2f6a3f2/air-force-1-pixel-ayakkab%C4%B1s%C4%B1-txmVNP.png",
            date: "April 29, 2021 3:01 PM"
        },
        {
            title: "New Product",
            description: "Nike Air Force 1 Low - Special For your Activity",
            image: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/5768b674-e92e-4e0a-a565-c4ce648e8b08/air-force-1-low-ayakkab%C4%B1s%C4%B1-r57dLb.png",
            date: "April 25, 2021 9:21 PM"
        },
        {
            title: "New Product",
            description: "Nike Air Force 1 '07 - Special For your Activity",
            image: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/ba95261f-1a8d-4f39-812e-b2e9ace8ada8/air-force-1-07-ayakkab%C4%B1s%C4%B1-7DX06H.png",
            date: "April 21, 2021 1:25 PM"
        }]);
});

router.get('/notifications/activity', verify, async (req, res) => {
    res.json([{
        title: "Transaction Nike Air Zoom Product",
        description: "Culpa cillum consectetur labore nulla nulla magna irure. Id veniam culpa officia aute dolor",
        date: "April 28, 2021 3:15 PM"
    },
    {
        title: "Transaction Nike Air Zoom Pegasus 36 Miami",
        description: "Culpa cillum consectetur labore nulla nulla magna irure. Id veniam culpa officia aute dolor",
        date: "April 24, 2021 1:01 PM"
    },
    {
        title: "Transaction Nike Air Max",
        description: "Culpa cillum consectetur labore nulla nulla magna irure. Id veniam culpa officia aute dolor",
        date: "April 19, 2021 3:21 PM"
    }]);
});

router.get('/search', verify, async (req, res) => {
    if(req.query.key != null && req.query.key != ''){
        const product = products.filter(o => o.title.toLowerCase().includes(req.query.key.toLowerCase()))
    if (product.length > 0) {
        res.json({ count: product.length, products: product });
    }
    res.status(404).json({ message: "Product Not found" })
    }else{
        res.status(404).json({ message: "Product Not found" })
    }
});

router.get('/cart', async (req, res) => {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).json({ message: 'Access Denied' });

    jwt.verify(token, 'myStrongSecret123', async (err, user) => {
        if (err) {
            return res.status(401).json({ message: 'Access Denied' });
        }
        try {
            const productsInCart = await Product.find({ "userId": user._id });
            var total = 0;
            for (var i in productsInCart) {
                total += productsInCart[i].price;
            }
            res.json({ data: productsInCart, itemCount: productsInCart.length, shipping: 40.0, importCharges: 105.0 ,totalPrice: total})
        } catch (er) {
            res.status(500).json({ message: er })
        }
    });
});

router.get('/checkOut', async (req, res) => {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).json({ message: 'Access Denied' });

    jwt.verify(token, 'myStrongSecret123', async (err, user) => {
        if (err) {
            return res.status(401).json({ message: 'Access Denied' });
        }
        try {
            await Product.deleteMany({ "userId": user._id });
            res.json({ message: "Successfull"})
        } catch (er) {
            res.status(500).json({ message: er })
        }
    });
});



router.post('/remove-from-cart/:id', async (req, res) => {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).json({ message: 'Access Denied' });

    jwt.verify(token, 'myStrongSecret123', async (err, user) => {
        if (err) {
            return res.status(401).json({ message: 'Access Denied' });
        }
        const product = products.find(o => o.productId == req.params.id)
        if (product != null) {
            const productExist = await Product.findOne({ userId: user._id, productId: req.params.id });
            if (productExist) {
                if(productExist.count > 1){
                    try {
                        await Product.updateOne(
                            { _id: productExist._id },
                            { $set: { count: productExist.count - 1 } }
                        );
                    } catch (e) {
                        res.json({ message: e });
                    }
                }else{
                    await Product.deleteOne({ "userId": user._id,"productId": req.params.id});
                }
                try {
                    const productsInCart = await Product.find({ "userId": user._id });
                    var total = 0;
                    for (var i in productsInCart) {
                        total += productsInCart[i].price;
                    }
                    res.json({ data: productsInCart, itemCount: productsInCart.length, shipping: 40.0, importCharges: 105.0 ,totalPrice: total})
                } catch (er) {
                    res.json({ message: er })
                }
                
            } else {
                res.status(404).json({ message: "Product Not found" })
            }

        } else {
            res.status(404).json({ message: "Product Not found" })
        }
    });
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
