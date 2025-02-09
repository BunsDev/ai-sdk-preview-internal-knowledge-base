export interface Space {
  id: string;
  name: string;
  description: string;
  owner: string;
  chatIds: string[];
}

export const SPACES: Space[] = [
  {
    id: "539182",
    name: "Apple TV",
    description: "Apple TV Description",
    owner: "Apple TV Owner",
    chatIds: ["chat1", "chat2", "chat3"],
  },
  {
    id: "281958",
    name: "Apple iPhone 14 Pro",
    description: "Apple iPhone 14 Pro Description",
    owner: "Apple iPhone 14 Pro Owner",
    chatIds: ["chat4", "chat5", "chat6"],
  },
  {
    id: "281958",
    name: "Apple Watch Ultra 2",
    description: "Apple Watch Ultra 2 Description",
    owner: "Apple Watch Ultra 2 Owner",
    chatIds: ["chat7", "chat8", "chat9"],
  },
];

export interface SpacesInformation {
  spaceId: string;
  spaceName: string;
  spaceDescription: string;
  spaceOwner: string;
  spaceChatIds: string[];
}

export const SPACES_INFORMATION: SpacesInformation[] = [
  {
    spaceId: "412093",
    spaceName: "Space 1",
    spaceDescription: "Space 1 Description",
    spaceOwner: "Space 1 Owner",
    spaceChatIds: ["chat1", "chat2", "chat3"],
  },
  {
    spaceId: "412094",
    spaceName: "Space 2",
    spaceDescription: "Space 2 Description",
    spaceOwner: "Space 2 Owner",
    spaceChatIds: ["chat4", "chat5", "chat6"],
  },
  {
    spaceId: "412095",
    spaceName: "Space 3",
    spaceDescription: "Space 3 Description",
    spaceOwner: "Space 3 Owner",
    spaceChatIds: ["chat7", "chat8", "chat9"],
  },
];

export const getSpaces = () => {
  return SPACES;
};

export const getSpacesInformation = ({ spaceId }: { spaceId: string }) => {
  return SPACES_INFORMATION.find((info) => info.spaceId === spaceId);
};
