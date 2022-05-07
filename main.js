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

let freqCounter = 0;

const doc = new pdf();
doc.pipe(fs.createWriteStream('output.pdf'));

// url, starting page
printData(url, 1);

function printData(url, count){
  // till number of pages
  if(count == 472){
    console.log(freqCounter);
    doc.end();
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
        doc
          .fillColor('red')
          .fontSize(18)
          .text(freqCounter + ". " + allWordBoxes[i].querySelector("h2").textContent);

        // short definition
        // console.log(allWordBoxes[i].querySelector("p").textContent);
        doc
          .fillColor('blue')
          .fontSize(14)
          .text(allWordBoxes[i].querySelector("p").textContent);

        // definition, synonym, sentence
        // console.log(allWordBoxes[i].querySelector("div:nth-child(3)").textContent);
        doc
          .fillColor('black')
          .fontSize(12)
          .text(allWordBoxes[i].querySelector("div:nth-child(3)").textContent);

        // mnemonic
        // console.log(i + allWordBoxes[i].querySelector("div:nth-child(5) div div div div div div div div div div p:nth-child(1)").textContent);
        if(allWordBoxes[i].querySelector("div:nth-child(5) div div div div div div div div div div p:nth-child(1)") != null){
          doc
          .fillColor('green')
          .fontSize(12)
          .text(allWordBoxes[i].querySelector("div:nth-child(5) div div div div div div div div div div p:nth-child(1)").textContent);
        }

        if(allWordBoxes[i].querySelector("div:nth-child(5) div div div div div div div div div div p:nth-child(2)") != null){
          // console.log(i + allWordBoxes[i].querySelector("div:nth-child(5) div div div div div div div div div div p:nth-child(2)").textContent);
          doc
          .fillColor('green')
          .fontSize(12)
          .text(allWordBoxes[i].querySelector("div:nth-child(5) div div div div div div div div div div p:nth-child(2)").textContent);
        }
        if(allWordBoxes[i].querySelector("div:nth-child(5) div div div div div div div div div div p:nth-child(3)") != null){
          // console.log(i + allWordBoxes[i].querySelector("div:nth-child(5) div div div div div div div div div div p:nth-child(3)").textContent);
          doc
          .fillColor('green')
          .fontSize(12)
          .text(allWordBoxes[i].querySelector("div:nth-child(5) div div div div div div div div div div p:nth-child(3)").textContent);
        }
        if(allWordBoxes[i].querySelector("div:nth-child(5) div div div div div div div div div div p:nth-child(4)") != null){
          // console.log(i + allWordBoxes[i].querySelector("div:nth-child(5) div div div div div div div div div div p:nth-child(4)").textContent);
          doc
          .fillColor('green')
          .fontSize(12)
          .text(allWordBoxes[i].querySelector("div:nth-child(5) div div div div div div div div div div p:nth-child(4)").textContent);
        }
        doc
          .fillColor('black')
          .fontSize(12)
          .text(`
          
          `);
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