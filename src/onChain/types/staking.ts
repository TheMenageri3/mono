/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/staking.json`.
 */
export type Staking = {
  "address": "5ER7DVPftAuJ5DMz1mdrFC5VXQSo2zJZqv1H7GtpebK1",
  "metadata": {
    "name": "staking",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "addAccount",
      "discriminator": [
        227,
        172,
        252,
        3,
        38,
        209,
        9,
        232
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true,
          "relations": [
            "stakeState"
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
          "name": "instructions",
          "address": "Sysvar1nstructions1111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "checkState",
      "discriminator": [
        84,
        106,
        165,
        229,
        16,
        88,
        102,
        7
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true,
          "relations": [
            "stakeState"
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
          "name": "instructions",
          "address": "Sysvar1nstructions1111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "closeStake",
      "discriminator": [
        92,
        229,
        76,
        76,
        25,
        26,
        189,
        239
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true,
          "relations": [
            "stakeState"
          ]
        },
        {
          "name": "stakeAta",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "config"
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ]
          }
        },
        {
          "name": "stakeAuth",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  117,
                  116,
                  104
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
            ]
          }
        },
        {
          "name": "mint"
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
          "name": "tokenProgram"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "closeStakeNftState",
      "discriminator": [
        54,
        208,
        95,
        88,
        40,
        142,
        202,
        158
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true,
          "relations": [
            "stakeState"
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
      "name": "closeStakeNftSubDaoState",
      "discriminator": [
        216,
        115,
        136,
        77,
        115,
        151,
        84,
        11
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true,
          "relations": [
            "stakeState"
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
                "path": "configSubDao"
              },
              {
                "kind": "account",
                "path": "owner"
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
          "name": "configSubDao",
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
                "path": "config_sub_dao.seed",
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
        }
      ],
      "args": []
    },
    {
      "name": "closeStakeSubDao",
      "discriminator": [
        15,
        126,
        107,
        190,
        43,
        88,
        25,
        4
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true,
          "relations": [
            "stakeState"
          ]
        },
        {
          "name": "stakeAta",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "configSubDao"
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ]
          }
        },
        {
          "name": "stakeAuth",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  117,
                  116,
                  104
                ]
              },
              {
                "kind": "account",
                "path": "configSubDao"
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "mint"
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
                "path": "configSubDao"
              },
              {
                "kind": "account",
                "path": "owner"
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
          "name": "configSubDao",
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
                "path": "config_sub_dao.seed",
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
          "name": "tokenProgram"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "initStake",
      "discriminator": [
        177,
        156,
        4,
        57,
        220,
        174,
        174,
        155
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "ownerAta",
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "stakeAta",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "config"
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ]
          }
        },
        {
          "name": "stakeAuth",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  117,
                  116,
                  104
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
            ]
          }
        },
        {
          "name": "mint"
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
          "name": "tokenProgram"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "initStakeNft",
      "discriminator": [
        115,
        4,
        17,
        174,
        29,
        68,
        80,
        50
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "ownerAta",
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "nft"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "collection"
        },
        {
          "name": "nft"
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
          "name": "metadata",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "account",
                "path": "metadataProgram"
              },
              {
                "kind": "account",
                "path": "nft"
              }
            ],
            "program": {
              "kind": "account",
              "path": "metadataProgram"
            }
          }
        },
        {
          "name": "masterEdition",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "account",
                "path": "metadataProgram"
              },
              {
                "kind": "account",
                "path": "nft"
              },
              {
                "kind": "const",
                "value": [
                  101,
                  100,
                  105,
                  116,
                  105,
                  111,
                  110
                ]
              }
            ],
            "program": {
              "kind": "account",
              "path": "metadataProgram"
            }
          }
        },
        {
          "name": "metadataProgram",
          "address": "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "removeAccount",
      "discriminator": [
        125,
        160,
        255,
        178,
        200,
        184,
        157,
        76
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true,
          "relations": [
            "stakeState"
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
          "name": "instructions",
          "address": "Sysvar1nstructions1111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "stakeNft",
      "discriminator": [
        38,
        27,
        66,
        46,
        69,
        65,
        151,
        219
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true,
          "relations": [
            "stakeState"
          ]
        },
        {
          "name": "ownerAta",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "nft"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "collection"
        },
        {
          "name": "nft"
        },
        {
          "name": "metadata",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "account",
                "path": "metadataProgram"
              },
              {
                "kind": "account",
                "path": "nft"
              }
            ],
            "program": {
              "kind": "account",
              "path": "metadataProgram"
            }
          }
        },
        {
          "name": "masterEdition",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "account",
                "path": "metadataProgram"
              },
              {
                "kind": "account",
                "path": "nft"
              },
              {
                "kind": "const",
                "value": [
                  101,
                  100,
                  105,
                  116,
                  105,
                  111,
                  110
                ]
              }
            ],
            "program": {
              "kind": "account",
              "path": "metadataProgram"
            }
          }
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
          "name": "metadataProgram",
          "address": "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "stakeTokens",
      "discriminator": [
        136,
        126,
        91,
        162,
        40,
        131,
        13,
        127
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true,
          "relations": [
            "stakeState"
          ]
        },
        {
          "name": "ownerAta",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "stakeAta",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "config"
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ]
          }
        },
        {
          "name": "stakeAuth",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  117,
                  116,
                  104
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
            ]
          }
        },
        {
          "name": "mint"
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
          "name": "tokenProgram"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "unstakeNft",
      "discriminator": [
        17,
        182,
        24,
        211,
        101,
        138,
        50,
        163
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true,
          "relations": [
            "stakeState"
          ]
        },
        {
          "name": "ownerAta",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "nft"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "collection"
        },
        {
          "name": "nft"
        },
        {
          "name": "metadata",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "account",
                "path": "metadataProgram"
              },
              {
                "kind": "account",
                "path": "nft"
              }
            ],
            "program": {
              "kind": "account",
              "path": "metadataProgram"
            }
          }
        },
        {
          "name": "masterEdition",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "account",
                "path": "metadataProgram"
              },
              {
                "kind": "account",
                "path": "nft"
              },
              {
                "kind": "const",
                "value": [
                  101,
                  100,
                  105,
                  116,
                  105,
                  111,
                  110
                ]
              }
            ],
            "program": {
              "kind": "account",
              "path": "metadataProgram"
            }
          }
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
          "name": "metadataProgram",
          "address": "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "unstakeTokens",
      "discriminator": [
        58,
        119,
        215,
        143,
        203,
        223,
        32,
        86
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true,
          "relations": [
            "stakeState"
          ]
        },
        {
          "name": "ownerAta",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "stakeAta",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "config"
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ]
          }
        },
        {
          "name": "stakeAuth",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  117,
                  116,
                  104
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
            ]
          }
        },
        {
          "name": "mint"
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
          "name": "tokenProgram"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
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
      "name": "underflowLockedAmount",
      "msg": "Underflow Locked Amount"
    },
    {
      "code": 6005,
      "name": "accountsOpen",
      "msg": "You can't unstake with open accounts"
    },
    {
      "code": 6006,
      "name": "expired",
      "msg": "Proposal expired"
    },
    {
      "code": 6007,
      "name": "invalidSlot",
      "msg": "Invalid slot"
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
      "name": "proposalClosed",
      "msg": "Proposal closed"
    },
    {
      "code": 6015,
      "name": "invalidVoteAmount",
      "msg": "You can't vote 0!"
    },
    {
      "code": 6016,
      "name": "invalidProposalStatus",
      "msg": "Invalid proposal status"
    },
    {
      "code": 6017,
      "name": "invalidStakeAmount",
      "msg": "Invalid stake amount"
    },
    {
      "code": 6018,
      "name": "invalidThreshold",
      "msg": "Invalid Threshold"
    },
    {
      "code": 6019,
      "name": "invalidRequiredTime",
      "msg": "Invalid Required Time"
    },
    {
      "code": 6020,
      "name": "invalidVoteType",
      "msg": "Invalid Vote Type"
    },
    {
      "code": 6021,
      "name": "singleChoice",
      "msg": "alreadyVoted"
    },
    {
      "code": 6022,
      "name": "invalidChoicesAmount",
      "msg": "Invalid choices amount"
    },
    {
      "code": 6023,
      "name": "invalidChoice",
      "msg": "Invalid choice"
    },
    {
      "code": 6024,
      "name": "collectionNotSet",
      "msg": "Collection not set"
    },
    {
      "code": 6025,
      "name": "invalidCollection",
      "msg": "Invalid Collection"
    },
    {
      "code": 6026,
      "name": "lockedToken",
      "msg": "Locked tockens"
    },
    {
      "code": 6027,
      "name": "invalidDaoType",
      "msg": "Invalid Dao Type"
    },
    {
      "code": 6028,
      "name": "invalidInstructionIndex",
      "msg": "invalidInstructionIndex"
    },
    {
      "code": 6029,
      "name": "programMismatch",
      "msg": "programMismatch"
    },
    {
      "code": 6030,
      "name": "invalidStakeDao",
      "msg": "InvalidStake - You are a SUBDAO"
    }
  ],
  "types": [
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
    }
  ]
};
