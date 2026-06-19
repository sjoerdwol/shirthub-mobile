// Reanimated 4 delegates its worklets to react-native-worklets, which has no
// native runtime under Jest/Node. Without a mock, importing reanimated (or any
// component that uses it) throws:
//   "[Worklets] Native part of Worklets doesn't seem to be initialized".
// Replace react-native-worklets with its built-in, native-free Jest mock so
// Reanimated runs against the mocked worklets runtime in tests.
jest.mock('react-native-worklets', () => require('react-native-worklets/lib/module/mock'));
