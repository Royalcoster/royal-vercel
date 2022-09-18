import React, { useState, useRef, useEffect } from "react";
import Head from "next/head";
import Header from "../components/header";
import Footer from "../components/footer";
import Schedule from "../components/schedule";
import AppointmentModal from "../components/appointmentModal";
import Instagram from "../components/instagram";
import Link from "next/link";
import { useRouter } from "next/router";

const shapeDataEn = [
  {
    title: "Coster Royal 201",
    image: "/img/buying-guide/shape-image (1).png",
    description: "The Royal 201 is our patented diamond cut. It has 201 facets and is considered to be the most sparkling diamond cut in the world."
  },
  {
    title: "Round brilliant",
    image: "/img/buying-guide/shape-image (1).png",
    description: "The classic diamond cut. Round shape with 57 facets."
  },
  {
    title: "Pear",
    image: "/img/buying-guide/shape-image (2).png",
    description: "The pear cut has 58 facets and is shaped like an elegant raindrop or teardrop."
    },
  {
    title: "Princess",
    image: "/img/buying-guide/shape-image (3).png",
    description: "Princess diamonds are one of the square cut diamonds and are the second most popular shape besides round diamonds."
  },
  {
    title: "Radiant",
    image: "/img/buying-guide/shape-image (4).png",
    description: "A radiant cut diamond has 70 facets. The edges are trimmed carefully and distinctive."
  },
  {
    title: "Asscher",
    image: "/img/buying-guide/shape-image (5).png",
    description: "The Asscher cut has large step facets on the top and bottom of the stone. Therefore, this cut almost looks round."
  },
  {
    title: "Marquise",
    image: "/img/buying-guide/shape-image (6).png",
    description: "Marquise cut diamonds make the finger of the wearer appear more slender."
  },
  {
    title: "Heart",
    image: "/img/buying-guide/shape-image (8).png",
    description: "The heart shape is a romantic and stylish choice that stands out."
  },

  {
    title: "Oval",
    image: "/img/buying-guide/shape-image (9).png",
    description: "The traditional oval cut diamond has 58 facets. The facet structure of an oval shape diamond is similar to the modern round brilliant cut diamond."
  },
  {
    title: "Emerald",
    image: "/img/buying-guide/shape-image (10).png",
    description: "The Emerald cut is a great way to show how clean the stone is and what a lovely color it has. There are no imperfections with this cut, because imperfections are highly visible in this reflection inside the stone."
  },
]

const shapeDataNl = [
  {
    title: "Coster Royal 201",
    image: "/img/buying-guide/shape-image (1).png",
    description: "De Royal 201 is een diamantslijpvorm waar Royal Coster een patent op heeft. Deze slijpvorm heeft 201 facetten en wordt beschouwd als de meest fonkelende diamantslijpvorm ter wereld."
  },
  {
    title: "Round brilliant",
    image: "/img/buying-guide/shape-image (1).png",
    description: "De klassieke diamantslijpvorm. Deze ronde slijpvorm heeft 57 facetten."
  },
  {
    title: "Pear",
    image: "/img/buying-guide/shape-image (2).png",
    description: "De pear cut heeft 58 facetten en is in de vorm van een elegante regendruppel of traan."
    },
  {
    title: "Princess",
    image: "/img/buying-guide/shape-image (3).png",
    description: "Diamanten met een princess cut behoren tot de vierkant geslepen diamanten en zijn de op één na populairste vorm naast ronde diamanten."
  },
  {
    title: "Radiant",
    image: "/img/buying-guide/shape-image (4).png",
    description: "Een radiant cut diamant heeft 70 facetten. De randen zijn zorgvuldig geslepen en kenmerkend."
  },
  {
    title: "Asscher",
    image: "/img/buying-guide/shape-image (5).png",
    description: "De Asscher slijpvorm heeft grote vlakke facetten aan de boven- en onderkant van de steen. Daarom lijkt deze slijpvorm bijna rond."
  },
  {
    title: "Marquise",
    image: "/img/buying-guide/shape-image (6).png",
    description: "Door de vorm van diamanten met een Marquise cut lijkt het alsof de vinger van de drager slanker is dan normaal."
  },
  {
    title: "Heart",
    image: "/img/buying-guide/shape-image (8).png",
    description: "De hartvorm is een romantische en stijlvolle keuze die erg opvalt."
  },
  {
    title: "Oval",
    image: "/img/buying-guide/shape-image (9).png",
    description: "De traditionele oval cut diamant heeft 58 facetten. De facetstructuur van een ovaal geslepen diamant is vergelijkbaar met die van de moderne ronde briljant geslepen diamant."
  },
  {
    title: "Emerald",
    image: "/img/buying-guide/shape-image (10).png",
    description: "De Emerald slijpvorm is een geweldige manier om te laten zien hoe zuiver de steen is en wat een mooie kleur hij heeft. Er zijn geen imperfecties met deze slijpvorm, omdat imperfecties zeer zichtbaar zijn in deze reflectie binnenin de steen."
  },
]

