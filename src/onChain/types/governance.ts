/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/governance.json`.
 */
export type Governance = {
  "address": "A3bq5ABJ2npx7t82K9AyhXT2Cd2P3g5R2gks3CkL1bnS",
  "metadata": {
    "name": "governance",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "cleanupProposal",
      "discriminator": [
        181,
        244,
        237,
        139,
        133,
        155,
        102,
        216
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "payee",
          "writable": true
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
                "kind": "account",
                "path": "config"
              },
              {
                "kind": "account",
                "path": "proposal.id",
                "account": "proposal"
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
                "kind": "account",
                "path": "config.seed",
                "account": "daoConfig"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                212,
                163,
                198,
                132,
                83,
                186,
                149,
                217,
                72,
                27,
                113,
                77,
                3,
                58,
                153,
                167,
                121,
                74,
                80,
                15,
                206,
                155,
                14,
                57,
                153,
                170,
                51,
                102,
                58,
                111,
                134,
                177
              ]
            }
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
            ],
            "program": {
              "kind": "const",
              "value": [
                212,
                163,
                198,
                132,
                83,
                186,
                149,
                217,
                72,
                27,
                113,
                77,
                3,
                58,
                153,
                167,
                121,
                74,
                80,
                15,
                206,
                155,
                14,
                57,
                153,
                170,
                51,
                102,
                58,
                111,
                134,
                177
              ]
            }
          }
        },
        {
          "name": "coreProgram",
          "address": "FK4GzgwHvmHz9yFWL8nzEkXgA2sc3vPimRJiwver64Y8"
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
      "args": []
    },
    {
      "name": "cleanupVote",
      "discriminator": [
        64,
        230,
        248,
        15,
        247,
        114,
        249,
        202
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "vote",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  111,
                  116,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "account",
                "path": "proposal"
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
                "kind": "account",
                "path": "config"
              },
              {
                "kind": "account",
                "path": "proposal.id",
                "account": "proposal"
              }
            ]
          }
        },
        {
          "name": "stakingProgram",
          "address": "5ER7DVPftAuJ5DMz1mdrFC5VXQSo2zJZqv1H7GtpebK1",
          "relations": [
            "config"
          ]
        },
        {
          "name": "stakeState",
          "writable": true,
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
            ],
            "program": {
              "kind": "const",
              "value": [
                212,
                163,
                198,
                132,
                83,
                186,
                149,
                217,
                72,
                27,
                113,
                77,
                3,
                58,
                153,
                167,
                121,
                74,
                80,
                15,
                206,
                155,
                14,
                57,
                153,
                170,
                51,
                102,
                58,
                111,
                134,
                177
              ]
            }
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
            ],
            "program": {
              "kind": "const",
              "value": [
                212,
                163,
                198,
                132,
                83,
                186,
                149,
                217,
                72,
                27,
                113,
                77,
                3,
                58,
                153,
                167,
                121,
                74,
                80,
                15,
                206,
                155,
                14,
                57,
                153,
                170,
                51,
                102,
                58,
                111,
                134,
                177
              ]
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
      "args": []
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
          "name": "owner",
          "writable": true,
          "signer": true
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
                "kind": "account",
                "path": "config"
              },
              {
                "kind": "arg",
                "path": "id"
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
            ]
          }
        },
        {
          "name": "stakingProgram",
          "address": "5ER7DVPftAuJ5DMz1mdrFC5VXQSo2zJZqv1H7GtpebK1",
          "relations": [
            "config"
          ]
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
            ],
            "program": {
              "kind": "const",
              "value": [
                212,
                163,
                198,
                132,
                83,
                186,
                149,
                217,
                72,
                27,
                113,
                77,
                3,
                58,
                153,
                167,
                121,
                74,
                80,
                15,
                206,
                155,
                14,
                57,
                153,
                170,
                51,
                102,
                58,
                111,
                134,
                177
              ]
            }
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
            ],
            "program": {
              "kind": "const",
              "value": [
                212,
                163,
                198,
                132,
                83,
                186,
                149,
                217,
                72,
                27,
                113,
                77,
                3,
                58,
                153,
                167,
                121,
                74,
                80,
                15,
                206,
                155,
                14,
                57,
                153,
                170,
                51,
                102,
                58,
                111,
                134,
                177
              ]
            }
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "id",
          "type": "u64"
        },
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "uri",
          "type": "string"
        },
        {
          "name": "proposal",
          "type": {
            "defined": {
              "name": "proposalType"
            }
          }
        },
        {
          "name": "quorum",
          "type": "u8"
        },
        {
          "name": "threshold",
          "type": "u64"
        },
        {
          "name": "expiry",
          "type": "u64"
        },
        {
          "name": "choices",
          "type": "u8"
        },
        {
          "name": "analysisPeriod",
          "type": "u64"
        }
      ]
    },
    {
      "name": "executeProposal",
      "discriminator": [
        186,
        60,
        116,
        133,
        108,
        128,
        111,
        28
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "payee",
          "writable": true
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
                "kind": "account",
                "path": "config"
              },
              {
                "kind": "account",
                "path": "proposal.id",
                "account": "proposal"
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
                "kind": "account",
                "path": "config.seed",
                "account": "daoConfig"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                212,
                163,
                198,
                132,
                83,
                186,
                149,
                217,
                72,
                27,
                113,
                77,
                3,
                58,
                153,
                167,
                121,
                74,
                80,
                15,
                206,
                155,
                14,
                57,
                153,
                170,
                51,
                102,
                58,
                111,
                134,
                177
              ]
            }
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
            ],
            "program": {
              "kind": "const",
              "value": [
                212,
                163,
                198,
                132,
                83,
                186,
                149,
                217,
                72,
                27,
                113,
                77,
                3,
                58,
                153,
                167,
                121,
                74,
                80,
                15,
                206,
                155,
                14,
                57,
                153,
                170,
                51,
                102,
                58,
                111,
                134,
                177
              ]
            }
          }
        },
        {
          "name": "coreProgram",
          "address": "FK4GzgwHvmHz9yFWL8nzEkXgA2sc3vPimRJiwver64Y8"
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
      "args": []
    },
    {
      "name": "removeVote",
      "discriminator": [
        32,
        187,
        23,
        3,
        156,
        232,
        55,
        177
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "vote",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  111,
                  116,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "account",
                "path": "proposal"
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
                "kind": "account",
                "path": "config"
              },
              {
                "kind": "account",
                "path": "proposal.id",
                "account": "proposal"
              }
            ]
          }
        },
        {
          "name": "stakingProgram",
          "address": "5ER7DVPftAuJ5DMz1mdrFC5VXQSo2zJZqv1H7GtpebK1",
          "relations": [
            "config"
          ]
        },
        {
          "name": "stakeState",
          "writable": true,
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
            ],
            "program": {
              "kind": "const",
              "value": [
                212,
                163,
                198,
                132,
                83,
                186,
                149,
                217,
                72,
                27,
                113,
                77,
                3,
                58,
                153,
                167,
                121,
                74,
                80,
                15,
                206,
                155,
                14,
                57,
                153,
                170,
                51,
                102,
                58,
                111,
                134,
                177
              ]
            }
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
            ],
            "program": {
              "kind": "const",
              "value": [
                212,
                163,
                198,
                132,
                83,
                186,
                149,
                217,
                72,
                27,
                113,
                77,
                3,
                58,
                153,
                167,
                121,
                74,
                80,
                15,
                206,
                155,
                14,
                57,
                153,
                170,
                51,
                102,
                58,
                111,
                134,
                177
              ]
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
      "args": []
    },
    {
      "name": "setCfg",
      "discriminator": [
        232,
        250,
        215,
        251,
        229,
        253,
        170,
        18
      ],
      "accounts": [
        {
          "name": "initializer",
          "writable": true,
          "signer": true
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
            ]
          }
        },
        {
          "name": "config"
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
          "name": "thresholdCreateProposals",
          "type": "u64"
        }
      ]
    },
    {
      "name": "vetoCancelProposal",
      "discriminator": [
        182,
        93,
        33,
        104,
        36,
        249,
        143,
        170
      ],
      "accounts": [
        {
          "name": "vetoCouncil",
          "writable": true,
          "signer": true,
          "relations": [
            "config"
          ]
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
                "kind": "account",
                "path": "config"
              },
              {
                "kind": "account",
                "path": "proposal.id",
                "account": "proposal"
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
            ],
            "program": {
              "kind": "const",
              "value": [
                212,
                163,
                198,
                132,
                83,
                186,
                149,
                217,
                72,
                27,
                113,
                77,
                3,
                58,
                153,
                167,
                121,
                74,
                80,
                15,
                206,
                155,
                14,
                57,
                153,
                170,
                51,
                102,
                58,
                111,
                134,
                177
              ]
            }
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
            ],
            "program": {
              "kind": "const",
              "value": [
                212,
                163,
                198,
                132,
                83,
                186,
                149,
                217,
                72,
                27,
                113,
                77,
                3,
                58,
                153,
                167,
                121,
                74,
                80,
                15,
                206,
                155,
                14,
                57,
                153,
                170,
                51,
                102,
                58,
                111,
                134,
                177
              ]
            }
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "vote",
      "discriminator": [
        227,
        110,
        155,
        23,
        136,
        126,
        172,
        25
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "vote",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  111,
                  116,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "account",
                "path": "proposal"
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
                "kind": "account",
                "path": "config"
              },
              {
                "kind": "account",
                "path": "proposal.id",
                "account": "proposal"
              }
            ]
          }
        },
        {
          "name": "stakingProgram",
          "address": "5ER7DVPftAuJ5DMz1mdrFC5VXQSo2zJZqv1H7GtpebK1",
          "relations": [
            "config"
          ]
        },
        {
          "name": "stakeState",
          "writable": true,
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
            ],
            "program": {
              "kind": "const",
              "value": [
                212,
                163,
                198,
                132,
                83,
                186,
                149,
                217,
                72,
                27,
                113,
                77,
                3,
                58,
                153,
                167,
                121,
                74,
                80,
                15,
                206,
                155,
                14,
                57,
                153,
                170,
                51,
                102,
                58,
                111,
                134,
                177
              ]
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
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "choice",
          "type": "u8"
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
    },
    {
      "name": "proposalConfig",
      "discriminator": [
        6,
        201,
        56,
        255,
        231,
        89,
        34,
        27
      ]
    },
    {
      "name": "stakeState",
      "discriminator": [
        108,
        10,
        236,
        72,
        1,
        88,
        133,
        92
      ]
    },
    {
      "name": "voteState",
      "discriminator": [
        100,
        177,
        100,
        106,
        158,
        188,
        195,
        137
      ]
    }
  ],
  "events": [
    {
      "name": "createProposalEvent",
      "discriminator": [
        53,
        59,
        88,
        200,
        122,
        209,
        79,
        73
      ]
    },
    {
      "name": "executeProposalEvent",
      "discriminator": [
        153,
        12,
        41,
        73,
        206,
        114,
        248,
        233
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
      "name": "insufficientStake",
      "msg": "Insufficient stake"
    },
    {
      "code": 6008,
      "name": "invalidName",
      "msg": "Invalid name"
    },
    {
      "code": 6009,
      "name": "invalidGist",
      "msg": "Invalid gist"
    },
    {
      "code": 6010,
      "name": "invalidProposalSeed",
      "msg": "Invalid proposal seed"
    },
    {
      "code": 6011,
      "name": "invalidQuorum",
      "msg": "Invalid quorum"
    },
    {
      "code": 6012,
      "name": "invalidExpiry",
      "msg": "Invalid expiry"
    },
    {
      "code": 6013,
      "name": "proposalClosed",
      "msg": "Proposal closed"
    },
    {
      "code": 6014,
      "name": "invalidVoteAmount",
      "msg": "You can't vote 0!"
    },
    {
      "code": 6015,
      "name": "invalidProposalStatus",
      "msg": "Invalid proposal status"
    },
    {
      "code": 6016,
      "name": "invalidStakeAmount",
      "msg": "Invalid stake amount"
    },
    {
      "code": 6017,
      "name": "invalidThreshold",
      "msg": "Invalid Threshold"
    },
    {
      "code": 6018,
      "name": "invalidRequiredTime",
      "msg": "Invalid Required Time"
    },
    {
      "code": 6019,
      "name": "invalidVoteType",
      "msg": "Invalid Vote Type"
    },
    {
      "code": 6020,
      "name": "singleChoice",
      "msg": "alreadyVoted"
    },
    {
      "code": 6021,
      "name": "invalidChoicesAmount",
      "msg": "Invalid choices amount"
    },
    {
      "code": 6022,
      "name": "invalidChoice",
      "msg": "Invalid choice"
    },
    {
      "code": 6023,
      "name": "collectionNotSet",
      "msg": "Collection not set"
    },
    {
      "code": 6024,
      "name": "invalidCollection",
      "msg": "Invalid Collection"
    },
    {
      "code": 6025,
      "name": "wrongSigner",
      "msg": "Wrong Signer"
    },
    {
      "code": 6026,
      "name": "lockedToken",
      "msg": "Locked tockens"
    },
    {
      "code": 6027,
      "name": "invalidEvaluationPeriod",
      "msg": "Invalid evaluation_phase_period"
    },
    {
      "code": 6028,
      "name": "invalidEpoch",
      "msg": "Invalid epchj"
    },
    {
      "code": 6029,
      "name": "invalidInstructionIndex",
      "msg": "invalidInstructionIndex"
    },
    {
      "code": 6030,
      "name": "programMismatch",
      "msg": "programMismatch"
    },
    {
      "code": 6031,
      "name": "proposalTie",
      "msg": "Proposal 2 choices with the same MAX AMOUNT"
    }
  ],
  "types": [
    {
      "name": "createProposalEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "daoId",
            "type": "pubkey"
          },
          {
            "name": "proposalCreator",
            "type": "pubkey"
          },
          {
            "name": "proposalId",
            "type": "u64"
          },
          {
            "name": "proposalType",
            "type": {
              "defined": {
                "name": "proposalType"
              }
            }
          },
          {
            "name": "proposalQuorum",
            "type": "u8"
          },
          {
            "name": "proposalThreshold",
            "type": "u64"
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
    },
    {
      "name": "executableProposal",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "setProposalFeeBounty",
            "fields": [
              "u64"
            ]
          },
          {
            "name": "setProposalFeeExecutable",
            "fields": [
              "u64"
            ]
          },
          {
            "name": "setProposalFeeVote",
            "fields": [
              "u64"
            ]
          },
          {
            "name": "setProposalFeeVoteMultiple",
            "fields": [
              "u64"
            ]
          },
          {
            "name": "setMaxExpiry",
            "fields": [
              "u64"
            ]
          },
          {
            "name": "setThreshold",
            "fields": [
              "u64"
            ]
          },
          {
            "name": "setQuorum",
            "fields": [
              "u8"
            ]
          },
          {
            "name": "setAnalysisPeriod",
            "fields": [
              "u64"
            ]
          },
          {
            "name": "setThresholdCreateProposals",
            "fields": [
              "u64"
            ]
          },
          {
            "name": "setAllowSubdao",
            "fields": [
              "bool",
              {
                "option": "u64"
              },
              {
                "option": "u64"
              }
            ]
          },
          {
            "name": "setVetoCouncil",
            "fields": [
              "pubkey"
            ]
          }
        ]
      }
    },
    {
      "name": "executeProposalEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "daoId",
            "type": "pubkey"
          },
          {
            "name": "proposalId",
            "type": "u64"
          },
          {
            "name": "proposalType",
            "type": {
              "defined": {
                "name": "proposalType"
              }
            }
          },
          {
            "name": "proposalResult",
            "type": {
              "defined": {
                "name": "proposalStatus"
              }
            }
          },
          {
            "name": "proposalVotes",
            "type": "u64"
          },
          {
            "name": "proposalQuorum",
            "type": "u8"
          },
          {
            "name": "proposalThreshold",
            "type": "u64"
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
            "name": "id",
            "type": "u64"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "uri",
            "type": "string"
          },
          {
            "name": "proposal",
            "type": {
              "defined": {
                "name": "proposalType"
              }
            }
          },
          {
            "name": "result",
            "type": {
              "defined": {
                "name": "proposalStatus"
              }
            }
          },
          {
            "name": "quorum",
            "type": "u8"
          },
          {
            "name": "threshold",
            "type": "u64"
          },
          {
            "name": "votes",
            "type": "u64"
          },
          {
            "name": "expiry",
            "type": "u64"
          },
          {
            "name": "choices",
            "type": "u8"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "createdTime",
            "type": "u64"
          },
          {
            "name": "voteCounts",
            "type": {
              "vec": "u64"
            }
          },
          {
            "name": "analysisPeriod",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "proposalConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "proposalCount",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
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
            "name": "quorumUpdated",
            "type": "u64"
          },
          {
            "name": "nQuorumEpoch",
            "type": "u8"
          },
          {
            "name": "thresholdCreateProposal",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "proposalStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "analysisPhase"
          },
          {
            "name": "open"
          },
          {
            "name": "succeeded"
          },
          {
            "name": "failed"
          },
          {
            "name": "canceled"
          }
        ]
      }
    },
    {
      "name": "proposalType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "voteMultipleChoice"
          },
          {
            "name": "bounty",
            "fields": [
              "pubkey",
              "u64"
            ]
          },
          {
            "name": "vote"
          },
          {
            "name": "executable",
            "fields": [
              {
                "defined": {
                  "name": "executableProposal"
                }
              }
            ]
          }
        ]
      }
    },
    {
      "name": "stakeState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "lockedAmount",
            "type": "u64"
          },
          {
            "name": "accounts",
            "type": "u64"
          },
          {
            "name": "updated",
            "type": "u64"
          },
          {
            "name": "vaultBump",
            "type": "u8"
          },
          {
            "name": "authBump",
            "type": "u8"
          },
          {
            "name": "stateBump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "voteState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "choice",
            "type": "u8"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ]
};
