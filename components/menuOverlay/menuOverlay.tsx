import { Modal, Pressable, View } from 'react-native';
import MenuOverlayEntry from './menuOverlayEntry';

export default function MenuOverlay({ visible, onClose, onEdit, onDelete }: MenuOverlayProps) {
  return (
    <Modal
      animationType="fade"
      onRequestClose={onClose}
      transparent
      visible={visible}
    >
      <Pressable
        className='bg-[rgba(0,0,0,0.5)] flex-1'
        onPress={onClose}
      >
        <View className='absolute bg-dark-background-300 elevation-md min-w-32 p-2 right-4 rounded-lg shadow-black shadow top-20'>
          <MenuOverlayEntry
            color='#e0e5eb'
            iconName='create-outline'
            onPress={onEdit}
            size={20}
            text='Edit'
          />
          <MenuOverlayEntry
            color='#ff6b6b'
            iconName='trash'
            onPress={onDelete}
            size={20}
            text='Delete'
          />
        </View>
      </Pressable>
    </Modal>
  );
} 