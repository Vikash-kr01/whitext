import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadOnCloudinary = async function (localFilePath) {
    try{
        if (!localFilePath) return null
        const response = await cloudinary.uploader.upload(
            localFilePath,
            {
                resource_type: 'auto'
                //link for different type of option/parameter at bottom: a>
            }
        )
        // console.log("RESPONSE_OF_CLOUDINARY", response)   // check bottom for what it throw
        console.log("file has been uploaded in cloudinary ", response.url)

    } catch (error) {
        console.log(`CLOUDINARY_UPLOAD_ERROR: ${error}`)
    }
}






// a> "https://cloudinary.com/documentation/image_upload_api_reference#upload_optional_parameters"




/*  RESPONSE_OF_CLOUDINARY:  {
  asset_id: '730eb4732058051663dd0482b304562c',
  public_id: 'pgs1g50ncdwnmg7i1g0g',
  version: 1753093360,
  version_id: '47eca0b6dce8a193a3aeb87dd2f335b8',
  signature: '222771fc29f0307aa7b4e4ae03f8e72374423a8a',
  width: 225,
  height: 225,
  format: 'jpg',
  resource_type: 'image',
  created_at: '2025-07-21T10:22:40Z',
  tags: [],
  bytes: 6565,
  type: 'upload',
  etag: 'efcbb2eb3ed6f09b74ab910da1e64b2f',
  placeholder: false,
  url: 'http://res.cloudinary.com/vikashkumar/image/upload/v1753093360/pgs1g50ncdwnmg7i1g0g.jpg',
  secure_url: 'https://res.cloudinary.com/vikashkumar/image/upload/v1753093360/pgs1g50ncdwnmg7i1g0g.jpg',
  asset_folder: '',
  display_name: 'pgs1g50ncdwnmg7i1g0g',
  original_filename: '6c76ec8f916e6a5c62decb47',
  api_key: '566125867391317'
}
*/