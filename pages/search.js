import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Header from "/components/header";
import router, { useRouter } from "next/router";
import Footer from "/components/footer";
import Schedule from "/components/schedule";
import Collection from "/components/collection";
import SelectSearch, { fuzzySearch } from "react-select-search-nextjs";
import Script from "next/script";
import {
  RiHeartLine,
  RiFilter3Fill,
  RiHeartFill,
  RiArrowRightSLine,
} from "react-icons/ri";
import { Skeleton } from "@material-ui/lab";
import _ from "lodash";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import { setWishList } from "../redux/actions/wishListAction";
import CheckboxTree from "react-checkbox-tree";
import CheckBox from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import 'bootstrap/dist/css/bootstrap.min.css';
import TagManager from "react-gtm-module";
const tagManagerArgs = {
  id: "GTM-5XRL4VQ",
}
const options = [
  { name: "BEST SELLING", value: "BEST_SELLING", reverse: false },
  { name: "PRICE LOW TO HIGH", value: "PRICE A", reverse: false },
  { name: "PRICE HIGH TO LOW", value: "PRICE B", reverse: true },
  { name: "RECENTLY ADDED", value: "CREATED_AT", reverse: true },
  { name: "RECENTLY UPDATED", value: "UPDATED_AT", reverse: true },
  { name: "TITLE A-Z", value: "TITLE A", reverse: false },
  { name: "TITLE Z-A", value: "TITLE B", reverse: true }

];

const filterItems = [
  { img: "image1.png", text: "Solitaire with side" },
  { img: "image2.png", text: "Solitaire" },
  { img: "image3.png", text: "Three stone" },
  { img: "image4.png", text: "Halo/framed" },
  { img: "image5.png", text: "promise" },
  { img: "image6.png", text: "brands-diamonds" },
  { img: "image7.png", text: "bands-metals" },
  { img: "image8.png", text: "fashion" },
  { img: "image9.png", text: "mothers/family" },
];
const productItems = [
  {
    img: "product(3).png",
    title: "Brilliant Cut Diamond Engagement Ring",
    categories: ["Diamond", "Engagement", "Rings"],
    cost: "$2500",
    url: "#",
  },
  {
    img: "product(3).png",
    title: "Brilliant Cut Diamond Engagement Ring",
    categories: ["Diamond", "Engagement", "Rings"],
    cost: "$2500",
    url: "#",
  },
  {
    img: "product(3).png",
    title: "Brilliant Cut Diamond Engagement Ring",
    categories: ["Diamond", "Engagement", "Rings"],
    cost: "$2500",
    url: "#",
  },
  {
    img: "product(3).png",
    title: "Brilliant Cut Diamond Engagement Ring",
    categories: ["Diamond", "Engagement", "Rings"],
    cost: "$2500",
    url: "#",
  },
  {
    img: "product(3).png",
    title: "Brilliant Cut Diamond Engagement Ring",
    categories: ["Diamond", "Engagement", "Rings"],
    cost: "$2500",
    url: "#",
  },
  {
    img: "product(3).png",
    title: "Brilliant Cut Diamond Engagement Ring",
    categories: ["Diamond", "Engagement", "Rings"],
    cost: "$2500",
    url: "#",
  },
  {
    img: "product(3).png",
    title: "Brilliant Cut Diamond Engagement Ring",
    categories: ["Diamond", "Engagement", "Rings"],
    cost: "$2500",
    url: "#",
  },
  {
    img: "product(3).png",
    title: "Brilliant Cut Diamond Engagement Ring",
    categories: ["Diamond", "Engagement", "Rings"],
    cost: "$2500",
    url: "#",
  },
  {
    img: "product(3).png",
    title: "Brilliant Cut Diamond Engagement Ring",
    categories: ["Diamond", "Engagement", "Rings"],
    cost: "$2500",
    url: "#",
  },
];

const getProductURL = process.env.NEXT_PUBLIC_GET_PRODUCT_URL;
const productURL = process.env.NEXT_PUBLIC_PRODUCT_URL;
const collectionURL =
  "https://royalcoster.com:81/royalcoster/getCustomCollections.php";
const metarialURL =
  "https://royalcoster.com:81/royalcoster/getMaterialsGroupedNew.php";
const materialColorURL =
  "https://royalcoster.com:81/royalcoster/getAttributesColor.php";
const cutURL =
  "https://royalcoster.com:81/royalcoster/getAttributesCut.php";
const mountingURL =
  "https://royalcoster.com:81/royalcoster/generateAttributesStyle.php";
const styleURL =
  "https://royalcoster.com:81/royalcoster/generateAttributesCollection.php";
const brandURL =
  "https://royalcoster.com:81/royalcoster/getBrandsGrouped.php";
const brightnessURL =
  "https://royalcoster.com:81/royalcoster/generateAttributesClarity.php";
const stoneURL =
  "https://royalcoster.com:81/royalcoster/generateAttributesType.php";
const settingURL =
  "https://royalcoster.com:81/royalcoster/generateAttributesSettings.php";
const CTagURL = process.env.NEXT_PUBLIC_CTAG_URL;
const headers = {
  // "Content-Type": "application/json",
};
function getQueryParam(url, key) {
  var queryStartPos = url.indexOf('?');
  if (queryStartPos === -1) {
    return;
  }
  var params = url.substring(queryStartPos + 1).split('&');
  for (var i = 0; i < params.length; i++) {
    var pairs = params[i].split('=');
    if (decodeURIComponent(pairs.shift()) == key) {
      return decodeURIComponent(pairs.join('='));
    }
  }
}
function getFilterValue(str) {
  str = str.toLowerCase();
  var toReplace = ['"', "'", "\\", "(", ")", "[", "]"];
  // For the old browsers
  for (var i = 0; i < toReplace.length; ++i) {
    str = str.replace(toReplace[i], "");
  }
  str = str.replace(/\W+/g, "-");
  if (str.charAt(str.length - 1) == "-") {
    str = str.replace(/-+\z/, "");
  }
  if (str.charAt(0) == "-") {
    str = str.replace(/\A-+/, "");
  }
  return str;
}

const firstFilterItem = [
  {
    title: "price",
    filter: [
      { label: "To €500", value: "to-500" },
      { label: "€1000 - €1499", value: "-1000-1499" },
      { label: "€1500 - €2499", value: "-1500-2499" },
      { label: "€2500 - €4999", value: "-2500-4999" },
      { label: "€5000 - €9999", value: "-5000-9999" },
      { label: "More than €10000", value: "more-than-10000" },
    ],
  },
  {
    title: "collection",
    filter: [
      { label: "Empress Collection", value: "empress-collectie" },
      { label: "Rainbow Collection", value: "rainbow-collectie" },
      { label: "Luna Collection", value: "luna-collectie" },
      { label: "Touch of Glam Collection", value: "touch-of-glam" },
      { label: "Wedding Rings Collection", value: "wedding-rings-collectie" },
      {
        label: "NIKKIE x Royal Coster Diamonds",
        value: "nikkie-x-royal-coster-diamonds",
      },
    ],
  },
  {
    title: "carat",
    filter: [
      { label: "Below 0.5 Carat", value: "below-0.5-carat" },
      { label: "0.5 - 1.0 Carat", value: "0.5-1.0-carat" },
      { label: "1 - 2 Carat", value: "1-2-carat" },
      { label: "2 - 5 Carat", value: "2-5-carat" },
      { label: "More than 5 Carat", value: "more-than-5-carat" },
    ],
  },
];

const productTypeFilterItem = [
  {
    label: "Rings",
    value: "rings",
  },
  {
    label: "Earrings",
    value: "earrings",
  },
  {
    label: "Bracelets",
    value: "bracelets",
  },
  {
    label: "Necklaces",
    value: "necklaces",
  },
];

const withOutCollections = [
  "Accessories",
  "external",
  "Loyalty10",
  'Moederdag "The Sweetest Thing"',
  "Bracelets",
  "In Bloom Collection",
  "The Blaze Royal 201",
];

const backgrounndArr = [
  "engagement-rings",
  "201-rings",
  "precious-rings",
  "diamond-studs",
  "precious-earrings",
  "tennis-bracelets",
  "diamond-pendants",
  "chopard-watches",
  "frederique-constant-watches",
  "hamilton-watches",
  "longines-watches",
  "omega-watches",
  "piaget-watches",
  "rado-watches",
  "tag-heuer-watches",
  "titoni-watches",
  "tudor-watches",
];

const checkTreeIcons = {
  check: <CheckBox />,
  uncheck: <CheckBoxOutlineBlankIcon />,
  halfCheck: <CheckBoxOutlinedIcon />,
  expandClose: <AddBoxOutlinedIcon />,
  expandOpen: <IndeterminateCheckBoxOutlinedIcon />,
  expandAll: "",
  collapseAll: "",
  parentClose: "",
  parentOpen: "",
  leaf: "",
};
let titleArray = {
  "TAG-Heuer": "TAG Heuer",
  "Frederique-Constant": "Frederique Constant",
  "OMEGA" : "OMEGA luxury"
}
let watchTitle = "";
let productStore = [],
cP = 0,
  lastProductStatus,
  cTagData,
  check0 = [],
  check1 = [],
  check2 = [],
  check3 = [],
  check4 = [],
  check5 = [],
  check6 = [],
  check7 = [],
  check8 = [],
  check9 = [],
  check10 = [],
  check11 = [],
  localProductType,
  localTag = [],
  basicStyleData,
  basicMountingData,
  basicBrandData,
  basicStoneData,
  basicBrightnessData,
  basicCutData,
  basicSettingData,
  basicMetarialData,
  basicMaterialColorData,
  basicCollectionData,
  localResultCounter,
  localChecking = false,
  productsShowed = [],
  sortRuleUpdated = "sortKey:BEST_SELLING,reverse:false",
  firstLoad = true;
