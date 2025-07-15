import { Image, ImageSourcePropType } from 'react-native';

export default function ShirtImage({ imageSrc, size }: { imageSrc: ImageSourcePropType, size: 'small' | 'large' | 'maxi' }) {
  const dimensions = size === 'small' ? 'h-44 w-44'
    : size === 'large' ? 'h-52 w-52' : 'h-fit w-full';

  return (
    <Image
      className={`${dimensions} rounded-xl`}
      resizeMode='cover'
      source={imageSrc}
    />
  );
}