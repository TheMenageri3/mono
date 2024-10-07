/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/spark_program.json`.
 */
export type SparkProgram = {
  "address": "AkXYZTcf1yv5DkAfd6NneNGAtkGA5Cn7WCqZy9CS2BNn",
  "metadata": {
    "name": "sparkProgram",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "createCampaign",
      "discriminator": [
        111,
        131,
        187,
        98,
        160,
        193,
        114,
        244
      ],
      "accounts": [
        {
          "name": "creator",
          "writable": true,
          "signer": true
        },
        {
          "name": "campaign",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  97,
                  109,
                  112,
                  97,
                  105,
                  103,
                  110
                ]
              },
              {
                "kind": "arg",
                "path": "campaignSeed"
              },
              {
                "kind": "account",
                "path": "creator"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "campaignSeed",
          "type": "u64"
        },
        {
          "name": "endingAt",
          "type": "i64"
        },
        {
          "name": "fundingGoalInLamports",
          "type": "u64"
        }
      ]
    },
    {
      "name": "createProposal",
      "discriminator": [
        132,
        116,
        68,
        174,
        216,
        160,
        198,
        22
      ],
      "accounts": [
        {
          "name": "creator",
          "writable": true,
          "signer": true
        },
        {
          "name": "campaign",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  97,
                  109,
                  112,
                  97,
                  105,
                  103,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "campaign.campaign_seed",
                "account": "campaign"
              },
              {
                "kind": "account",
                "path": "creator"
              }
            ]
          }
        },
        {
          "name": "proposal",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  111,
                  112,
                  111,
                  115,
                  97,
                  108
                ]
              },
              {
                "kind": "arg",
                "path": "proposalSeed"
              },
              {
                "kind": "account",
                "path": "campaign"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "endingAt",
          "type": "i64"
        }
      ]
    },
    {
      "name": "pledge",
      "discriminator": [
        235,
        47,
        156,
        254,
        0,
        88,
        212,
        142
      ],
      "accounts": [
        {
          "name": "backer",
          "writable": true,
          "signer": true
        },
        {
          "name": "campaign",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  97,
                  109,
                  112,
                  97,
                  105,
                  103,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "campaign.campaign_seed",
                "account": "campaign"
              },
              {
                "kind": "account",
                "path": "campaign.creator",
                "account": "campaign"
              }
            ]
          }
        },
        {
          "name": "backerData",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  97,
                  99,
                  107,
                  101,
                  114,
                  45,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "account",
                "path": "backer"
              },
              {
                "kind": "account",
                "path": "campaign.campaign_seed",
                "account": "campaign"
              }
            ]
          }
        },
        {
          "name": "campaignVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "campaign"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "pledgeAmountInLamports",
          "type": "u64"
        }
      ]
    },
    {
      "name": "withdraw",
      "discriminator": [
        183,
        18,
        70,
        156,
        148,
        109,
        161,
        34
      ],
      "accounts": [
        {
          "name": "creator",
          "writable": true,
          "signer": true
        },
        {
          "name": "campaign",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  97,
                  109,
                  112,
                  97,
                  105,
                  103,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "campaign.campaign_seed",
                "account": "campaign"
              },
              {
                "kind": "account",
                "path": "campaign.creator",
                "account": "campaign"
              }
            ]
          }
        },
        {
          "name": "campaignVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "campaign"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "backerData",
      "discriminator": [
        51,
        13,
        134,
        245,
        253,
        92,
        101,
        140
      ]
    },
    {
      "name": "campaign",
      "discriminator": [
        50,
        40,
        49,
        11,
        157,
        220,
        229,
        192
      ]
    },
    {
      "name": "proposal",
      "discriminator": [
        26,
        94,
        189,
        187,
        116,
        136,
        53,
        33
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "pledgeAmountZero",
      "msg": "Pledge Amount Can't Be Zero"
    },
    {
      "code": 6001,
      "name": "campaignHasFinished",
      "msg": "Campaign Has Been Finished"
    },
    {
      "code": 6002,
      "name": "campaignStillRunning",
      "msg": "Campaign Is Still Running"
    },
    {
      "code": 6003,
      "name": "unauthorizedCreator",
      "msg": "Unauthorized Campaign Creator As a Signer"
    },
    {
      "code": 6004,
      "name": "campaignFailedNotEnoughFunds",
      "msg": "Campaign Failed Due To Not Raising Enough Funds"
    }
  ],
  "types": [
    {
      "name": "backerData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "backerPk",
            "type": "pubkey"
          },
          {
            "name": "backerAmount",
            "type": "u64"
          },
          {
            "name": "backerDataBump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "campaign",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "campaignSeed",
            "type": "u64"
          },
          {
            "name": "creator",
            "type": "pubkey"
          },
          {
            "name": "startedAt",
            "type": "i64"
          },
          {
            "name": "endingAt",
            "type": "i64"
          },
          {
            "name": "fundingGoalInLamports",
            "type": "u64"
          },
          {
            "name": "isFinished",
            "type": "bool"
          },
          {
            "name": "campaignBump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "proposal",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "votesFor",
            "type": "u64"
          },
          {
            "name": "votesAgainst",
            "type": "u64"
          },
          {
            "name": "startedAt",
            "type": "i64"
          },
          {
            "name": "endingAt",
            "type": "i64"
          },
          {
            "name": "proposalPassed",
            "type": {
              "option": "bool"
            }
          },
          {
            "name": "proposalBump",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "constants": [
    {
      "name": "seed",
      "type": "string",
      "value": "\"anchor\""
    }
  ]
};
