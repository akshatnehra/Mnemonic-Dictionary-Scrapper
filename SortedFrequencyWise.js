const axios = require("axios");
const fs = require("fs");
const pdf = require("pdfkit");
const path = require("path");
const excel = require("excel4node");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

var url = "https://mnemonicdictionary.com/wordlist/GREwordlist";


// https://url-decode.com/tool/create-array-js  (excel column -> js array)
let highFreqWords = ['extrapolation',
'malingerer',
'cacophonous',
'insularity',
'impermeable',
'occlude',
'denigrate',
'aberrant',
'truculence',
'dichotomy',
'vituperative',
'plasticity',
'intransigence',
'ambivalence',
'coda',
'mendacious',
'castigation',
'soporific',
'convoluted',
'inchoate',
'permeable',
'discrete',
'tangential',
'verbose',
'desiccate',
'disabuse',
'indigence',
'salubrious',
'gullible',
'chicanery',
'implode',
'compliant',
'misanthrope',
'viscous',
'shard',
'veracious',
'inconsequential',
'grandiloquent',
'dissonance',
'malleable',
'bombastic',
'diatribe',
'boorish',
'paucity',
'recondite',
'zealot',
'exculpate',
'ebullient',
'iconoclast',
'abstemious',
'disingenuous',
'endemic',
'lethargic',
'rarefied',
'plethora',
'prohibitive',
'recalcitrant',
'prevaricate',
'equivocate',
'abscond',
'catalyst',
'problematic',
'neophyte',
'coagulate',
'erudite',
'euphemism',
'loquacious',
'tenuous',
'fawning',
'conundrum',
'penchant',
'innocuous',
'hyperbole',
'indeterminate',
'burgeon',
'onerous',
'intractable',
'felicitous',
'exacerbate',
'abeyance',
'lassitude',
'phlegmatic',
'inured',
'gregarious',
'frugality',
'pervasive',
'esoteric',
'fallacious',
'rescind',
'banal',
'fledgling',
'itinerary',
'probity',
'compendium',
'gouge',
'paragon',
'pristine',
'cogent',
'irascible',
'tirade',
'commensurate',
'quiescent',
'anomalous',
'anachronism',
'disjointed',
'pathological',
'guileless',
'quibble',
'recant',
'effrontery',
'deterrent',
'torpor',
'welter',
'contrite',
'eclectic',
'ephemeral',
'enervate',
'dirge',
'subpoena',
'contentious',
'fatuous',
'porous',
'mundane',
'mollify',
'penury',
'attenuate',
'meticulous',
'sporadic',
'platitude',
'perfidious',
'incongruity',
'impervious',
'substantiate',
'condone',
'precursor',
'garrulous',
'gainsay',
'flout',
'viable',
'diffidence',
'plummet',
'officious',
'preamble',
'perfunctory',
'inadvertently',
'assuage',
'foment',
'refractory',
'digression',
'obdurate',
'recluse',
'specious',
'ameliorate',
'complaisant',
'proliferate',
'obviate',
'vacillate',
'tortuous',
'adulterate',
'discerning',
'tractable',
'insipid',
'laconic',
'distend',
'equanimity',
'obsequious',
'immutable',
'facetious',
'amalgamate',
'discrepancy',
'maverick',
'desultory',
'conciliatory',
'oscillate',
'invective',
'savor',
'dissemble',
'burnish',
'disseminate',
'irresolute',
'forestall',
'imperturbable',
'levee',
'metamorphosis',
'belie',
'morose',
'empirical',
'dogmatic',
'disparate',
'apprise',
'artless',
'pedantic',
'proscribe',
'propitiate',
'elegy',
'connoisseur',
'magnanimity',
'dormant',
'relegate',
'pungent',
'buttress',
'presumptuous',
'caustic',
'discordant',
'reprobate',
'levity',
'inert',
'aver',
'impassive',
'exigency',
'pragmatic',
'antipathy',
'disparage',
'delineate',
'engender',
'goad',
'implacable',
'inundate',
'strut',
'strut',
'divest',
'transgression',
'alacrity',
'derivative',
'ostentatious',
'alleviate',
'converge',
'harangue',
'fervor',
'tacit',
'eulogy',
'perennial',
'elicit',
'dupe',
'propensity',
'reticent',
'craven',
'stigma',
'bolster',
'spectrum',
'stolid',
'capricious',
'ingenuous',
'satiate',
'analogous',
'embellish',
'stint',
'arduous',
'audacious',
'apathy',
'saturate',
'latent',
'precarious',
'emulate',
'whimsical',
'placate',
'assiduous',
'prodigal',
'ascetic',
'ambiguous',
'aesthetic',
'supersede',
'volatile',
'disinterested',
'diverge',
'repudiate',
'idolatry',
'refute',
'dissolution',
'mitigate',
'implicit',
'beneficent',
'decorum',
'efficacy',
'facilitate',
'laud',
'discredit',
'stipulate',
'lucid',
'appease',
'distill',
'default',
'daunt',
'aggregate',
'indolent',
'inherent',
'impair',
'secrete',
'insinuate',
'luminous',
'approbation',
'skeptic',
'deference',
'supposition',
'abate',
'admonish',
'deride',
'impede',
'enhance',
'anarchy',
'contention',
'diffuse',
'wary',
'futile',
'austere',
'incorporate',
'insensible',
'subside',
'piety',
'precipitate',
'partisan',
'qualified',
'propriety',
'sage',
'confound',
'venerate',
'sanction',
'negate',
'reverent',
'reproach',
'dismiss',
'appropriate',
'profound',
'resolution',
'document',
'flag',
'resolve',
];
let freqValue = ['72512.11',
'68717.92',
'49248.13',
'33674.25',
'29184.48',
'27297.33',
'27047.48',
'25639.42',
'23267.36',
'22259.59',
'21335.5',
'20344.05',
'20067.74',
'16371.24',
'16081.69',
'15552.72',
'15410.79',
'14592.74',
'14206.9',
'13889.73',
'13873.43',
'13602.05',
'12946.58',
'11476.06',
'10894.37',
'10658.63',
'10497.72',
'10323.54',
'10181.28',
'10155.05',
'9850.43',
'9688.96',
'9673.1',
'9665.2',
'9555.82',
'9479.2',
'9227.63',
'9213.25',
'9120.84',
'9078.81',
'9023.37',
'8578.15',
'8516.35',
'8312.75',
'8008.66',
'7928.1',
'7912.19',
'7870.05',
'7766.64',
'7558.1',
'7448.58',
'7425.19',
'7265.48',
'7142.58',
'6990.54',
'6716.52',
'6495.13',
'6459.64',
'6438.53',
'6435.03',
'6417.56',
'6172.96',
'5964.33',
'5955.31',
'5946.33',
'5937.37',
'5895.92',
'5708.05',
'5518.89',
'5511.17',
'5485.6',
'5337.03',
'5166.78',
'5108.74',
'5041.22',
'5030.49',
'4950.46',
'4948.39',
'4905.28',
'4862.91',
'4854.93',
'4823.24',
'4702.4',
'4693.06',
'4630.58',
'4617.92',
'4614.31',
'4607.12',
'4513.91',
'4510.47',
'4439.34',
'4429.37',
'4406.26',
'4396.43',
'4355.94',
'4289.57',
'4267.9',
'4099.24',
'4097.81',
'4082.25',
'4000.77',
'3996.71',
'3932.91',
'3922.47',
'3914.68',
'3848.43',
'3801.42',
'3779.55',
'3779.55',
'3735.38',
'3685.32',
'3656.83',
'3648.94',
'3636.59',
'3621',
'3585.87',
'3523.89',
'3476.25',
'3473.18',
'3468.09',
'3416.99',
'3413.04',
'3411.07',
'3405.18',
'3397.35',
'3390.54',
'3383.74',
'3373.13',
'3370.24',
'3367.37',
'3365.45',
'3358.76',
'3347.35',
'3330.38',
'3257.01',
'3222.4',
'3172.27',
'3136.1',
'3048.79',
'3046.43',
'3040.95',
'3001.59',
'2990.2',
'2985.67',
'2946.26',
'2941.13',
'2929.47',
'2923.68',
'2922.23',
'2891.51',
'2847.65',
'2838.09',
'2819.82',
'2819.82',
'2811.11',
'2798.47',
'2770.29',
'2745.85',
'2689.04',
'2621.11',
'2589.55',
'2558.19',
'2553.77',
'2543.33',
'2500.85',
'2498.74',
'2447.56',
'2445.03',
'2430.46',
'2408.68',
'2366.75',
'2359.67',
'2336.83',
'2326.26',
'2300.48',
'2295.57',
'2283.6',
'2239.93',
'2231.9',
'2199.53',
'2194.23',
'2194.23',
'2179.27',
'2173.27',
'2163.33',
'2157.02',
'2151.14',
'2146.07',
'2144.9',
'2120.3',
'2113.85',
'2101.09',
'2075.29',
'2029.37',
'2023.47',
'1963.69',
'1953.96',
'1952.35',
'1951.06',
'1948.81',
'1929.42',
'1923.46',
'1903.35',
'1870.55',
'1865.83',
'1864.07',
'1835.16',
'1832.6',
'1805.75',
'1756.17',
'1734.04',
'1698.93',
'1695.52',
'1657.53',
'1631.25',
'1610.82',
'1576.7',
'1555.56',
'1551.48',
'1551.48',
'1545.81',
'1534.58',
'1532',
'1514.94',
'1511.46',
'1511.07',
'1486.96',
'1483.79',
'1446.43',
'1418.35',
'1415.98',
'1411.25',
'1399.24',
'1382.41',
'1375.98',
'1374.54',
'1366.6',
'1360.48',
'1343.19',
'1331.7',
'1317.33',
'1316.6',
'1314.69',
'1280.84',
'1272.17',
'1259.18',
'1251.19',
'1245.79',
'1243.31',
'1190.78',
'1183.88',
'1177.87',
'1156.7',
'1143.18',
'1140.21',
'1133.44',
'1132.58',
'1115.08',
'1113.62',
'1082.56',
'1071.78',
'1050.49',
'1043.73',
'1012.75',
'996.73',
'995.22',
'989.48',
'988.25',
'977.72',
'975.63',
'956.79',
'946.85',
'944.36',
'943',
'913.55',
'881.79',
'869.36',
'868.79',
'867.39',
'862.03',
'851.13',
'836.52',
'831.53',
'825.74',
'799.82',
'782.24',
'757.48',
'741.6',
'733.16',
'721.03',
'715.29',
'713.48',
'698.55',
'690.25',
'655.45',
'652.7',
'650.56',
'644.79',
'638.99',
'634.34',
'632.74',
'613.88',
'603.41',
'586.69',
'583.49',
'564.76',
'557.44',
'551.97',
'523.79',
'506.9',
'460.32',
'447.08',
'440.15',
'393.86',
'345.39',
'313.53',
'301.53',
'264.89',
'192.65',
'188.52',
'172.24',
'160.02',
'155.59',
'126.64',
'125.93',
'120.36',
'52.06',
];

