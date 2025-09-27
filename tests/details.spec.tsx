import DetailsDropdown from "@/components/details/detailsDropdown";
import DetailsDropdownItem from "@/components/details/detailsDropdownItem";
import DetailsDropdownSearch from "@/components/details/detailsDropdownSearch";
import DetailsInput from "@/components/details/detailsInput";
import DetailsItem from "@/components/details/detailsItem";
import DetailsRow from "@/components/details/detailsRow";
import { fireEvent, render, screen } from "@testing-library/react-native";

// Mock icons used inside DetailsDropdown
jest.mock("@expo/vector-icons", () => ({
  Ionicons: "Ionicons",
}));

describe("Details Input", () => {
  it("renders title and value and triggers onChangeText", () => {
    const onChangeText = jest.fn();
    render(
      <DetailsInput
        title="Team"
        value="SC Freiburg"
        placeholder="Enter team"
        onChangeText={onChangeText}
        isValid={true}
        errorMessage="Required"
      />
    );

    screen.getByText("Team");
    const input = screen.getByDisplayValue("SC Freiburg");
    fireEvent.changeText(input, "Borussia Dortmund");
    expect(onChangeText).toHaveBeenCalledWith("Borussia Dortmund");
  });

  it("shows error message when invalid", () => {
    render(
      <DetailsInput
        title="Season"
        value=""
        placeholder="Enter season"
        onChangeText={jest.fn()}
        isValid={false}
        errorMessage="Season is required"
      />
    );

    screen.getByText("Season");
    screen.getByText("Season is required");
  });
});

describe("Details Dropdown Item", () => {
  it("renders option text and calls onSelection on press", () => {
    const onSelection = jest.fn();
    render(
      <DetailsDropdownItem isActive={false} option="Home" onSelection={onSelection} />
    );

    screen.getByText("Home");
    fireEvent.press(screen.getByText("Home").parent);
    expect(onSelection).toHaveBeenCalledWith("Home");
  });

  it("applies active styles when isActive is true", () => {
    render(<DetailsDropdownItem isActive option="Away" onSelection={jest.fn()} />);
    screen.getByText("Away");
  });
});

describe("Details Dropdown", () => {
  const baseProps = {
    title: "Type",
    placeholder: "Select type",
    value: "",
    onSelection: jest.fn(),
    isValid: true,
    errorMessage: "Type is required",
    options: ["Home", "Away", "Third"],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders title and placeholder; opens and closes modal with x button", () => {
    render(<DetailsDropdown {...baseProps} />);

    screen.getByText("Type");
    screen.getByText("Select type");

    fireEvent.press(screen.getByText("Select type").parent);
    screen.getByText("Home");
    screen.getByText("Away");
    screen.getByText("Third");

    fireEvent.press(screen.getByTestId("close_details_dropdown_modal"));
    expect(screen.queryByText("Home")).toBeNull();
    expect(screen.queryByText("Away")).toBeNull();
    expect(screen.queryByText("Third")).toBeNull();
  });

  it("selects an option and calls onSelection, then closes modal", () => {
    const onSelection = jest.fn();
    render(<DetailsDropdown {...baseProps} onSelection={onSelection} />);

    fireEvent.press(screen.getByText("Select type").parent);
    fireEvent.press(screen.getByText("Third").parent);
    expect(onSelection).toHaveBeenCalledWith("Third");
  });

  it("shows error when invalid", () => {
    render(<DetailsDropdown {...baseProps} isValid={false} />);
    screen.getByText("Type is required");
  });
});

describe("Details Dropdown Search", () => {
  const baseProps = {
    title: "Type",
    placeholder: "Select type",
    value: "",
    onSelection: jest.fn(),
    isValid: true,
    errorMessage: "Type is required",
    options: ["Home", "Away", "Third"],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders title and placeholder; opens and closes modal with x button", () => {
    render(<DetailsDropdownSearch {...baseProps} />);

    screen.getByText("Type");
    screen.getByText("Select type");

    fireEvent.press(screen.getByText("Select type").parent);
    screen.getByText("Home");
    screen.getByText("Away");
    screen.getByText("Third");

    fireEvent.press(screen.getByTestId("close_details_dropdown_search_modal"));
    expect(screen.queryByText("Home")).toBeNull();
    expect(screen.queryByText("Away")).toBeNull();
    expect(screen.queryByText("Third")).toBeNull();
  });

  it("selects an option and calls onSelection, then closes modal", () => {
    const onSelection = jest.fn();
    render(<DetailsDropdownSearch {...baseProps} onSelection={onSelection} />);

    fireEvent.press(screen.getByText("Select type").parent);
    fireEvent.press(screen.getByText("Third").parent);
    expect(onSelection).toHaveBeenCalledWith("Third");
  });

  it("shows error when invalid", () => {
    render(<DetailsDropdownSearch {...baseProps} isValid={false} />);
    screen.getByText("Type is required");
  });
});

describe("Details Row", () => {
  it("renders children", () => {
    render(
      <DetailsRow>
        <DetailsItem title="Team" content="SC Freiburg" />
        <DetailsItem title="Season" content="2024" />
      </DetailsRow>
    );

    screen.getByText("Team");
    screen.getByText("SC Freiburg");
    screen.getByText("Season");
    screen.getByText("2024");
  });
});

describe("Details Item", () => {
  it("renders title and content", () => {
    render(<DetailsItem title="Team" content="SC Freiburg" />);
    screen.getByText("Team");
    screen.getByText("SC Freiburg");
  });

  it("falls back to 'not provided' when content is null", () => {
    render(<DetailsItem title="Print Number" content={null} />);
    screen.getByText("Print Number");
    screen.getByText("not provided");
  });
});
