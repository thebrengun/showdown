import dummyData from './dummyData'

export default function fetchAssets() {
  return new Promise(function(resolve, reject) {
    const url = 'https://showdown.silversound.us/wp-admin/admin-ajax.php?action=get_slideshow_data';
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
          resolve(dummyFetchAssets(new Error('Response received with success: false.')));
        }
      }
    };
    request.send();
  }).then(response => response, dummyFetchAssets);
}

function dummyFetchAssets (error) {
  // Fallback on the dummy data. It's small enough to be worth including.
  console.log('Slideshow data request failed. Falling back on dummy data!', error);
  const data = window.slideshow_data || dummyData;
  return reshapeData(data);
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
