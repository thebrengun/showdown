import dummyData from './dummyData'

export default function fetchAssets() {
  // Admin Ajax is not working for non signed in users. Until fixed, we'll resolve from 
  // a global variable put in a tag via PHP.
  if(window.slideshow_data) {
    return Promise.resolve(reshapeData(window.slideshow_data));
  }

  return new Promise(function(resolve, reject) {
    // Use a relative URL in production because multiple domains are mapped
    // Localhost port 3000 is an acceptable origin so in dev the full url 
    // is okay to use when forcing live data over dummmy data.
    let url;
    if (process.env.NODE_ENV === 'production') {
      url = 'wp-admin/admin-ajax.php?action=get_slideshow_data';
    } else {
      url = 'https://showdown.silversound.us/wp-admin/admin-ajax.php?action=get_slideshow_data';
    }

    const request = new XMLHttpRequest();
    request.withCredentials = true;

    request.open('GET', url);
    request.responseType = 'text';
    request.onreadystatechange = () => {
      if(request.readyState === 4 && request.status === 200) {
        const response = JSON.parse(request.response);
        if(response.success === "true") {
          resolve(reshapeData(response));
        } else {
          resolve(syncDummyData());
        }
      }
    };
    request.send();
  }).then(response => response, syncDummyData);
}

export function dummyFetchAssets (error) {
  return Promise.resolve(syncDummyData());
}

function syncDummyData() {
  console.log("Fetching dummy data");
  return reshapeData(dummyData);
}

function reshapeData (response) {
  return {
    videos: response.data
      .filter(asset => asset.type === 'vimeo_video')
      .map(video => ({
        title: video.title,
        vimeoId: video.vimeo_id,
        height: parseInt(video.height, 10),
        width: parseInt(video.width, 10),
        previewUrl: video.vimeo_image
      })),
    images: response.data
      .filter(asset => asset.type === 'image')
      .map(image => ({
        title: image.title,
        url: image.url,
        caption: image.caption || image.title,
        height: parseInt(image.height, 10),
        width: parseInt(image.width, 10)
      }))
  }
}

// {
//   "data": [
//     {
//       "title": "SILVER SOUND SHOWDOWN CALL FOR ENTRIES",
//       "type": "vimeo_video",
//       "vimeo_id": "110497969",
//       "width": "1280",
//       "height": "720",
//       "vimeo_image": "http://i.vimeocdn.com/video/494780643_640.jpg"
//     },
//     {
//       "title": "download_1",
//       "type": "image",
//       "url": "http://showdown.silversound.us/wp-content/uploads/sites/3/2018/07/download_1.jpg",
//       "caption": "",
//       "width": 664,
//       "height": 664
//     }
//   "success": "true"
// }
