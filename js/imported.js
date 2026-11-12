// Source-native imported recipes: fixed base servings, exact source units,
// unknown nutrition. These records NEVER join the compact catalog (RECIPES),
// so auto-planning, numeric protein/kcal bands and catalog grocery scaling
// cannot see them. They are browseable, manually addable to the plan as a
// fixed base batch, and shoppable at exact source quantities.
import { RECIPE_BY_ID, isVeg, displayKind } from './data.js';
import { IMPORTED_SAFETY } from './imported-safety.js';
import ratatouille from '../data/imported/ratatouille.mjs';

import draniki from '../data/imported/draniki.mjs';
import galayet from '../data/imported/galayet-bandora.mjs';
import kaesespaetzle from '../data/imported/kaesespaetzle.mjs';
import melanzane from '../data/imported/melanzane-alla-parmigiana.mjs';
import byrek from '../data/imported/byrek-me-spinaq.mjs';
import misir from '../data/imported/misir-wat.mjs';
import tortilla from '../data/imported/tortilla-espanola.mjs';
import chicken from '../data/imported/chakhokhbili.mjs';
import irish from '../data/imported/irish-stew.mjs';
import farikal from '../data/imported/farikal.mjs';
import fish from '../data/imported/qingzheng-yu.mjs';
import lentilSoup from '../data/imported/mercimek-corbasi.mjs';
import coldSoup from '../data/imported/tarator.mjs';
import fondue from '../data/imported/fondue-moitie-moitie.mjs';
import spinachPie from '../data/imported/spanakopita.mjs';
import strukli from '../data/imported/zagorski-strukli.mjs';
import jollof from '../data/imported/jollof-rice.mjs';
import souvla from '../data/imported/souvla.mjs';
import trout from '../data/imported/ohridska-pastrmka.mjs';
import paprikaChicken from '../data/imported/paprika-chicken.mjs';
import softTacos from '../data/imported/vegetarian-soft-tacos.mjs';
import adultMac from '../data/imported/adult-mac-and-cheese.mjs';
import agnolotti from '../data/imported/agnolotti-in-brodo.mjs';
import garbanzoSoup from '../data/imported/galician-garbanzo-soup.mjs';
import porkLima from '../data/imported/pork-and-lima-skillet.mjs';
import spaghettiBolognese from '../data/imported/spaghetti-bolognese.mjs';
import spareRibs from '../data/imported/barbecued-spare-ribs.mjs';
import poutine from '../data/imported/poutine.mjs';
import penneMeatSauce from '../data/imported/penne-meat-sauce.mjs';
import jambalayaI from '../data/imported/jambalaya-i.mjs';
import asparagusSoup from '../data/imported/asparagus-soup.mjs';
import beanSoupVegetarian from '../data/imported/bean-soup-vegetarian.mjs';
import beefGravySoup from '../data/imported/beef-gravy-soup.mjs';
import blackPepperedChickenSpaghetti from '../data/imported/black-peppered-chicken-spaghetti.mjs';
import creamyTomatoBeanSoup from '../data/imported/creamy-tomato-bean-soup.mjs';
import crockPotPotatoSoup from '../data/imported/crock-pot-potato-soup.mjs';
import hotAndSourSoup from '../data/imported/hot-and-sour-soup.mjs';
import mushroomSoup from '../data/imported/mushroom-soup.mjs';
import pastaSoupForKids from '../data/imported/pasta-soup-for-kids.mjs';
import pepperSoup from '../data/imported/pepper-soup.mjs';
import potatoSoup from '../data/imported/potato-soup.mjs';
import spicedPumpkinSoup from '../data/imported/spiced-pumpkin-soup.mjs';
import sausageAndTortelliniSoup from '../data/imported/sausage-and-tortellini-soup.mjs';
import tomKhaKai from '../data/imported/tom-kha-kai.mjs';
import vichyssoise from '../data/imported/vichyssoise.mjs';
import ertesuppePeaSoup from '../data/imported/ertesuppe-pea-soup.mjs';
import lenguaDeRes from '../data/imported/lengua-de-res.mjs';
import baconWrappedScallops from '../data/imported/bacon-wrapped-scallops.mjs';
import chickenFriedSteak from '../data/imported/chicken-fried-steak.mjs';
import chipsiMayai from '../data/imported/chipsi-mayai.mjs';
import chuuCheeFish from '../data/imported/chuu-chee-fish.mjs';
import cubanPicadillo from '../data/imported/cuban-picadillo.mjs';
import garlicPorkChopsBlackMushrooms from '../data/imported/garlic-pork-chops-black-mushrooms.mjs';
import honeyPepperedSalmon from '../data/imported/honey-peppered-salmon.mjs';
import lemonRosemaryPorkTenderloin from '../data/imported/lemon-rosemary-pork-tenderloin.mjs';
import maplePlankedSalmon from '../data/imported/maple-planked-salmon.mjs';
import meatloafIv from '../data/imported/meatloaf-iv.mjs';
import mediterraneanGreenChicken from '../data/imported/mediterranean-green-chicken.mjs';
import poppyseedChicken from '../data/imported/poppyseed-chicken.mjs';
import schweinsbraten from '../data/imported/schweinsbraten.mjs';
import shrimpScampiAngelHair from '../data/imported/shrimp-scampi-angel-hair.mjs';
import simpleItalianSausageSpaghetti from '../data/imported/simple-italian-sausage-spaghetti.mjs';
import spicyChickenCutlets from '../data/imported/spicy-chicken-cutlets.mjs';
import sweetItalianSausageSkillet from '../data/imported/sweet-italian-sausage-skillet.mjs';
import tunaGlop from '../data/imported/tuna-glop.mjs';
import wineRoastedPorkRoast from '../data/imported/wine-roasted-pork-roast.mjs';
import beanAndBaconBake from '../data/imported/bean-and-bacon-bake.mjs';
import brownRiceCasserole from '../data/imported/brown-rice-casserole.mjs';
import cazuelaGallega from '../data/imported/cazuela-gallega.mjs';
import chuckWagonBeans from '../data/imported/chuck-wagon-beans.mjs';
import cioppinoItalianSeafoodStew from '../data/imported/cioppino-italian-seafood-stew.mjs';
import cornySouffle from '../data/imported/corny-souffle.mjs';
import crockPotBeefStew from '../data/imported/crock-pot-beef-stew.mjs';
import cucumberSproutSandwich from '../data/imported/cucumber-sprout-sandwich.mjs';
import dutchOvenBeans from '../data/imported/dutch-oven-beans.mjs';
import fabesConAlmejas from '../data/imported/fabes-con-almejas.mjs';
import keralanVegetableStew from '../data/imported/keralan-vegetable-stew.mjs';
import macaroniPie from '../data/imported/macaroni-pie.mjs';
import malvaniChickenCurry from '../data/imported/malvani-chicken-curry.mjs';
import meatlessSloppyJoes from '../data/imported/meatless-sloppy-joes.mjs';
import miniThreeCheeseEnglishMuffinPizzas from '../data/imported/mini-three-cheese-english-muffin-pizzas.mjs';
import mozzarellaTunaMelts from '../data/imported/mozzarella-tuna-melts.mjs';
import parmesanCheeseSouffle from '../data/imported/parmesan-cheese-souffle.mjs';
import mostaccioli from '../data/imported/mostaccioli.mjs';
import potatoChickpeaCurry from '../data/imported/potato-chickpea-curry.mjs';
import potatoCurryAlooMasala from '../data/imported/potato-curry-aloo-masala.mjs';
import radishPie from '../data/imported/radish-pie.mjs';
import reubenSandwich from '../data/imported/reuben-sandwich.mjs';
import risottoAllaMilanese from '../data/imported/risotto-alla-milanese.mjs';
import sloppyJoes from '../data/imported/sloppy-joes.mjs';
import spaghettiBake from '../data/imported/spaghetti-bake.mjs';
import tripesALaModeDeCaen from '../data/imported/tripes-a-la-mode-de-caen.mjs';
import yetsomShiro from '../data/imported/yetsom-shiro.mjs';
import yogurtCurrySoupKadhi from '../data/imported/yogurt-curry-soup-kadhi.mjs';
import bakedPenne from '../data/imported/baked-penne.mjs';
import beanburger from '../data/imported/beanburger.mjs';
import chanterelleGoulash from '../data/imported/chanterelle-goulash.mjs';
import chickenBaconBroccoliAlfredoSpaghetti from '../data/imported/chicken-bacon-broccoli-alfredo-spaghetti.mjs';
import chickenTetrazzini from '../data/imported/chicken-tetrazzini.mjs';
import cornChowderI from '../data/imported/corn-chowder-i.mjs';
import gambasAlAjilloGarlicShrimp from '../data/imported/gambas-al-ajillo-garlic-shrimp.mjs';
import garlicParmesanPasta from '../data/imported/garlic-parmesan-pasta.mjs';
import hutspotDutchMashedVegetables from '../data/imported/hutspot-dutch-mashed-vegetables.mjs';
import jambons from '../data/imported/jambons.mjs';
import manxSmokedSalmon from '../data/imported/manx-smoked-salmon.mjs';
import menemenEggsWithOnionGreenPepperAndTomato from '../data/imported/menemen-eggs-with-onion-green-pepper-and-tomato.mjs';
import ossobucoAllaMilanese from '../data/imported/ossobuco-alla-milanese.mjs';
import paellaValenciana from '../data/imported/paella-valenciana.mjs';
import panDeJamon from '../data/imported/pan-de-jamon.mjs';
import riceWithTofuAndNuts from '../data/imported/rice-with-tofu-and-nuts.mjs';
import salmonSpaghetti from '../data/imported/salmon-spaghetti.mjs';
import southwestPasta from '../data/imported/southwest-pasta.mjs';
import spaghettiAllaPuttanesca from '../data/imported/spaghetti-alla-puttanesca.mjs';
import spinachMushroomPestoSpaghetti from '../data/imported/spinach-mushroom-pesto-spaghetti.mjs';
import stirFriedSeafoodWithNoodles from '../data/imported/stir-fried-seafood-with-noodles.mjs';
import succotash from '../data/imported/succotash.mjs';
import tomatoBasilSausagePasta from '../data/imported/tomato-basil-sausage-pasta.mjs';
import tomatoPastaWithBaconOnionsAndCheese from '../data/imported/tomato-pasta-with-bacon-onions-and-cheese.mjs';
import tuscanSoupMeatless from '../data/imported/tuscan-soup-meatless.mjs';
import zupaOgorkowaPolishCucumberSoup from '../data/imported/zupa-ogorkowa-polish-cucumber-soup.mjs';
import zuppaToscana from '../data/imported/zuppa-toscana.mjs';
import calzone from '../data/imported/calzone.mjs';
import fishermanSCasserole from '../data/imported/fisherman-s-casserole.mjs';
import floridaStyleCrabCakes from '../data/imported/florida-style-crab-cakes.mjs';
import porkBurritosWithGreenPepperSauce from '../data/imported/pork-burritos-with-green-pepper-sauce.mjs';
import tacoCasserole from '../data/imported/taco-casserole.mjs';
import tunaCasserole from '../data/imported/tuna-casserole.mjs';
import banhChung from '../data/imported/banh-chung.mjs';
import bakedBeans from '../data/imported/baked-beans.mjs';
import chiliConBambi from '../data/imported/chili-con-bambi.mjs';
import deluxeBurgers from '../data/imported/deluxe-burgers.mjs';
import honeyAppleGlazedPork from '../data/imported/honey-apple-glazed-pork.mjs';
import hongshaoRouRedBraisedPorkBelly from '../data/imported/hongshao-rou-red-braised-pork-belly.mjs';
import hoppinJohn from '../data/imported/hoppin-john.mjs';
import italianMarinatedChicken from '../data/imported/italian-marinated-chicken.mjs';
import kashmiriPulao from '../data/imported/kashmiri-pulao.mjs';
import kharaPongalRiceAndMungBeanPorridge from '../data/imported/khara-pongal-rice-and-mung-bean-porridge.mjs';
import lambSausagesAndGrilledPotatoes from '../data/imported/lamb-sausages-and-grilled-potatoes.mjs';
import mapoTofu from '../data/imported/mapo-tofu.mjs';
import mukimo from '../data/imported/mukimo.mjs';
import paneerButterMasala from '../data/imported/paneer-butter-masala.mjs';
import polloDelFungoChickenWithMushrooms from '../data/imported/pollo-del-fungo-chicken-with-mushrooms.mjs';
import porkAachi from '../data/imported/pork-aachi.mjs';
import poheSpicedFlattenedRice from '../data/imported/pohe-spiced-flattened-rice.mjs';
import riceWithBlackBeansArrozConFrijolesNegros from '../data/imported/rice-with-black-beans-arroz-con-frijoles-negros.mjs';
import taroFish from '../data/imported/taro-fish.mjs';
import yellowSplitPeaSoup from '../data/imported/yellow-split-pea-soup.mjs';
import frAcrasDeRouget from '../data/imported/fr-acras-de-rouget.mjs';
import frAkpessiIgname from '../data/imported/fr-akpessi-igname.mjs';
import frCassoletteDeSoleEtCabillaud from '../data/imported/fr-cassolette-de-sole-et-cabillaud.mjs';
import frCotriade from '../data/imported/fr-cotriade.mjs';
import frCremeDeChouFleur from '../data/imported/fr-creme-de-chou-fleur.mjs';
import frCurryDePoissonKeralais from '../data/imported/fr-curry-de-poisson-keralais.mjs';
import frEscalopesDeVeauParmesanAmandes from '../data/imported/fr-escalopes-de-veau-parmesan-amandes.mjs';
import frFondueEpicee from '../data/imported/fr-fondue-epicee.mjs';
import frGratinDeCourgettesEtTomates from '../data/imported/fr-gratin-de-courgettes-et-tomates.mjs';
import frLieuJauneEnPapilloteDeCresson from '../data/imported/fr-lieu-jaune-en-papillote-de-cresson.mjs';
import frPatesAuThon from '../data/imported/fr-pates-au-thon.mjs';
import frPenneRigateALaGrecque from '../data/imported/fr-penne-rigate-a-la-grecque.mjs';
import frPoeleeBrestoise from '../data/imported/fr-poelee-brestoise.mjs';
import frPoeleeDeChampignonsAuFromageALAilEtFinesHerbes from '../data/imported/fr-poelee-de-champignons-au-fromage-a-l-ail-et-fines-herbes.mjs';
import frPouletFafa from '../data/imported/fr-poulet-fafa.mjs';
import frPouletKedjenou from '../data/imported/fr-poulet-kedjenou.mjs';
import frPouletSauceAuVinRouge from '../data/imported/fr-poulet-sauce-au-vin-rouge.mjs';
import frRizNoir from '../data/imported/fr-riz-noir.mjs';
import frSaladeDeRiz from '../data/imported/fr-salade-de-riz.mjs';
import frSauceArachidePoulet from '../data/imported/fr-sauce-arachide-poulet.mjs';
import frSouffleAuBleuDeGex from '../data/imported/fr-souffle-au-bleu-de-gex.mjs';
import frSoupeDAspergesChampignonsMaisEtPoulet from '../data/imported/fr-soupe-d-asperges-champignons-mais-et-poulet.mjs';
import frSpaghettiAuJambonDeParme from '../data/imported/fr-spaghetti-au-jambon-de-parme.mjs';
import frTarteALOignon from '../data/imported/fr-tarte-a-l-oignon.mjs';
import frTomatesFarciesALAgneau from '../data/imported/fr-tomates-farcies-a-l-agneau.mjs';
import frTortiAuxCrevettesEtALaFeta from '../data/imported/fr-torti-aux-crevettes-et-a-la-feta.mjs';
import frPouletGastonGerard from '../data/imported/fr-poulet-gaston-gerard.mjs';
import frCouscousDePouletAuMiel from '../data/imported/fr-couscous-de-poulet-au-miel.mjs';
import frRisottoAuPoulet from '../data/imported/fr-risotto-au-poulet.mjs';
import frSauceGnangnan from '../data/imported/fr-sauce-gnangnan.mjs';
import frDjenkoume2 from '../data/imported/fr-djenkoume2.mjs';
import deDaejiBulgogi from '../data/imported/de-daeji-bulgogi.mjs';
import deMoussaka from '../data/imported/de-moussaka.mjs';
import deEntenbrustMitOrangensauce from '../data/imported/de-entenbrust-mit-orangensauce.mjs';
import dePaprikaBohnenCurry from '../data/imported/de-paprika-bohnen-curry.mjs';
import deLinseneintopf from '../data/imported/de-linseneintopf.mjs';
import deRizCasimir from '../data/imported/de-riz-casimir.mjs';
import deFrikadellen from '../data/imported/de-frikadellen.mjs';
import deKartoffelgratin from '../data/imported/de-kartoffelgratin.mjs';
import deBigos from '../data/imported/de-bigos.mjs';
import deHaehnchenAprikosenMandelReis from '../data/imported/de-haehnchen-aprikosen-mandel-reis.mjs';
import deSzegedinerGulasch from '../data/imported/de-szegediner-gulasch.mjs';
import dePlov from '../data/imported/de-plov.mjs';
import deAelplermagronen from '../data/imported/de-aelplermagronen.mjs';
import deZanderfiletAufSauerkraut from '../data/imported/de-zanderfilet-auf-sauerkraut.mjs';
import deGarnelenMitFenchel from '../data/imported/de-garnelen-mit-fenchel.mjs';
import deEstragonhuhn from '../data/imported/de-estragonhuhn.mjs';
import deKuerbisRisotto from '../data/imported/de-kuerbis-risotto.mjs';
import deMinestrone from '../data/imported/de-minestrone.mjs';
import deLammkeuleGeschmort from '../data/imported/de-lammkeule-geschmort.mjs';
import deNeuenburgerWeissweinsuppe from '../data/imported/de-neuenburger-weissweinsuppe.mjs';
import deEnsaladaDePatata from '../data/imported/de-ensalada-de-patata.mjs';
import deKaspressknoedel from '../data/imported/de-kaspressknoedel.mjs';
import deMaultaschenlasagne from '../data/imported/de-maultaschenlasagne.mjs';
import deBelgischeZwiebelsuppe from '../data/imported/de-belgische-zwiebelsuppe.mjs';
import deIngwerLinsenSuppe from '../data/imported/de-ingwer-linsen-suppe.mjs';
import deHuehnerbrustRahmwirsing from '../data/imported/de-huehnerbrust-rahmwirsing.mjs';
import deLachsSpinatAuflauf from '../data/imported/de-lachs-spinat-auflauf.mjs';
import deHackInWeisskohl from '../data/imported/de-hack-in-weisskohl.mjs';
import dePfefferrahmschnitzel from '../data/imported/de-pfefferrahmschnitzel.mjs';
import deKalafkalsch from '../data/imported/de-kalafkalsch.mjs';
import deKuerbisRavioliMitSalbei from '../data/imported/de-kuerbis-ravioli-mit-salbei.mjs';
import deBaerlauchsuppe from '../data/imported/de-baerlauchsuppe.mjs';
import deCrepesMitSpargel from '../data/imported/de-crepes-mit-spargel.mjs';
import deFischsalat from '../data/imported/de-fischsalat.mjs';
import deGriechischerSalat from '../data/imported/de-griechischer-salat.mjs';
import deHaehnchenrouladeMikrowelle from '../data/imported/de-haehnchenroulade-mikrowelle.mjs';
import deHoernchennudelnLetcho from '../data/imported/de-hoernchennudeln-letcho.mjs';
import deLachsInVanille from '../data/imported/de-lachs-in-vanille.mjs';
import deSchwaemmchen from '../data/imported/de-schwaemmchen.mjs';
import deRheintalerRibel from '../data/imported/de-rheintaler-ribel.mjs';
import nhlbiBavarianBeef from '../data/imported/nhlbi-bavarian-beef.mjs';
import nhlbiBeefAndBeanChili from '../data/imported/nhlbi-beef-and-bean-chili.mjs';
import nhlbiBeefStroganoff from '../data/imported/nhlbi-beef-stroganoff.mjs';
import nhlbiBlackSkilletBeefWithGreensAndRedPotatoes from '../data/imported/nhlbi-black-skillet-beef-with-greens-and-red-potatoes.mjs';
import nhlbiQuickBeefCasserole from '../data/imported/nhlbi-quick-beef-casserole.mjs';
import nhlbiScrumptiousMeatLoaf from '../data/imported/nhlbi-scrumptious-meat-loaf.mjs';
import nhlbiStirFriedBeefAndPotatoes from '../data/imported/nhlbi-stir-fried-beef-and-potatoes.mjs';
import nhlbiStirFriedBeefAndChineseVegetables from '../data/imported/nhlbi-stir-fried-beef-and-chinese-vegetables.mjs';
import nhlbiBakedPorkChops from '../data/imported/nhlbi-baked-pork-chops.mjs';
import nhlbiShishKabob from '../data/imported/nhlbi-shish-kabob.mjs';
import nhlbiSpicyVealRoast from '../data/imported/nhlbi-spicy-veal-roast.mjs';
import nhlbiBarbecuedChicken from '../data/imported/nhlbi-barbecued-chicken.mjs';
import nhlbiBarbecuedChickenSpicySouthernStyle from '../data/imported/nhlbi-barbecued-chicken-spicy-southern-style.mjs';
import nhlbiChickenGumbo from '../data/imported/nhlbi-chicken-gumbo.mjs';
import nhlbiChickenAndRice from '../data/imported/nhlbi-chicken-and-rice.mjs';
import nhlbiChickenAndSpanishRice from '../data/imported/nhlbi-chicken-and-spanish-rice.mjs';
import nhlbiChickenMarsala from '../data/imported/nhlbi-chicken-marsala.mjs';
import nhlbiChickenOrientale from '../data/imported/nhlbi-chicken-orientale.mjs';
import nhlbiChickenRatatouille from '../data/imported/nhlbi-chicken-ratatouille.mjs';
import nhlbiChickenSalad from '../data/imported/nhlbi-chicken-salad.mjs';
import nhlbiChickenStew from '../data/imported/nhlbi-chicken-stew.mjs';
import nhlbiCrispyOvenFriedChicken from '../data/imported/nhlbi-crispy-oven-fried-chicken.mjs';
import nhlbiFingerLickingCurriedChicken from '../data/imported/nhlbi-finger-licking-curried-chicken.mjs';
import nhlbiGrilledChickenWithGreenChileSauce from '../data/imported/nhlbi-grilled-chicken-with-green-chile-sauce.mjs';
import nhlbiJamaicanJerkChicken from '../data/imported/nhlbi-jamaican-jerk-chicken.mjs';
import nhlbi20MinuteChickenCreole from '../data/imported/nhlbi-20-minute-chicken-creole.mjs';
import nhlbiVeryLemonyChicken from '../data/imported/nhlbi-very-lemony-chicken.mjs';
import nhlbiAutumnTurkeyStuffedCabbage from '../data/imported/nhlbi-autumn-turkey-stuffed-cabbage.mjs';
import nhlbiSpaghettiWithTurkeyMeatSauce from '../data/imported/nhlbi-spaghetti-with-turkey-meat-sauce.mjs';
import nhlbiTurkeyMeatLoaf from '../data/imported/nhlbi-turkey-meat-loaf.mjs';
import nhlbiBakedSalmonDijon from '../data/imported/nhlbi-baked-salmon-dijon.mjs';
import nhlbiBakedTrout from '../data/imported/nhlbi-baked-trout.mjs';
import nhlbiCatfishStewAndRice from '../data/imported/nhlbi-catfish-stew-and-rice.mjs';
import nhlbiFishVeronique from '../data/imported/nhlbi-fish-veronique.mjs';
import nhlbiMediterraneanBakedFish from '../data/imported/nhlbi-mediterranean-baked-fish.mjs';
import nhlbiMouthWateringOvenFriedFish from '../data/imported/nhlbi-mouth-watering-oven-fried-fish.mjs';
import nhlbiScallopKabobs from '../data/imported/nhlbi-scallop-kabobs.mjs';
import nhlbiSpicyBakedFish from '../data/imported/nhlbi-spicy-baked-fish.mjs';
import nhlbiSpinachStuffedSole from '../data/imported/nhlbi-spinach-stuffed-sole.mjs';
import nhlbiTunaSalad from '../data/imported/nhlbi-tuna-salad.mjs';
import nhlbiChillinOutPastaSalad from '../data/imported/nhlbi-chillin-out-pasta-salad.mjs';
import nhlbiClassicMacaroniAndCheese from '../data/imported/nhlbi-classic-macaroni-and-cheese.mjs';
import nhlbiRedHotFusilli from '../data/imported/nhlbi-red-hot-fusilli.mjs';
import nhlbiBlackBeansWithRice from '../data/imported/nhlbi-black-beans-with-rice.mjs';
import nhlbiCaribbeanPinkBeans from '../data/imported/nhlbi-caribbean-pink-beans.mjs';
import nhlbiNewOrleansRedBeans from '../data/imported/nhlbi-new-orleans-red-beans.mjs';
import nhlbiSummerVegetableSpaghetti from '../data/imported/nhlbi-summer-vegetable-spaghetti.mjs';
import nhlbiVegetarianSpaghettiSauce from '../data/imported/nhlbi-vegetarian-spaghetti-sauce.mjs';
import nhlbiZucchiniLasagna from '../data/imported/nhlbi-zucchini-lasagna.mjs';
import nhlbiMexicanPozole from '../data/imported/nhlbi-mexican-pozole.mjs';
const SOURCES = [ratatouille, draniki, galayet, kaesespaetzle, melanzane, byrek, misir, tortilla, chicken, irish, farikal, fish, lentilSoup, coldSoup, fondue, spinachPie, strukli, jollof, souvla, trout, paprikaChicken, softTacos, adultMac, agnolotti, garbanzoSoup, porkLima, spaghettiBolognese, spareRibs, poutine, penneMeatSauce, jambalayaI, asparagusSoup, beanSoupVegetarian, beefGravySoup, blackPepperedChickenSpaghetti, creamyTomatoBeanSoup, crockPotPotatoSoup, hotAndSourSoup, mushroomSoup, pastaSoupForKids, pepperSoup, potatoSoup, spicedPumpkinSoup, sausageAndTortelliniSoup, tomKhaKai, vichyssoise, ertesuppePeaSoup, lenguaDeRes, baconWrappedScallops, chickenFriedSteak, chipsiMayai, chuuCheeFish, cubanPicadillo, garlicPorkChopsBlackMushrooms, honeyPepperedSalmon, lemonRosemaryPorkTenderloin, maplePlankedSalmon, meatloafIv, mediterraneanGreenChicken, poppyseedChicken, schweinsbraten, shrimpScampiAngelHair, simpleItalianSausageSpaghetti, spicyChickenCutlets, sweetItalianSausageSkillet, tunaGlop, wineRoastedPorkRoast, beanAndBaconBake, brownRiceCasserole, cazuelaGallega, chuckWagonBeans, cioppinoItalianSeafoodStew, cornySouffle, crockPotBeefStew, cucumberSproutSandwich, dutchOvenBeans, fabesConAlmejas, keralanVegetableStew, macaroniPie, malvaniChickenCurry, meatlessSloppyJoes, miniThreeCheeseEnglishMuffinPizzas, mozzarellaTunaMelts, parmesanCheeseSouffle, mostaccioli, potatoChickpeaCurry, potatoCurryAlooMasala, radishPie, reubenSandwich, risottoAllaMilanese, sloppyJoes, spaghettiBake, tripesALaModeDeCaen, yetsomShiro, yogurtCurrySoupKadhi, bakedPenne, beanburger, chanterelleGoulash, chickenBaconBroccoliAlfredoSpaghetti, chickenTetrazzini, cornChowderI, gambasAlAjilloGarlicShrimp, garlicParmesanPasta, hutspotDutchMashedVegetables, jambons, manxSmokedSalmon, menemenEggsWithOnionGreenPepperAndTomato, ossobucoAllaMilanese, paellaValenciana, panDeJamon, riceWithTofuAndNuts, salmonSpaghetti, southwestPasta, spaghettiAllaPuttanesca, spinachMushroomPestoSpaghetti, stirFriedSeafoodWithNoodles, succotash, tomatoBasilSausagePasta, tomatoPastaWithBaconOnionsAndCheese, tuscanSoupMeatless, zupaOgorkowaPolishCucumberSoup, zuppaToscana, calzone, fishermanSCasserole, floridaStyleCrabCakes, porkBurritosWithGreenPepperSauce, tacoCasserole, tunaCasserole, banhChung, bakedBeans, chiliConBambi, deluxeBurgers, honeyAppleGlazedPork, hongshaoRouRedBraisedPorkBelly, hoppinJohn, italianMarinatedChicken, kashmiriPulao, kharaPongalRiceAndMungBeanPorridge, lambSausagesAndGrilledPotatoes, mapoTofu, mukimo, paneerButterMasala, polloDelFungoChickenWithMushrooms, porkAachi, poheSpicedFlattenedRice, riceWithBlackBeansArrozConFrijolesNegros, taroFish, yellowSplitPeaSoup, frAcrasDeRouget, frAkpessiIgname, frCassoletteDeSoleEtCabillaud, frCotriade, frCremeDeChouFleur, frCurryDePoissonKeralais, frEscalopesDeVeauParmesanAmandes, frFondueEpicee, frGratinDeCourgettesEtTomates, frLieuJauneEnPapilloteDeCresson, frPatesAuThon, frPenneRigateALaGrecque, frPoeleeBrestoise, frPoeleeDeChampignonsAuFromageALAilEtFinesHerbes, frPouletFafa, frPouletKedjenou, frPouletSauceAuVinRouge, frRizNoir, frSaladeDeRiz, frSauceArachidePoulet, frSouffleAuBleuDeGex, frSoupeDAspergesChampignonsMaisEtPoulet, frSpaghettiAuJambonDeParme, frTarteALOignon, frTomatesFarciesALAgneau, frTortiAuxCrevettesEtALaFeta, frPouletGastonGerard, frCouscousDePouletAuMiel, frRisottoAuPoulet, frSauceGnangnan, frDjenkoume2, deDaejiBulgogi, deMoussaka, deEntenbrustMitOrangensauce, dePaprikaBohnenCurry, deLinseneintopf, deRizCasimir, deFrikadellen, deKartoffelgratin, deBigos, deHaehnchenAprikosenMandelReis, deSzegedinerGulasch, dePlov, deAelplermagronen, deZanderfiletAufSauerkraut, deGarnelenMitFenchel, deEstragonhuhn, deKuerbisRisotto, deMinestrone, deLammkeuleGeschmort, deNeuenburgerWeissweinsuppe, deEnsaladaDePatata, deKaspressknoedel, deMaultaschenlasagne, deBelgischeZwiebelsuppe, deIngwerLinsenSuppe, deHuehnerbrustRahmwirsing, deLachsSpinatAuflauf, deHackInWeisskohl, dePfefferrahmschnitzel, deKalafkalsch, deKuerbisRavioliMitSalbei, deBaerlauchsuppe, deCrepesMitSpargel, deFischsalat, deGriechischerSalat, deHaehnchenrouladeMikrowelle, deHoernchennudelnLetcho, deLachsInVanille, deSchwaemmchen, deRheintalerRibel, nhlbiBavarianBeef, nhlbiBeefAndBeanChili, nhlbiBeefStroganoff, nhlbiBlackSkilletBeefWithGreensAndRedPotatoes, nhlbiQuickBeefCasserole, nhlbiScrumptiousMeatLoaf, nhlbiStirFriedBeefAndPotatoes, nhlbiStirFriedBeefAndChineseVegetables, nhlbiBakedPorkChops, nhlbiShishKabob, nhlbiSpicyVealRoast, nhlbiBarbecuedChicken, nhlbiBarbecuedChickenSpicySouthernStyle, nhlbiChickenGumbo, nhlbiChickenAndRice, nhlbiChickenAndSpanishRice, nhlbiChickenMarsala, nhlbiChickenOrientale, nhlbiChickenRatatouille, nhlbiChickenSalad, nhlbiChickenStew, nhlbiCrispyOvenFriedChicken, nhlbiFingerLickingCurriedChicken, nhlbiGrilledChickenWithGreenChileSauce, nhlbiJamaicanJerkChicken, nhlbi20MinuteChickenCreole, nhlbiVeryLemonyChicken, nhlbiAutumnTurkeyStuffedCabbage, nhlbiSpaghettiWithTurkeyMeatSauce, nhlbiTurkeyMeatLoaf, nhlbiBakedSalmonDijon, nhlbiBakedTrout, nhlbiCatfishStewAndRice, nhlbiFishVeronique, nhlbiMediterraneanBakedFish, nhlbiMouthWateringOvenFriedFish, nhlbiScallopKabobs, nhlbiSpicyBakedFish, nhlbiSpinachStuffedSole, nhlbiTunaSalad, nhlbiChillinOutPastaSalad, nhlbiClassicMacaroniAndCheese, nhlbiRedHotFusilli, nhlbiBlackBeansWithRice, nhlbiCaribbeanPinkBeans, nhlbiNewOrleansRedBeans, nhlbiSummerVegetableSpaghetti, nhlbiVegetarianSpaghettiSauce, nhlbiZucchiniLasagna, nhlbiMexicanPozole];
const LIMITATIONS = {
  'unitools:ohridska-pastrmka': { summary: 'Whole fish; shared oil and lemons; wine retained', detail: 'The source lists four whole gutted trout without weights. No kg, edible yield or exact trout species is inferred, and the regional name does not establish Lake Ohrid origin. The 80 ml olive oil is shared between rubbing, greasing and the remaining pour; the three lemons supply cavity slices and serving wedges. No numeric split or extra amount is invented. The 800 g potatoes are cooked under the raw fish, not an uncooked garnish. Wine remains 150 ml with no alcohol-free claim. Follow the adapted endpoint and raw-fish separation note. Whole gutted fish still have bones; take care when serving and eating. Product formulations and cross-contact remain unreviewed.', grocery: 'Four whole gutted fish, no weight conversion; oil and lemons are shared totals; contains wine' },
  'unitools:souvla': { summary: 'Pork shoulder; charcoal spit and probe needed', detail: 'The actual ingredient is 2.5 kg pork shoulder, not a pork-or-lamb choice despite the broader source summary. The source cuts pieces of about 200 g; no exact piece count is inferred. Pita formulation and cross-contact are unverified. No marinade, oil, dressing or extra side is added. This requires suitable charcoal-spit equipment and a food thermometer, not an ordinary pan. Check current local fire restrictions before lighting; no current restriction status is checked by this recipe. Follow the separately adapted cooking steps and handling note.', grocery: 'Pork shoulder 2.5 kg; separate charcoal-spit equipment and food thermometer required' },
  'unitools:jollof-rice': { summary: 'Contains chicken stock; rice storage matters', detail: 'The source explicitly lists 600 ml chicken stock. Its vegetarian and vegan tags contradict that ingredient and are not accepted here. This is not a vegetarian dish; product formulations and cross-contact are unverified. The 500 g long-grain rice retains its source rinsed note, without a dry/rinsed-weight conversion or cooked-yield estimate. One onion is blended and the second fried, as the source says. The 600 ml stock remains unchanged; pot and rice differences may affect the result. Source cooking times are not tested doneness or yield guarantees. Salt is explicit in Russian step 4; the English says only season. No extra meat or side is included.', grocery: 'Contains 600 ml chicken stock, not a vegetarian substitution', handling: 'Two Plates rice-storage note (separate from the source method): cool promptly in small portions, cover and refrigerate below 5°C within 2 hours. Eat refrigerated cooked rice within 2 days. Count all time between 5°C and 60°C cumulatively: under 2 hours, use or refrigerate; 2 to 4 hours, use immediately or discard, not refrigerate for later; after 4 hours, discard. Reheat rice only once, until steaming hot throughout (at least 60°C), stirring microwaved food. Reheating does not repair unsafe or unknown storage. NSW pregnancy advice is stricter: use rice within 1 day and reheat once to at least 60°C; this note does not certify this dish for pregnancy. Follow stock and other product storage, use-by and cooking directions.', handlingUrl: 'https://www.foodauthority.nsw.gov.au/consumer/special-care-foods/leftovers', handlingLabel: 'NSW leftovers guidance', handlingExtraUrl: 'https://www.foodauthority.nsw.gov.au/consumer/life-events-and-food/pregnancy/foods-to-eat-or-avoid-when-pregnant', handlingExtraLabel: 'NSW pregnancy-specific guidance' },
  'unitools:zagorski-strukli': { summary: 'Adapted egg endpoint; divided oil and butter', detail: 'The 600 g dry curd cheese is the source ingredient, not a pre-drain weight for another cheese. The source uses the 2 tbsp oil in the dough and on its surface, and the 60 g butter for brushing and the final topping, without giving numeric allocations. These stay total source inputs; no extra oil or butter amount is invented. Salted boiling water is an unquantified cooking medium, separate from the listed 150 ml warm water for the dough. The one dough egg and two filling eggs remain separate lines. Cheese and dairy formulations and pasteurisation are not verified; this dish is not classified as vegetarian. Use the adapted egg endpoint below, not browning or the source times alone.', grocery: 'Oil 2 tbsp and butter 60 g are shared totals; prepare separate salted boiling water' },
  'unitools:fondue-moitie-moitie': { summary: 'Contains wine and kirsch; no alcohol-free claim', detail: 'The source uses 300 ml wine and 2 tbsp kirsch. No claim is made that the alcohol evaporates or that this dish is alcohol-free. Cheese and bread formulations, rennet and pasteurisation are not verified. Follow product storage, use-by and cooking directions; this recipe does not override them. A low burner setting is not a measured hot-holding temperature. The separately adapted serving step includes a thermometer check and burner-attention note.', grocery: 'Contains wine and kirsch; no alcohol-free claim' },
  'unitools:spanakopita': { summary: 'Adapted egg steps; filo sheet sizes vary', detail: 'The source gives 450 g filo but uses 13 sheets without sheet dimensions or weight. Check your pastry before starting; there is no guaranteed sheet-to-packet conversion. The 150 ml olive oil remains total source input: a spoon for onion and brushing the pastry, with no invented gram split or absorbed fraction. The final water flick is an unquantified process sprinkle, not a new fixed shopping amount. Cheese and pastry formulations are not verified. Use the adapted egg instructions, not the original raw-filling tasting cue.', grocery: 'Filo 450 g, but 13 sheets have unspecified dimensions; check before starting' },
  'unitools:melanzane-alla-parmigiana': { summary: 'Pepper has no explicit method step', detail: 'The source ingredient line is salt and pepper to taste, but its method explicitly adds salt only. No pepper instruction is supplied or invented here. Cheese formulations and strict vegetarian status are not reviewed.', grocery: 'Source gap: salt-and-pepper line has salt-only instructions' },
  'unitools:mercimek-corbasi': { summary: 'Soup only; salt/stock method gaps', detail: 'Soup only, not a nutritionally verified full meal; bread or other sides are not included. The source lists salt to taste but never explicitly adds it in the method. That gap is retained rather than inventing a step. The ingredient list says 1.4 l water or stock, but both source-method languages name only water. The stock alternative has no separate method instructions; its formulation is also unknown. This gap is not repaired here, and the listed alternative and quantity stay unchanged. The source splits 40 g butter between a spoon at the start and the rest at the finish, without a gram allocation. Extra boiling water to loosen the soup is an unquantified process instruction, not a fixed shopping quantity.', grocery: 'Source gaps: salt has no method step; water-or-stock line has water-only instructions' },
  'unitools:tarator': { summary: 'Soup only; ice needed separately', detail: 'Cold soup only, not a nutritionally verified full meal; bread or other sides are not included. The source method serves an ice cube in each bowl, but ice is absent from its ingredient list. Prepare ice separately for the bowls you serve; this is not included in the listed 200 ml cold water, which stays unchanged. The grocery heading repeats this reminder. Yoghurt formulation and pasteurisation are not verified.', grocery: 'Source-method reminder: ice cube per bowl, separate from listed 200 ml water', handling: 'Two Plates handling note (not a change to the source method): wash cucumber and herbs under running water, use clean utensils, follow the yoghurt label storage and use-by directions, and keep the soup at 5°C or colder until serving. These steps do not certify the recipe or clear allergies.', handlingUrl: 'https://www.foodstandards.gov.au/consumer/prevention-of-foodborne-illness/food-safety-basics' },
  'unitools:kaesespaetzle': { summary: 'Salad unquantified; milk method gap', detail: 'The source suggests a green salad with vinegar dressing but supplies no quantities. That optional side is not in the groceries for this dish. The ingredient list gives water or milk, but the dough method names only water in both languages; no separate milk instructions are supplied. This gap is not repaired here. Emmental or Bergkäse remain source choices; no formulation or strict vegetarian clearance is implied.', grocery: 'Source gap: water-or-milk line has water-only instructions; suggested salad unquantified' },
  'unitools:byrek-me-spinaq': { summary: 'Filo sheet sizes vary: see recipe', detail: 'The source supplies 500 g of prepared filo but describes layers by sheet count. It does not specify sheet dimensions or weight per sheet, so those counts cannot be converted into a guaranteed packet size. Check your pastry before starting. Cheese and pastry formulations are not reviewed.' },
  'unitools:misir-wat': { summary: 'Stew only: bread not included', detail: 'This is the stew only. The source suggests injera or flatbread to serve, but gives no bread quantity or recipe. Bread is not included in these groceries. Berbere and neutral-oil formulations are unspecified; no verified vegan or allergy-free claim is made.' },
  'wikibooks:paprika-chicken': { summary: 'Unquantified salt, parsley and pan water', detail: 'The source lists salt and fresh parsley without quantities; both stay unquantified rather than inventing amounts. The water added to cover the meat and any later top-ups are unquantified process instructions, not fixed shopping amounts; the source asks for only a thin layer of gravy at the end. Paprika (2–4 tbsp) and olive oil (5–7 tbsp) are source ranges, kept unchanged. The green pepper, red pepper, carrot and second onion are marked optional in the source. Sour cream replaces the traditional lard in this source version; dairy formulations are unverified. The source gives the 6–8 serving yield as a range. Use the adapted poultry endpoint below, not the source time or tenderness cue alone.', grocery: 'Salt and parsley quantities not stated; pan water unquantified; paprika and oil are source ranges' },
  'wikibooks:vegetarian-soft-tacos': { summary: 'Bean can size and sour cream amount not stated', detail: 'The source lists one can of refried beans without a can size and sour cream without a quantity; both stay as written rather than inventing amounts. The beef substitute is a branded vegetarian product example; its formulation, and the tortilla and refried-bean formulations, are unverified, so this dish is not classified as vegetarian despite the source category. Cheese is a suggested topping; dairy formulation is unverified. Toppings are the source suggestions and stay optional.', grocery: 'Refried beans: 1 can, size not stated; sour cream amount not stated' },
  'wikibooks:adult-mac-and-cheese': { summary: 'Cheese formulations unverified', detail: 'The butter is a source-divided total: 2 tbsp melted first, then the rest whisked in 1 tbsp at a time; no other split is invented. The salted pasta water is an unquantified process medium beyond the listed ½ tsp. Cheese formulations, including rennet, are unverified; this dish is not classified as vegetarian. The source page carries its own nutrition summary, which is not verified or used here; nutrition stays unknown.', grocery: 'Five cheeses; formulations unverified; extra salt needed for pasta water' },
  'wikibooks:agnolotti-in-brodo': { summary: 'Soup only; pasta cooks per its package; contains sherry', detail: 'Soup only, not a nutritionally verified full meal; the garlic bread and salad the source suggests are not included. The pasta cooking time comes from the package directions of the product, which govern doneness of the filling; filling composition is unspecified and often meat, so diet stays unclassified. The broth line is a source alternative: ½ litre chicken broth or ½ litre water with 2 stock cubes; both are covered by the source method. The sherry dash is an unquantified amount the source leaves to the cook; the dish contains alcohol and no alcohol-free claim is made. Parsley is a source handful; Parmesan is an unquantified garnish.', grocery: 'Soup only; pasta doneness follows its package; contains a dash of sherry' },
  'wikibooks:galician-garbanzo-soup': { summary: 'Soup only; broth formulation unverified', detail: 'Soup only, not a nutritionally verified full meal; the salad, bread and wine the source suggests alongside are not included. The 3 cans of beans total 45 oz / 1.26 kg per the source. The broth line is a source alternative: vegetable broth, water, or a combination; both are covered by the source method, and the broth formulation is unverified, so diet stays unclassified despite the source vegetarian and gluten-free category claims. The basil garnish appears only in the source serving notes, not the numbered method; that gap is kept visible rather than inventing a step. The tomato line is a source alternative: 2 fresh tomatoes or 1 cup canned.', grocery: 'Soup only; basil garnish has no method step; broth or water both work' },
  'wikibooks:pork-and-lima-skillet': { summary: 'Adapted pork endpoint; gravy-base formulation unverified', detail: 'The source gives no browning time for the chops and finishes with a short covered heat-through; use the adapted measured endpoint below rather than time or colour. Chop thickness is unspecified. The frozen lima beans cook per their package directions. The gravy base is a manufactured product whose formulation is unverified. The source wording is 2 packages (10 ounces) of lima beans, kept as written.', grocery: 'Gravy base formulation unverified; lima beans cook per package' },
  'wikibooks:spaghetti-bolognese': { summary: 'Adapted mince endpoint; contains wine', detail: 'The source boils then gently simmers the sauce for an hour or more; use the adapted mince endpoint below rather than relying on that time alone. The ¼ lb (125 g) ham or bacon is a source choice of either meat, and both are covered by the source method. The fennel bulb is marked optional in the source ("if available"). The red wine (125 ml) stays in the dish; no alcohol-free claim is made. The beef stock line prefers fresh but accepts canned per the source; stock formulation is unverified. Salt and pepper are genuinely to taste per the source. The one-gallon pasta water is an unquantified-salt process medium, separate from the listed salt. The sauce is a northern Italian Ragu Bolognese per the source summary; this version is served over spaghetti.', grocery: 'Contains red wine; stock fresh or canned per source; fennel optional' },
  'wikibooks:barbecued-spare-ribs': { summary: 'Overnight marinade unrefrigerated in source; adapted pork endpoint', detail: 'The source says "marinate overnight" without saying where: refrigerate the marinating ribs at 5°C or colder (handling note below); the marinade contacts raw pork and is not reused as a sauce. Use the adapted pork endpoint below, not the source 45-plus-15-minute roast alone. The source tip bullets (alternative oven schedule and grilling) are not part of the imported numbered method. The source carries a gluten-free category claim, but soy sauce and hoisin are manufactured products whose formulations are unverified; that claim is shown as an unverified source claim only and is not accepted here. Sake remains in the marinade; no alcohol-free claim. "Serve hot or cold": if serving cold, follow the cooling and refrigeration handling note below. Cumin is optional per the source.', grocery: 'Marinate refrigerated; soy/hoisin formulations unverified despite source gluten-free tag; contains sake', handling: 'Two Plates handling note (not a change to the source method): refrigerate the ribs at 5°C or colder during the overnight marinade, in a covered non-reactive dish. Discard the used marinade; it contacted raw pork. If serving cold, cool promptly in small portions, cover and refrigerate below 5°C within 2 hours and eat within 2 days. Count all time between 5°C and 60°C cumulatively: under 2 hours, use or refrigerate; 2 to 4 hours, use immediately or discard, not refrigerate for later; after 4 hours, discard. Reheat only once, until steaming hot throughout (at least 60°C). Reheating does not repair unsafe or unknown storage.', handlingUrl: 'https://www.foodauthority.nsw.gov.au/consumer/special-care-foods/leftovers', handlingLabel: 'NSW leftovers guidance' },
  'wikibooks:poutine': { summary: 'Deep-frying; fresh curds and canned sauce formulations unverified', detail: 'The potatoes are deep-fried in 1 L of oil at 185°C; follow the deep-frying fire-safety note below and never leave the hot oil unattended. The source fries twice: about 5 minutes, then about 1 minute to crisp. The canned poutine sauce (mélange à sauce poutine) or gravy is a manufactured product whose formulation, including any meat content, is unverified, so diet stays unclassified. Fresh cheddar cheese curds are a perishable dairy product; buy them fresh, keep refrigerated at 5°C or colder, follow the package use-by, and limit their time at room temperature to the assembly described. The 2-cup curd measure and the 290 g can are the source quantities, kept as written. Mozzarella is the source alternative for curds.', grocery: 'Deep-frying: see fire-safety note; gravy formulation unverified; keep curds refrigerated' },
  'wikibooks:penne-meat-sauce': { summary: 'Adapted sausage endpoint; sausage species and sauce formulation unverified', detail: 'The source browns the sausage until "browned and crumbled"; use the adapted sausage endpoint below rather than colour. The Italian sausage species (pork, beef, chicken or other) and its seasoning are not stated, and the meat-flavored spaghetti sauce is a manufactured product whose formulation is unverified, so diet stays unclassified. The pasta cooks per its own package directions; the salted pasta water is an unquantified process medium. The ½ cup hot water, 20 oz sausage package, 26½ oz sauce can and 6 oz tomato-paste can are source quantities, kept as written.', grocery: 'Sausage species unstated; sauce formulation unverified; pasta cooks per package' },
  'wikibooks:jambalaya-i': { summary: 'Uses already-cooked poultry; rice storage matters', detail: 'The 2 cups of turkey or chicken are already-cooked meat: prepare it safely fresh, or use leftovers with a known safe cooling and storage history (handling note below); unknown or unsafe storage is not repaired by the 20-minute simmer. The mushroom line is an unquantified "small can", kept as written rather than inventing a size; it is optional and drained per the source. The rice absorbs the cooking liquid; source rice quantity (⅔ cup) is the dry measure, kept unchanged. The herb-spice powder, celery, canned tomatoes and broth are per the source. Cooked rice leftovers need prompt cooling and refrigeration; follow the rice handling note below. Broth formulation is unverified.', grocery: 'Cooked poultry must be safely prepared or stored; mushrooms: small can, size not stated', handling: 'Two Plates handling note (not a change to the source method): the cooked turkey or chicken must be freshly and safely cooked, or refrigerated leftovers with a known safe history: cooled promptly in small portions, covered, refrigerated below 5°C within 2 hours and used within 2 days. Count all time between 5°C and 60°C cumulatively: under 2 hours, use or refrigerate; 2 to 4 hours, use immediately or discard, not refrigerate for later; after 4 hours, discard. Cool leftover jambalaya promptly the same way; cooked rice supports growth of Bacillus cereus if left warm. Reheat leftovers only once, until steaming hot throughout (at least 60°C), stirring microwaved food. Reheating does not repair unsafe or unknown storage. NSW pregnancy advice is stricter: use rice within 1 day and reheat once to at least 60°C; this note does not certify this dish for pregnancy.', handlingUrl: 'https://www.foodauthority.nsw.gov.au/consumer/special-care-foods/leftovers', handlingLabel: 'NSW leftovers guidance', handlingExtraUrl: 'https://www.foodauthority.nsw.gov.au/consumer/life-events-and-food/pregnancy/foods-to-eat-or-avoid-when-pregnant', handlingExtraLabel: 'NSW pregnancy-specific guidance' },
  'wikibooks:asparagus-soup': { summary: 'Cream is a source range; boiled potatoes not included', detail: 'The ¼–1 cup cream is a source range, kept unchanged; the source notes the larger amount makes a richer soup. The salt, black pepper and cayenne are genuinely to taste per the source. The source serves the soup hot with boiled potatoes or chilled after cooling; the potatoes are an unquantified serving suggestion and are not included in the groceries. For the chilled option, follow the cooling handling note below. Butter and cream formulations are unverified.', grocery: 'Cream is a source range (¼–1 cup); boiled potatoes to serve are not included', handling: 'Two Plates handling note (not a change to the source method): if serving chilled, cool the soup promptly in small portions, cover and refrigerate below 5°C within 2 hours, and eat within 2 days. Count all time between 5°C and 60°C cumulatively: under 2 hours, use or refrigerate; 2 to 4 hours, use immediately or discard, not refrigerate for later; after 4 hours, discard. Keep the soup at 5°C or colder until serving.', handlingUrl: 'https://www.foodauthority.nsw.gov.au/consumer/special-care-foods/leftovers', handlingLabel: 'NSW leftovers guidance' },
  'wikibooks:bean-soup-vegetarian': { summary: 'Source name says vegetarian; formulations unverified', detail: 'The source names this soup vegetarian, but the grated Parmesan (rennet) and the canned vegetable broth are manufactured products whose formulations are unverified, so the dish is not classified as vegetarian here and diet stays unclassified. All can and package sizes are source quantities, kept as written. The broken angel-hair pasta measure (⅓ cup) is the dry pasta, broken into 1- to 2-inch lengths per the source.', grocery: 'Parmesan and broth formulations unverified despite the source name' },
  'wikibooks:beef-gravy-soup': { summary: 'Adapted beef endpoint; slice thickness unstated', detail: 'The source simmers the beef slices 30 minutes and continues when they "look cooked"; appearance is not a doneness check. Use the adapted measured endpoint below. The beef slice thickness is unstated; check the thickest slices from the side. The root vegetables line is a source alternative (carrots, turnips, or radishes), all covered by the source method. The 2 tablespoons of beef broth alongside 2 cups of vegetable broth are source quantities, kept as written; broth formulations are unverified.', grocery: 'Beef slice thickness unstated; broth formulations unverified' },
  'wikibooks:black-peppered-chicken-spaghetti': { summary: 'Adapted chicken endpoint; oil is a divided total', detail: 'The source boils the chicken "until the color changes"; colour is not a doneness check, so use the adapted measured endpoint below. The 5 tbsp oil is a source-divided total: 2 tbsp in the pasta water and the remainder in the skillet; no other split is invented. The 25 g black pepper, 2 tbsp salt and 2 tbsp parsley are source quantities, kept as written. The pasta cooking water is salted separately from the listed salt; that is an unquantified process medium. Cream formulation is unverified.', grocery: 'Oil is divided: 2 tbsp in the pasta water, the rest in the skillet' },
  'wikibooks:creamy-tomato-bean-soup': { summary: 'Cream cheese formulation unverified', detail: 'The white beans are canned with their liquid per the source. The cream cheese is a manufactured product whose formulation is unverified, so diet stays unclassified. The 5–10 garlic cloves and 10–20 basil leaves are source ranges, kept unchanged. The olive-oil-or-neutral-oil and crushed-or-diced-tomatoes lines are source alternatives, both covered by the source method.', grocery: 'Cream cheese formulation unverified; garlic and basil are source ranges' },
  'wikibooks:crock-pot-potato-soup': { summary: 'Slow-cooker soup; chicken broth formulation unverified', detail: 'The 4 cups of chicken broth are a manufactured product whose formulation is unverified, so diet stays unclassified. The butter is a source range (4 to 5 tablespoons). Follow your slow-cooker manufacturer directions. Once cooked, keep the soup steaming hot (above 60°C) until serving, and follow the 2-hour rule for anything between 5°C and 60°C; the low or warm settings are not measured holding temperatures. Evaporated milk is added at the end per the source.', grocery: 'Chicken broth formulation unverified; butter is a source range', handling: 'Two Plates handling note (not a change to the source method): once the soup is cooked, keep it above 60°C until serving. Count all time between 5°C and 60°C cumulatively: under 2 hours, use or refrigerate; 2 to 4 hours, use immediately or discard, not refrigerate for later; after 4 hours, discard. Cool leftovers promptly in small portions, cover, refrigerate below 5°C within 2 hours, eat within 2 days, and reheat only once until steaming hot throughout (at least 60°C).', handlingUrl: 'https://www.foodauthority.nsw.gov.au/consumer/special-care-foods/leftovers', handlingLabel: 'NSW leftovers guidance' },
  'wikibooks:hot-and-sour-soup': { summary: 'Uses already-cooked meat; adapted egg step', detail: 'The ⅓ cup of shredded chicken or pork is already-cooked meat: prepare it safely fresh, or use leftovers with a known safe cooling and storage history (handling note below). The chicken-or-pork line is a source alternative, both covered by the source method, so the dish is non-vegetarian with the species open. The stock line is a source alternative: 6 cups chicken stock or broth, or 4 cups water with 4 bouillon cubes; both are covered by the source method. The cornstarch-and-water line is a combined slurry measure per the source. The beaten egg is streamed into the soup; use the adapted egg step below so the egg cooks through in the simmering soup.', grocery: 'Cooked chicken or pork must be safely prepared or stored; stock or water-plus-bouillon both work', handling: 'Two Plates handling note (not a change to the source method): the cooked chicken or pork must be freshly and safely cooked, or refrigerated leftovers with a known safe history: cooled promptly in small portions, covered, refrigerated below 5°C within 2 hours and used within 2 days. Count all time between 5°C and 60°C cumulatively: under 2 hours, use or refrigerate; 2 to 4 hours, use immediately or discard, not refrigerate for later; after 4 hours, discard. Reheat leftovers only once, until steaming hot throughout (at least 60°C). Reheating does not repair unsafe or unknown storage.', handlingUrl: 'https://www.foodauthority.nsw.gov.au/consumer/special-care-foods/leftovers', handlingLabel: 'NSW leftovers guidance' },
  'wikibooks:mushroom-soup': { summary: 'Contains sherry; butter and flour are divided totals', detail: 'The ½ cup of sherry stays in the soup; no alcohol-free claim is made. The butter (½ pound) and flour (1 cup) are source-divided totals used at different stages; the source method shows each use and no other split is invented. The 12 cups of beef stock are a manufactured product whose formulation is unverified, so diet stays unclassified. The three mushroom varieties are source lines, kept as written.', grocery: 'Contains ½ cup sherry; no alcohol-free claim; beef stock formulation unverified' },
  'wikibooks:pasta-soup-for-kids': { summary: 'Uses pre-cooked pasta; tofu formulation unverified', detail: 'The 1–1½ cups of pasta are already cooked (a source range, kept unchanged): cook it fresh, or use safely refrigerated leftovers. The minced firm tofu, vegetable broth, and baby-corn-or-frozen-corn alternative are manufactured or source-alternative products whose formulations are unverified, so diet stays unclassified. Frozen peas and corn cook from frozen per the source notes.', grocery: 'Cooked pasta must be freshly cooked or safely stored; tofu and broth formulations unverified' },
  'wikibooks:pepper-soup': { summary: 'Adapted multi-species endpoint; spice mix formulation unverified', detail: 'The meat line is a source alternative: goat, catfish, chicken, or assorted meats; the source method covers all of them, so the dish is non-vegetarian with the species open and the endpoint below is species-aware. The 2–3 seasoning cubes, 2 tbsp pepper-soup spice mix and 1 tbsp ground crayfish are manufactured or blended products whose formulations are unverified. Salt and ground pepper carry the source "adjust to taste" notes. The water (4–6 cups) is a source range.', grocery: 'Seasoning cubes and spice mix formulations unverified; water is a source range' },
  'wikibooks:potato-soup': { summary: 'Chicken bouillon formulation unverified', detail: 'The 2 cubes of chicken bouillon are a manufactured product whose formulation is unverified, so diet stays unclassified. The butter-or-margarine line is a source alternative, both covered by the source method. The black pepper is to taste per the source. Milk and butter formulations are unverified.', grocery: 'Chicken bouillon formulation unverified; butter or margarine both work' },
  'wikibooks:spiced-pumpkin-soup': { summary: 'Source gap: garlic listed but never used', detail: 'The source lists 2 crushed garlic cloves but its numbered method never adds them; that gap is kept visible rather than inventing a step. The broth line is a source alternative: nonfat low-sodium chicken broth or vegetable stock, both covered by the source method, and the formulations are unverified, so diet stays unclassified. Hot-blend with care: blend in two batches per the source and vent steam. Milk formulation is unverified.', grocery: 'Source gap: 2 garlic cloves have no method step; broth or stock both work' },
  'wikibooks:sausage-and-tortellini-soup': { summary: 'Adapted sausage endpoint; sausage species unstated', detail: 'The source cooks the sausage until "crumbled and no longer pink"; colour is not a doneness check, so use the adapted measured endpoint below. The sweet Italian sausage species (pork, beef, chicken or other) is not stated, so diet stays unclassified. The vegetable-spray-or-olive-oil line is a source alternative, both covered by the source method. The tortellini filling is a manufactured cheese product whose formulation is unverified; Parmesan is an optional garnish. The tortellini simmer (10–15 minutes) follows the source; fresh tortellini package directions govern if they differ.', grocery: 'Sausage species unstated; tortellini formulation unverified' },
  'wikibooks:tom-kha-kai': { summary: 'Adapted chicken endpoint; lemongrass and galangal are aromatics', detail: 'The source boils the cubed chicken at a rolling boil for 4 minutes; time is not a doneness check, so use the adapted measured endpoint below. The lemongrass and galangal are aromatics that stay in the soup but are not eaten; that is the source presentation. The 3–4 chilies are a source range. Soy sauce formulation is unverified.', grocery: 'Lemongrass and galangal are aromatics, not eaten; chilies are a source range' },
  'wikibooks:vichyssoise': { summary: 'Chilled soup; contains wine; bouillon formulation unverified', detail: 'This soup is served chilled: follow the cooling handling note below and keep it at 5°C or colder until serving. The 1 cup of white wine stays in the soup; no alcohol-free claim is made. The chicken-bouillon-or-homemade-stock line is a source alternative, both covered by the source method, and the bouillon formulation is unverified, so diet stays unclassified. The butter (1 lb) is a source quantity, kept as written. The shallot-tops garnish is a source line used in the method.', grocery: 'Chilled soup: keep at 5°C or colder; contains white wine; no alcohol-free claim', handling: 'Two Plates handling note (not a change to the source method): cool the soup promptly in small portions, cover and refrigerate below 5°C within 2 hours, and keep it at 5°C or colder until serving. Eat within 2 days. Count all time between 5°C and 60°C cumulatively: under 2 hours, use or refrigerate; 2 to 4 hours, use immediately or discard, not refrigerate for later; after 4 hours, discard.', handlingUrl: 'https://www.foodauthority.nsw.gov.au/consumer/special-care-foods/leftovers', handlingLabel: 'NSW leftovers guidance' },
  'wikibooks:ertesuppe-pea-soup': { summary: 'Smoked pork product state unstated; adapted endpoint', detail: 'The smoked pork butt is a cured, smoked product; whether it reaches you fully cooked is unstated, so treat it as needing full cooking and use the adapted measured endpoint below rather than the source 40-minutes-per-pound time alone. The dry peas soak overnight per the source. The "12 cup water" line is the source wording, kept verbatim; the source method splits the water (about 4 cups for soaking plus 8 cups for simmering).', grocery: 'Smoked pork: treat as needing full cooking; source water line kept as written' },
  'wikibooks:lengua-de-res': { summary: 'Adapted tongue endpoint; colour cue replaced', detail: 'The source simmers the tongue until "no longer pink"; colour is not a doneness check, so use the adapted measured endpoint below. The source timing (about 50 minutes per pound) is kept as the source process. The 5 fresh green chiles are roasted, skinned, stemmed and seeded per the source. The two cans of corn total 30 ounces per the source.', grocery: 'One whole beef tongue; 2 cans corn totalling 30 oz' },
  'wikibooks:bacon-wrapped-scallops': { summary: 'Deep-frying; adapted bacon and scallop endpoint', detail: 'The scallops are deep-fried in 1 quart of oil at 180°C; follow the deep-frying fire-safety note below and never leave the hot oil unattended. The raw bacon wraps the scallops: "golden brown" is not a doneness check for either component, so use the adapted measured endpoint below for the scallops and confirm the bacon is cooked through and crisped. The teriyaki glaze and soy sauce are manufactured products whose formulations are unverified, so diet stays unclassified beyond the explicit bacon and scallops.', grocery: 'Deep-frying: see fire-safety note; glaze and soy formulations unverified' },
  'wikibooks:chicken-fried-steak': { summary: 'Adapted endpoint for ½-inch steaks; coating flour unquantified', detail: 'The coating flour is "as needed plus 3 tbsp": the dredging amount is genuinely unquantified in the source and stays that way; the 3 tbsp for the gravy is the measured part. The steaks are ½ inch thick: "golden brown, about 4 minutes per side" is not a doneness check, so use the adapted side-probe endpoint below. The source holds the steaks in a 200°F (about 95°C) oven while the gravy cooks; keep that oven on and the hold short. The milk-and-cream line is a combined measure per the source, and the bacon drippings are a divided total (2 tbsp for frying, the rest for the gravy) per the source method.', grocery: 'Coating flour amount not stated ("as needed"); drippings are a divided total' },
  'wikibooks:chipsi-mayai': { summary: 'Adapted egg endpoint; frying fire care', detail: 'The fries are deep-fried; never leave the hot oil unattended and follow the fire-safety note below. The omelette must be fully set: use the adapted egg endpoint below, not colour alone. The onion, tomato and green chili are marked optional in the source. The 2 tbsp oil plus extra for frying is the source wording; the frying amount is genuinely unquantified and stays that way. Coriander is a garnish.', grocery: 'Frying oil amount not stated; onion, tomato and chili optional' },
  'wikibooks:chuu-chee-fish': { summary: 'Adapted whole-fish endpoint; curry paste formulation unverified', detail: 'The source fries the whole fish until golden; colour is not a doneness check, so use the adapted measured endpoint below in the thickest flesh beside the backbone. The kaeng chu chee curry paste (1 teaspoon) is a manufactured product whose formulation is unverified; it typically contains shrimp paste, so diet rests on the explicit fish line only and product formulations are unverified. The oil line reserves 1 tablespoon for the curry paste per the source. The source flags its own tablespoon ambiguity (metric 20 mL) for the fish sauce; that wording is kept verbatim. Whole fish still have bones; take care when serving.', grocery: 'Curry-paste formulation unverified (may contain shrimp); whole fish has bones' },
  'wikibooks:cuban-picadillo': { summary: 'Adapted mince endpoint; source gap: vinegar never used; serves-over items not included', detail: 'The source browns the beef; browning is not a doneness check for mince, so use the adapted measured endpoint below. The 2 tablespoons of red wine vinegar are listed but never added in the numbered method; that gap is kept visible rather than inventing a step. The steamed rice, sautéed plantains and black beans the source serves it over are unquantified serving suggestions and are not included in the groceries. The olive oil is a divided total (2 tablespoons to brown, the remainder for the vegetables) per the source method.', grocery: 'Source gap: vinegar has no method step; rice, plantains and beans to serve not included' },
  'wikibooks:garlic-pork-chops-black-mushrooms': { summary: 'Adapted pork endpoint; source names pork broth in the list and chicken broth in the method', detail: 'The ingredient line says 1 cup pork broth while the method says chicken broth; both wordings are kept verbatim as a visible source inconsistency rather than silently picking one. The ½-inch chops brown 2 minutes per side and simmer briefly; use the adapted side-probe endpoint below, not time. The dried chanterelles simmer 10 minutes to rehydrate per the source. Rice-wine vinegar contains trace alcohol from fermentation; no alcohol-free claim is made. Broth and soy-sauce formulations are unverified.', grocery: 'Broth named two ways (pork in list, chicken in method); ½-inch chops' },
  'wikibooks:honey-peppered-salmon': { summary: 'Adapted salmon endpoint replacing "desired doneness"', detail: 'The source bakes the fillets 10–12 minutes or "until desired doneness"; use the adapted measured endpoint below instead. The marinade stands at room temperature for 30 minutes per the source; if you marinate longer, refrigerate at 5°C or colder. The used marinade contacted raw fish: do not reuse it as a sauce.', grocery: 'Marinate 30 minutes at room temperature only; discard used marinade' },
  'wikibooks:lemon-rosemary-pork-tenderloin': { summary: 'Source thermometer endpoint kept; NSW alignment noted', detail: 'The source cooks the tenderloins to an internal 160°F (70°C) measured with a meat thermometer; that endpoint wording is kept unchanged. NSW guidance names 71°C for pork; 160°F converts to 71.1°C, so the source Fahrenheit target already matches the NSW figure and its "(70°C)" is the source\'s own rounding. No change to the source endpoint is implied or made. The 2 tenderloins total 2 lb (900 g) per the source.', grocery: 'Source endpoint 160°F kept; a meat thermometer is required' },
  'wikibooks:maple-planked-salmon': { summary: 'Adapted salmon endpoint; cedar-plank fire care', detail: 'The source grills to "desired doneness" and until the flesh loses transparency; use the adapted measured endpoint below instead. Cedar planks must be fully soaked first and can smoulder or catch on a grill: keep the lid closed, keep a spray bottle of water nearby, follow the grill manufacturer directions, and check current local fire restrictions before lighting; no current restriction status is checked by this recipe. The source step to immerse the used plank in water afterwards is kept. The chipotle-barbecue-sauce substitution for chipotle powder is a source alternative. The resting marinade contacts raw fish; do not reuse it.', grocery: 'Soak planks first; check fire restrictions before grilling; discard used marinade' },
  'wikibooks:meatloaf-iv': { summary: 'Adapted mince endpoint; Worcestershire formulation unverified', detail: 'The source bakes "75 minutes or more, if desired"; time is not a doneness check for ground beef, so use the adapted measured endpoint below in the centre of the loaf. The Worcestershire sauce is a manufactured product whose formulation (it typically contains anchovies) is unverified, so diet rests on the explicit beef line only. The ketchup topping is a source ½-cup-or-more quantity, kept as written. The cooking spray is a process line.', grocery: 'Worcestershire formulation unverified (typically contains anchovies); ketchup is ½ cup or more' },
  'wikibooks:mediterranean-green-chicken': { summary: 'Adapted poultry endpoint replacing juices-run-clear', detail: 'The source bakes the pieces "until juices run clear"; juices are not a doneness check, so use the adapted measured endpoint below in the thickest part of each piece, avoiding bone. The source marinades refrigerated for an hour; that step is kept. The used marinade contacted raw chicken: do not reuse it. The whole-chicken-or-8-pieces line is a source alternative, both covered by the source method.', grocery: 'Marinade is single-use; whole bird or 8 pieces both work' },
  'wikibooks:poppyseed-chicken': { summary: 'Uses pre-cooked chicken; adapted heat-through check', detail: 'The 4 chicken breast pieces are already boiled and diced: prepare them safely fresh, or use leftovers with a known safe cooling and storage history (handling note below). The source bakes 25 minutes; because the chicken is pre-cooked, the check is that the casserole is steaming hot throughout (at least 60°C in the centre) per the adapted step below. The mayonnaise, sour cream, cheddar, crackers and butter are manufactured products whose formulations are unverified.', grocery: 'Cooked chicken must be safely prepared or stored; cracker and mayo formulations unverified', handling: 'Two Plates handling note (not a change to the source method): the boiled chicken must be freshly and safely cooked, or refrigerated leftovers with a known safe history: cooled promptly in small portions, covered, refrigerated below 5°C within 2 hours and used within 2 days. Count all time between 5°C and 60°C cumulatively: under 2 hours, use or refrigerate; 2 to 4 hours, use immediately or discard, not refrigerate for later; after 4 hours, discard. Reheat leftovers only once, until steaming hot throughout (at least 60°C). Reheating does not repair unsafe or unknown storage.', handlingUrl: 'https://www.foodauthority.nsw.gov.au/consumer/special-care-foods/leftovers', handlingLabel: 'NSW leftovers guidance' },
  'wikibooks:schweinsbraten': { summary: 'Adapted: do not wash the pork; probe endpoint replaces juice colour', detail: 'The source washes the meat first; the adapted step below replaces that with patting dry, because washing raw meat spreads bacteria around the sink and does not make it safer (FSANZ guidance). The source endpoint "only juice oozes out (no blood)" is a colour cue; use the adapted measured endpoint below in the thickest part instead. The pork cut is unspecified: one 1.5 kg piece per the source. The 12 oz of lager stays in the dish (basting and sauce); no alcohol-free claim is made. The salt and pepper carry source "or to taste" notes.', grocery: 'Contains a bottle of beer; no alcohol-free claim; pork cut unspecified (1.5 kg piece)' },
  'wikibooks:shrimp-scampi-angel-hair': { summary: 'Frozen scampi cooks per its package; formulation unverified', detail: 'The shrimp scampi is a packaged frozen product: its package directions govern the cooking of the shrimp and sauce, and its formulation is unverified beyond the named shrimp. The pasta cooks per its own package; the pasta water is an unquantified process medium. Parsley, pine nuts and lemon zest are fresh source lines; the pine nuts are toasted per the source.', grocery: 'Scampi doneness follows its package; pasta cooks per its package' },
  'wikibooks:simple-italian-sausage-spaghetti': { summary: 'Adapted sausage endpoint; contains wine; species unstated', detail: 'The source cooks the crumbled sausage "until cooked through"; use the adapted measured endpoint below rather than appearance. The Italian sausage species (pork, beef, chicken or other) is not stated, so diet stays unclassified. The ½ cup of red or dry white wine stays in the sauce; no alcohol-free claim is made. The "½ cups" wording is the source quantity line, kept verbatim. Parmesan formulation is unverified.', grocery: 'Sausage species unstated; contains ½ cup wine; no alcohol-free claim' },
  'wikibooks:spicy-chicken-cutlets': { summary: 'Adapted endpoint for thin cutlets; optional vodka stays', detail: 'The breasts are thinly sliced; "cooked through" after 2–3 minutes a side is not a doneness check, so use the adapted side-probe endpoint below. The ¼ cup vodka or vermouth is marked optional in the source; when used it stays in the pan sauce and no alcohol-free claim is made. The source holds the cooked cutlets in a 200°F (about 95°C) oven while the sauce cooks; keep that hold short. The cornstarch-and-water line is a combined slurry measure per the source.', grocery: 'Vodka or vermouth optional; when used, no alcohol-free claim' },
  'wikibooks:sweet-italian-sausage-skillet': { summary: 'Adapted sausage endpoint; species unstated', detail: 'The source browns the sliced sausage for 5 minutes; time and browning are not a doneness check, so use the adapted measured endpoint below. The sweet Italian sausage species is not stated, so diet stays unclassified. The rotini measure (2 cups) is the dry pasta, cooked per its package. The provolone-or-mozzarella line is a source alternative, both covered by the source method. Broth formulation is unverified.', grocery: 'Sausage species unstated; pasta measure is dry; provolone or mozzarella both work' },
  'wikibooks:tuna-glop': { summary: 'Canned soup and chip formulations unverified', detail: 'The cream of mushroom soup is a manufactured product whose formulation is unverified; the explicit chunk tuna sets the dish non-vegetarian. The 2 cups of macaroni is the dry measure, cooked per its package. The frozen vegetables (peas and carrots suggested) and crushed potato chips are source lines, kept as written.', grocery: 'Soup and chip formulations unverified; macaroni measure is dry' },
  'wikibooks:wine-roasted-pork-roast': { summary: 'Campfire cooking; adapted pork endpoint; contains red wine', detail: 'This is cooked over a campfire in a Dutch oven: check current local fire restrictions before lighting, keep the fire managed, and follow the fire-safety note; no current restriction status is checked by this recipe. The source cooks "slowly for three hours"; fire heat varies and time is not a doneness check, so use the adapted measured endpoint below in the thickest part of the roast. The 1½ cups of red wine stay in the dish; no alcohol-free claim is made. The Montreal steak seasoning is a manufactured blend whose formulation is unverified.', grocery: 'Campfire: check fire restrictions first; contains 1½ cups red wine; no alcohol-free claim' },
  'wikibooks:bean-and-bacon-bake': {
    summary: 'Microwave recipe; single potato weight is a source range',
    detail: 'The whole recipe cooks in a microwave; follow your microwave manufacturer directions, including standing time, and stir for even heating. The potato is one 10–12 oz / 280–340 g medium potato, a source range kept unchanged. The bacon line is a source alternative: 6 strips cooked until crisp, or microwave-ready fully cooked bacon; both are covered by the source method.',
    grocery: 'Microwave recipe; bacon or microwave-ready bacon both work'
  },
  'wikibooks:brown-rice-casserole': {
    summary: 'Uses already-cooked brown rice; processed cheese formulation unverified',
    detail: 'The 3 cups of brown rice are already cooked: cook fresh or use safely stored leftovers (handling note below). The processed cheese is a manufactured product whose formulation (including rennet) is unverified, so diet stays unclassified. Cooking spray for the dish is an unquantified process line.',
    grocery: 'Cooked rice must be fresh or safely stored; processed cheese formulation unverified',
    handling: 'Two Plates handling note (not a change to the source method): cooked rice carries Bacillus cereus risk when warm-held. Cook the rice fresh, or use leftovers with a known safe history: cooled promptly in small portions, covered, refrigerated below 5°C within 2 hours and used within 2 days. Count all time between 5°C and 60°C cumulatively: under 2 hours, use or refrigerate; 2 to 4 hours, use immediately or discard, not refrigerate for later; after 4 hours, discard. Reheat only once, until steaming hot throughout (at least 60°C).',
    handlingUrl: 'https://www.foodauthority.nsw.gov.au/consumer/special-care-foods/leftovers',
    handlingLabel: 'NSW leftovers guidance'
  },
  'wikibooks:cazuela-gallega': {
    summary: 'Single-serve baked egg dish; ham is cured, the egg must set',
    detail: 'A one-serving casserole baked in a foil casing per the source. The ham is a cured, ready-to-eat product per the source presentation; the egg is raw going in and must be fully set, so use the adapted egg endpoint below. The source method adds a pinch of salt not in the ingredient list; that gap is kept visible. Parmesan formulation (rennet) is unverified.',
    grocery: 'The egg must be fully set; ham formulation unverified'
  },
  'wikibooks:chuck-wagon-beans': {
    summary: 'Adapted mince endpoint replacing "no longer pink"',
    detail: 'The source browns the ground chuck until "no longer pink"; colour is not a doneness check for mince, so use the adapted measured endpoint below. The canned pork-and-beans (32 oz), barbecue sauce and molasses are source quantities, kept as written; can contents and sauce formulations are unverified. The bacon is cooked with the beef per the source.',
    grocery: 'Barbecue sauce and canned beans formulations unverified'
  },
  'wikibooks:cioppino-italian-seafood-stew': {
    summary: 'Adapted seafood endpoint; live mussels; contains wine',
    detail: 'The source simmers until the fish "flakes easily"; flaking is a texture cue, not a measured endpoint, so use the adapted endpoint below in the thickest fish pieces. The mussels go in live: scrub and debeard them, discard any with broken shells or that stay open when tapped before cooking, and discard any that stay closed after cooking. The 1½ cups of white wine stay in the stew; no alcohol-free claim is made. Clam juice and fish stock formulations are unverified. The sourdough loaves are a notes-only accompaniment and are not included in the groceries. Red pepper flakes beyond the listed ¾ tsp are to taste at serving.',
    grocery: 'Live mussels need sorting before and after cooking; contains white wine; no alcohol-free claim'
  },
  'wikibooks:corny-souffle': {
    summary: 'Egg dish: bake until fully set',
    detail: 'A blender batter of corn, eggs and milk, baked in a casserole. The egg matrix must be fully set: use the adapted egg endpoint below rather than colour alone. Milk formulation is unverified.',
    grocery: 'The souffle must be fully set; milk formulation unverified'
  },
  'wikibooks:crock-pot-beef-stew': {
    summary: '12-hour slow cooker; tomato can size unstated',
    detail: 'The source cooks 12 hours in a slow cooker; follow your slow-cooker manufacturer directions, and keep the stew above 60°C once cooked until serving. The "1 large can tomatoes" size is genuinely unstated in the source and stays that way. The whole-clove-or-ground-cloves line is a source alternative, both covered by the method. The tapioca thickens the stew per the source.',
    grocery: 'Slow-cooker recipe; large tomato can size not stated',
    handling: 'Two Plates handling note (not a change to the source method): cool leftovers promptly in small portions, cover and refrigerate below 5°C within 2 hours, eat within 2 days, and reheat only once until steaming hot throughout (at least 60°C). Count all time between 5°C and 60°C cumulatively: under 2 hours, use or refrigerate; 2 to 4 hours, use immediately or discard, not refrigerate for later; after 4 hours, discard.',
    handlingUrl: 'https://www.foodauthority.nsw.gov.au/consumer/special-care-foods/leftovers',
    handlingLabel: 'NSW leftovers guidance'
  },
  'wikibooks:cucumber-sprout-sandwich': {
    summary: 'Raw sprouts: ready-to-eat produce care',
    detail: 'Alfalfa sprouts are eaten raw: buy them fresh and refrigerated, keep them at 5°C or colder, rinse under running water just before use, and do not serve raw sprouts to anyone pregnant, elderly, very young or immunocompromised. Cream cheese and mayonnaise formulations are unverified, so diet stays unclassified.',
    grocery: 'Raw sprouts need extra care and are not for at-risk diners; cream cheese formulation unverified'
  },
  'wikibooks:dutch-oven-beans': {
    summary: 'Campfire Dutch oven; adapted mince endpoint; contains liquid smoke',
    detail: 'The source cooks over campfire coals; never leave the fire unattended, follow the fire-safety note below, and check current local fire restrictions before lighting; no current restriction status is checked by this recipe. The source browns the ground beef; browning is not a doneness check for mince, so use the adapted measured endpoint below. Liquid smoke is a manufactured product whose formulation is unverified.',
    grocery: 'Campfire cooking: see fire-safety note; liquid smoke formulation unverified'
  },
  'wikibooks:fabes-con-almejas': {
    summary: 'Live clams; dried beans soak overnight',
    detail: 'The 24 clams go in live: scrub them, discard any with broken shells or that stay open when tapped before cooking, and discard any that stay closed after cooking; adapted measured endpoint below for the broth. The dried fabes (or large white beans) soak overnight per the source. Saffron-or-food-coloring is a source alternative. Salt is "as needed" per the source. Ham formulation is unverified, so diet rests on the explicit clam line.',
    grocery: 'Live clams need sorting before and after cooking; beans soak overnight'
  },
  'wikibooks:keralan-vegetable-stew': {
    summary: 'Source gap: vinegar listed but never used; two coconut pressings',
    detail: 'The source lists 1 tbsp vinegar but its numbered method never adds it; that gap is kept visible rather than inventing a step. The method presses two batches of coconut milk from the grated coconut with ¾ cup and ½ cup of water; that water is an unlisted process quantity, kept visible. The flour-or-rice-flour-or-cornstarch line is a source alternative (the method calls it maida/rice flour), all covered by the method.',
    grocery: 'Source gap: vinegar has no method step; coconut-milk water is unlisted in the source'
  },
  'wikibooks:macaroni-pie': {
    summary: 'Cheese formulation unverified; breadcrumbs unquantified',
    detail: 'The grated cheese is a manufactured product whose formulation (including rennet) is unverified, so diet stays unclassified despite the source categories. The breadcrumbs are listed without a quantity, kept that way. The one pat of butter is the source wording, kept verbatim. The pie is done when a fork or skewer pressed all the way through comes out dry per the source; use the adapted egg-set endpoint below as the measured check.',
    grocery: 'Cheese formulation unverified; breadcrumbs quantity not stated'
  },
  'wikibooks:malvani-chicken-curry': {
    summary: 'Adapted poultry endpoint; water amount at your discretion',
    detail: 'The source cooks the marinated chicken about 25 minutes "until tender and fully cooked"; time and tenderness are not measured doneness checks, so use the adapted measured endpoint below. The water is added "according to the desired level of consistency", genuinely unquantified in the source, kept that way. Salt is to taste per the source. Malvani Special Masala is a manufactured blend whose formulation is unverified.',
    grocery: 'Water amount not stated; Malvani masala blend formulation unverified'
  },
  'wikibooks:meatless-sloppy-joes': {
    summary: 'Source name says meatless; product formulations unverified; uses cooked rice',
    detail: 'The source names this meatless and files it as vegetarian, but the canned chili beans, hickory barbecue sauce and buns are manufactured products whose formulations are unverified (barbecue sauce can contain anchovy-derived ingredients), so diet stays unclassified and the source claim is displayed as unverified. The 1½ cups of brown rice are already cooked: cook fresh or use safely stored leftovers (handling note below). The chili-bean can size and bun count are unstated in the source.',
    grocery: 'Cooked rice must be fresh or safely stored; sauce and bean formulations unverified despite the source name',
    handling: 'Two Plates handling note (not a change to the source method): cooked rice carries Bacillus cereus risk when warm-held. Cook the rice fresh, or use leftovers with a known safe history: cooled promptly in small portions, covered, refrigerated below 5°C within 2 hours and used within 2 days. Count all time between 5°C and 60°C cumulatively: under 2 hours, use or refrigerate; 2 to 4 hours, use immediately or discard, not refrigerate for later; after 4 hours, discard. Reheat only once, until steaming hot throughout (at least 60°C).',
    handlingUrl: 'https://www.foodauthority.nsw.gov.au/consumer/special-care-foods/leftovers',
    handlingLabel: 'NSW leftovers guidance'
  },
  'wikibooks:mini-three-cheese-english-muffin-pizzas': {
    summary: 'Frankfurter species unstated; Parmesan unquantified; butter not listed',
    detail: 'The frankfurters are a manufactured sausage whose species (pork, beef, chicken or other) is not stated, so diet stays unclassified and the sausage fails closed against any meat exclusion. The grated Parmesan has no quantity in the source, kept that way. The muffins are buttered per the method but butter is not in the ingredient list; that gap is kept visible. Frankfurters are pre-cooked products; the bake heats everything through. Broiler use per your oven manufacturer directions.',
    grocery: 'Frankfurter species unstated; Parmesan quantity not stated'
  },
  'wikibooks:mozzarella-tuna-melts': {
    summary: 'Canned tuna; mayonnaise formulation unverified',
    detail: 'The water-packed canned tuna is drained and flaked per the source; the 6 oz can is a source quantity. The mayonnaise and mozzarella are manufactured products whose formulations are unverified; diet rests on the explicit tuna line. Broil per your oven manufacturer directions until the cheese melts per the source.',
    grocery: 'Mayonnaise formulation unverified; canned tuna, drained'
  },
  'wikibooks:parmesan-cheese-souffle': {
    summary: 'Source category says vegetarian; Parmesan rennet unverified',
    detail: 'The source files this as vegetarian, but Parmesan is a manufactured cheese whose rennet is unverified, so diet stays unclassified and the source claim is displayed as unverified. The egg whites are folded in raw and the souffle bakes 1 to 1½ hours; the interior must be cooked through, so use the adapted egg endpoint below rather than rise and colour alone. Sour-cream formulation is unverified.',
    grocery: 'Parmesan rennet unverified despite the source category; souffle must cook through'
  },
  'wikibooks:mostaccioli': {
    summary: 'Adapted mince and sausage endpoint; sausage species unstated',
    detail: 'The source browns the beef and sausage together; browning is not a doneness check for mince or sausage meat, so use the adapted measured endpoint below. The Italian sausage species (pork, beef, chicken or other) is not stated, so diet stays unclassified and the dish fails closed against pork, beef and other meat exclusions. Ricotta and Parmesan formulations (rennet) are unverified. The two dashes (sugar, black pepper) are source wording, kept verbatim.',
    grocery: 'Sausage species unstated: fails closed against meat exclusions; cheese formulations unverified'
  },
  'wikibooks:potato-chickpea-curry': {
    summary: 'Serving rice not included; coconut-milk formulation unverified',
    detail: 'The source serves this with basmati rice "or whatever you prefer", an unquantified serving suggestion that is not included in the groceries. The canned coconut milk and chickpeas are source quantities; the coconut-milk formulation is unverified. Curry-powder blend formulation is unverified.',
    grocery: 'Rice to serve not included; coconut milk formulation unverified'
  },
  'wikibooks:potato-curry-aloo-masala': {
    summary: 'Chana dhal optional; salt quantity listed but method says to taste',
    detail: 'The ½ tablespoon of chana dhal is marked optional in the source. The list gives ½ teaspoon salt while the method seasons "with salt to taste"; both wordings are kept verbatim as a visible source inconsistency rather than silently picking one. The potatoes are par-boiled before they go in per the source.',
    grocery: 'Chana dhal optional; salt listed as ½ tsp, method says to taste'
  },
  'wikibooks:radish-pie': {
    summary: 'Contains sherry; egg custard must set; goat cheese formulation unverified',
    detail: 'The 2 tablespoons of dry sherry stay in the filling; no alcohol-free claim is made. The eggs, extra yolk and cream form a custard that must be fully set; the source timing (20 minutes plus 15–20 with the walnuts) is kept, and the adapted egg-set endpoint below is the measured check. Goat-cheese formulation (rennet) is unverified, so diet stays unclassified despite the source category. The source notes the radishes can be baked a day ahead and refrigerated; follow the leftover handling times below if you do. The 1–2 bunches of radishes are a source range.',
    grocery: 'Contains sherry; no alcohol-free claim; goat cheese formulation unverified',
    handling: 'Two Plates handling note (not a change to the source method): cool leftovers promptly in small portions, cover and refrigerate below 5°C within 2 hours, eat within 2 days, and reheat only once until steaming hot throughout (at least 60°C). Count all time between 5°C and 60°C cumulatively: under 2 hours, use or refrigerate; 2 to 4 hours, use immediately or discard, not refrigerate for later; after 4 hours, discard.',
    handlingUrl: 'https://www.foodauthority.nsw.gov.au/consumer/special-care-foods/leftovers',
    handlingLabel: 'NSW leftovers guidance'
  },
  'wikibooks:reuben-sandwich': {
    summary: 'Corned beef and dressing formulations unverified',
    detail: 'The corned beef is a manufactured cured product and the Russian dressing a manufactured sauce; both formulations are unverified, so diet rests on the explicit corned-beef line. The pastrami alternative and the sourdough-for-rye-allergy swap are source alternatives, both covered by the method. The chopped parsley has no quantity, kept that way. Grill until lightly browned per the source; the cheese melts in the same step.',
    grocery: 'Corned beef and Russian dressing formulations unverified; 1–3 cheese slices is a source range'
  },
  'wikibooks:risotto-alla-milanese': {
    summary: 'Contains wine; broth formulation unverified; 6-8 servings is a large batch',
    detail: 'The ½ cup of dry white wine stays in the risotto; no alcohol-free claim is made. The chicken broth is a manufactured product whose formulation is unverified, so diet stays unclassified; the source notes vegetable broth may be substituted. The butter-or-margarine line is a divided total (6 tbsp then 1 tbsp) per the source. The optional parsley-and-tomato garnish has no quantities. Parmesan formulation (rennet) is unverified.',
    grocery: 'Contains white wine; no alcohol-free claim; broth formulation unverified'
  },
  'wikibooks:sloppy-joes': {
    summary: 'Adapted mince endpoint; buns not in the ingredient list',
    detail: 'The source browns the ground beef; browning is not a doneness check for mince, so use the adapted measured endpoint below. The hamburger buns appear only in the serving step, not the ingredient list; that gap is kept visible and the buns are not included in the groceries. Ketchup and barbecue-sauce formulations are unverified (barbecue sauce can contain anchovy-derived ingredients); diet rests on the explicit beef line. Onion and green pepper are optional per the source.',
    grocery: 'Buns not included (serving step only); sauce formulations unverified'
  },
  'wikibooks:spaghetti-bake': {
    summary: 'Adapted mince endpoint; turkey or beef both work',
    detail: 'The ground-turkey-or-beef line is a source alternative, both covered by the source method, so the dish is non-vegetarian with the species open and the endpoint below is species-aware (75°C for turkey, 71°C for beef). The source sautés the meat "when cooked through"; use the adapted measured endpoint, not time. Cooking spray for the dish is an unlisted process line, kept visible. The spaghetti-sauce jar, cream cheese, cottage cheese and sour cream are manufactured products whose formulations are unverified.',
    grocery: 'Turkey or beef: check 75°C for turkey, 71°C for beef; dairy formulations unverified'
  },
  'wikibooks:tripes-a-la-mode-de-caen': {
    summary: 'Contains brandy and wine; 10-12 hour bake; salt and pepper unquantified',
    detail: 'The 1 cup of apple brandy and 2 cups of wine stay in the dish; no alcohol-free claim is made. The method bakes 10–12 hours while the infobox says 25 minutes; both source wordings are kept verbatim, and the 25 minutes is treated as preparation. Salt and pepper are listed without quantities, kept that way. Ask your butcher for the tripe pre-cleaned and prepared for cooking; the calf\'s foot and marrow bone go in whole and the bones are removed before serving per the source. Beef-broth formulation is unverified.',
    grocery: 'Contains brandy and wine; no alcohol-free claim; ask the butcher for prepared tripe'
  },
  'wikibooks:yetsom-shiro': {
    summary: 'Serving injera or rice not included; broth formulation unverified',
    detail: 'The source serves the stew with injera or rice; those are unquantified serving suggestions and are not included in the groceries. The vegetable-broth-or-water line is a source alternative, both covered by the source method; the broth formulation is unverified, so use the water option if avoiding manufactured products. Berbere is a manufactured spice blend whose formulation is unverified. Salt is to taste per the source.',
    grocery: 'Injera or rice to serve not included; berbere blend formulation unverified'
  },
  'wikibooks:yogurt-curry-soup-kadhi': {
    summary: 'Sweet Gujarati kadhi; yogurt formulation unverified',
    detail: 'A sweet style of kadhi per the source; the source notes northern-Indian versions are less sweet, so the 2 tbsp of sugar is the source quantity, kept unchanged. The yogurt (curds/dahi) is a manufactured product whose formulation is unverified. The 3 teacups of water are the source wording, kept verbatim. The tempering (ghee, cumin, mustard, asafoetida, red chilli) is added at the end per the source.',
    grocery: 'A sweet kadhi; yogurt formulation unverified'
  },

  'wikibooks:baked-penne': {
    summary: 'Raw egg whites folded in; cheeses formulation unverified; 1 gallon pasta water',
    detail: 'The egg whites are folded in raw and the dish bakes in two stages; use the adapted egg endpoint below rather than the browned top alone. The ricotta and mozzarella are manufactured products whose formulations (including rennet) are unverified, so diet stays unclassified. The 1 gallon of salted boiling water is a process quantity, kept verbatim; the gram figures in parentheses are the source conversions.',
    grocery: 'Egg whites go in raw; cheese formulations unverified'
  },
  'wikibooks:beanburger': {
    summary: 'Source vegetarian; optional egg omission frays the burger; frying oil unlisted',
    detail: 'The source files this vegetarian and notes the egg can be left out for a vegan version, but the burger breaks and frays more in the pan without it; both wordings are kept. The method fries in "a little bit of oil", which is not in the ingredient list; that process-medium gap is kept visible. The 2 tins of mixed beans have no stated tin size. Cumin, coriander, chilli, paprika and turmeric are one generous pinch each per the source.',
    grocery: 'Tin size for the beans not stated; frying oil not listed'
  },
  'wikibooks:chanterelle-goulash': {
    summary: 'Salt and pepper unquantified; butter-or-oil alternative; sour cream formulation unverified',
    detail: 'Salt and pepper are listed without quantities, kept that way. The butter-or-oil line is a source alternative, both covered by the method. Sour cream and butter are dairy products whose formulations are unverified, so diet rests on the plant and dairy lines and stays unclassified as vegetarian-safe without that check.',
    grocery: 'Salt and pepper quantities not stated; sour cream formulation unverified'
  },
  'wikibooks:chicken-bacon-broccoli-alfredo-spaghetti': {
    summary: 'Adapted poultry endpoint; Parmesan formulation unverified',
    detail: 'The source cooks the chopped chicken "for 4 minutes until cooked"; time is not a doneness check, so use the adapted measured endpoint below. The Parmesan is a manufactured cheese whose rennet is unverified, so diet rests on the explicit chicken and bacon lines. Milk formulation is unverified.',
    grocery: 'Chicken must reach 75°C; Parmesan rennet unverified'
  },
  'wikibooks:chicken-tetrazzini': {
    summary: 'Uses already-cooked rotisserie chicken; breadcrumbs and Parmesan formulations unverified',
    detail: 'The 4 cups of rotisserie chicken are already cooked: use a freshly cooked chicken or safely stored leftovers (handling note below). The source notes the dish can be assembled ahead and refrigerated before baking; follow the same leftover times. Chicken broth and Parmesan formulations are unverified. Salt and black pepper are listed without quantities.',
    grocery: 'Cooked chicken must be fresh or safely stored; broth formulation unverified',
    handling: 'Two Plates handling note (not a change to the source method): cool leftovers promptly in small portions, cover and refrigerate below 5°C within 2 hours, and use within 2 days. Count all time between 5°C and 60°C cumulatively: under 2 hours, use or refrigerate; 2 to 4 hours, use immediately; over 4 hours, discard. Reheat only once, until steaming hot throughout (at least 60°C).',
    handlingUrl: 'https://www.foodauthority.nsw.gov.au/consumer/special-care-foods/leftovers',
    handlingLabel: 'NSW leftovers guidance'
  },
  'wikibooks:corn-chowder-i': {
    summary: 'Bouillon formulation unverified; salt and pepper to taste',
    detail: 'The chicken bouillon cubes, milk and light cream are manufactured products whose formulations are unverified, so diet stays unclassified. Salt and pepper are to taste per the source. The source notes evaporated or powdered milk can be substituted when cooking outdoors.',
    grocery: 'Bouillon formulation unverified; salt and pepper to taste'
  },
  'wikibooks:gambas-al-ajillo-garlic-shrimp': {
    summary: 'Contains sherry or cognac; adapted shrimp endpoint',
    detail: 'The 2–3 oz of dry sherry stays in the dish and the source allows substituting cognac; no alcohol-free claim is made. The source cooks until the shrimp turn pink and curl; colour is not a measured check, so use the adapted endpoint below. Salt and pepper are added to taste at serving per the source.',
    grocery: 'Contains sherry or cognac; no alcohol-free claim'
  },
  'wikibooks:garlic-parmesan-pasta': {
    summary: 'Parmesan quantity not stated; pasta and broccoli pre-cooked; source vegetarian',
    detail: 'The Parmesan is listed without a quantity, kept that way. The pasta and broccoli are cooked before they enter the recipe per the source. The source notes cooked chicken or shrimp may be added; those are optional serving additions not in the ingredient list. Parmesan and butter formulations are unverified; the source vegetarian category is displayed as an unverified claim.',
    grocery: 'Parmesan quantity not stated; pasta and broccoli must be cooked first'
  },
  'wikibooks:hutspot-dutch-mashed-vegetables': {
    summary: 'Cheese, salt and pepper "to your liking"; ham explicit',
    detail: 'The source adds cheese, salt and pepper "to your liking" without types or quantities, kept visible. The cubed ham is a cured pork product whose formulation is unverified; diet rests on the explicit ham line. This is a large batch (5 lb potatoes, 3½ lb carrots, 2 lb onions) per the source, traditionally served as a main.',
    grocery: 'Cheese type and quantity not stated; ham formulation unverified'
  },
  'wikibooks:jambons': {
    summary: 'Ham and cheese pastries; egg glaze baked on',
    detail: 'The diced ham is a cured pork product and the cheese a manufactured product whose formulations are unverified; diet rests on the explicit ham line. The puff pastry is pre-prepared per the source. The egg glaze is brushed on raw and sets during the 20–25 minute bake per the source.',
    grocery: 'Ham and cheese formulations unverified; 6–9 servings is a source range'
  },
  'wikibooks:manx-smoked-salmon': {
    summary: 'Cold-set cream terrine; boiled kippers and ready-to-eat smoked salmon',
    detail: 'The kippers are boiled, then blended with cream and never cooked again: keep the terrine refrigerated and serve well chilled (see the adapted note below). The smoked salmon is a ready-to-eat cured product; follow its package storage and use-by directions. Cream formulation is unverified. The 500–600 ml of cream and ¼–½ cucumber are source ranges.',
    grocery: 'Keep the finished terrine refrigerated; smoked salmon is ready-to-eat',
    handling: 'Two Plates handling note (not a change to the source method): cool leftovers promptly in small portions, cover and refrigerate below 5°C within 2 hours, and use within 2 days. Count all time between 5°C and 60°C cumulatively: under 2 hours, use or refrigerate; 2 to 4 hours, use immediately; over 4 hours, discard. Reheat only once, until steaming hot throughout (at least 60°C).',
    handlingUrl: 'https://www.foodauthority.nsw.gov.au/consumer/special-care-foods/leftovers',
    handlingLabel: 'NSW leftovers guidance'
  },
  'wikibooks:menemen-eggs-with-onion-green-pepper-and-tomato': {
    summary: 'Adapted egg endpoint; Turkish bread to serve not included; source vegetarian',
    detail: 'The source stirs the eggs "until cooked"; use the adapted egg endpoint below as the measured check. The Turkish bread in the serving step is an unquantified accompaniment and is not included in the groceries. The oregano and paprika are optional per the source. The source vegetarian category is displayed as an unverified claim.',
    grocery: 'Bread to serve not included; eggs must be fully set'
  },
  'wikibooks:ossobuco-alla-milanese': {
    summary: 'Contains wine; two-hour braise; anchovies explicit',
    detail: 'The 240 ml of dry white wine (or white vermouth, a source alternative) stays in the dish; no alcohol-free claim is made. The veal shanks braise about 2 hours until fork tender and falling from the bone per the source, a long covered braise. The anchovies are explicit; meat broth formulation is unverified, so diet rests on the explicit veal and anchovy lines. Flour, salt and pepper are listed without quantities. The source notes gremolata and a risotto accompaniment; those are notes-only and not in the groceries.',
    grocery: 'Contains wine; no alcohol-free claim; broth formulation unverified'
  },
  'wikibooks:paella-valenciana': {
    summary: 'Species-open poultry; adapted endpoint; large pan and heat source needed',
    detail: 'The rabbit-or-duck line is a source alternative; both are treated with the poultry endpoint below. The 24 boiled snails are optional and already cooked. The saffron-and/or-food-coloring line is a source alternative. The source needs a 38 cm paellera and a wide heat source; the equipment list is kept in the source record. The rosemary is swept through the broth and used again as a cover per the source. Water quantity (2 litres) is the source figure for this rice quantity.',
    grocery: 'Rabbit or duck; snails optional; needs a wide pan and heat source'
  },
  'wikibooks:pan-de-jamon': {
    summary: 'Cured ham bread; long rise and bake; 3.5 hours total',
    detail: 'The thin-sliced cured ham is a ready-to-eat product whose formulation is unverified; diet rests on the explicit ham line. The dough rises twice (about 90 and 40 minutes) before a 30–40 minute bake per the source. The egg-sugar glaze goes on raw and sets in the bake. Raisins and pimento-stuffed olives formulations are unverified.',
    grocery: 'Cured ham formulation unverified; plan for two rises'
  },
  'wikibooks:rice-with-tofu-and-nuts': {
    summary: 'Whole spices discarded, not eaten; source vegan',
    detail: 'The bay leaf, peppercorns, cinnamon and cloves are whole spices the source intends to be discarded, not eaten. The tofu is shallow-fried per the source. The source files this vegan; tofu formulation is unverified, so the claim is displayed as unverified. Servings "prose: serves 1" is the source wording, kept verbatim.',
    grocery: 'Whole spices are discarded before serving; tofu formulation unverified'
  },
  'wikibooks:salmon-spaghetti': {
    summary: 'Smoked-or-fresh salmon alternative; contains wine; adapted endpoint',
    detail: 'The smoked-or-fresh salmon line is a source alternative: fresh salmon uses the adapted measured endpoint below; smoked salmon is ready-to-eat and only warms through. The ½ cup of white wine stays in the sauce; no alcohol-free claim is made. Cream and crème fraîche formulations are unverified. The source cautions on salt with smoked salmon; that wording is kept.',
    grocery: 'Contains white wine; no alcohol-free claim; fresh salmon must reach 63°C'
  },
  'wikibooks:southwest-pasta': {
    summary: 'Source vegan; salsa and taco-seasoning formulations unverified',
    detail: 'The source files this vegan, but the salsa, taco seasoning mix and sliced olives are manufactured products whose formulations are unverified, so diet stays unclassified and the claim is displayed as unverified. Salt and pepper are to taste per the source. The dish can be served warm or cold per the source.',
    grocery: 'Salsa and taco-seasoning formulations unverified despite the source vegan category'
  },
  'wikibooks:spaghetti-alla-puttanesca': {
    summary: 'Anchovies explicit with an omit alternative; chilli quantity a source range',
    detail: 'The anchovies are explicit, with the source noting they can be omitted for a Neapolitan version; both wordings are kept, and diet rests on the anchovy line. The 1–3 dried chile peppers are a source range to taste. The source notes Italians do not top this with cheese. Salt is to taste.',
    grocery: 'Anchovies optional only for the Neapolitan version; chilli quantity to taste'
  },
  'wikibooks:spinach-mushroom-pesto-spaghetti': {
    summary: 'Pesto and Parmesan formulations unverified',
    detail: 'The pesto and Parmesan are manufactured products whose formulations (including rennet) are unverified, so diet stays unclassified. The extra Parmesan for sprinkling has no quantity, kept that way.',
    grocery: 'Pesto formulation unverified; extra Parmesan unquantified'
  },
  'wikibooks:stir-fried-seafood-with-noodles': {
    summary: 'Fishball formulation unstated; adapted shrimp endpoint',
    detail: 'The fishballs are a manufactured product whose species and formulation are unstated; diet rests on the explicit shrimp line. The source cooks until the shrimp begin to change colour; use the adapted measured endpoint below. The egg noodles are a manufactured product whose formulation is unverified. The 1 tbsp of salt, 1 tbsp of sugar and 1 tbsp of pepper are source quantities, kept verbatim. Bean sprouts are rinsed in hot water per the source; serve promptly.',
    grocery: 'Fishball species and formulation unstated; egg-noodle formulation unverified'
  },
  'wikibooks:succotash': {
    summary: 'Feast-scale recipe; optional pickled pork; lima beans must boil 10 minutes',
    detail: 'This is a large-batch source recipe (2 quarts of lima beans, 24 ears of corn), kept at source scale. The pickled pork, sugar and butter-or-oil are optional per the source; the pork is a cured product that the source parboils (see the adapted note). The source warns that uncooked lima beans must be boiled at least 10 minutes for toxin safety while canned beans need no cooking; that source wording is kept. Pepper is unquantified.',
    grocery: 'Feast-scale quantities; lima beans need a 10-minute boil if fresh'
  },
  'wikibooks:tomato-basil-sausage-pasta': {
    summary: 'Sausage species unstated; adapted 75°C endpoint',
    detail: 'The sausage meat species (pork, beef, chicken or other) is not stated, so diet stays unclassified and the dish fails closed against meat exclusions; use the adapted species-aware endpoint below. The marinara sauce and milk are manufactured products whose formulations are unverified.',
    grocery: 'Sausage species unstated: fails closed against meat exclusions; marinara formulation unverified'
  },
  'wikibooks:tomato-pasta-with-bacon-onions-and-cheese': {
    summary: 'Smoked bacon explicit; Parmesan formulation unverified; red pepper a wide range',
    detail: 'The smoked bacon is explicit; the Parmesan is a manufactured cheese whose rennet is unverified, so diet rests on the bacon line. The crushed red pepper is a ½ tsp to 1 tbsp source range to taste. The tomato sauce can size (12–16 ounces) is a source range.',
    grocery: 'Tomato sauce 12–16 oz is a source range; Parmesan rennet unverified'
  },
  'wikibooks:tuscan-soup-meatless': {
    summary: 'Title says meatless but the recipe uses chicken broth',
    detail: 'The source titles this "Meatless" and files it vegetarian, but the ingredient list uses 2 cans of chicken broth; that contradiction is kept visible and the dish is non-vegetarian via the broth. The source notes vegetable broth may be substituted. Broth formulation is unverified. Near-neighbour note: a distinct Tuscan bean soup exists in the app; this pasta-and-escarole version is a different composition.',
    grocery: 'Uses chicken broth despite the meatless title; vegetable broth substitution is a source note'
  },
  'wikibooks:zupa-ogorkowa-polish-cucumber-soup': {
    summary: 'Adapted poultry endpoint; salt and pepper unquantified',
    detail: 'The chicken wings simmer per the source; use the adapted measured endpoint below. Salt and pepper are listed without quantities. The celery root is optional, the leek-or-onion is a source alternative, and the cream or half and half finish is optional with yoghurt acceptable but not traditional per the source.',
    grocery: 'Wings must reach 75°C; sour pickled cucumbers, not vinegar pickles'
  },
  'wikibooks:zuppa-toscana': {
    summary: 'Sausage species unstated; adapted 75°C endpoint',
    detail: 'The spicy Italian sausage species is not stated in the ingredient line, so diet stays unclassified and the dish fails closed against meat exclusions; use the adapted species-aware endpoint below. The source notes half mild half spicy turkey sausage can replace pork sausage. Chicken broth and heavy cream formulations are unverified. The bacon is explicit. Salt and pepper are to taste.',
    grocery: 'Sausage species unstated: fails closed against meat exclusions; broth formulation unverified'
  },

  'wikibooks:calzone': {
    summary: 'Optional meat toppings species-open; dough package size unstated',
    detail: 'The optional topping line (ham, bacon, salami, pepperoni, and/or sausage) is a source alternative with species and cured state unstated; diet stays unclassified and the dish fails closed against meat exclusions when a meat topping is used. Raw sausage must be cooked through before sealing (see the adapted note). The store-bought pizza dough package size is not stated. The ricotta and mozzarella formulations (rennet) are unverified. Marinara sauce for serving is an unquantified accompaniment, not in the groceries.',
    grocery: 'Meat topping species unstated; dough package size not stated; marinara to serve not included'
  },
  'wikibooks:fisherman-s-casserole': {
    summary: 'Canned fish and soup formulations unverified',
    detail: 'The canned salmon, cream of celery soup, cheddar, milk and bread crumbs are manufactured products whose formulations are unverified; diet rests on the explicit salmon line. All can and package sizes are source quantities, kept verbatim.',
    grocery: 'Canned-soup formulation unverified; can sizes are source quantities'
  },
  'wikibooks:florida-style-crab-cakes': {
    summary: 'Adapted egg endpoint; mayonnaise formulation unverified',
    detail: 'The egg binder goes in raw and the cakes are pan-fried; use the adapted egg endpoint below rather than colour and time alone. The Florida Bay seasoning blend is defined in the source note, kept as a reference. Mayonnaise formulation is unverified; diet rests on the explicit crab line. Salt and white pepper are to taste.',
    grocery: 'Crab cakes must be cooked through; mayonnaise formulation unverified'
  },
  'wikibooks:pork-burritos-with-green-pepper-sauce': {
    summary: 'Eight-to-ten-hour slow cooker; salsa formulations unverified',
    detail: 'The pork cooks 8–10 hours on low per the source until fork-tender; follow your slow-cooker manufacturer directions. The two salsa jars, tortillas, cheese and lemon pepper seasoning are manufactured products whose formulations are unverified; diet rests on the explicit pork line. The recipe makes 12 burritos at source scale.',
    grocery: 'Slow-cooker recipe; salsa and seasoning formulations unverified',
    handling: 'Two Plates handling note (not a change to the source method): cool leftovers promptly in small portions, cover and refrigerate below 5°C within 2 hours, and use within 2 days. Count all time between 5°C and 60°C cumulatively: under 2 hours, use or refrigerate; 2 to 4 hours, use immediately; over 4 hours, discard. Reheat only once, until steaming hot throughout (at least 60°C).',
    handlingUrl: 'https://www.foodauthority.nsw.gov.au/consumer/special-care-foods/leftovers',
    handlingLabel: 'NSW leftovers guidance'
  },
  'wikibooks:taco-casserole': {
    summary: 'Adapted mince endpoint; seasoning formulation unverified',
    detail: 'The source browns the ground beef; browning is not a doneness check for mince, so use the adapted measured endpoint below. The taco seasoning packet, tomato sauce and shredded cheese are manufactured products whose formulations are unverified; diet rests on the explicit beef line.',
    grocery: 'Beef must reach 71°C; taco-seasoning formulation unverified'
  },
  'wikibooks:tuna-casserole': {
    summary: 'Can and bag sizes unstated; soup formulations unverified',
    detail: 'The tuna cans, the three soup cans, the frozen-vegetable bag, the egg-noodle bag and the topping (onion rings, potato chips or corn flakes, a source alternative) all have sizes unstated in the source, kept that way. The cream soups are manufactured products whose formulations are unverified; diet rests on the explicit tuna line.',
    grocery: 'Tuna, soup, noodle and topping package sizes not stated'
  },

  'wikibooks:banh-chung': {
    summary: 'Long soak and 6-8 hour simmer; banana-leaf wrapping; fish sauce unverified',
    detail: 'A traditional long process: mung beans and sticky rice soak overnight, and the wrapped cakes simmer 6-8 hours in water - the pork belly is fully cooked by that simmer, kept as the source states. Raw pork is handled and marinated before wrapping; keep it refrigerated, avoid cross-contact with the soaked rice and leaves, and wash hands and surfaces. Fish sauce formulation is unverified; diet rests on the explicit pork belly line. Banana leaves are a specialty item. Source servings 10-15 as stated.',
    grocery: 'Banana leaves and sticky rice are specialty items; long overnight soak and 6-8 hour simmer; fish sauce formulation unverified',
    handling: 'Two Plates handling note (not a change to the source method): handle the raw pork belly separately from the soaked rice and leaves, keep it refrigerated until wrapping, and wash hands, boards and knives after contact. Cool the cooked cakes and refrigerate below 5°C within 2 hours; use within 2 days.',
    handlingUrl: 'https://www.foodauthority.nsw.gov.au/consumer/special-care-foods/leftovers',
    handlingLabel: 'NSW leftovers guidance'
  },
  'wikibooks:baked-beans': {
    summary: 'Bacon explicit; canned-beans alternative offered; 3-hour-plus bake',
    detail: 'Salt pork or bacon is explicit in the source; diet rests on that line. The source offers dried beans (soaked overnight) or canned beans as an alternative, kept as stated. Molasses formulation unverified.',
    grocery: 'Dried-bean version needs an overnight soak; bacon or salt pork required'
  },
  'wikibooks:chili-con-bambi': {
    summary: 'Venison mince simmered 3+ hours; cider-or-stock alternative; dried beans must be soaked and cooked',
    detail: 'Minced venison is explicit in the source. The source simmers the chili gently for at least 3 hours, which cooks the mince through, kept as stated. Dry cider or beef stock is a source alternative - with cider there is no alcohol-free claim; the optional stock cube species and formulation are not stated. Dried red kidney beans must be soaked and fully boiled before adding - never add them raw or undercooked (natural kidney-bean toxin); the source requires soaked and cooked beans.',
    grocery: 'Venison mince required; dried kidney beans need soaking and boiling; cider contains alcohol if used'
  },
  'wikibooks:deluxe-burgers': {
    summary: 'Adapted mince endpoint; bacon pre-cooked; steak sauce unverified',
    detail: 'The beef patties are grilled 5-7 minutes per side per the source; colour and time are not a doneness check for mince, so use the adapted measured endpoint below. The bacon is cooked well done and crumbled before mixing. Steak sauce and bun formulations unverified; diet rests on the explicit beef and bacon lines (mixed species).',
    grocery: 'Beef mince must reach 71°C; steak-sauce formulation unverified'
  },
  'wikibooks:honey-apple-glazed-pork': {
    summary: 'Source gives its own 165°F (74°C) endpoint; honey glaze',
    detail: 'The source states its own measured endpoint, 165°F (74°C) in the thickest part of the pork, kept verbatim - it meets the 71°C reference for whole pork cuts. Butter formulation unverified only where relevant; diet rests on the explicit pork line.',
    grocery: 'Source endpoint 165°F (74°C) in the thickest part; pork butt roast required'
  },
  'wikibooks:hongshao-rou-red-braised-pork-belly': {
    summary: 'Shaoxing wine; pork-or-chicken stock alternative; 40-minute braise',
    detail: 'Shaoxing rice wine is explicit - no alcohol-free claim. The stock is a pork-or-chicken source alternative, formulation unverified; diet rests on the explicit pork belly line. The 40-minute simmer after boiling cooks the cubed pork belly through, kept as the source states.',
    grocery: 'Shaoxing wine contains alcohol; dark soy sauce and stock formulations unverified'
  },
  'wikibooks:hoppin-john': {
    summary: 'Seasoned rice packs unverified; bacon explicit',
    detail: 'The source uses two packs of long grain rice with their seasoning packets - package size is not stated and the seasoning formulation is unverified; diet rests on the explicit bacon line. Canned black-eyed peas formulation unverified.',
    grocery: 'Rice pack size and seasoning formulation not stated; bacon required'
  },
  'wikibooks:italian-marinated-chicken': {
    summary: 'Adapted poultry endpoint; discard used marinade; broth and Parmesan unverified',
    detail: 'The source grills the chicken 15 minutes "until done"; time and appearance are not a doneness check for poultry, so use the adapted measured endpoint below. The used marinade is discarded per the source and only the reserved (untouched) half is used for basting. Chicken broth and Parmesan formulations unverified; diet rests on the explicit chicken line.',
    grocery: 'Chicken must reach 75°C; only the reserved marinade is used for basting'
  },
  'wikibooks:kashmiri-pulao': {
    summary: 'Uses cooked rice; cinnamon tree leaf or bay leaves alternative',
    detail: 'The rice goes in already cooked and drained - cook it fresh and use it hot, or follow the handling note for stored rice. Cinnamon tree leaf with a bay-leaf substitute is a source alternative. Saffron is a specialty item. All source lines are plant or dairy; reviewed vegetarian.',
    grocery: 'Uses pre-cooked rice; saffron and mixed nuts required',
    handling: 'Two Plates handling note (not a change to the source method): cooked rice is a higher-risk food. If the rice was cooked earlier, refrigerate it below 5°C within 2 hours of cooking, use within 1 day, and reheat only once until steaming hot throughout.',
    handlingUrl: 'https://www.foodauthority.nsw.gov.au/consumer/special-care-foods/leftovers',
    handlingLabel: 'NSW leftovers guidance'
  },
  'wikibooks:khara-pongal-rice-and-mung-bean-porridge': {
    summary: 'Rice and mung dhal cooked until mushy; ghee-or-butter alternative',
    detail: 'Ghee with a butter substitute is a source alternative. All source lines are plant or dairy; reviewed vegetarian. Cashews are a tree-nut line.',
    grocery: 'Moong dhal and curry leaves are specialty items'
  },
  'wikibooks:lamb-sausages-and-grilled-potatoes': {
    summary: 'Adapted sausage endpoint; lamb sausages explicit',
    detail: 'Lamb sausages are explicit (species stated); diet rests on that line. The source fries the sausages about 10 minutes; time and browning are not a doneness check for sausages, so use the adapted measured endpoint below. Sausage formulation beyond the lamb is unverified.',
    grocery: 'Lamb sausages must reach 71°C; sausage formulation beyond lamb unverified'
  },
  'wikibooks:mapo-tofu': {
    summary: 'Beef-or-pork species-open alternative; adapted mince endpoint; chili bean paste unverified',
    detail: 'Minced beef or pork is a source alternative - species chosen by the cook; fails closed as non-veg with species unresolved. The source fries the mince until brown; browning is not a doneness check for mince, so use the adapted measured endpoint below. Chili bean paste, soy sauce and rice wine formulations unverified - no alcohol-free claim. A near-neighbor dish (mushroom mapo tofu) already exists in the app; this is the classic meat version.',
    grocery: 'Mince species is the cook\'s choice and must reach 71°C; Szechuan pepper and chili bean paste are specialty items; rice wine contains alcohol'
  },
  'wikibooks:mukimo': {
    summary: 'All-plant lines; traditionally served with meat stew (accompaniment note)',
    detail: 'All source lines are plant foods; reviewed vegan. The source serves it with beef stew, chicken stew or grilled meat - an accompaniment suggestion, not part of the dish. Water quantity is "as needed" per the source.',
    grocery: 'Maize kernels and pumpkin leaves (or spinach/kale) required'
  },
  'wikibooks:paneer-butter-masala': {
    summary: 'Ghee-or-oil quantity unstated; paneer and yoghurt formulations unverified',
    detail: 'The frying ghee or oil quantity is not stated in the source (frying medium), kept that way. Paneer, yoghurt and hing formulations unverified; all source lines are plant or dairy; reviewed vegetarian.',
    grocery: 'Frying ghee/oil quantity not stated; paneer required'
  },
  'wikibooks:pollo-del-fungo-chicken-with-mushrooms': {
    summary: 'Adapted poultry endpoint; white wine; stock unverified',
    detail: 'Chicken strips are fried per the source without a measured check; use the adapted measured endpoint below. White wine is explicit - no alcohol-free claim. Chicken stock formulation unverified; diet rests on the explicit chicken line. Source categories list this as an appetizer; composition is a chicken main.',
    grocery: 'Chicken must reach 75°C; wine contains alcohol'
  },
  'wikibooks:pork-aachi': {
    summary: 'Adapted pork endpoint; stock-cube species unresolved in source; ready-mix mash unverified',
    detail: 'The pork is browned then cooked through per the source; browning is not a doneness check, so use the adapted measured endpoint below. The ingredient line says pork stock cube but the method says beef stock cube - species unresolved in the source, treated as unknown species (fail-closed). Ready-to-mix potato mash formulation unverified; diet rests on the explicit pork line.',
    grocery: 'Stock-cube species unresolved in source; meat masala is a specialty blend'
  },
  'wikibooks:pohe-spiced-flattened-rice': {
    summary: 'All-plant lines; source marks vegan; a breakfast-associated dish served as a light meal',
    detail: 'All source lines are plant foods and the source categorises it as vegan; reviewed vegan. Asafoetida (hing) powder formulations sometimes include wheat - unverified. Pohe is traditionally a breakfast dish in Maharashtra, Gujarat and Madhya Pradesh; included here as a light meal.',
    grocery: 'Thick pohe (flattened rice) and asafoetida are specialty items'
  },
  'wikibooks:rice-with-black-beans-arroz-con-frijoles-negros': {
    summary: 'Overnight soak and long simmer; wine-or-sherry alternative; sugar-or-sweetener alternative',
    detail: 'Dried black beans soak overnight and simmer about 3 hours total, kept as the source states. Dry white wine, cooking wine or dry sherry is a source alternative - no alcohol-free claim; sugar or half a packet of low-calorie sweetener is another. Olive oil quantities appear in the method (2 tablespoons, three times), kept as the source states. All source lines are plant foods; reviewed vegetarian.',
    grocery: 'Beans need an overnight soak; wine contains alcohol if used'
  },
  'wikibooks:taro-fish': {
    summary: 'Taro must be cooked thoroughly; stock powder unverified; Shaoxing wine',
    detail: 'Raw taro is an irritant - the source steams it until soft before mashing, kept as stated; never use undercooked taro. Vegetable stock powder formulation is unverified, so the reviewed diet is fail-closed unknown even though the source categorises the dish as vegetarian. Shaoxing wine is explicit - no alcohol-free claim.',
    grocery: 'Taro must be steamed until fully soft; nori and preserved black beans are specialty items'
  },
  'wikibooks:yellow-split-pea-soup': {
    summary: 'Bouillon species and formulation unresolved; long simmer',
    detail: 'Chicken-or-beef bouillon cubes are a source alternative with species unresolved - treated as unknown species (fail-closed), formulation unverified. Optional pea soak shortens the 1-2 hour simmer, kept as the source states.',
    grocery: 'Bouillon species and formulation unverified'
  },

  'wikibooks-fr:fr-acras-de-rouget': {
    summary: 'Red mullet fritters deep-fried; cayenne and frying oil unquantified; adapted fritter endpoint',
    detail: 'Red mullet is flaked into a batter and deep-fried until well golden; colour is not a doneness check, so use the adapted measured endpoint below. Cayenne, salt, pepper and frying oil quantities are unstated in the source, kept that way. No bone-free claim: flaked fillet can still carry bones.',
    grocery: 'Red mullet and deep-frying oil required; seasonings unquantified'
  },
  'wikibooks-fr:fr-akpessi-igname': {
    summary: 'Red palm oil (or peanut oil alternative); yam and African eggplant',
    detail: '"Huile rouge" is glossed by the source as red palm oil, with peanut oil as the source alternative; peanut is a declared allergen on the alternative. N\'drowa is the source\'s own gloss for African eggplants. All lines plant foods.',
    grocery: 'Yam, African eggplants and red palm oil are specialty items; peanut-oil alternative contains peanut'
  },
  'wikibooks-fr:fr-cassolette-de-sole-et-cabillaud': {
    summary: 'Adapted fish endpoint; alcohol (white beer); bisque formulation unverified',
    detail: 'The cod and sole bake 10 minutes per the source; time is not a doneness check, so use the adapted measured endpoint below. The scallops, shrimps and mussels get brief final heat - typical for shellfish, noted. White beer (a dry white wine alternative is offered by the source) means no alcohol-free claim. Lobster bisque is a purchased product, formulation unverified. Source cod quantity is approximate ("plus ou moins 125 g"), kept.',
    grocery: 'Mixed fish and shellfish required; contains alcohol; bisque formulation unverified'
  },
  'wikibooks-fr:fr-cotriade': {
    summary: 'Shellfish quantities unstated; brief final fish cooking; adapted endpoint; muscadet (alcohol)',
    detail: 'Shellfish and crustacean quantities are unstated in the source, kept that way. The fish gets a brief final simmer in hot stock; use the adapted measured endpoint below. "Vieille" is glossed as ballan wrasse with low confidence - regional fish naming. Muscadet means no alcohol-free claim. Keep fish and shellfish chilled during prep as the source says.',
    grocery: '2.5 kg mixed fish plus assorted shellfish required; contains alcohol; quantities of shellfish unstated'
  },
  'wikibooks-fr:fr-creme-de-chou-fleur': {
    summary: 'Stock species unstated (fail-closed); glass of milk and spoons of butter unquantified',
    detail: 'The source calls for 1 litre of stock without stating species or formulation - treated as unknown species, fail-closed. A glass of milk and 2 unqualified spoons of butter are unquantified in the source, kept. The page carries an external recipe link; provenance noted.',
    grocery: 'Stock species and formulation not stated; cauliflower and potatoes required'
  },
  'wikibooks-fr:fr-curry-de-poisson-keralais': {
    summary: 'Adapted fish endpoint; coconut-milk tin size unstated',
    detail: 'The fish fillets poach 5-10 minutes in the sauce per the source; use the adapted measured endpoint below. The coconut-milk tin size and a glass of water are unquantified in the source, kept. Curry leaves are a specialty item.',
    grocery: 'White fish fillets required; coconut-milk tin size unstated; curry leaves are a specialty item'
  },
  'wikibooks-fr:fr-escalopes-de-veau-parmesan-amandes': {
    summary: 'Adapted veal endpoint; almonds (tree nut); flour quantity vague',
    detail: 'The escalopes brown 3-4 minutes per side per the source; time is not a doneness check, so use the adapted measured endpoint below. Almonds are a declared tree-nut allergen. "A little flour" is unquantified in the source, kept. Parmesan formulation unverified.',
    grocery: 'Veal escalopes required; tree nuts (almonds); flour quantity vague'
  },
  'wikibooks-fr:fr-fondue-epicee': {
    summary: 'Contains wine and grappa; no alcohol-free claim; burner attention and hot-holding check',
    detail: 'White wine and grappa are explicit and the fondue is not boiled after the spirits are added - no alcohol-free claim. If holding hot, use the adapted hot-holding check below and attend the burner. Gruyere formulation (rennet, pasteurisation) unverified.',
    grocery: '800 g Gruyere required; contains alcohol (wine and grappa)'
  },
  'wikibooks-fr:fr-gratin-de-courgettes-et-tomates': {
    summary: 'All plant plus cheese; cheese formulation unverified',
    detail: 'All source lines are plant foods plus grated cheese; cheese formulation (rennet) unverified; reviewed vegetarian by line read. Source categories also mark it vegetarian, consistent.',
    grocery: 'Courgettes, tomatoes and basil required'
  },
  'wikibooks-fr:fr-lieu-jaune-en-papillote-de-cresson': {
    summary: 'Adapted fish endpoint; 45-minute parcel bake kept',
    detail: 'The source doneness cue is "the pollock should be well cooked"; use the adapted measured endpoint below. The parcels steam the fish and potatoes together - check the thickest fish piece.',
    grocery: 'Pollock (lieu jaune) and watercress required'
  },
  'wikibooks-fr:fr-pates-au-thon': {
    summary: 'Tuna can size unstated; parmesan formulation unverified',
    detail: 'The tuna can size is unstated in the source, kept. Parmesan formulation unverified; diet rests on the explicit tuna line. The chilli is added crushed per the source - deseeding not specified.',
    grocery: 'Canned tuna required; can size unstated'
  },
  'wikibooks-fr:fr-penne-rigate-a-la-grecque': {
    summary: 'Wine (alcohol); goat cheese formulation unverified; source vegan tag inconsistent',
    detail: 'The source carries both vegan and vegetarian category tags while containing goat cheese - the vegan tag is inconsistent with the ingredient list; we adopt no diet label from it. By line read: plant foods plus goat cheese, reviewed vegetarian with cheese formulation (rennet) unverified. White wine means no alcohol-free claim. Olive preparation style ("a la grecque") not further specified in the source.',
    grocery: 'Goat cheese log and Greek-style black olives required; contains alcohol'
  },
  'wikibooks-fr:fr-poelee-brestoise': {
    summary: 'Sausage species unstated (fail-closed); source gluten-free template conflict; eggs set cue',
    detail: 'The source page carries a "SansGluten" (gluten-free) template yet contains knacki-type sausages (commonly wheat-containing) and unverified canned "thon a la catalane" - we adopt no diet label from it and flag the conflict. Sausage species is unstated - fail-closed against meat exclusions. The eggs are cooked like an omelette; the set-egg cue is the source\'s own and the adapted step confirms it. Butter quantity vague ("a good piece"), kept.',
    grocery: 'Sausage species and canned-tuna formulation not stated; source gluten-free label conflicts with ingredients'
  },
  'wikibooks-fr:fr-poelee-de-champignons-au-fromage-a-l-ail-et-fines-herbes': {
    summary: 'Pork (lardons); wine; source method omits when lardons are cooked - gap preserved',
    detail: 'Lardons (diced bacon) are explicit - diet rests on that line. The source method never says when the lardons are cooked - they appear in the ingredient list but not the method steps; the gap is preserved, nothing invented. White wine (deglazed) means no alcohol-free claim. Wild mushroom options (ceps, girolles) carry a sourcing/identification caveat; the source gives button mushrooms as an alternative. Cheese formulation unverified.',
    grocery: 'Lardons required; contains alcohol; wild-mushroom sourcing caveat; source method gap on lardons preserved'
  },
  'wikibooks-fr:fr-poulet-fafa': {
    summary: 'Peanut oil (declared allergen); adapted poultry endpoint; stock cube unverified',
    detail: 'Peanut oil is explicit - a declared allergen. The chicken cooks by timing only in the source (5 + 7 minutes over high heat); use the adapted measured endpoint below. The "fafa" green identity is uncertain in the source (spinach offered as the alternative). Chicken stock cube formulation unverified.',
    grocery: 'Peanut oil (peanut allergen); spinach or fafa shoots and coconut milk required; stock-cube formulation unverified'
  },
  'wikibooks-fr:fr-poulet-kedjenou': {
    summary: 'Peanut-oil option; adapted poultry endpoint; vessel ambiguity preserved (sealed canari vs pressure cooker)',
    detail: 'Peanut or vegetable oil is a source alternative - peanut is a declared allergen on the option. The chicken cooks 30 minutes sealed per the source; use the adapted measured endpoint below. The source names a traditional sealed clay "canari" or a "cocotte minute" (literally pressure cooker) but describes sealed low-heat simmering without pressure timing - vessel ambiguity preserved, no pressure-cooker timing invented. Do not add water per the source; do not open before 30 minutes per the source.',
    grocery: 'Peanut-oil option (peanut allergen); eggplant and attieke are specialty items'
  },
  'wikibooks-fr:fr-poulet-sauce-au-vin-rouge': {
    summary: 'Red wine (alcohol); adapted poultry endpoint; thickener spoon size ambiguous',
    detail: 'Red wine is explicit with a 1-hour simmer - no alcohol-free claim. The chicken endpoint is timing-only in the source; use the adapted measured endpoint below. The source says "3 cuillers" of starch without tea/tablespoon qualification - ambiguity preserved. Wine quantity is 2 glasses (vessel measure), kept.',
    grocery: 'Chicken required; contains alcohol; thickener spoon size ambiguous in source'
  },
  'wikibooks-fr:fr-riz-noir': {
    summary: 'Mushroom sourcing caveat; smoked fish and mushroom quantities vague; adapted seafood endpoint',
    detail: 'The source specifies small dried black mushrooms ("Djre ble") sold in Abidjan markets and asserts local edibility - wild/market mushroom identification is a safety-relevant sourcing note; no substitute species is asserted by the source. Smoked fish and mushroom quantities are vague in the source, kept. The shrimps and fish saute briefly; use the adapted measured endpoint below. Seasoning cube formulation unverified. "1 quartier d\'ail" kept as the source term (clove vs wedge uncertain).',
    grocery: 'Dried black mushrooms are a specialty item with a sourcing caveat; shrimp and smoked fish required; quantities vague in source'
  },
  'wikibooks-fr:fr-salade-de-riz': {
    summary: 'Cooked-rice handling; tuna form and mayonnaise unquantified',
    detail: 'The tuna form (canned or fresh) is unstated in the source, kept; mayonnaise is unquantified, formulation unverified. Uses cooked rice that is cooled for a salad - see the handling note. Substantial as a meal (350 g rice for 4).',
    grocery: 'Cooked rice needs prompt chilling; tuna form and mayonnaise quantity unstated',
    handling: 'Two Plates handling note (not a change to the source method): cooked rice is a higher-risk food. Refrigerate it below 5°C within 2 hours of cooking, use within 1 day, and keep the made salad chilled until serving.',
    handlingUrl: 'https://www.foodauthority.nsw.gov.au/consumer/special-care-foods/leftovers',
    handlingLabel: 'NSW leftovers guidance'
  },
  'wikibooks-fr:fr-sauce-arachide-poulet': {
    summary: 'PEANUT central ingredient; adapted poultry endpoint; source boil-over caution',
    detail: 'Peanut paste (and a peanut-oil option) is the central ingredient - a major declared allergen. The chicken fries until brown then simmers 20 minutes; browning is not a doneness check, so use the adapted measured endpoint below. The source warns the pot must be deep "because the soup rises during cooking" - boil-over caution is the source\'s own. Vegetables are an unquantified optional choice, kept.',
    grocery: 'Peanut (major allergen) is central; chicken required; use a deep pot per the source'
  },
  'wikibooks-fr:fr-souffle-au-bleu-de-gex': {
    summary: 'No bake duration stated in source; raw-milk blue cheese note; adapted set-egg endpoint',
    detail: 'The source gives no bake duration - the only doneness cue is "as soon as the souffle has risen"; the missing duration is preserved, none invented, and the adapted step adds a set-through check. Bleu de Gex is typically a raw-milk blue cheese - unpasteurised-milk note; people who are pregnant or immunocompromised should check product pasteurisation. The source wording "dans un moule" (in a mould) for the roux almost certainly means a pan - gloss uncertain, preserved.',
    grocery: 'Bleu de Gex (regional blue cheese, often raw-milk) required; no bake duration in source'
  },
  'wikibooks-fr:fr-soupe-d-asperges-champignons-mais-et-poulet': {
    summary: 'Adapted poultry endpoint replaces visual cue; vague seasonings preserved',
    detail: 'The source chicken doneness cue is visual ("translucency turns opaque white deeply enough"); the adapted step replaces it with a measured endpoint. Several seasonings are vague in the source (salt, sugar, plenty of pepper, a little tomato concentrate, optional stock and herbs), kept. Mushroom type unspecified.',
    grocery: 'Chicken escalopes required; asparagus, corn and mushrooms required'
  },
  'wikibooks-fr:fr-spaghetti-au-jambon-de-parme': {
    summary: 'Both hams pork; Parma ham added with residual heat only (source process)',
    detail: 'Parma ham (cured) and cooked ham are explicit - both pork. The Parma ham is added with residual heat only per the source - it is a ready-to-eat cured product; follow product storage and use-by directions. Parmesan formulation unverified. Olive oil unquantified, kept.',
    grocery: 'Two hams (both pork) required; cured ham is ready-to-eat - follow product directions'
  },
  'wikibooks-fr:fr-tarte-a-l-oignon': {
    summary: 'Source temperature discrepancy preserved (190 then 180°C); pastry formulation unverified; set-egg check',
    detail: 'The source preheats to 190°C then bakes at 180°C - the discrepancy is preserved as written. Shortcrust pastry formulation (fat type) unverified; diet rests on the explicit lines (eggs, butter). The egg-flour filling bakes 25-30 minutes; the adapted step confirms the filling is set. The source notes the genuine Alsatian version has no bacon.',
    grocery: 'Shortcrust pastry required; source temperatures inconsistent (preserved)'
  },
  'wikibooks-fr:fr-tomates-farcies-a-l-agneau': {
    summary: 'Lamb is pre-cooked roast per source; vessel water quantity kept',
    detail: 'The stuffing lamb is "agneau roti hache" - cooked roast lamb per the source wording (likely leftover); the mushrooms and onion cook in the 40-minute bake. "Half a glass of water" is a vessel quantity, kept. Olive oil unquantified, kept.',
    grocery: 'Cooked roast lamb required (leftover-style); tomatoes 1 kg'
  },
  'wikibooks-fr:fr-torti-aux-crevettes-et-a-la-feta': {
    summary: 'SHELLFISH (prawns); raw-or-cooked prawns unstated - adapted endpoint covers raw; butter quantity vague',
    detail: 'Prawns are explicit - a declared shellfish allergen. The source does not state whether the prawns start raw or cooked - ambiguity preserved; the adapted endpoint covers the raw case. "A knob of butter" is a vague quantity, kept. Feta formulation unverified.',
    grocery: 'Prawns (shellfish allergen) required; raw-or-cooked not stated in source; feta required'
  },
  'wikibooks-fr:fr-poulet-gaston-gerard': {
    summary: 'Contains white wine (alcohol); adapted poultry endpoint; servings stated as 4-6',
    detail: 'White wine is reduced only "a little" before baking - no alcohol-free claim. Servings are stated as "4-6 people" in the source; this record uses the lower bound 4 as the fixed base, so per-serving amounts are the larger interpretation. The wine is a vessel quantity (2 glasses) preserved as stated. Chicken endpoint is by process in the source (browning plus 30-minute bake); use the adapted measured endpoint below. Comté formulation (rennet) unverified.',
    grocery: 'Comté and thick crème fraîche required; contains white wine'
  },
  'wikibooks-fr:fr-couscous-de-poulet-au-miel': {
    summary: 'Vessel quantities (bowl/glass) preserved; adapted poultry endpoint; lengthy repeated steaming',
    detail: 'Bowl and glass measures for couscous, sugar and orange-blossom water are preserved as the source states them - sizes unstated, no conversions invented. The method uses seven repeated steamings with 15-minute rests; timings are the source\'s own. Honey and cinnamon quantities are stated. The chicken cooks covered and is turned without piercing; "once the chicken is cooked" is not a doneness check - use the adapted measured endpoint below. Almond is a tree-nut allergen.',
    grocery: 'Couscoussier or steamer setup assumed by source; almonds (tree nut); whole chicken for 6 people'
  },
  'wikibooks-fr:fr-risotto-au-poulet': {
    summary: 'Contains white wine (alcohol); wine quantity wording differs between list and method; adapted poultry endpoint',
    detail: 'Ingredients list 250 ml (1 cup) white wine while the method says "the glass of white wine" - preserved as the source has it; no alcohol-free claim. Shallot is offered as an alternative to the onion without quantity - preserved. Chicken breast strips have no stated endpoint in the source; use the adapted measured endpoint below. Stock formulation (salt, additives) unverified. Cooked rice leftovers need prompt refrigeration.',
    grocery: 'Arborio, Carnaroli or Vialone Nano rice; contains white wine; chicken stock required'
  },
  'wikibooks-fr:fr-sauce-gnangnan': {
    summary: 'Meat species unspecified (not classified); regional ingredients (gnangnan, akpi); vague handful quantities; adapted meat endpoint',
    detail: 'The source lists 1 kg meat without species or cut - fail-closed: not classified against any meat-type exclusion. Gnangnan (source glosses as Solanum torvum seeds) and akpi (Djansang/Njansang kernels) are regional ingredients with no Australian availability assessment and no substitutions offered. Handful quantities preserved as vague. "Gousse d\'oignon" (unusual phrasing) is read as an onion bulb; "2 portions of garlic bulb" as about 2 cloves - both flagged in the source lines. Seasoning-cube formulation unverified. Use the adapted measured endpoint for the meat used.',
    grocery: 'Gnangnan and akpi are specialty African ingredients, no substitutions; yams; meat species unspecified in source'
  },
  'wikibooks-fr:fr-djenkoume2': {
    summary: 'Guinea fowl is specialty poultry (source note: the traditional original, poulet djénkoum, uses chicken); stock-cube formulation unverified; adapted 75°C poultry endpoint',
    detail: 'The recipe\'s listed meat is 1 guinea fowl (pintade), as the source states. The source\'s own note adds that the traditional original recipe ("poulet djénkoum") uses chicken and that guinea fowl tastes close to Togolese chicken - chicken is the source-noted traditional alternative, not this recipe\'s listed meat. The source braises the pieces 40 minutes; time is not a doneness check, so use the adapted measured endpoint below. Chicken-stock cubes are a manufactured product whose formulation is unverified. The N\'toutou (ginger, garlic and onion, blended) is the source\'s inline spice mix, kept as listed. The water quantities (50 cl and 10 cl) appear in the method only, not the ingredient list - preserved there. Sunflower oil (25 cl) kept as stated; the method sautés in oil without restating amounts.',
    grocery: 'Guinea fowl (the source notes chicken as the traditional original); maize flour; stock-cube formulation unverified'
  },
  'wikibooks-de:de-daeji-bulgogi': {
    summary: 'Gochujang formulation unverified; adapted 71°C pork endpoint',
    detail: 'The gochujang (Korean chilli paste) is a manufactured product whose formulation is unverified. The pork marinates about an hour: keep it refrigerated at 5°C or colder while marinating. The marinade fries with the pork and is cooked; it is never served uncooked. The source fries "until lightly cooked through" - colour is not a doneness check, so use the adapted measured endpoint below. The source tip suggests rice and vegetable sides; they are not included.',
    grocery: 'Gochujang formulation unverified; rice and vegetable sides not included'
  },
  'wikibooks-de:de-moussaka': {
    summary: 'Contains white wine (unit unstated); cheese rennet unverified; butter amount unstated; adapted 71°C mince endpoint',
    detail: 'The source states 4-6 portions, kept as the serving range with quantities unchanged. The dry white wine line reads "1/4" without a unit; it is listed with liquids measured in litres, so it is likely 1/4 l - kept as written. The wine stays in the sauce; no alcohol-free claim is made. Butter has no stated amount (it greases the dish and forms the bechamel roux). Graviera, or the source alternative Parmesan, has rennet/formulation unverified. The mince browns in step 3, but its final cook is the 1-hour bake - time is not a doneness check, so use the adapted measured endpoint below. The source tips offer other vegetables (zucchini, tomatoes, green beans or potatoes) in place of aubergines, with their own pre-cooking - an option, not part of the listed lines.',
    grocery: 'Contains white wine; butter amount unstated; cheese rennet unverified'
  },
  'wikibooks-de:de-entenbrust-mit-orangensauce': {
    summary: 'Source gap: onion listed but never used; soy "small bottle" unquantified; marinade contacts raw duck; adapted 75°C poultry endpoint',
    detail: 'The source lists 1 onion or a few shallots but its method never uses them - the gap is kept visible rather than inventing a step. The soy sauce is "1 small bottle" (Kikkoman) and the orange juice "1 pack/bottle" - volumes unstated, kept as written. The duck marinates at least 2 hours, overnight if possible: refrigerate at 5°C or colder while marinating; the source does not say where, and room-temperature marinating is unsafe. The used marinade deglazes the pan and becomes the sauce - it contacted raw duck, so the adapted step brings the sauce to a full boil. The source takes the duck off when it "appears done" - appearance is not a doneness check, so use the adapted measured endpoint below. The potatoes-or-noodles side and the endive salad with its dressing appear in the method without quantities; the pan fat is an unquantified process addition.',
    grocery: 'Onion listed but unused by the source method; soy and orange-juice volumes unstated'
  },
  'wikibooks-de:de-paprika-bohnen-curry': {
    summary: 'Pork cut unspecified; cup and tub measures kept as written; broth formulation unverified; adapted 71°C pork endpoint',
    detail: 'The source says only "400 g pork" without a cut; it is browned, then braised 20 minutes - time is not a doneness check, so use the adapted measured endpoint below. The vegetable broth is "1 Tasse" (cup) and the yogurt "1 grosser Becher" (large tub) - the source\'s own measures, kept as written; broth formulation unverified. The curry powder is hot per the source. The source tip suggests rice or bread alongside; they are not included. The source states 3-4 portions, kept as the serving range.',
    grocery: 'Pork cut unspecified; broth formulation unverified; rice or bread not included'
  },
  'wikibooks-de:de-linseneintopf': {
    summary: 'Source vegetarian tag not adopted; Teeglas measures kept as written; Parmesan and broth formulations unverified',
    detail: 'The source marks this stew vegetarian, but the shaved Parmesan (rennet) and the vegetable broth are manufactured products whose formulations are unverified, so the tag is not adopted and diet stays unclassified. The olive oil and capsicum paste are measured in the source\'s "Teeglas" (tea glass) - kept as written, no conversion invented. The garlic baguettes are a manufactured product, formulation unverified. The lentils are cooked 15 minutes per the source; lentil doneness is a texture matter here, not a safety endpoint.',
    grocery: 'Teeglas (tea glass) measures kept as written; Parmesan and broth formulations unverified'
  },
  'wikibooks-de:de-riz-casimir': {
    summary: 'Rice is a serving suggestion, not included; adapted 75°C poultry endpoint',
    detail: 'The source notes "Dazu passt Reis" (rice goes well with it) without an amount - a suggestion, not included in the lines. The cream is "1 Becher" (tub/cup) and the curry "about 2 tbsp, English style" - the source\'s own measures, kept as written. The oil for browning appears in the method only. The turkey steams 15 minutes and then reduces in the cream - time is not a doneness check, so use the adapted measured endpoint below. The source\'s variants (mushrooms; fruit salad instead of peaches) are options, not part of the listed lines.',
    grocery: 'Rice not included (source suggestion); cream tub and curry measures kept as written'
  },
  'wikibooks-de:de-frikadellen': {
    summary: 'Species is the cook\'s choice (beef, pork or mixed); soaking liquid and breadcrumbs are method-only; adapted 71°C mince endpoint',
    detail: 'The source offers beef, pork or mixed mince - the species is the cook\'s choice, so the dish is not classified against any meat-type exclusion. The milk-or-water soaking liquid and the breadcrumbs (only if the mixture is too soft) appear in the method but not in the ingredient list - flagged on their lines. The frying fat amount is unstated. A prose paragraph suggests extra seasonings (marjoram, garlic, mustard, soy or Worcestershire sauce and others) as options; they are suggestions, not listed lines. The source fries "a few minutes" to finish - time and browning are not doneness checks, so use the adapted measured endpoint below.',
    grocery: 'Species is the cook\'s choice; frying fat amount unstated'
  },
  'wikibooks-de:de-kartoffelgratin': {
    summary: 'Side-dish amount; source vegetarian tag not adopted; cheese and butter amounts unstated',
    detail: 'The source states the amount as a side dish for 4 and notes it serves about 2 as a main - the fixed batch is shown at 4 with quantities unchanged. The cheese is "to taste, e.g. Edamer, Raclette or Gruyere" - type and quantity unstated, and rennet/formulation unverified, so the source\'s vegetarian tag is not adopted and diet stays unclassified. Butter has no stated amount. The source suggests additions (leek, mushrooms, cooked ham, mince) as options, not part of the listed lines.',
    grocery: 'Side-dish amount (about 2 as a main); cheese type and amount to taste'
  },
  'wikibooks-de:de-bigos': {
    summary: 'Sausage species and formulation unverified; hot water is an unquantified process addition; adapted 71°C pork endpoint',
    detail: 'The small smoked sausage\'s species and formulation are unverified; the bacon and lean pork are explicit. The hot water poured on to barely cover is an unquantified process addition, kept in the method only. The source\'s single-paragraph method is kept as one step. The source sides (bread or potatoes) are suggestions, not included. The source notes bigos tastes best reheated and keeps a few days refrigerated - follow the handling note below for cooling and reheating. The hour\'s braise is not a doneness check for the pork pieces, so use the adapted measured endpoint below.',
    grocery: 'Sausage species unverified; bread or potatoes not included',
    handling: 'Two Plates handling note (not a change to the source method): cool leftovers promptly in small portions, cover, refrigerate below 5°C within 2 hours, eat within 2 days, and reheat only once until steaming hot throughout (at least 60°C). Count all time between 5°C and 60°C cumulatively: under 2 hours, use or refrigerate; 2 to 4 hours, use immediately or discard, not refrigerate for later; after 4 hours, discard.',
    handlingUrl: 'https://www.foodauthority.nsw.gov.au/consumer/special-care-foods/leftovers', handlingLabel: 'NSW leftovers guidance'
  },
  'wikibooks-de:de-haehnchen-aprikosen-mandel-reis': {
    summary: 'Source states 4-6 portions, kept as the range; adapted 75°C poultry endpoint',
    detail: 'The source states 4-6 portions, kept as the serving range with quantities unchanged. The herbs are unquantified, and the salt and pepper appear in the method but not in the ingredient list - flagged on their lines. The rice cooks per its package directions, which govern. The chicken stir-fries 6-8 minutes - time is not a doneness check, so use the adapted measured endpoint below. Dried or fresh apricots are a source alternative, kept as written.',
    grocery: 'Herbs unquantified; rice cooks per its package'
  },

  'wikibooks-de:de-szegediner-gulasch': {
    summary: 'Species is the cook\'s choice (beef or pork); broth formulation unverified; potatoes side not included; adapted 71°C endpoint',
    detail: 'The source offers beef or pork goulash/schnitzel meat - the species is the cook\'s choice, so the dish is not classified against any meat-type exclusion. The "2 TL Fleischbrühe" (2 teaspoons of meat broth) is the source\'s own measure, kept as written; broth formulation unverified. The potatoes or mashed potatoes side is a serving suggestion, not included. The deglazing water (1/4 l) and the optional starch thickener appear in the method but not in the ingredient list - flagged on their lines. The source braises 45 minutes (15 in a pressure cooker) - time is not a doneness check, so use the adapted measured endpoint below.',
    grocery: 'Species is the cook\'s choice; broth formulation unverified; potatoes side not included'
  },
  'wikibooks-de:de-plov': {
    summary: 'Species is the cook\'s choice (poultry possible); water amount unstated; adapted 75°C endpoint',
    detail: 'The source leaves the meat species open - traditionally beef, lamb or pork, more recently also poultry - so the dish is not classified against any meat-type exclusion, and the adapted endpoint is the conservative poultry one. The water is listed without an amount; the method adds it until it barely covers the rice. The barberries (Berberitzen) are a specialty ingredient with no substitution offered. The source states 8-10 portions for a family celebration, kept as the serving range; the source notes the quantities can be scaled. The 40-minute covered cook is not a doneness check, so use the adapted measured endpoint below.',
    grocery: 'Species is the cook\'s choice; barberries specialty; water amount unstated'
  },
  'wikibooks-de:de-aelplermagronen': {
    summary: 'Source vegetarian tag not adopted; optional bacon; cheese rennet unverified',
    detail: 'The source marks this vegetarian, but the hard cheese (Sbrinz or similar - the source says no Parmesan because of the secondary flavour) has rennet/formulation unverified and the bacon cubes are an optional addition, so the tag is not adopted and diet stays unclassified. A reader note at the end of the source page suggests apple sauce alongside - a suggestion, not included. The boiling water for the potatoes and pasta is a process liquid, not a line.',
    grocery: 'Cheese rennet unverified; bacon cubes optional'
  },
  'wikibooks-de:de-zanderfilet-auf-sauerkraut': {
    summary: 'Contains white wine; frying fat unstated; adapted 63°C fish endpoint',
    detail: 'The white wine or Prosecco stays in the braised kraut; no alcohol-free claim is made. The spice bag (peppercorns, juniper, star anise, ginger) is removed before serving. The decoration apple is served raw on the plates. The frying oil and butter are "a little", unstated. The source fries the zander 2-3 minutes - time is not a doneness check, so use the adapted measured endpoint below.',
    grocery: 'Contains white wine; frying fat unstated'
  },
  'wikibooks-de:de-garnelen-mit-fenchel': {
    summary: 'Adapted 63°C seafood endpoint; Parmesan suggestion not included',
    detail: 'The 180 ml of pasta cooking water is reserved in the method and forms the pan sauce - a process liquid, kept in the method. The fennel fronds are unquantified. The source notes other pasta works and suggests shaved Parmesan on top - a suggestion, not included. The shrimp fry briefly with the fennel - colour and time are not doneness checks, so use the adapted measured endpoint below.',
    grocery: 'Fennel fronds unquantified; Parmesan suggestion not included'
  },
  'wikibooks-de:de-estragonhuhn': {
    summary: 'Source gap: mustard listed but never used; cream measure kept as written; adapted 75°C poultry endpoint',
    detail: 'The source lists 1-2 tbsp mustard but its method never uses it - the gap is kept visible rather than inventing a step. The cream is "1/2 Tüte" (half a bag/carton), the source\'s own measure, kept as written, with tinned milk as the source alternative. The wine stays in the braise; no alcohol-free claim. The salt and "some water" appear in the method but not in the ingredient list - flagged on their lines. The source braises about 50 minutes and says to test at the belly - time and feel are not doneness checks, so use the adapted measured endpoint below. The rice side is a suggestion, not included.',
    grocery: 'Mustard listed but unused by the source method; rice not included'
  },
  'wikibooks-de:de-kuerbis-risotto': {
    summary: 'Meat broth default with vegetable alternative; contains white wine; Fontina rennet unverified',
    detail: 'The source defaults to meat broth (Fleischbrühe, species and formulation unstated) and offers vegetable broth as an alternative - fail-closed, not classified vegetarian. The white wine stays in the risotto; no alcohol-free claim. The Fontina (substitute: a flavourful cheese like Gruyere per the source) has rennet/formulation unverified. The source notes the risotto needs about 30 minutes of constant stirring and offers a last glass of wine as the final liquid addition. No doneness endpoint applies to this dish.',
    grocery: 'Meat broth default; contains white wine; Fontina rennet unverified'
  },
  'wikibooks-de:de-minestrone': {
    summary: 'Potatoes and/or rice is a source alternative; bread and cheese are serving suggestions',
    detail: 'The source lists "4 potatoes and/or 150 g rice" - an either/or, kept as written, and notes natural rice may need pre-cooking. The serving suggestions - white bread alongside and cheese (e.g. Parmesan) grated over - are not included in the lines. The source describes minestrone as a leftovers dish and invites other vegetables, pasta or fried bacon cubes as variations - options, not listed lines. No doneness endpoint applies to this vegetable soup.',
    grocery: 'Potatoes and/or rice is an either/or; bread and cheese not included'
  },
  'wikibooks-de:de-lammkeule-geschmort': {
    summary: 'Stock cube formulation unverified; contains red wine; adapted 71°C lamb endpoint',
    detail: 'The stock cubes ("fette Brühe", count unstated) are a manufactured product, formulation unverified; enough broth is used to cover the leg. The salt for the leg, the optional mustard and the sauce thickener appear in the method but not in the ingredient list - flagged on their lines. The red wine stays in the braise; no alcohol-free claim. The source warns to trim the fat well against a strong mutton note and not to leave the potatoes in longer than one hour. The source braises 1.5 hours plus 1 hour - time is not a doneness check, so use the adapted measured endpoint below.',
    grocery: 'Stock cube formulation unverified; contains red wine'
  },
  'wikibooks-de:de-neuenburger-weissweinsuppe': {
    summary: 'Source gap: sour cream listed but never used; source vegetarian tag not adopted; contains white wine',
    detail: 'The source lists 2 dl sour cream (Sauerhalbrahm) but its method never uses it - the gap is kept visible rather than inventing a step. The source marks this vegetarian; the vegetable broth is a manufactured product whose formulation is unverified, so the tag is not adopted and diet stays unclassified. The white wine stays in the soup; no alcohol-free claim. The fresh herbs and the cheese-stick snack suggestion are optional extras, not included. The source presents this as a starter.',
    grocery: 'Sour cream listed but unused by the source method; broth formulation unverified'
  },
  'wikibooks-de:de-ensalada-de-patata': {
    summary: 'Contains Cointreau (currants soaked 24 h, alcohol retained); broth formulation unverified; grilled-meat side not included',
    detail: 'The currants soak in 100 ml Cointreau for at least 24 hours and go in uncooked - the alcohol is retained; the source offers Calvados or other spirits, or apple/grape juice for an alcohol-free version. The broth (a good quarter litre) is a manufactured product, formulation unverified. The salt in the potato cooking water is a process addition, not a line. The source suggests grilled or roasted meats alongside - a suggestion, not included.',
    grocery: 'Contains Cointreau; broth formulation unverified'
  },
  'wikibooks-de:de-kaspressknoedel': {
    summary: 'Cheese rennet unverified; dag measures kept as written; frying oil unstated',
    detail: 'The cheese (diced, the source footnote suggests e.g. Gouda) has rennet/formulation unverified, so diet stays unclassified. The source measures in dag (25 dag = 250 g), kept as written. The frying oil appears in the method but not in the ingredient list - flagged on its line. The source variant mixes bacon cubes into the dumpling mass - an option, not part of the listed lines. The egg-and-milk mixture is fried through.',
    grocery: 'Cheese rennet unverified; frying oil unstated'
  },
  'wikibooks-de:de-maultaschenlasagne': {
    summary: 'Maultaschen and packet sauce are manufactured products, formulations unverified; cheese amount unstated',
    detail: 'Maultaschen are Swabian filled pasta - traditionally a minced-meat and spinach filling; the filling\'s species and formulation are unverified, so the dish is fail-closed non-vegetarian without a meat-type group, and the package directions govern their cooking. The packet tomato sauce is likewise unverified. The grated cheese has no stated amount and rennet/formulation unverified. Salt, pepper and Italian herbs appear in the method but not in the ingredient list - flagged on their lines. The source notes a no-bake serving variant and an Indian-style curry-sauce variant - options, not part of the listed lines.',
    grocery: 'Maultaschen filling unverified; cheese amount unstated'
  },
  'wikibooks-de:de-belgische-zwiebelsuppe': {
    summary: 'Meat broth contradicts the source\'s vegetarian tag (tag not adopted); contains port wine; cheese rennet unverified',
    detail: 'The source box marks this soup vegetarian, but the listed 1.25 l meat broth (Fleischbrühe, species and formulation unstated) contradicts it - fail-closed non-vegetarian, no meat-type group, and the tag is not adopted. The port wine is stirred in without further boiling - the alcohol is retained, no alcohol-free claim. The hard cheese has rennet/formulation unverified. The source\'s glass measure for the port is kept as written.',
    grocery: 'Meat broth formulation unverified; contains port wine'
  },
  'wikibooks-de:de-ingwer-linsen-suppe': {
    summary: 'Vegan as listed; curry powder formulation unverified; optional cream garnish',
    detail: 'All listed lines are plant foods plus coconut milk - classified vegetarian (nothing animal-derived in the list). The curry powder is a manufactured blend, formulation unverified, measured to the desired heat level. The final step offers a garnish of a little coconut milk or cream - the cream option is dairy but not a listed line. The source suggests chives, parsley or coriander leaves on top - optional extras, not included.',
    grocery: 'Curry powder formulation unverified'
  },
  'wikibooks-de:de-huehnerbrust-rahmwirsing': {
    summary: 'Cup measure kept as written; milk and cream unstated; adapted 75°C poultry endpoint',
    detail: 'The sour cream is "1 Tasse" (cup) - the source\'s own measure, kept as written. The milk for the mash and the optional cream have no stated amounts; the cream appears in the method only - flagged on its line. The savoy should stay crisp per the source - do not braise it long. The chicken cooks "to the point" in about 20 minutes - time is not a doneness check, so use the adapted measured endpoint below.',
    grocery: 'Milk and cream amounts unstated'
  },
  'wikibooks-de:de-lachs-spinat-auflauf': {
    summary: 'Cheese rennet unverified; adapted 63°C fish endpoint',
    detail: 'The sheep\'s cheese and Edamer have rennet/formulation unverified. Lemon pepper is the source\'s signature seasoning; ordinary pepper is its stated alternative. The source suggests a dry white wine alongside - a suggestion, not an ingredient. The 30-minute bake is not a doneness check for the fish, so use the adapted measured endpoint below.',
    grocery: 'Cheese rennet unverified'
  },
  'wikibooks-de:de-hack-in-weisskohl': {
    summary: 'Mixed mince - species not stated; source says to taste the raw mixture (do not); adapted 71°C mince endpoint',
    detail: 'The mince is "gemischtes Hack" (mixed mince) - no single meat-type group. The source\'s method says to taste the mixture after seasoning - never taste raw mince; the adapted step below replaces this with a cooked sample. The par-boiling water (1 l) is discarded - a process liquid, kept in the method. The broth is a manufactured product, formulation unverified, and the source warns to pour it to half height only. The source warns the par-boiled cabbage stays hot inside for about ten minutes. The 1.5-hour braise is not a doneness check for the mince layers, so use the adapted measured endpoint below.',
    grocery: 'Mixed mince species not stated; broth formulation unverified'
  },
  'wikibooks-de:de-pfefferrahmschnitzel': {
    summary: 'Contains red wine; several seasonings unstated; adapted 71°C pork endpoint',
    detail: 'The red wine stays in the sauce; no alcohol-free claim. Butter, sunflower oil, paprika, thyme, sage and peppercorns have no stated amounts. The source sides (ribbon noodles, vegetables, rice or fried potatoes) are suggestions, not included. The source\'s doneness cue is "when the meat is through" - appearance and time are not doneness checks, so use the adapted measured endpoint below.',
    grocery: 'Contains red wine; fats and herbs unstated'
  },
  'wikibooks-de:de-kalafkalsch': {
    summary: 'Source says to taste the raw mixture (do not); cup measure kept as written; source 24-hour advice; adapted 71°C mince endpoint',
    detail: 'The source\'s method says to taste the mixture after kneading - never taste raw mince; the adapted step below replaces this with a cooked sample. The breadcrumbs are "2 Tassen" (cups) - the source\'s own measure, kept as written. The "can of crab juice" serving note is the source\'s tongue-in-cheek Simpsons reference, kept as written - omit it if unavailable. The source advises eating within 24 hours and not keeping much longer even well chilled - follow the handling note below for cooling and storage. "Until nicely done through" is not a doneness check, so use the adapted measured endpoint below.',
    grocery: 'Cup measure kept as written; crab juice optional (source joke)',
    handling: 'Two Plates handling note (not a change to the source method): cool leftovers promptly, cover, refrigerate below 5°C within 2 hours, and reheat only once until steaming hot throughout (at least 60°C) - the source\'s own advice is to eat within 24 hours. Count all time between 5°C and 60°C cumulatively: under 2 hours, use or refrigerate; 2 to 4 hours, use immediately or discard, not refrigerate for later; after 4 hours, discard.',
    handlingUrl: 'https://www.foodauthority.nsw.gov.au/consumer/special-care-foods/leftovers', handlingLabel: 'NSW leftovers guidance'
  },
  'wikibooks-de:de-kuerbis-ravioli-mit-salbei': {
    summary: 'Source states 4-6 portions, kept as the range; broth and brushing water appear in the method only',
    detail: 'The source states "4-6 Portion(en)" - the range is kept as written, so servings scale across 4 to 6. The vegetable broth (for deglazing the filling) and the water (mixed with the yolk for brushing) appear in the method but not in the source ingredient list; both are shown with that note, and the broth formulation is unverified. The raw-egg dough and yolk wash are cooked through in the simmering water.',
    grocery: 'Serves 4-6 as stated; broth formulation unverified'
  },
  'wikibooks-de:de-baerlauchsuppe': {
    summary: 'Broth formulation unverified; wild garlic needs confident identification - see the note below',
    detail: 'The vegetable broth formulation is unverified. The source\'s tips of fried shrimp or croutons alongside are suggestions, not included. Wild garlic (Bärlauch) is commonly foraged and has toxic lookalikes - see the identification note below before using foraged leaves.',
    grocery: 'Broth formulation unverified; shrimp/crouton tips excluded'
  },
  'wikibooks-de:de-crepes-mit-spargel': {
    summary: 'Butter, lemon zest, herbs and chives unstated; aioli/hollandaise tip excluded',
    detail: 'The butter, salt, lemon zest, chopped herbs and chive stalks have no stated amounts. The source\'s tip of aioli or sauce hollandaise alongside is a suggestion, not included.',
    grocery: 'Several seasonings unstated'
  },
  'wikibooks-de:de-fischsalat': {
    summary: 'Lemon juice, pepper and fennel fronds unstated; adapted 63°C fish endpoint',
    detail: 'The lemon juice, white peppercorns, fennel fronds and salt have no stated amounts; the peppercorns and fennel fronds are optional per the source (n.B.). The source steams the fish for a fixed time - time is not a doneness check, so use the adapted measured endpoint below. The source allows other firm white sea fish, fresh or thawed.',
    grocery: 'Several seasonings unstated; pepper and fennel fronds optional'
  },
  'wikibooks-de:de-griechischer-salat': {
    summary: 'The source lists no amounts at all - proportions are the cook\'s judgment',
    detail: 'The source lists the nine ingredients without any quantities; proportions are the cook\'s judgment and no amounts were invented. The feta (Schafskäse) rennet and formulation are unverified, so the source\'s Vegetarisch=Ja tag was not adopted. The source notes that in Greece each diner seasons their own plate, and that fresh lemon juice often replaces the vinegar.',
    grocery: 'No source quantities; feta formulation unverified'
  },
  'wikibooks-de:de-haehnchenroulade-mikrowelle': {
    summary: 'Pesto, ham and mozzarella formulations unverified; adapted 75°C poultry endpoint',
    detail: 'The pesto, Black Forest ham and mozzarella are manufactured products whose formulations are unverified. The garlic, salt, pepper, herbes de Provence and searing oil have no stated amounts (garlic optional per the source). The source tip of ribbon pasta alongside is a suggestion, not included. The source finishes the roulades in the microwave for a fixed time - time is not a doneness check, so use the adapted measured endpoint below.',
    grocery: 'Pesto and ham formulations unverified'
  },
  'wikibooks-de:de-hoernchennudeln-letcho': {
    summary: 'Contains red wine; the source lists the 2 l pasta water; Letscho formulation unverified',
    detail: 'The "sip" of red wine stays in the sauce - no alcohol-free claim. The source lists the 2 l pasta cooking water and its salt as ingredients; they are kept with that note. Letscho (jarred pepper-tomato stew) and the ham cubes are manufactured products whose formulations are unverified; the ham cubes are a cured pork product. The package directions govern the pasta cooking time.',
    grocery: 'Contains red wine; Letscho formulation unverified'
  },
  'wikibooks-de:de-lachs-in-vanille': {
    summary: 'Many seasonings unstated; chicken-broth granulate in a fish dish; adapted 63°C fish endpoint',
    detail: 'The curry, paprika, lemon juice, cayenne, salt, pepper and soy sauce have no stated amounts. The chicken-broth granulate is a manufactured chicken-based seasoning in a fish dish - kept as written, formulation unverified. The frying oil appears in the method but not in the source ingredient list and is shown with that note. The source fries the salmon without a doneness check, so use the adapted measured endpoint below.',
    grocery: 'Several seasonings unstated; chicken-based broth granulate'
  },
  'wikibooks-de:de-schwaemmchen': {
    summary: 'Source states 5-7 portions, kept as the range; cheese and spinach variants are source options, not included',
    detail: 'The source states "f. 5-7" portions - the range is kept as written, so servings scale across 5 to 7. The source\'s cheese and spinach-blue-cheese variants are listed options, not part of the base recipe, and are not included. The raw-egg batter is cooked through in the boiling water.',
    grocery: 'Serves 5-7 as stated'
  },
  'wikibooks-de:de-rheintaler-ribel': {
    summary: 'Soak at least 3 hours (traditionally overnight); Bratbutter/Bratcrème formulation unverified',
    detail: 'The Ribelmais must soak at least 3 hours - traditionally overnight under a damp towel, per the source. Bratbutter or Bratcrème is a Swiss frying-fat product whose formulation is unverified. The traditional apple sauce alongside, and the sugar or cocoa sprinkle, are serving suggestions, not included. Rheintaler Ribelmais (AOP) is a specialty cornmeal; the source offers no substitution.',
    grocery: 'Ribelmais specialty; frying fat formulation unverified'
  },
  "nhlbi:bavarian-beef": { summary: 'Nutrition stated by source (2003)', detail: 'NHLBI heart-healthy recipe from Keep the Beat (2003): a lighter adaptation rather than a traditional formulation. Nutrition values are stated by the source per serving and shown as-is; not computed by Two Plates.' },
  "nhlbi:beef-and-bean-chili": { summary: 'Nutrition stated by source (2003)', detail: 'NHLBI heart-healthy recipe from Keep the Beat (2003): a lighter adaptation rather than a traditional formulation. Nutrition values are stated by the source per serving and shown as-is; not computed by Two Plates.' },
  "nhlbi:beef-stroganoff": { summary: 'Nutrition stated by source (2003)', detail: 'NHLBI heart-healthy recipe from Keep the Beat (2003): a lighter adaptation rather than a traditional formulation. Nutrition values are stated by the source per serving and shown as-is; not computed by Two Plates.' },
  "nhlbi:black-skillet-beef-with-greens-and-red-potatoes": { summary: 'Nutrition stated by source (2003)', detail: 'NHLBI heart-healthy recipe from Keep the Beat (2003): a lighter adaptation rather than a traditional formulation. Nutrition values are stated by the source per serving and shown as-is; not computed by Two Plates.' },
  "nhlbi:quick-beef-casserole": { summary: 'Nutrition stated by source (2003)', detail: 'NHLBI heart-healthy recipe from Keep the Beat (2003): a lighter adaptation rather than a traditional formulation. Nutrition values are stated by the source per serving and shown as-is; not computed by Two Plates.' },
  "nhlbi:scrumptious-meat-loaf": { summary: 'Nutrition stated by source (2003)', detail: 'NHLBI heart-healthy recipe from Keep the Beat (2003): a lighter adaptation rather than a traditional formulation. Nutrition values are stated by the source per serving and shown as-is; not computed by Two Plates.' },
  "nhlbi:stir-fried-beef-and-potatoes": { summary: 'Nutrition stated by source (2003)', detail: 'NHLBI heart-healthy recipe from Keep the Beat (2003): a lighter adaptation rather than a traditional formulation. Nutrition values are stated by the source per serving and shown as-is; not computed by Two Plates.' },
  "nhlbi:stir-fried-beef-and-chinese-vegetables": { summary: 'Nutrition stated by source (2003)', detail: 'NHLBI heart-healthy recipe from Keep the Beat (2003): a lighter adaptation rather than a traditional formulation. Nutrition values are stated by the source per serving and shown as-is; not computed by Two Plates.' },
  "nhlbi:baked-pork-chops": { summary: 'Nutrition stated by source (2003)', detail: 'NHLBI heart-healthy recipe from Keep the Beat (2003): a lighter adaptation rather than a traditional formulation. Nutrition values are stated by the source per serving and shown as-is; not computed by Two Plates.' },
  "nhlbi:shish-kabob": { summary: 'Nutrition stated by source (2003)', detail: 'NHLBI heart-healthy recipe from Keep the Beat (2003): a lighter adaptation rather than a traditional formulation. Nutrition values are stated by the source per serving and shown as-is; not computed by Two Plates.' },
  "nhlbi:spicy-veal-roast": { summary: 'Nutrition stated by source (2003)', detail: 'NHLBI heart-healthy recipe from Keep the Beat (2003): a lighter adaptation rather than a traditional formulation. Nutrition values are stated by the source per serving and shown as-is; not computed by Two Plates.' },
  "nhlbi:barbecued-chicken": { summary: 'Nutrition stated by source (2003)', detail: 'NHLBI heart-healthy recipe from Keep the Beat (2003): a lighter adaptation rather than a traditional formulation. Nutrition values are stated by the source per serving and shown as-is; not computed by Two Plates.' },
  "nhlbi:barbecued-chicken-spicy-southern-style": { summary: 'Nutrition stated by source (2003)', detail: 'NHLBI heart-healthy recipe from Keep the Beat (2003): a lighter adaptation rather than a traditional formulation. Nutrition values are stated by the source per serving and shown as-is; not computed by Two Plates.' },
  "nhlbi:chicken-gumbo": { summary: 'Nutrition stated by source (2003)', detail: 'NHLBI heart-healthy recipe from Keep the Beat (2003): a lighter adaptation rather than a traditional formulation. Nutrition values are stated by the source per serving and shown as-is; not computed by Two Plates.' },
  "nhlbi:chicken-and-rice": { summary: 'Nutrition stated by source (2003)', detail: 'NHLBI heart-healthy recipe from Keep the Beat (2003): a lighter adaptation rather than a traditional formulation. Nutrition values are stated by the source per serving and shown as-is; not computed by Two Plates.' },
  "nhlbi:chicken-and-spanish-rice": { summary: 'Nutrition stated by source (2003)', detail: 'NHLBI heart-healthy recipe from Keep the Beat (2003): a lighter adaptation rather than a traditional formulation. Nutrition values are stated by the source per serving and shown as-is; not computed by Two Plates.' },
  "nhlbi:chicken-marsala": { summary: 'Nutrition stated by source (2003)', detail: 'NHLBI heart-healthy recipe from Keep the Beat (2003): a lighter adaptation rather than a traditional formulation. Nutrition values are stated by the source per serving and shown as-is; not computed by Two Plates.' },
  "nhlbi:chicken-orientale": { summary: 'Nutrition stated by source (2003)', detail: 'NHLBI heart-healthy recipe from Keep the Beat (2003): a lighter adaptation rather than a traditional formulation. Nutrition values are stated by the source per serving and shown as-is; not computed by Two Plates.' },
  "nhlbi:chicken-ratatouille": { summary: 'Nutrition stated by source (2003)', detail: 'NHLBI heart-healthy recipe from Keep the Beat (2003): a lighter adaptation rather than a traditional formulation. Nutrition values are stated by the source per serving and shown as-is; not computed by Two Plates.' },
  "nhlbi:chicken-salad": { summary: 'Nutrition stated by source (2003)', detail: 'NHLBI heart-healthy recipe from Keep the Beat (2003): a lighter adaptation rather than a traditional formulation. Nutrition values are stated by the source per serving and shown as-is; not computed by Two Plates.' },
  "nhlbi:chicken-stew": { summary: 'Nutrition stated by source (2003)', detail: 'NHLBI heart-healthy recipe from Keep the Beat (2003): a lighter adaptation rather than a traditional formulation. Nutrition values are stated by the source per serving and shown as-is; not computed by Two Plates.' },
  "nhlbi:crispy-oven-fried-chicken": { summary: 'Nutrition stated by source (2003)', detail: 'NHLBI heart-healthy recipe from Keep the Beat (2003): a lighter adaptation rather than a traditional formulation. Nutrition values are stated by the source per serving and shown as-is; not computed by Two Plates.' },
  "nhlbi:finger-licking-curried-chicken": { summary: 'Nutrition stated by source (2003)', detail: 'NHLBI heart-healthy recipe from Keep the Beat (2003): a lighter adaptation rather than a traditional formulation. Nutrition values are stated by the source per serving and shown as-is; not computed by Two Plates.' },
  "nhlbi:grilled-chicken-with-green-chile-sauce": { summary: 'Nutrition stated by source (2003)', detail: 'NHLBI heart-healthy recipe from Keep the Beat (2003): a lighter adaptation rather than a traditional formulation. Nutrition values are stated by the source per serving and shown as-is; not computed by Two Plates.' },
  "nhlbi:jamaican-jerk-chicken": { summary: 'Nutrition stated by source (2003)', detail: 'NHLBI heart-healthy recipe from Keep the Beat (2003): a lighter adaptation rather than a traditional formulation. Nutrition values are stated by the source per serving and shown as-is; not computed by Two Plates.' },
  "nhlbi:20-minute-chicken-creole": { summary: 'Nutrition stated by source (2003)', detail: 'NHLBI heart-healthy recipe from Keep the Beat (2003): a lighter adaptation rather than a traditional formulation. Nutrition values are stated by the source per serving and shown as-is; not computed by Two Plates.' },
  "nhlbi:very-lemony-chicken": { summary: 'Nutrition stated by source (2003)', detail: 'NHLBI heart-healthy recipe from Keep the Beat (2003): a lighter adaptation rather than a traditional formulation. Nutrition values are stated by the source per serving and shown as-is; not computed by Two Plates.' },
  "nhlbi:autumn-turkey-stuffed-cabbage": { summary: 'Nutrition stated by source (2003)', detail: 'NHLBI heart-healthy recipe from Keep the Beat (2003): a lighter adaptation rather than a traditional formulation. Nutrition values are stated by the source per serving and shown as-is; not computed by Two Plates.' },
  "nhlbi:spaghetti-with-turkey-meat-sauce": { summary: 'Nutrition stated by source (2003)', detail: 'NHLBI heart-healthy recipe from Keep the Beat (2003): a lighter adaptation rather than a traditional formulation. Nutrition values are stated by the source per serving and shown as-is; not computed by Two Plates.' },
  "nhlbi:turkey-meat-loaf": { summary: 'Nutrition stated by source (2003)', detail: 'NHLBI heart-healthy recipe from Keep the Beat (2003): a lighter adaptation rather than a traditional formulation. Nutrition values are stated by the source per serving and shown as-is; not computed by Two Plates.' },
  "nhlbi:baked-salmon-dijon": { summary: 'Nutrition stated by source (2003)', detail: 'NHLBI heart-healthy recipe from Keep the Beat (2003): a lighter adaptation rather than a traditional formulation. Nutrition values are stated by the source per serving and shown as-is; not computed by Two Plates.' },
  "nhlbi:baked-trout": { summary: 'Nutrition stated by source (2003)', detail: 'NHLBI heart-healthy recipe from Keep the Beat (2003): a lighter adaptation rather than a traditional formulation. Nutrition values are stated by the source per serving and shown as-is; not computed by Two Plates.' },
  "nhlbi:catfish-stew-and-rice": { summary: 'Nutrition stated by source (2003)', detail: 'NHLBI heart-healthy recipe from Keep the Beat (2003): a lighter adaptation rather than a traditional formulation. Nutrition values are stated by the source per serving and shown as-is; not computed by Two Plates.' },
  "nhlbi:fish-veronique": { summary: 'Nutrition stated by source (2003)', detail: 'NHLBI heart-healthy recipe from Keep the Beat (2003): a lighter adaptation rather than a traditional formulation. Nutrition values are stated by the source per serving and shown as-is; not computed by Two Plates.' },
  "nhlbi:mediterranean-baked-fish": { summary: 'Nutrition stated by source (2003)', detail: 'NHLBI heart-healthy recipe from Keep the Beat (2003): a lighter adaptation rather than a traditional formulation. Nutrition values are stated by the source per serving and shown as-is; not computed by Two Plates.' },
  "nhlbi:mouth-watering-oven-fried-fish": { summary: 'Nutrition stated by source (2003)', detail: 'NHLBI heart-healthy recipe from Keep the Beat (2003): a lighter adaptation rather than a traditional formulation. Nutrition values are stated by the source per serving and shown as-is; not computed by Two Plates.' },
  "nhlbi:scallop-kabobs": { summary: 'Nutrition stated by source (2003)', detail: 'NHLBI heart-healthy recipe from Keep the Beat (2003): a lighter adaptation rather than a traditional formulation. Nutrition values are stated by the source per serving and shown as-is; not computed by Two Plates.' },
  "nhlbi:spicy-baked-fish": { summary: 'Nutrition stated by source (2003)', detail: 'NHLBI heart-healthy recipe from Keep the Beat (2003): a lighter adaptation rather than a traditional formulation. Nutrition values are stated by the source per serving and shown as-is; not computed by Two Plates.' },
  "nhlbi:spinach-stuffed-sole": { summary: 'Nutrition stated by source (2003)', detail: 'NHLBI heart-healthy recipe from Keep the Beat (2003): a lighter adaptation rather than a traditional formulation. Nutrition values are stated by the source per serving and shown as-is; not computed by Two Plates.' },
  "nhlbi:tuna-salad": { summary: 'Nutrition stated by source (2003)', detail: 'NHLBI heart-healthy recipe from Keep the Beat (2003): a lighter adaptation rather than a traditional formulation. Nutrition values are stated by the source per serving and shown as-is; not computed by Two Plates.' },
  "nhlbi:chillin-out-pasta-salad": { summary: 'Nutrition stated by source (2003)', detail: 'NHLBI heart-healthy recipe from Keep the Beat (2003): a lighter adaptation rather than a traditional formulation. Nutrition values are stated by the source per serving and shown as-is; not computed by Two Plates.' },
  "nhlbi:classic-macaroni-and-cheese": { summary: 'Nutrition stated by source (2003)', detail: 'NHLBI heart-healthy recipe from Keep the Beat (2003): a lighter adaptation rather than a traditional formulation. Nutrition values are stated by the source per serving and shown as-is; not computed by Two Plates.' },
  "nhlbi:red-hot-fusilli": { summary: 'Nutrition stated by source (2003)', detail: 'NHLBI heart-healthy recipe from Keep the Beat (2003): a lighter adaptation rather than a traditional formulation. Nutrition values are stated by the source per serving and shown as-is; not computed by Two Plates.' },
  "nhlbi:black-beans-with-rice": { summary: 'Nutrition stated by source (2003)', detail: 'NHLBI heart-healthy recipe from Keep the Beat (2003): a lighter adaptation rather than a traditional formulation. Nutrition values are stated by the source per serving and shown as-is; not computed by Two Plates.' },
  "nhlbi:caribbean-pink-beans": { summary: 'Nutrition stated by source (2003)', detail: 'NHLBI heart-healthy recipe from Keep the Beat (2003): a lighter adaptation rather than a traditional formulation. Nutrition values are stated by the source per serving and shown as-is; not computed by Two Plates.' },
  "nhlbi:new-orleans-red-beans": { summary: 'Nutrition stated by source (2003)', detail: 'NHLBI heart-healthy recipe from Keep the Beat (2003): a lighter adaptation rather than a traditional formulation. Nutrition values are stated by the source per serving and shown as-is; not computed by Two Plates.' },
  "nhlbi:summer-vegetable-spaghetti": { summary: 'Nutrition stated by source (2003)', detail: 'NHLBI heart-healthy recipe from Keep the Beat (2003): a lighter adaptation rather than a traditional formulation. Nutrition values are stated by the source per serving and shown as-is; not computed by Two Plates.' },
  "nhlbi:vegetarian-spaghetti-sauce": { summary: 'Nutrition stated by source (2003)', detail: 'NHLBI heart-healthy recipe from Keep the Beat (2003): a lighter adaptation rather than a traditional formulation. Nutrition values are stated by the source per serving and shown as-is; not computed by Two Plates.' },
  "nhlbi:zucchini-lasagna": { summary: 'Nutrition stated by source (2003)', detail: 'NHLBI heart-healthy recipe from Keep the Beat (2003): a lighter adaptation rather than a traditional formulation. Nutrition values are stated by the source per serving and shown as-is; not computed by Two Plates.' },
  "nhlbi:mexican-pozole": { summary: 'Nutrition stated by source (2003)', detail: 'NHLBI heart-healthy recipe from Keep the Beat (2003): a lighter adaptation rather than a traditional formulation. Nutrition values are stated by the source per serving and shown as-is; not computed by Two Plates.' },

};
export const IMPORTED = new Map();

