import dummyData from './dummyData'
// TODO: replace with API call to
// https://showdown.silversound.us/wp-admin/admin-ajax.php?action=get_slideshow_data

export default fetchAssets

function fetchAssets () {
  return reshapeData(dummyData)
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
