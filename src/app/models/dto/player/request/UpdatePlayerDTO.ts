import PlayerParameterDataDTO from '../aux/PlayerParameterDataDTO';

export interface UpdatePlayerDTO {
  id: string;
  name: string;
  team: string;
  age: string | undefined;
  height: string | undefined;
  positionId: string;
  playerPicture: File | undefined;
  parameters: Array<PlayerParameterDataDTO>;
}