// Reviewed per-record diet classifications. A dish gets a diet class ONLY
// when a reviewer derived it from the actual retained lines (never from
// source diet tags). Anything unreviewed or uncertain - meat, egg, cheese,
// bread, stock, dressings - stays 'unknown' and is never shown as veg or
// chicken. Keyed by record id; the source modules stay verbatim.
const REVIEWED_DIET = {
  'unitools:ohridska-pastrmka': { diet: 'nonveg', meatKind: 'fish', basis: 'Four whole gutted trout explicit in ingredient line 1; all ten source lines independently read. No fish weight, origin, product formulation or cross-contact clearance inferred.' },
  'unitools:souvla': { diet: 'nonveg', meatKind: 'pork', basis: 'Pork shoulder explicit in ingredient line 1; not the summary pork-or-lamb wording. Pita formulation and cross-contact not cleared.' },
  'unitools:qingzheng-yu': { diet: 'nonveg', meatKind: 'fish', basis: 'Whole gutted sea bass or bream explicit in source line1. Sauce and oil formulations not cleared.' },
  'unitools:tortilla-espanola': { diet: 'egg', basis: 'All five source lines reviewed: potato, onion, eggs, olive oil, salt. Egg present; no meat named.' },
  'unitools:chakhokhbili': { diet: 'nonveg', meatKind: 'chicken', basis: 'Chicken explicit in source line1; no cut or bone assumption. Blend formulation not cleared.' },
  'unitools:irish-stew': { diet: 'nonveg', meatKind: 'lamb', basis: 'Bone-in lamb neck or shoulder explicit in source line1. Vegetable stock alternative does not clear lamb.' },
  'unitools:farikal': { diet: 'nonveg', meatKind: 'mutton', basis: 'Bone-in mutton explicit in source line1. Not renamed lamb. Optional flour retained.' },
  'unitools:draniki': { diet: 'veg', basis: '2026-11-11: all six retained lines reviewed: potatoes, onion, vegetable oil, soured cream, dill, salt/pepper. Dairy present; purchased product formulation and cross-contact not cleared.' },
  // Galayet includes flatbreads of unspecified formulation: leave unknown.
  // All 10 retained lines are plant foods, olive oil and salt/pepper.
  'unitools:ratatouille': { diet: 'veg', basis: 'lines reviewed 2026-11-11: aubergine, courgette, pepper, tomatoes, onion, garlic, olive oil, thyme, basil, salt/pepper - no meat/fish/egg/dairy/grain line' },
  'wikibooks:paprika-chicken': { diet: 'nonveg', meatKind: 'chicken', basis: 'Whole chicken explicit in source line 1; all thirteen source lines independently read 2026-11-12. Dairy formulations and cross-contact not cleared.' },
  'wikibooks:pork-and-lima-skillet': { diet: 'nonveg', meatKind: 'pork', basis: 'Pork loin chops explicit in source line 2; all six source lines independently read 2026-11-12. Gravy-base formulation and cross-contact not cleared.' },
  'wikibooks:spaghetti-bolognese': { diet: 'nonveg', meatKind: 'beef', basis: 'Ground beef explicit in source line 2 and ham-or-bacon in line 1; all eighteen source lines independently read 2026-11-12. Stock and cheese formulations and cross-contact not cleared.' },
  'wikibooks:barbecued-spare-ribs': { diet: 'nonveg', meatKind: 'pork', basis: 'Pork spare ribs explicit in source line 1; all twelve source lines independently read 2026-11-12. Soy, hoisin and stock formulations and cross-contact not cleared; source gluten-free category not accepted.' },
  'wikibooks:jambalaya-i': { diet: 'nonveg', meatKind: 'chicken', basis: 'Cooked turkey or chicken explicit in source line 12; all thirteen source lines independently read 2026-11-12. Broth formulation and cross-contact not cleared.' },
  // Poutine: canned poutine sauce/gravy formulation unverified (meat content possible); fresh-curd dairy noted but diet stays unknown.
  // Penne: Italian sausage species unstated; sauce formulation unverified.
  // Tacos: beef-substitute, tortilla, bean and cheese formulations unverified despite source vegetarian category.
  // Mac and cheese: five-cheese dish, rennet/formulations unverified. Agnolotti: filling composition unspecified, often meat.
  // Garbanzo soup: all plant lines, but manufactured broth formulation unverified.
  'wikibooks:asparagus-soup': { diet: 'veg', basis: 'All six source lines reviewed 2026-11-12: asparagus, water, shallot, butter, cream, salt/pepper/cayenne. Dairy present; no meat, stock or egg line. Product formulations and cross-contact not cleared.' },
  'wikibooks:beef-gravy-soup': { diet: 'nonveg', meatKind: 'beef', basis: 'Lean beef explicit in source line 1; all six lines reviewed 2026-11-12. Broth formulations and cross-contact not cleared.' },
  'wikibooks:black-peppered-chicken-spaghetti': { diet: 'nonveg', meatKind: 'chicken', basis: 'Chicken fillets explicit in source line 9; all twelve lines reviewed 2026-11-12. Cream formulation and cross-contact not cleared.' },
  'wikibooks:hot-and-sour-soup': { diet: 'nonveg', basis: 'Cooked shredded chicken or pork explicit in source line 3 (source alternative, both meat); all thirteen lines reviewed 2026-11-12. Egg present. Stock and sauce formulations not cleared.' },
  'wikibooks:pepper-soup': { diet: 'nonveg', basis: 'Meat explicit in source line 1 as a source alternative (goat, catfish, chicken, or assorted meats); all nine lines reviewed 2026-11-12. Seasoning-cube and spice-mix formulations not cleared.' },
  'wikibooks:tom-kha-kai': { diet: 'nonveg', meatKind: 'chicken', basis: 'Chicken explicit in source line 6; all fourteen lines reviewed 2026-11-12. Stock and soy formulations and cross-contact not cleared.' },
  'wikibooks:ertesuppe-pea-soup': { diet: 'nonveg', meatKind: 'pork', basis: 'Smoked pork butt explicit in source line 3; all seven lines reviewed 2026-11-12. Product curing formulation and cross-contact not cleared.' },
  'wikibooks:lengua-de-res': { diet: 'nonveg', meatKind: 'beef', basis: 'Beef tongue explicit in source line 1; all eight lines reviewed 2026-11-12.' },
  'wikibooks:bacon-wrapped-scallops': { diet: 'nonveg', basis: 'Bacon (line 5) and scallops (line 6) explicit; all six lines reviewed 2026-11-12. Glaze and soy formulations not cleared.' },
  'wikibooks:chicken-fried-steak': { diet: 'nonveg', meatKind: 'beef', basis: 'Beef steaks explicit in source line 6; all nine lines reviewed 2026-11-12. Broth formulation not cleared.' },
  'wikibooks:chipsi-mayai': { diet: 'egg', basis: 'All nine source lines reviewed 2026-11-12: potatoes, eggs, oil, optional onion/tomato/chili, salt, pepper, coriander. Egg central; no meat line.' },
  'wikibooks:chuu-chee-fish': { diet: 'nonveg', meatKind: 'fish', basis: 'Whole bream explicit in source line 1; all nine lines reviewed 2026-11-12. Curry-paste formulation (typically contains shrimp paste) not cleared.' },
  'wikibooks:cuban-picadillo': { diet: 'nonveg', meatKind: 'beef', basis: 'Ground beef explicit in source line 1; all twelve lines reviewed 2026-11-12. Olive and seasoning formulations not cleared.' },
  'wikibooks:garlic-pork-chops-black-mushrooms': { diet: 'nonveg', meatKind: 'pork', basis: 'Pork chops explicit in source line 10; all ten lines reviewed 2026-11-12. Broth and soy formulations not cleared.' },
  'wikibooks:honey-peppered-salmon': { diet: 'nonveg', meatKind: 'fish', basis: 'Salmon fillets explicit in source line 9; all nine lines reviewed 2026-11-12.' },
  'wikibooks:lemon-rosemary-pork-tenderloin': { diet: 'nonveg', meatKind: 'pork', basis: 'Pork tenderloins explicit in source line 10; all ten lines reviewed 2026-11-12.' },
  'wikibooks:maple-planked-salmon': { diet: 'nonveg', meatKind: 'fish', basis: 'Salmon explicit in source line 1; all eight lines reviewed 2026-11-12.' },
  'wikibooks:meatloaf-iv': { diet: 'nonveg', meatKind: 'beef', basis: 'Ground beef explicit in source line 11; all thirteen lines reviewed 2026-11-12. Worcestershire formulation (typically anchovies) and Parmesan not cleared.' },
  'wikibooks:mediterranean-green-chicken': { diet: 'nonveg', meatKind: 'chicken', basis: 'Chicken explicit in source line 10 (whole bird or 8 pieces); all ten lines reviewed 2026-11-12.' },
  'wikibooks:poppyseed-chicken': { diet: 'nonveg', meatKind: 'chicken', basis: 'Chicken breast explicit in source line 1 (pre-cooked); all seven lines reviewed 2026-11-12. Dairy product formulations not cleared.' },
  'wikibooks:schweinsbraten': { diet: 'nonveg', meatKind: 'pork', basis: 'Pork piece explicit in source line 2; all eight lines reviewed 2026-11-12. Contains beer.' },
  'wikibooks:shrimp-scampi-angel-hair': { diet: 'nonveg', meatKind: 'fish', basis: 'Shrimp explicit as the packaged product (source line 1); all six lines reviewed 2026-11-12. Product sauce formulation not cleared.' },
  'wikibooks:spicy-chicken-cutlets': { diet: 'nonveg', meatKind: 'chicken', basis: 'Chicken breasts explicit in source line 1; all thirteen lines reviewed 2026-11-12. Broth formulation not cleared; optional vodka.' },
  'wikibooks:tuna-glop': { diet: 'nonveg', meatKind: 'fish', basis: 'Chunk tuna explicit in source line 3; all five lines reviewed 2026-11-12. Canned-soup formulation not cleared.' },
  'wikibooks:wine-roasted-pork-roast': { diet: 'nonveg', meatKind: 'pork', basis: 'Pork loin roast explicit in source line 3; all five lines reviewed 2026-11-12. Seasoning-blend formulation not cleared; contains red wine.' },
  // bean-soup-vegetarian: Parmesan rennet and canned-broth formulations unverified despite the source vegetarian name; diet stays unknown.
  // creamy-tomato-bean-soup: Cream-cheese formulation unverified; all other lines plant foods. Diet stays unknown.
  // crock-pot-potato-soup: Canned chicken-broth formulation unverified; diet stays unknown.
  // mushroom-soup: Manufactured beef-stock formulation unverified; diet stays unknown. Contains sherry.
  // pasta-soup-for-kids: Tofu and vegetable-broth formulations unverified; diet stays unknown.
  // potato-soup: Chicken-bouillon formulation unverified; diet stays unknown.
  // spiced-pumpkin-soup: Broth-or-stock alternative formulation unverified; diet stays unknown.
  // sausage-and-tortellini-soup: Italian sausage species unstated; tortellini and broth formulations unverified; diet stays unknown.
  // vichyssoise: Chicken-bouillon formulation unverified; diet stays unknown. Contains white wine.
  // simple-italian-sausage-spaghetti: Italian sausage species unstated; diet stays unknown.
  // sweet-italian-sausage-skillet: Italian sausage species unstated; diet stays unknown.
  'wikibooks:bean-and-bacon-bake': { diet: 'nonveg', meatKind: 'pork', basis: 'Bacon explicit in source line 3 (6 strips, or microwave-ready bacon alternative); all six source lines independently read 2026-11-12. Cheese absent; bacon product formulation and cross-contact not cleared.' },
  'wikibooks:brown-rice-casserole': { diet: 'unknown', basis: 'All six source lines independently read 2026-11-12: processed cheese is a manufactured product with unverified rennet; no meat named. Not classified vegetarian.' },
  'wikibooks:cazuela-gallega': { diet: 'nonveg', meatKind: 'pork', basis: 'Ham slices explicit in source line 3; all seven source lines independently read 2026-11-12. Parmesan formulation and cross-contact not cleared.' },
  'wikibooks:chuck-wagon-beans': { diet: 'nonveg', basis: 'Bacon, ground chuck (beef) and canned pork-and-beans explicit across source lines 1–4; mixed species explicit. All thirteen source lines independently read 2026-11-12. Product formulations not cleared.' },
  'wikibooks:cioppino-italian-seafood-stew': { diet: 'nonveg', meatKind: 'fish', basis: 'Mixed seafood explicit: crab, mussels, scallops and white fish fillets across source lines; all eighteen source lines independently read 2026-11-12. Clam-juice and stock formulations not cleared.' },
  'wikibooks:corny-souffle': { diet: 'veg', basis: 'All six source lines independently read 2026-11-12: corn, eggs, milk, butter, flour, sugar. Egg and dairy present; no meat named. Product formulations not cleared.' },
  'wikibooks:crock-pot-beef-stew': { diet: 'nonveg', meatKind: 'beef', basis: 'Stew beef explicit in source line 1 (2 lb / 900 g); all ten source lines independently read 2026-11-12. Canned tomato formulation not cleared.' },
  'wikibooks:cucumber-sprout-sandwich': { diet: 'unknown', basis: 'All twelve source lines independently read 2026-11-12: cream cheese and mayonnaise are manufactured products with unverified formulations; no meat named. Not classified vegetarian.' },
  'wikibooks:dutch-oven-beans': { diet: 'nonveg', basis: 'Bacon and ground beef explicit in source lines 1–2, plus four canned bean products including pork-and-beans; mixed species explicit. All fourteen source lines independently read 2026-11-12. Product formulations not cleared.' },
  'wikibooks:fabes-con-almejas': { diet: 'nonveg', meatKind: 'fish', basis: 'Live clams explicit in source line 6 (24 littleneck or mahogany); all eleven source lines independently read 2026-11-12. Ham formulation not cleared; diet rests on the clam line.' },
  'wikibooks:keralan-vegetable-stew': { diet: 'veg', basis: 'All sixteen source lines independently read 2026-11-12: coconut, vegetables, spices, oil, vinegar and flour; no animal product named. Source files it vegan. Product formulations not cleared.' },
  'wikibooks:macaroni-pie': { diet: 'unknown', basis: 'All eleven source lines independently read 2026-11-12: grated cheese formulation (rennet) unverified; eggs and evaporated milk present; no meat named. Not classified vegetarian.' },
  'wikibooks:malvani-chicken-curry': { diet: 'nonveg', meatKind: 'chicken', basis: 'Chicken explicit in source line 4 (800 g / 8 pieces); all thirteen source lines independently read 2026-11-12. Malvani masala blend formulation not cleared.' },
  'wikibooks:meatless-sloppy-joes': { diet: 'unknown', basis: 'All eight source lines independently read 2026-11-12: no meat named, but canned chili beans, barbecue sauce and buns are manufactured products with unverified formulations (barbecue sauce can contain anchovy-derived ingredients). Source files it vegetarian; displayed as an unverified claim.' },
  'wikibooks:mini-three-cheese-english-muffin-pizzas': { diet: 'unknown', basis: 'All six source lines independently read 2026-11-12: frankfurter sausage species not stated; cheese formulations unverified. Fails closed against meat exclusions.' },
  'wikibooks:mozzarella-tuna-melts': { diet: 'nonveg', meatKind: 'fish', basis: 'Water-packed tuna explicit in source line 1 (6 oz can); all eight source lines independently read 2026-11-12. Mayonnaise and cheese formulations not cleared.' },
  'wikibooks:parmesan-cheese-souffle': { diet: 'unknown', basis: 'All nine source lines independently read 2026-11-12: Parmesan rennet unverified; eggs and sour cream present; no meat named. Source files it vegetarian; displayed as an unverified claim.' },
  'wikibooks:mostaccioli': { diet: 'unknown', basis: 'All nineteen source lines independently read 2026-11-12: ground beef explicit, but the Italian sausage species is not stated and cheese rennet is unverified, so the dish fails closed against pork, beef and other meat exclusions rather than classifying as single-species beef.' },
  'wikibooks:potato-chickpea-curry': { diet: 'veg', basis: 'All seven source lines independently read 2026-11-12: potatoes, chickpeas, coconut milk, onion, garlic, curry powder, olive oil; no animal product named. Source files it vegan. Canned-product formulations not cleared.' },
  'wikibooks:potato-curry-aloo-masala': { diet: 'veg', basis: 'All nine source lines independently read 2026-11-12: potatoes, oil, mustard seed, chana dhal, curry leaves, onion, chillies, turmeric, salt; no animal product named. Source files it vegan.' },
  'wikibooks:radish-pie': { diet: 'unknown', basis: 'All twelve source lines independently read 2026-11-12: goat cheese rennet unverified; eggs and cream present; no meat named. Source files it vegetarian; displayed as an unverified claim.' },
  'wikibooks:reuben-sandwich': { diet: 'nonveg', meatKind: 'beef', basis: 'Corned beef explicit in source line 1 (½ lb; pastrami alternative also beef); all eight source lines independently read 2026-11-12. Dressing and cheese formulations not cleared.' },
  'wikibooks:risotto-alla-milanese': { diet: 'unknown', basis: 'All ten source lines independently read 2026-11-12: chicken broth is a manufactured product with unverified formulation; the source offers a vegetable-broth substitution. Parmesan rennet unverified. Not classified vegetarian or meat-exclusion-safe.' },
  'wikibooks:sloppy-joes': { diet: 'nonveg', meatKind: 'beef', basis: 'Ground beef explicit in source line 1 (1 lb / 450 g); all seven source lines independently read 2026-11-12. Ketchup and barbecue-sauce formulations not cleared.' },
  'wikibooks:spaghetti-bake': { diet: 'nonveg', basis: 'Ground turkey or beef explicit as a source alternative in line 1, both covered by the source method; species open. All ten source lines independently read 2026-11-12. Dairy product formulations not cleared.' },
  'wikibooks:tripes-a-la-mode-de-caen': { diet: 'nonveg', meatKind: 'beef', basis: 'Beef tripe, calf\'s foot and marrow bone explicit in source lines 1–3; all fourteen source lines independently read 2026-11-12. Beef-broth formulation not cleared.' },
  'wikibooks:yetsom-shiro': { diet: 'veg', basis: 'All twelve source lines independently read 2026-11-12: chickpea flour, oil, onion, garlic, spices, broth-or-water; no animal product named. Source files it vegan. Berbere blend and broth formulations not cleared; the water alternative avoids the broth.' },
  'wikibooks:yogurt-curry-soup-kadhi': { diet: 'veg', basis: 'All twelve source lines independently read 2026-11-12: chickpea flour, yogurt, ghee and spices; dairy (yogurt, ghee) present; no meat or egg named. Yogurt formulation not cleared.' },

  'wikibooks:baked-penne': { diet: 'unknown', basis: 'All twelve source lines independently read 2026-11-12: ricotta and mozzarella rennet unverified; eggs present; no meat named. Not classified vegetarian.' },
  'wikibooks:beanburger': { diet: 'veg', basis: 'All seven source lines independently read 2026-11-12: beans, oats, carrots, onion, pepper, spices, egg; no meat named. Source files it vegetarian and notes a vegan egg-free option.' },
  'wikibooks:chanterelle-goulash': { diet: 'veg', basis: 'All ten source lines independently read 2026-11-12: chanterelles, onions, butter or oil, sour cream, paprika, vinegar, flour, parsley; dairy present; no meat or egg named. Product formulations not cleared.' },
  'wikibooks:chicken-bacon-broccoli-alfredo-spaghetti': { diet: 'nonveg', basis: 'Chicken breast and streaky bacon explicit in source lines; mixed species (chicken, pork). All eleven source lines independently read 2026-11-12. Parmesan formulation not cleared.' },
  'wikibooks:chicken-tetrazzini': { diet: 'nonveg', meatKind: 'chicken', basis: 'Shredded rotisserie chicken and chicken broth explicit in source lines; all fourteen source lines independently read 2026-11-12. Parmesan formulation not cleared.' },
  'wikibooks:corn-chowder-i': { diet: 'unknown', basis: 'All twelve source lines independently read 2026-11-12: chicken bouillon cubes, milk and cream are manufactured products with unverified formulations; no meat named. Not classified vegetarian.' },
  'wikibooks:gambas-al-ajillo-garlic-shrimp': { diet: 'nonveg', meatKind: 'fish', basis: 'Shrimp explicit in source line 1 (1 pound); all seven source lines independently read 2026-11-12.' },
  'wikibooks:garlic-parmesan-pasta': { diet: 'unknown', basis: 'All nine source lines independently read 2026-11-12: Parmesan rennet and butter formulations unverified; no meat named. Source files it vegetarian; displayed as an unverified claim.' },
  'wikibooks:hutspot-dutch-mashed-vegetables': { diet: 'nonveg', meatKind: 'pork', basis: 'Cubed ham explicit in source line 4; all five source lines independently read 2026-11-12. Cheese (type unstated) formulation not cleared.' },
  'wikibooks:jambons': { diet: 'nonveg', meatKind: 'pork', basis: 'Diced ham explicit in source line 5; all seven source lines independently read 2026-11-12. Cheese and puff-pastry formulations not cleared.' },
  'wikibooks:manx-smoked-salmon': { diet: 'nonveg', meatKind: 'fish', basis: 'Kippers and smoked salmon explicit in source lines 1–2; all six source lines independently read 2026-11-12. Cream formulation not cleared.' },
  'wikibooks:menemen-eggs-with-onion-green-pepper-and-tomato': { diet: 'veg', basis: 'All ten source lines independently read 2026-11-12: eggs, vegetables, olive oil, herbs and spices; no meat named. Source files it vegetarian.' },
  'wikibooks:ossobuco-alla-milanese': { diet: 'nonveg', basis: 'Veal shanks (beef species) and anchovy fillets explicit in source lines; mixed species explicit. All seventeen source lines independently read 2026-11-12. Meat-broth formulation not cleared.' },
  'wikibooks:paella-valenciana': { diet: 'nonveg', basis: 'Chicken and rabbit-or-duck explicit, optional boiled snails; mixed and open species. All sixteen source lines independently read 2026-11-12.' },
  'wikibooks:pan-de-jamon': { diet: 'nonveg', meatKind: 'pork', basis: 'Thin-sliced cured ham explicit in source line 7; all twelve source lines independently read 2026-11-12. Ham formulation not cleared.' },
  'wikibooks:rice-with-tofu-and-nuts': { diet: 'veg', basis: 'All twelve source lines independently read 2026-11-12: rice, tofu, nuts, raisins, spices, oil; no animal product named. Source files it vegan; tofu formulation not cleared.' },
  'wikibooks:salmon-spaghetti': { diet: 'nonveg', meatKind: 'fish', basis: 'Salmon (smoked or fresh) explicit in source line 3; all eleven source lines independently read 2026-11-12. Cream formulations not cleared.' },
  'wikibooks:southwest-pasta': { diet: 'unknown', basis: 'All twelve source lines independently read 2026-11-12: no animal product named, but salsa and taco seasoning are manufactured products with unverified formulations. Source files it vegan; displayed as an unverified claim.' },
  'wikibooks:spaghetti-alla-puttanesca': { diet: 'nonveg', meatKind: 'fish', basis: 'Anchovy fillets explicit in source line 3 with a source omit-alternative for the Neapolitan version; all ten source lines independently read 2026-11-12.' },
  'wikibooks:spinach-mushroom-pesto-spaghetti': { diet: 'unknown', basis: 'All eight source lines independently read 2026-11-12: pesto and Parmesan formulations (rennet) unverified; no meat named. Not classified vegetarian.' },
  'wikibooks:stir-fried-seafood-with-noodles': { diet: 'nonveg', meatKind: 'fish', basis: 'Shrimp explicit in source line 5; fishballs present with species and formulation unstated. All thirteen source lines independently read 2026-11-12.' },
  'wikibooks:succotash': { diet: 'unknown', basis: 'All six source lines independently read 2026-11-12: pickled pork is optional but explicit; butter-or-oil option. Not classified vegetarian; fails closed against pork exclusion when the pork is used.' },
  'wikibooks:tomato-basil-sausage-pasta': { diet: 'unknown', basis: 'All eight source lines independently read 2026-11-12: sausage meat explicit but species not stated; fails closed against meat exclusions. Marinara formulation not cleared.' },
  'wikibooks:tomato-pasta-with-bacon-onions-and-cheese': { diet: 'nonveg', meatKind: 'pork', basis: 'Smoked bacon explicit in source line 4; all eight source lines independently read 2026-11-12. Parmesan formulation not cleared.' },
  'wikibooks:tuscan-soup-meatless': { diet: 'nonveg', meatKind: 'chicken', basis: 'Chicken broth explicit in source line 4 despite the meatless title; all ten source lines independently read 2026-11-12. Source vegetarian category displayed as an unverified claim.' },
  'wikibooks:zupa-ogorkowa-polish-cucumber-soup': { diet: 'nonveg', meatKind: 'chicken', basis: 'Chicken wings explicit in source line 1; all fourteen source lines independently read 2026-11-12. Cream formulation not cleared.' },
  'wikibooks:zuppa-toscana': { diet: 'unknown', basis: 'All eleven source lines independently read 2026-11-12: spicy Italian sausage explicit but species not stated (source notes a turkey-sausage substitution); bacon explicit. Fails closed against meat exclusions. Broth formulation not cleared.' },

  'wikibooks:calzone': { diet: 'unknown', basis: 'All five source lines independently read 2026-11-12: optional meat topping is species-open (ham, bacon, salami, pepperoni and/or sausage); cheese rennet unverified. Fails closed against meat exclusions when a meat topping is used.' },
  'wikibooks:fisherman-s-casserole': { diet: 'nonveg', meatKind: 'fish', basis: 'Canned salmon explicit in source line 8; all eleven source lines independently read 2026-11-12. Canned-soup and cheese formulations not cleared.' },
  'wikibooks:florida-style-crab-cakes': { diet: 'nonveg', meatKind: 'fish', basis: 'Lump crab meat explicit in source line 13 (2 pounds); all fourteen source lines independently read 2026-11-12. Mayonnaise formulation not cleared.' },
  'wikibooks:pork-burritos-with-green-pepper-sauce': { diet: 'nonveg', meatKind: 'pork', basis: 'Boneless pork loin roast explicit in source line 14 (4 pounds); all seventeen source lines independently read 2026-11-12. Salsa and cheese formulations not cleared.' },
  'wikibooks:taco-casserole': { diet: 'nonveg', meatKind: 'beef', basis: 'Ground beef explicit in source line 1 (1 pound / 450 g); all seven source lines independently read 2026-11-12. Taco-seasoning formulation not cleared.' },
  'wikibooks:tuna-casserole': { diet: 'nonveg', meatKind: 'fish', basis: 'Canned tuna explicit in source line 1 (3 cans); all five source lines independently read 2026-11-12. Cream-soup formulations not cleared.' },

  'wikibooks:banh-chung': { diet: 'nonveg', meatKind: 'pork', basis: 'Pork belly explicit in source line 2 (500 g); all ten source lines independently read 2026-11-12. Fish sauce formulation not cleared.' },
  'wikibooks:baked-beans': { diet: 'nonveg', meatKind: 'pork', basis: 'Bacon or salt pork explicit in source line 2; all source lines independently read 2026-11-12. Molasses formulation not cleared.' },
  'wikibooks:chili-con-bambi': { diet: 'nonveg', meatKind: 'venison', basis: 'Minced stewing venison explicit in source line 7 (500 g); all sixteen source lines independently read 2026-11-12. Optional stock cube species not stated.' },
  'wikibooks:deluxe-burgers': { diet: 'nonveg', basis: 'Ground beef explicit in source line 1 and bacon explicit in line 5 (mixed species); all nine source lines independently read 2026-11-12. Steak sauce formulation not cleared.' },
  'wikibooks:honey-apple-glazed-pork': { diet: 'nonveg', meatKind: 'pork', basis: 'Pork butt roast explicit in source line 6 (3 lb); all ten source lines independently read 2026-11-12.' },
  'wikibooks:hongshao-rou-red-braised-pork-belly': { diet: 'nonveg', meatKind: 'pork', basis: 'Pork belly explicit in source line 1 (700 g); all nine source lines independently read 2026-11-12. Stock formulation not cleared.' },
  'wikibooks:hoppin-john': { diet: 'nonveg', meatKind: 'pork', basis: 'Bacon explicit in source line 1 (6 slices); all eight source lines independently read 2026-11-12. Rice-pack seasoning formulation not cleared.' },
  'wikibooks:italian-marinated-chicken': { diet: 'nonveg', meatKind: 'chicken', basis: 'Boneless chicken breast halves explicit in source line 6; all six source lines independently read 2026-11-12. Broth and Parmesan formulations not cleared.' },
  'wikibooks:kashmiri-pulao': { diet: 'vegetarian', basis: 'All sixteen source lines independently read 2026-11-12: plant foods plus ghee/butter and milk (dairy). No meat, fish or egg lines.' },
  'wikibooks:khara-pongal-rice-and-mung-bean-porridge': { diet: 'vegetarian', basis: 'All thirteen source lines independently read 2026-11-12: plant foods plus ghee/butter (dairy). No meat, fish or egg lines.' },
  'wikibooks:lamb-sausages-and-grilled-potatoes': { diet: 'nonveg', meatKind: 'lamb', basis: 'Lamb sausages explicit in source line 6 (8 sausages); all eight source lines independently read 2026-11-12. Sausage formulation beyond lamb not cleared.' },
  'wikibooks:mapo-tofu': { diet: 'nonveg', basis: 'Minced beef or pork explicit in source line 4 (species-open source alternative); all twelve source lines independently read 2026-11-12. Chili bean paste formulation not cleared.' },
  'wikibooks:mukimo': { diet: 'vegan', basis: 'All six source lines independently read 2026-11-12: plant foods only. Serving with meat stew is an accompaniment suggestion, not an ingredient.' },
  'wikibooks:paneer-butter-masala': { diet: 'vegetarian', basis: 'All sixteen source lines independently read 2026-11-12: plant foods plus paneer, yoghurt and ghee (dairy). No meat, fish or egg lines. Paneer and hing formulations not cleared.' },
  'wikibooks:pollo-del-fungo-chicken-with-mushrooms': { diet: 'nonveg', meatKind: 'chicken', basis: 'Chicken breast explicit in source line 1 (400 g); all ten source lines independently read 2026-11-12. Chicken stock formulation not cleared.' },
  'wikibooks:pork-aachi': { diet: 'nonveg', meatKind: 'pork', basis: 'Diced pork explicit in source line 2 (500 g); all ten source lines independently read 2026-11-12. Stock-cube species unresolved in source (pork in ingredients, beef in method) - fail-closed.' },
  'wikibooks:pohe-spiced-flattened-rice': { diet: 'vegan', basis: 'All nine source lines independently read 2026-11-12: plant foods only; source also categorises the dish as vegan. Asafoetida powder formulation not cleared.' },
  'wikibooks:rice-with-black-beans-arroz-con-frijoles-negros': { diet: 'vegetarian', basis: 'All fifteen source lines independently read 2026-11-12: plant foods only (wine, vinegar, sugar/sweetener alternative). No dairy, egg, meat or fish lines.' },
  'wikibooks:taro-fish': { diet: 'unknown', basis: 'All nine source lines independently read 2026-11-12: no meat, fish or egg lines, but the vegetable stock powder formulation is unverified - fail-closed. Source categorises the dish as vegetarian (unverified claim).' },
  'wikibooks:yellow-split-pea-soup': { diet: 'unknown', basis: 'All seven source lines independently read 2026-11-12: chicken-or-beef bouillon is a species-open source alternative with formulation unverified - fail-closed.' },

  'wikibooks-fr:fr-acras-de-rouget': { diet: 'nonveg', meatKind: 'fish', basis: 'Red mullet explicit in source line 1 (400 g); egg and milk (dairy) also present; all eight source lines independently read 2026-11-12.' },
  'wikibooks-fr:fr-akpessi-igname': { diet: 'vegan', basis: 'All nine source lines independently read 2026-11-12: plant foods only (red palm oil, or peanut oil as the source alternative).' },
  'wikibooks-fr:fr-cassolette-de-sole-et-cabillaud': { diet: 'nonveg', meatKind: 'fish', basis: 'Cod and sole explicit in source lines 1-2, with scallops, shrimps and mussels in lines 3-5 (mixed fish and shellfish); all ten source lines independently read 2026-11-12. Lobster bisque formulation not cleared.' },
  'wikibooks-fr:fr-cotriade': { diet: 'nonveg', meatKind: 'fish', basis: 'Mixed fish (2.5 kg) explicit in source line 1 plus shellfish and crustaceans in line 2; all eleven source lines independently read 2026-11-12.' },
  'wikibooks-fr:fr-creme-de-chou-fleur': { diet: 'unknown', basis: 'All six source lines independently read 2026-11-12: no meat, fish or egg lines, but the 1 litre of stock has species and formulation unstated - fail-closed.' },
  'wikibooks-fr:fr-curry-de-poisson-keralais': { diet: 'nonveg', meatKind: 'fish', basis: 'White fish fillets explicit in source line 1 (haddock, cod or hake); all fourteen source lines independently read 2026-11-12.' },
  'wikibooks-fr:fr-escalopes-de-veau-parmesan-amandes': { diet: 'nonveg', meatKind: 'veal', basis: 'Veal escalopes explicit in source line 1; eggs and parmesan also present; all five source lines independently read 2026-11-12. Parmesan formulation not cleared.' },
  'wikibooks-fr:fr-fondue-epicee': { diet: 'unknown', basis: 'All fourteen source lines independently read 2026-11-12: plant foods plus Gruyere (dairy); Gruyere rennet/formulation unverified - not classified vegetarian. Wine and grappa present - no alcohol-free claim.' },
  'wikibooks-fr:fr-gratin-de-courgettes-et-tomates': { diet: 'unknown', basis: 'All five source lines independently read 2026-11-12: plant foods plus grated cheese (dairy, rennet unverified) - not classified vegetarian; source category tag not adopted.' },
  'wikibooks-fr:fr-lieu-jaune-en-papillote-de-cresson': { diet: 'nonveg', meatKind: 'fish', basis: 'Pollock explicit in source line 1 (400 g); all six source lines independently read 2026-11-12.' },
  'wikibooks-fr:fr-pates-au-thon': { diet: 'nonveg', meatKind: 'fish', basis: 'Canned tuna explicit in source line 3; all seven source lines independently read 2026-11-12. Parmesan formulation not cleared.' },
  'wikibooks-fr:fr-penne-rigate-a-la-grecque': { diet: 'unknown', basis: 'All seven source lines independently read 2026-11-12: plant foods plus goat cheese (dairy, rennet unverified) - not classified vegetarian. Source vegan category tag is inconsistent with the goat cheese and was not adopted.' },
  'wikibooks-fr:fr-poelee-brestoise': { diet: 'nonveg', basis: 'Knacki-type sausages explicit in source line 2 with species unstated (fail-closed against meat exclusions); tuna also present in line 5; all seven source lines independently read 2026-11-12. Source gluten-free template conflicts with ingredients and was not adopted.' },
  'wikibooks-fr:fr-poelee-de-champignons-au-fromage-a-l-ail-et-fines-herbes': { diet: 'nonveg', meatKind: 'pork', basis: 'Lardons (diced bacon) explicit in source line 6; all six source lines independently read 2026-11-12. Cheese formulation not cleared.' },
  'wikibooks-fr:fr-poulet-fafa': { diet: 'nonveg', meatKind: 'chicken', basis: 'Chicken explicit in source line 1 (1 large chicken); all ten source lines independently read 2026-11-12. Stock cube formulation not cleared.' },
  'wikibooks-fr:fr-poulet-kedjenou': { diet: 'nonveg', meatKind: 'chicken', basis: 'Chicken explicit in source line 1 (one whole chicken); all eleven source lines independently read 2026-11-12.' },
  'wikibooks-fr:fr-poulet-sauce-au-vin-rouge': { diet: 'nonveg', meatKind: 'chicken', basis: 'Chicken explicit in source line 1 (1 chicken in pieces); all five source lines independently read 2026-11-12.' },
  'wikibooks-fr:fr-riz-noir': { diet: 'nonveg', meatKind: 'fish', basis: 'Shrimps explicit in source line 3 and smoked fish in line 4; all seven source lines independently read 2026-11-12. Seasoning cube formulation not cleared.' },
  'wikibooks-fr:fr-salade-de-riz': { diet: 'nonveg', meatKind: 'fish', basis: 'Tuna explicit in source line 2 (200 g); all six source lines independently read 2026-11-12. Mayonnaise formulation not cleared.' },
  'wikibooks-fr:fr-sauce-arachide-poulet': { diet: 'nonveg', meatKind: 'chicken', basis: 'Chicken explicit in source line 1 (half a chicken); all twelve source lines independently read 2026-11-12.' },
  'wikibooks-fr:fr-souffle-au-bleu-de-gex': { diet: 'unknown', basis: 'All six source lines independently read 2026-11-12: eggs and blue cheese (dairy); Bleu de Gex rennet/formulation unverified - not classified vegetarian. Typically raw-milk - pasteurisation unverified.' },
  'wikibooks-fr:fr-soupe-d-asperges-champignons-mais-et-poulet': { diet: 'nonveg', meatKind: 'chicken', basis: 'Chicken escalopes explicit in source line 5; all eight source lines independently read 2026-11-12.' },
  'wikibooks-fr:fr-spaghetti-au-jambon-de-parme': { diet: 'nonveg', meatKind: 'pork', basis: 'Parma ham explicit in source line 2 and cooked ham in line 3 (both pork); all six source lines independently read 2026-11-12. Parmesan formulation not cleared.' },
  'wikibooks-fr:fr-tarte-a-l-oignon': { diet: 'vegetarian', basis: 'All six source lines independently read 2026-11-12: plant foods plus eggs and butter. Shortcrust pastry formulation (fat type) unverified.' },
  'wikibooks-fr:fr-tomates-farcies-a-l-agneau': { diet: 'nonveg', meatKind: 'lamb', basis: 'Roast lamb explicit in source line 2 (500 g, cooked); all six source lines independently read 2026-11-12.' },
  'wikibooks-fr:fr-torti-aux-crevettes-et-a-la-feta': { diet: 'nonveg', meatKind: 'fish', basis: 'Prawns explicit in source line 2 (400 g, shellfish); all six source lines independently read 2026-11-12. Feta formulation not cleared.' },
  'wikibooks-fr:fr-poulet-gaston-gerard': { diet: 'nonveg', meatKind: 'chicken', basis: 'Chicken explicit in source line 1 (one chicken, 1-1.5 kg); all ten source lines independently read 2026-11-12. Comté formulation not cleared.' },
  'wikibooks-fr:fr-couscous-de-poulet-au-miel': { diet: 'nonveg', meatKind: 'chicken', basis: 'Chicken explicit in source line 8 (one chicken for 6 people); all sixteen source lines independently read 2026-11-12.' },
  'wikibooks-fr:fr-risotto-au-poulet': { diet: 'nonveg', meatKind: 'chicken', basis: 'Chicken breast explicit in source line 1 (200 g); all nine source lines independently read 2026-11-12.' },
  'wikibooks-fr:fr-sauce-gnangnan': { diet: 'nonveg', basis: 'Meat explicit in source line 7 (1 kg) but species and cut unspecified in source - fail-closed, no meatKind assigned; all twelve source lines independently read 2026-11-12.' },
  'wikibooks-fr:fr-djenkoume2': { diet: 'nonveg', basis: 'Guinea fowl (pintade) explicit in source line 1 - poultry, but no matching display group (not chicken/turkey), so no meatKind assigned and it groups as Other non-veg; all eleven lines independently read 2026-11-12.' },
  'wikibooks-de:de-daeji-bulgogi': { diet: 'nonveg', meatKind: 'pork', basis: 'Pork belly or neck explicit in source line 1 (500 g); all eight source lines independently read 2026-11-12. Gochujang formulation not cleared.' },
  'wikibooks-de:de-moussaka': { diet: 'nonveg', meatKind: 'beef', basis: 'Beef mince explicit in source line 4 (600 g Rinderhackfleisch); all twenty source lines independently read 2026-11-12. Graviera/Parmesan rennet not cleared.' },
  'wikibooks-de:de-entenbrust-mit-orangensauce': { diet: 'nonveg', basis: 'Barbarie duck breast explicit in source line 1 - poultry, but no matching display group (not chicken/turkey), so no meatKind assigned and it groups as Other non-veg; all eleven source lines independently read 2026-11-12.' },
  'wikibooks-de:de-paprika-bohnen-curry': { diet: 'nonveg', meatKind: 'pork', basis: 'Pork explicit in source line 1 (400 g Schweinefleisch); all nine source lines independently read 2026-11-12. Broth formulation not cleared.' },
  'wikibooks-de:de-linseneintopf': { diet: 'unknown', basis: 'All twenty-one source lines independently read 2026-11-12: plant foods plus Parmesan (dairy, rennet unverified) and vegetable broth (formulation unverified) - not classified vegetarian; the source Vegetarisch=Ja tag was not adopted.' },
  'wikibooks-de:de-riz-casimir': { diet: 'nonveg', meatKind: 'turkey', basis: 'Turkey schnitzel explicit in source line 1 (500 g Putenschnitzel); all seven source lines independently read 2026-11-12.' },
  'wikibooks-de:de-frikadellen': { diet: 'nonveg', basis: 'Minced meat explicit in source line 1 (750 g) with the species the cook\'s choice (beef, pork or mixed) - no single display group, so no meatKind assigned; all eight source lines independently read 2026-11-12.' },
  'wikibooks-de:de-kartoffelgratin': { diet: 'unknown', basis: 'All seven source lines independently read 2026-11-12: plant foods plus milk, cream, butter and cheese (dairy, rennet unverified) - not classified vegetarian; the source Vegetarisch=Ja tag was not adopted.' },
  'wikibooks-de:de-bigos': { diet: 'nonveg', meatKind: 'pork', basis: 'Bacon explicit in source line 1 (250 g Speck) and lean pork in line 3 (300 g mageres Schweinefleisch); all twelve source lines independently read 2026-11-12. Smoked sausage species and formulation not cleared.' },
  'wikibooks-de:de-haehnchen-aprikosen-mandel-reis': { diet: 'nonveg', meatKind: 'chicken', basis: 'Chicken explicit in source line 8 (500 g Hähnchenfleisch); all ten source lines independently read 2026-11-12.' },

  'wikibooks-de:de-szegediner-gulasch': { diet: 'nonveg', basis: 'Meat explicit in source bullet 1 (500 g Rind- oder Schweinegulasch/-schnitzel) with the species the cook\'s choice (beef or pork) - no single display group, so no meatKind assigned; all ten source bullets independently read 2026-11-12. Broth formulation not cleared.' },
  'wikibooks-de:de-plov': { diet: 'nonveg', basis: 'Meat explicit in source bullet 1 (1 kg) with the species the cook\'s choice (beef, lamb, pork or poultry) - no single display group, so no meatKind assigned; all seven source bullets (spice sub-items included) independently read 2026-11-12.' },
  'wikibooks-de:de-aelplermagronen': { diet: 'unknown', basis: 'All eight source lines independently read 2026-11-12: plant foods plus butter, cream/milk, hard cheese (dairy, rennet unverified) and optional bacon cubes - not classified vegetarian; the source Vegetarisch=Ja tag was not adopted.' },
  'wikibooks-de:de-zanderfilet-auf-sauerkraut': { diet: 'nonveg', meatKind: 'fish', basis: 'Zander (pike-perch) fillet explicit in source line 12 (400 g); all seventeen source lines independently read 2026-11-12.' },
  'wikibooks-de:de-garnelen-mit-fenchel': { diet: 'nonveg', meatKind: 'fish', basis: 'Shrimp explicit in source line 2 (250 g Garnelen) - grouped with fish for display per the shellfish precedent; all eight source bullets independently read 2026-11-12.' },
  'wikibooks-de:de-estragonhuhn': { diet: 'nonveg', meatKind: 'chicken', basis: 'Chicken explicit in source line 1 (1 Huhn); all eight source lines independently read 2026-11-12.' },
  'wikibooks-de:de-kuerbis-risotto': { diet: 'nonveg', basis: 'Meat broth explicit in source line 9 (1 L heisse Fleischbrühe; species and formulation unstated) with vegetable broth offered as an alternative - fail-closed, no meatKind assigned; all twelve source lines independently read 2026-11-12. Fontina rennet not cleared.' },
  'wikibooks-de:de-minestrone': { diet: 'vegetarian', basis: 'All thirteen source lines independently read 2026-11-12: plant foods, water and olive oil only - no meat, fish, dairy, eggs or rennet-bearing products in the listed lines.' },
  'wikibooks-de:de-lammkeule-geschmort': { diet: 'nonveg', meatKind: 'lamb', basis: 'Leg of lamb explicit in source line 1 (1 frische Lammkeule mit Knochen); all nine source lines independently read 2026-11-12. Stock cube formulation not cleared.' },
  'wikibooks-de:de-neuenburger-weissweinsuppe': { diet: 'unknown', basis: 'All seven source lines independently read 2026-11-12: plant foods plus sour cream (dairy) and vegetable broth (formulation unverified) - not classified vegetarian; the source Vegetarisch=Ja tag was not adopted.' },
  'wikibooks-de:de-ensalada-de-patata': { diet: 'unknown', basis: 'All twelve source lines independently read 2026-11-12: plant foods plus broth (formulation unverified) and Cointreau - not classified vegetarian.' },
  'wikibooks-de:de-kaspressknoedel': { diet: 'unknown', basis: 'All seven source lines independently read 2026-11-12: dumpling bread, milk, eggs, vegetables and cheese (dairy, rennet unverified) - not classified vegetarian.' },
  'wikibooks-de:de-maultaschenlasagne': { diet: 'nonveg', basis: 'Maultaschen explicit in source line 1 - filled pasta whose traditional filling contains minced meat (species and formulation unverified) - fail-closed, no meatKind assigned; all four source lines independently read 2026-11-12.' },
  'wikibooks-de:de-belgische-zwiebelsuppe': { diet: 'nonveg', basis: 'Meat broth explicit in source line 4 (1 1/4 Liter Fleischbrühe; species and formulation unstated) - fail-closed, no meatKind assigned; the source box Vegetarisch=Ja tag contradicts the listed meat broth and is not adopted; all seven source lines independently read 2026-11-12. Cheese rennet not cleared.' },
  'wikibooks-de:de-ingwer-linsen-suppe': { diet: 'vegetarian', basis: 'All eight source bullets independently read 2026-11-12: plant foods and coconut milk only - no meat, fish, dairy, eggs or rennet-bearing products in the listed lines.' },
  'wikibooks-de:de-huehnerbrust-rahmwirsing': { diet: 'nonveg', meatKind: 'chicken', basis: 'Chicken breast explicit in source line 1 (2 Stück Hühnerbrust); bacon also explicit in line 3; all seven source lines independently read 2026-11-12.' },
  'wikibooks-de:de-lachs-spinat-auflauf': { diet: 'nonveg', meatKind: 'fish', basis: 'Pollock fillet explicit in source line 1 (450 g Seelachsfilet); all five source lines independently read 2026-11-12. Cheese rennet not cleared.' },
  'wikibooks-de:de-hack-in-weisskohl': { diet: 'nonveg', basis: 'Mixed mince explicit in source line 2 (1000 g gemischtes Hack) - a mix with no single display group, so no meatKind assigned; all thirteen source lines independently read 2026-11-12. Broth formulation not cleared.' },
  'wikibooks-de:de-pfefferrahmschnitzel': { diet: 'nonveg', meatKind: 'pork', basis: 'Pork schnitzels explicit in source line 5 (6 Schweineschnitzel); all thirteen source lines independently read 2026-11-12.' },
  'wikibooks-de:de-kalafkalsch': { diet: 'nonveg', meatKind: 'beef', basis: 'Beef mince explicit in source line 1 (1500 g Rinderhack; mixed mince offered as an alternative); all ten source lines independently read 2026-11-12.' },
  'wikibooks-de:de-kuerbis-ravioli-mit-salbei': { diet: 'unknown', basis: 'All thirteen source lines independently read 2026-11-13: plant foods plus eggs and butter; the method-only vegetable broth formulation is unverified - not classified vegetarian.' },
  'wikibooks-de:de-baerlauchsuppe': { diet: 'unknown', basis: 'All eight source lines independently read 2026-11-13: plant foods plus sour cream (dairy) and vegetable broth (formulation unverified) - not classified vegetarian.' },
  'wikibooks-de:de-crepes-mit-spargel': { diet: 'vegetarian', basis: 'All eleven source lines independently read 2026-11-13: plant foods plus egg, milk and butter - no meat, fish or rennet-bearing products in the listed lines.' },
  'wikibooks-de:de-fischsalat': { diet: 'nonveg', meatKind: 'fish', basis: 'Monkfish (anglerfish) explicit in source line 1 and flounder in line 2 (250 g each); all nine source lines independently read 2026-11-13.' },
  'wikibooks-de:de-griechischer-salat': { diet: 'unknown', basis: 'All nine source lines independently read 2026-11-13: plant foods plus feta (dairy, rennet unverified) - not classified vegetarian; the source Vegetarisch=Ja tag was not adopted.' },
  'wikibooks-de:de-haehnchenroulade-mikrowelle': { diet: 'nonveg', meatKind: 'chicken', basis: 'Chicken breast fillets explicit in source line 1; Black Forest ham (cured pork) also explicit in line 5; all eleven source lines independently read 2026-11-13. Pesto and mozzarella formulations not cleared.' },
  'wikibooks-de:de-hoernchennudeln-letcho': { diet: 'nonveg', meatKind: 'pork', basis: 'Ham cubes explicit in source line 6 (Schinkenwürfel, a cured pork product); all twelve source lines independently read 2026-11-13. Letscho formulation not cleared.' },
  'wikibooks-de:de-lachs-in-vanille': { diet: 'nonveg', meatKind: 'fish', basis: 'Salmon explicit in source line 1 (4 pieces); all seventeen source lines independently read 2026-11-13. Chicken-broth granulate formulation not cleared.' },
  'wikibooks-de:de-schwaemmchen': { diet: 'vegetarian', basis: 'All five source lines independently read 2026-11-13: flour, milk, water, eggs and salt only - no meat, fish or rennet-bearing products in the listed lines.' },
  'wikibooks-de:de-rheintaler-ribel': { diet: 'vegetarian', basis: 'All five source lines independently read 2026-11-13: cornmeal, milk, water, salt and butter only - no meat, fish, eggs or rennet-bearing products in the listed lines. Bratbutter/Bratcrème formulation unverified.' },
  "nhlbi:bavarian-beef": { diet: 'nonveg', meatKind: 'beef', basis: 'Beef explicit in the verbatim NHLBI ingredient list; all 12 source lines read 2026-11-12. Stock, sauce and product formulations and cross-contact not cleared.' },
  "nhlbi:beef-and-bean-chili": { diet: 'nonveg', meatKind: 'beef', basis: 'Beef explicit in the verbatim NHLBI ingredient list; all 12 source lines read 2026-11-12. Stock, sauce and product formulations and cross-contact not cleared.' },
  "nhlbi:beef-stroganoff": { diet: 'nonveg', meatKind: 'beef', basis: 'Beef explicit in the verbatim NHLBI ingredient list; all 11 source lines read 2026-11-12. Stock, sauce and product formulations and cross-contact not cleared.' },
  "nhlbi:black-skillet-beef-with-greens-and-red-potatoes": { diet: 'nonveg', meatKind: 'beef', basis: 'Beef explicit in the verbatim NHLBI ingredient list; all 15 source lines read 2026-11-12. Stock, sauce and product formulations and cross-contact not cleared.' },
  "nhlbi:quick-beef-casserole": { diet: 'nonveg', meatKind: 'beef', basis: 'Beef explicit in the verbatim NHLBI ingredient list; all 12 source lines read 2026-11-12. Stock, sauce and product formulations and cross-contact not cleared.' },
  "nhlbi:scrumptious-meat-loaf": { diet: 'nonveg', meatKind: 'beef', basis: 'Beef explicit in the verbatim NHLBI ingredient list; all 16 source lines read 2026-11-12. Stock, sauce and product formulations and cross-contact not cleared.' },
  "nhlbi:stir-fried-beef-and-potatoes": { diet: 'nonveg', meatKind: 'beef', basis: 'Beef explicit in the verbatim NHLBI ingredient list; all 9 source lines read 2026-11-12. Stock, sauce and product formulations and cross-contact not cleared.' },
  "nhlbi:stir-fried-beef-and-chinese-vegetables": { diet: 'nonveg', meatKind: 'beef', basis: 'Beef explicit in the verbatim NHLBI ingredient list; all 13 source lines read 2026-11-12. Stock, sauce and product formulations and cross-contact not cleared.' },
  "nhlbi:baked-pork-chops": { diet: 'nonveg', meatKind: 'fish', basis: 'Fish explicit in the verbatim NHLBI ingredient list; all 14 source lines read 2026-11-12. Stock, sauce and product formulations and cross-contact not cleared.' },
  "nhlbi:shish-kabob": { diet: 'nonveg', meatKind: 'chicken', basis: 'Chicken explicit in the verbatim NHLBI ingredient list; all 12 source lines read 2026-11-12. Stock, sauce and product formulations and cross-contact not cleared.' },
  "nhlbi:spicy-veal-roast": { diet: 'nonveg', meatKind: 'veal', basis: 'Veal explicit in the verbatim NHLBI ingredient list; all 12 source lines read 2026-11-12. Stock, sauce and product formulations and cross-contact not cleared.' },
  "nhlbi:barbecued-chicken": { diet: 'nonveg', meatKind: 'chicken', basis: 'Chicken explicit in the verbatim NHLBI ingredient list; all 9 source lines read 2026-11-12. Stock, sauce and product formulations and cross-contact not cleared.' },
  "nhlbi:barbecued-chicken-spicy-southern-style": { diet: 'nonveg', meatKind: 'chicken', basis: 'Chicken explicit in the verbatim NHLBI ingredient list; all 12 source lines read 2026-11-12. Stock, sauce and product formulations and cross-contact not cleared.' },
  "nhlbi:chicken-gumbo": { diet: 'nonveg', meatKind: 'chicken', basis: 'Chicken explicit in the verbatim NHLBI ingredient list; all 16 source lines read 2026-11-12. Stock, sauce and product formulations and cross-contact not cleared.' },
  "nhlbi:chicken-and-rice": { diet: 'nonveg', meatKind: 'chicken', basis: 'Chicken explicit in the verbatim NHLBI ingredient list; all 18 source lines read 2026-11-12. Stock, sauce and product formulations and cross-contact not cleared.' },
  "nhlbi:chicken-and-spanish-rice": { diet: 'nonveg', meatKind: 'chicken', basis: 'Chicken explicit in the verbatim NHLBI ingredient list; all 9 source lines read 2026-11-12. Stock, sauce and product formulations and cross-contact not cleared.' },
  "nhlbi:chicken-marsala": { diet: 'nonveg', meatKind: 'chicken', basis: 'Chicken explicit in the verbatim NHLBI ingredient list; all 10 source lines read 2026-11-12. Stock, sauce and product formulations and cross-contact not cleared.' },
  "nhlbi:chicken-orientale": { diet: 'nonveg', meatKind: 'chicken', basis: 'Chicken explicit in the verbatim NHLBI ingredient list; all 12 source lines read 2026-11-12. Stock, sauce and product formulations and cross-contact not cleared.' },
  "nhlbi:chicken-ratatouille": { diet: 'nonveg', meatKind: 'chicken', basis: 'Chicken explicit in the verbatim NHLBI ingredient list; all 12 source lines read 2026-11-12. Stock, sauce and product formulations and cross-contact not cleared.' },
  "nhlbi:chicken-salad": { diet: 'nonveg', meatKind: 'chicken', basis: 'Chicken explicit in the verbatim NHLBI ingredient list; all 6 source lines read 2026-11-12. Stock, sauce and product formulations and cross-contact not cleared.' },
  "nhlbi:chicken-stew": { diet: 'nonveg', meatKind: 'chicken', basis: 'Chicken explicit in the verbatim NHLBI ingredient list; all 12 source lines read 2026-11-12. Stock, sauce and product formulations and cross-contact not cleared.' },
  "nhlbi:crispy-oven-fried-chicken": { diet: 'nonveg', meatKind: 'chicken', basis: 'Chicken explicit in the verbatim NHLBI ingredient list; all 10 source lines read 2026-11-12. Stock, sauce and product formulations and cross-contact not cleared.' },
  "nhlbi:finger-licking-curried-chicken": { diet: 'nonveg', meatKind: 'chicken', basis: 'Chicken explicit in the verbatim NHLBI ingredient list; all 13 source lines read 2026-11-12. Stock, sauce and product formulations and cross-contact not cleared.' },
  "nhlbi:grilled-chicken-with-green-chile-sauce": { diet: 'nonveg', meatKind: 'chicken', basis: 'Chicken explicit in the verbatim NHLBI ingredient list; all 12 source lines read 2026-11-12. Stock, sauce and product formulations and cross-contact not cleared.' },
  "nhlbi:jamaican-jerk-chicken": { diet: 'nonveg', meatKind: 'chicken', basis: 'Chicken explicit in the verbatim NHLBI ingredient list; all 13 source lines read 2026-11-12. Stock, sauce and product formulations and cross-contact not cleared.' },
  "nhlbi:20-minute-chicken-creole": { diet: 'nonveg', meatKind: 'chicken', basis: 'Chicken explicit in the verbatim NHLBI ingredient list; all 12 source lines read 2026-11-12. Stock, sauce and product formulations and cross-contact not cleared.' },
  "nhlbi:very-lemony-chicken": { diet: 'nonveg', meatKind: 'chicken', basis: 'Chicken explicit in the verbatim NHLBI ingredient list; all 9 source lines read 2026-11-12. Stock, sauce and product formulations and cross-contact not cleared.' },
  "nhlbi:autumn-turkey-stuffed-cabbage": { diet: 'nonveg', meatKind: 'turkey', basis: 'Turkey explicit in the verbatim NHLBI ingredient list; all 13 source lines read 2026-11-12. Stock, sauce and product formulations and cross-contact not cleared.' },
  "nhlbi:spaghetti-with-turkey-meat-sauce": { diet: 'nonveg', meatKind: 'turkey', basis: 'Turkey explicit in the verbatim NHLBI ingredient list; all 9 source lines read 2026-11-12. Stock, sauce and product formulations and cross-contact not cleared.' },
  "nhlbi:turkey-meat-loaf": { diet: 'nonveg', meatKind: 'turkey', basis: 'Turkey explicit in the verbatim NHLBI ingredient list; all 5 source lines read 2026-11-12. Stock, sauce and product formulations and cross-contact not cleared.' },
  "nhlbi:baked-salmon-dijon": { diet: 'nonveg', meatKind: 'fish', basis: 'Fish explicit in the verbatim NHLBI ingredient list; all 9 source lines read 2026-11-12. Stock, sauce and product formulations and cross-contact not cleared.' },
  "nhlbi:baked-trout": { diet: 'nonveg', meatKind: 'fish', basis: 'Fish explicit in the verbatim NHLBI ingredient list; all 9 source lines read 2026-11-12. Stock, sauce and product formulations and cross-contact not cleared.' },
  "nhlbi:catfish-stew-and-rice": { diet: 'nonveg', meatKind: 'fish', basis: 'Fish explicit in the verbatim NHLBI ingredient list; all 11 source lines read 2026-11-12. Stock, sauce and product formulations and cross-contact not cleared.' },
  "nhlbi:fish-veronique": { diet: 'nonveg', meatKind: 'chicken', basis: 'Chicken explicit in the verbatim NHLBI ingredient list; all 11 source lines read 2026-11-12. Stock, sauce and product formulations and cross-contact not cleared.' },
  "nhlbi:mediterranean-baked-fish": { diet: 'nonveg', meatKind: 'fish', basis: 'Fish explicit in the verbatim NHLBI ingredient list; all 16 source lines read 2026-11-12. Stock, sauce and product formulations and cross-contact not cleared.' },
  "nhlbi:mouth-watering-oven-fried-fish": { diet: 'nonveg', meatKind: 'fish', basis: 'Fish explicit in the verbatim NHLBI ingredient list; all 11 source lines read 2026-11-12. Stock, sauce and product formulations and cross-contact not cleared.' },
  "nhlbi:scallop-kabobs": { diet: 'nonveg', meatKind: 'fish', basis: 'Fish explicit in the verbatim NHLBI ingredient list; all 8 source lines read 2026-11-12. Stock, sauce and product formulations and cross-contact not cleared.' },
  "nhlbi:spicy-baked-fish": { diet: 'nonveg', meatKind: 'fish', basis: 'Fish explicit in the verbatim NHLBI ingredient list; all 4 source lines read 2026-11-12. Stock, sauce and product formulations and cross-contact not cleared.' },
  "nhlbi:spinach-stuffed-sole": { diet: 'nonveg', meatKind: 'fish', basis: 'Fish explicit in the verbatim NHLBI ingredient list; all 9 source lines read 2026-11-12. Stock, sauce and product formulations and cross-contact not cleared.' },
  "nhlbi:tuna-salad": { diet: 'nonveg', meatKind: 'fish', basis: 'Fish explicit in the verbatim NHLBI ingredient list; all 4 source lines read 2026-11-12. Stock, sauce and product formulations and cross-contact not cleared.' },
  "nhlbi:chillin-out-pasta-salad": { diet: 'nonveg', meatKind: 'fish', basis: 'Fish explicit in the verbatim NHLBI ingredient list; all 8 source lines read 2026-11-12. Stock, sauce and product formulations and cross-contact not cleared.' },
  // nhlbi:classic-macaroni-and-cheese: no flesh line; formulations (broths, Worcestershire, cheeses) not reviewed - diet stays unknown.
  "nhlbi:red-hot-fusilli": { diet: 'nonveg', meatKind: 'chicken', basis: 'Chicken explicit in the verbatim NHLBI ingredient list; all 10 source lines read 2026-11-12. Stock, sauce and product formulations and cross-contact not cleared.' },
  // nhlbi:black-beans-with-rice: no flesh line; formulations (broths, Worcestershire, cheeses) not reviewed - diet stays unknown.
  // nhlbi:caribbean-pink-beans: no flesh line; formulations (broths, Worcestershire, cheeses) not reviewed - diet stays unknown.
  // nhlbi:new-orleans-red-beans: no flesh line; formulations (broths, Worcestershire, cheeses) not reviewed - diet stays unknown.
  // nhlbi:summer-vegetable-spaghetti: no flesh line; formulations (broths, Worcestershire, cheeses) not reviewed - diet stays unknown.
  // nhlbi:vegetarian-spaghetti-sauce: no flesh line; formulations (broths, Worcestershire, cheeses) not reviewed - diet stays unknown.
  // nhlbi:zucchini-lasagna: no flesh line; formulations (broths, Worcestershire, cheeses) not reviewed - diet stays unknown.
  "nhlbi:mexican-pozole": { diet: 'nonveg', meatKind: 'beef', basis: 'Beef explicit in the verbatim NHLBI ingredient list; all 10 source lines read 2026-11-12. Stock, sauce and product formulations and cross-contact not cleared.' },

};

