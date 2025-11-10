export default function convertShirtResponse(shirtResponseArray: Array<ShirtResponse>): Array<Shirt> {
  const convertedShirts = shirtResponseArray.map((shirtResponse): Shirt => ({
    id: shirtResponse.id,
    team: shirtResponse.team,
    team_key: shirtResponse.teamKey,
    league_key: shirtResponse.leagueKey,
    season: shirtResponse.season,
    type: shirtResponse.type,
    condition: shirtResponse.condition,
    print_name: shirtResponse.printName,
    print_number: shirtResponse.printNumber,
    size: shirtResponse.size,
    value: shirtResponse.value,
    created_at: shirtResponse.createdAt,
    updated_at: shirtResponse.updatedAt,
    imageSrc: '../../assets/images/exampleshirt.png', // Default image for now
  }));

  return convertedShirts;
}