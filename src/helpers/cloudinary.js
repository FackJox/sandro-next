export async function search(options = {}) {
    const params = {
      ...options
    }
  
    if ( options.nextCursor ) {
      params.next_cursor = options.nextCursor
      delete params.nextCursor;
    }
  
    const paramString = Object.keys(params).map(key => `${key}=${encodeURIComponent(params[key])}`).join('&');
    // console.log("paramString", paramString)
  
    const results = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/search?${paramString}`, {
      headers: {
        Authorization: `Basic ${Buffer.from(process.env.CLOUDINARY_API_KEY + ':' + process.env.CLOUDINARY_API_SECRET).toString('base64')}`
      }
    }).then(r => r.json());
    // console.log(results)
    // console.log("🚀 ~ file: cloudinary.js:20 ~ search ~ results:", results)
    return results;
  }
  
  export function mapImageResources(resources) {
    return resources.map(resource => {
      const { width, height } = resource;
      return {
        id: resource.asset_id,
        title: resource.public_id,
        src: resource.secure_url,
        width,
        height
      }
    });
  }
  
  export async function getFolders(options = {}) {
    // console.log("WE MADE OT HERE BABY")
    const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/folders`, {
      headers: {
        Authorization: `Basic ${Buffer.from(process.env.CLOUDINARY_API_KEY + ':' + process.env.CLOUDINARY_API_SECRET).toString('base64')}`
      }
    }).then(r => r.json());
  
    // console.log("🚀 ~ file: cloudinary.js:46 ~ getFolders ~ response:", response)

    return response;
  }