{
  "targets": [
    {
      "target_name": "ed25519_blake2b",
      "sources": [
        "main.cc",
        "ed25519-donna/ed25519.c",
        "blake2/blake2b.c"
      ],
      "defines": [
        "OPENSSL_API_COMPAT=0x10100001L",
        "OPENSSL_CONFIGURED_API=0x30000000L"
      ],
      "include_dirs": ["<!(node -e \"require('napi-macros')\")"]
    }
  ]
}