function adapt(src) {
  return {
    id: src.id,
    name: src.name + (src.id === 'unitools:misir-wat' ? ' (stew only)' : ['unitools:mercimek-corbasi', 'unitools:tarator', 'wikibooks:agnolotti-in-brodo', 'wikibooks:galician-garbanzo-soup', 'wikibooks:asparagus-soup', 'wikibooks:bean-soup-vegetarian', 'wikibooks:beef-gravy-soup', 'wikibooks:creamy-tomato-bean-soup', 'wikibooks:crock-pot-potato-soup', 'wikibooks:hot-and-sour-soup', 'wikibooks:mushroom-soup', 'wikibooks:pasta-soup-for-kids', 'wikibooks:pepper-soup', 'wikibooks:potato-soup', 'wikibooks:spiced-pumpkin-soup', 'wikibooks:sausage-and-tortellini-soup', 'wikibooks:tom-kha-kai', 'wikibooks:vichyssoise', 'wikibooks:ertesuppe-pea-soup'].includes(src.id) ? ' (soup only)' : ''),
    limitation: LIMITATIONS[src.id] || null,
    cuisine: src.cuisine,
    group: src.cuisine, // picker "same cuisine" chip label only; never scored
    country: src.country,
    diet: REVIEWED_DIET[src.id]?.diet || 'unknown',
    dietBasis: REVIEWED_DIET[src.id]?.basis || null,
    meatKind: REVIEWED_DIET[src.id]?.meatKind || null,
    safety: IMPORTED_SAFETY[src.id] || null,
    mainProtein: null,
    protein: null,
    kcal: null,
    time: null, // source prep/cook times shown in the detail view, not summed
    tags: [],
    items: [], // no catalog mapping: exclusionHits returns empty; gating below
    nutritionApproximate: false,
    imported: true,
    baseServings: src.baseServings,
    src,
  };
}

