const axios = require("axios");
const fs = require("fs");
const pdf = require("pdfkit");
const path = require("path");
const excel = require("excel4node");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;



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

let outputList = [];

const doc = new pdf();
doc.pipe(fs.createWriteStream('testing.pdf'));

// Bookmark
// Get a reference to the Outline root
const { outline } = doc;

// Add a top-level bookmark
const top = outline.addItem('All Words');

// Add a sub-section


googleWords(0);

function googleWords(index){
    if(index >= 10){
        // printDataInPDF();
        doc.end();
        return;
    }
    // if(index >= highFreqWords.length){
    //     return;
    // }
    console.log(index+1);

    let url = "https://www.merriam-webster.com/dictionary/" + highFreqWords[index];

    axios.get(url)
        .then(function (response) {
            // handle success
            const dom = new JSDOM(response.data);
            const document = dom.window.document;

            let obj = {};

            if(document.querySelector(".hword") != null){
                // console.log(document.querySelector(".hword").textContent);
                // obj.word = index+1 + ". " + document.querySelector(".hword").textContent;
                top.addItem(index+1 + ". " + document.querySelector(".hword").textContent);
                doc
                  .fillColor('red')
                  .fontSize(20)
                  .text(index+1 + ". " + document.querySelector(".hword").textContent);
                  doc
                  .fontSize(8)
                  .text("\n");
            }

            // if(document.querySelectorAll("div.sb") != null){
            //     let allDiv = document.querySelectorAll("div.sb");

            //     for(let i=0; i<allDiv.length; i++){
            //         let allSpan = allDiv[i].querySelectorAll("span:first-child");
            //         for(let j=0; j<allSpan.length; j++){
            //             if(allSpan[j] == null){
            //                 continue;
            //             }
            //             if(allSpan[j].querySelector(".num") != null){
            //                 doc
            //                     .fillColor('blue')
            //                     .fontSize(16)
            //                     .text(allSpan[j].querySelector(".num").textContent.replace(/\s+/g,' '));
            //             }

            //                 doc
            //                     .fillColor('blue')
            //                     .fontSize(16)
            //                     .text(" ");


            //             if(allSpan[j].querySelector(".letter") != null){
            //                 doc
            //                     .fillColor('blue')
            //                     .fontSize(16)
            //                     .text(allSpan[j].querySelector(".letter").textContent.replace(/\s+/g,' ') + ".");
            //             }

            //             doc
            //                     .fillColor('blue')
            //                     .fontSize(16)
            //                     .text(" ");


            //             if(allSpan[j].querySelector(".dtText") != null){
            //                 doc
            //                     .fillColor('black')
            //                     .fontSize(14)
            //                     .text(allSpan[j].querySelector(".dtText").textContent.replace(/\s+/g,' ') + "\n\n");
            //             }
                        
            //             if(allSpan[j].querySelector(".ex-sent") != null){
            //                 doc
            //                     .fillColor('green')
            //                     .fontSize(12)
            //                     .text(allSpan[j].querySelector(".ex-sent").textContent.replace(/\s+/g,' ') + "\n\n\n");
            //             }
            //         }
            //     }
            // }

            if(document.querySelectorAll(".dt") != null){
                // let data = document.querySelectorAll(".dt .dtText");
                // let sentence = document.querySelectorAll(".dt .ex-sent");

                let data = document.querySelectorAll(".dt");
                for(let i=0; i<data.length; i++){
                    doc
                        .fillColor('black')
                        .fontSize(14)
                        .text(data[i].querySelector(".dtText").textContent.replace(/\s+/g,' ') + "\n");
                    doc
                        .fillColor('green')
                        .fontSize(14)
                        .text("\n");
                    
                    if(data[i].querySelector(".ex-sent") != null){
                        doc
                        .fillColor('green')
                        .fontSize(12)
                        .text(data[i].querySelector(".ex-sent").textContent.replace(/\s+/g,' ') + "\n\n");

                        doc
                        .fillColor('green')
                        .fontSize(18)
                        .text("\n");
                    }
                }

                // for(let i=0; i<data.length; i++){
                //     // console.log(data[i].textContent);
                //     // temp.push(data[i].textContent.replace(/\s+/g,' '));
                //     doc
                //         .fillColor('black')
                //         .fontSize(14)
                //         .text(data[i].textContent.replace(/\s+/g,' ') + "\n");

                //         doc
                //         .fillColor('green')
                //         .fontSize(14)
                //         .text("\n");
                    
                //     if(sentence[i] != null){
                //         doc
                //         .fillColor('green')
                //         .fontSize(12)
                //         .text(sentence[i].textContent.replace(/\s+/g,' ') + "\n\n");

                //         doc
                //         .fillColor('green')
                //         .fontSize(18)
                //         .text("\n");
                //     }
                // }
                doc
                    .fillColor('black')
                    .fontSize(18)
                    .text("\n\n");
            }

            googleWords(index+1);

        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
}


function printDataInPDF(){
    for(let i=0; i<outputList.length; i++){
        doc
          .fillColor('red')
          .fontSize(18)
          .text(outputList[i].word);

        doc
        .fillColor('black')
        .fontSize(12)
        .text(outputList[i].details);

        // console.log(outputList[i].word.replace(/\s+/g,''));
        // console.log(outputList[i].details.replace(/\s+/g,''));
    }
    doc.end();
}