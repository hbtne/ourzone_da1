import axios from 'axios';

export const fetchMusicFromCloudinary = async () => {
  const cloudName = 'dibmnb2rp'; // Tên cloud của bạn
  const apiKey = '515184799815318'; // Thay bằng API Key
  const apiSecret = 'AXObUwGmqzWn89Ixb_z4QGU4jKo'; // Thay bằng API Secret
  const folder = 'musics'; // Đặt folder chứa file nếu có, hoặc để trống
  const resourceType = 'video'; // Loại file (Cloudinary xem nhạc là dạng video)
  const maxResults = 20; // Số file muốn fetch

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/search`;

  try {
    const response = await axios.get(url, {
      params: {
        expression: `resource_type:${resourceType} AND folder:${folder}`, // Fetch nhạc từ folder
        max_results: maxResults,
      },
      auth: {
        username: apiKey,
        password: apiSecret,
      },
    });

    if (response.data && response.data.resources) {
      // Map lại dữ liệu
      return response.data.resources.map((file) => ({
        secure_url: file.secure_url, // Link nhạc
        public_id: file.public_id, // Tên nhạc hiển thị
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
