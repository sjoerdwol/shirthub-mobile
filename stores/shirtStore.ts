import { create } from 'zustand';

const testdata: Array<Shirt> = [
  {
    id: '1',
    team: 'Arsenal',
    season: '2022/2023',
    type: 'Home',
    condition: null,
    print_name: null,
    print_number: null,
    size: null,
    value: null,
    imageSrc: '../../assets/images/exampleshirt.png',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: '2',
    team: 'ManU',
    season: '2021/2022',
    type: 'Third',
    condition: null,
    print_name: null,
    print_number: null,
    size: null,
    value: null,
    imageSrc: '../../assets/images/exampleshirt.png',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: '3',
    team: 'Liverpool',
    season: '1969/1970',
    type: 'Away',
    condition: null,
    print_name: null,
    print_number: null,
    size: null,
    value: null,
    imageSrc: '../../assets/images/exampleshirt.png',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: '4',
    team: 'Chelsea',
    season: '2017/2018',
    type: 'Home',
    condition: null,
    print_name: null,
    print_number: null,
    size: null,
    value: null,
    imageSrc: '../../assets/images/exampleshirt.png',
    created_at: new Date(),
    updated_at: new Date()
  }
]

export const useShirtStore = create<ShirtState>()((set) => ({
  shirts: testdata,
  addShirt: (shirt) => set((state) => ({ shirts: [...state.shirts, shirt] })),
  removeShirt: (id: string) => set((state) => ({ shirts: state.shirts.filter(shirt => shirt.id !== id) }))
}));