const csDataEn = [
  {
    title: "Carat",
    image: "/img/buying-guide/7cs-image (1).png",
    description: "A diamond's weight is measured in carats; the larger a diamond the more rare."
  },
  {
    title: "Clarity",
    image: "/img/buying-guide/Clarity Image 2.jpg",
    description: "The greater a diamond’s clarity, the more brilliant, valuable and rare it is."
  },
  {
    title: "Cut",
    image: "/img/buying-guide/Cost image 6.jpg",
    description: "A well cut or faceted diamond, scintillates with light, offering the greatest brilliance and value."
  },
  {
    title: "Color",
    image: "/img/buying-guide/7cs-image (4).png",
    description: "Diamonds are graded by colour, starting at D and moving through to Z, with D being the most colourless."
  },
  {
    title: "Certification",
    image: "/img/buying-guide/Certification image 5.jpg",
    description: "A diamond grading report is a quality certification from an independent gem laboratory."
  },
  {
    title: "Cost",
    image: "/img/buying-guide/Cost image 6.jpg",
    description: "It is important to buy a diamond that offers the best features but with a good mix of the first four Cs."
  },
  {
    title: "Contour",
    image: "/img/buying-guide/7cs-image (7).png",
    description: "The shape and dimensions of a diamond play a key role in its appearance in a ring."
  },
]

const csDataNl = [
  {
    title: "Carat of karaat",
    image: "/img/buying-guide/7cs-image (1).png",
    description: "Het gewicht van een diamant wordt gemeten in karaat; hoe groter een diamant, hoe zeldzamer."
  },
  {
    title: "Clarity of zuiverheid",
    image: "/img/buying-guide/Clarity Image 2.jpg",
    description: "Hoe helderder een diamant is, waardevoller en zeldzamer hij is."
  },
  {
    title: "Cut of slijpvorm",
    image: "/img/buying-guide/Cost image 6.jpg",
    description: "Een goed geslepen of gefacetteerde diamant schittert veel met het licht en biedt hierdoor een mooie glans en een hoge waarde."
  },
  {
    title: "Color of kleur",
    image: "/img/buying-guide/7cs-image (4).png",
    description: "Diamanten worden ingedeeld naar kleur, beginnend bij D en oplopend tot Z, waarbij D het meest kleurloos is en dus het meest waardevol."
  },
  {
    title: "Certification of certificatie",
    image: "/img/buying-guide/Certification image 5.jpg",
    description: "Een diamantbeoordelingsrapport is een kwaliteitscertificaat van een onafhankelijk edelsteenlaboratorium."
  },
  {
    title: "Cost of kosten",
    image: "/img/buying-guide/Cost image 6.jpg",
    description: "Het is belangrijk om een diamant te kopen met de beste eigenschappen. Dit is het best wanneer er een goede mix is van de eerste vier C's."
  },
  {
    title: "Contour of omvang",
    image: "/img/buying-guide/7cs-image (7).png",
    description: "De vorm en de afmetingen van een diamant spelen een sleutelrol in hoe een diamant eruit ziet in een ring."
  },
]

