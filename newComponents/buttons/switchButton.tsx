import { Pressable, Text, View } from "react-native";

export default function SwitchButton({ activeIndex, options, setActiveIndex }: { activeIndex: number, options: Array<string>, setActiveIndex: React.Dispatch<React.SetStateAction<0 | 1>> }) {
  return (
    <View className="bg-dark-secondaryBackground flex-row gap-1 p-1 rounded-lg">
      {
        options.map((item, index) => (
          <Pressable
            className={`${activeIndex === index ? 'bg-dark-highlight' : ''} px-3 py-1 rounded-md`}
            key={index}
            onPress={() => setActiveIndex(index as 0 | 1)}
          >
            <Text className={`font-Lexend font-bold ${activeIndex === index ? 'text-white/80' : 'text-white/50'} text-sm`}>{item}</Text>
          </Pressable>
        ))}
    </View>
  );
}