let numFreq = [];
for(let i=0; i<freqValue.length; i++){
    numFreq.push(parseInt(freqValue[i], 10));
}

freqValue = numFreq;

let outputList = [];

let freqCounter = 0;

const doc = new pdf();
doc.pipe(fs.createWriteStream('MyOutput.pdf'));

// url, starting page
printData(url, 1);

function printData(url, count){
  // till number of pages -> 472
  if(count == 472){
    console.log(freqCounter);
    outputList.sort( compare );
    console.log("before");
    printPDF();
    return;
  }
  axios
  .get(url)
  .then(function (response) {
    // handle success
    const dom = new JSDOM(response.data);
    const document = dom.window.document;

    let allWordBoxes = document.querySelectorAll(".media-body ~ div");

    // Printing required data
    for(let i=0; i<allWordBoxes.length; i++){
      if(allWordBoxes[i].querySelector("h2") != null){

        // word
        let myWord = allWordBoxes[i].querySelector("h2").textContent;
        if(highFreqWords.includes(myWord) == false){
          continue;
        }
        freqCounter++;
        // console.log(allWordBoxes[i].querySelector("h2").textContent);
        let obj = {};
        let word = "";
        let shortDefinition = "";
        let dss = "";
        let m1 = "";
        let m2 = "";
        let m3 = "";
        let m4 = "";
        let frequency = 0;

        let searchWord = allWordBoxes[i].querySelector("h2").textContent;
        obj.word = allWordBoxes[i].querySelector("h2").textContent;
        obj.word = obj.word.charAt(0).toUpperCase() + obj.word.slice(1); // Uppercase first letter
        obj.shortDefinition = allWordBoxes[i].querySelector("p").textContent;
        obj.dss = allWordBoxes[i].querySelector("div:nth-child(3)").textContent;

        if(allWordBoxes[i].querySelector("div:nth-child(5) div div div div div div div div div div p:nth-child(1)") != null){
            obj.m1 = allWordBoxes[i].querySelector("div:nth-child(5) div div div div div div div div div div p:nth-child(1)").textContent;
        }

        if(allWordBoxes[i].querySelector("div:nth-child(5) div div div div div div div div div div p:nth-child(2)") != null){
            obj.m2 = allWordBoxes[i].querySelector("div:nth-child(5) div div div div div div div div div div p:nth-child(2)").textContent;
        }

        if(allWordBoxes[i].querySelector("div:nth-child(5) div div div div div div div div div div p:nth-child(3)") != null){
            obj.m3 = allWordBoxes[i].querySelector("div:nth-child(5) div div div div div div div div div div p:nth-child(3)").textContent;
        }

        if(allWordBoxes[i].querySelector("div:nth-child(5) div div div div div div div div div div p:nth-child(4)") != null){
            obj.m4 = allWordBoxes[i].querySelector("div:nth-child(5) div div div div div div div div div div p:nth-child(4)").textContent;
        }

        let index = highFreqWords.indexOf(searchWord);
        obj.frequency = freqValue[index];

          outputList.push(obj);

          console.log(freqCounter);
      }
    }
    
    // Update URL
    url = document.querySelector("a[rel='next']").href;
    // console.log(url);

    printData(url, count+1);

  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });
}


