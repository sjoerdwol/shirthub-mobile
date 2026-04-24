interface DropdownProps {
  errorMessage: string;
  isValid: boolean;
  onSelection: (value: string) => void;
  options: string[];
  placeholder: string;
  title: string;
  value: string;
  withSearch: boolean;
}