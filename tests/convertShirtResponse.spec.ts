import convertShirtResponse from "@/utils/convertShirtResponse";

it('correctly converts backend shirt response', () => {
  const response: ShirtResponse = {
    id: 'TEST-ID',
    ownerId: 'TEST-OWNER-ID',
    team: 'TEST-TEAM',
    season: '2025',
    type: 'Home',
    condition: 'Used',
    printName: 'TESTPLAYER',
    printNumber: 99,
    size: 'XL',
    value: 100,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const expectedShirt: Shirt = {
    id: 'TEST-ID',
    team: 'TEST-TEAM',
    season: '2025',
    type: 'Home',
    condition: 'Used',
    print_name: 'TESTPLAYER',
    print_number: 99,
    size: 'XL',
    value: 100,
    created_at: new Date(),
    updated_at: new Date(),
    imageSrc: '../../assets/images/exampleshirt.png'
  }

  expect(convertShirtResponse([response])[0]).toEqual(expectedShirt);
})