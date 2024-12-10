import axios from 'axios';

export const fetchMusicFromCloudinary = async () => {
  const cloudName = 'dibmnb2rp'; 
  const apiKey = '515184799815318'; 
  const apiSecret = 'AXObUwGmqzWn89Ixb_z4QGU4jKo'; 
  const folder = 'musics'; 
  const resourceType = 'video'; 
  const maxResults = 20; 

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/search`;

  try {
    const response = await axios.get(url, {
      params: {
        expression: `resource_type:${resourceType} AND folder:${folder}`, 
        max_results: maxResults,
      },
      auth: {
        username: apiKey,
        password: apiSecret,
      },
    });

    if (response.data && response.data.resources) {
      return response.data.resources.map((file) => ({
        secure_url: file.secure_url,
        public_id: file.public_id, 
      }));
    } else {
      console.log('No resources found.');
      return [];
    }
  } catch (error) {
    console.error('Error fetching music:', error);
    throw new Error('Could not fetch music from Cloudinary');
  }
};
