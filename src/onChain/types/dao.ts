/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/dao.json`.
 */
export type Dao = {
  "address": "FK4GzgwHvmHz9yFWL8nzEkXgA2sc3vPimRJiwver64Y8",
  "metadata": {
    "name": "dao",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "initialize",
      "discriminator": [
        175,
        175,
        109,
        31,
        13,
        152,
        155,
        237
      ],
      "accounts": [
        {
          "name": "initializer",
          "writable": true,
          "signer": true
        },
        {
          "name": "treasury",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  101,
                  97,
                  115,
                  117,
                  114,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "config"
              }
            ]
          }
        },
        {
          "name": "config",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              },
              {
                "kind": "arg",
                "path": "seed"
              }
            ]
          }
        },
        {
          "name": "proposalConfig",
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
                  108,
                  99,
                  102,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "config"
              }
            ],
            "program": {
              "kind": "account",
              "path": "governanceProgram"
            }
          }
        },
        {
          "name": "treasuryTeam",
          "writable": true
        },
        {
          "name": "stakingProgram",
          "address": "5ER7DVPftAuJ5DMz1mdrFC5VXQSo2zJZqv1H7GtpebK1"
        },
        {
          "name": "governanceProgram",
          "address": "A3bq5ABJ2npx7t82K9AyhXT2Cd2P3g5R2gks3CkL1bnS"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "instructions",
          "address": "Sysvar1nstructions1111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "seed",
          "type": "u64"
        },
        {
          "name": "proposalFeeBounty",
          "type": "u64"
        },
        {
          "name": "proposalFeeExecutable",
          "type": "u64"
        },
        {
          "name": "proposalFeeVote",
          "type": "u64"
        },
        {
          "name": "proposalFeeVoteMultiple",
          "type": "u64"
        },
        {
          "name": "maxExpiry",
          "type": "u64"
        },
        {
          "name": "minThreshold",
          "type": "u64"
        },
        {
          "name": "minQuorum",
          "type": "u8"
        },
        {
          "name": "proposalAnalysisPeriod",
          "type": "u64"
        },
        {
          "name": "nQuorumEpoch",
          "type": "u8"
        },
        {
          "name": "thresholdCreateProposal",
          "type": "u64"
        },
        {
          "name": "collectionMint",
          "type": {
            "option": "pubkey"
          }
        },
        {
          "name": "mint",
          "type": {
            "option": "pubkey"
          }
        },
        {
          "name": "circulatingSupply",
          "type": "u64"
        },
        {
          "name": "allowSubDao",
          "type": "bool"
        },
        {
          "name": "thresholdCreateSubdao",
          "type": {
            "option": "u64"
          }
        },
        {
          "name": "subdaoFee",
          "type": {
            "option": "u64"
          }
        },
        {
          "name": "vetoCouncil",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "initializeSubDao",
      "discriminator": [
        224,
        116,
        67,
        187,
        156,
        115,
        244,
        207
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "treasury",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  101,
                  97,
                  115,
                  117,
                  114,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "config"
              }
            ]
          }
        },
        {
          "name": "treasurySubdao",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  101,
                  97,
                  115,
                  117,
                  114,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "configSubDao"
              }
            ]
          }
        },
        {
          "name": "treasuryTeam",
          "writable": true
        },
        {
          "name": "configSubDao",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              },
              {
                "kind": "arg",
                "path": "seed"
              }
            ]
          }
        },
        {
          "name": "config",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "config.seed",
                "account": "daoConfig"
              }
            ]
          }
        },
        {
          "name": "proposalConfig",
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
                  108,
                  99,
                  102,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "configSubDao"
              }
            ],
            "program": {
              "kind": "account",
              "path": "governanceProgram"
            }
          }
        },
        {
          "name": "daoTreasury",
          "relations": [
            "config"
          ]
        },
        {
          "name": "governanceProgram",
          "address": "A3bq5ABJ2npx7t82K9AyhXT2Cd2P3g5R2gks3CkL1bnS"
        },
        {
          "name": "stakingProgram",
          "address": "5ER7DVPftAuJ5DMz1mdrFC5VXQSo2zJZqv1H7GtpebK1"
        },
        {
          "name": "stakeState",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "config"
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ],
            "program": {
              "kind": "account",
              "path": "stakingProgram"
            }
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "instructions",
          "address": "Sysvar1nstructions1111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "seed",
          "type": "u64"
        },
        {
          "name": "proposalFeeBounty",
          "type": "u64"
        },
        {
          "name": "proposalFeeExecutable",
          "type": "u64"
        },
        {
          "name": "proposalFeeVote",
          "type": "u64"
        },
        {
          "name": "proposalFeeVoteMultiple",
          "type": "u64"
        },
        {
          "name": "maxExpiry",
          "type": "u64"
        },
        {
          "name": "minThreshold",
          "type": "u64"
        },
        {
          "name": "minQuorum",
          "type": "u8"
        },
        {
          "name": "proposalAnalysisPeriod",
          "type": "u64"
        },
        {
          "name": "nQuorumEpoch",
          "type": "u8"
        },
        {
          "name": "thresholdCreateProposal",
          "type": "u64"
        },
        {
          "name": "collectionMint",
          "type": {
            "option": "pubkey"
          }
        },
        {
          "name": "mint",
          "type": {
            "option": "pubkey"
          }
        },
        {
          "name": "circulatingSupply",
          "type": "u64"
        },
        {
          "name": "allowSubDao",
          "type": "bool"
        },
        {
          "name": "thresholdCreateSubdao",
          "type": {
            "option": "u64"
          }
        },
        {
          "name": "subdaoFee",
          "type": {
            "option": "u64"
          }
        },
        {
          "name": "vetoCouncil",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "payoutBounty",
      "discriminator": [
        183,
        17,
        240,
        215,
        133,
        209,
        26,
        166
      ],
      "accounts": [
        {
          "name": "initializer",
          "writable": true,
          "signer": true
        },
        {
          "name": "payee",
          "writable": true
        },
        {
          "name": "config",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "config.seed",
                "account": "daoConfig"
              }
            ]
          }
        },
        {
          "name": "treasury",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  101,
                  97,
                  115,
                  117,
                  114,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "config"
              }
            ]
          }
        },
        {
          "name": "instructions",
          "address": "Sysvar1nstructions1111111111111111111111111"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "payee",
          "type": "pubkey"
        },
        {
          "name": "payout",
          "type": "u64"
        }
      ]
    },
    {
      "name": "setAllowSubDao",
      "discriminator": [
        6,
        136,
        42,
        35,
        216,
        146,
        169,
        142
      ],
      "accounts": [
        {
          "name": "initializer",
          "writable": true,
          "signer": true
        },
        {
          "name": "config",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "config.seed",
                "account": "daoConfig"
              }
            ]
          }
        },
        {
          "name": "instructions",
          "address": "Sysvar1nstructions1111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "value",
          "type": "bool"
        },
        {
          "name": "subdaoFee",
          "type": {
            "option": "u64"
          }
        },
        {
          "name": "thresholdCreateSubdao",
          "type": {
            "option": "u64"
          }
        }
      ]
    },
    {
      "name": "setVetoCouncil",
      "discriminator": [
        116,
        82,
        174,
        69,
        208,
        27,
        190,
        244
      ],
      "accounts": [
        {
          "name": "initializer",
          "writable": true,
          "signer": true
        },
        {
          "name": "config",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "config.seed",
                "account": "daoConfig"
              }
            ]
          }
        },
        {
          "name": "instructions",
          "address": "Sysvar1nstructions1111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "vetoCouncil",
          "type": "pubkey"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "daoConfig",
      "discriminator": [
        55,
        209,
        87,
        224,
        30,
        202,
        192,
        246
      ]
    }
  ],
  "events": [
    {
      "name": "createDaoEvent",
      "discriminator": [
        234,
        103,
        199,
        8,
        17,
        156,
        254,
        178
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "defaultError",
      "msg": "Default Error"
    },
    {
      "code": 6001,
      "name": "bumpError",
      "msg": "Bump Error"
    },
    {
      "code": 6002,
      "name": "overflow",
      "msg": "overflow"
    },
    {
      "code": 6003,
      "name": "underflow",
      "msg": "underflow"
    },
    {
      "code": 6004,
      "name": "accountsOpen",
      "msg": "You can't unstake with open accounts"
    },
    {
      "code": 6005,
      "name": "expired",
      "msg": "Proposal expired"
    },
    {
      "code": 6006,
      "name": "invalidSlot",
      "msg": "Invalid slot"
    },
    {
      "code": 6007,
      "name": "invalidEpoch",
      "msg": "Invalid epchj"
    },
    {
      "code": 6008,
      "name": "insufficientStake",
      "msg": "Insufficient stake"
    },
    {
      "code": 6009,
      "name": "invalidName",
      "msg": "Invalid name"
    },
    {
      "code": 6010,
      "name": "invalidGist",
      "msg": "Invalid gist"
    },
    {
      "code": 6011,
      "name": "invalidProposalSeed",
      "msg": "Invalid proposal seed"
    },
    {
      "code": 6012,
      "name": "invalidQuorum",
      "msg": "Invalid quorum"
    },
    {
      "code": 6013,
      "name": "invalidExpiry",
      "msg": "Invalid expiry"
    },
    {
      "code": 6014,
      "name": "invalidEvaluationPeriod",
      "msg": "Invalid evaluation_phase_period"
    },
    {
      "code": 6015,
      "name": "proposalClosed",
      "msg": "Proposal closed"
    },
    {
      "code": 6016,
      "name": "invalidVoteAmount",
      "msg": "You can't vote 0!"
    },
    {
      "code": 6017,
      "name": "invalidProposalStatus",
      "msg": "Invalid proposal status"
    },
    {
      "code": 6018,
      "name": "invalidStakeAmount",
      "msg": "Invalid stake amount"
    },
    {
      "code": 6019,
      "name": "invalidUnlockedStakeAmount",
      "msg": "Invalid unlocked stake amount"
    },
    {
      "code": 6020,
      "name": "invalidThreshold",
      "msg": "Invalid Threshold"
    },
    {
      "code": 6021,
      "name": "invalidRequiredTime",
      "msg": "Invalid Required Time"
    },
    {
      "code": 6022,
      "name": "invalidVoteType",
      "msg": "Invalid Vote Type"
    },
    {
      "code": 6023,
      "name": "singleChoice",
      "msg": "alreadyVoted"
    },
    {
      "code": 6024,
      "name": "invalidChoicesAmount",
      "msg": "Invalid choices amount"
    },
    {
      "code": 6025,
      "name": "invalidChoice",
      "msg": "Invalid choice"
    },
    {
      "code": 6026,
      "name": "invalidAllowSubDao",
      "msg": "Subdao Disabled"
    },
    {
      "code": 6027,
      "name": "invalidDaoType",
      "msg": "invalidDaoType"
    },
    {
      "code": 6028,
      "name": "collectionNotSet",
      "msg": "Collection not set"
    },
    {
      "code": 6029,
      "name": "invalidCollection",
      "msg": "Invalid Collection"
    },
    {
      "code": 6030,
      "name": "unauthorizedSigner",
      "msg": "Unauthorized Signer"
    },
    {
      "code": 6031,
      "name": "invalidConfiguration",
      "msg": "Invalid Configuration"
    },
    {
      "code": 6032,
      "name": "wrongAdmin",
      "msg": "Wrong Admin"
    },
    {
      "code": 6033,
      "name": "invalidInstructionIndex",
      "msg": "invalidInstructionIndex"
    },
    {
      "code": 6034,
      "name": "programMismatch",
      "msg": "programMismatch"
    }
  ],
  "types": [
    {
      "name": "createDaoEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "daoCreator",
            "type": "pubkey"
          },
          {
            "name": "daoId",
            "type": "u64"
          },
          {
            "name": "daoConfig",
            "type": "pubkey"
          },
          {
            "name": "proposalConfig",
            "type": "pubkey"
          },
          {
            "name": "isSubDao",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "daoConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "seed",
            "type": "u64"
          },
          {
            "name": "configBump",
            "type": "u8"
          },
          {
            "name": "treasuryBump",
            "type": "u8"
          },
          {
            "name": "isHybrid",
            "type": "bool"
          },
          {
            "name": "collectionMint",
            "type": {
              "option": "pubkey"
            }
          },
          {
            "name": "mint",
            "type": {
              "option": "pubkey"
            }
          },
          {
            "name": "circulatingSupply",
            "type": "u64"
          },
          {
            "name": "allowSubDao",
            "type": "bool"
          },
          {
            "name": "thresholdCreateSubdao",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "subdaoFee",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "vetoCouncil",
            "type": "pubkey"
          },
          {
            "name": "governanceProgram",
            "type": "pubkey"
          },
          {
            "name": "stakingProgram",
            "type": "pubkey"
          },
          {
            "name": "isSubDao",
            "type": "bool"
          },
          {
            "name": "daoConfigKey",
            "type": "pubkey"
          },
          {
            "name": "daoTreasury",
            "type": "pubkey"
          }
        ]
      }
    }
  ]
};
