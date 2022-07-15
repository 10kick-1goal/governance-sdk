import { AccountMetaData } from '../accounts/AccountMetaData';
import * as models from '../accounts/models/index';
import { PROGRAM_VERSION_V1, ProgramVersion } from '../constants';
import { args, configs } from '../instructions/index';
import { InstructionData } from '../instructions/InstructionData';
import { MintMaxVoteWeightSource } from '../mint/MintMaxVoteWeightSource';
import { ProposalOption } from '../proposal/ProposalOption';
import { RealmConfig } from '../realm/RealmConfig';
import { VoteChoice } from '../vote/VoteChoice';
import { VoteWeight } from '../vote/VoteWeight';

type StructClass = new (...args: any[]) => any;

export function createGovernanceSchema(programVersion: ProgramVersion) {
  return new Map<StructClass, any>([
    [
      AccountMetaData,
      {
        kind: 'struct',
        fields: [
          ['pubkey', 'pubkey'],
          ['isSigner', 'u8'],
          ['isWritable', 'u8'],
        ],
      },
    ],
    [
      InstructionData,
      {
        kind: 'struct',
        fields: [
          ['programId', 'pubkey'],
          ['accounts', [AccountMetaData]],
          ['data', ['u8']],
        ],
      },
    ],
    [
      MintMaxVoteWeightSource,
      {
        kind: 'struct',
        fields: [
          ['type', 'u8'],
          ['value', 'u64'],
        ],
      },
    ],
    [
      ProposalOption,
      {
        kind: 'struct',
        fields: [
          ['label', 'string'],
          ['voteWeight', 'u64'],
          ['voteResult', 'u8'],
          ['transactionsExecutedCount', 'u16'],
          ['transactionsCount', 'u16'],
          ['transactionsNextIndex', 'u16'],
        ],
      },
    ],
    [
      RealmConfig,
      {
        kind: 'struct',
        fields: [
          ['useCommunityVoterWeightAddin', 'u8'],
          ['useMaxCommunityVoterWeightAddin', 'u8'],
          ['reserved', [6]],
          ['minCommunityTokensToCreateGovernance', 'u64'],
          ['communityMintMaxVoteWeightSource', MintMaxVoteWeightSource],
          ['councilMint', { kind: 'option', type: 'pubkey' }],
        ],
      },
    ],
    [
      VoteChoice,
      {
        kind: 'struct',
        fields: [
          ['rank', 'u8'],
          ['weightPercentage', 'u8'],
        ],
      },
    ],
    [
      VoteWeight,
      {
        kind: 'enum',
        values: [
          ['yes', 'u64'],
          ['no', 'u64'],
        ],
      },
    ],
    [
      args.AddSignatory,
      {
        kind: 'struct',
        fields: [
          ['instruction', 'u8'],
          ['signatory', 'pubkey'],
        ],
      },
    ],
    [
      args.CancelProposal,
      {
        kind: 'struct',
        fields: [['instruction', 'u8']],
      },
    ],
    [
      args.CastVote,
      {
        kind: 'struct',
        fields: [
          ['instruction', 'u8'],
          programVersion === PROGRAM_VERSION_V1 ? ['yesNoVote', 'u8'] : ['vote', 'vote'],
        ],
      },
    ],
    [
      args.CreateGovernance,
      {
        kind: 'struct',
        fields: [
          ['instruction', 'u8'],
          ['config', configs.Governance],
        ],
      },
    ],
    [
      args.CreateMintGovernance,
      {
        kind: 'struct',
        fields: [
          ['instruction', 'u8'],
          ['config', configs.Governance],
          ['transferMintAuthorities', 'u8'],
        ],
      },
    ],
    [
      args.CreateNativeTreasury,
      {
        kind: 'struct',
        fields: [['instruction', 'u8']],
      },
    ],
    [
      args.CreateProgramGovernance,
      {
        kind: 'struct',
        fields: [
          ['instruction', 'u8'],
          ['config', configs.Governance],
          ['transferUpgradeAuthority', 'u8'],
        ],
      },
    ],
    [
      args.CreateProposal,
      {
        kind: 'struct',
        fields: [
          ['instruction', 'u8'],
          ['name', 'string'],
          ['descriptionLink', 'string'],

          ...(programVersion === PROGRAM_VERSION_V1
            ? [['governingTokenMint', 'pubkey']]
            : [
                ['voteType', 'voteType'],
                ['options', ['string']],
                ['useDenyOption', 'u8'],
              ]),
        ],
      },
    ],
    [
      args.CreateRealm,
      {
        kind: 'struct',
        fields: [
          ['instruction', 'u8'],
          ['name', 'string'],
          ['configArgs', configs.Realm],
        ],
      },
    ],
    [
      args.CreateTokenGovernance,
      {
        kind: 'struct',
        fields: [
          ['instruction', 'u8'],
          ['config', configs.Governance],
          ['transferTokenOwner', 'u8'],
        ],
      },
    ],
    [
      args.CreateTokenOwnerRecord,
      {
        kind: 'struct',
        fields: [['instruction', 'u8']],
      },
    ],
    [
      args.DepositGoverningTokens,
      {
        kind: 'struct',
        fields: [
          ['instruction', 'u8'],
          // V1 of the program used restrictive instruction deserialisation which didn't allow additional data
          programVersion > PROGRAM_VERSION_V1 ? ['amount', 'u64'] : undefined,
        ].filter(Boolean),
      },
    ],
    [
      args.ExecuteTransaction,
      {
        kind: 'struct',
        fields: [['instruction', 'u8']],
      },
    ],
    [
      args.FinalizeVote,
      {
        kind: 'struct',
        fields: [['instruction', 'u8']],
      },
    ],
    [
      args.FlagTransactionError,
      {
        kind: 'struct',
        fields: [['instruction', 'u8']],
      },
    ],
    [
      args.InsertTransaction,
      {
        kind: 'struct',
        fields: [
          ['instruction', 'u8'],
          programVersion > PROGRAM_VERSION_V1 ? ['optionIndex', 'u8'] : undefined,
          ['index', 'u16'],
          ['holdUpTime', 'u32'],

          programVersion > PROGRAM_VERSION_V1
            ? ['instructions', [InstructionData]]
            : ['instructionData', InstructionData],
        ].filter(Boolean),
      },
    ],
    [
      args.RelinquishVote,
      {
        kind: 'struct',
        fields: [['instruction', 'u8']],
      },
    ],
    [
      args.RemoveTransaction,
      {
        kind: 'struct',
        fields: [['instruction', 'u8']],
      },
    ],
    [
      args.SetGovernanceConfig,
      {
        kind: 'struct',
        fields: [
          ['instruction', 'u8'],
          ['config', configs.Governance],
        ],
      },
    ],
    [
      args.SetGovernanceDelegate,
      {
        kind: 'struct',
        fields: [
          ['instruction', 'u8'],
          ['newGovernanceDelegate', { kind: 'option', type: 'pubkey' }],
        ],
      },
    ],
    [
      args.SetRealmAuthority,
      {
        kind: 'struct',
        fields: [
          ['instruction', 'u8'],
          ...(programVersion === PROGRAM_VERSION_V1
            ? [['newRealmAuthority', { kind: 'option', type: 'pubkey' }]]
            : [['action', 'u8']]),
        ],
      },
    ],
    [
      args.SetRealmConfig,
      {
        kind: 'struct',
        fields: [
          ['instruction', 'u8'],
          ['configArgs', configs.Realm],
        ],
      },
    ],
    [
      args.SignOffProposal,
      {
        kind: 'struct',
        fields: [['instruction', 'u8']],
      },
    ],
    [
      args.UpdateProgramMetadata,
      {
        kind: 'struct',
        fields: [['instruction', 'u8']],
      },
    ],
    [
      args.WithdrawGoverningTokens,
      {
        kind: 'struct',
        fields: [['instruction', 'u8']],
      },
    ],
    [
      configs.Governance,
      {
        kind: 'struct',
        fields: [
          ['communityVoteThreshold', 'VoteThreshold'],
          ['minCommunityTokensToCreateProposal', 'u64'],
          ['minInstructionHoldUpTime', 'u32'],
          ['maxVotingTime', 'u32'],
          ['voteTipping', 'u8'],
          ['councilVoteThreshold', 'VoteThreshold'],
          ['reserved', [2]],
          ['minCouncilTokensToCreateProposal', 'u64'],
        ],
      },
    ],
    [
      configs.Realm,
      {
        kind: 'struct',
        fields: [
          ['useCouncilMint', 'u8'],
          ['minCommunityTokensToCreateGovernance', 'u64'],
          ['communityMintMaxVoteWeightSource', MintMaxVoteWeightSource],
          // V1 of the program used restrictive instruction deserialisation which didn't allow additional data
          ...(programVersion > PROGRAM_VERSION_V1
            ? [
                ['useCommunityVoterWeightAddin', 'u8'],
                ['useMaxCommunityVoterWeightAddin', 'u8'],
              ]
            : []),
        ],
      },
    ],
    [
      models.Governance,
      {
        kind: 'struct',
        fields: [
          ['accountType', 'u8'],
          ['realm', 'pubkey'],
          ['governedAccount', 'pubkey'],
          ['proposalCount', 'u32'],
          ['config', configs.Governance],
          ['reserved', [6]],
          ['votingProposalCount', 'u16'],
        ],
      },
    ],
    [
      models.ProgramMetadata,
      {
        kind: 'struct',
        fields: [
          ['accountType', 'u8'],
          ['updatedAt', 'u64'],
          ['version', 'string'],
          ['reserved', [64]],
        ],
      },
    ],
    [
      models.Proposal,
      {
        kind: 'struct',
        fields: [
          ['accountType', 'u8'],
          ['governance', 'pubkey'],
          ['governingTokenMint', 'pubkey'],
          ['state', 'u8'],
          ['tokenOwnerRecord', 'pubkey'],
          ['signatoriesCount', 'u8'],
          ['signatoriesSignedOffCount', 'u8'],

          ...(programVersion === PROGRAM_VERSION_V1
            ? [
                ['yesVotesCount', 'u64'],
                ['noVotesCount', 'u64'],
                ['instructionsExecutedCount', 'u16'],
                ['instructionsCount', 'u16'],
                ['instructionsNextIndex', 'u16'],
              ]
            : [
                ['voteType', 'voteType'],
                ['options', [ProposalOption]],
                ['denyVoteWeight', { kind: 'option', type: 'u64' }],
                ['vetoVoteWeight', { kind: 'option', type: 'u64' }],
                ['abstainVoteWeight', { kind: 'option', type: 'u64' }],
                ['startVotingAt', { kind: 'option', type: 'u64' }],
              ]),

          ['draftAt', 'u64'],
          ['signingOffAt', { kind: 'option', type: 'u64' }],
          ['votingAt', { kind: 'option', type: 'u64' }],
          ['votingAtSlot', { kind: 'option', type: 'u64' }],
          ['votingCompletedAt', { kind: 'option', type: 'u64' }],
          ['executingAt', { kind: 'option', type: 'u64' }],
          ['closedAt', { kind: 'option', type: 'u64' }],
          ['executionFlags', 'u8'],
          ['maxVoteWeight', { kind: 'option', type: 'u64' }],

          ...(programVersion === PROGRAM_VERSION_V1
            ? []
            : [['maxVotingTime', { kind: 'option', type: 'u32' }]]),

          ['voteThreshold', { kind: 'option', type: 'VoteThreshold' }],

          ...(programVersion === PROGRAM_VERSION_V1 ? [] : [['reserved', [64]]]),

          ['name', 'string'],
          ['descriptionLink', 'string'],
        ],
      },
    ],
    [
      models.ProposalTransaction,
      {
        kind: 'struct',
        fields: [
          ['accountType', 'u8'],
          ['proposal', 'pubkey'],
          programVersion > PROGRAM_VERSION_V1 ? ['optionIndex', 'u8'] : undefined,
          ['instructionIndex', 'u16'],
          ['holdUpTime', 'u32'],
          programVersion > PROGRAM_VERSION_V1
            ? ['instructions', [InstructionData]]
            : ['instruction', InstructionData],
          ['executedAt', { kind: 'option', type: 'u64' }],
          ['executionStatus', 'u8'],
        ].filter(Boolean),
      },
    ],
    [
      models.Realm,
      {
        kind: 'struct',
        fields: [
          ['accountType', 'u8'],
          ['communityMint', 'pubkey'],
          ['config', RealmConfig],
          ['reserved', [6]],
          ['votingProposalCount', 'u16'],
          ['authority', { kind: 'option', type: 'pubkey' }],
          ['name', 'string'],
        ],
      },
    ],
    [
      models.RealmConfig,
      {
        kind: 'struct',
        fields: [
          ['accountType', 'u8'],
          ['realm', 'pubkey'],
          ['communityVoterWeightAddin', { kind: 'option', type: 'pubkey' }],
          ['maxCommunityVoterWeightAddin', { kind: 'option', type: 'pubkey' }],
        ],
      },
    ],
    [
      models.SignatoryRecord,
      {
        kind: 'struct',
        fields: [
          ['accountType', 'u8'],
          ['proposal', 'pubkey'],
          ['signatory', 'pubkey'],
          ['signedOff', 'u8'],
        ],
      },
    ],
    [
      models.TokenOwnerRecord,
      {
        kind: 'struct',
        fields: [
          ['accountType', 'u8'],
          ['realm', 'pubkey'],
          ['governingTokenMint', 'pubkey'],
          ['governingTokenOwner', 'pubkey'],
          ['governingTokenDepositAmount', 'u64'],
          ['unrelinquishedVotesCount', 'u32'],
          ['totalVotesCount', 'u32'],
          ['outstandingProposalCount', 'u8'],
          ['reserved', [7]],
          ['governanceDelegate', { kind: 'option', type: 'pubkey' }],
        ],
      },
    ],
    [
      models.VoteRecord,
      {
        kind: 'struct',
        fields: [
          ['accountType', 'u8'],
          ['proposal', 'pubkey'],
          ['governingTokenOwner', 'pubkey'],
          ['isRelinquished', 'u8'],

          ...(programVersion === PROGRAM_VERSION_V1
            ? [['voteWeight', VoteWeight]]
            : [
                ['voterWeight', 'u64'],
                ['vote', 'vote'],
              ]),
        ],
      },
    ],
  ]);
}
