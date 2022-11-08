interface RobotStructure {
  name: string;
  image: string;
  creation: number;
  features: {
    speed: number;
    resistance: number;
  };
}

export default RobotStructure;
