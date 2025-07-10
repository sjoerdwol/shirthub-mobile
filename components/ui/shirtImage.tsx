import { Image, ImageSourcePropType } from 'react-native';

export default function ShirtImage({ imageSrc }: { imageSrc: ImageSourcePropType }) {
  return (
    <Image
      className='h-44 w-44 rounded-xl'
      resizeMode='contain'
      source={imageSrc}
    />
  );
}