const Discord = require('discord.js');
const express = require('express');
var fs = require('fs');
var cheerio = require('cheerio');
var app = express();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const client = new Discord.Client();
var settings = require('./settings.json');

var digimonCards = ["https://assets.cardlist.dev/images/communitycards/BT1-001_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-002_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-003_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-004_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-005_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-006_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-007_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-008_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-009_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-010_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-010_P1_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-011_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-012_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-013_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-014_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-015_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-016_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-017_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-018_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-019_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-020_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-021_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-022_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-023_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-024_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-025_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-025_P1_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-026_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-027_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-028_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-029_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-029_P1_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-030_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-031_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-032_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-033_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-034_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-035_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-036_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-037_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-038_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-039_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-040_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-041_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-042_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-043_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-044_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-044_P1_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-045_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-046_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-047_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-048_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-049_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-050_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-051_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-052_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-053_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-054_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-055_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-056_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-057_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-058_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-059_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-060_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-060_P1_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-061_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-062_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-063_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-064_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-065_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-066_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-067_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-068_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-069_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-070_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-071_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-072_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-073_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-074_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-075_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-076_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-076_c77962en-US.png",
"https://assets.cardlist.dev/images/communitycards/BT1-077_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-078_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-079_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-080_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-081_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-082_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-082_P1_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-083_592d4cen-US.png",
"https://assets.cardlist.dev/images/communitycards/BT1-083_2dd19ben-US.png",
"https://assets.cardlist.dev/images/communitycards/BT1-084_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-084_P1_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-085_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-085_P1_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-086_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-086_P1_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-087_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-087_P1_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-088_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-088_P1_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-089_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-089_P1_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-090_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-091_49d6d0en-US.jpg",
"https://assets.cardlist.dev/images/communitycards/BT1-092_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-093_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-094_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-095_2fac00en-US.png",
"https://assets.cardlist.dev/images/communitycards/BT1-095_180b90en-US.png",
"https://assets.cardlist.dev/images/communitycards/BT1-096_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-097_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-098_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-099_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-100_0248aben-US.jpg",
"https://assets.cardlist.dev/images/communitycards/BT1-101_e7c853en-US.jpg",
"https://assets.cardlist.dev/images/communitycards/BT1-101_ff6158en-US.png",
"https://assets.cardlist.dev/images/communitycards/BT1-102_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-103_19d41cen-US.png",
"https://assets.cardlist.dev/images/communitycards/BT1-104_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-105_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-106_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-107_819813en-US.jpg",
"https://assets.cardlist.dev/images/communitycards/BT1-107_e0cbc5en-US.png",
"https://assets.cardlist.dev/images/communitycards/BT1-108_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-109_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-110_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-110_P1_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-111_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-112_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-113_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-114_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-114_P1_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-115_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT1-115_P1_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-001_4f19d1en-US.jpg",
"https://assets.cardlist.dev/images/communitycards/BT2-002_d0e761en-US.jpg",
"https://assets.cardlist.dev/images/communitycards/BT2-003.png",
"https://assets.cardlist.dev/images/communitycards/BT2-004.png",
"https://assets.cardlist.dev/images/communitycards/BT2-005_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-006_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-007_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-008_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-009_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-010_970660en-US.jpg",
"https://assets.cardlist.dev/images/communitycards/BT2-011.png",
"https://assets.cardlist.dev/images/communitycards/BT2-012.png",
"https://assets.cardlist.dev/images/communitycards/BT2-013_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-014_ac7e5aen-US.jpg",
"https://assets.cardlist.dev/images/communitycards/BT2-015_d4e32cen-US.jpg",
"https://assets.cardlist.dev/images/communitycards/BT2-016_47c6b0en-US.jpg",
"https://assets.cardlist.dev/images/communitycards/BT2-017_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-018_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-019.png",
"https://assets.cardlist.dev/images/communitycards/BT2-020_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-020_P1_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-021_58c059en-US.jpg",
"https://assets.cardlist.dev/images/communitycards/BT2-022.png",
"https://assets.cardlist.dev/images/communitycards/BT2-023.png",
"https://assets.cardlist.dev/images/communitycards/BT2-024.png",
"https://assets.cardlist.dev/images/communitycards/BT2-025.png",
"https://assets.cardlist.dev/images/communitycards/BT2-026.png",
"https://assets.cardlist.dev/images/communitycards/BT2-027.png",
"https://assets.cardlist.dev/images/communitycards/BT2-028_40ca64en-US.jpg",
"https://assets.cardlist.dev/images/communitycards/BT2-029_05029een-US.jpg",
"https://assets.cardlist.dev/images/communitycards/BT2-030_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-030_P1_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-031.png",
"https://assets.cardlist.dev/images/communitycards/BT2-032.png",
"https://assets.cardlist.dev/images/communitycards/BT2-032_3777f9en-US.png",
"https://assets.cardlist.dev/images/communitycards/BT2-033_e57729en-US.jpg",
"https://assets.cardlist.dev/images/communitycards/BT2-034_56e4b0en-US.jpg",
"https://assets.cardlist.dev/images/communitycards/BT2-035.png",
"https://assets.cardlist.dev/images/communitycards/BT2-036.png",
"https://assets.cardlist.dev/images/communitycards/BT2-037_976961en-US.jpg",
"https://assets.cardlist.dev/images/communitycards/BT2-038.png",
"https://assets.cardlist.dev/images/communitycards/BT2-039_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-040.png",
"https://assets.cardlist.dev/images/communitycards/BT2-041_b3ad94en-US.jpg",
"https://assets.cardlist.dev/images/communitycards/BT2-041_c7ffc2en-US.png",
"https://assets.cardlist.dev/images/communitycards/BT2-042_8f4dacen-US.jpg",
"https://assets.cardlist.dev/images/communitycards/BT2-043_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-044_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-045.png",
"https://assets.cardlist.dev/images/communitycards/BT2-046_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-047.png",
"https://assets.cardlist.dev/images/communitycards/BT2-048_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-049_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-049_P1_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-050.png",
"https://assets.cardlist.dev/images/communitycards/BT2-051_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-052_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-053_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-054_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-055_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-056_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-057_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-058_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-059_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-060_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-061_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-062_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-063_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-064_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-065_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-065_P1_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-066_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-066_P1_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-067_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-068_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-069_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-070_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-071_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-072_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-073_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-074_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-075_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-076_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-077_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-078_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-079_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-080_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-080_P1_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-081_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-081_P1_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-082_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-082_P1_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-083_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-084_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-084_P1_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-085_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-085_P1_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-086_dc05f6en-US.png",
"https://assets.cardlist.dev/images/communitycards/BT2-087_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-087_P1_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-088_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-089_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-089_P1_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-090_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-090_P1_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-091.png",
"https://assets.cardlist.dev/images/communitycards/BT2-092_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-093_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-094.png",
"https://assets.cardlist.dev/images/communitycards/BT2-095_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-096.png",
"https://assets.cardlist.dev/images/communitycards/BT2-097.png",
"https://assets.cardlist.dev/images/communitycards/BT2-098.png",
"https://assets.cardlist.dev/images/communitycards/BT2-099.png",
"https://assets.cardlist.dev/images/communitycards/BT2-100.png",
"https://assets.cardlist.dev/images/communitycards/BT2-101_6f44f9en-US.jpg",
"https://assets.cardlist.dev/images/communitycards/BT2-102_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-103_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-104_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-105_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-106_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-107_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-108_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-109_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-110_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-111_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-111_P1_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT2-112.png",
"https://assets.cardlist.dev/images/communitycards/BT2-112_b8bcf2en-US.png",
"https://assets.cardlist.dev/images/communitycards/BT3-001.png",
"https://assets.cardlist.dev/images/communitycards/BT3-002.png",
"https://assets.cardlist.dev/images/communitycards/BT3-003_78087fen-US.png",
"https://assets.cardlist.dev/images/communitycards/BT3-004.png",
"https://assets.cardlist.dev/images/communitycards/BT3-005_fc47c9en-US.png",
"https://assets.cardlist.dev/images/communitycards/BT3-006.png",
"https://assets.cardlist.dev/images/communitycards/BT3-007.png",
"https://assets.cardlist.dev/images/communitycards/BT3-008_30785cen-US.jpg",
"https://assets.cardlist.dev/images/communitycards/BT3-009.png",
"https://assets.cardlist.dev/images/communitycards/BT3-010.png",
"https://assets.cardlist.dev/images/communitycards/BT3-011.png",
"https://assets.cardlist.dev/images/communitycards/BT3-011_cdc1efen-US.png",
"https://assets.cardlist.dev/images/communitycards/BT3-012.png",
"https://assets.cardlist.dev/images/communitycards/BT3-013.png",
"https://assets.cardlist.dev/images/communitycards/BT3-014.png",
"https://assets.cardlist.dev/images/communitycards/BT3-015.png",
"https://assets.cardlist.dev/images/communitycards/BT3-016.png",
"https://assets.cardlist.dev/images/communitycards/BT3-017.png",
"https://assets.cardlist.dev/images/communitycards/BT3-018.png",
"https://assets.cardlist.dev/images/communitycards/BT3-018_1f7a1aen-US.png",
"https://assets.cardlist.dev/images/communitycards/BT3-019.png",
"https://assets.cardlist.dev/images/communitycards/BT3-019_31a8dden-US.png",
"https://assets.cardlist.dev/images/communitycards/BT3-020.png",
"https://assets.cardlist.dev/images/communitycards/BT3-021.png",
"https://assets.cardlist.dev/images/communitycards/BT3-022.png",
"https://assets.cardlist.dev/images/communitycards/BT3-023.png",
"https://assets.cardlist.dev/images/communitycards/BT3-024.png",
"https://assets.cardlist.dev/images/communitycards/BT3-024_78d2ffen-US.png",
"https://assets.cardlist.dev/images/communitycards/BT3-025.png",
"https://assets.cardlist.dev/images/communitycards/BT3-026.png",
"https://assets.cardlist.dev/images/communitycards/BT3-027.png",
"https://assets.cardlist.dev/images/communitycards/BT3-028.png",
"https://assets.cardlist.dev/images/communitycards/BT3-029.png",
"https://assets.cardlist.dev/images/communitycards/BT3-030_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT3-030_65456ben-US.png",
"https://assets.cardlist.dev/images/communitycards/BT3-031.png",
"https://assets.cardlist.dev/images/communitycards/BT3-031_c3e722en-US.png",
"https://assets.cardlist.dev/images/communitycards/BT3-032.png",
"https://assets.cardlist.dev/images/communitycards/BT3-033.png",
"https://assets.cardlist.dev/images/communitycards/BT3-034.png",
"https://assets.cardlist.dev/images/communitycards/BT3-035.png",
"https://assets.cardlist.dev/images/communitycards/BT3-036.png",
"https://assets.cardlist.dev/images/communitycards/BT3-036_9d89c8en-US.png",
"https://assets.cardlist.dev/images/communitycards/BT3-037.png",
"https://assets.cardlist.dev/images/communitycards/BT3-038_6aeea4en-US.jpg",
"https://assets.cardlist.dev/images/communitycards/BT3-039.png",
"https://assets.cardlist.dev/images/communitycards/BT3-040.png",
"https://assets.cardlist.dev/images/communitycards/BT3-041.png",
"https://assets.cardlist.dev/images/communitycards/BT3-042.png",
"https://assets.cardlist.dev/images/communitycards/BT3-043_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT3-043_P1_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT3-044_3551f0en-US.jpg",
"https://assets.cardlist.dev/images/communitycards/BT3-045_d212f6en-US.jpg",
"https://assets.cardlist.dev/images/communitycards/BT3-046.png",
"https://assets.cardlist.dev/images/communitycards/BT3-047.png",
"https://assets.cardlist.dev/images/communitycards/BT3-048.png",
"https://assets.cardlist.dev/images/communitycards/BT3-049.png",
"https://assets.cardlist.dev/images/communitycards/BT3-049_f9354aen-US.png",
"https://assets.cardlist.dev/images/communitycards/BT3-050.png",
"https://assets.cardlist.dev/images/communitycards/BT3-051.png",
"https://assets.cardlist.dev/images/communitycards/BT3-052.png",
"https://assets.cardlist.dev/images/communitycards/BT3-053_72a760en-US.jpg",
"https://assets.cardlist.dev/images/communitycards/BT3-054_e481f8en-US.jpg",
"https://assets.cardlist.dev/images/communitycards/BT3-055.png",
"https://assets.cardlist.dev/images/communitycards/BT3-056.png",
"https://assets.cardlist.dev/images/communitycards/BT3-056_051f9cen-US.png",
"https://assets.cardlist.dev/images/communitycards/BT3-057.png",
"https://assets.cardlist.dev/images/communitycards/BT3-058.png",
"https://assets.cardlist.dev/images/communitycards/BT3-059_fb27d7en-US.jpg",
"https://assets.cardlist.dev/images/communitycards/BT3-060.png",
"https://assets.cardlist.dev/images/communitycards/BT3-061_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT3-062.png",
"https://assets.cardlist.dev/images/communitycards/BT3-063.png",
"https://assets.cardlist.dev/images/communitycards/BT3-064_c8935een-US.jpg",
"https://assets.cardlist.dev/images/communitycards/BT3-065.png",
"https://assets.cardlist.dev/images/communitycards/BT3-065_9b78e8en-US.png",
"https://assets.cardlist.dev/images/communitycards/BT3-066.png",
"https://assets.cardlist.dev/images/communitycards/BT3-067.png",
"https://assets.cardlist.dev/images/communitycards/BT3-068_bbaa9ben-US.jpg",
"https://assets.cardlist.dev/images/communitycards/BT3-069_7858aaen-US.jpg",
"https://assets.cardlist.dev/images/communitycards/BT3-070.png",
"https://assets.cardlist.dev/images/communitycards/BT3-071_24d628en-US.jpg",
"https://assets.cardlist.dev/images/communitycards/BT3-072_b18e97en-US.png",
"https://assets.cardlist.dev/images/communitycards/BT3-073.png",
"https://assets.cardlist.dev/images/communitycards/BT3-073_91c77aen-US.png",
"https://assets.cardlist.dev/images/communitycards/BT3-074_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT3-075.png",
"https://assets.cardlist.dev/images/communitycards/BT3-075_98cbbben-US.png",
"https://assets.cardlist.dev/images/communitycards/BT3-076.png",
"https://assets.cardlist.dev/images/communitycards/BT3-077.png",
"https://assets.cardlist.dev/images/communitycards/BT3-078_095d7fen-US.jpg",
"https://assets.cardlist.dev/images/communitycards/BT3-079_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT3-080.png",
"https://assets.cardlist.dev/images/communitycards/BT3-081_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT3-082.png",
"https://assets.cardlist.dev/images/communitycards/BT3-082_e20443en-US.png",
"https://assets.cardlist.dev/images/communitycards/BT3-083_577635en-US.jpg",
"https://assets.cardlist.dev/images/communitycards/BT3-084_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT3-085.png",
"https://assets.cardlist.dev/images/communitycards/BT3-086_16c773en-US.jpg",
"https://assets.cardlist.dev/images/communitycards/BT3-087_48af12en-US.jpg",
"https://assets.cardlist.dev/images/communitycards/BT3-088.png",
"https://assets.cardlist.dev/images/communitycards/BT3-089_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT3-090.png",
"https://assets.cardlist.dev/images/communitycards/BT3-090_85407den-US.jpg",
"https://assets.cardlist.dev/images/communitycards/BT3-091_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT3-091_P1_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT3-092.png",
"https://assets.cardlist.dev/images/communitycards/BT3-093.png",
"https://assets.cardlist.dev/images/communitycards/BT3-094.png",
"https://assets.cardlist.dev/images/communitycards/BT3-095.png",
"https://assets.cardlist.dev/images/communitycards/BT3-096.png",
"https://assets.cardlist.dev/images/communitycards/BT3-097.png",
"https://assets.cardlist.dev/images/communitycards/BT3-098.png",
"https://assets.cardlist.dev/images/communitycards/BT3-099.png",
"https://assets.cardlist.dev/images/communitycards/BT3-100.png",
"https://assets.cardlist.dev/images/communitycards/BT3-101.png",
"https://assets.cardlist.dev/images/communitycards/BT3-102.png",
"https://assets.cardlist.dev/images/communitycards/BT3-103.png",
"https://assets.cardlist.dev/images/communitycards/BT3-104.png",
"https://assets.cardlist.dev/images/communitycards/BT3-105.png",
"https://assets.cardlist.dev/images/communitycards/BT3-106_fd83c6en-US.jpg",
"https://assets.cardlist.dev/images/communitycards/BT3-107_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT3-108.png",
"https://assets.cardlist.dev/images/communitycards/BT3-109_IRL.png",
"https://assets.cardlist.dev/images/communitycards/BT3-110_23d802en-US.jpg",
"https://assets.cardlist.dev/images/communitycards/BT3-111.png",
"https://assets.cardlist.dev/images/communitycards/BT3-111_a1444ben-US.png",
"https://assets.cardlist.dev/images/communitycards/BT3-112.png",
"https://assets.cardlist.dev/images/communitycards/BT3-112_470328en-US.png",
"https://assets.cardlist.dev/images/communitycards/P-001_IRL.png",
"https://assets.cardlist.dev/images/communitycards/P-002_IRL.png",
"https://assets.cardlist.dev/images/communitycards/P-003_IRL.png",
"https://assets.cardlist.dev/images/communitycards/P-004_IRL.png",
"https://assets.cardlist.dev/images/communitycards/P-005_IRL.png",
"https://assets.cardlist.dev/images/communitycards/P-006_IRL.png",
"https://assets.cardlist.dev/images/communitycards/P-007_010c05en-US.png",
"https://assets.cardlist.dev/images/communitycards/P-008_IRL.png",
"https://assets.cardlist.dev/images/communitycards/P-009_IRL.png",
"https://assets.cardlist.dev/images/communitycards/P-010_IRL.png",
"https://assets.cardlist.dev/images/communitycards/P-011_IRL.png",
"https://assets.cardlist.dev/images/communitycards/P-012_IRL.png",
"https://assets.cardlist.dev/images/communitycards/P-013_8cabb9en-US.png",
"https://assets.cardlist.dev/images/communitycards/P-014_443d94en-US.png",
"https://assets.cardlist.dev/images/communitycards/P-015_848af7en-US.png",
"https://assets.cardlist.dev/images/communitycards/P-016_52687aen-US.png",
"https://assets.cardlist.dev/images/communitycards/P-017_72e092en-US.png",
"https://assets.cardlist.dev/images/communitycards/P-018_4fda7aen-US.png",
"https://assets.cardlist.dev/images/communitycards/P-019_edcfb8en-US.png",
"https://assets.cardlist.dev/images/communitycards/P-020_344241en-US.png",
"https://assets.cardlist.dev/images/communitycards/ST1-01_IRL.png",
"https://assets.cardlist.dev/images/communitycards/ST1-02_IRL.png",
"https://assets.cardlist.dev/images/communitycards/ST1-03_IRL.png",
"https://assets.cardlist.dev/images/communitycards/ST1-04_IRL.png",
"https://assets.cardlist.dev/images/communitycards/ST1-05_IRL.png",
"https://assets.cardlist.dev/images/communitycards/ST1-06_IRL.png",
"https://assets.cardlist.dev/images/communitycards/ST1-07_IRL.png",
"https://assets.cardlist.dev/images/communitycards/ST1-07_849a18en-US.png",
"https://assets.cardlist.dev/images/communitycards/ST1-08_P1_IRL.png",
"https://assets.cardlist.dev/images/communitycards/ST1-08_IRL.png",
"https://assets.cardlist.dev/images/communitycards/ST1-09_d50eb3en-US.png",
"https://assets.cardlist.dev/images/communitycards/ST1-09_P2_IRL.png",
"https://assets.cardlist.dev/images/communitycards/ST1-09_IRL.png",
"https://assets.cardlist.dev/images/communitycards/ST1-10_IRL.png",
"https://assets.cardlist.dev/images/communitycards/ST1-11_IRL.png",
"https://assets.cardlist.dev/images/communitycards/ST1-12_IRL.png",
"https://assets.cardlist.dev/images/communitycards/ST1-13_IRL.png",
"https://assets.cardlist.dev/images/communitycards/ST1-14_IRL.png",
"https://assets.cardlist.dev/images/communitycards/ST1-15_IRL.png",
"https://assets.cardlist.dev/images/communitycards/ST1-16_IRL.png",
"https://assets.cardlist.dev/images/communitycards/ST2-01_IRL.png",
"https://assets.cardlist.dev/images/communitycards/ST2-02_IRL.png",
"https://assets.cardlist.dev/images/communitycards/ST2-03_IRL.png",
"https://assets.cardlist.dev/images/communitycards/ST2-04_IRL.png",
"https://assets.cardlist.dev/images/communitycards/ST2-05_IRL.png",
"https://assets.cardlist.dev/images/communitycards/ST2-06_922e03en-US.png",
"https://assets.cardlist.dev/images/communitycards/ST2-06_723c36en-US.png",
"https://assets.cardlist.dev/images/communitycards/ST2-07_IRL.png",
"https://assets.cardlist.dev/images/communitycards/ST2-08_P1_IRL.png",
"https://assets.cardlist.dev/images/communitycards/ST2-08_P2_IRL.png",
"https://assets.cardlist.dev/images/communitycards/ST2-08_IRL.png",
"https://assets.cardlist.dev/images/communitycards/ST2-09_098762en-US.png",
"https://assets.cardlist.dev/images/communitycards/ST2-09_IRL.png",
"https://assets.cardlist.dev/images/communitycards/ST2-10_IRL.png",
"https://assets.cardlist.dev/images/communitycards/ST2-11_IRL.png",
"https://assets.cardlist.dev/images/communitycards/ST2-12_IRL.png",
"https://assets.cardlist.dev/images/communitycards/ST2-13_IRL.png",
"https://assets.cardlist.dev/images/communitycards/ST2-14_IRL.png",
"https://assets.cardlist.dev/images/communitycards/ST2-15_IRL.png",
"https://assets.cardlist.dev/images/communitycards/ST2-16_IRL.png",
"https://assets.cardlist.dev/images/communitycards/ST3-01_IRL.png",
"https://assets.cardlist.dev/images/communitycards/ST3-02_IRL.png",
"https://assets.cardlist.dev/images/communitycards/ST3-03_IRL.png",
"https://assets.cardlist.dev/images/communitycards/ST3-04_IRL.png",
"https://assets.cardlist.dev/images/communitycards/ST3-05_IRL.png",
"https://assets.cardlist.dev/images/communitycards/ST3-05_edc45een-US.png",
"https://assets.cardlist.dev/images/communitycards/ST3-06_IRL.png",
"https://assets.cardlist.dev/images/communitycards/ST3-07_IRL.png",
"https://assets.cardlist.dev/images/communitycards/ST3-08_IRL.png",
"https://assets.cardlist.dev/images/communitycards/ST3-08_P1_IRL.png",
"https://assets.cardlist.dev/images/communitycards/ST3-09_IRL.png",
"https://assets.cardlist.dev/images/communitycards/ST3-09_6b7765en-US.png",
"https://assets.cardlist.dev/images/communitycards/ST3-10_IRL.png",
"https://assets.cardlist.dev/images/communitycards/ST3-11_IRL.png",
"https://assets.cardlist.dev/images/communitycards/ST3-12_IRL.png",
"https://assets.cardlist.dev/images/communitycards/ST3-13_IRL.png",
"https://assets.cardlist.dev/images/communitycards/ST3-14_IRL.png",
"https://assets.cardlist.dev/images/communitycards/ST3-15_IRL.png",
"https://assets.cardlist.dev/images/communitycards/ST3-16_IRL.png",
]

