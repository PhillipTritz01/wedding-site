const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
const BASE_URL = API_URL.replace('/api', '');

let contentCache = null;
let contentPromise = null;

// Helper function to get file URL (handles both URLs and file paths)
export const getFileUrl = (filePath) => {
  if (!filePath) return null;
  if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
    return filePath; // Legacy URL support
  }
  return `${BASE_URL}${filePath}`;
};

export const fetchContent = async () => {
  if (contentCache) {
    return contentCache;
  }
  
  if (contentPromise) {
    return contentPromise;
  }
  
  contentPromise = fetch(`${API_URL}/content`)
    .then(res => res.json())
    .then(data => {
      contentCache = data;
      return data;
    })
    .catch(error => {
      console.error('Failed to fetch content from CMS:', error);
      // Return default content if CMS is unavailable
      return getDefaultContent();
    })
    .finally(() => {
      contentPromise = null;
    });
  
  return contentPromise;
};

export const clearCache = () => {
  contentCache = null;
  contentPromise = null;
};

const getDefaultContent = () => ({
  home: {
    coupleName: "Phillip & Nakia",
    weddingTitle: "Wedding",
    date: "Aug 17, 2026, 3:00 p.m.",
    location: "Lethbridge",
    heroImage: "",
    heroVideo: ""
  },
  ourStory: {
    storyText1: "We met in the most unexpected way, and from that moment on, we knew our lives would never be the same. Through laughter, adventures, and countless memories, our love has grown stronger each day.",
    storyText2: "Now, we're excited to celebrate this next chapter together with all of you, our family and friends, as we say \"I do\" and begin our journey as husband and wife.",
    image1: "",
    image2: ""
  },
  theWedding: {
    eventDetails: "No events at the moment",
    gettingThere: "Venue details and directions will be provided closer to the date. We can't wait to celebrate with you!",
    accommodation: "I'm a paragraph. Click here to add your own text and edit me. It's easy. Just click 'Edit Text' or double click me to add your own content and make changes to the font. Feel free to drag and drop me anywhere you like on your page. I'm a great place for you to tell a story."
  },
  weddingParty: {
    bridesmaids: [
      { name: "Maid of Honor", label: "Maid of Honor", image: "" },
      { name: "Bridesmaid", label: "Bridesmaid", image: "" },
      { name: "Bridesmaid", label: "Bridesmaid", image: "" }
    ],
    groomsmen: [
      { name: "Groomsman", image: "" },
      { name: "Groomsman", image: "" },
      { name: "Groomsman", image: "" }
    ]
  },
  weddingRegistry: {
    registryUrl: "https://www.myregistry.com/wedding-registry/nakia-francis-and-phillip-tritz-lethbridge-ab/4809068",
    password: "nakia&phillip4life"
  }
});

