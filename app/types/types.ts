export interface Die {
  id: string;
  value: number;
  locked: boolean;
}

export interface Component {
  id: string;
  value: number;
  valid: boolean;
}

export interface AccionColumn {
  accion: string;
  components: Component[];
  scores: number[];
  order: string[];
}

export interface LockComponent {
  accion: string;
  componentId: string;
}

export interface UserState {
  email: string;
  family_name: string;
  given_name: string;
  id: string;
  locale: string;
  name: string;
  picture: string;
  verified_email: boolean;
}

export interface GameState {
  tableVisibility: boolean;
  dice: Die[];
  opportunities: number;
  accionColumns: AccionColumn[];
  locked: LockComponent | null;
  autoHide: boolean;
}

export interface GameOperations {
  isGameFinished: boolean;
  setIsGameFinished: React.Dispatch<React.SetStateAction<boolean>>;
  isGameHelperVisible: boolean;
  setIsGameHelperVisible: React.Dispatch<React.SetStateAction<boolean>>;
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  helperState: HelperState;
  setHelperState: React.Dispatch<React.SetStateAction<HelperState>>;
  showTable: () => void;
  hideTable: () => void;
}

export interface HelperState {
  helperVisibility: boolean;
  dice: Die[];
  opportunities: number;
  componentId: string;
}

export interface PokerYambState {
  requiredNumber: number;
  counts: number;
}

export interface FullProbabilityState {
  requiredNumber1: number;
  requiredNumber2: number;
}

export interface RequiredNumber {
  requiredNumber: number;
}

interface User {
  image: string;
  name: string;
  score: number;
  active: boolean;
  finished: boolean;
}

export interface GameGroup {
  groupName: string;
  users: User[];
  turn: number;
}

export interface FinalStatus {
  groupId: string;
  matchStatus?: GameGroup;
  isWinner: boolean;
  userSlot: number;
}

export interface MessageType {
  type: string;
  text1: string;
  text2?: string;
}

export interface Conection {
  groupId: string;
  myConection: boolean;
  opponentConection: boolean;
}

export interface PanelVisibilityState {
  isLoginPanelVisible: boolean;
  isHistoryPanelVisible: boolean;
  isMultiplayerPanelVisible: boolean;
  isOptionPanelVisible: boolean;
}

export interface GameSettings {
  isVolumeOn: boolean;
}

export interface AlertSettings {
  alertVisibility: boolean;
  title: string;
  body: string;
  onAccept: () => void;
  onReject: () => void;
}
