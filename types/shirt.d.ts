interface Shirt {
  id: string;
  team: string;
  season: string;
  type: string;
  condition: string | null;
  print_name: string | null;
  print_number: number | null;
  size: string | null;
  value: number | null;
  imageSrc: string;
  created_at: Date;
  updated_at: Date;
}

interface ShirtState {
  shirts: Array<Shirt>;
  addShirt: (shirt: Shirt) => void;
  setShirts: (shirts: Array<Shirt>) => void;
  updateShirt: (id: string, updateShirt: Partial<Shirt>) => void;
  removeShirt: (id: string) => void;
}