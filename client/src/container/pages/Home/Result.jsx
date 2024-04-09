import React, { useEffect, useState, Fragment, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import classNames from "classnames";

import { Alert, Button, Col, Divider, Image, Input, Layout, Row, Spin, Tag, Typography, Upload } from "antd";
import { CloseCircleTwoTone, FileImageOutlined, FormOutlined } from "@ant-design/icons";
import { WithContext as ReactTags } from 'react-tag-input';

import { getPlan } from "../../../redux/auth/authSlice";
import constants from "../../../config/constants";
import { getStorage } from "../../../helpers";
import { generateImage, getConceptById, getBlendingIdeas } from "../../../services/v1API";
import { useSocket } from "../../../context/socket";

import loadingGif from "../../../assets/images/loading.gif";
import usePrevious from "../../../Hooks/usePrevious";

const { TextArea } = Input;
const { Title, Text } = Typography;

const ordersText = ['1st', '2nd', '3rd'];

const patterns = [
  {
    type: "Aesthetic & Styles",
    values: [
      "Minimalist",
      "Art Deco",
      "Bauhaus",
      "Scandinavian",
      "Mid-Century Modern",
      "Industrial",
      "Victorian",
      "Gothic",
      "Baroque",
      "Rococo",
      "Brutalist",
      "Shabby Chic",
      "Bohemian (Boho)",
      "Rustic",
      "Contemporary",
      "Traditional",
      "Transitional",
      "Eclectic",
      "Coastal (Hamptons)",
      "French Country",
      "Hollywood Regency",
      "Japandi",
      "Craftsman",
      "Art Nouveau",
      "Cubism",
      "Surrealism",
      "Pop Art",
      "Futurism",
      "Deconstructivism",
      "Postmodern",
      "Neo-Classical",
      "Mediterranean",
      "Colonial",
      "Prairie Style",
      "Farmhouse",
      "Tropical",
      "Zen",
      "Hi-Tech",
      "Memphis",
      "Steampunk",
      "Gothic Revival",
      "Renaissance",
      "Expressionism",
      "Minimalist Graphic",
      "Swiss Style (International Typographic Style)",
      "Psychedelic",
      "Grunge",
      "Retro",
      "Vintage",
      "Dadaism",
      "Op Art",
      "Art & Craft (Arts and Crafts)",
      "Geometric",
      "Flat Design",
      "Material Design",
      "Biomimicry",
      "Streamline Moderne",
      "Chinoiserie",
      "Trompe-l'oeil",
      "Kitsch",
      "Wabi-Sabi",
      "Organic Modern",
      "Cyberpunk",
      "Victorian Gothic",
      "Art School",
      "Abstract",
      "High-Tech Architecture",
      "Organic Architecture",
      "Parametric Design",
      "Biophilic Design",
      "De Stijl (Neoplasticism)",
      "Constructivism",
      "Cubo-Futurism",
      "Vorticism",
      "Suprematism",
      "Rayonnism",
      "Purism",
      "Orphism",
      "Luminism"
    ]
  },
  {
    type: "Colors & Color Palettes",
    values: [
      "Seaside Serenity: Sky Blue, Sandy Beige, Ocean Teal, White Foam",
      "Autumn Harvest: Deep Orange, Rusty Red, Golden Yellow, Dark Brown",
      "Urban Sunrise: Lavender, Blush Pink, Warm Grey, Soft Coral",
      "Forest Retreat: Moss Green, Pine Green, Mushroom Grey, Bark Brown",
      "Vintage Charm: Cream, Dusty Rose, Sage Green, Muted Lavender",
      "Tropical Paradise: Bright Turquoise, Mango Orange, Palm Green, Hot Pink",
      "Winter Wonderland: Icy Blue, Frosty Silver, White, Cool Grey",
      "Desert Dusk: Terracotta, Cactus Green, Twilight Purple, Starlight White",
      "Retro Vibes: Mustard Yellow, Avocado Green, Burnt Orange, Walnut Brown",
      "Pastel Dreams: Baby Blue, Soft Peach, Pale Lilac, Mint Green",
      "Fiery Sunset: Vivid Orange, Deep Red, Purple Haze, Dark Blue",
      "Royal Elegance: Royal Purple, Gold, Black, Ivory",
      "Zen Garden: Bamboo Green, Stone Grey, Cherry Blossom Pink, Sky Blue",
      "Ocean Depths: Deep Sea Blue, Marine Green, Coral Reef, Sandy Shore",
      "Sunflower Fields: Sunflower Yellow, Leaf Green, Sky Blue, Earth Brown",
      "City Lights: Neon Pink, Electric Blue, Glowing Green, Night Black",
      "Candy Shop: Bubblegum Pink, Lemon Yellow, Mint Green, Baby Blue",
      "Sunset on Mars: Dusty Red, Orange Sand, Martian Grey, Space Black",
      "Arctic Aurora: Aurora Green, Ice White, Polar Blue, Glacial Silver",
      "Festival of Lights: Bright Red, Shimmering Gold, Royal Blue, Glowing Orange",
      "Blush & Bordeaux: Soft Blush, Rich Bordeaux, Warm Cream, Dark Grey",
      "Sage & Sepia: Earthy Sage, Sepia Brown, Linen White, Deep Forest Green",
      "Cobalt & Citrus: Cobalt Blue, Citrus Orange, Lemon Yellow, Crisp White",
      "Peacock Palette: Peacock Blue, Green Plume, Gold Accents, Deep Purple",
      "Sunset to Dusk: Lavender Grey, Soft Peach, Rosy Pink, Deep Mauve",
      "Modern Rustic: Charcoal Black, Rust Red, Warm Taupe, Whitewash",
      "Gothic Glam: Black Velvet, Dark Cherry, Pewter, Smoky Quartz",
      "Electric Neon: Vibrant Neon Green, Electric Blue, Hot Pink, Bright Yellow",
      "Earth & Sky: Sky Blue, Earth Brown, Cloud White, Sun Yellow",
      "Nordic Nights: Midnight Navy, Silver Frost, Winter White, Pine Green",
      "Mountain Majesty: Summit White, Slate Rock, Mountain Green, Skyline Blue",
      "Oceanic Blues: Deep Ocean Blue, Aquatic Teal, Sandy Beige, Coral Pink",
      "Desert Mirage: Mirage Grey, Cactus Green, Sandstone, Blue Sky",
      "Forest Canopy: Leafy Green, Bark Brown, Sunbeam Yellow, Sky Blue",
      "Volcanic Fire: Lava Red, Ash Grey, Coal Black, Flame Orange",
      "Mediterranean Bliss: Azure Blue, Sun-kissed Orange, Olive Green, White Stone",
      "Saharan Palette: Desert Sand, Oasis Blue, Sunset Orange, Palm Green",
      "Nordic Simplicity: Frost White, Steel Blue, Natural Wood, Soft Grey",
      "Japanese Tranquility: Matcha Green, Sakura Pink, Rice Paper, Bamboo Yellow",
      "Brazilian Carnival: Tropical Green, Bright Yellow,"
    ]
  },
  {
    type: "Materials",
    values: [
      "Reclaimed Wood",
      "Velvet",
      "Cork",
      "Polished Concrete",
      "Brass",
      "Petrified Wood",
      "Hand-painted Ceramic",
      "Epoxy Resin",
      "Linen",
      "Acid-Washed Metal",
      "Wool",
      "Fluted Glass",
      "Vintage Brass",
      "Colored Concrete",
      "Moss",
      "Silk",
      "Colored Stainless Steel",
      "Wire-brushed wood",
      "Shou Sugi Ban (Charred Wood)",
      "Woven Metal Mesh",
      "Rattan",
      "Copper",
      "Burnished Metal",
      "Oxidized Metal",
      "Crushed Gemstone",
      "Marmorino Plaster",
      "Knitted Textiles",
      "Lava Stone",
      "Cotton",
      "Corduroy",
      "Tweed",
      "Burl Wood",
      "Live Edge Wood",
      "Herringbone Wood",
      "Shagreen",
      "Mohair",
      "Alpaca",
      "Sheepskin",
      "Satin Brass"
    ]
  },
  {
    type: "Patterns",
    values: [
      "Stripes",
      "Polka Dots",
      "Plaid",
      "Tartan",
      "Gingham",
      "Chevron",
      "Herringbone",
      "Houndstooth",
      "Paisley",
      "Floral",
      "Damask",
      "Toile",
      "Animal Print",
      "Leopard Print",
      "Zebra Print",
      "Tiger Stripe",
      "Snake Skin",
      "Camouflage",
      "Argyle",
      "Geometric",
      "Abstract",
      "Moroccan",
      "Ikat",
      "Tribal",
      "Batik",
      "Brocade",
      "Lace",
      "Quilted",
      "Mosaic",
      "Fishnet",
      "Checkerboard",
      "Harlequin",
      "Pin Stripes",
      "Windowpane",
      "Basket Weave",
      "Greek Key",
      "Fretwork",
      "Chinoiserie",
      "Shibori",
      "Ogee",
      "Ticking Stripe",
      "Honeycomb",
      "Trellis",
      "Jacobean",
      "Art Deco",
      "Art Nouveau",
      "Celtic Knot",
      "Ditsy Print",
      "Liberty Print",
      "Wallpaper Florals",
      "Baroque",
      "Rococo",
      "Aztec",
      "Patchwork",
      "Seersucker",
      "Cable Knit",
      "Matelassé",
      "Burlap",
      "Denim",
      "Velvet",
      "Chenille",
      "Sequin",
      "Glitter",
      "Marble",
      "Granite",
      "Terrazzo",
      "Speckle",
      "Splatter",
      "Inkblot",
      "Watercolor",
      "Ombre",
      "Gradient",
      "Tie-dye",
      "Acid Wash",
      "Crushed Velvet",
      "Faux Fur",
      "Broderie Anglaise",
      "Crochet",
      "Macramé",
      "Kantha",
      "Chintz",
      "Ottoman Rib",
      "Pinstripe",
      "Filigree",
      "Foliage",
      "Swirl",
      "Spiral",
      "Optical Illusion",
      "Labyrinth",
      "Mandala",
      "Chevron Zigzag",
      "Ripples",
      "Waves",
      "Scales",
      "Clouds",
      "Stars",
      "Moons",
      "Suns",
      "Galaxy",
      "Universe"
    ]
  },
  {
    type: "Backgrounds",
    values: [
      "A serene beach at sunset with soft, pastel colors",
      "A bustling city skyline at night, lights twinkling",
      "A tranquil mountain lake reflecting the surrounding peaks",
      "A lush forest in early morning mist",
      "A field of lavender under a clear blue sky",
      "The Milky Way galaxy stretching across a starry sky",
      "A cozy cabin in a snowy landscape",
      "Cherry blossoms in full bloom by a tranquil pond",
      "A desert scene with a dramatic sunset",
      "A vibrant coral reef under crystal clear water",
      "An old cobblestone street in Europe, lined with cafes",
      "Golden autumn leaves covering a forest floor",
      "A rainbow arching over a waterfall",
      "A modern minimalist interior with soft lighting",
      "A classic library room filled with books",
      "Northern lights dancing over a frozen landscape",
      "A vintage map of the world",
      "A sunflower field at sunrise",
      "A bustling farmer's market with colorful produce",
      "An abstract geometric pattern with bright colors",
      "A graffiti-filled urban street art scene",
      "A majestic castle surrounded by mist",
      "A traditional Japanese garden with a koi pond",
      "A futuristic cityscape with towering skyscrapers",
      "A snowy mountain range under a clear blue sky",
      "A close-up of dew drops on spider webs",
      "A tranquil zen garden with raked sand",
      "A vibrant carnival with fireworks in the sky",
      "A picturesque vineyard in the rolling hills",
      "A digital cyberpunk city with neon lights",
      "A serene path through a bamboo forest",
      "A macro shot of a butterfly on a flower",
      "A historic European alleyway at dusk",
      "A tropical beach with palm trees and turquoise water",
      "An underwater scene with a swimming turtle",
      "A panoramic view of the Grand Canyon",
      "A night sky with a full moon and clouds",
      "A close-up of colorful autumn leaves",
      "A peaceful countryside with rolling hills and a farm",
      "A white sand beach with a single palm tree",
      "A medieval stone bridge over a calm river",
      "A colorful hot air balloon festival",
      "A vibrant mural on an urban brick wall",
      "A misty forest path in early morning light",
      "A detailed close-up of a peacock feather",
      "An icy glacier leading into the sea",
      "A sunlit old bookshop with books piled high",
      "A high-speed train passing through the countryside",
      "A close-up of water droplets on a leaf",
      "A neon-lit street in Tokyo at night",
      "A field of bright red poppies under a sunny sky",
      "A magical fairy tale forest with glowing lights",
      "A panoramic view of Paris from above, with the Eiffel Tower",
      "A quiet monastery with mountains in the background",
      "A rustic barn in a snowy field",
      "A close-up of a vibrant bird perched on a branch",
      "A fiery sunset over a calm ocean",
      "A lively street in Havana with classic cars",
      "An abandoned amusement park overgrown with nature",
      "A detailed map of a fantasy world",
      "An aerial view of a heart-shaped island",
      "A dark, moody forest with light streaming through trees",
      "A pattern of colorful Moroccan tiles",
      "A lively coral reef with a school of fish",
      "A foggy morning in a New England harbor",
      "A panoramic view of the Sahara Desert",
      "A vibrant street in India during Holi festival",
      "A peaceful chapel in the countryside",
      "An underwater cave with rays of light",
      "A dramatic cliff overlooking the ocean",
      "A close-up of frost patterns on a window",
      "A bustling night market in Asia",
      "A tranquil cottage garden with flowers and bees",
      "A snowy owl in flight against a winter sky",
      "A rustic wooden pathway through a marsh",
      "A close-up of a lion's face, eyes intense",
      "A scenic view of Tuscany's rolling hills and vineyards",
      "A misty morning on the Scottish Highlands",
      "A vintage car parked on a Havana street",
      "A close-up of raindrops on a colorful umbrella",
      "A picturesque lighthouse on a rocky shore",
      "A vibrant butterfly garden with various species",
      "An opulent room in a historic palace",
      "A wild horse running through a meadow",
      "A colorful abstract painting with swirling patterns",
      "A romantic bridge over a canal in Venice",
      "A close-up of a spider web with morning dew",
      "A panoramic sunset view from a mountaintop",
      "A bustling subway station with trains passing",
      "A charming old village with stone houses"
    ]
  },
  {
    type: "AI concepts",
    values: []
  }
]

const KeyCodes = {
  comma: 188,
  enter: 13
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

function Result() {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const plan = useSelector((state) => state.auth.plan);
  const socket = useSocket();
  const { id } = useParams();
  const isDarkMode = useSelector(state => state.app.isDarkMode);
  const inputRefs = useRef([]);
  const [isFocus, setIsFocus] = useState(0);
  const [isAdvanced, setIsAdvanced] = useState([]);
  const [concept, setConcept] = useState({});
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(-1);
  const [keywords, setKeywords] = useState([]);
  const [prevIndex, setPrevIndex] = useState({});
  const [tags, setTags] = useState([]);
  const [advancedValue, setAdvancedValue] = useState([]);
  const [basicValue, setBasicValue] = useState([]);
  const [selectedType, setSelectedType] = useState([]);
  const [pos, setPos] = useState([]);
  const [progress, setProgress] = useState({});
  const prevConcept = usePrevious(concept);
  const prevProgress = usePrevious(progress);
  const [blendIdeas, setBlendIdeas] = useState([]);

  useEffect(() => {
    getImage();
  }, []);

  useEffect(() => {
    if (socket) {
      console.log('socket event added!');
      socket.on('IMAGE_GENERATED', (data) => {
        console.log('IMAGE_GENERATED');
        getImage();
        setCount(data.count);
      });
      socket.on('IMAGE_PROCESS', (data) => {
        console.log('IMAGE_PROCESS'/* , data.url */);
        if (!progress[data.id]) {
          getImage();
        }
        setCount(data.count);
        setProgress(prev => ({
          ...prev,
          [data.id]: {
            ...data,
          }
        }));
      });
    }

    return () => {
      if (socket) {
        console.log('socket event removed!');
        socket.off('IMAGE_GENERATED');
        socket.off('IMAGE_PROCESS');
      }
    }
  }, [socket]);


  const getImage = () => {
    getConceptById(id).then(res => {
      setConcept(res.data.concept);
      // setCount(res.data.count);
      if (res.data.concept) {
        setAdvancedValue((prev) => res.data.concept.resultImages.map((data, index) => prev[index] ? prev[index] : data.prompt));
        setIsAdvanced((prev) => {
          return res.data.concept.resultImages.map((_, index) => prev[index] ? true : false);
        });
        setSelectedType((prev) => {
          return res.data.concept.resultImages.map((_, index) => prev[index] ? prev[index] : 0);
        });
        setPos((prev) => {
          return res.data.concept.resultImages.map((_, index) => prev[index] ? prev[index] : 0);
        });
      }
    }).catch(err => {
      console.log(err);
    });
  }

  useEffect(() => {
    if (concept?.resultImages?.length - prevConcept?.resultImages?.length == 1) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [concept?.resultImages?.length]);

  // useEffect(() => {
  //   console.log(isAdvanced);
  // }, [isAdvanced])

  // console.log(advancedValue, isAdvanced);

  // useEffect(() => {
  //   // console.log(id, plan);
  //   // if(!plan && !id) {
  //   //     navigate('/plans');
  //   // }
  // }, [plan]);

  // const handleChange = (info) => {
  //   setPercent(parseInt(info.file.percent));
  //   if (info.file.status === "done") {
  //     setPath(info.file.response?.path);
  //   }
  // };

  const handleDelete = i => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = tag => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  const handleAdd = (word, index, index1) => {
    let tmp = [...keywords];

    if (prevIndex.index == index) {
      if ((prevIndex.index1 - index1) == 1) {
        let prevWord = tmp.splice(-1, 1);
        let newWord = word + ' ' + prevWord;
        tmp = [...tmp, newWord];
      } else if ((prevIndex.index1 - index1) == -1) {
        let prevWord = tmp.splice(-1, 1);
        let newWord = prevWord + ' ' + word;
        tmp = [...tmp, newWord];
      } else if ((prevIndex.index1 - index1) == 0) {
      } else {
        tmp = [...tmp, word];
      }
    } else {
      tmp = [...tmp, word];
    }
    setKeywords([...tmp]);
    setPrevIndex({ index, index1 });
  }

  const handleRemove = (index) => {
    let tmp = [...keywords];
    tmp.splice(index, 1);
    setKeywords([...tmp]);
  }

  const handleGenerate = async (imageId, index) => {
    setLoading(index);
    try {
      // let res = await getImageDescription({
      //   path
      // });
      // console.log(res);
      let res = await generateImage(id, { keywords: isAdvanced[index] ? advancedValue[index] : basicValue[index], imageId, isAdvanced: isAdvanced[index] });
      // console.log(res);
      setConcept(res.data.concept);
    } catch (error) {
      console.log(error);
    }
    setLoading(-1);
  }

  return (
    <div className="text-center max-w-7xl w-screen mx-auto p-4">
      <Row gutter={[12, 12]} className="sm:mt-6">
        {/* <Col span={24}>
          <h2 className="sm:text-xl md:text-2xl !text-shadow-lg capitalize">{concept.name}</h2>
        </Col> */}
        {concept.resultImages?.length > 0 && <Col span={24}>
          {(concept.resultImages?.filter(data => (data.status == "completed" || data.status == "faild")).length > 0 || (Object.values(progress).filter(pro => pro.status == 'generating')).length > 0) ? <h4 className="bg-purple-400 rounded-full p-2 px-3 !text-white sm:text-lg md:text-xl">These images are <span className="text-black font-bold">AI Generated</span>. Use words to change them however you want.</h4> : <h4 className="bg-purple-400 rounded-full p-2 px-3 !text-white sm:text-lg md:text-xl">You are <span className="text-black font-bold">{ordersText[count < 6 ? 6 : count] || `${count < 6 ? 6 : count + 1}th`}</span> in line for the <span className="text-black font-bold">Free Tier</span>. Please wait 3 minutes or <span className="text-purple-800 font-bold">Upgrade to PRO</span>.</h4>}
        </Col>}
        {/* <Col span={24}>
          <div className="border-1 border-solid border-gray-300 bg-gray-100 py-2 px-4 text-left">
            {(keywords.length == 0) && "no selected keywords!"}
            {keywords.map((keyword, index) => <Tag className="my-1 relative group/item" key={index}>{keyword} <span className="absolute -top-2 -right-2 cursor-pointer group-hover/item:inline hidden" onClick={() => { handleRemove(index) }}><CloseCircleTwoTone twoToneColor="#F00" /></span></Tag>)}
          </div>
        </Col> */}
        <div className={classNames("p-4 rounded shadow-none mb-4 w-full", isDarkMode ? "bg-gray-800" : "bg-white")}>
          {(!concept.resultImages) && <div className="w-full h-44 bg-center bg-no-repeat bg-[length:400px_300px]" style={{ backgroundImage: `url(${loadingGif})`, backgroundColor: "#E9E9EB" }}><br /><br /><br /><br /><br /><br /><br /><br />Loading...</div>}
          {concept.resultImages?.map((data, index) => <Row gutter={[24, 24]} key={index}>
            {index == 1 && <Col span={24}>
              <div className="bg-black text-white p-2 rounded text-lg">We've automatically created 10 versions of your initial image to show you what is possible. Read the text above each image set to see the changes we told the AI to make for each version.</div>
            </Col>}
            {data.addition && <Col span={24} className="">
              <p className={classNames("mb-0 text-left p-2 border-l-4 border-0 border-solid rounded-r-full", isDarkMode ? "border-l-gray-300 bg-gray-700 text-gray-300" : "border-l-gray-500 bg-gray-100 text-gray-700")}>{data.addition}</p>
            </Col>}
            {data.urls?.length > 0 && <Col span={24}>
              <div className="relative">
                <span className="top-0 left-0 z-50 absolute text-white p-2 bg-purple-800 rounded-br-xl shadow-lg">{index + 1}</span>
                <Image.PreviewGroup>
                  <Row gutter={[12, 12]}>
                    {data.urls?.map((url, index1) => <Col key={`${index}_${index1}`} xs={12} sm={12} md={6} >
                      <Image src={`${constants.SOCKET_URL}/image/${url.split('/')[url.split('/').length - 2]}/${url.split('/')[url.split('/').length - 1]}?w=170&h=170`} preview={{ src: `${url}` }} /* placeholder={<Image preview={false} src={`${constants.SOCKET_URL}/image/${url.split('/')[url.split('/').length - 2]}/${url.split('/')[url.split('/').length - 1]}?w=100&h=100`} width={'100%'} />} */ width={'100%'} />
                      {/* <div className="mt-2 text-center"><Button icon={<FormOutlined />}>Select</Button></div> */}
                    </Col>)}
                  </Row>
                </Image.PreviewGroup>
              </div>
            </Col>}
            {(data.status !== 'completed' && data.status !== 'failed') && <Col span={24}>
              <div className="relative">
                <span className="top-0 left-0 z-50 absolute text-white p-2 bg-purple-800 rounded-br-xl shadow-lg">{index + 1}</span>
                <Row gutter={[12, 12]}>
                  {(data.parent ? ((concept.resultImages.filter(image => image.imageId == data.parent)[0].urls.length > 0 && index > 10) ? concept.resultImages.filter(image => image.imageId == data.parent)[0].urls.map((url, index1) => <Col key={`${index}_${index1}`} xs={12} sm={12} md={6} >
                    <div className="relative flex justify-center items-center flex-col bg-gray-200">
                      <div className="relative overflow-hidden"><Image src={`${progress[data.imageId]?.url ? progress[data.imageId].url : url}`} preview={false} fallback={concept.inputImages[0].path.includes('https://') ? `${concept.inputImages[0].path}` : `${constants.SOCKET_URL}${concept.inputImages[0].path}`} className={`transition-[filter] duration-[3000ms] min-h-[100px] ease-in w-full clip_${prevProgress[data.imageId]?.url ? index1 : ''}`} alt="product" style={{
                        filter: `blur(${prevProgress[data.imageId]?.url ? '4px' : '30px'})`
                      }} /></div>
                      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col">
                        <span className="loader"></span>
                        <p className="mb-0 text-gray-700 px-2 py-1 bg-[#eee9] rounded-xl shadow mt-4">{progress[data.imageId] ? `${progress[data.imageId].status}${progress[data.imageId].status == 'generating' ? ` (${progress[data.imageId].progress}%)` : ''}...` : `${data.status}...`}</p>
                      </div>
                    </div>
                  </Col>) : new Array(4).fill(concept.inputImages[0].path.includes('https://') ? `${concept.inputImages[0].path}` : `${constants.SOCKET_URL}${concept.inputImages[0].path}`).map((url, index1) => <Col key={`${index}_${index1}`} xs={12} sm={12} md={6} >
                    <div className="relative flex justify-center items-center flex-col bg-gray-200">
                      <div className="relative overflow-hidden"><Image src={`${progress[data.imageId]?.url ? progress[data.imageId].url : url}`} preview={false} fallback={concept.inputImages[0].path.includes('https://') ? `${concept.inputImages[0].path}` : `${constants.SOCKET_URL}${concept.inputImages[0].path}`} className={`transition-[filter] duration-[3000ms] min-h-[100px] ease-in w-full clip_${prevProgress[data.imageId]?.url ? index1 : ''}`} alt="product" style={{
                        filter: `blur(${prevProgress[data.imageId]?.url ? '4px' : '30px'})`
                      }} /></div>
                      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col">
                        <div className="loader"></div>
                        <p className="mb-0 text-gray-700 px-2 py-1 bg-[#eee9] rounded-xl shadow mt-4">{progress[data.imageId] ? `${progress[data.imageId].status}${progress[data.imageId].status == 'generating' ? ` (${progress[data.imageId].progress}%)` : ''}...` : `${data.status}...`}</p>
                      </div>
                    </div>
                  </Col>)) : new Array(4).fill(0).map((_, index1) => <Col key={`${index}_${index1}`} xs={12} sm={12} md={6} ><div className="flex justify-center items-center flex-col bg-gray-200 relative">
                    <div className="relative overflow-hidden"><Image src={`${progress[data.imageId]?.url || (concept.inputImages[0].path.includes('https://') ? `${concept.inputImages[0].path}` : `${constants.SOCKET_URL}${concept.inputImages[0].path}`)}`} preview={false} fallback={concept.inputImages[0].path.includes('https://') ? `${concept.inputImages[0].path}` : `${constants.SOCKET_URL}${concept.inputImages[0].path}`} className={`transition-[filter] duration-[3000ms] min-h-[100px] ease-in w-full clip_${prevProgress[data.imageId]?.url ? index1 : ''}`} alt="product" style={{
                      filter: `blur(${prevProgress[data.imageId]?.url ? '4px' : '30px'})`
                    }} /></div>
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col">
                      <div className="loader"></div>
                      <p className="mb-0 text-gray-700 px-2 py-1 bg-[#eee9] rounded-xl shadow mt-4">{progress[data.imageId] ? `${progress[data.imageId].status}${progress[data.imageId].status == 'generating' ? ` (${progress[data.imageId].progress}%)` : ''}...` : `${data.status}...`}</p>
                    </div>
                  </div></Col>))}
                </Row>
              </div>
            </Col>}
            {data.status == 'failed' && <Col span={24}>
              <div className="relative">
                <span className="top-0 left-0 z-50 absolute text-white p-2 bg-purple-800 rounded-br-xl shadow-lg">{index + 1}</span>
                <Row gutter={[12, 12]}>
                  {new Array(4).fill(0).map((_, index1) => <Col key={`${index}_${index1}`} xs={12} sm={12} md={6} ><div className="flex justify-center items-center flex-col bg-gray-200  p-5">
                    {/* <div className="loader"></div> */}
                    <p className="mb-0">Failed</p>
                  </div></Col>)}
                </Row>
              </div>
            </Col>}
            {/* <Col span={24}>
              <p className="break-words text-lg text-left p-2 bg-gray-50 border-l-4 border-0 border-l-gray-600 border-solid">
                {data.prompt.split(" ").map((word, index1) => <span className="group/item mr-1 hover:bg-green-200 cursor-pointer relative" key={`desc_${index}_${index1}`} onClick={() => handleAdd(word, index, index1)}>{word}
                  <span className="absolute top-[-15px] right-[-15px] z-[-10] group-hover/item:z-auto" onClick={() => {
                    alert("Hello");
                  }}><CloseCircleTwoTone twoToneColor="red" /></span>
                </span>)}
              </p>
            </Col> */}
            <Col span={24}>
              {/* <div className="border-1 border-solid border-gray-200 rounded p-2">
                <ReactTags
                  tags={tags}
                  suggestions={data.prompt.split(" ").filter(txt => txt.length > 5).map(txt => ({ id: txt, text: txt }))}
                  delimiters={delimiters}
                  handleDelete={handleDelete}
                  handleAddition={handleAddition}
                  handleDrag={handleDrag}
                  // handleTagClick={handleTagClick}
                  inputFieldPosition="inline"
                  autocomplete
                />
              </div> */}
              <TextArea placeholder={isAdvanced[index] ? "" : "Describe what you want to add, change, or remove from your initial renderings"} autoSize={{ maxRows: 5 }} value={isAdvanced[index] ? advancedValue[index] : basicValue[index]} onChange={(e) => {
                if (isAdvanced[index]) {
                  let tmp = [...advancedValue];
                  tmp[index] = e.target.value;
                  setAdvancedValue(tmp);
                } else {
                  let tmp = [...basicValue];
                  tmp[index] = e.target.value;
                  setBasicValue(tmp);
                }
              }}
                ref={el => inputRefs.current[index] = el}
                // autoFocus
                onFocus={(e) => {
                  setIsFocus(index);
                }}
                onClick={(e) => {
                  const cursorPosition = e.target.selectionStart;
                  let tmp = [...pos];
                  tmp[index] = cursorPosition;
                  setPos(tmp);
                }}
                onKeyUp={(e) => {
                  const cursorPosition = e.target.selectionStart;
                  let tmp = [...pos];
                  tmp[index] = cursorPosition;
                  setPos(tmp);
                }}
                disabled={data.status != 'completed' && data.status != 'failed'}
              />
              <div className="mt-1 text-right">
                <Button type="text"
                  disabled={data.status != 'completed' && data.status != 'failed'}
                  onClick={() => {
                    setIsAdvanced((prev) => {
                      // prev[index] = !prev[index];
                      let tmp = [...prev];
                      tmp[index] = !tmp[index];
                      let tmp1 = [...pos];
                      let len = tmp[index] ? advancedValue[index].length : basicValue[index].length;
                      tmp1[index] = len;
                      setPos(tmp1);
                      return [...tmp];
                    });

                  }}>{isAdvanced[index] ? "Basic Mode" : "Advanced"}</Button>
              </div>
              {isFocus == index && <div className="my-2">
                <Row gutter={[12, 12]}>
                  {patterns.map((pat, ind) => <Col xs={12} sm={8} lg={4} key={`patterns_${ind}`}>
                    {/* <div className={classNames("p-3 border-2 border-solid border-gray-300 bg-gray-200 cursor-pointer", selectedType[index] == ind && "bg-purple-500 text-white")} onClick={() => {
                      let tmp = [...selectedType];
                      tmp[index] = ind;
                      setSelectedType(tmp);
                    }}>{pat.type}</div> */}
                    <Button className={classNames("p-2 md:p-3 rounded-none h-10 sm:h-12 md:h-14 border-2 border-solid border-gray-300 bg-gray-200 hover:!border-gray-300 hover:!text-white hover:!bg-purple-500 cursor-pointer text-gray-800", selectedType[index] == ind && "bg-purple-500 hover:!bg-purple-500 !text-white")} block onClick={() => {
                      if (pat.type == 'AI concepts' && !blendIdeas[index]) {
                        getBlendingIdeas(id, { imageId: data.imageId }).then(res => {
                          let tmp = [...blendIdeas];
                          tmp[index] = res.data.ideas;
                          setBlendIdeas(tmp);
                        }).catch(err => console.log(err)).finally(() => { });
                      }
                      let tmp = [...selectedType];
                      tmp[index] = ind;
                      setSelectedType(tmp);
                    }}>{pat.type}</Button>
                  </Col>)}
                  <Col span={24}>
                    <div className={classNames("max-h-80 overflow-auto p-3", isDarkMode ? "bg-gray-700" : "bg-gray-100")}>
                      <Row gutter={[12, 12]} className="items-stretch">
                        {patterns[selectedType[index]]?.values.length > 0 && patterns[selectedType[index]]?.values.map((value, ind) => <Col xs={12} sm={8} md={6} lg={4} key={`values_${ind}`}>
                          <div
                            className={classNames("p-2 border-2 border-solid cursor-pointer h-full flex items-center justify-center hover:bg-blue-700 ", isDarkMode ? "border-gray-500 bg-gray-300 hover:text-white" : "border-gray-300 bg-gray-200 hover:text-white")}
                            onClick={() => {
                              let txt = (isAdvanced[index] ? advancedValue[index] : basicValue[index]) || "";
                              let prev = txt.slice(0, pos[index]);
                              let next = txt.slice(pos[index]);
                              const newText = prev + ((prev.slice(-1) == ' ' || !prev.slice(-1)) ? '' : ' ') + `${value}` + ((next.slice(0, 1) == ' ' || !next.slice(0, 1)) ? '' : ' ') + next;
                              if (isAdvanced[index]) {
                                let tmp = [...advancedValue];
                                tmp[index] = newText;
                                setAdvancedValue(tmp);
                              } else {
                                let tmp = [...basicValue];
                                tmp[index] = newText;
                                setBasicValue(tmp);
                              }
                              let tmp = [...pos];
                              tmp[index] = pos[index] + value.length + ((prev.slice(-1) == ' ' || !prev.slice(-1)) ? 0 : 1) + ((next.slice(0, 1) == ' ' || !next.slice(0, 1)) ? 0 : 1);
                              setPos(tmp);
                              inputRefs.current[index].focus();
                              // inputRefs.current[index].setSelectionRange(pos[index] + value.length, pos[index] + value.length);
                            }}
                          >{value}</div>
                        </Col>)}
                        {(patterns[selectedType[index]]?.values.length == 0 && !blendIdeas[index]) && <Col span={24}>
                          <Spin className={isDarkMode && "text-white [&_.ant-spin-dot-item]:bg-white"} tip="Generating with AI...">
                            <div className="h-28"></div>
                          </Spin>
                        </Col>}
                        {patterns[selectedType[index]]?.values.length == 0 && blendIdeas[index]?.map((value, ind) => <Col xs={24} md={12} key={`values_${ind}`}>
                          <div
                            className={classNames("p-2 border-2 border-solid cursor-pointer h-full flex items-center justify-center hover:bg-blue-700 ", isDarkMode ? "border-gray-500 bg-gray-300 hover:text-white" : "border-gray-300 bg-gray-200 hover:text-white")}
                            onClick={() => {
                              let txt = (isAdvanced[index] ? advancedValue[index] : basicValue[index]) || "";
                              let prev = txt.slice(0, pos[index]);
                              let next = txt.slice(pos[index]);
                              const newText = prev + ((prev.slice(-1) == ' ' || !prev.slice(-1)) ? '' : ' ') + `${value}` + ((next.slice(0, 1) == ' ' || !next.slice(0, 1)) ? '' : ' ') + next;
                              if (isAdvanced[index]) {
                                let tmp = [...advancedValue];
                                tmp[index] = newText;
                                setAdvancedValue(tmp);
                              } else {
                                let tmp = [...basicValue];
                                tmp[index] = newText;
                                setBasicValue(tmp);
                              }
                              let tmp = [...pos];
                              tmp[index] = pos[index] + value.length + ((prev.slice(-1) == ' ' || !prev.slice(-1)) ? 0 : 1) + ((next.slice(0, 1) == ' ' || !next.slice(0, 1)) ? 0 : 1);
                              setPos(tmp);
                              inputRefs.current[index].focus();
                              // inputRefs.current[index].setSelectionRange(pos[index] + value.length, pos[index] + value.length);
                            }}
                          >{value}</div>
                        </Col>)}
                      </Row>
                    </div>
                  </Col>
                </Row>
              </div>}
              <div className="text-center mb-4">
                <Button disabled={(data.status != 'completed' && data.status != 'failed') || loading == index} type="primary" size="" onClick={() => handleGenerate(data.imageId, index)} loading={loading == index}>Generate</Button>
              </div>
              <Divider />
            </Col>
          </Row>)}
          {/* {concept.resultImages?.length == 1 && new Array(10).fill(0).map((_, index) => {
            return (<Row gutter={[24, 24]} key={index}>
              {new Array(4).fill(0).map((_, index1) => <Col key={`${index}_${index1}`} xs={12} sm={12} md={6} ><div className="flex justify-center items-center flex-col bg-gray-200 relative">
                <img src={concept.inputImages[0].path.includes('https://') ? `${concept.inputImages[0].path}` : `${constants.SOCKET_URL}${concept.inputImages[0].path}`} className="w-full blur-xl" alt="product" />
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col">
                  <div className="loader"></div>
                  <p className="mb-0 text-white mt-2">processing...</p>
                </div>
              </div></Col>)}
              <Col span={24}>
                <TextArea placeholder={"Describe what you want to add, change, or remove from your initial renderings"} autoSize={{ maxRows: 5 }}
                  disabled
                />
                <div className="mt-1 text-right">
                  <Button type="text"
                    disabled>Advanced</Button>
                </div>
                <div className="text-center mb-4">
                  <Button type="primary" size="" disabled>Generate</Button>
                </div>
                <Divider />
              </Col>
            </Row>)
          })} */}
        </div>
      </Row>
    </div>
  );
}

export default Result;
