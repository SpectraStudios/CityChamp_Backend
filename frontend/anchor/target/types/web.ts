export type Web = {
  version: '0.1.0';
  name: 'web';
  instructions: [
    {
      name: 'close';
      accounts: [
        {
          name: 'payer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'web';
          isMut: true;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: 'decrement';
      accounts: [
        {
          name: 'web';
          isMut: true;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: 'increment';
      accounts: [
        {
          name: 'web';
          isMut: true;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: 'initialize';
      accounts: [
        {
          name: 'payer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'web';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: 'set';
      accounts: [
        {
          name: 'web';
          isMut: true;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'value';
          type: 'u8';
        }
      ];
    }
  ];
  accounts: [
    {
      name: 'web';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'count';
            type: 'u8';
          }
        ];
      };
    }
  ];
};

export const IDL: Web = {
  version: '0.1.0',
  name: 'web',
  instructions: [
    {
      name: 'close',
      accounts: [
        {
          name: 'payer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'web',
          isMut: true,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'decrement',
      accounts: [
        {
          name: 'web',
          isMut: true,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'increment',
      accounts: [
        {
          name: 'web',
          isMut: true,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'initialize',
      accounts: [
        {
          name: 'payer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'web',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'set',
      accounts: [
        {
          name: 'web',
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'value',
          type: 'u8',
        },
      ],
    },
  ],
  accounts: [
    {
      name: 'web',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'count',
            type: 'u8',
          },
        ],
      },
    },
  ],
};
