import React from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { auto, autoGravity } from '@cloudinary/url-gen/actions/resize';

const CloudinaryImage = ({ publicId }) => {
  const cld = new Cloudinary({ cloud: { cloudName: 'dibmnb2rp' } });

  const img = cld
    .image(publicId) 
    .format('auto') 
    .quality('auto') 
    .resize(auto().gravity(autoGravity()).width(500).height(500)); 

  return <AdvancedImage cldImg={img} />;
};

export default CloudinaryImage;