function compare( a, b ) {
  if ( a.frequency < b.frequency ){
    return -1;
  }
  if ( a.frequency > b.frequency ){
    return 1;
  }
  return 0;
}


function printPDF(){

    for(let i=outputList.length-1; i>=0; i--){
        // word
        doc
          .fillColor('red')
          .fontSize(18)
          .text(outputList.length - i + ". " + outputList[i].word + "                     ",{
            continued: true
          });

          doc
          .fillColor('red')
          .fontSize(15)
          .text("Merriam        ",{
            link: 'https://www.merriam-webster.com/dictionary/' + outputList[i].word,
            continued: true
          });
          
          doc
          .fillColor('red')
          .fontSize(15)
          .text("Google        ",{
            link: 'https://www.google.com/search?q=' + outputList[i].word + '+meaning',
            continued: true
          });

          doc
          .fillColor('red')
          .fontSize(15)
          .text("M-Dict",{
            link: 'https://mnemonicdictionary.com/?word=' + outputList[i].word,
          });

          


        // short def
        doc
          .fillColor('blue')
          .fontSize(14)
          .text(outputList[i].shortDefinition);

        // dss
        doc
          .fillColor('black')
          .fontSize(12)
          .text(outputList[i].dss);

        // m1
        doc
          .fillColor('green')
          .fontSize(12)
          .text(outputList[i].m1);

        // m2
        doc
          .fillColor('green')
          .fontSize(12)
          .text(outputList[i].m2);

        // m3
        doc
          .fillColor('green')
          .fontSize(12)
          .text(outputList[i].m3);

        //m4
        doc
          .fillColor('green')
          .fontSize(12)
          .text(outputList[i].m4);

        doc
          .fillColor('black')
          .fontSize(12)
          .text(`
        
        `);
        console.log(outputList[i].word);
    }
    doc.end();
    console.log("After");
}