function Ring(props) {
  const [result, setResult] = useState(0);
  const [selectValue, setSelectValue] = useState({name:"BEST SELLING",value:"BEST_SELLING",reverse:true});
  const [sortRule, setSortRule] = useState("sortKey:BEST_SELLING,reverse:false");
  const [selectFilter, setSelectFilter] = useState([]);
  const [productData, setProductData] = useState([]);
  const [lastProduct, setLastProduct] = useState("");
  const [leftFilterItems, setLeftFilterItems] = useState(firstFilterItem);
  const [load, setLoad] = useState(false);
  const [formData, setFormData] = useState();
  const [checked0, setChecked0] = useState([]);
  const [checked1, setChecked1] = useState([]);
  const [checked2, setChecked2] = useState([]);
  const [checked3, setChecked3] = useState([]);
  const [checked4, setChecked4] = useState([]);
  const [checked5, setChecked5] = useState([]);
  const [checked6, setChecked6] = useState([]);
  const [checked7, setChecked7] = useState([]);
  const [checked8, setChecked8] = useState([]);
  const [checked9, setChecked9] = useState([]);
  const [checked10, setChecked10] = useState([]);
  const [checked11, setChecked11] = useState([]);
  const [checkedProductType, setCheckedProductType] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [productType, setProductType] = useState();
  const [tag, setTag] = useState();
  const [cTagLastAdd, setCTagLastAdd] = useState(1);
  const [checking, setChecking] = useState(localChecking);
  const [cTags, setCTags] = useState([]);
  const [cTagMiddleStore, setCTagMiddleStore] = useState([]);
  const [loadMoreStatus, setLoadMoreStatus] = useState(false);
  const [totalCounter, setTotalCounter] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [filterMounted, setFilterMounted] = useState(false);
  const [bgImage, setBgImage] = useState();
  const router = useRouter();

  const [basicStyleFilter, setBasicStyleFilter] = useState();
  const [basicMountingFilter, setBasicMountingFilter] = useState();
  const [basicBrandFilter, setBasicBrandFilter] = useState();
  const [basicStoneFilter, setBasicStoneFilter] = useState();
  const [basicBrightnessFilter, setBasicBrightnessFilter] = useState();
  const [basicCutFilter, setBasicCutFilter] = useState();
  const [basicMetarialFilter, setBasicMetarialFilter] = useState();
  const [basicMaterialColorFilter, setBasicMaterialColorFilter] = useState();
  const [basicSettingFilter, setBasicSettingFilter] = useState();
  const [basicCollectionFilter, setBasicCollectionFilter] = useState();
   const [priceFilter, setPriceFilter] = useState();
  const [collectionFilter, setCollectionFilter] = useState();
  const [styleFilter, setStyleFilter] = useState();
  const [mountingFilter, setMountingFilter] = useState();
  const [brandFilter, setBrandFilter] = useState();
  const [stoneFilter, setStoneFilter] = useState();
  const [brightnessFilter, setBrightnessFilter] = useState();
  const [cutFilter, setCutFilter] = useState();
  const [metarialFilter, setMetarialFilter] = useState();
  const [accessToken, setAccessToken] = useState();
  const [materialColorFilter, setMaterialColorFilter] = useState();
  const [caratFilter, setCaratFilter] = useState();
  const [settingFilter, setSettingFilter] = useState();
  const [checkingStatus, setCheckingStatus] = useState(false);
  const [productTypeFilter, setProductTypeFilter] = useState();
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const pushClickEvent = (obj) => {

    var ind = obj.attr("position") - 1;
    var item = productsShowed[ind];
    dataLayer.push({ ecommerce: null });

  /*  ga('gtag_UA_54391819_8.send', {
      hitType: 'event',
      eventCategory: 'Video',
      eventAction: 'play',
      eventLabel: 'cats.mp4'
    });*/
        localStorage.selectedItem = JSON.stringify(item);

      dataLayer.push(dll);
  };
 const pushDataLayers = (data, query = "", createImpression = true) => {
      var imprs = [];
      var ttv = 0;

    $.each(data, function(ind) {
      var ths = this;
      var obj = {
           id: ths.costerid,
           name: ths.title + " (" + ths.costerid + ")",
           price: ths.price,
           brand: ths.vendor,
           category: ths.productType,
           position: (currentPage * 9) + (ind + 1),
           list: ((router.query.productType !== undefined) ? router.query.productType : "All yewelry") + " " + ((router.query.tags !== undefined) ? router.query.tags : "") + "" + query + " Page:" + (cP)
      }


      ttv += parseFloat(ths.price);
      imprs.push(obj)
    });

    if (true) {
      if (cP == 0) {
        cP += 1;
      }
      ga('gtag_UA_54391819_8.send', {
        hitType: 'event',
        eventCategory: 'Products List',
        eventAction:   ((router.query.productType !== undefined) ? router.query.productType : "All yewelry") + " " + ((router.query.tags !== undefined) ? router.query.tags : "") + "" + query + " Page:" + (cP),
        eventLabel:   ((router.query.productType !== undefined) ? router.query.productType : "All yewelry") + " " + ((router.query.tags !== undefined) ? router.query.tags : "") + "" + query + " Page:" + (cP),
      });
        var dl = {
          event: "productImpression",
          ecommerce: {
            value: ttv,
            currencyCode: "EUR",
            impressions: imprs
          }
        }

      } else {
        var ddd = null;
        $.each(dataLayer, function() {
          if (this.event == "productImpression") {
            var ths = this;
            $.each(imprs, function () {
              ths.ecommerce.impressions.push(this);
            })
            var imprs = ths.ecommerce.impressions;
            var dl = {
              event: "productImpression",
              ecommerce: {
                value: ttv,
                currencyCode: "EUR",
                impressions: imprs
              }
            }

          }
        });


      }
 };
 useEffect(() => {

   var ll = (window.location.href.substring(window.location.href.indexOf("?") + 1).split("=")[1]);
   localStorage.referrer = "";
   localStorage.backLink = "";
    localStorage.mainBackTitle = "SEARCH";
    localStorage.mainBackHref = "/search?search=" + ll;
      TagManager.initialize({ gtmId: 'GTM-5XRL4VQ' });

  }, []);
  useEffect(() => {
    var pt = getQueryParam(window.location.href, 'productType');
    var tgs = getQueryParam(window.location.href, 'tags');
    if (pt == "watches") {
      if (titleArray[tgs] !== undefined) {
        watchTitle = titleArray[tgs];
      } else {
        watchTitle = tgs.split(",")[0];
      }

    }

    if ($(window).width() < 576) {
      setIsMobile(true);

    }

    if (localStorage.access_token) {
      setAccessToken(localStorage.access_token);
    }
  }, []);

  useEffect(() => {
    if (router.query) {

      setLoad(false);
      setLoadMoreStatus(false);
      setFilterMounted(false);
      setCTagMiddleStore([]);
      setCTagLastAdd(1);
      setCTags([]);
      setTotalCounter(0);

      setCollectionFilter();
      setStyleFilter();
      setMountingFilter();
      setChecked1([]);
      setChecked2([]);
      setChecked3([]);
      setChecked4([]);
      setChecked5([]);
      setChecked6([]);
      setChecked7([]);
      setChecked8([]);
      setChecked9([]);
      setChecked10([]);
      setChecked11([]);
      setCheckedProductType([]);
      if (router.query.productType != "watches") {

        setPriceFilter();
        setBrandFilter();
        setStoneFilter();
        setBrightnessFilter();
        setCutFilter();
        setCaratFilter();
        setMetarialFilter();
        setMaterialColorFilter();
        setProductTypeFilter();
      }
      if (_.size(router.query)) {
        if (router.query.tags || router.query.productType) {
          if (router.query.productType) {
            setProductType(router.query.productType);
            if (router.query.tags) {
              if (
                backgrounndArr.find(
                  (item) =>
                    item ==
                    router.query.tags.split(",")[0].toLowerCase() +
                      "-" +
                      router.query.productType
                )
              ) {
                setBgImage(
                  router.query.tags.split(",")[0].toLowerCase() +
                    "-" +
                    router.query.productType
                );
              } else {
                setBgImage(router.query.productType);
              }
            } else {
              setBgImage(router.query.productType);
            }
          }
          if (router.query.tags) {
            if (router.query.productType == "watches") {

              setTag(router.query.tags.replace("-","").toLowerCase().split(","));
            } else {
              setTag([...router.query.tags.toLowerCase().split(","), "jewelry"]);
            }
          } else {
            if (router.query.productType != "watches") {
              setTag(["jewelry"]);
            }
          }
        } else {
          setTag(["jewelry"]);
        }
      } else {
        if (router.asPath == "/shop") {
          setTag(["jewelry"]);
          setProductType();
          setProductTypeFilter(productTypeFilterItem);
        }
      }
    }
  }, [router.query]);

    useEffect(() => {

      if (!loaded) {

                if (true) {
                  var formData = new FormData();

                  console.log(formData)

                  formData.position = "first:28";
                  formData.append("sort", sortRuleUpdated);
                  if (!firstLoad) {

                  } else {
                    firstLoad = false;
                  }
                  productsShowed = [];
              //    alert("??????????")

                  var ll = unescape(window.location.href.substring(window.location.href.indexOf("?") + 1).split("=")[1]);
                      delete formData.query;
                      formData.append("query", ll);
                      formData.append("page", 1)
                  fetch("https://royalcoster.com:81/royalcoster/search.php", {
                    method: "POST",
                    body: formData,
                  })
                    .then((res) => res.json())
                    .then((data) => {

                      pushDataLayers(data.data,formData.query);
                      setProductData(data.resources.results.products);
                      productStore = data.data;
                      $.each(data.data, function() {
                          productsShowed.push(this);
                      })

                      $.each($(".product-item"), function(ind) {
                        $(this).attr("position", ind + 1);
                        $(this).unbind("click");
                        $(this).bind("click", function() {
                          pushClickEvent($(this));
                        });
                      })
                    });
                }

      setLoaded(true);
    }
    }, [formData, loaded]);

  useEffect(() => {
    if (cTags.length) {

      if (firstFilterItem[0]) {
        let middleArr = [];
        firstFilterItem[0].filter.map((item, index) => {
          if (cTags.find((ctag) => ctag == item.value)) {
            middleArr.push({ label: item.label, value: item.value });
          }
        });
        setPriceFilter(middleArr);
      }
      // if (firstFilterItem[1]) {
      //   let middleArr = [];
      //   firstFilterItem[1].filter.map((item, index) => {
      //     if (cTags.find((ctag) => ctag == item.value)) {
      //       middleArr.push({ label: item.label, value: item.value });
      //     }
      //   });
      //   setCollectionFilter(middleArr);
      // }
      if (firstFilterItem[2]) {
        let middleArr = [];
        firstFilterItem[2].filter.map((item, index) => {
          if (cTags.find((ctag) => ctag == getFilterValue(item.label))) {
            middleArr.push({
              label: item.label,
              value: item.value,
            });
          }
        });
        setCaratFilter(middleArr);
      }
    }
  }, [cTags]);

  useEffect(() => {
    let middleArr = [];
    if (basicCollectionFilter) {
      basicCollectionFilter.map((item) => {
        if (
          !withOutCollections.find((collection) => collection == item.title)
        ) {
          middleArr.push({
            label: item.title.replaceAll("Collectie", "Collection"),
            value: item.handle,
          });
        }
      });
      setCollectionFilter(middleArr);
    }
  }, [basicCollectionFilter]);

  useEffect(() => {
    if (cTags.length) {
      if (basicStyleFilter) {
        let middleArr = [];
        basicStyleFilter.map((item, index) => {
          if (cTags.find((ctag) => ctag == getFilterValue(item))) {
            middleArr.push({ label: item, value: getFilterValue(item) });
          }
          if (index == basicStyleFilter.length - 1) {
            setStyleFilter(middleArr);
          }
        });
      }
    }
  }, [cTags, basicStyleFilter]);

  useEffect(() => {
    if (cTags.length) {
      if (basicMountingFilter) {
        let middleArr = [];
        basicMountingFilter.map((item, index) => {
          if (cTags.find((ctag) => ctag == getFilterValue(item))) {
            middleArr.push({ label: item, value: getFilterValue(item) });
          }
          if (index == basicMountingFilter.length - 1) {
            setMountingFilter(middleArr);
          }
        });
      }
    }
  }, [cTags, basicMountingFilter]);

  useEffect(() => {
    if (cTags.length) {
      if (basicBrandFilter) {
        let brands;
        if (productType) {
          brands = basicBrandFilter.find(
            (item) => item.MainGroup.toLowerCase() == productType
          );
        }

        brands
          ? (brands = brands)
          : (brands = basicBrandFilter.find(
              (item) => item.MainGroup.toLowerCase() == "all products"
            ));

        const basicArr = brands ? brands.BrandID.split(",") : [];
        let middleArr = [];
        basicArr.map((item, index) => {
          if (cTags.find((ctag) => ctag == getFilterValue(item))) {
            middleArr.push({ label: item, value: getFilterValue(item) });
          }
          if (index == basicArr.length - 1) {
            setBrandFilter(middleArr);
          }
        });
      }
    }
  }, [cTags, basicBrandFilter]);

  useEffect(() => {
    if (cTags.length) {
      if (basicStoneFilter) {
        let stoneArr = [];
        let counter = [];
        for (const key in basicStoneFilter) {
          if (Object.hasOwnProperty.call(basicStoneFilter, key)) {
            let middleArr = [];
            counter++;
            const element = basicStoneFilter[key];
            let itemArr = [];
            if (element.length == 1) {
              if (cTags.find((ctag) => ctag == getFilterValue(element[0]))) {
                middleArr.push({
                  label: element[0],
                  value: getFilterValue(element[0]),
                });
              }
            } else {
              element.map((item, index) => {
                if (cTags.find((ctag) => ctag == getFilterValue(item))) {
                  itemArr.push({ label: item, value: getFilterValue(item) });
                }
                if (index == element.length - 1) {
                  if (itemArr.length) {
                    if (itemArr.length == 1) {
                      middleArr.push({
                        label: itemArr[0].label,
                        value: itemArr[0].value,
                      });
                    } else {
                      middleArr.push({
                        label: key,
                        value: getFilterValue(key) + 1,
                        children: itemArr,
                      });
                    }
                  }
                }
              });
            }
            stoneArr.push(...middleArr);
            if (counter == _.size(basicStoneFilter)) {
              setStoneFilter(stoneArr);
            }
          }
        }
      }
    }
  }, [cTags, basicStoneFilter]);

  useEffect(() => {
    if (cTags.length) {
      if (basicBrightnessFilter) {
        let brightnessArr = [];
        let counter = [];
        for (const key in basicBrightnessFilter) {
          if (Object.hasOwnProperty.call(basicBrightnessFilter, key)) {
            let middleArr = [];
            const element = basicBrightnessFilter[key];
            counter++;
            let itemArr = [];
            if (element.length == 1) {
              if (cTags.find((ctag) => ctag == getFilterValue(element[0]))) {
                middleArr.push({
                  label: element[0],
                  value: getFilterValue(element[0]),
                });
              }
            } else {
              element.map((item, index) => {
                if (cTags.find((ctag) => ctag == getFilterValue(item))) {
                  itemArr.push({ label: item, value: getFilterValue(item) });
                }
                if (index == element.length - 1) {
                  if (itemArr.length) {
                    if (itemArr.length == 1) {
                      middleArr.push({
                        label: itemArr[0].label,
                        value: itemArr[0].value,
                      });
                    } else {
                      middleArr.push({
                        label: key,
                        value: getFilterValue(key) + 1,
                        children: itemArr,
                      });
                    }
                  }
                }
              });
            }
            brightnessArr.push(...middleArr);
            if (counter == _.size(basicBrightnessFilter)) {
              setBrightnessFilter(brightnessArr);
            }
          }
        }
      }
    }
  }, [cTags, basicBrightnessFilter]);

  useEffect(() => {
    if (cTags.length) {
      if (basicCutFilter) {
        let cutArr = [];
        let counter = 0;
        for (const key in basicCutFilter) {
          if (Object.hasOwnProperty.call(basicCutFilter, key)) {
            let middleArr = [];
            const element = basicCutFilter[key];
            counter++;
            let itemArr = [];
            if (element.length == 1) {
              if (cTags.find((ctag) => ctag == getFilterValue(element[0]))) {
                middleArr.push({
                  label: element[0],
                  value: getFilterValue(element[0]),
                });
              }
            } else {
              element.map((item, index) => {
                if (cTags.find((ctag) => ctag == getFilterValue(item))) {
                  itemArr.push({ label: item, value: getFilterValue(item) });
                }
                if (index == element.length - 1) {
                  if (itemArr.length) {
                    if (itemArr.length == 1) {
                      middleArr.push({
                        label: itemArr[0].label,
                        value: itemArr[0].value,
                      });
                    } else {
                      middleArr.push({
                        label: key,
                        value: getFilterValue(key) + 1,
                        children: itemArr,
                      });
                    }
                  }
                }
              });
            }
            cutArr.push(...middleArr);
            if (counter == _.size(basicCutFilter)) {
              setCutFilter(cutArr);
            }
          }
        }
      }
    }
  }, [cTags, basicMetarialFilter]);

  useEffect(() => {
    if (cTags.length) {
      if (basicMetarialFilter) {
        let middleArr = [];
        basicMetarialFilter.map((item, index) => {
          if (item == "18k Gold") {
            item = "18k";
          } else if (item == "14k Gold") {
            item = "14k";
          }
          if (cTags.find((ctag) => ctag == getFilterValue(item))) {
            middleArr.push({
              label:
                item == "18k" ? "18k Gold" : item == "14k" ? "14k Gold" : item,
              value: getFilterValue(item),
            });
          }
          if (index == basicMetarialFilter.length - 1) {
            setMetarialFilter(middleArr);
          }
        });
      }
    }
  }, [cTags, basicMetarialFilter]);

  useEffect(() => {
    if (cTags.length) {
      if (basicMaterialColorFilter) {
        let materialColorArr = [];
        let counter = 0;
        for (const key in basicMaterialColorFilter) {
          if (Object.hasOwnProperty.call(basicMaterialColorFilter, key)) {
            let middleArr = [];
            counter++;
            const element = basicMaterialColorFilter[key];
            let itemArr = [];
            if (element.length == 1) {
              if (cTags.find((ctag) => ctag == getFilterValue(element[0]))) {
                middleArr.push({
                  label: element[0],
                  value: getFilterValue(element[0]),
                });
              }
            } else {
              element.map((item, index) => {
                if (cTags.find((ctag) => ctag == getFilterValue(item))) {
                  itemArr.push({ label: item, value: getFilterValue(item) });
                }
                if (index == element.length - 1) {
                  if (itemArr.length) {
                    if (itemArr.length == 1) {
                      middleArr.push({
                        label: itemArr[0].label,
                        value: itemArr[0].value,
                      });
                    } else {
                      middleArr.push({
                        label: key,
                        value: getFilterValue(key) + 1,
                        children: itemArr,
                      });
                    }
                  }
                }
              });
            }
            materialColorArr.push(...middleArr);
            if (counter == _.size(basicMaterialColorFilter)) {
              setMaterialColorFilter(materialColorArr);
            }
          }
        }
      }
    }
  }, [cTags, basicMaterialColorFilter]);

  useEffect(() => {
    props.wishList &&
      localStorage.setItem("wishList", JSON.stringify(props.wishList));
  }, [props.wishList]);

  useEffect(() => {
    if (checkingStatus) {
      if (router.asPath.includes("/shop")) {
        if (checking != localChecking) {
          setCTagLastAdd(1);
        }
        let defaultTags = "";
        let tagArr = [
          checked1,
          checked2,
          checked3,
          checked4,
          checked5,
          checked6,
          checked7,
          checked8,
          checked9,
          checked10,
          checked11,
          checkedProductType,
        ];
        if (tagArr.length) {
          defaultTags = tagArr
            .map((arr, index) =>
              arr.length > 0
                ? " AND (" +
                  arr.map((item, id) =>
                    id == 0 ? "tag:" + item : " OR tag:" + item
                  ) +
                  ")"
                : ""
            )
            .join("")
            .replaceAll(",", "");
        }
        if (tag.length) {
          if (tag[tag.length - 1] == "jewelry") {
            defaultTags =
              defaultTags +
              (
                tag.map((item, index) =>
                  index + 1 < tag.length
                    ? (index == 0 ? " AND (tag:" + item : " OR tag:" + item) +
                      ")"
                    : ""
                ) + " AND tag:jewelry"
              ).replaceAll(",", "");
          } else {
            defaultTags =
              defaultTags +
              (
                tag.map((item, index) =>
                  index == 0 ? " AND (tag:" + item : " OR tag:" + item
                ) + ")"
              ).replaceAll(",", "");
          }
        }
        if (filterMounted) {
          let formData = new FormData();
          if (cTagLastAdd == 1) {
            formData.append("position", "first:50");
          } else {
            formData.append(
              "position",
              "first:50,after:" + '"' + cTagLastAdd + '"'
            );
          }
          if (productType) {
            if (productType == "watches") {
              formData.append(
                "query",
                "(status:active AND tag:active) AND" +
                  (productType == "pendants"
                    ? "(product_type:" +
                      productType +
                      " OR product_type:necklaces)"
                    : "product_type:" + productType) +
                  defaultTags
              );
            } else {
              formData.append(
                "query",
                "tag:active AND " +
                  (productType == "pendants"
                    ? "(product_type:" +
                      productType +
                      " OR product_type:necklaces)"
                    : "product_type:" + productType) +
                  defaultTags
              );
            }
          } else {
            formData.append("query", "tag:active" + defaultTags);
          }
          fetch(CTagURL, {
            method: "post",
            body: formData,
          })
            .then((res) => res.json())
            .then((data) => {
              let middleArr = [];
              setTotalCounter(data.productsCount);
              if (data.last) {
                let total = totalCounter;
                let tags = [];
                let cTagStore = cTagMiddleStore;
                if (checking != localChecking) {
                  total = 0;
                  cTagStore = [];
                  localChecking = checking;
                }

                data.tags.map((tag, index) => {
                  if (!tags.find((item) => item == getFilterValue(tag))) {
                    middleArr.push(getFilterValue(tag));
                  }
                  if (index == data.tags.length - 1) {
                    cTagData = [...cTagStore, ...middleArr];
                    setCTagMiddleStore(cTagData);
                    setCTags(cTagData);
                    if (data.hasNextPage == "No") {
                      localResultCounter = total + data.productsCount;
                      setResult(localResultCounter);
                    }
                  }
                });
                if (data.hasNextPage == "Yes") {
                  setCTagLastAdd(data.last);
                } else {
                  setTimeout(function()  {
                    $("body").LoadingOverlay("hide");
                  }, 2000);
                }
              }
            });
        } else {
          if (
            JSON.stringify(localTag) == JSON.stringify(tag) &&
            localProductType == productType &&
            cTagData
          ) {
            setCTags(cTagData);
          } else {
            localTag = tag;
            localProductType = productType;
            setResult(0);
            let formData = new FormData();
            if (cTagLastAdd == 1) {
              formData.append("position", "first:50");
            } else {
              formData.append(
                "position",
                "first:50,after:" + '"' + cTagLastAdd + '"'
              );
            }
            if (productType) {
              if (productType == "watches") {
                formData.append(
                  "query",
                  "(status:active AND tag:active) AND " +
                    (productType == "pendants"
                      ? "(product_type:" +
                        productType +
                        " OR product_type:necklaces)"
                      : "product_type:" + productType) +
                    defaultTags
                );
              } else {
                formData.append(
                  "query",
                  "tag:active AND " +
                    (productType == "pendants"
                      ? "(product_type:" +
                        productType +
                        " OR product_type:necklaces)"
                      : "product_type:" + productType) +
                    defaultTags
                );
              }
            } else {
              if (defaultTags) {
                formData.append("query", "tag:active" + defaultTags);
              } else {
                formData.append("query", "tag:active");
              }
            }
            fetch(CTagURL, {
              method: "post",
              body: formData,
            })
              .then((res) => res.json())
              .then((data) => {
                let middleArr = [];
                let tags = cTagMiddleStore;

                setTotalCounter(data.productsCount)
                data.tags.map((tag, index) => {
                  if (!tags.find((item) => item == getFilterValue(tag))) {
                    middleArr.push(getFilterValue(tag));
                  }
                  if (index == data.tags.length - 1) {
                    setCTagMiddleStore([...cTagMiddleStore, ...middleArr]);
                    cTagData = [...cTagMiddleStore, ...middleArr];
                    setCTags(cTagData);
                  }
                });
                // if (data.hasNextPage == "Yes") {
                //   setTotalCounter(totalCounter + data.productsCount);
                //   let tags = cTagMiddleStore;
                //   data.tags.map((tag, index) => {
                //     if (!tags.find((item) => item == getFilterValue(tag))) {
                //       middleArr.push(getFilterValue(tag));
                //     }
                //     if (index == data.tags.length - 1) {
                //       setCTagMiddleStore([...cTagMiddleStore, ...middleArr]);
                //       cTagData = [...cTagMiddleStore, ...middleArr];
                //       setCTags(cTagData);
                //     }
                //   });
                //   setCTagLastAdd(data.last);
                // } else {
                //   localResultCounter = totalCounter + data.productsCount;
                //   setResult(localResultCounter);
                // }
              });
          }
        }
        setTimeout(function()  {

          $("body").LoadingOverlay("hide");
        }, 2000);
          setFilterMounted(true);
      }
    }
  }, [cTagLastAdd, productType, checking]);

  useEffect(() => {
    if (cTags.length) {
      if (basicSettingFilter) {
        let middleArr = [];
        basicSettingFilter.map((item, index) => {
          if (cTags.find((ctag) => ctag == getFilterValue(item))) {
            middleArr.push({ label: item, value: getFilterValue(item) });
          }
          if (index == basicSettingFilter.length - 1) {
            setSettingFilter(middleArr);
          }
        });
      }
    }
  }, [cTags, basicSettingFilter]);

  useEffect(() => {
    if (tag) {
      setCheckingStatus(true);
      setChecking(!checking);
      let defaultProductType = checkedProductType.length
        ? (
            checkedProductType.map(
              (item, index) =>
                item &&
                (index == 0
                  ? " AND (product_type:" + item
                  : " OR product_type:" + item)
            ) + ")"
          ).replaceAll(",", "")
        : "";
      let defaultTags = "";
      if (tag.length > 0)
        if (tag[tag.length - 1] == "jewelry") {
          defaultTags = (
            tag.map((item, index) =>
              index + 1 < tag.length
                ? (index == 0 ? " AND (tag:" + item : " OR tag:" + item) + ")"
                : ""
            ) + " AND tag:jewelry"
          ).replaceAll(",", "");
        } else {
          defaultTags = (
            tag.map((item, index) =>
              index == 0 ? " AND (tag:" + item : " OR tag:" + item
            ) + ")"
          ).replaceAll(",", "");
        }

      if (checked0.length || mounted) {
        setLoad(true);
        check0 = checked0;
        check1 = checked1;
        check2 = checked2;
        check3 = checked3;
        check4 = checked4;
        check5 = checked5;
        check6 = checked6;
        check7 = checked7;
        check8 = checked8;
        check9 = checked9;
        check10 = checked10;
        check11 = checked11;

        let query0 =
          checked0.length > 0
            ? (
                checked0.map((filter, index) =>
                  index == 0 ? " AND (tag:" + filter : " OR tag:" + filter
                ) + ")"
              ).replaceAll(",", "")
            : "";
        let query1 =
          checked1.length > 0
            ? (
                checked1.map((filter, index) =>
                  index == 0 ? " AND (tag:" + filter : " OR tag:" + filter
                ) + ")"
              ).replaceAll(",", "")
            : "";
        let query2 =
          checked2.length > 0
            ? (
                checked2.map((filter, index) =>
                  index == 0 ? " AND (tag:" + filter : " OR tag:" + filter
                ) + ")"
              ).replaceAll(",", "")
            : "";
        let query3 =
          checked3.length > 0
            ? (
                checked3.map((filter, index) =>
                  index == 0 ? " AND (tag:" + filter : " OR tag:" + filter
                ) + ")"
              ).replaceAll(",", "")
            : "";
        let query4 =
          checked4.length > 0
            ? (
                checked4.map((filter, index) =>
                  index == 0 ? " AND (tag:" + filter : " OR tag:" + filter
                ) + ")"
              ).replaceAll(",", "")
            : "";
        let query5 =
          checked5.length > 0
            ? (
                checked5.map((filter, index) =>
                  index == 0 ? " AND (tag:" + filter : " OR tag:" + filter
                ) + ")"
              ).replaceAll(",", "")
            : "";
        let query6 =
          checked6.length > 0
            ? (
                checked6.map((filter, index) =>
                  index == 0 ? " AND (tag:" + filter : " OR tag:" + filter
                ) + ")"
              ).replaceAll(",", "")
            : "";
        let query7 =
          checked7.length > 0
            ? (
                checked7.map((filter, index) =>
                  index == 0 ? " AND (tag:" + filter : " OR tag:" + filter
                ) + ")"
              ).replaceAll(",", "")
            : "";
        let query8 =
          checked8.length > 0
            ? (
                checked8.map((filter, index) =>
                  index == 0 ? " AND (tag:" + filter : " OR tag:" + filter
                ) + ")"
              ).replaceAll(",", "")
            : "";
        let query9 =
          checked9.length > 0
            ? (
                checked9.map((filter, index) =>
                  index == 0 ? " AND (tag:" + filter : " OR tag:" + filter
                ) + ")"
              ).replaceAll(",", "")
            : "";
        let query10 =
          checked10.length > 0
            ? (
                checked10.map((filter, index) =>
                  index == 0 ? " AND (tag:" + filter : " OR tag:" + filter
                ) + ")"
              ).replaceAll(",", "")
            : "";
        let query11 =
          checked11.length > 0
            ? (
                checked11.map((filter, index) =>
                  index == 0 ? " AND (tag:" + filter : " OR tag:" + filter
                ) + ")"
              ).replaceAll(",", "")
            : "";

        {
          /* if(router.asPath == "/shop") {
              if(!defaultProductType && !query0 &&!query1 && !query2 &&!query3 &&!query4 &&!query5 &&!query6 &&!query7 &&!query8 &&!query9 &&!query10&&!query11) {
                defaultTags = (
              tag.map((item, index) =>
                index == 0 ? " AND (tag:" + item : " OR tag:" + item
              ) + ")"
             ).replaceAll(",", "");
            } else {
              defaultTags = ''
            }
            }
          */
        }
        let data = new FormData();

        setLoad(true);
        data.append("position", "first:20");
        if (tag.length && router.asPath != "/shop") {
          if (productType) {
            if (productType == "watches") {
              data.append(
                "query",
                "(status:active AND tag:active) AND " +
                  (productType == "pendants"
                    ? "(product_type:" +
                      productType +
                      " OR product_type:necklaces)"
                    : "product_type:" + productType) +
                  defaultProductType +
                  defaultTags +
                  query0 +
                  query1 +
                  query2 +
                  query3 +
                  query4 +
                  query5 +
                  query6 +
                  query7 +
                  query8 +
                  query9 +
                  query10 +
                  query11
              );
            } else {
              data.append(
                "query",
                "tag:active AND " +
                  (productType == "pendants"
                    ? "(product_type:" +
                      productType +
                      " OR product_type:necklaces)"
                    : "product_type:" + productType) +
                  defaultProductType +
                  defaultTags +
                  query0 +
                  query1 +
                  query2 +
                  query3 +
                  query4 +
                  query5 +
                  query6 +
                  query7 +
                  query8 +
                  query9 +
                  query10 +
                  query11
              );
            }
          } else {
            data.append(
              "query",
              "tag:active" +
                defaultProductType +
                defaultTags +
                query0 +
                query1 +
                query2 +
                query3 +
                query4 +
                query5 +
                query6 +
                query7 +
                query8 +
                query9 +
                query10 +
                query11
            );
          }
        } else {
          if (productType) {
            if (productType == "watches") {
              data.append(
                "query",
                "(status:active AND tag:active) AND " +
                  (productType == "pendants"
                    ? "(product_type:" +
                      productType +
                      " OR product_type:necklaces)"
                    : "product_type:" + productType) +
                  defaultProductType +
                  defaultTags +
                  query0 +
                  query1 +
                  query2 +
                  query3 +
                  query4 +
                  query5 +
                  query6 +
                  query7 +
                  query8 +
                  query9 +
                  query10 +
                  query11
              );
            } else {
              data.append(
                "query",
                "tag:active AND " +
                  (productType == "pendants"
                    ? "(product_type:" +
                      productType +
                      " OR product_type:necklaces)"
                    : "product_type:" + productType) +
                  defaultProductType +
                  defaultTags +
                  query0 +
                  query1 +
                  query2 +
                  query3 +
                  query4 +
                  query5 +
                  query6 +
                  query7 +
                  query8 +
                  query9 +
                  query10 +
                  query11
              );
            }
          } else {
            data.append(
              "query",
              "tag:active" +
                query0 +
                defaultProductType +
                defaultTags +
                query1 +
                query2 +
                query3 +
                query4 +
                query5 +
                query6 +
                query7 +
                query8 +
                query9 +
                query10 +
                query11
            );
          }
        }
        setFormData(data);
      } else {
        // if (productStore.length) {
        //   // setProductData(productStore);
        //   // setLastProduct(lastProductStatus);
        //   if (localStorage.wishList) {
        //     props.setWishList(JSON.parse(localStorage.wishList));
        //   }
        // } else {
        setLoad(true);
        let data = new FormData();
        data.append("position", "first:20");
        if (tag.length) {
          if (productType) {
            if (productType == "watches") {
              data.append(
                "query",
                "(status:active AND tag:active) AND " +
                  (productType == "pendants"
                    ? "(product_type:" +
                      productType +
                      " OR product_type:necklaces)"
                    : "product_type:" + productType) +
                  defaultTags +
                  defaultProductType
              );
            } else {
              data.append(
                "query",
                "tag:active AND " +
                  (productType == "pendants"
                    ? "(product_type:" +
                      productType +
                      " OR product_type:necklaces)"
                    : "product_type:" + productType) +
                  defaultTags +
                  defaultProductType
              );
            }
          } else {
            data.append(
              "query",
              "tag:active" + defaultTags + defaultProductType
            );
          }
        } else {
          if (productType) {
            if (productType == "watches") {
              data.append(
                "query",
                "(status:active AND tag:active) AND " +
                  (productType == "pendants"
                    ? "(product_type:" +
                      productType +
                      " OR product_type:necklaces)"
                    : "product_type:" + productType) +
                  defaultProductType +
                  defaultTags
              );
            } else {
              data.append(
                "query",
                "tag:active AND " +
                  (productType == "pendants"
                    ? "(product_type:" +
                      productType +
                      " OR product_type:necklaces)"
                    : "product_type:" + productType) +
                  defaultProductType +
                  defaultTags
              );
            }
          } else {
            data.append(
              "query",
              "tag:active" + defaultProductType + defaultTags
            );
          }
        }
        setFormData(data);
        // }
      }
      setMounted(true);
    }
  }, [
    checked0,
    checked1,
    checked2,
    checked3,
    checked4,
    checked5,
    checked6,
    checked7,
    checked8,
    checked9,
    checked10,
    checked11,
    checkedProductType,
    tag,
  ]);

  const setFavor = (event, product) => {
    var obj = $(event.target);
    var ind = obj.closest("[position]").attr("position") - 1;
    var item = productsShowed[ind];
    dataLayer.push({ ecommerce: null });

    /*var dll = {
        "event": "addToWishlist",
        "ecommerce": {
          "value": item.variants[0].node.price,
          "currencyCode": "EUR",
          "detail": {
            "products": [{
               "id": item.variants[0].node.sku,
               "name": item.title,
               "price": item.variants[0].node.price,
               "brand": item.vendor,
               "category": item.product_type,
               "position": ind + 1,
           }]
          }
        }
      }

      dataLayer.push(dll);*/

    let target = event.target.closest(".favor-icon");
    if (target.classList.contains("favor")) {
      target.classList.remove("favor");
      let localProducts = props.wishList;
      let removeProduct = localProducts.find(
        (item) => item.shopifyid == product.shopifyid
      );
      if (removeProduct) {
        localProducts.splice(localProducts.indexOf(removeProduct), 1);
        props.setWishList(localProducts);
      }
    } else {
      target.classList.add("favor");
      let formData = new FormData();
      formData.append("shopifyid", product.shopifyid);
      fetch(getProductURL, {
        method: "post",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (localStorage.wishList) {
            props.setWishList([
              ...props.wishList,
              {
                ...product,
                amount: 1,
                product_type: productType,
                description: data.body_html,
              },
            ]);
          } else {
            localStorage.setItem(
              "wishList",
              JSON.stringify([
                {
                  ...product,
                  amount: 1,
                  product_type: productType,
                  description: data.body_html,
                },
              ])
            );
            props.setWishList([
              {
                ...product,
                amount: 1,
                product_type: productType,
                description: data.body_html,
              },
            ]);
          }
        });
    }
  };

  const filterHandle = (event, index) => {
    let target = event.target.closest(".filter-item");
    if (target.classList.contains("active")) {
      let removeItem = selectFilter.indexOf(filterItems[index].text);
      if (!removeItem) {
        selectFilter.splice(removeItem, 1);
        setSelectFilter([...selectFilter]);
      } else {
        selectFilter.splice(-1, 1);
      }
      target.classList.remove("active");
    } else {
      target.classList.add("active");
      setSelectFilter([...selectFilter, filterItems[index].text]);
    }
  };

  const loadMore = (isFirstPage = false) => {
    setLoadMoreStatus(true);

    setCurrentPage(currentPage + 1);
    let formData = new FormData();
    let defaultProductType =
      checkedProductType.length > 0
        ? (
            checkedProductType.map(
              (item, index) =>
                item &&
                (index == 0
                  ? " AND (product_type:" + item
                  : " OR product_type:" + item)
            ) + ")"
          ).replaceAll(",", "")
        : "";
    let defaultTags = (
      tag[tag.length - 1] == "jewelry"
        ? tag.map((item, index) =>
            index + 1 < tag.length
              ? index == 0
                ? " AND (tag:" + item
                : " OR tag:" + item
              : ""
          ) +
          ")" +
          " AND tag:jewelry"
        : tag.map((item, index) =>
            index == 0 ? " AND (tag:" + item : " OR tag:" + item
          ) + ")"
    ).replaceAll(",", "");
    let query0 =
      checked0.length > 0
        ? (
            checked0.map((filter, index) =>
              index == 0 ? " AND (tag:" + filter : " OR tag:" + filter
            ) + ")"
          ).replaceAll(",", "")
        : "";
    let query1 =
      checked1.length > 0
        ? (
            checked1.map((filter, index) =>
              index == 0 ? " AND (tag:" + filter : " OR tag:" + filter
            ) + ")"
          ).replaceAll(",", "")
        : "";
    let query2 =
      checked2.length > 0
        ? (
            checked2.map((filter, index) =>
              index == 0 ? " AND (tag:" + filter : " OR tag:" + filter
            ) + ")"
          ).replaceAll(",", "")
        : "";
    let query3 =
      checked3.length > 0
        ? (
            checked3.map((filter, index) =>
              index == 0 ? " AND (tag:" + filter : " OR tag:" + filter
            ) + ")"
          ).replaceAll(",", "")
        : "";
    let query4 =
      checked4.length > 0
        ? (
            checked4.map((filter, index) =>
              index == 0 ? " AND (tag:" + filter : " OR tag:" + filter
            ) + ")"
          ).replaceAll(",", "")
        : "";
    let query5 =
      checked5.length > 0
        ? (
            checked5.map((filter, index) =>
              index == 0 ? " AND (tag:" + filter : " OR tag:" + filter
            ) + ")"
          ).replaceAll(",", "")
        : "";
    let query6 =
      checked6.length > 0
        ? (
            checked6.map((filter, index) =>
              index == 0 ? " AND (tag:" + filter : " OR tag:" + filter
            ) + ")"
          ).replaceAll(",", "")
        : "";
    let query7 =
      checked7.length > 0
        ? (
            checked7.map((filter, index) =>
              index == 0 ? " AND (tag:" + filter : " OR tag:" + filter
            ) + ")"
          ).replaceAll(",", "")
        : "";
    let query8 =
      checked8.length > 0
        ? (
            checked8.map((filter, index) =>
              index == 0 ? " AND (tag:" + filter : " OR tag:" + filter
            ) + ")"
          ).replaceAll(",", "")
        : "";
    let query9 =
      checked9.length > 0
        ? (
            checked9.map((filter, index) =>
              index == 0 ? " AND (tag:" + filter : " OR tag:" + filter
            ) + ")"
          ).replaceAll(",", "")
        : "";
    let query10 =
      checked10.length > 0
        ? (
            checked10.map((filter, index) =>
              index == 0 ? " AND (tag:" + filter : " OR tag:" + filter
            ) + ")"
          ).replaceAll(",", "")
        : "";
    let query11 =
      checked11.length > 0
        ? (
            checked11.map((filter, index) =>
              index == 0 ? " AND (tag:" + filter : " OR tag:" + filter
            ) + ")"
          ).replaceAll(",", "")
        : "";

    {
      /* if(router.asPath == "/shop") {
      if(!defaultProductType && !query0 &&!query1 && !query2 &&!query3 &&!query4 &&!query5 &&!query6 &&!query7 &&!query8 &&!query9 &&!query10 &&!query11) {
        defaultTags = (
      tag.map((item, index) =>
        index == 0 ? " AND (tag:" + item : " OR tag:" + item
      ) + ")"
    ).replaceAll(",", "");
      } else {
        defaultTags = ''
      }
    } */
    }
    if (typeof isFirstPage === 'object') {
      formData.append("position", `first:20, after:"${lastProduct}"`);
    } else {
      formData.append("position", `first:20`);
    }

    formData.append("sort", sortRuleUpdated);
    if (tag.length) {
      if (productType) {
        if (productType == "watches") {
          formData.append(
            "query",
            "(status:active AND tag:active) AND " +
              (productType == "pendants"
                ? "(product_type:" + productType + " OR product_type:necklaces)"
                : "product_type:" + productType) +
              defaultTags +
              defaultProductType +
              query0 +
              query1 +
              query2 +
              query3 +
              query4 +
              query5 +
              query6 +
              query7 +
              query8 +
              query9 +
              query10 +
              query11
          );
        } else {
          formData.append(
            "query",
            "tag:active AND " +
              (productType == "pendants"
                ? "(product_type:" + productType + " OR product_type:necklaces)"
                : "product_type:" + productType) +
              defaultTags +
              defaultProductType +
              query0 +
              query1 +
              query2 +
              query3 +
              query4 +
              query5 +
              query6 +
              query7 +
              query8 +
              query9 +
              query10 +
              query11
          );
        }
      } else {
        formData.append(
          "query",
          "tag:active" +
            defaultTags +
            defaultProductType +
            query0 +
            query1 +
            query2 +
            query3 +
            query4 +
            query5 +
            query6 +
            query7 +
            query8 +
            query9 +
            query10 +
            query11
        );
      }
    } else {
      if (productType) {
        if (productType == "watches") {
          formData.append(
            "query",
            "(status:active AND tag:active) AND " +
              (productType == "pendants"
                ? "(product_type:" + productType + " OR product_type:necklaces)"
                : "product_type:" + productType) +
              defaultProductType +
              query0 +
              query1 +
              query2 +
              query3 +
              query4 +
              query5 +
              query6 +
              query7 +
              query8 +
              query9 +
              query10 +
              query11
          );
        } else {
          formData.append(
            "query",
            "tag:active AND " +
              (productType == "pendants"
                ? "(product_type:" + productType + " OR product_type:necklaces)"
                : "product_type:" + productType) +
              defaultProductType +
              query0 +
              query1 +
              query2 +
              query3 +
              query4 +
              query5 +
              query6 +
              query7 +
              query8 +
              query9 +
              query10 +
              query11
          );
        }
      } else {
        formData.append(
          "query",
          "tag:active" +
            defaultProductType +
            query0 +
            query1 +
            query2 +
            query3 +
            query4 +
            query5 +
            query6 +
            query7 +
            query8 +
            query9 +
            query10 +
            query11
        );
      }
    }
    var ll = unescape(window.location.href.substring(window.location.href.indexOf("?") + 1).split("=")[1]);
        delete formData.query;
        formData.append("query", ll);
        formData.append("page", 1)
    fetch("https://royalcoster.com:81/royalcoster/search.php",{
      method: "post",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        cP += 1;
        ga('gtag_UA_54391819_8.send', {
          hitType: 'event',
          eventCategory: 'Products List',
          eventAction:   ((router.query.productType !== undefined) ? router.query.productType : "All yewelry") + " " + ((router.query.tags !== undefined) ? router.query.tags : "") + "" + "" + " Page:" + (cP),
          eventLabel:   ((router.query.productType !== undefined) ? router.query.productType : "All yewelry") + " " + ((router.query.tags !== undefined) ? router.query.tags : "") + "" + "" + " Page:" + (cP),
        });

        data.hasNextPage == "Yes"
          ? setLastProduct(data.last)
          : setLastProduct(false);
          pushDataLayers(data.data, formData.query, false);
          if (typeof isFirstPage === 'object') {
            setProductData([...productData, ...data.data]);
            $.each(data.data, function() {
                productsShowed.push(this);
            })
          } else {
            setProductData(data.data);
            productsShowed = [];
            $.each(data.data, function() {
                productsShowed.push(this);
            })
          }
          $("body").LoadingOverlay("hide");
          $.each($(".product-item"), function(ind) {
            $(this).attr("position", ind + 1);
            $(this).unbind("click");
            $(this).bind("click", function() {
                  pushClickEvent($(this));
            });
          })
        setLoadMoreStatus(false);
      });
  };

  const handleMenuBtn = (e) => {
    e.target
      .closest(".offcanvas-body")
      .querySelectorAll("button")
      .forEach((element) => {
        if (element.classList.contains("active")) {
          element.classList.remove("active");
        }
      });
    e.target.closest("button").classList.add("active");
  };

  return (


    <div className="ring_page">
      <Head>
        <title>{productType ? productType : "Products"} | Royal Coster</title>
      </Head>
      <Header />
      {/* Start hero section */}

      <div
        className="hero-section"
        style={
          bgImage && {
            backgroundImage: "url(/img/ring/hero_bg/" + bgImage + ".jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }
        }
      >
        <div className="r-container">
          <h1 className="title text-white text-capitalize">
            {productType ? productType : "Search results"}
          </h1>
        </div>
      </div>
      {/* End Hero section */}

      {/* Start product section */}
      <div className="product-section r-container py-4">
        <div className="top-bar row align-items-center m-0 py-3">
          <div className="title-panel col-md-6 col-6 p-0 pb-md-0 pb-3">
            {tag && router.query.productType != "watches" && (
              <h2 className="text-capitalize">
                {productType
                  ? tag.length > 0
                    ? tag[0] + " " + productType
                    : "" + productType
                  : "Search results"}
              </h2>

            )}
            {tag && router.query.productType == "watches" && watchTitle && (
              <h2 className="text-capitalize">
                {productType
                  ? tag.length > 0
                    ? watchTitle + " " + productType
                    : "" + productType
                  : "Search results"}
              </h2>
            )}
            {/*totalCounter > 0 && (<p className="text-uppercase">{totalCounter} results</p>)*/}
          </div>
          <div className="col-md-6 col-12 d-flex justify-content-end flex-sm-row flex-column p-0 pt-3 pt-md-0">

          <div className="search-box round-form d-flex align-items-center py-2" >

            <label htmlFor="selectSearch" className="px-4">
              SORT BY :{" "}
              </label>
              <SelectSearch
                id="selectSearch"
                options={options}
                value={selectValue}
                onChange={(name,value) => {
                  sortRuleUpdated = "sortKey:" + value.value.split(" ")[0] + ",reverse:" + value.reverse.toString();
                  loadMore(true);
                }}
                filterOptions={fuzzySearch}
                emptyMessage="Not found"
                search
              />
            </div>
          </div>
        </div>
        {/* <div className="top-filter-bar d-sm-flex d-none justify-content-between align-items-center flex-wrap py-4">
          {filte  rItems.map((item, index) => {
            return (
              <button
                className="btn filter-item round-form mt-3"
                key={index}
                onClick={(event) => filterHandle(event, index)}
              >
                <div className="image-panel text-center">
                  <img src={"/img/ring/" + item.img} alt="filter-image" />
                </div>
                <h3 className="blue-text text-uppercase">{item.text}</h3>
              </button>
            );
          })}
        </div> */}
        <div className="main-panel d-flex justify-content-end m-0 py-5 flex-wrap">
          {cTags && cTags.length > 0 && (
            <div className="col-lg-3 col-md-3 col-sm-5 col-12 d-sm-block d-none p-0 pe-sm-4 pe-0 mb-sm-0 mb-5 left-filter-bar">
              {productTypeFilter && productTypeFilter.length > 0 && router.query.productType != "watches" &&  (
                <div className="accordion-item mb-3">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button blue-text collapsed text-uppercase py-3 ps-4"
                      data-bs-target="#productType"
                      data-bs-toggle="collapse"
                    >
                      Product Type
                    </button>
                  </h2>
                  <div id="productType" className="accordion-collapse collapse">
                    <div className="accordion-body">
                      <CheckboxTree
                        nodes={productTypeFilter}
                        checked={checkedProductType}
                        expanded={expanded}
                        onCheck={(checkValue) =>
                          setCheckedProductType(checkValue)
                        }
                        onExpand={(expandValue) => setExpanded(expandValue)}
                        icons={checkTreeIcons}
                      />
                    </div>
                  </div>
                </div>
              )}
              {(false) && (
                <div className="accordion-item mb-3">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button blue-text collapsed text-uppercase py-3 ps-4"
                      data-bs-target="#collectionTree"
                      data-bs-toggle="collapse"
                    >
                      collection
                    </button>
                  </h2>
                  <div
                    id="collectionTree"
                    className="accordion-collapse collapse"
                  >
                    <div className="accordion-body">
                      <CheckboxTree
                        nodes={collectionFilter}
                        checked={checked1}
                        expanded={expanded}
                        onCheck={(checkValue) => setChecked1(checkValue)}
                        onExpand={(expandValue) => setExpanded(expandValue)}
                        icons={checkTreeIcons}
                      />
                    </div>
                  </div>
                </div>
              )}
              {stoneFilter && stoneFilter.length > 0 && router.query.productType != "watches" &&  (
                <div className="accordion-item mb-3">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button blue-text collapsed text-uppercase py-3 ps-4"
                      data-bs-target="#stoneTree"
                      data-bs-toggle="collapse"
                    >
                      stone
                    </button>
                  </h2>
                  <div id="stoneTree" className="accordion-collapse collapse">
                    <div className="accordion-body">
                      <CheckboxTree
                        nodes={stoneFilter}
                        checked={checked5}
                        expanded={expanded}
                        onCheck={(checkValue) => setChecked5(checkValue)}
                        onExpand={(expandValue) => setExpanded(expandValue)}
                        icons={checkTreeIcons}
                      />
                    </div>
                  </div>
                </div>
              )}
              {caratFilter && caratFilter.length > 0 && router.query.productType != "watches" &&  (
                <div className="accordion-item mb-3">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button blue-text collapsed text-uppercase py-3 ps-4"
                      data-bs-target="#caratTree"
                      data-bs-toggle="collapse"
                    >
                      carat
                    </button>
                  </h2>
                  <div id="caratTree" className="accordion-collapse collapse">
                    <div className="accordion-body">
                      <CheckboxTree
                        nodes={caratFilter}
                        checked={checked1}
                        expanded={expanded}
                        onCheck={(checkValue) => setChecked1(checkValue)}
                        onExpand={(expandValue) => setExpanded(expandValue)}
                        icons={checkTreeIcons}
                      />
                    </div>
                  </div>
                </div>
              )}
              {materialColorFilter && materialColorFilter.length > 0 && router.query.productType != "watches" &&  (
                <div className="accordion-item mb-3">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button blue-text collapsed text-uppercase py-3 ps-4"
                      data-bs-target="#materialColorTree"
                      data-bs-toggle="collapse"
                    >
                      color
                    </button>
                  </h2>
                  <div
                    id="materialColorTree"
                    className="accordion-collapse collapse"
                  >
                    <div className="accordion-body">
                      <CheckboxTree
                        nodes={materialColorFilter}
                        checked={checked9}
                        expanded={expanded}
                        onCheck={(checkValue) => setChecked9(checkValue)}
                        onExpand={(expandValue) => setExpanded(expandValue)}
                        icons={checkTreeIcons}
                      />
                    </div>
                  </div>
                </div>
              )}
              {brightnessFilter && brightnessFilter.length > 0 && router.query.productType != "watches" &&  (
                <div className="accordion-item mb-3">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button blue-text collapsed text-uppercase py-3 ps-4"
                      data-bs-target="#brightnessTree"
                      data-bs-toggle="collapse"
                    >
                      clarity
                    </button>
                  </h2>
                  <div
                    id="brightnessTree"
                    className="accordion-collapse collapse"
                  >
                    <div className="accordion-body">
                      <CheckboxTree
                        nodes={brightnessFilter}
                        checked={checked6}
                        expanded={expanded}
                        onCheck={(checkValue) => setChecked6(checkValue)}
                        onExpand={(expandValue) => setExpanded(expandValue)}
                        icons={checkTreeIcons}
                      />
                    </div>
                  </div>
                </div>
              )}
              {cutFilter && cutFilter.length > 0 && router.query.productType != "watches" &&  (
                <div className="accordion-item mb-3">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button blue-text collapsed text-uppercase py-3 ps-4"
                      data-bs-target="#cutTree"
                      data-bs-toggle="collapse"
                    >
                      cut
                    </button>
                  </h2>
                  <div id="cutTree" className="accordion-collapse collapse">
                    <div className="accordion-body">
                      <CheckboxTree
                        nodes={cutFilter}
                        checked={checked7}
                        expanded={expanded}
                        onCheck={(checkValue) => setChecked7(checkValue)}
                        onExpand={(expandValue) => setExpanded(expandValue)}
                        icons={checkTreeIcons}
                      />
                    </div>
                  </div>
                </div>
              )}
              {metarialFilter && metarialFilter.length > 0 && router.query.productType != "watches" &&  (
                <div className="accordion-item mb-3">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button blue-text collapsed text-uppercase py-3 ps-4"
                      data-bs-target="#metarialTree"
                      data-bs-toggle="collapse"
                    >
                      material
                    </button>
                  </h2>
                  <div
                    id="metarialTree"
                    className="accordion-collapse collapse"
                  >
                    <div className="accordion-body">
                      <CheckboxTree
                        nodes={metarialFilter}
                        checked={checked8}
                        expanded={expanded}
                        onCheck={(checkValue) => setChecked8(checkValue)}
                        onExpand={(expandValue) => setExpanded(expandValue)}
                        icons={checkTreeIcons}
                      />
                    </div>
                  </div>
                </div>
              )}
              {priceFilter && priceFilter.length > 0 && router.query.productType != "watches" &&  (
                <div className="accordion-item mb-3">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button blue-text collapsed text-uppercase py-3 ps-4"
                      data-bs-target="#priceTree"
                      data-bs-toggle="collapse"
                    >
                      price
                    </button>
                  </h2>
                  <div id="priceTree" className="accordion-collapse collapse">
                    <div className="accordion-body">
                      <CheckboxTree
                        nodes={priceFilter}
                        checked={checked0}
                        expanded={expanded}
                        onCheck={(checkValue) => setChecked0(checkValue)}
                        onExpand={(expandValue) => setExpanded(expandValue)}
                        icons={checkTreeIcons}
                      />
                    </div>
                  </div>
                </div>
              )}
              {styleFilter && styleFilter.length > 0 && router.query.productType != "watches" &&  (
                <div className="accordion-item mb-3">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button blue-text collapsed text-uppercase py-3 ps-4"
                      data-bs-target="#styleTree"
                      data-bs-toggle="collapse"
                    >
                      style
                    </button>
                  </h2>
                  <div id="styleTree" className="accordion-collapse collapse">
                    <div className="accordion-body">
                      <CheckboxTree
                        nodes={styleFilter}
                        checked={checked2}
                        expanded={expanded}
                        onCheck={(checkValue) => setChecked2(checkValue)}
                        onExpand={(expandValue) => setExpanded(expandValue)}
                        icons={checkTreeIcons}
                      />
                    </div>
                  </div>
                </div>
              )}
              {brandFilter && brandFilter.length > 0 && router.query.productType != "watches" &&  (
                <div className="accordion-item mb-3">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button blue-text collapsed text-uppercase py-3 ps-4"
                      data-bs-target="#brandTree"
                      data-bs-toggle="collapse"
                    >
                      brand
                    </button>
                  </h2>
                  <div id="brandTree" className="accordion-collapse collapse">
                    <div className="accordion-body">
                      <CheckboxTree
                        nodes={brandFilter}
                        checked={checked4}
                        expanded={expanded}
                        onCheck={(checkValue) => setChecked4(checkValue)}
                        onExpand={(expandValue) => setExpanded(expandValue)}
                        icons={checkTreeIcons}
                      />
                    </div>
                  </div>
                </div>
              )}
              {settingFilter && settingFilter.length > 0 && router.query.productType != "watches" &&  (
                <div className="accordion-item mb-3">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button blue-text collapsed text-uppercase py-3 ps-4"
                      data-bs-target="#settingTree"
                      data-bs-toggle="collapse"
                    >
                      setting
                    </button>
                  </h2>
                  <div id="settingTree" className="accordion-collapse collapse">
                    <div className="accordion-body">
                      <CheckboxTree
                        nodes={settingFilter}
                        checked={checked11}
                        expanded={expanded}
                        onCheck={(checkValue) => setChecked11(checkValue)}
                        onExpand={(expandValue) => setExpanded(expandValue)}
                        icons={checkTreeIcons}
                      />
                    </div>
                  </div>
                </div>
              )}
              {/* {mountingFilter && (
              <div className="accordion-item mb-3">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button blue-text collapsed text-uppercase py-3 ps-4"
                    data-bs-target="#mountingTree"
                    data-bs-toggle="collapse"
                  >
                    mounting
                  </button>
                </h2>
                <div id="mountingTree" className="accordion-collapse collapse">
                  <div className="accordion-body">
                    <CheckboxTree
                      nodes={mountingFilter}
                      checked={checked3}
                      expanded={expanded}
                      onCheck={(checkValue) => setChecked3(checkValue)}
                      onExpand={(expandValue) => setExpanded(expandValue)}
                      icons={checkTreeIcons}
                    />
                  </div>
                </div>
              </div>
            )} */}
            </div>
          )}
          {/* {false ? ( */}
          {productData && productData.length > 0 ? (
            <div className="col-lg-12 col-md-12 col-sm-12 col-12 p-0 product-panel m-0">
              <div className="row m-0">
                {productData.map((item, index) => {
                  return (
                    <div
                      className="product-item col-lg-3 col-md-6 col-6 col-sm-6 mb-4"
                      key={index}
                    >
                      <Link
                        passHref={true}
                        href={{
                          pathname:  "/shop/products/all/[slug]",
                          query: {
                            slug:
                              item.handle + "-" + item.id,
                          },
                        }}
                      >
                        <a style={{
                          color: "inherit",
                          textDecoration: "none"
                        }}>
                        {!isMobile && (
                          <div style={{
                             backgroundImage: "url(" + item.featured_image.url + ")",
                             backgroundRepeat: "no-repeat",
                             backgroundPosition: "center center",
                             backgroundSize: "contain"
                           }} className="product-image hover-scale d-flex justify-content-center align-items-center round">
                          </div>
                        )}
                        {isMobile && (
                          <div style={{
                            height: 150,
                             backgroundImage: "url(" + item.featured_image.url + ")",
                             backgroundRepeat: "no-repeat",
                             backgroundPosition: "center center",
                             backgroundSize: "contain"
                           }} className="product-image hover-scale d-flex justify-content-center align-items-center round">
                          </div>
                        )}
                          {isMobile && (
                              <h3 className="text-uppercase blue-text my-4 m-0" style={{fontSize: 14,wordBreak: "normal",marginTop:-20}}>
                                {item.title.replace("<BR>", "\r\n")}
                              </h3>
                          )}
                          {!isMobile && (
                              <h3 className="text-uppercase blue-text my-4 m-0" style={{wordBreak: "normal"}}>
                                  {item.title.replace("<BR>", "\r\n")}
                              </h3>
                          )}

                          {-5 > item.price ? (
                            <div className="d-flex price-panel">
                              <table style={{width:'100%'}}><tr><td>
                              <h4 className="full-price text-decoration-line-through"  style={ isMobile ? {  } : {}}>
                                <NumberFormat
                                  value={item.Fullprice}
                                  displayType="text"
                                  decimalScale={2}
                                  fixedDecimalScale={true}
                                  thousandSeparator={true}
                                  prefix="€ "
                                />
                              </h4></td></tr><tr><td>
                              <h4 className="price blue-text mb-0"  style={ isMobile ? {  } : {}}>
                                <NumberFormat
                                    value={(item.variants.length > 0) ? item.variants[0].price : item.price}
                                  displayType="text"
                                  decimalScale={2}
                                  fixedDecimalScale={true}
                                  thousandSeparator={true}
                                  prefix="€ "
                                />
                              </h4>
                              </td></tr></table>
                            </div>
                          ) : (

                                <div className="price-panel">
                                  <h4 className="price blue-text mb-0"  style={ isMobile ? {  } : {}}>
                                    <NumberFormat
                                      value={(item.variants.length > 0) ? item.variants[0].price : item.price}
                                      displayType="text"
                                      decimalScale={2}
                                      fixedDecimalScale={true}
                                      thousandSeparator={true}
                                      prefix="€ "
                                    />
                                  </h4>
                                </div>
                          )}
                        </a>
                      </Link>
                      {accessToken && (
                        <button
                          className={
                            "btn favor-icon " +
                            `${
                              props.wishList &&
                              props.wishList.find(
                                (product) => product.shopifyid == item.shopifyid
                              )
                                ? "favor"
                                : ""
                            }`
                          }
                          onClick={(e) => setFavor(e, item)}
                        >
                          <RiHeartLine className="unfavor" />
                          <RiHeartFill className="favor" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
              {loadMoreStatus && (
                <div className="mt-4 row m-0">
                  <div className="col-lg-4 col-md-6 col-12">
                    <Skeleton
                      animation="wave"
                      variant="rect"
                      width="100%"
                      height={300}
                    />
                    <Skeleton
                      animation="wave"
                      variant="text"
                      width={100}
                      height={20}
                    />
                    <Skeleton
                      animation="wave"
                      variant="text"
                      width="100%"
                      height={40}
                    />
                  </div>
                  <div className="col-lg-4 col-md-6 col-12">
                    <Skeleton
                      animation="wave"
                      variant="rect"
                      width="100%"
                      height={300}
                    />
                    <Skeleton
                      animation="wave"
                      variant="text"
                      width={100}
                      height={20}
                    />
                    <Skeleton
                      animation="wave"
                      variant="text"
                      width="100%"
                      height={40}
                    />
                  </div>
                  <div className="col-lg-4 col-md-6 col-12 d-lg-block d-none">
                    <Skeleton
                      animation="wave"
                      variant="rect"
                      width="100%"
                      height={300}
                    />
                    <Skeleton
                      animation="wave"
                      variant="text"
                      width={100}
                      height={20}
                    />
                    <Skeleton
                      animation="wave"
                      variant="text"
                      width="100%"
                      height={40}
                    />
                  </div>
                </div>
              )}
              {lastProduct && (
                <button
                  className="btn load-more-btn text-uppercase py-3 px-5 mt-3 round-form"
                  onClick={loadMore}
                >
                  Load More
                </button>
              )}
            </div>
          ) : !load ? (
            <h3 className="none-text text-center flex-fill p-0">No product</h3>
          ) : (
            <div className="col-lg-9 col-md-8 col-sm-7 col-12 p-0 row m-0">
              <div className="col-lg-4 col-md-6 col-12">
                <Skeleton
                  animation="wave"
                  variant="rect"
                  width="100%"
                  height={300}
                />
                <Skeleton
                  animation="wave"
                  variant="text"
                  width={100}
                  height={20}
                />
                <Skeleton
                  animation="wave"
                  variant="text"
                  width="100%"
                  height={40}
                />
              </div>
              <div className="col-lg-4 col-md-6 col-12">
                <Skeleton
                  animation="wave"
                  variant="rect"
                  width="100%"
                  height={300}
                />
                <Skeleton
                  animation="wave"
                  variant="text"
                  width={100}
                  height={20}
                />
                <Skeleton
                  animation="wave"
                  variant="text"
                  width="100%"
                  height={40}
                />
              </div>
              <div className="col-lg-4 col-md-6 col-12 d-lg-block d-none">
                <Skeleton
                  animation="wave"
                  variant="rect"
                  width="100%"
                  height={300}
                />
                <Skeleton
                  animation="wave"
                  variant="text"
                  width={100}
                  height={20}
                />
                <Skeleton
                  animation="wave"
                  variant="text"
                  width="100%"
                  height={40}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      {/* End product section */}
      {/* Start Collection section */}
      <div className="collection-section">
        <Collection />
        <div className="shadow-pink" />
        <div className="shadow-blue" />
      </div>
      {/* End Collection section */}
      {/* Start Schedule section */}
      <Schedule />
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="filterMenu"
        aria-labelledby="filterMenuLabel"
      >
        {router.query.productType != 'watches' && (false) && (
        <div className="offcanvas-header py-4 p-0">
          <div className="r-container d-flex justify-content-between align-items-center">
            <h3 id="filterMenuLabel" className="text-uppercase mb-0 py-2">
              Filter
            </h3>
            <button
              type="button"
              className="btn btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
        </div>
      )}
        <div className="offcanvas-body r-container pt-2 p-0">
          <div className="r-container row pt-4">
            {productTypeFilter && productTypeFilter.length > 0 && (
              <div className="accordion-item mb-3">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button blue-text collapsed text-uppercase py-3 ps-4"
                    data-bs-target="#productType"
                    data-bs-toggle="collapse"
                  >
                    ProductType
                  </button>
                </h2>
                <div id="productType" className="accordion-collapse collapse">
                  <div className="accordion-body">
                    <CheckboxTree
                      nodes={productTypeFilter}
                      checked={checkedProductType}
                      expanded={expanded}
                      onCheck={(checkValue) =>
                        setCheckedProductType(checkValue)
                      }
                      onExpand={(expandValue) => setExpanded(expandValue)}
                      icons={checkTreeIcons}
                    />
                  </div>
                </div>
              </div>
            )}
            {collectionFilter && collectionFilter.length > 0 && (
              <div className="accordion-item mb-3">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button blue-text collapsed text-uppercase py-3 ps-4"
                    data-bs-target="#collectionTree"
                    data-bs-toggle="collapse"
                  >
                    collection
                  </button>
                </h2>
                <div
                  id="collectionTree"
                  className="accordion-collapse collapse"
                >
                  <div className="accordion-body">
                    <CheckboxTree
                      nodes={collectionFilter}
                      checked={checked1}
                      expanded={expanded}
                      onCheck={(checkValue) => setChecked1(checkValue)}
                      onExpand={(expandValue) => setExpanded(expandValue)}
                      icons={checkTreeIcons}
                    />
                  </div>
                </div>
              </div>
            )}
            {stoneFilter && stoneFilter.length > 0 && (
              <div className="accordion-item mb-3">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button blue-text collapsed text-uppercase py-3 ps-4"
                    data-bs-target="#stoneTree"
                    data-bs-toggle="collapse"
                  >
                    stone
                  </button>
                </h2>
                <div id="stoneTree" className="accordion-collapse collapse">
                  <div className="accordion-body">
                    <CheckboxTree
                      nodes={stoneFilter}
                      checked={checked5}
                      expanded={expanded}
                      onCheck={(checkValue) => setChecked5(checkValue)}
                      onExpand={(expandValue) => setExpanded(expandValue)}
                      icons={checkTreeIcons}
                    />
                  </div>
                </div>
              </div>
            )}
            {caratFilter && caratFilter.length > 0 && (
              <div className="accordion-item mb-3">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button blue-text collapsed text-uppercase py-3 ps-4"
                    data-bs-target="#caratTree"
                    data-bs-toggle="collapse"
                  >
                    carat
                  </button>
                </h2>
                <div id="caratTree" className="accordion-collapse collapse">
                  <div className="accordion-body">
                    <CheckboxTree
                      nodes={caratFilter}
                      checked={checked1}
                      expanded={expanded}
                      onCheck={(checkValue) => setChecked1(checkValue)}
                      onExpand={(expandValue) => setExpanded(expandValue)}
                      icons={checkTreeIcons}
                    />
                  </div>
                </div>
              </div>
            )}
            {materialColorFilter && materialColorFilter.length > 0 && (
              <div className="accordion-item mb-3">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button blue-text collapsed text-uppercase py-3 ps-4"
                    data-bs-target="#materialColorTree"
                    data-bs-toggle="collapse"
                  >
                    color
                  </button>
                </h2>
                <div
                  id="materialColorTree"
                  className="accordion-collapse collapse"
                >
                  <div className="accordion-body">
                    <CheckboxTree
                      nodes={materialColorFilter}
                      checked={checked9}
                      expanded={expanded}
                      onCheck={(checkValue) => setChecked9(checkValue)}
                      onExpand={(expandValue) => setExpanded(expandValue)}
                      icons={checkTreeIcons}
                    />
                  </div>
                </div>
              </div>
            )}
            {brightnessFilter && brightnessFilter.length > 0 && (
              <div className="accordion-item mb-3">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button blue-text collapsed text-uppercase py-3 ps-4"
                    data-bs-target="#brightnessTree"
                    data-bs-toggle="collapse"
                  >
                    clarity
                  </button>
                </h2>
                <div
                  id="brightnessTree"
                  className="accordion-collapse collapse"
                >
                  <div className="accordion-body">
                    <CheckboxTree
                      nodes={brightnessFilter}
                      checked={checked6}
                      expanded={expanded}
                      onCheck={(checkValue) => setChecked6(checkValue)}
                      onExpand={(expandValue) => setExpanded(expandValue)}
                      icons={checkTreeIcons}
                    />
                  </div>
                </div>
              </div>
            )}
            {cutFilter && cutFilter.length > 0 && (
              <div className="accordion-item mb-3">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button blue-text collapsed text-uppercase py-3 ps-4"
                    data-bs-target="#cutTree"
                    data-bs-toggle="collapse"
                  >
                    cut
                  </button>
                </h2>
                <div id="cutTree" className="accordion-collapse collapse">
                  <div className="accordion-body">
                    <CheckboxTree
                      nodes={cutFilter}
                      checked={checked7}
                      expanded={expanded}
                      onCheck={(checkValue) => setChecked7(checkValue)}
                      onExpand={(expandValue) => setExpanded(expandValue)}
                      icons={checkTreeIcons}
                    />
                  </div>
                </div>
              </div>
            )}
            {metarialFilter && metarialFilter.length > 0 && (
              <div className="accordion-item mb-3">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button blue-text collapsed text-uppercase py-3 ps-4"
                    data-bs-target="#metarialTree"
                    data-bs-toggle="collapse"
                  >
                    material
                  </button>
                </h2>
                <div id="metarialTree" className="accordion-collapse collapse">
                  <div className="accordion-body">
                    <CheckboxTree
                      nodes={metarialFilter}
                      checked={checked8}
                      expanded={expanded}
                      onCheck={(checkValue) => setChecked8(checkValue)}
                      onExpand={(expandValue) => setExpanded(expandValue)}
                      icons={checkTreeIcons}
                    />
                  </div>
                </div>
              </div>
            )}
            {priceFilter && priceFilter.length > 0 && (
              <div className="accordion-item mb-3">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button blue-text collapsed text-uppercase py-3 ps-4"
                    data-bs-target="#priceTree"
                    data-bs-toggle="collapse"
                  >
                    price
                  </button>
                </h2>
                <div id="priceTree" className="accordion-collapse collapse">
                  <div className="accordion-body">
                    <CheckboxTree
                      nodes={priceFilter}
                      checked={checked0}
                      expanded={expanded}
                      onCheck={(checkValue) => setChecked0(checkValue)}
                      onExpand={(expandValue) => setExpanded(expandValue)}
                      icons={checkTreeIcons}
                    />
                  </div>
                </div>
              </div>
            )}
            {styleFilter && styleFilter.length > 0 && (
              <div className="accordion-item mb-3">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button blue-text collapsed text-uppercase py-3 ps-4"
                    data-bs-target="#styleTree"
                    data-bs-toggle="collapse"
                  >
                    style
                  </button>
                </h2>
                <div id="styleTree" className="accordion-collapse collapse">
                  <div className="accordion-body">
                    <CheckboxTree
                      nodes={styleFilter}
                      checked={checked2}
                      expanded={expanded}
                      onCheck={(checkValue) => setChecked2(checkValue)}
                      onExpand={(expandValue) => setExpanded(expandValue)}
                      icons={checkTreeIcons}
                    />
                  </div>
                </div>
              </div>
            )}
            {brandFilter && brandFilter.length > 0 && (
              <div className="accordion-item mb-3">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button blue-text collapsed text-uppercase py-3 ps-4"
                    data-bs-target="#brandTree"
                    data-bs-toggle="collapse"
                  >
                    brand
                  </button>
                </h2>
                <div id="brandTree" className="accordion-collapse collapse">
                  <div className="accordion-body">
                    <CheckboxTree
                      nodes={brandFilter}
                      checked={checked4}
                      expanded={expanded}
                      onCheck={(checkValue) => setChecked4(checkValue)}
                      onExpand={(expandValue) => setExpanded(expandValue)}
                      icons={checkTreeIcons}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* End Schedule section */}
      {/* Start Footer */}
      <Footer />
      {/* End Footer */}
    </div>
  );
}

const mapStateToProps = (state) => ({
  wishList: state.wishList.value,
});

const mapDispatchToProps = {
  setWishList: setWishList,
};

export default connect(mapStateToProps, mapDispatchToProps)(Ring);
