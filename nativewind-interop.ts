import FontAwesome6 from "@react-native-vector-icons/fontawesome6";
import Ionicons from "@react-native-vector-icons/ionicons";
import MaterialIcons from "@react-native-vector-icons/material-icons";
import { cssInterop } from "nativewind";

// NativeWind has no built-in config for the @react-native-vector-icons
// components, so `className` (used to absolutely position input icons) was
// being dropped after migrating off @expo/vector-icons. Register each icon set
// so NativeWind maps className -> style. Side-effect import only; load this once
// at app startup (see app/_layout.tsx).
cssInterop(Ionicons, { className: "style" });
cssInterop(FontAwesome6, { className: "style" });
cssInterop(MaterialIcons, { className: "style" });
