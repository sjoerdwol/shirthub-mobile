interface ShirtResponse {
  id: string;
  owner_id: string;
  team: string;
  season: string;
  type: string;
  condition: string | null;
  print_name: string | null;
  print_number: number | null;
  size: string | null;
  value: number | null;
  created_at: Date;
  updated_at: Date;
}