for (const s of SOURCES) {
  const r = adapt(s);
  IMPORTED.set(r.id, r);
  // Slot/history lookups resolve through RECIPE_BY_ID; planner pools iterate
  // RECIPES, which this never touches.
  RECIPE_BY_ID[r.id] = r;
}

export const isImported = (id) => IMPORTED.has(id);
export const importedList = () => [...IMPORTED.values()];

// Manual fixed-base add gate. Fails closed on ANY active allergy/dislike
// restriction: imported lines have no reviewed catalog/allergen mapping yet,
// so they cannot be checked - empty mappings are never treated as no hits.
export function importedAddStatus(state, id) {
  const r = IMPORTED.get(id);
  if (!r) return { allowed: false, reason: 'Unknown dish.' };
  const x = state.exclusions || {};
  if ((x.allergies?.length || 0) + (x.dislikes?.length || 0) > 0) {
    return { allowed: false, reason: 'Allergy and dislike checks are not reviewed for imported dishes yet. Choose a dish with reviewed ingredient checks instead.' };
  }
  return { allowed: true };
}

// Exact original-base shopping rows: no rescaling, no unit conversion, no
// mass guesses. Adding the dish to the plan means cooking the original batch.
export function importedShoppingRows(recipe, state) {
  return recipe.src.lines.map((line) => ({
    key: line.lineRef,
    id: null,
    name: line.name + (line.note?.en ? ` (${line.note.en})` : ''),
    aisle: `extra:Imported:${recipe.id}`,
    aisleLabel: `Imported: ${recipe.name} (exact source amounts, ${recipe.baseServings} servings)${recipe.limitation?.grocery ? ` · ${recipe.limitation.grocery}` : ''}`,
    amount: '',
    unit: '',
    text: line.unit === 'toTaste' ? 'to taste' : line.unit === 'unstated' ? 'quantity not stated' : `${line.quantity} ${line.unit}`,
    dishes: [recipe.name],
    pantry: false,
    checked: !!state.checked[line.lineRef],
    bought: state.bought[line.lineRef] || '',
  }));
}

// Unknown time/diet is never a positive match for a browse filter.
export function importedMatches(r, state, { query = '', vegOnly = false, quick = false, kind = null, group = null } = {}) {
  const q = query.trim().toLowerCase();
  if (vegOnly && !isVeg(r, state.rules.eggsCountAsVeg)) return false;
  if (quick && (!Number.isFinite(r.time) || r.time > 30)) return false;
  if (kind === 'veg' && !isVeg(r, state.rules.eggsCountAsVeg)) return false;
  if (kind && kind !== 'veg' && displayKind(r, state.rules.eggsCountAsVeg) !== kind) return false;
  if (group && r.group !== group) return false;
  return !q || r.name.toLowerCase().includes(q) || (r.cuisine || '').toLowerCase().includes(q)
    || r.src.lines.some(l => l.name.toLowerCase().includes(q));
}