var sitesList = [
		// unicorn horn for cats
		"http://rover.ebay.com/rover/1/711-53200-19255-0/1?ff3=4&pub=5575330747&toolid=10001&campid=5338181172&customid=&mpre=https%3A%2F%2Fwww.ebay.com%2Fitm%2FInflatable-Unicorn-Horn-for-Cat-Halloween-Costume-or-for-Fun-SHIPS-IN-1-DAY%2F223120507739%3Fhash%3Ditem33f304c35b%3Ag%3AI8oAAOSwP65bhLTb",

		// taxidermy pig, so gross
		"http://rover.ebay.com/rover/1/711-53200-19255-0/1?ff3=4&pub=5575330747&toolid=10001&campid=5338181172&customid=&mpre=https%3A%2F%2Fwww.ebay.com%2Fitm%2FBeautiful-Wild-Boar-Shoulder-Mount-Taxidermy-Game-Pig-Hog-Tusks-3%2F223924382957%3Fhash%3Ditem3422eeeced%3Ag%3Aa1QAAOSwWZVeUVNq",

		// Dehydrated water
		"http://rover.ebay.com/rover/1/711-53200-19255-0/1?ff3=4&pub=5575330747&toolid=10001&campid=5338181172&customid=&mpre=https%3A%2F%2Fwww.ebay.com%2Fitm%2FWitty-Yetis-Dehydrated-Water-16oz-Can-NEW-Formula-Essential-Camping%2F333200896831",

		// pescription pill mug
		// "http://rover.ebay.com/rover/1/711-53200-19255-0/1?ff3=4&pub=5575330747&toolid=10001&campid=5338181172&customid=&mpre=https%3A%2F%2Fwww.ebay.com%2Fitm%2FCoffee-Mugs-Caffeine-Pharmacy-Prescription-Pill-Bottle-Ceramic-12-Ounces-Cups%2F113942030727%3Fhash%3Ditem1a87796987%253Ag%253AlrwAAOSwhcZduSD0%26LH_BIN%3D1",

		// Farting cats
		"http://rover.ebay.com/rover/1/711-53200-19255-0/1?ff3=4&pub=5575330747&toolid=10001&campid=5338181172&customid=&mpre=https%3A%2F%2Fwww.ebay.com%2Fitm%2FFarting-Cats-Coloring-English-Paperback-Book-Free-Shipping%2F383577835007",

		// Balls book
		"http://rover.ebay.com/rover/1/711-53200-19255-0/1?ff3=4&pub=5575330747&toolid=10001&campid=5338181172&customid=&mpre=https%3A%2F%2Fwww.ebay.com%2Fp%2F150491811",

		// Bob ross
		"http://rover.ebay.com/rover/1/711-53200-19255-0/1?ff3=4&pub=5575330747&toolid=10001&campid=5338181172&customid=&mpre=https%3A%2F%2Fwww.ebay.com%2Fitm%2FChia-Pet-Bob-Ross-The-Joy-of-Painting-Decorative-Pottery-Planter-new%2F124194412105",

		// Cat lick thing
		"http://rover.ebay.com/rover/1/711-53200-19255-0/1?ff3=4&pub=5575330747&toolid=10001&campid=5338181172&customid=&mpre=https%3A%2F%2Fwww.ebay.com%2Fi%2F193213712423",

		// unicorn meat
		"http://rover.ebay.com/rover/1/711-53200-19255-0/1?ff3=4&pub=5575330747&toolid=10001&campid=5338181172&customid=&mpre=https%3A%2F%2Fwww.ebay.com%2Fitm%2FThinkGeek-Gag-Gift-5-5oz-Canned-Unicorn-Meat-Excellent-Source-of-Sparkles%2F184247872301%3Fepid%3D7031293057%26hash%3Ditem2ae6076b2d%3Ag%3AomgAAOSwRGJeV-WW",

		"http://rover.ebay.com/rover/1/711-53200-19255-0/1?ff3=4&pub=5575330747&toolid=10001&campid=5338181172&customid=&mpre=https%3A%2F%2Fwww.ebay.com%2Fitm%2FEat-a-Bag-of-Dicks-100-Anonymous-Hens-Night-Gummy-Candy-Party-Gift-Prank-Mail%2F401663164583%3F_trkparms%3Daid%253D777001%2526algo%253DDISCO.FEED%2526ao%253D1%2526asc%253D225074%2526meid%253D27cf8e981bb14b82b123f75634bf0929%2526pid%253D100651%2526rk%253D1%2526rkt%253D1%2526mehot%253Dnone%2526itm%253D401663164583%2526pmt%253D1%2526noa%253D1%2526pg%253D2380057%2526algv%253DPersonalizedTopicsRefactor%26_trksid%3Dp2380057.c100651.m4497%26_trkparms%3Dpageci%253A12d6aef4-7c62-11ea-aa7c-74dbd180056a%257Cparentrq%253A6c2263681710aa1a25e5e5deffeac6f4%257Ciid%253A1",

		// Warewolf hands
		"http://rover.ebay.com/rover/1/711-53200-19255-0/1?ff3=4&pub=5575330747&toolid=10001&campid=5338181172&customid=&mpre=https%3A%2F%2Fwww.ebay.com%2Fitm%2FRealistic-Wolf-Werewolf-Brown-Gloves-Costume-Accessory-Zagone-Studios%2F184240250980",

		// Skunks
		"http://rover.ebay.com/rover/1/711-53200-19255-0/1?ff3=4&pub=5575330747&toolid=10001&campid=5338181172&customid=&mpre=https%3A%2F%2Fwww.ebay.com%2Fitm%2FTanned-Short-Striped-Eastern-Canadian-Grade-1-Skunks-Minnesota-Brand%2F153647974473",

		// singing pickle
		"http://rover.ebay.com/rover/1/711-53200-19255-0/1?ff3=4&pub=5575330747&toolid=10001&campid=5338181172&customid=&mpre=https%3A%2F%2Fwww.ebay.com%2Fitm%2FYodelling-Pickle-Gag-Gift%2F264500139736%3Fepid%3D8031091069%26hash%3Ditem3d956fd6d8%253Ag%253A8WwAAOSwBxddpnbd%26LH_BIN%3D1",

		// bacon bandages
		"http://rover.ebay.com/rover/1/711-53200-19255-0/1?ff3=4&pub=5575330747&toolid=10001&campid=5338181172&customid=&mpre=https%3A%2F%2Fwww.ebay.com%2Fitm%2FSizzlin-Bacon-Adhesive-Bandages-Set-in-Collectible-Band-Aid-Tin%2F324037820595%3Fhash%3Ditem4b7228c0b3%3Ag%3AQS4AAOSwkvheF7%7EH",

		// Fish "assholes"
		"http://rover.ebay.com/rover/1/711-53200-19255-0/1?ff3=4&pub=5575330747&toolid=10001&campid=5338181172&customid=&mpre=https%3A%2F%2Fwww.ebay.com%2Fc%2F25029949756",

		// Dog pooping calendar
		"http://rover.ebay.com/rover/1/711-53200-19255-0/1?ff3=4&pub=5575330747&toolid=10001&campid=5338181172&customid=&mpre=https%3A%2F%2Fwww.ebay.com%2Fitm%2FNEW-2020-Pooping-Pooches-Dog-Calendar-Gag-Gifts-for-Good-Causes%2F283817493603%3Fhash%3Ditem4214d74463%3Ag%3AMT4AAOSwnSBecAQu",

		// Banana Slicer
		"http://rover.ebay.com/rover/1/711-53200-19255-0/1?ff3=4&pub=5575330747&toolid=10001&campid=5338181172&customid=&mpre=https%3A%2F%2Fwww.ebay.com%2Fitm%2FBanana-Slicer-Fruit-Knife-Kitchen-Gadget-Bar-Tools-Veggie-Cutter-Stainless-Steel%2F382606354069%3Fhash%3Ditem59151da695%3Ag%3AjQMAAOSw1Sdb00JR",

		"http://rover.ebay.com/rover/1/711-53200-19255-0/1?ff3=4&pub=5575330747&toolid=10001&campid=5338181172&customid=&mpre=https%3A%2F%2Fwww.ebay.com%2Fitm%2FRead-Roll-Toilet-paper-roll-magazine-ipad-tablet-pc-holder%2F264503266966%3Fhash%3Ditem3d959f8e96%3Ag%3AZF8AAOxykmZTMblL",
		// Ipad holder what?

		"http://rover.ebay.com/rover/1/711-53200-19255-0/1?ff3=4&pub=5575330747&toolid=10001&campid=5338181172&customid=&mpre=https%3A%2F%2Fwww.ebay.com%2Fitm%2FPlay-Visions-450-Nose-Aerobics-Basketball-Glasses-Game%2F292324538890%3Fepid%3D1510381887%26hash%3Ditem440fe67a0a%3Ag%3AV7EAAOSw5VtaBM4b",
		// Nose aerobics?

		"http://rover.ebay.com/rover/1/711-53200-19255-0/1?ff3=4&pub=5575330747&toolid=10001&campid=5338181172&customid=&mpre=https%3A%2F%2Fwww.ebay.com%2Fitm%2FPet-Christmas-Santa-Claus-Costume-Dog-Cat-Suit-with-Cap-Warm-Coat-Animal-Clothes%2F312882212772%3Fhash%3Ditem48d93bafa4%253Am%253Am_6CjqKTXJN7wEpcNyCo86w%26LH_BIN%3D1",
		// Weird AF dog costume

		"http://rover.ebay.com/rover/1/711-53200-19255-0/1?ff3=4&pub=5575330747&toolid=10001&campid=5338181172&customid=&mpre=https%3A%2F%2Fwww.ebay.com%2Fp%2F1501092395%3Fiid%3D283823164974",
		// Cat DVD

		"http://rover.ebay.com/rover/1/711-53200-19255-0/1?ff3=4&pub=5575330747&toolid=10001&campid=5338181172&customid=&mpre=https%3A%2F%2Fwww.ebay.com%2Fitm%2FA-Million-Random-Digits-with-100-000-Normal-Deviates-by-RAND-Corporation-Englis%2F392365328307%3Fepid%3D1942719%26hash%3Ditem5b5acbc7b3%253Ag%253AZ%257E4AAOSwlLBdQ5gM%26LH_BIN%3D1",
		// Book of random numbers

		"https://rover.ebay.com/rover/1/711-53200-19255-0/1?icep_id=114&ipn=icep&toolid=20004&campid=5338181172&mpre=https%3A%2F%2Fwww.ebay.com%2Fitm%2FCrafting-with-Cat-Hair-Cute-Handicrafts-to-Make-with-Your-Cat-By-Tsutaya-K%2F322539549387",
		// Crafting with cat hair

		"https://rover.ebay.com/rover/1/711-53200-19255-0/1?icep_id=114&ipn=icep&toolid=20004&campid=5338181172&mpre=https%3A%2F%2Fwww.ebay.com%2Fitm%2FUS-Funny-Men-Adjustable-Flair-Hair-Visor-Casquette-Hat-Golf-Fashion-Wig-Cap%2F332525350949",
		// Hair hat

		"https://rover.ebay.com/rover/1/711-53200-19255-0/1?icep_id=114&ipn=icep&toolid=20004&campid=5338181172&mpre=https%3A%2F%2Fwww.ebay.com%2Fitm%2FGift-Of-Nothing-Ja0027-9332721000108%2F382560623202",
		// Gift of nothing

		"http://rover.ebay.com/rover/1/711-53200-19255-0/1?ff3=4&pub=5575330747&toolid=10001&campid=5338181172&customid=&mpre=https%3A%2F%2Fwww.ebay.com%2Fitm%2FButt-Head-Game-Fun-Novelty-Family-Fun-Poo-Head-Party-Hat-Velcro-Ball-Game-Toy%2F252189791994%3Fepid%3D2254827331%26hash%3Ditem3ab7aed6fa%253Am%253Amqa66ESBFVMGO1JR-IGw5Jw%26LH_BIN%3D1",
		// Velcro head game

		"https://rover.ebay.com/rover/1/711-53200-19255-0/1?ff3=4&toolid=11800&pub=5575330747&campid=5338181172&mpre=http%3A%2F%2Fwww.ebay.com%2Fitm%2FBed-Prism-Spectacles-Horizontal-Bed-Reading-Lying-Down-Watching-TV-Lazy-Glasses-%2F362084875209%3Fvar%3D%26hash%3Ditem544df0bbc9%3Am%3AmKXSmXVf1sPxeTigKm6EdEA",
		// Weird lying down glasses

		"http://rover.ebay.com/rover/1/711-53200-19255-0/1?ff3=4&pub=5575330747&toolid=10001&campid=5338181172&customid=&mpre=https%3A%2F%2Fwww.ebay.com%2Fitm%2FGoats-in-Trees-2020-Square-Calendar%2F312716829582%3Fepid%3D4033555537%26hash%3Ditem48cf60238e%253Ag%253A7bkAAOSwM0RdPrqD%26LH_BIN%3D1",
		// Goats in tree's (multilingual)

		"https://rover.ebay.com/rover/1/711-53200-19255-0/1?ff3=4&toolid=11800&pub=5575330747&campid=5338181172&mpre=http%3A%2F%2Fwww.ebay.com%2Fitm%2FFashion-Custom-Home-Decor-Pilllowcase-Nicolas-Cage-Pillow-Case-Cover-20x30-Inch-%2F201695597716%3Fepid%3D2114300012%26hash%3Ditem2ef5fe9494%3Ag%3A99kAAOSwo4pYCIQ1",
		// Nick Cage pillowcase

		"https://rover.ebay.com/rover/1/711-53200-19255-0/1?icep_id=114&ipn=icep&toolid=20004&campid=5338181172&mpre=https%3A%2F%2Fwww.ebay.com%2Fp%2FDancing-with-Cats-From-the-Creators-of-the-International-Best-Seller-Why-Cats-Paint-by-Burton-Silver%2F169983594",
		// Dancing with cats

		"http://rover.ebay.com/rover/1/711-53200-19255-0/1?ff3=4&pub=5575330747&toolid=10001&campid=5338181172&customid=&mpre=https%3A%2F%2Fwww.ebay.com%2Fitm%2FLEARNING-TO-PLAY-WITH-A-LIONS-TESTICLES-UNEXPECTED-GIFTS-By-Melissa-Haynes-VG%2F184119009171%3Fhash%3Ditem2ade591f93%3Ag%3AQJAAAOSwzL9eFVnx",
		// Lions nads

		"http://rover.ebay.com/rover/1/711-53200-19255-0/1?ff3=4&pub=5575330747&toolid=10001&campid=5338181172&customid=&mpre=https%3A%2F%2Fwww.ebay.com%2Fitm%2FKama-Pootra-by-Daniel-Cole-Young%2F142092361771%3Fepid%3D80058233%26hash%3Ditem21155d602b%3Ag%3AxFkAAOSw1NFaFFnz",
		// Different ways to poop!

		"https://rover.ebay.com/rover/1/711-53200-19255-0/1?icep_id=114&ipn=icep&toolid=20004&campid=5338181172&mpre=https%3A%2F%2Fwww.ebay.com%2Fitm%2F100pcs-Finger-Light-Up-Ring-Laser-LED-Rave-Party-Favors-Glow-Beams%2F361920391225",
		// Finger lights

		"http://rover.ebay.com/rover/1/711-53200-19255-0/1?ff3=4&pub=5575330747&toolid=10001&campid=5338181172&customid=&mpre=https%3A%2F%2Fwww.ebay.com%2Fitm%2FFormal-Handerpants-Fun-Novelty-Funny-Gag-Gift-Dirty-Santa-White-Elephant%2F283268621439%3Fepid%3D26026117209%26hash%3Ditem41f420247f%253Ag%253AUx0AAOSwWIJb8yyq%26LH_BIN%3D1",
		// Hand underpants

		"http://rover.ebay.com/rover/1/711-53200-19255-0/1?ff3=4&pub=5575330747&toolid=10001&campid=5338181172&customid=&mpre=https%3A%2F%2Fwww.ebay.com%2Fitm%2FKnitting-with-Dog-Hair-Better-a-Sweater-from-a-by-Anne-Montgomery-Paperback%2F303334837613%3Fepid%3D1201598432%26hash%3Ditem46a02a4d6d%3Ag%3AKc8AAOSwsCddsob%7E",
		// Knitting with dog hair

		"http://rover.ebay.com/rover/1/711-53200-19255-0/1?ff3=4&pub=5575330747&toolid=10001&campid=5338181172&customid=&mpre=https%3A%2F%2Fwww.ebay.com%2Fitm%2FShittens-Mitten-Shaped-Moist-Wipes%2F163989082034%3Fhash%3Ditem262e82cfb2%3Ag%3AsocAAOSwHIBd9P9Y",
		// Shittens

		"https://rover.ebay.com/rover/1/711-53200-19255-0/1?icep_id=114&ipn=icep&toolid=20004&campid=5338181172&mpre=https%3A%2F%2Fwww.ebay.com%2Fitm%2FScary-Vintage-Creepy-Clown-PHOTO-Freak-Strange-Weird-Halloween-Costume-%2F163289051088",
		// scary clown thing

		"http://rover.ebay.com/rover/1/711-53200-19255-0/1?ff3=4&pub=5575330747&toolid=10001&campid=5338181172&customid=&mpre=https%3A%2F%2Fwww.ebay.com%2Fitm%2FHow-to-Swear-Around-the-World-Paperback-By-Sacher-Jay-VERY-GOOD%2F264600965810%3Fepid%3D114256098%26hash%3Ditem3d9b7252b2%3Ag%3AXzYAAOSwqw5ebV4t",
		// how to swear

		"https://rover.ebay.com/rover/1/711-53200-19255-0/1?icep_id=114&ipn=icep&toolid=20004&campid=5338181172&mpre=https%3A%2F%2Fwww.ebay.com%2Fitm%2FUnique-Bald-Eagle-On-Branch-Collectors-Item-Flaming-Hot-Cheeto-L-k-%2F191936493527",
		// eagle cheeto

		"http://rover.ebay.com/rover/1/711-53200-19255-0/1?ff3=4&pub=5575330747&toolid=10001&campid=5338181172&customid=&mpre=https%3A%2F%2Fwww.ebay.com%2Fitm%2FGrasshopper-Mask-with-Elastic-Prop-Costume-Halloween-Decoration%2F333280901083%3Fhash%3Ditem4d9916f7db%3Ag%3ALX0AAOSwxs9dPzBZ",

		"https://rover.ebay.com/rover/1/711-53200-19255-0/1?icep_id=114&ipn=icep&toolid=20004&campid=5338181172&mpre=https%3A%2F%2Fwww.ebay.com%2Fp%2FSubtle-Butt-Disposable-Gas-Neutralizers-5-Saving-Graces%2F1400393964",
		// fart stopper

		"http://rover.ebay.com/rover/1/711-53200-19255-0/1?ff3=4&pub=5575330747&toolid=10001&campid=5338181172&customid=&mpre=https%3A%2F%2Fwww.ebay.com%2Fitm%2FPrank-Pack-Nap-Sack-Wrap-Your-Real-Gift-in-a-Prank-Funny-Us%2F401923919581%3Fepid%3D18028313539%26hash%3Ditem5d94884edd%253Ag%253Ag7wAAOSwcdtdp0cu%26LH_BIN%3D1",

		"http://rover.ebay.com/rover/1/711-53200-19255-0/1?ff3=4&pub=5575330747&toolid=10001&campid=5338181172&customid=&mpre=https%3A%2F%2Fwww.ebay.com%2Fitm%2FCREEPY-ANGEL-BABY-ODDITY-WEIRD-BIZARE-FOLK-ART-HALLOWEEN-SCARY%2F233532167559%3Fhash%3Ditem365f9a1587%3Ag%3AGRUAAOSwNHZecpXp",

		"http://rover.ebay.com/rover/1/711-53200-19255-0/1?ff3=4&pub=5575330747&toolid=10001&campid=5338181172&customid=&mpre=https%3A%2F%2Fwww.ebay.com%2Fitm%2FVintage-SWINGIN-SANTA-WITH-FUN-RAISING-dick-ACTION-Novelty-ADULT-Gag-Gift%2F324075876023%3Fhash%3Ditem4b746d6eb7%3Ag%3AkEcAAOSwGyZeSqVH",

		"http://rover.ebay.com/rover/1/711-53200-19255-0/1?ff3=4&pub=5575330747&toolid=10001&campid=5338181172&customid=&mpre=https%3A%2F%2Fwww.ebay.com%2Fitm%2FThe-Never-Ending-Happy-Birthday-Greeting-Card-Ex-Enemy-Prank-Non-Stop-Music%2F401703644623%3F_trkparms%3Daid%253D1110002%2526algo%253DSPLICE.SOI%2526ao%253D1%2526asc%253D225074%2526meid%253D2c7dca5025664c169f268d8b46fec655%2526pid%253D100008%2526rk%253D4%2526rkt%253D4%2526sd%253D401663164583%2526itm%253D401703644623%2526pmt%253D1%2526noa%253D0%2526pg%253D2047675%2526algv%253DPromotedSellersOtherItemsV2%26_trksid%3Dp2047675.c100008.m2219",

		// Fart spray
		"http://rover.ebay.com/rover/1/711-53200-19255-0/1?ff3=4&pub=5575330747&toolid=10001&campid=5338181172&customid=&mpre=https%3A%2F%2Fwww.ebay.com%2Fitm%2FLiquid-Fart-Spray-Can-Stink-Bomb-Ass-Smelly-Stinky-Gas-Crap-gag-prank-joke%2F352975515036",

		// Weird eyes
		"http://rover.ebay.com/rover/1/705-53470-19255-0/1?ff3=4&pub=5575330747&toolid=10001&campid=5338181172&customid=&mpre=https%3A%2F%2Fwww.ebay.com.au%2Fitm%2FEYE-SEE-YOU-Bloodshot-Albino-Eyeball-Bouquet-Halloween-Prop-Weird-Horror-OOAK%2F264610229725",
	];

