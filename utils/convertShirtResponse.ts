export default function convertShirtResponse(shirtResponseArray: Array<ShirtResponse>): Array<Shirt> {
  const convertedShirts = shirtResponseArray.map((shirtResponse): Shirt => ({
    id: shirtResponse.id,
    team: shirtResponse.team,
    season: shirtResponse.season,
    type: shirtResponse.type,
    condition: shirtResponse.condition,
    print_name: shirtResponse.print_name,
    print_number: shirtResponse.print_number,
    size: shirtResponse.size,
    value: shirtResponse.value,
    created_at: shirtResponse.created_at,
    updated_at: shirtResponse.updated_at,
    imageSrc: '../../assets/images/exampleshirt.png', // Default image for now
  }));

  return convertedShirts;
}