export default function BuyingGuide() {
  const { locale } = useRouter();
  let shapeData = {};
  let csData = {};
  if (locale === "nl") {
    shapeData = shapeDataEn;
    csData = csDataEn;
  } else {
    shapeData = shapeDataNl;
    csData = csDataNl;
  }

  return (
    <div className="buying-guide_page">
      <Head>
        <title>Engagment Buying Guide | Royal Coster</title>
      </Head>
      <Header />
      {/* Start hero section */}
      <div className="hero-section">
        <div className="r-container">
          <h1 className="title text-capitalize mb-5">
          {locale === "nl" ? "Verloving " : "Engagement "} <br />{locale === "nl" ? "ringen " : "rings "} <span>{locale === "nl" ? "kopen " : "buying "} <br />{locale === "nl" ? "gids" : "guide"}</span>
          </h1>
        </div>
      </div>

      {/* Start guide section */}
      <div className="guide-section">
        <div className="row r-container py-5">
          <div className="col-md-4 col-12 p-0 pe-md-5 pe-5 py-sm-5">
            <h3 className="title text-capitalize">{locale === "nl" ? "De" : "The"} <span>{locale === "nl" ? "Perfect" : "Perfect"}</span> <br />{locale === "nl" ? "Ring" : "Ring"}</h3>
          </div>
          <div className="col-md-8 col-12 p-0 ps-md-5 ps-0 pt-sm-5 pt-4 pb-sm-5">
            <p className="guide-text mb-4">
              Picking out
              <Link href={{
                pathname: "/shop",
                query: {
                  tags: "engagement",
                  productType: "rings"
                }
              }}>
                <a className="text-decoration-underline mx-2">{locale === "nl" ? "verlovings ringen" : "engagement rings"}</a>
              </Link>
              {locale === "nl" ? "is een opwindende stap in uw voorstel, en het is ook een stap die veel mensen ontmoedigend vinden. Toch is er altijd de perfecte ring voor je partner en deze gids zal je helpen hem te vinden." : "is an exciting step of your proposal, and it’s also one that many people find daunting. Yet the perfect ring for your partner is always out there and this guide will help you find it."}
            </p>
          </div>
        </div>
      </div>
      {/* End guide section */}

      {/* Start ring size section */}
      <div className="ring-size-section horizontal-section py-5">
        <div className="r-container row align-items-center py-5 my-md-5">
          <div className="col-md-6 image-panel px-md-5 mb-5 mb-md-0">
            <img src="/img/buying-guide/style-image.png" alt="style-image" />
          </div>
          <div className="col-md-6 px-md-5">
            <h3 className="title blue-text mb-4">{locale === "nl" ? "1. Ringstijl" : "1. Ring style"}</h3>
            <p className="mb-4 description text-capitalize">{locale === "nl" ? "De stijl en zetting van de band van de verlovingsring is net zo belangrijk als de steen die erop wordt gezet. De ring moet haar persoonlijke stijl weerspiegelen: misschien wil je iets kiezen dat past bij de sieraden die ze al draagt." : "The style and setting of the engagement ring’s band is just as important as the stone that will be set on it. The ring should reflect her personal style: you may want to choose something that matches the jewellery she already wears."}</p>
            <p className="mb-0 description text-capitalize">{locale === "nl" ? "Het moet ook passen bij de vorm van haar vingers. Als algemene regel geldt dat kleinere ringen meer geschikt zijn voor jongere mensen, terwijl grotere ringen het beste passen bij volwassen handen. Ringen met brede, horizontale stijlen zijn zeer geschikt voor lange, slanke vingers, terwijl kortere vingers vragen om meer verticale ontwerpen. Een langwerpige ring kan ook royaal geproportioneerde handen flatteren." : "It should also suit the shape of her fingers. As a general rule, smaller rings are more appropriate for younger people, while larger rings look best on mature hands. Rings with wide, horizontal stylings are well–suited to long, slender fingers, while shorter fingers call for more vertical designs. An elongated ring can also flatter more generously-proportioned hands."}</p>
          </div>
        </div>
      </div>
      {/* End ring size section */}

      {/* Start diamond shape section */}
      <div className="diamond-shap-section grid-section grey-section py-5">
        <div className="r-container row pt-5 my-md-5">
          <h3 className="title blue-text mb-5">{locale === "nl" ? "2. Diamantvorm:" : "2. Diamond shape"}</h3>
          {
            shapeData.map((shape, index) =>
              <div className="shape-item col-lg-3 col-md-4 col-sm-6 mb-5" key={index}>
                <img width="120" height="120" className="mb-4" src={shape.image} alt="shape-image" />
                <Link href="#"><a className="item-title pt-2 mb-4">{shape.title}</a></Link>
                <p className="item-description mb-4">{shape.description}</p>
              </div>
            )
          }
        </div>
      </div>
      {/* End diamond shape section */}

      {/* Start cs section */}
      <div className="diamond-cs-section grid-section py-5">
        <div className="r-container row pt-5 my-md-5">
          <h3 className="title blue-text mb-5">{locale === "nl" ? "3. De 7C's" : "3. The 7C's"} </h3>
          {
            csData.map((item, index) =>
              <div className="cs-item col-lg-3 col-md-4 col-sm-6 mb-5" key={index}>
              {/*}  <img className="mb-4" src={item.image} alt="cs-image" /> */}
                <h3 className="item-title pt-2 mb-4">{item.title}</h3>
                <p className="item-description mb-4">{item.description}</p>
              </div>
            )
          }
        </div>
      </div>
      {/* End cs section */}

      {/* Start setting section */}
      <div className="setting-section horizontal-section grey-section py-5">
        <div className="r-container row align-items-center py-5 my-md-5">
          <div className="col-md-6 image-panel px-md-5 mb-5 mb-md-0 order-md-last">
            <img src="/img/buying-guide/setting-image.png" alt="style-image" />
          </div>
          <div className="col-md-6 px-md-5">
            <h3 className="title blue-text mb-4">{locale === "nl" ? "4. Vorm & instelling" : "4. Shape & Setting"}</h3>
            <p className="mb-4 description text-capitalize">
            {locale === "nl" ? "De stijl en zetting van de band van de verlovingsring is net zo belangrijk als de steen die erop wordt gezet. De ring moet haar persoonlijke stijl weerspiegelen: misschien wil je iets kiezen dat past bij de sieraden die ze al draagt." : "The style and setting of the engagement ring’s band is just as important as the stone that will be set on it. The ring should reflect her personal style: you may want to choose something that matches the jewellery she already wears."}
            </p>
            <p className="mb-0 description text-capitalize">
            {locale === "nl" ? "Het moet ook passen bij de vorm van haar vingers. Als algemene regel geldt dat kleinere ringen meer geschikt zijn voor jongere mensen, terwijl grotere ringen het beste passen bij volwassen handen. Ringen met brede, horizontale stijlen zijn zeer geschikt voor lange, slanke vingers, terwijl kortere vingers vragen om meer verticale ontwerpen. Een langwerpige ring kan ook royaal geproportioneerde handen flatteren." : "It should also suit the shape of her fingers. as a general rule, smaller rings are more appropriate for younger people, while larger rings look best on mature hands. Rings with wide, horizontal stylings are well-suited to long, slender fingers, while shorter fingers call for more vertical designs. An elongated ring can also flatter more generously-proportioned hands."}
            </p>
          </div>
        </div>
      </div>
      {/* End setting section */}

      {/* Start colour section */}
      <div className="colour-section horizontal-section py-5">
        <div className="r-container row align-items-center py-5 my-md-5">
          <div className="col-md-6 image-panel px-md-5 mb-5 mb-md-0">
            <img src="/img/buying-guide/colour-image.png" alt="style-image" />
          </div>
          <div className="col-md-6 px-md-5">
            <h3 className="title blue-text mb-4">{locale === "nl" ? "5. Kleur instellen" : "5. Setting colour"}</h3>
            <p className="mb-4 description text-capitalize">
            {locale === "nl" ? "Een verlovingsring wordt traditioneel gemaakt van goud, maar hoeft niet per se goud van kleur te zijn:" : "An engagement ring is traditionally made from gold, although it doesn’t necessarily need to be gold in colour:"}
            </p>
            <p className="mb-4 description text-capitalize">
            {locale === "nl" ? "Witgoud is net zo populair vanwege zijn ingetogen, elegante uitstraling. Roségoud is ook erg aantrekkelijk en geeft de ring een unieke uitstraling – of voor een verlovingsring die van binnenuit bijna lijkt te gloeien, overweeg platina." : "White gold is just as popular for its understated, elegant appearance. Rose gold is also very attractive and lends the ring a unique look – or for an engagement ring that almost seems to glow from within, consider platinum."}
            </p>
            <p className="mb-4 description text-capitalize">
            {locale === "nl" ? "Witte (kleurloze) diamanten zijn de traditionele keuze voor de steen, maar nogmaals, je moet je vrij voelen om je eigen instinct - en haar stijl - de uiteindelijke beslissing te laten beïnvloeden. Roze diamanten, gewaardeerd om hun zeldzaamheid, zijn een uitzonderlijke keuze voor een ring met een verschil." : "White (colourless) diamonds are the traditional choice for the stone, but again you should feel free to let your own instincts – and her style – influence the final decision. Pink diamonds, prized for their rarity, make an exceptional choice for a ring with a difference."}
            </p>
          </div>
        </div>
      </div>
      {/* End colour section */}

      {/* Start size section */}
      <div className="size-section horizontal-section grey-section py-5">
        <div className="r-container row align-items-center py-5 my-md-5">
          <div className="col-md-6 image-panel px-md-5 mb-5 mb-md-0 order-md-last">
            <img src="/img/buying-guide/size-image.png" alt="style-image" />
          </div>
          <div className="col-md-6 px-md-5">
            <h3 className="title blue-text mb-4">{locale === "nl" ? "6. Ringmaat:" : "6. Ring size"}</h3>
            <p className="mb-4 description text-capitalize">
            {locale === "nl" ? "Hoewel het gemakkelijk genoeg is om een ring te laten aanpassen als je hem de eerste keer niet de juiste maat krijgt, voegt het iets speciaals toe als je van plan bent hem direct na je voorstel te dragen!" : "While it’s easy enough to have a ring adjusted if you don’t get it the right size the first time, it adds a special something if your intended can wear it right after your proposal!"}
            </p>
            <p className="mb-4 description text-capitalize">
            {locale === "nl" ? "Als je de ringmaat van je partner niet weet, neem dan contact op met ons verkoopteam en we kunnen je een gratis ringmaat per post sturen zodat je het kunt controleren. Als alternatief kunt u een van haar bestaande ringen naar een plaatselijke juwelier brengen om te controleren." : "If you don’t know your partners ring size, contact our sales team and we can send you a free ring sizer in the post so you can check. Alternatively you can take one of her existing rings to a local jewellers to check."}
            </p>
            <p className="mb-4 description text-capitalize">
            {locale === "nl" ? "Als dit geen optie is, vraag dan een vriend of familielid of ze haar ringmaat weten. En als ze het niet weten, wanhoop dan niet - probeer (voorzichtig!) de diameter van de ringvinger van je partner te meten met een touwtje terwijl ze slaapt." : "If this isnt an option, try asking a friend or relative if they know her ring size. And if they don’t know, don’t despair – try (carefully!) measuring the diameter of your partner’s ring finger with a piece of string while she’s asleep."}
            </p>
          </div>
        </div>
      </div>
      {/* End size section */}

      {/* Start finally section */}
      <div className="finally-section r-container text-center py-5">
        <div className="text-panel mx-auto py-5 my-md-5">
          <h3 className="title blue-text">{locale === "nl" ? "En tenslotte..." : "And Finally..."}</h3>
          <p className="description py-5 text-capitalize">{locale === "nl" ? "Er komt veel kijken bij het kopen van een verlovingsring, maar we hopen dat deze gids je heeft geholpen om tot een beslissing te komen waar jullie allebei blij mee zijn." : "There’s a lot to consider when buying an engagement ring – but we hope this guide has helped you to arrive at a decision that you’re both happy with."}</p>
          <p className="sub-title mb-0 text-capitalize">{locale === "nl" ? "Rest ons alleen nog om u veel succes te wensen met uw voorstel!" : "All that remains is for us to wish you all the best of luck with your proposal!"}</p>
        </div>
      </div>
      {/* End finally section */}

      {/* Start instagram section */}
      <Instagram />
      {/* End instagram section */}

      {/* Start Schedule section */}
      <Schedule />
      {/* End Schedule section */}

      {/* Start Footer */}
      <Footer />
      {/* End Footer */}

      <AppointmentModal />

    </div >
  );
}
