{
  "targets": [
    {
      "target_name": "ed25519_blake2b",
      "sources": [
        "main.cc",
        "ed25519/add_scalar.c",
        "ed25519/fe.c",
        "ed25519/ge.c",
        "ed25519/key_exchange.c",
        "ed25519/keypair.c",
        "ed25519/sc.c",
        "ed25519/seed.c",
        "ed25519/sign.c",
        "ed25519/verify.c",
        "blake2b/blake2b.c"
      ],
      "include_dirs": ["<!(node -e \"require('napi-macros')\")"]
    }
  ]
}
