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
        className='bg-[rgba(0,0,0,0.2)] flex-1'
        onPress={onClose}
      >
        <View className='absolute bg-vanillaCream elevation-md min-w-32 p-2 right-9 rounded-lg shadow-black shadow top-32 border border-ashBrown/50'>
          <MenuOverlayEntry
            color='#000'
            iconName='create-outline'
            onPress={onEdit}
            size={20}
            text='Edit'
          />
          <MenuOverlayEntry
            color='#dc2626'
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