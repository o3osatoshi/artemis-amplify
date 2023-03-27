import { AttributeValue } from "@aws-sdk/client-dynamodb/dist-types/models";
import { P3Player as P3PlayerDomain } from "../../domain/type";
import SMember = AttributeValue.SMember;
import SSMember = AttributeValue.SSMember;
import MMember = AttributeValue.MMember;

export class P3Player {
  readonly walletAddress: SMember;
  readonly artifacts: SSMember;
  readonly location: MMember;

  constructor(p3Player: P3PlayerDomain) {
    this.walletAddress = { S: p3Player.walletAddress };
    if (p3Player.artifacts.length === 0) {
      this.artifacts = { SS: [""] };
    } else {
      this.artifacts = { SS: p3Player.artifacts };
    }
    this.location = {
      M: {
        id: {
          M: {
            type: { S: p3Player.location.id?.type || "" },
            value: { S: p3Player.location.id?.value || "" },
          },
        },
        type: { S: p3Player.location.type },
        coordinates: { SS: p3Player.location.coordinates },
      },
    };
  }
}
