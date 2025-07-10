import { Image, ImageSourcePropType } from 'react-native';

export default function ShirtImage({ imageSrc, size }: { imageSrc: ImageSourcePropType, size: 'small' | 'large' }) {
  const dimensions = size === 'small' ? 'h-44 w-44' : 'h-52 w-52';

  return (
    <Image
      className={`${dimensions} rounded-xl`}
      resizeMode='contain'
      source={imageSrc}
    />
  );
}