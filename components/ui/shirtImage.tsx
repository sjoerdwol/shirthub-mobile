import { Image, ImageSourcePropType, View } from 'react-native';

export default function ShirtImage({ imageSrc, type }: { imageSrc: ImageSourcePropType, type: 'avatar' | 'detailAndManage' | 'displayVertical' | 'favorite' | 'notification' | 'profile' }) {
  let className: string;

  switch (type) {
    case 'avatar':
      className = 'border-2 border-dark-border h-12 w-12 overflow-hidden rounded-full';
      break;
    case 'detailAndManage':
      className = 'border border-dark-border h-72 w-full overflow-hidden rounded-xl';
      break;
    case 'displayVertical':
      className = 'border border-dark-border h-24 w-24 overflow-hidden rounded-lg';
      break;
    case 'favorite':
      className = 'border border-dark-border h-full w-[50%] overflow-hidden rounded-lg';
      break;
    case 'notification':
      className = 'aspect-video border border-dark-border mt-3 overflow-hidden relative rounded-lg';
      break;
    case 'profile':
      className = 'border-2 border-dark-border h-36 w-36 overflow-hidden rounded-full';
      break;
    default:
      className = ''
      break;
  }

  return (
    <View className={className} testID='image_container'>
      <Image
        className='bg-center bg-cover h-full w-full'
        source={imageSrc}
      />
    </View>
  );
}