const getCard = function(id){
	url = 'https://ccggamez.com/index.php?opcja=listakart&idgry=' + id;

	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", url, false ); // false for synchronous request
	
	xmlHttp.send( null );
	var sets = [...xmlHttp.responseText.matchAll (id + "&idedycji=(\\d+)")];
	
	var set = sets[Math.floor(Math.random()*sets.length)][1];
	
	var url2 = "https://ccggamez.com/index.php?opcja=listakart&idgry=" + id + "&idedycji=" + set + "#karty";
	xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", url2, false ); // false for synchronous request
	
	xmlHttp.send( null );
	
	var cards = [...xmlHttp.responseText.matchAll("http://karcianki.pl/pics/games/[^\.]*")];
	var card = cards[Math.floor(Math.random()*cards.length)];
	if (card === undefined) {
		console.log(cards)
		return("Err: something. went? wrong, try* again!");
	}
	else {
		return(card[0] + ".jpg");
	}
}

client.once('ready', () => {
	console.log('Ready!');
});

client.login(settings.key);

client.on('message', message => {
	var command = message.content;
	if (message.content === "!help"){
		message.channel.send("This feature is in beta.");
	}
	else if (message.content === "!duel"){
		switch (Math.floor(Math.random()*3)){
			case 0:
				command = "!y";
				break;
			case 1:
				command = "!p";
				break;
			case 2:
				command = "!m";
				break;
			default:
				command = "!y";
		}
	}
	if (command === "!y"){
		var rand = Math.floor(Math.random() * 1000000);
		
		url = 'https://db.ygoprodeck.com/randomSearch.php?_=' + rand;

		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open( "GET", url, false ); // false for synchronous request
		xmlHttp.send( null );
		var obj = JSON.parse(xmlHttp.responseText);
		message.channel.send("https://ygoprodeck.com/pics/"+obj.id+".jpg");

	}
	/*	
	else if (message.content === "!am"){
		url = 'https://imfeelingprimey.com/';

		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open( "GET", url, false ); // false for synchronous request
		xmlHttp.send( null );
		//var obj = JSON.parse(xmlHttp.responseText);
		console.log(xmlHttp.responseText);
		// message.channel.send("https://ygoprodeck.com/pics/"+obj.id+".jpg");
	}
	else if (message.content === "!ebay"){
		var site = sitesList[Math.floor(Math.random() * Math.floor(sitesList.length))];
		message.channel.send(site);
	}
	*/
	else if (command === "!p"){
		url = 'https://pkmncards.com/?s=&display=images&sort=random&order=asc';

		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open( "GET", url, false ); // false for synchronous request
		
		xmlHttp.send( null );
		//https://pkmncards.com/wp-content/uploads
		var firstPoke = xmlHttp.responseText.match(/https:\/\/pkmncards.com\/wp-content\/uploads[^"]*\.jpg/)[0];
		//var obj = JSON.parse(xmlHttp.responseText);
		message.channel.send(firstPoke);
	}
	else if (command === "!m"){
		url = 'https://gatherer.wizards.com/Pages/Card/Details.aspx?action=random';

		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open( "GET", url, false ); // false for synchronous request
		
		xmlHttp.send( null );
		var card = xmlHttp.responseText.match(/multiverseid%3d(.*)\"/)[1];;
		message.channel.send("https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=" + card + "&type=card");
	}
	else if (command === "!d"){
		message.channel.send(digimonCards[Math.floor(Math.random() * digimonCards.length)])
	}
	else if (command === "!n"){
		var id = "188";
		message.channel.send(getCard(id));
	}
	else if (command === "!hp"){
		var id = "80";
		message.channel.send(getCard(id));
	}
	else if (command === "!bb"){
		var id = "71";
		message.channel.send(getCard(id));
	}
	else if (command === "!am"){
		var id = "90";
		message.channel.send(getCard(id));
	}
	else if (command === "!s"){
		var id = "78";
		message.channel.send(getCard(id));
	}
});